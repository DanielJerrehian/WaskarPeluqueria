import { MapPin, Clock, Phone } from 'lucide-react'

const WHATSAPP_URL = 'https://wa.me/34600754506?text=Hola%2C%20me%20gustar%C3%ADa%20reservar%20una%20cita.'

const hours = [
  { day: 'Martes - Viernes', time: '12:00 – 21:00' },
  { day: 'Sábado', time: '11:00 – 21:00' },
  { day: 'Domingo', time: '11:00 – 21:00' },
]

export default function Location() {
  return (
    <section id="location" className="py-24 bg-[#1A1A1A]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section heading */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-xs tracking-[0.4em] uppercase">Encuéntranos</span>
            <div className="h-px w-12 bg-[#C9A84C]" />
          </div>
          <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-[#f0ece4]">
            Ubicación
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Info */}
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#C9A84C]/10 rounded-lg flex-shrink-0">
                <MapPin className="w-5 h-5 text-[#C9A84C]" />
              </div>
              <div>
                <h4 className="font-['Playfair_Display'] text-lg font-semibold text-[#f0ece4] mb-1">
                  Dirección
                </h4>
                <a
                  href="https://maps.app.goo.gl/Uj5hxYp8RxgBhmCo9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#f0ece4]/60 text-sm leading-relaxed hover:text-[#C9A84C] transition-colors"
                >
                  Carrer de les Basses de Sant Pere, 1, Local 1<br />
                  Ciutat Vella, 08003 Barcelona
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#C9A84C]/10 rounded-lg flex-shrink-0">
                <Clock className="w-5 h-5 text-[#C9A84C]" />
              </div>
              <div>
                <h4 className="font-['Playfair_Display'] text-lg font-semibold text-[#f0ece4] mb-3">
                  Horario
                </h4>
                <div className="space-y-2">
                  {hours.map(({ day, time }) => (
                    <div key={day} className="flex justify-between gap-8 text-sm">
                      <span className="text-[#f0ece4]/60">{day}</span>
                      <span className={time === 'Cerrado' ? 'text-[#f0ece4]/30' : 'text-[#C9A84C]'}>
                        {time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#C9A84C]/10 rounded-lg flex-shrink-0">
                <Phone className="w-5 h-5 text-[#C9A84C]" />
              </div>
              <div>
                <h4 className="font-['Playfair_Display'] text-lg font-semibold text-[#f0ece4] mb-1">
                  Contacto
                </h4>
                <p className="text-[#f0ece4]/60 text-sm mb-3">
                  +34 600 754 506
                </p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#25D366] text-white text-sm font-semibold rounded hover:bg-[#1ebe5c] transition-colors duration-200"
                >
                  {/* WhatsApp SVG icon */}
                  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Escribir por WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Google Maps embed */}
          <div className="relative rounded-lg overflow-hidden border border-[#C9A84C]/20 md:h-96">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d187.08419639086665!2d2.180346001556182!3d41.38826692317559!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a3527b743fe3%3A0x5aed23448e7c1ff!2sWaskar%20Barber%20shop%20peluquer%C3%ADa!5e0!3m2!1sen!2ses!4v1776334901986!5m2!1sen!2ses"
              width="100%"
              height="100%" 
              style={{border:0}}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"></iframe>
            {/* Overlay link */}
            <a
              href="https://maps.app.goo.gl/Uj5hxYp8RxgBhmCo9"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-3 right-3 px-3 py-1.5 bg-[#1A1A1A]/90 text-[#C9A84C] text-xs font-semibold rounded border border-[#C9A84C]/30 hover:bg-[#C9A84C] hover:text-[#1A1A1A] transition-colors"
            >
              Cómo llegar →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
