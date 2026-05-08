import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Phone } from '@phosphor-icons/react/dist/ssr'
import type { Metadata } from 'next'
import { getServiceBySlug, getServices, getSiteSettings } from '@/lib/queries'
import { RichText } from '@/lib/lexical-to-react'
import { settingText } from '@/lib/settings-text'

type Props = { params: Promise<{ slug: string }> }

export const revalidate = 60

export async function generateStaticParams() {
  const services = await getServices()
  return services.map((s) => ({ slug: s.slug! }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = await getServiceBySlug(slug)
  if (!service) return {}
  return { title: service.title, description: service.shortDescription ?? undefined }
}

export default async function ServicioPage({ params }: Props) {
  const { slug } = await params
  const [service, settings] = await Promise.all([getServiceBySlug(slug), getSiteSettings()])
  if (!service) notFound()

  const phone = settings.phone ?? '(+593) 999 828 903'
  const phoneHref = `tel:${(phone.match(/\+?\d+/g) || []).join('')}`
  const bullets = service.bullets ?? []

  return (
    <>
      <section className="bg-[var(--navy)] pt-20 pb-16 px-6 md:px-[60px] border-b border-white/[0.07]">
        <div className="max-w-[1280px] mx-auto">
          <Link
            href="/servicios"
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.1em] uppercase text-white/40 mb-8 hover:text-white/70 transition-colors font-[family-name:var(--font-body)]"
          >
            <ArrowLeft size={13} /> {settingText(settings, 'serviceDetailBackLabel', 'Todos los servicios')}
          </Link>
          <div className="flex items-start gap-6">
            {service.number && (
              <span
                className="font-[family-name:var(--font-display)] font-bold text-white leading-none hidden md:block flex-shrink-0"
                style={{ fontSize: '64px', opacity: 0.07 }}
              >
                {service.number}
              </span>
            )}
            <div>
              <h1
                className="font-[family-name:var(--font-display)] font-medium text-[var(--cream)] leading-[1.15] mb-4"
                style={{ fontSize: 'clamp(28px,3.5vw,44px)' }}
              >
                {service.title}
              </h1>
              <p className="text-[16px] font-light text-white/55 leading-[1.75] max-w-[560px]">
                {service.shortDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-[60px] bg-[var(--bg)]">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <h2 className="font-[family-name:var(--font-display)] text-[22px] font-medium text-[var(--navy)] mb-8">
              {settingText(settings, 'serviceDetailIncludesTitle', 'Que incluye este servicio?')}
            </h2>
            {bullets.length > 0 ? (
              <ul className="space-y-5">
                {bullets.map((b, i) => (
                  <li key={b.id ?? i} className="flex items-start gap-5">
                    <span
                      className="font-[family-name:var(--font-display)] font-bold text-[var(--navy)] leading-none flex-shrink-0 mt-0.5"
                      style={{ fontSize: '22px', opacity: 0.15 }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-[15px] text-[var(--gray-mid)] leading-[1.8]">{b.text}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <RichText data={service.fullDescription} className="prose-atenea" />
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white border border-[#e2e8f0] p-8 sticky top-24">
              <div className="w-8 h-0.5 bg-[var(--coral)] mb-5" />
              <h3 className="font-[family-name:var(--font-display)] text-[20px] font-medium text-[var(--navy)] mb-3 leading-[1.3]">
                {settingText(settings, 'serviceDetailCtaTitle', 'Te interesa este servicio?')}
              </h3>
              <p className="text-[13px] text-[var(--gray-mid)] leading-[1.7] mb-7">
                {settingText(
                  settings,
                  'serviceDetailCtaDescription',
                  'Contactanos y un experto te orientara sobre la mejor solucion para tu empresa.',
                )}
              </p>
              <Link
                href="/contacto"
                className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-[var(--navy)] text-white text-[12px] font-medium tracking-[0.08em] uppercase hover:bg-[var(--coral)] transition-all duration-200 font-[family-name:var(--font-body)]"
              >
                {settingText(settings, 'serviceDetailCtaLabel', 'Solicitar informacion')} <ArrowUpRight size={14} />
              </Link>

              <div className="mt-6 pt-6 border-t border-[#e2e8f0] flex items-center gap-3">
                <div className="w-9 h-9 bg-[var(--coral-muted)] border border-[var(--coral-border)] flex items-center justify-center flex-shrink-0">
                  <Phone size={15} color="var(--coral)" weight="duotone" />
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.1em] uppercase text-[var(--gray-light)] mb-0.5 font-[family-name:var(--font-body)]">
                    {settingText(settings, 'serviceDetailPhoneLabel', 'Llamanos')}
                  </p>
                  <a
                    href={phoneHref}
                    className="text-[14px] font-medium text-[var(--navy)] hover:text-[var(--coral)] transition-colors font-[family-name:var(--font-body)]"
                  >
                    {phone}
                  </a>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-[#e2e8f0]">
                <p className="text-[11px] text-[var(--gray-light)] mb-3 font-[family-name:var(--font-body)]">
                  {settingText(settings, 'serviceDetailMoreLabel', 'Tambien ofrecemos')}
                </p>
                <Link
                  href="/servicios"
                  className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.08em] uppercase text-[var(--coral)] font-medium hover:underline underline-offset-3 font-[family-name:var(--font-body)] transition-all"
                >
                  {settingText(settings, 'serviceDetailMoreLinkLabel', 'Ver todos los servicios')} <ArrowUpRight size={11} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
