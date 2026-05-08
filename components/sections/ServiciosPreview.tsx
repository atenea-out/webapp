'use client'

import Link from 'next/link'
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimateIn }    from '@/components/ui/AnimateIn'
import { Button } from '@/components/ui/Button'
import { getIcon } from '@/lib/icons'

export type ServicePreviewItem = {
  num: string
  /** Nombre del icono (enum del CMS) — ej. 'BookOpen' */
  iconName?: string | null
  slug: string
  title: string
  description: string
}

/** SVG + idéntico al patrón Ruixen — 24×24, centrado sobre la esquina con -12px offset */
function PlusIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width={20}
      height={20}
      strokeWidth="1"
      stroke="currentColor"
      className={`text-[var(--navy)]/30 ${className}`}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  )
}

function CornerPlusIcons() {
  return (
    <>
      <PlusIcon className="absolute -top-[10px] -left-[10px]" />
      <PlusIcon className="absolute -top-[10px] -right-[10px]" />
      <PlusIcon className="absolute -bottom-[10px] -left-[10px]" />
      <PlusIcon className="absolute -bottom-[10px] -right-[10px]" />
    </>
  )
}

export function ServiciosPreview({ services }: { services: ServicePreviewItem[] }) {
  return (
    <section className="py-[var(--section-pad)] px-6 md:px-[60px] bg-white">
      <div className="max-w-[1280px] mx-auto">

        {/* Header */}
        <AnimateIn className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <SectionHeader
            tag="Lo que ofrecemos"
            title="Nuestros Servicios"
            subtitle="Asesoría integral en contabilidad, finanzas y cumplimiento tributario. Soluciones que agregan valor real a tu empresa."
          />
          <Button href="/contacto" variant="primary" size="md" className="self-start lg:self-auto flex-shrink-0">
            Consultar ahora
          </Button>
        </AnimateIn>

        {/* Grid con gap — cada card es independiente, los + flotan sobre las esquinas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map(({ num, title, description, iconName, slug }, i) => {
            const Icon = getIcon(iconName)
            return (
            <AnimateIn key={slug} delay={i * 60}>
              <Link
                href={`/servicios/${slug}`}
                className="group relative flex flex-col gap-5 p-8 min-h-[220px]
                           border border-[var(--navy)]/10
                           bg-white hover:bg-[var(--bg)]
                           transition-colors duration-300 h-full"
              >
                <CornerPlusIcons />

                {/* Top: número + icono */}
                <div className="flex items-center justify-between">
                  <span className="font-[family-name:var(--font-body)] text-[11px] tracking-[0.15em] text-[var(--navy)]/30 font-medium select-none">
                    {num}
                  </span>
                  <Icon
                    size={20}
                    color="var(--coral)"
                    weight="duotone"
                    className="opacity-45 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>

                {/* Línea coral */}
                <div className="w-7 h-px bg-[var(--coral)] opacity-50 group-hover:w-12 group-hover:opacity-90 transition-all duration-300" />

                {/* Body */}
                <div className="flex-1">
                  <h3 className="font-[family-name:var(--font-display)] text-[17px] font-medium text-[var(--navy)] mb-3 leading-[1.3]">
                    {title}
                  </h3>
                  <p className="text-[13px] text-[var(--gray-mid)] leading-[1.8]">{description}</p>
                </div>

                {/* CTA */}
                <div className="flex items-center gap-1.5 text-[10px] tracking-[0.12em] uppercase font-medium font-[family-name:var(--font-body)] text-[var(--coral)] opacity-55 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                  Ver servicio <ArrowUpRight size={12} />
                </div>
              </Link>
            </AnimateIn>
            )
          })}
        </div>

      </div>
    </section>
  )
}
