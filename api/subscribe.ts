import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY!)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email } = req.body
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: 'Email inválido' })
  }

  const normalizedEmail = email.toLowerCase().trim()

  try {
    // Add to Resend Audience — handles duplicates and unsubscribes automatically
    await resend.contacts.create({
      email: normalizedEmail,
      audienceId: process.env.RESEND_AUDIENCE_ID!,
      unsubscribed: false,
    })

    return res.status(200).json({ ok: true })
  } catch (err: unknown) {
    // Resend returns a 409 if the contact already exists — treat as success
    if (err instanceof Error && err.message?.includes('already exists')) {
      return res.status(200).json({ ok: true })
    }
    console.error('subscribe error:', err)
    return res.status(500).json({ error: 'Error del servidor' })
  }
}
