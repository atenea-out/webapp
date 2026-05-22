'use client'

import { useState } from 'react'
import { clsx } from 'clsx'
import { DotsThreeCircle, Flask, GraduationCap, Scales, ShoppingCart } from '@phosphor-icons/react'
import type { IconWeight } from '@phosphor-icons/react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { AnimateIn } from '@/components/ui/AnimateIn'

export type IndustriaPreviewItem = {
  id: string
  label: string
  /** Nombre del icono (enum del CMS) */
  iconName?: string | null
  text: string
}

const fallback: IndustriaPreviewItem[] = [
  {
    id: 'otros',
    label: 'Otros sectores',
    iconName: 'DotsThreeCircle',
    text: 'Soluciones contables, financieras y legales adaptadas a las necesidades de cada industria.',
  },
]

function IndustryIcon({
  name,
  size,
  color,
  weight = 'duotone',
}: {
  name?: string | null
  size: number
  color?: string
  weight?: IconWeight
}) {
  switch (name) {
    case 'Flask':
      return <Flask size={size} color={color} weight={weight} />
    case 'ShoppingCart':
      return <ShoppingCart size={size} color={color} weight={weight} />
    case 'Scales':
      return <Scales size={size} color={color} weight={weight} />
    case 'GraduationCap':
      return <GraduationCap size={size} color={color} weight={weight} />
    default:
      return <DotsThreeCircle size={size} color={color} weight={weight} />
  }
}

export function IndustriasPreview({
  industrias: industriasProp,
}: {
  industrias?: IndustriaPreviewItem[] | null
} = {}) {
  const industrias = industriasProp && industriasProp.length > 0 ? industriasProp : fallback
  const [active, setActive] = useState(industrias[0].id)
  const currentIndex = industrias.findIndex((i) => i.id === active)
  const current = currentIndex >= 0 ? industrias[currentIndex] : industrias[0]

  return (
    <section className="bg-white px-6 py-[var(--section-pad)] md:px-[60px]">
      <div className="mx-auto max-w-[1280px]">
        <AnimateIn className="mb-12 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeader
            tag="Sectores"
            title="Experiencia en Industrias"
            subtitle="Profesionales especializados que ofrecen soluciones en múltiples sectores económicos."
          />
          <Button href="/contacto" variant="primary" size="md" className="flex-shrink-0 self-start lg:self-auto">
            Contáctanos
          </Button>
        </AnimateIn>

        <div className="grid gap-px border border-[var(--navy)]/10 bg-[var(--navy)]/10 lg:grid-cols-[0.44fr_0.56fr]">
          <AnimateIn>
            <div className="bg-white p-4 md:p-5">
              <div className="grid gap-px bg-[var(--navy)]/10">
                {industrias.map(({ id, label, iconName }) => {
                  const isActive = active === id

                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setActive(id)}
                      className={clsx(
                        'group relative flex min-h-[78px] items-center justify-between gap-5 bg-white px-5 py-4 text-left transition-colors duration-300',
                        isActive ? 'text-[var(--navy)]' : 'text-[var(--gray-mid)] hover:bg-[#f8fafc] hover:text-[var(--navy)]',
                      )}
                    >
                      <span
                        className={clsx(
                          'absolute inset-y-0 left-0 w-0.5 origin-top bg-[var(--coral)] transition-transform duration-300',
                          isActive ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100',
                        )}
                        aria-hidden="true"
                      />
                      <span className="flex min-w-0 items-center gap-4">
                        <span className="truncate font-[family-name:var(--font-display)] text-[19px] font-medium leading-tight">
                          {label}
                        </span>
                      </span>
                      <span
                        className={clsx(
                          'flex h-9 w-9 shrink-0 items-center justify-center border transition-colors duration-300',
                          isActive
                            ? 'border-[var(--coral)]/35 bg-[var(--coral)]/8 text-[var(--coral)]'
                            : 'border-[var(--navy)]/10 bg-[var(--bg)]/60 text-[var(--coral)]/65 group-hover:text-[var(--coral)]',
                        )}
                      >
                        <IndustryIcon name={iconName} size={18} color="currentColor" weight={isActive ? 'fill' : 'duotone'} />
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </AnimateIn>

          <AnimateIn delay={80}>
            <article className="relative flex min-h-[420px] h-full flex-col overflow-hidden bg-[var(--cream)] p-8 md:p-12">
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.22]"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(6,58,71,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(6,58,71,.07) 1px, transparent 1px)',
                  backgroundSize: '72px 72px',
                  maskImage: 'linear-gradient(to bottom right, black, transparent 82%)',
                }}
                aria-hidden="true"
              />

              <div className="relative flex items-start justify-between gap-8">
                <span className="font-[family-name:var(--font-body)] text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--coral)]">
                  Sector activo
                </span>
              </div>

              <div className="relative mt-auto max-w-[760px] border-l border-[var(--coral)]/35 pl-6 md:pl-8">
                <h3 className="mb-5 font-[family-name:var(--font-display)] text-[clamp(34px,4vw,58px)] font-medium leading-[1.02] text-[var(--navy)]">
                  {current.label}
                </h3>
                <p className="max-w-[680px] text-[16px] leading-[1.85] text-[var(--gray-mid)]">{current.text}</p>
              </div>
            </article>
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}
