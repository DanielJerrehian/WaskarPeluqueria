import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Scissors } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)


  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1A1A1A]/95 backdrop-blur border-b border-[#C9A84C]/20">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
          <Scissors className="w-5 h-5 text-[#C9A84C] group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-['Playfair_Display'] text-xl font-semibold text-[#C9A84C] tracking-wide">
            Waskar Peluquería
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { href: '/#services', label: 'Servicios' },
            { href: '/#barbers', label: 'Barberos' },
            { href: '/#gallery', label: 'Galería' },
            { href: '/#location', label: 'Ubicación' },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-sm text-[#f0ece4]/70 hover:text-[#C9A84C] transition-colors duration-200 tracking-wide uppercase"
            >
              {label}
            </a>
          ))}
          <Link
            to="/about"
            className="text-sm text-[#f0ece4]/70 hover:text-[#C9A84C] transition-colors duration-200 tracking-wide uppercase"
          >
            Nosotros
          </Link>
          <Link
            to="/redes"
            className="text-sm text-[#f0ece4]/70 hover:text-[#C9A84C] transition-colors duration-200 tracking-wide uppercase"
          >
            Redes Sociales
          </Link>
          <Link
            to="/booking"
            className="px-5 py-2 bg-[#C9A84C] text-[#1A1A1A] text-sm font-semibold rounded tracking-wide uppercase hover:bg-[#E2C97E] transition-colors duration-200"
          >
            Reservar
          </Link>

        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-[#f0ece4] p-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#1A1A1A] border-t border-[#C9A84C]/20 px-6 py-4 flex flex-col gap-4">
          {[
            { href: '/#services', label: 'Servicios' },
            { href: '/#barbers', label: 'Barbers' },
            { href: '/#gallery', label: 'Galería' },
            { href: '/#location', label: 'Ubicación' },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="text-sm text-[#f0ece4]/70 hover:text-[#C9A84C] transition-colors uppercase tracking-wide"
            >
              {label}
            </a>
          ))}
          <Link
            to="/about"
            onClick={() => setOpen(false)}
            className="text-sm text-[#f0ece4]/70 hover:text-[#C9A84C] transition-colors uppercase tracking-wide"
          >
            Nosotros
          </Link>
          <Link
            to="/booking"
            onClick={() => setOpen(false)}
            className="mt-2 px-5 py-3 bg-[#C9A84C] text-[#1A1A1A] text-sm font-semibold rounded text-center uppercase tracking-wide hover:bg-[#E2C97E] transition-colors"
          >
            Reservar
          </Link>
        </div>
      )}
    </nav>
  )
}
