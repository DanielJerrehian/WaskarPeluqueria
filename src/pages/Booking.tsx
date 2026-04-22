import { Link } from 'react-router-dom'
import { CalendarDays, Scissors, Wind, Sparkles, Pen } from 'lucide-react'

const SQUARE_URL = 'https://app.squareup.com/appointments/book/rtuatt9b3zl5jw/LD7M6B9BDJXRQ/start'


const services = [
  { icon: Scissors, name: 'Corte de Cabello', price: '20€' },
  { icon: Wind, name: 'Barba', price: '10€' },
  { icon: Sparkles, name: 'Mejoras', price: '10€' },
  { icon: Pen, name: 'Diseños', price: 'Consultar' },
]

const barbers = ['Waskar', 'Yayo', 'José']

export default function Booking() {
  return (
    <div className="min-h-screen bg-[#1A1A1A] pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-xs tracking-[0.4em] uppercase">Reserva online</span>
            <div className="h-px w-12 bg-[#C9A84C]" />
          </div>
          <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-[#f0ece4] mb-4">
            Reservar Cita
          </h1>
          <p className="text-[#f0ece4]/50 text-sm max-w-sm mx-auto">
            Elige tu barbero, servicio y horario. Recibirás una confirmación por email.
          </p>
        </div>

        {/* Services summary */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {services.map(({ icon: Icon, name, price }) => (
            <div key={name} className="bg-[#2A2A2A] border border-[#C9A84C]/20 rounded-lg p-4 text-center">
              <Icon className="w-5 h-5 text-[#C9A84C] mx-auto mb-2" />
              <p className="text-[#f0ece4]/70 text-xs mb-1">{name}</p>
              <p className="text-[#C9A84C] font-semibold text-sm">{price}</p>
            </div>
          ))}
        </div>

        {/* Barbers */}
        <div className="flex gap-3 mb-8">
          {barbers.map((name) => (
            <div key={name} className="flex-1 bg-[#2A2A2A] border border-[#C9A84C]/20 rounded-lg p-4 text-center">
              <div className="w-10 h-10 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/30 flex items-center justify-center mx-auto mb-2">
                <span className="font-['Playfair_Display'] text-[#C9A84C] font-bold">{name[0]}</span>
              </div>
              <p className="text-[#f0ece4]/70 text-sm">{name}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <a
          href={SQUARE_URL}
          className="flex items-center justify-center gap-3 w-full py-5 bg-[#C9A84C] text-[#1A1A1A] font-semibold text-sm tracking-widest uppercase rounded hover:bg-[#E2C97E] transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,168,76,0.4)] mb-4"
        >
          <CalendarDays className="w-5 h-5" />
          Reservar Cita
        </a>

        <div className="mt-10 text-center">
          <Link to="/" className="text-[#C9A84C]/60 text-sm hover:text-[#C9A84C] transition-colors">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
