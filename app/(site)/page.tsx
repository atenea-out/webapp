import { Hero }              from '@/components/sections/Hero'
import { StatsBar }          from '@/components/sections/StatsBar'
import { QuienesSomos }      from '@/components/sections/QuienesSomos'
import { ServiciosPreview }  from '@/components/sections/ServiciosPreview'
import type { ServicePreviewItem } from '@/components/sections/ServiciosPreview'
import { RazonesCTA }        from '@/components/sections/RazonesCTA'
import { IndustriasPreview } from '@/components/sections/IndustriasPreview'
import type { IndustriaPreviewItem } from '@/components/sections/IndustriasPreview'
import { FundadoraPreview }  from '@/components/sections/FundadoraPreview'
import type { Metadata }     from 'next'
import { getSiteSettings, getServices, getIndustries, getFounder } from '@/lib/queries'
import { getIcon } from '@/lib/icons'
import type { Media } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Atenea Outsourcing | Consultoría Contable y Financiera en Ecuador',
  description:
    'Firma especializada en contabilidad, finanzas y tributación con más de 20 años de trayectoria. Servicios de outsourcing contable, nómina, tesorería y asesoría legal en Ecuador.',
}

export const revalidate = 60

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export default async function HomePage() {
  const [settings, services, industries, founder] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getIndustries(),
    getFounder(),
  ])

  // Services for the preview grid (first 6)
  const servicePreviewItems: ServicePreviewItem[] = services.slice(0, 6).map((s, i) => ({
    num: s.number || String(i + 1).padStart(2, '0'),
    iconName: s.icon ?? null,
    slug: s.slug!,
    title: s.title,
    description: s.shortDescription,
  }))

  // Industrias tabs — use descriptionShort, fallback to descriptionLong
  const industriasItems: IndustriaPreviewItem[] = industries.map((ind) => ({
    id: ind.slug || slugify(ind.title),
    label: ind.title,
    iconName: ind.icon ?? null,
    text: ind.descriptionShort || ind.descriptionLong || '',
  }))

  // Hero data
  const heroEspecialidades =
    settings.heroEspecialidades?.map((e) => e.text).filter(Boolean) ?? null
  const heroCredits = settings.heroCredits?.map((c) => c.text).filter(Boolean) ?? null

  // Stats
  const stats =
    settings.stats
      ?.filter((s) => s.value && s.label)
      .map((s) => ({ value: s.value!, label: s.label!, detail: s.detail ?? '' })) ?? null

  // Quienes somos valores
  const qsValores =
    settings.valores?.map((v) => {
      const img = v.image && typeof v.image !== 'number' ? (v.image as Media) : null
      return {
        title: v.title,
        description: v.description,
        imgSrc: img?.url || v.imageUrl || '',
      }
    }) ?? null

  // Razones
  const razonesData =
    settings.razones?.map((r) => ({
      icon: getIcon(r.icon),
      title: r.title,
      desc: r.description,
    })) ?? null

  // Fundadora
  const founderPhoto =
    founder?.photo && typeof founder.photo !== 'number' ? (founder.photo as Media) : null
  const founderBioParagraphs =
    settings.fundadoraBioShort?.map((p) => p.text).filter(Boolean) ?? null
  const founderChips = founder?.shortCredentials?.map((c) => c.text).filter(Boolean) ?? null

  return (
    <>
      <Hero
        badge={settings.heroBadge}
        title={settings.heroTitle}
        highlight={settings.heroHighlight}
        subtitle={settings.heroSubtitle}
        ctaPrimaryLabel={settings.heroCtaPrimaryLabel}
        ctaPrimaryHref={settings.heroCtaPrimaryHref}
        ctaSecondaryLabel={settings.heroCtaSecondaryLabel}
        ctaSecondaryHref={settings.heroCtaSecondaryHref}
        especialidades={heroEspecialidades}
        credits={heroCredits}
      />
      <StatsBar stats={stats} />
      <QuienesSomos text={settings.quienesSomosText} valores={qsValores} />
      <ServiciosPreview services={servicePreviewItems} />
      <RazonesCTA title={settings.razonesTitle} razones={razonesData} />
      <IndustriasPreview industrias={industriasItems} />
      <FundadoraPreview
        name={founder?.name}
        role={founder?.role}
        photoUrl={founderPhoto?.url}
        photoAlt={founderPhoto?.alt}
        bioParagraphs={founderBioParagraphs}
        chips={founderChips}
        linkedin={founder?.linkedin}
      />
    </>
  )
}
