'use client'

import { useState } from 'react'
import { clsx } from 'clsx'
import { DotsThreeCircle, Flask, GraduationCap, Scales, ShoppingCart } from '@phosphor-icons/react'
import type { IconWeight } from '@phosphor-icons/react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'

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

export function IndustriasPreview({ industrias: industriasProp }: { industrias?: IndustriaPreviewItem[] | null } = {}) {
  const industrias = industriasProp && industriasProp.length > 0 ? industriasProp : fallback
  const [active, setActive] = useState(industrias[0].id)
  const current = industrias.find((i) => i.id === active) ?? industrias[0]

  return (
    <section className="py-[var(--section-pad)] px-6 md:px-[60px] bg-white">
      <div className="max-w-[1280px] mx-auto">

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <SectionHeader
            tag="Sectores"
            title="Experiencia en Industrias"
            subtitle="Profesionales especializados que ofrecen soluciones en múltiples sectores económicos."
          />
          <Button href="/contacto" variant="primary" size="md" className="flex-shrink-0 self-start lg:self-auto">
            Contáctanos
          </Button>
        </div>

        {/* Tab buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          {industrias.map(({ id, label, iconName }) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={clsx(
                'flex items-center gap-2 px-4 py-2.5 text-[12px] font-medium tracking-[0.05em] uppercase rounded-sm border transition-all duration-200 font-[family-name:var(--font-body)]',
                active === id
                  ? 'bg-[var(--navy)] text-white border-[var(--navy)]'
                  : 'bg-transparent text-[var(--gray-mid)] border-[#e2e8f0] hover:border-[var(--navy)] hover:text-[var(--navy)]',
              )}
            >
              <IndustryIcon name={iconName} size={14} weight={active === id ? 'fill' : 'duotone'} />
              {label}
            </button>
          ))}
        </div>

        {/* Content panel */}
        <div className="bg-[var(--bg)] border border-[#e2e8f0] rounded-sm p-8 md:p-12 border-l-4 border-l-[var(--coral)]">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-[var(--coral-muted)] border border-[var(--coral-border)] flex items-center justify-center flex-shrink-0">
              <IndustryIcon name={current.iconName} size={20} color="var(--coral)" weight="duotone" />
            </div>
            <h3 className="font-[family-name:var(--font-display)] text-[22px] font-medium text-[var(--navy)]">
              {current.label}
            </h3>
          </div>
          <p className="text-[15px] text-[var(--gray-mid)] leading-[1.8] max-w-[760px]">{current.text}</p>
        </div>
      </div>
    </section>
  )
}
