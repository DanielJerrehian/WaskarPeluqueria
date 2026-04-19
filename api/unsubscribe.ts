import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY!)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const email = req.query.email as string

  if (!email || !email.includes('@')) {
    return res.status(400).send(buildPage('error', 'Email no válido.'))
  }

  try {
    await resend.contacts.update({
      email: email.toLowerCase().trim(),
      audienceId: process.env.RESEND_AUDIENCE_ID!,
      unsubscribed: true,
    })

    return res.status(200).send(buildPage('success', email))
  } catch (err) {
    console.error('unsubscribe error:', err)
    return res.status(500).send(buildPage('error', 'Ha ocurrido un error. Inténtalo de nuevo.'))
  }
}

function buildPage(type: 'success' | 'error', detail: string): string {
  const isSuccess = type === 'success'
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${isSuccess ? 'Cancelado' : 'Error'} – Waskar Peluquería</title>
  <style>
    body { margin:0; background:#1A1A1A; font-family:Arial,sans-serif; display:flex; align-items:center; justify-content:center; min-height:100vh; }
    .card { background:#2A2A2A; border:1px solid #C9A84C33; border-radius:8px; padding:48px 40px; text-align:center; max-width:420px; width:90%; }
    h1 { color:#C9A84C; font-size:24px; margin:0 0 12px; }
    p { color:#f0ece499; font-size:14px; line-height:1.6; margin:0 0 24px; }
    a { display:inline-block; padding:12px 24px; background:#C9A84C; color:#1A1A1A; text-decoration:none; font-weight:700; font-size:13px; border-radius:4px; letter-spacing:1px; text-transform:uppercase; }
  </style>
</head>
<body>
  <div class="card">
    ${isSuccess ? `
      <h1>Cancelado ✓</h1>
      <p>${detail} ha sido eliminado de nuestra lista.<br/>Ya no recibirás más emails de nuestra parte.</p>
      <a href="https://waskarpeluqueria.com">Volver al inicio</a>
    ` : `
      <h1>Error</h1>
      <p>${detail}</p>
      <a href="https://waskarpeluqueria.com">Volver al inicio</a>
    `}
  </div>
</body>
</html>
`
}
