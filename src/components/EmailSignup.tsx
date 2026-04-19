import { useState } from 'react'
import { Mail, Check, Loader2 } from 'lucide-react'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function EmailSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Error al suscribirse')
      }
      setStatus('success')
      setEmail('')
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Inténtalo de nuevo')
      setStatus('error')
    }
  }

  return (
    <section className="py-24 bg-[#111]">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <div className="p-4 bg-[#C9A84C]/10 rounded-full w-fit mx-auto mb-6">
          <Mail className="w-8 h-8 text-[#C9A84C]" />
        </div>

        <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#f0ece4] mb-4">
          Ofertas & Novedades
        </h2>
        <p className="text-[#f0ece4]/50 text-sm leading-relaxed mb-8 max-w-sm mx-auto">
          Suscríbete para recibir promociones exclusivas, novedades del barrio y descuentos especiales.
        </p>

        {status === 'success' ? (
          <div className="flex items-center justify-center gap-3 text-[#C9A84C]">
            <div className="p-2 bg-[#C9A84C]/20 rounded-full">
              <Check className="w-5 h-5" />
            </div>
            <span className="font-medium">¡Gracias! Te hemos añadido a la lista.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setStatus('idle') }}
              placeholder="tu@email.com"
              required
              className="flex-1 px-4 py-3 bg-[#2A2A2A] border border-[#C9A84C]/20 rounded text-[#f0ece4] placeholder-[#f0ece4]/30 text-sm focus:outline-none focus:border-[#C9A84C]/60 transition-colors"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-6 py-3 bg-[#C9A84C] text-[#1A1A1A] font-semibold text-sm uppercase tracking-wide rounded hover:bg-[#E2C97E] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
            >
              {status === 'loading' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                'Suscribirse'
              )}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="mt-3 text-red-400 text-sm">{errorMsg}</p>
        )}
      </div>
    </section>
  )
}
