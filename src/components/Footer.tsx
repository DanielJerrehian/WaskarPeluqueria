import { Scissors, Phone } from 'lucide-react'

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#111] border-t border-[#C9A84C]/20 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <Scissors className="w-4 h-4 text-[#C9A84C]" />
            <span className="font-['Playfair_Display'] text-[#C9A84C] text-lg font-semibold">
              Waskar Peluquería
            </span>
          </div>

          {/* Middle info */}
          <a
            href="https://maps.app.goo.gl/Uj5hxYp8RxgBhmCo9"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#f0ece4]/40 text-sm text-center hover:text-[#C9A84C] transition-colors"
          >
            El Born, Barcelona &nbsp;·&nbsp; Abierto todos los días menos el lunes
          </a>

          {/* Links */}
          <div className="flex items-center gap-5">
            <a
              href="https://wa.me/34600754506?text=Hola%2C%20me%20gustar%C3%ADa%20reservar%20una%20cita."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#f0ece4]/50 hover:text-[#C9A84C] transition-colors text-sm"
              aria-label="Contactar por WhatsApp"
            >
              <Phone className="w-4 h-4" />
              +34 600 754 506
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#f0ece4]/50 hover:text-[#C9A84C] transition-colors text-sm"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-4 h-4" />
              Instagram
            </a>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-[#C9A84C]/10 text-center">
          <p className="text-[#f0ece4]/25 text-xs">
            © {year} Waskar Peluquería. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
