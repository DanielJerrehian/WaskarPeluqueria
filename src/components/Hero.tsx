import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'

export default function Hero() {

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[#1A1A1A]">
        {/* Primary diagonal lines */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent 0px,
              transparent 48px,
              rgba(201,168,76,0.12) 48px,
              rgba(201,168,76,0.12) 49px,
              transparent 49px,
              transparent 96px,
              rgba(201,168,76,0.06) 96px,
              rgba(201,168,76,0.06) 97px
            )`,
          }}
        />
        {/* Counter-diagonal lines for diamond effect */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              transparent 0px,
              transparent 48px,
              rgba(201,168,76,0.06) 48px,
              rgba(201,168,76,0.06) 49px
            )`,
          }}
        />
        {/* Vignette — darkens edges so lines fade away from centre */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, #1A1A1A 100%)`,
          }}
        />
        {/* Central gold glow */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 50% 40% at 50% 50%, rgba(201,168,76,0.08) 0%, transparent 70%)`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Ornament line */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-16 bg-[#C9A84C]" />
          <a
            href="https://maps.app.goo.gl/Uj5hxYp8RxgBhmCo9"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#C9A84C] text-xs tracking-[0.4em] uppercase hover:text-[#E2C97E] transition-colors"
          >El Born · Barcelona</a>
          <div className="h-px w-16 bg-[#C9A84C]" />
        </div>

        <h1 className="font-['Playfair_Display'] text-5xl md:text-7xl font-bold text-[#f0ece4] leading-tight mb-4">
          <span className="relative inline-block">
            Waskar
            <span
              className="absolute -top-5 -right-6 text-3xl md:text-4xl select-none"
              style={{ transform: 'rotate(12deg)', filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.5))' }}
              aria-label="Dominican Republic"
            >
              🇩🇴
            </span>
          </span>
          <br />
          <span className="text-[#C9A84C] italic">Peluquería</span>
        </h1>

        <p className="text-[#f0ece4]/60 text-lg md:text-xl font-light tracking-wide mt-6 mb-10 max-w-lg mx-auto">
          Cortes de calidad y estilo clásico en el corazón de Barcelona.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/booking"
            className="px-8 py-4 bg-[#C9A84C] text-[#1A1A1A] font-semibold text-sm tracking-widest uppercase rounded hover:bg-[#E2C97E] transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,168,76,0.4)]"
          >
            Reservar Cita
          </Link>
          <a
            href="#services"
            className="px-8 py-4 border border-[#C9A84C]/50 text-[#C9A84C] font-semibold text-sm tracking-widest uppercase rounded hover:border-[#C9A84C] hover:bg-[#C9A84C]/10 transition-all duration-300"
          >
            Ver Servicios
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#services"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#C9A84C]/50 hover:text-[#C9A84C] transition-colors animate-bounce"
      >
        <ChevronDown className="w-6 h-6" />
      </a>
    </section>
  )
}
