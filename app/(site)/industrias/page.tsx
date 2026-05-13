import { Button } from '@/components/ui/Button'
import type { Metadata } from 'next'
import { getIndustries, getSiteSettings } from '@/lib/queries'
import { getIcon } from '@/lib/icons'
import { RichText, richTextToPlain } from '@/lib/lexical-to-react'
import { settingPath, settingText } from '@/lib/settings-text'

export const metadata: Metadata = {
  title: 'Industrias',
  description:
    'Atenea Outsourcing ofrece servicios especializados para los sectores farmacéutico, comercial, legal, educativo y más en Ecuador.',
}

export const revalidate = 60

export default async function IndustriasPage() {
  const [industrias, settings] = await Promise.all([getIndustries(), getSiteSettings()])

  return (
    <>
      <section className="bg-[var(--navy)] pt-20 pb-16 px-6 md:px-[60px] border-b border-white/[0.07]">
        <div className="max-w-[1280px] mx-auto">
          <span className="section-tag">{settingText(settings, 'industriesPageEyebrow', 'Sectores')}</span>
          <h1
            className="font-[family-name:var(--font-display)] font-medium text-[var(--cream)] leading-[1.1] mt-1 mb-5"
            style={{ fontSize: 'clamp(32px,4vw,52px)' }}
          >
            {settingText(settings, 'industriesPageTitle', 'Experiencia en Industrias')}
          </h1>
          <p className="text-[16px] font-light text-white/55 leading-[1.75] max-w-[560px]">
            {settingText(
              settings,
              'industriesPageDescription',
              'Profesionales altamente especializados que ofrecen soluciones en múltiples sectores económicos de Ecuador y Latinoamérica.',
            )}
          </p>
        </div>
      </section>

      <section className="py-20 px-6 md:px-[60px] bg-[var(--bg)]">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-10 max-w-[760px]">
            <div>
              <span className="section-tag">Mapa sectorial</span>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-[clamp(26px,3vw,38px)] font-medium leading-tight text-[var(--navy)]">
                Especialización aplicada a cada industria
              </h2>
            </div>
          </div>

          <div className="border border-[#cfdbe6] bg-white">
          {industrias.map((ind) => {
            const Icon = getIcon(ind.icon)
            const services = ind.services ?? []
            const descText = ind.descriptionLong?.trim() || richTextToPlain(ind.description) || ''
            return (
              <div
                key={ind.id}
                className="group relative grid grid-cols-1 overflow-hidden border-b border-[#d8e2eb] last:border-b-0 lg:grid-cols-12"
              >
                <span className="pointer-events-none absolute -left-px -top-px hidden h-4 w-4 border-l border-t border-[var(--coral)]/55 lg:block" />
                <span className="pointer-events-none absolute -right-px -top-px hidden h-4 w-4 border-r border-t border-[#9fb2c2] lg:block" />
                <span className="pointer-events-none absolute bottom-[-1px] left-[40%] hidden h-3 w-3 -translate-x-1/2 border-b border-r border-[#9fb2c2] lg:block" />

                <div className="relative bg-white p-7 md:p-10 lg:col-span-5 lg:border-r lg:border-[#d8e2eb] lg:p-12">
                  <div className="mb-8 flex items-start justify-between gap-5">
                    <span className="font-[family-name:var(--font-body)] text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--coral)]">
                      Sector
                    </span>
                    <div className="flex h-11 w-11 items-center justify-center border border-[var(--coral-border)] bg-[var(--coral-muted)] transition-colors duration-200 group-hover:border-[var(--coral)]">
                      <Icon size={20} color="var(--coral)" weight="duotone" />
                    </div>
                  </div>

                  <h2 className="font-[family-name:var(--font-display)] text-[clamp(24px,2.5vw,34px)] font-medium leading-tight text-[var(--navy)]">
                    {ind.title}
                  </h2>

                  {services.length > 0 && (
                    <ul className="mt-8 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-1">
                      {services.map((s, si) => (
                        <li
                          key={s.id ?? si}
                          className="flex items-start gap-3 text-[12px] leading-relaxed text-[var(--gray-mid)] font-[family-name:var(--font-body)]"
                        >
                          <span className="mt-2 h-1 w-1 flex-shrink-0 bg-[var(--coral)]" />
                          <span>{s.text}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="relative flex items-center bg-[linear-gradient(135deg,#ffffff_0%,#f7fafc_55%,#eef4f8_100%)] p-7 md:p-10 lg:col-span-7 lg:min-h-[300px] lg:p-12">
                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.28]"
                    style={{
                      backgroundImage:
                        'linear-gradient(to right, rgba(2,48,68,0.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(2,48,68,0.045) 1px, transparent 1px)',
                      backgroundSize: '72px 72px',
                    }}
                    aria-hidden="true"
                  />
                  <div className="relative max-w-[720px]">
                  {ind.descriptionLong ? (
                    <p className="text-[15px] leading-[1.9] text-[var(--gray)] md:text-[16px]">{descText}</p>
                  ) : ind.description ? (
                    <RichText
                      data={ind.description}
                      className="prose-atenea text-[15px] leading-[1.9] text-[var(--gray)] md:text-[16px]"
                    />
                  ) : null}
                  </div>
                </div>
              </div>
            )
          })}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-[60px] bg-[var(--navy)]">
        <div className="max-w-[1280px] mx-auto text-center">
          <span className="section-tag">{settingText(settings, 'industriesCtaEyebrow', '¿Tu sector?')}</span>
          <h2
            className="font-[family-name:var(--font-display)] font-medium text-[var(--cream)] mb-4 mt-1"
            style={{ fontSize: 'clamp(26px,3vw,38px)' }}
          >
            {settingText(settings, 'industriesCtaTitle', '¿Tu industria no está en la lista?')}
          </h2>
          <p className="text-[15px] text-white/50 mb-10 max-w-[480px] mx-auto leading-[1.75]">
            {settingText(
              settings,
              'industriesCtaDescription',
              'Trabajamos con cualquier sector empresarial. Contáctanos y diseñamos la solución correcta para ti.',
            )}
          </p>
          <Button href={settingPath(settings, 'industriesCtaHref', '/contacto')} variant="ghost" size="lg">
            {settingText(settings, 'industriesCtaLabel', 'Hablemos')}
          </Button>
        </div>
      </section>
    </>
  )
}
