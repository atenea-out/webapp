import { Button } from '@/components/ui/Button'
import type { Metadata } from 'next'
import { getIndustries, getSiteSettings } from '@/lib/queries'
import { getIcon } from '@/lib/icons'
import { RichText, richTextToPlain } from '@/lib/lexical-to-react'
import { settingPath, settingText } from '@/lib/settings-text'

export const metadata: Metadata = {
  title: 'Industrias',
  description:
    'Atenea Outsourcing ofrece servicios especializados para los sectores farmaceutico, comercial, legal, educativo y mas en Ecuador.',
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
              'Profesionales altamente especializados que ofrecen soluciones en multiples sectores economicos de Ecuador y Latinoamerica.',
            )}
          </p>
        </div>
      </section>

      <section className="py-20 px-6 md:px-[60px] bg-[var(--bg)]">
        <div className="max-w-[1280px] mx-auto space-y-px">
          {industrias.map((ind, i) => {
            const Icon = getIcon(ind.icon)
            const services = ind.services ?? []
            const descText = ind.descriptionLong?.trim() || richTextToPlain(ind.description) || ''
            return (
              <div
                key={ind.id}
                className={`grid grid-cols-1 lg:grid-cols-5 ${i % 2 === 0 ? 'bg-white' : 'bg-[var(--bg)]'}`}
              >
                <div className="lg:col-span-2 p-8 md:p-12 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[#e2e8f0]">
                  <div className="w-11 h-11 bg-[var(--coral-muted)] border border-[var(--coral-border)] flex items-center justify-center mb-5">
                    <Icon size={20} color="var(--coral)" weight="duotone" />
                  </div>
                  <h2 className="font-[family-name:var(--font-display)] text-[24px] font-medium text-[var(--navy)] mb-5">
                    {ind.title}
                  </h2>
                  {services.length > 0 && (
                    <ul className="space-y-2.5">
                      {services.map((s, si) => (
                        <li
                          key={s.id ?? si}
                          className="flex items-start gap-2.5 text-[12px] text-[var(--gray-light)] font-[family-name:var(--font-body)]"
                        >
                          <span className="text-[var(--coral)] mt-0.5 flex-shrink-0">-</span>
                          {s.text}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="lg:col-span-3 p-8 md:p-12 flex items-center">
                  {ind.descriptionLong ? (
                    <p className="text-[15px] text-[var(--gray-mid)] leading-[1.85]">{descText}</p>
                  ) : ind.description ? (
                    <RichText
                      data={ind.description}
                      className="prose-atenea text-[15px] text-[var(--gray-mid)] leading-[1.85]"
                    />
                  ) : null}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="py-20 px-6 md:px-[60px] bg-[var(--navy)]">
        <div className="max-w-[1280px] mx-auto text-center">
          <span className="section-tag">{settingText(settings, 'industriesCtaEyebrow', 'Tu sector?')}</span>
          <h2
            className="font-[family-name:var(--font-display)] font-medium text-[var(--cream)] mb-4 mt-1"
            style={{ fontSize: 'clamp(26px,3vw,38px)' }}
          >
            {settingText(settings, 'industriesCtaTitle', 'Tu industria no esta en la lista?')}
          </h2>
          <p className="text-[15px] text-white/50 mb-10 max-w-[480px] mx-auto leading-[1.75]">
            {settingText(
              settings,
              'industriesCtaDescription',
              'Trabajamos con cualquier sector empresarial. Contactanos y disenamos la solucion correcta para ti.',
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
