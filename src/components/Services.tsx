import { Scissors, Wind, Sparkles } from 'lucide-react'

const services = [
  {
    icon: Scissors,
    name: 'Corte de Cabello',
    nameEn: 'Haircut',
    price: '20€',
    description: 'Corte clásico o moderno adaptado a tu estilo. Incluye lavado y acabado.',
  },
  {
    icon: Wind,
    name: 'Barba',
    nameEn: 'Beard',
    price: '10€',
    description: 'Perfilado, arreglo y afeitado de barba con toalla caliente.',
  },
  {
    icon: Sparkles,
    name: 'Mejoras',
    nameEn: 'Enhancements',
    price: '10€',
    description: 'Tratamientos adicionales: cejas, nevado, diseño de líneas.',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-24 bg-[#1A1A1A]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section heading */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-xs tracking-[0.4em] uppercase">Lo que ofrecemos</span>
            <div className="h-px w-12 bg-[#C9A84C]" />
          </div>
          <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-[#f0ece4]">
            Servicios
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, name, nameEn, price, description }) => (
            <div
              key={nameEn}
              className="group relative bg-[#2A2A2A] border border-[#C9A84C]/20 rounded-lg p-8 hover:border-[#C9A84C]/60 transition-all duration-300 hover:shadow-[0_0_40px_rgba(201,168,76,0.1)]"
            >
              {/* Gold top line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex items-start justify-between mb-6">
                <div className="p-3 bg-[#C9A84C]/10 rounded-lg">
                  <Icon className="w-6 h-6 text-[#C9A84C]" />
                </div>
                <span className="font-['Playfair_Display'] text-3xl font-bold text-[#C9A84C]">
                  {price}
                </span>
              </div>

              <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#f0ece4] mb-2">
                {name}
              </h3>
              <p className="text-[#f0ece4]/50 text-sm leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
