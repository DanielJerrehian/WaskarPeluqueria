import { Link } from 'react-router-dom'
import { Scissors } from 'lucide-react'

const values = [
  {
    title: 'Raíces Latinas 🇩🇴',
    body: 'Nacimos en República Dominicana, donde el arte de la barbería es una tradición que se pasa de generación en generación. Llevamos esa cultura y ese orgullo a cada corte.',
  },
  {
    title: 'Especialistas en Fades y Tapers 💈',
    body: 'El degradado perfecto es nuestra firma. Desde el más suave skin fade hasta un taper clásico, ejecutamos cada transición con precisión y detalle.',
  },
  {
    title: 'Expertos en Todo Tipo de Cabello ✂️',
    body: 'Tenemos amplia experiencia con todo tipo de cabello, liso, rizado, ondulado y afro. Entendemos la textura, el volumen y las técnicas específicas que cada tipo requiere.',
  },
  {
    title: 'Ambiente Auténtico 🔊',
    body: 'Más que una peluquería, somos un espacio donde te sientes en casa. Música, buena conversación, billar, y un servicio que cuida cada detalle.',
  },
]

export default function About() {
  return (
    <div className="min-h-screen bg-[#1A1A1A] pt-24 pb-16">

      {/* Hero band */}
      <div className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              rgba(201,168,76,0.4) 0px, rgba(201,168,76,0.4) 1px,
              transparent 1px, transparent 48px
            )`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 50%, transparent 30%, #1A1A1A 100%)' }}
        />
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-xs tracking-[0.4em] uppercase">Nuestra historia</span>
            <div className="h-px w-12 bg-[#C9A84C]" />
          </div>
          <h1 className="font-['Playfair_Display'] text-5xl md:text-6xl font-bold text-[#f0ece4] mb-6">
            Quiénes <span className="text-[#C9A84C] italic">Somos</span>
          </h1>
          <p className="text-[#f0ece4]/60 text-lg leading-relaxed">
            Una barbería latina con alma dominicana, instalada en el corazón de Barcelona.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6">

        {/* Main story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          {/* Text */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-xs tracking-widest uppercase">El origen</span>
            </div>
            <p className="text-[#f0ece4]/80 text-base leading-relaxed mb-4">
              Waskar Peluquería nació del sueño de traer la auténtica barbería dominicana a Europa.
            </p>
            <p className="text-[#f0ece4]/80 text-base leading-relaxed mb-4">
              En República Dominicana, la barbería no es solo un oficio, es cultura, identidad y comunidad.
            </p>
            <p className="text-[#f0ece4]/80 text-base leading-relaxed mb-4">
              Nuestro Team llegó a Barcelona con años de experiencia y un estilo propio forjado en las calles de America Latina. Hoy, en el barrio de El Born, ofrecen ese mismo nivel de arte y dedicación a todos los que cruzan la puerta.
            </p>
          </div>

          {/* Flag + accent card */}
          <div className="flex flex-col items-center gap-6">
            <div className="relative bg-[#2A2A2A] border border-[#C9A84C]/20 rounded-lg p-10 text-center w-full">
              <div
                className="absolute inset-0 rounded-lg opacity-5"
                style={{
                  backgroundImage: `repeating-linear-gradient(45deg, #C9A84C 0px, #C9A84C 1px, transparent 1px, transparent 30px)`,
                }}
              />
              <div className="flex items-center justify-center gap-4">
                <span className="text-7xl block mb-4" aria-label="Dominican Republic flag">🇩🇴</span>
                <span className="text-[#f0ece4]/40 text-sm tracking-widest mb-4">→</span>
                <span className="text-7xl block mb-4" aria-label="Dominican Republic flag">🇪🇸</span>
              </div>
              <p className="font-['Playfair_Display'] text-[#C9A84C] text-xl font-semibold mb-1">
                República Dominicana
              </p>
              <a
                href="https://maps.app.goo.gl/Uj5hxYp8RxgBhmCo9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f0ece4]/40 text-sm tracking-widest uppercase hover:text-[#C9A84C] transition-colors"
              >→ El Born, Barcelona</a>
              <div className="mt-6 pt-6 border-t border-[#C9A84C]/20 grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="font-['Playfair_Display'] text-3xl font-bold text-[#C9A84C]">3</p>
                  <p className="text-[#f0ece4]/40 text-xs uppercase tracking-wide mt-1">Barbers expertos</p>
                </div>
                <div>
                  <p className="font-['Playfair_Display'] text-3xl font-bold text-[#C9A84C]">10+</p>
                  <p className="text-[#f0ece4]/40 text-xs uppercase tracking-wide mt-1">Años de experiencia</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values grid */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-12 bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-xs tracking-[0.4em] uppercase">Lo que nos define</span>
              <div className="h-px w-12 bg-[#C9A84C]" />
            </div>
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#f0ece4]">
              Nuestros Valores
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map(({ title, body }) => (
              <div
                key={title}
                className="group bg-[#2A2A2A] border border-[#C9A84C]/20 rounded-lg p-7 hover:border-[#C9A84C]/50 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-1 h-6 bg-[#C9A84C] rounded-full" />
                  <h3 className="font-['Playfair_Display'] text-lg font-semibold text-[#f0ece4]">
                    {title}
                  </h3>
                </div>
                <p className="text-[#f0ece4]/55 text-sm leading-relaxed pl-4">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-[#2A2A2A] border border-[#C9A84C]/20 rounded-lg p-12">
          <Scissors className="w-8 h-8 text-[#C9A84C] mx-auto mb-4" />
          <h3 className="font-['Playfair_Display'] text-2xl font-bold text-[#f0ece4] mb-3">
            ¿Listo para el cambio?
          </h3>
          <p className="text-[#f0ece4]/50 text-sm mb-8 max-w-sm mx-auto">
            Reserva tu cita y descubre la diferencia de un corte con técnica, cultura y pasión.
          </p>
          <Link
            to="/booking"
            className="inline-block px-8 py-4 bg-[#C9A84C] text-[#1A1A1A] font-semibold text-sm tracking-widest uppercase rounded hover:bg-[#E2C97E] transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,168,76,0.4)]"
          >
            Reservar Cita
          </Link>
        </div>

      </div>
    </div>
  )
}
