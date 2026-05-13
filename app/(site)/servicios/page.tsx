import Link from 'next/link'
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import type { Metadata } from 'next'
import { getServices, getSiteSettings } from '@/lib/queries'
import { getIcon } from '@/lib/icons'
import { settingPath, settingText } from '@/lib/settings-text'

export const metadata: Metadata = {
  title: 'Servicios',
  description:
    'Asesoría integral en outsourcing contable, nómina, tesorería, apoyo administrativo, revisiones especiales y legal e impuestos en Ecuador.',
}

export const revalidate = 60

export default async function ServiciosPage() {
  const [services, settings] = await Promise.all([getServices(), getSiteSettings()])
  const ctaHref = settingPath(settings, 'servicesCtaHref', '/contacto')

  return (
    <>
      <section className="bg-[var(--navy)] pt-20 pb-16 px-6 md:px-[60px] border-b border-white/[0.07]">
        <div className="max-w-[1280px] mx-auto">
          <span className="section-tag">{settingText(settings, 'servicesPageEyebrow', 'Lo que ofrecemos')}</span>
          <h1
            className="font-[family-name:var(--font-display)] font-medium text-[var(--cream)] leading-[1.1] mb-5 mt-1"
            style={{ fontSize: 'clamp(32px,4vw,52px)' }}
          >
            {settingText(settings, 'servicesPageTitle', 'Nuestros Servicios')}
          </h1>
          <p className="text-[16px] font-light text-white/55 leading-[1.75] max-w-[560px]">
            {settingText(
              settings,
              'servicesPageDescription',
              'Soluciones integrales en contabilidad, finanzas y cumplimiento tributario, diseñadas para agregar valor real a tu empresa.',
            )}
          </p>
        </div>
      </section>

      <section className="py-20 px-6 md:px-[60px] bg-[var(--bg)]">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-10 max-w-[780px]">
            <span className="section-tag">Arquitectura de servicio</span>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-[clamp(26px,3vw,38px)] font-medium leading-tight text-[var(--navy)]">
              Soluciones conectadas para operar con control
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px border border-[#cfdbe6] bg-[#cfdbe6]">
          {services.map((s) => {
            const Icon = getIcon(s.icon)
            return (
              <Link
                key={s.slug}
                href={`/servicios/${s.slug}`}
                className="group relative flex min-h-[285px] flex-col overflow-hidden bg-white p-7 transition-colors duration-300 hover:bg-[#f8fbfd] md:p-9"
              >
                <span className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l border-t border-[var(--navy)]/16" />
                <span className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r border-t border-[var(--navy)]/16" />
                <span className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b border-l border-[var(--navy)]/16" />
                <span className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b border-r border-[var(--navy)]/16" />
                <span
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-[var(--coral)] transition-transform duration-300 group-hover:scale-x-100"
                  aria-hidden="true"
                />

                <div className="flex items-start justify-between gap-6">
                  <span className="font-[family-name:var(--font-body)] text-[11px] font-medium tracking-[0.18em] text-[var(--navy)]/36 select-none">
                    {s.number}
                  </span>
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center border border-[var(--coral-border)] bg-[var(--coral-muted)] text-[var(--coral)] transition-colors duration-300 group-hover:border-[var(--coral)]">
                    <Icon size={20} color="currentColor" weight="duotone" />
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-end pt-16">
                  <h2 className="font-[family-name:var(--font-display)] text-[22px] font-medium text-[var(--navy)] mb-4 leading-[1.18]">
                    {s.title}
                  </h2>
                  <p className="text-[13px] text-[var(--gray-mid)] leading-[1.75]">{s.shortDescription}</p>
                </div>

                <div className="mt-7 flex items-center gap-1.5 text-[10px] tracking-[0.14em] uppercase text-[var(--coral)] font-medium font-[family-name:var(--font-body)] opacity-60 group-hover:opacity-100 translate-y-0.5 group-hover:translate-y-0 transition-all duration-200">
                  {settingText(settings, 'servicesCardLinkLabel', 'Ver detalle')} <ArrowUpRight size={13} />
                </div>
              </Link>
            )
          })}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 md:px-[60px] bg-white border-t border-[#e2e8f0]">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-[family-name:var(--font-display)] text-[22px] font-medium text-[var(--navy)]">
              {settingText(settings, 'servicesCtaTitle', '¿No estás seguro qué servicio necesitas?')}
            </p>
            <p className="text-[14px] text-[var(--gray-mid)] mt-1">
              {settingText(settings, 'servicesCtaDescription', 'Contáctanos y te orientamos sin compromiso.')}
            </p>
          </div>
          <Link
            href={ctaHref}
            className="flex-shrink-0 inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--navy)] text-white text-[12px] font-medium tracking-[0.08em] uppercase border border-[var(--navy)] hover:bg-[var(--coral)] hover:border-[var(--coral)] transition-all duration-200 font-[family-name:var(--font-body)]"
          >
            {settingText(settings, 'servicesCtaLabel', 'Hablar con un experto')} <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>
    </>
  )
}
