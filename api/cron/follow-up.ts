import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'
import getBaseUrl from '../utils/getBaseUrl';

// Runs twice daily (vercel.json):
//   ?shift=day — 14:00 UTC (16:00 Barcelona) → emails appointments from 00:00–15:59
//   ?shift=night 20:00 UTC (22:00 Barcelona) → emails appointments from 16:00–23:59
//
// Required env vars:
//   SQUARE_ACCESS_TOKEN  — Square Developer Dashboard → Credentials → Production
//   RESEND_API_KEY       — resend.com → API Keys
//   RESEND_FROM_EMAIL    — e.g. "Waskar Peluquería <hola@waskarpeluqueria.com>"
//   RESEND_AUDIENCE_ID   — Resend Dashboard → Audiences
//   GOOGLE_REVIEW_URL    — Google Business Profile → Ask for reviews
//   CRON_SECRET          — random secret to protect this endpoint

const resend = new Resend(process.env.RESEND_API_KEY!)
const baseUrl = getBaseUrl();

interface SquareAppointment {
  id: string
  status?: string
  customer_id?: string
  start_at: string
}

interface SquareCustomer {
  id: string
  given_name?: string
  email_address?: string
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const shift = req.query.shift === 'night' ? 'night' : 'day'
  const today = new Date()
  today.setDate(today.getDate() + 1)
  const startAt = new Date(today)
  const endAt = new Date(today)

  // afternoon run at 16:45 Barcelona → catches appointments that started 00:00–14:00
  // evening run at 21:45 Barcelona → catches appointments that started 14:01–23:59
  if (shift === 'day') {
    startAt.setHours(0, 0, 0, 0)
    endAt.setHours(14, 0, 0, 0)
  } else {
    startAt.setHours(14, 0, 1, 0)
    endAt.setHours(23, 59, 59, 999)
  }

  try {
    // 1. Fetch appointments from Square for this shift's time window
    const squareRes = await fetch(
      `https://connect.squareup.com/v2/bookings?start_at_min=${startAt.toISOString()}&start_at_max=${endAt.toISOString()}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
          'Square-Version': '2024-01-18',
        },
      }
    )

    if (!squareRes.ok) throw new Error(`Square API error: ${squareRes.status}`)

    const appointments: SquareAppointment[] = (await squareRes.json()).bookings ?? []

    let sent = 0
    let skipped = 0

    for (const appt of appointments) {
      // Skip no-shows and cancellations — barber marks these in the Square app
      if (appt.status === 'NO_SHOW' || appt.status?.startsWith('CANCELLED')) {
        skipped++
        continue
      }

      if (!appt.customer_id) { skipped++; continue }

      // 2. Fetch customer details from Square
      const custRes = await fetch(
        `https://connect.squareup.com/v2/customers/${appt.customer_id}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
            'Square-Version': '2024-01-18',
          },
        }
      )
      if (!custRes.ok) { skipped++; continue }

      const customer: SquareCustomer = (await custRes.json()).customer
      if (!customer.email_address) { skipped++; continue }

      const email = customer.email_address.toLowerCase().trim()

      // 3. Check if unsubscribed in Resend
      try {
        const contact = await resend.contacts.get({
          email,
          audienceId: process.env.RESEND_AUDIENCE_ID!,
        })
        if (contact.data?.unsubscribed) { skipped++; continue }
      } catch {
        // Not in audience yet — fine, still send
      }

      const firstName = customer.given_name ?? 'cliente'
      const reviewUrl = process.env.GOOGLE_REVIEW_URL ?? '#'

      // 4. Send thank-you + review email
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: email,
        subject: `¡Gracias por visitarnos, ${firstName}! ✂️`,
        html: buildFollowUpEmail(firstName, reviewUrl, email),
        headers: {
          'List-Unsubscribe': `<mailto:unsubscribe@waskarpeluqueria.com?subject=unsubscribe>`,
          'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
        },
      })

      // 5. Add to Resend audience so unsubscribe works
      await resend.contacts.create({
        email,
        audienceId: process.env.RESEND_AUDIENCE_ID!,
        unsubscribed: false,
      }).catch(() => { /* already exists — fine */ })

      sent++
    }

    return res.status(200).json({ ok: true, shift, sent, skipped })
  } catch (err) {
    console.error('follow-up cron error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

function buildFollowUpEmail(firstName: string, reviewUrl: string, email: string): string {
  const unsubscribeUrl = `${baseUrl}/api/unsubscribe?email=${encodeURIComponent(email)}`

    return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Gracias por tu visita</title>
</head>
<body style="margin:0;padding:0;background:#1A1A1A;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#1A1A1A;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#2A2A2A;border:1px solid #C9A84C33;border-radius:8px;overflow:hidden;max-width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:#C9A84C;padding:24px 32px;text-align:center;">
              <p style="margin:0;color:#1A1A1A;font-size:11px;letter-spacing:4px;text-transform:uppercase;font-family:Arial,sans-serif;">
                ✂ Waskar Peluquería · El Born, Barcelona
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 32px;text-align:center;">
              <h1 style="margin:0 0 8px;color:#C9A84C;font-size:32px;font-weight:700;">
                ¡Gracias, ${firstName}!
              </h1>
              <p style="margin:0 0 24px;color:#f0ece4;font-size:16px;line-height:1.6;">
                Fue un placer atenderte hoy en Waskar Peluquería.<br/>
                Esperamos verte pronto.
              </p>

              <!-- Review CTA -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-top:1px solid #C9A84C33;padding:24px 0;text-align:center;">
                    <p style="margin:0 0 16px;color:#f0ece4cc;font-size:14px;line-height:1.6;">
                      ¿Te gustó el servicio? Tu opinión nos ayuda a crecer<br/>
                      Déjanos una reseña en Google, solo tarda un minuto 🙏
                    </p>
                    <a href="${reviewUrl}"
                       style="display:inline-block;padding:14px 28px;background:#C9A84C;color:#1A1A1A;text-decoration:none;font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;border-radius:4px;font-family:Arial,sans-serif;">
                      Dejar Reseña en Google
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:24px 0 0;color:#f0ece466;font-size:12px;font-family:Arial,sans-serif;">
                Waskar Peluquería · El Born, Barcelona
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:16px 32px;border-top:1px solid #C9A84C22;text-align:center;">
              <p style="margin:0;color:#f0ece433;font-size:11px;font-family:Arial,sans-serif;line-height:1.8;">
                Recibes este email porque visitaste Waskar Peluquería.<br/>
                <a href="${unsubscribeUrl}" style="color:#C9A84C88;text-decoration:underline;">
                  Cancelar suscripción
                </a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
}