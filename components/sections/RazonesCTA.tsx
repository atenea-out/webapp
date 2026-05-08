import { ArrowsLeftRight, Clock, Lightbulb, Lock, Handshake } from '@phosphor-icons/react/dist/ssr'
import type { Icon as PhIcon } from '@phosphor-icons/react'
import { Button } from '@/components/ui/Button'

type Razon = { icon: PhIcon; title: string; desc: string }

const defaultRazones: Razon[] = [
  { icon: ArrowsLeftRight, title: 'Flexibilidad',     desc: 'Adaptamos nuestros servicios a las necesidades específicas de cada cliente y su industria.' },
  { icon: Clock,           title: 'Oportunidad',      desc: 'Entregamos resultados en los tiempos acordados, garantizando cumplimiento de plazos legales.' },
  { icon: Lightbulb,       title: 'Soluciones',       desc: 'Enfoque en resolver problemas reales con estrategias prácticas y efectivas.' },
  { icon: Lock,            title: 'Confidencialidad', desc: 'Manejo estricto y seguro de la información financiera de nuestros clientes.' },
  { icon: Handshake,       title: 'Compromiso',       desc: 'Relación de largo plazo basada en confianza mutua y resultados verificables.' },
]

type RazonesCTAProps = {
  title?: string | null
  razones?: Razon[] | null
}

export function RazonesCTA({ title, razones: razonesProp }: RazonesCTAProps = {}) {
  const razones = razonesProp && razonesProp.length > 0 ? razonesProp : defaultRazones
  const headingHtml = title || 'Permítenos formar parte del\ncrecimiento de tu empresa'
  const headingLines = headingHtml.split('\n')
  return (
    <section className="bg-[var(--navy)] py-[var(--section-pad)] px-6 md:px-[60px]">
      <div className="max-w-[1280px] mx-auto">

        <div className="text-center mb-16">
          <span className="section-tag" style={{ color: 'var(--coral)' }}>Nuestra diferencia</span>
          <h2
            className="font-[family-name:var(--font-display)] font-medium text-[var(--cream)] leading-[1.15] mb-6 mt-1"
            style={{ fontSize: 'clamp(32px,4vw,56px)' }}
          >
            {headingLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < headingLines.length - 1 && <br />}
              </span>
            ))}
          </h2>
          <div className="w-12 h-0.5 bg-[var(--coral)] mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-white/[0.06] mb-14">
          {razones.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-[var(--navy)] px-6 py-8 hover:bg-[var(--navy-mid)] transition-colors duration-200 group">
              <div className="w-11 h-11 rounded-full border border-[var(--coral-border)] bg-[var(--coral-muted)] flex items-center justify-center mb-5 group-hover:border-[var(--coral)] transition-colors duration-200">
                <Icon size={20} color="var(--coral)" weight="duotone" />
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-[17px] font-medium text-[var(--cream)] mb-3">
                {title}
              </h3>
              <p className="text-[13px] text-[var(--cream-dark)] leading-[1.7]">{desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button href="/contacto" variant="ghost" size="lg">
            Hablemos de tu empresa
          </Button>
        </div>
      </div>
    </section>
  )
}
