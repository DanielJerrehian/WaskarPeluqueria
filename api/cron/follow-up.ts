import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

import getBaseUrl from '../utils/getBaseUrl.js'

const resend = new Resend(process.env.RESEND_API_KEY!)
const baseUrl = getBaseUrl()

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
  const startAt = new Date(today)
  const endAt = new Date(today)

  if (shift === 'day') {
    startAt.setHours(0, 0, 0, 0)
    endAt.setHours(17, 0, 0, 0)
  } else {
    startAt.setHours(17, 0, 1, 0)
    endAt.setHours(23, 59, 59, 999)
  }

  try {
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

    if (!squareRes.ok) {
      throw new Error(`Square API error: ${squareRes.status}`)
    }

    const squareData = await squareRes.json()
    const appointments: SquareAppointment[] = squareData.bookings ?? []
    const appointmentsFound = appointments.length

    let sent = 0
    let skipped = 0

    const skipReasons: Record<string, number> = {
      cancelledOrNoShow: 0,
      missingCustomerId: 0,
      customerFetchFailed: 0,
      missingEmail: 0,
      unsubscribed: 0,
      resendSendFailed: 0,
      contactCreateFailed: 0,
    }

    console.log('follow-up cron Square window:', {
      shift,
      startAt: startAt.toISOString(),
      endAt: endAt.toISOString(),
      appointmentsFound,
    })

    for (const appt of appointments) {
      if (appt.status === 'NO_SHOW' || appt.status?.startsWith('CANCELLED')) {
        skipped++
        skipReasons.cancelledOrNoShow++
        continue
      }

      if (!appt.customer_id) {
        skipped++
        skipReasons.missingCustomerId++
        continue
      }

      const custRes = await fetch(
        `https://connect.squareup.com/v2/customers/${appt.customer_id}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
            'Square-Version': '2024-01-18',
          },
        }
      )

      if (!custRes.ok) {
        skipped++
        skipReasons.customerFetchFailed++
        continue
      }

      const customer: SquareCustomer = (await custRes.json()).customer

      if (!customer.email_address) {
        skipped++
        skipReasons.missingEmail++
        continue
      }

      const email = customer.email_address.toLowerCase().trim()

      try {
        const contact = await resend.contacts.get({
          email,
          audienceId: process.env.RESEND_AUDIENCE_ID!,
        })

        if (contact.data?.unsubscribed) {
          skipped++
          skipReasons.unsubscribed++
          continue
        }
      } catch {
        // Not in audience yet — fine, still send
      }

      const unsubscribeUrl = `${baseUrl}/api/unsubscribe?email=${encodeURIComponent(email)}`
      const firstName = customer.given_name ?? 'cliente'
      const reviewUrl = process.env.GOOGLE_REVIEW_URL ?? '#'

      const sendResult = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: email,
        subject: `¡Gracias por visitarnos, ${firstName}! ✂️`,
        html: buildFollowUpEmail(firstName, reviewUrl, unsubscribeUrl),
        headers: {
          'List-Unsubscribe': `<${unsubscribeUrl}>`,
          'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
        },
      })

      if (sendResult.error) {
        skipped++
        skipReasons.resendSendFailed++
        console.error('Resend send failed:', sendResult.error)
        continue
      }

      const contactCreateResult = await resend.contacts.create({
        email,
        audienceId: process.env.RESEND_AUDIENCE_ID!,
        unsubscribed: false,
      })

      if (contactCreateResult.error) {
        skipReasons.contactCreateFailed++
        console.warn('Resend contact create failed:', contactCreateResult.error)
      }

      sent++
    }

    const result = {
      ok: true,
      shift,
      startAt: startAt.toISOString(),
      endAt: endAt.toISOString(),
      appointmentsFound,
      sent,
      skipped,
      skipReasons,
    }

    console.log('follow-up cron result:', result)

    return res.status(200).json(result)
  } catch (err) {
    console.error('follow-up cron error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

function buildFollowUpEmail(firstName: string, reviewUrl: string, unsubscribeUrl: string): string {
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

          <tr>
            <td style="background:#C9A84C;padding:24px 32px;text-align:center;">
              <p style="margin:0;color:#1A1A1A;font-size:11px;letter-spacing:4px;text-transform:uppercase;font-family:Arial,sans-serif;">
                ✂ Waskar Peluquería · El Born, Barcelona
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:40px 32px;text-align:center;">
              <h1 style="margin:0 0 8px;color:#C9A84C;font-size:32px;font-weight:700;">
                ¡Gracias, ${firstName}!
              </h1>
              <p style="margin:0 0 24px;color:#f0ece4;font-size:16px;line-height:1.6;">
                Fue un placer atenderte hoy en Waskar Peluquería.<br/>
                Esperamos verte pronto.
              </p>

              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-top:1px solid #C9A84C33;padding:24px 0;text-align:center;">
                    <p style="margin:0 0 16px;color:#f0ece4cc;font-size:14px;line-height:1.6;">
                      ¿Te gustó el servicio? Si quieres compartir tu experiencia, déjanos un reseña en Google<br/>
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