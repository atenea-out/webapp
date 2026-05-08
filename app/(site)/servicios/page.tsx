import Link from 'next/link'
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import type { Metadata } from 'next'
import { getServices, getSiteSettings } from '@/lib/queries'
import { getIcon } from '@/lib/icons'
import { settingPath, settingText } from '@/lib/settings-text'

export const metadata: Metadata = {
  title: 'Servicios',
  description:
    'Asesoria integral en outsourcing contable, nomina, tesoreria, apoyo administrativo, revisiones especiales y legal e impuestos en Ecuador.',
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
              'Soluciones integrales en contabilidad, finanzas y cumplimiento tributario, disenadas para agregar valor real a tu empresa.',
            )}
          </p>
        </div>
      </section>

      <section className="py-20 px-6 md:px-[60px] bg-[var(--bg)]">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#e2e8f0]">
          {services.map((s) => {
            const Icon = getIcon(s.icon)
            return (
              <Link
                key={s.slug}
                href={`/servicios/${s.slug}`}
                className="group bg-white p-8 md:p-10 flex flex-col gap-6 hover:bg-[var(--bg)] transition-colors duration-200 cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <span
                    className="font-[family-name:var(--font-display)] font-bold text-[var(--navy)] leading-none select-none"
                    style={{ fontSize: 'clamp(42px,5vw,56px)', opacity: 0.07 }}
                  >
                    {s.number}
                  </span>
                  <div className="w-10 h-10 bg-[var(--coral-muted)] border border-[var(--coral-border)] flex items-center justify-center flex-shrink-0 opacity-60 group-hover:opacity-100 group-hover:border-[var(--coral)] transition-all duration-200">
                    <Icon size={18} color="var(--coral)" weight="duotone" />
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="font-[family-name:var(--font-display)] text-[18px] font-medium text-[var(--navy)] mb-3 leading-[1.3]">
                    {s.title}
                  </h2>
                  <p className="text-[13px] text-[var(--gray-mid)] leading-[1.75]">{s.shortDescription}</p>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] tracking-[0.1em] uppercase text-[var(--coral)] font-medium font-[family-name:var(--font-body)] opacity-50 group-hover:opacity-100 translate-y-0.5 group-hover:translate-y-0 transition-all duration-200">
                  {settingText(settings, 'servicesCardLinkLabel', 'Ver detalle')} <ArrowUpRight size={13} />
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="py-16 px-6 md:px-[60px] bg-white border-t border-[#e2e8f0]">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-[family-name:var(--font-display)] text-[22px] font-medium text-[var(--navy)]">
              {settingText(settings, 'servicesCtaTitle', 'No estas seguro que servicio necesitas?')}
            </p>
            <p className="text-[14px] text-[var(--gray-mid)] mt-1">
              {settingText(settings, 'servicesCtaDescription', 'Contactanos y te orientamos sin compromiso.')}
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
