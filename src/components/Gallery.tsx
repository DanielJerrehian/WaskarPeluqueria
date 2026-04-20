function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  )
}

// Replace these with real image URLs or import local images
// Recommended: square images, min 600x600px
const photos = Array.from({ length: 6 }, (_, index) => ({
  id: index + 1,
  src: `/gallery/photo-${index + 1}.jpg`,
  alt: `Corte de pelo ejemplo ${index + 1}`,
}))

console.log(photos)

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-[#111]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section heading */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-xs tracking-[0.4em] uppercase">Nuestro trabajo</span>
            <div className="h-px w-12 bg-[#C9A84C]" />
          </div>
          <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-[#f0ece4] mb-4">
            Galería
          </h2>
          <p className="text-[#f0ece4]/50 text-sm">
            Síguenos en Instagram para ver más trabajos
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {photos.map(({ id, src, alt }) => (
            <div
              key={id}
              className="group relative aspect-square bg-[#2A2A2A] border border-[#C9A84C]/10 rounded-lg overflow-hidden hover:border-[#C9A84C]/40 transition-all duration-300"
            >
              {/* Placeholder content — replace with <img> once photos are ready */}
              {/* <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-[#f0ece4]/20">
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
                <span className="text-xs">Foto {id}</span>
              </div> */}
              <img 
                src={src}
                alt={alt}
                className="w-full h-full object-cover"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#C9A84C]/0 group-hover:bg-[#C9A84C]/10 transition-colors duration-300" />
              <span className="sr-only">{alt}</span>
            </div>
          ))}
        </div>

        {/* Instagram CTA */}
        <div className="text-center mt-10">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 border border-[#C9A84C]/40 text-[#C9A84C] text-sm font-semibold uppercase tracking-wide rounded hover:bg-[#C9A84C] hover:text-[#1A1A1A] transition-all duration-300"
          >
            <InstagramIcon className="w-4 h-4" />
            Ver más en Instagram
          </a>
        </div>
      </div>
    </section>
  )
}
