import { services } from '../data/services.data'

export default function Services() {
  return (
    <section id="services" className="py-24 bg-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-6">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {services.map(({ icon: Icon, name, nameEn, price, description, badge, priceLabel, popular }) => (
            <div
              key={nameEn}
              className={`group relative bg-[#2A2A2A] rounded-lg p-6 transition-all duration-300 hover:shadow-[0_0_40px_rgba(201,168,76,0.1)] ${
                popular
                  ? 'border border-[#C9A84C]/60'
                  : 'border border-[#C9A84C]/20 hover:border-[#C9A84C]/60'
              }`}
            >
              {/* Gold top line — always visible for popular, hover for rest */}
              <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent transition-opacity duration-300 ${
                popular ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`} />

              {/* Popular label */}
              {popular && (
                <div className="absolute -top-px left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 bg-[#C9A84C] text-[#1A1A1A] text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-b-md">
                    <span className="w-1 h-1 rounded-full bg-[#1A1A1A]/40 inline-block" />
                    Más popular
                    <span className="w-1 h-1 rounded-full bg-[#1A1A1A]/40 inline-block" />
                  </span>
                </div>
              )}

              <div className="flex items-start justify-between mb-6">
                <div className="p-3 bg-[#C9A84C]/10 rounded-lg">
                  <Icon className="w-6 h-6 text-[#C9A84C]" />
                </div>
                {price ? (
                  <span className="font-['Playfair_Display'] text-3xl font-bold text-[#C9A84C]">
                    {price}
                  </span>
                ) : (
                  <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A84C] border border-[#C9A84C]/40 rounded px-2 py-1 self-start mt-1">
                    {priceLabel ?? 'Consultar'}
                  </span>
                )}
              </div>

              <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#f0ece4] mb-2">
                {name}
              </h3>
              <p className="text-[#f0ece4]/50 text-sm leading-relaxed mb-3">
                {description}
              </p>

              {/* Optional badge */}
              {badge && (
                <span className="inline-block text-xs font-semibold tracking-wider uppercase text-[#C9A84C] border border-[#C9A84C]/30 rounded px-2 py-0.5">
                  {badge}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
