import { Link } from 'react-router-dom'

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  )
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/>
    </svg>
  )
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  )
}

const socials = [
  {
    name: 'Instagram',
    handle: '@waskarpeluqueria',
    description: 'Fotos de los mejores cortes, diseños y el día a día en la barbería.',
    link: 'https://www.instagram.com/',
    Icon: InstagramIcon,
    color: 'from-purple-500 via-pink-500 to-orange-400',
  },
  {
    name: 'TikTok',
    handle: '@waskarpeluqueria',
    description: 'Vídeos de transformaciones, técnicas y el ambiente de la barbería.',
    link: 'https://www.tiktok.com/',
    Icon: TikTokIcon,
    color: 'from-cyan-400 to-pink-500',
  },
  {
    name: 'YouTube',
    handle: 'Waskar Peluquería',
    description: 'Tutoriales, vlogs y contenido exclusivo del equipo.',
    link: 'https://www.youtube.com/',
    Icon: YouTubeIcon,
    color: 'from-red-500 to-red-700',
  },
]

export default function Socials() {
  return (
    <div className="min-h-screen bg-[#1A1A1A] pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-xs tracking-[0.4em] uppercase">Ponte al tanto</span>
            <div className="h-px w-12 bg-[#C9A84C]" />
          </div>
          <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-[#f0ece4] mb-4">
            Redes Sociales
          </h1>
          <p className="text-[#f0ece4]/50 text-sm max-w-sm mx-auto">
            Síguenos para ver los últimos cortes, diseños y novedades de la barbería.
          </p>
        </div>

        {/* Social cards */}
        <div className="flex flex-col gap-6 mb-12">
          {socials.map(({ name, handle, description, link, Icon, color }) => (
            <a
              key={name}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-6 bg-[#2A2A2A] border border-[#C9A84C]/20 rounded-lg p-6 hover:border-[#C9A84C]/60 transition-all duration-300 hover:shadow-[0_0_40px_rgba(201,168,76,0.08)]"
            >
              {/* Icon */}
              <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}>
                <Icon className="w-7 h-7 text-white" />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#f0ece4]">
                    {name}
                  </h3>
                  <span className="text-[#C9A84C] text-xs tracking-wide">{handle}</span>
                </div>
                <p className="text-[#f0ece4]/50 text-sm">{description}</p>
              </div>

              {/* Arrow */}
              <div className="flex-shrink-0 text-[#C9A84C]/40 group-hover:text-[#C9A84C] group-hover:translate-x-1 transition-all duration-300 text-lg">
                →
              </div>
            </a>
          ))}
        </div>

        <div className="text-center">
          <Link to="/" className="text-[#C9A84C]/60 text-sm hover:text-[#C9A84C] transition-colors">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
