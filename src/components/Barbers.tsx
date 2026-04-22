import { Link } from 'react-router-dom'
import { Scissors } from 'lucide-react'

const barbers = [
  {
    name: 'Waskar',
    title: 'Fundador & Barbero',
    bio: 'Experto en cortes clásicos y modernos. Con años de experiencia en el arte de la barbería, Waskar combina técnica tradicional con tendencias actuales.',
    initials: 'W',
  },
  {
    name: 'Yayo',
    title: 'Barbero',
    bio: 'Especialista en degradados y diseños. Yayo aporta creatividad y precisión a cada corte, con un estilo propio que encanta a sus clientes.',
    initials: 'Y',
  },
  {
    name: 'Robinson',
    title: 'Barbero',
    bio: 'Maestro del fade y los acabados perfectos. Robinson trae energía y dedicación a cada cliente, con una técnica precisa forjada en años de experiencia.',
    initials: 'J',
  },
]

export default function Barbers() {
  return (
    <section id="barbers" className="py-24 bg-[#111]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section heading */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-xs tracking-[0.4em] uppercase">El equipo</span>
            <div className="h-px w-12 bg-[#C9A84C]" />
          </div>
          <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-[#f0ece4]">
            Nuestros Barbers
          </h2>
        </div>

        {/* Barber cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {barbers.map(({ name, title, bio, initials }) => (
            <div
              key={name}
              className="group bg-[#1A1A1A] border border-[#C9A84C]/20 rounded-lg p-8 text-center hover:border-[#C9A84C]/50 transition-all duration-300 flex flex-col"
            >
              {/* Avatar */}
              <div className="relative mx-auto mb-6 w-24 h-24">
                <div className="w-24 h-24 rounded-full bg-[#2A2A2A] border-2 border-[#C9A84C]/40 group-hover:border-[#C9A84C] transition-colors duration-300 flex items-center justify-center">
                  <span className="font-['Playfair_Display'] text-3xl font-bold text-[#C9A84C]">
                    {initials}
                  </span>
                </div>
                {/* Small scissors badge */}
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#C9A84C] rounded-full flex items-center justify-center">
                  <Scissors className="w-4 h-4 text-[#1A1A1A]" />
                </div>
              </div>

              <h3 className="font-['Playfair_Display'] text-2xl font-bold text-[#f0ece4] mb-1">
                {name}
              </h3>
              <p className="text-[#C9A84C] text-xs tracking-widest uppercase mb-4">
                {title}
              </p>
              <p className="text-[#f0ece4]/50 text-sm leading-relaxed mb-6 flex-1">
                {bio}
              </p>

              <Link
                to="/booking"
                className="inline-block px-6 py-2.5 border border-[#C9A84C]/40 text-[#C9A84C] text-sm tracking-wide uppercase rounded hover:bg-[#C9A84C] hover:text-[#1A1A1A] transition-all duration-300"
              >
                Reservar con {name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
