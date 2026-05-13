'use client'

import Link from 'next/link'
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { Button } from '@/components/ui/Button'
import { getIcon } from '@/lib/icons'

export type ServicePreviewItem = {
  num: string
  iconName?: string | null
  slug: string
  title: string
  description: string
}

function CornerMark({ className = '' }: { className?: string }) {
  return (
    <span
      className={`pointer-events-none absolute h-3 w-3 border-[var(--navy)]/12 ${className}`}
      aria-hidden="true"
    />
  )
}

function CornerMarks() {
  return (
    <>
      <CornerMark className="left-0 top-0 border-l border-t" />
      <CornerMark className="right-0 top-0 border-r border-t" />
      <CornerMark className="bottom-0 left-0 border-b border-l" />
      <CornerMark className="bottom-0 right-0 border-b border-r" />
    </>
  )
}

export function ServiciosPreview({ services }: { services: ServicePreviewItem[] }) {
  return (
    <section className="py-[var(--section-pad)] px-6 md:px-[60px] bg-white">
      <div className="max-w-[1280px] mx-auto">
        <AnimateIn className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10 md:mb-14">
          <SectionHeader
            tag="Lo que ofrecemos"
            title="Nuestros Servicios"
            subtitle="Asesoría integral en contabilidad, finanzas y cumplimiento tributario. Soluciones que agregan valor real a tu empresa."
          />
          <Button href="/contacto" variant="primary" size="md" className="self-start lg:self-auto flex-shrink-0">
            Consultar ahora
          </Button>
        </AnimateIn>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px border border-[var(--navy)]/10 bg-[var(--navy)]/10">
            {services.map(({ num, title, description, iconName, slug }, i) => {
              const Icon = getIcon(iconName)

              return (
                <AnimateIn key={slug} delay={i * 60}>
                  <Link
                    href={`/servicios/${slug}`}
                    className="group relative flex min-h-[220px] md:min-h-[250px] h-full flex-col overflow-hidden bg-white p-6 md:p-8 transition-colors duration-300 hover:bg-[#f8fafc]"
                  >
                    <CornerMarks />

                    <div
                      className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-[var(--coral)] transition-transform duration-300 group-hover:scale-x-100"
                      aria-hidden="true"
                    />

                    <div className="flex items-start justify-between gap-6">
                      <span className="font-[family-name:var(--font-body)] text-[11px] tracking-[0.18em] text-[var(--navy)]/34 font-medium select-none">
                        {num}
                      </span>
                      <span className="flex h-10 w-10 items-center justify-center border border-[var(--navy)]/10 bg-[var(--bg)]/60 text-[var(--coral)] transition-colors duration-300 group-hover:border-[var(--coral)]/35 group-hover:bg-[var(--coral)]/8">
                        <Icon
                          size={20}
                          color="currentColor"
                          weight="duotone"
                          className="opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                        />
                      </span>
                    </div>

                    <div className="mt-7 md:mt-8 h-px w-full bg-[var(--navy)]/8" aria-hidden="true" />

                    <div className="flex-1 pt-5 md:pt-6">
                      <h3 className="font-[family-name:var(--font-display)] text-[20px] font-medium text-[var(--navy)] mb-4 leading-[1.18] tracking-[-0.01em]">
                        {title}
                      </h3>
                      <p className="text-[13px] text-[var(--gray-mid)] leading-[1.75] max-w-[32rem]">
                        {description}
                      </p>
                    </div>

                    <div className="mt-6 md:mt-7 flex items-center gap-1.5 text-[10px] tracking-[0.14em] uppercase font-medium font-[family-name:var(--font-body)] text-[var(--coral)] opacity-60 transition-opacity duration-300 group-hover:opacity-100">
                      Ver servicio <ArrowUpRight size={12} />
                    </div>
                  </Link>
                </AnimateIn>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
