import { ArrowsLeftRight, Clock, Handshake, Lightbulb, Lock } from '@phosphor-icons/react/dist/ssr'
import type { Icon as PhIcon } from '@phosphor-icons/react'
import { Button } from '@/components/ui/Button'
import { AnimateIn } from '@/components/ui/AnimateIn'

type Razon = { icon: PhIcon; title: string; desc: string }

const defaultRazones: Razon[] = [
  {
    icon: ArrowsLeftRight,
    title: 'Flexibilidad',
    desc: 'Adaptamos nuestros servicios a las necesidades específicas de cada cliente y su industria.',
  },
  {
    icon: Clock,
    title: 'Oportunidad',
    desc: 'Entregamos resultados en los tiempos acordados, garantizando cumplimiento de plazos legales.',
  },
  {
    icon: Lightbulb,
    title: 'Soluciones',
    desc: 'Enfoque en resolver problemas reales con estrategias prácticas y efectivas.',
  },
  {
    icon: Lock,
    title: 'Confidencialidad',
    desc: 'Manejo estricto y seguro de la información financiera de nuestros clientes.',
  },
  {
    icon: Handshake,
    title: 'Compromiso',
    desc: 'Relación de largo plazo basada en confianza mutua y resultados verificables.',
  },
]

type RazonesCTAProps = {
  title?: string | null
  razones?: Razon[] | null
}

function CornerMark({ className = '' }: { className?: string }) {
  return (
    <span
      className={`pointer-events-none absolute h-3 w-3 border-white/14 ${className}`}
      aria-hidden="true"
    />
  )
}

export function RazonesCTA({ title, razones: razonesProp }: RazonesCTAProps = {}) {
  const razones = razonesProp && razonesProp.length > 0 ? razonesProp : defaultRazones
  const headingHtml = title || 'Permítenos formar parte del\ncrecimiento de tu empresa'
  const headingLines = headingHtml.split('\n')

  return (
    <section className="relative overflow-hidden bg-[var(--navy)] px-6 py-[var(--section-pad)] md:px-[60px]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.11) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.11) 1px, transparent 1px)',
          backgroundSize: '96px 96px',
          maskImage: 'linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)',
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1280px]">
        <AnimateIn className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <div>
            <span className="section-tag text-[var(--coral)]">Nuestra diferencia</span>
            <h2
              className="mt-3 max-w-[720px] font-[family-name:var(--font-display)] font-medium leading-[1.07] text-[var(--cream)]"
              style={{ fontSize: 'clamp(34px,4.9vw,70px)' }}
            >
              {headingLines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < headingLines.length - 1 && <br />}
                </span>
              ))}
            </h2>
          </div>

          <div className="max-w-[520px] lg:ml-auto">
            <p className="text-[15px] leading-[1.85] text-white/62">
              Un modelo de acompañamiento diseñado para operar con criterio, proteger información
              sensible y sostener decisiones financieras con trazabilidad.
            </p>
            <div className="mt-7">
              <Button href="/contacto" variant="ghost" size="lg">
                Hablemos de tu empresa
              </Button>
            </div>
          </div>
        </AnimateIn>

        <div className="mt-10 md:mt-14 grid grid-cols-1 gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
          {razones.map(({ icon: Icon, title, desc }, index) => (
            <AnimateIn key={title} delay={index * 55}>
              <article className="group relative flex min-h-[220px] md:min-h-[260px] h-full flex-col bg-[var(--navy)] p-6 transition-colors duration-300 hover:bg-[#073f4c] md:p-7">
                <CornerMark className="left-0 top-0 border-l border-t" />
                <CornerMark className="right-0 top-0 border-r border-t" />
                <CornerMark className="bottom-0 left-0 border-b border-l" />
                <CornerMark className="bottom-0 right-0 border-b border-r" />

                <div
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-[var(--coral)] transition-transform duration-300 group-hover:scale-x-100"
                  aria-hidden="true"
                />

                <div className="mb-8 md:mb-10 flex items-start justify-end gap-6">
                  <span className="flex h-10 w-10 items-center justify-center border border-white/12 bg-white/[0.03] text-[var(--coral)]">
                    <Icon size={20} color="currentColor" weight="duotone" />
                  </span>
                </div>

                <div>
                  <h3 className="mb-4 font-[family-name:var(--font-display)] text-[21px] font-medium leading-tight text-[var(--cream)]">
                    {title}
                  </h3>
                  <p className="text-[13px] leading-[1.75] text-white/55">{desc}</p>
                </div>
              </article>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
