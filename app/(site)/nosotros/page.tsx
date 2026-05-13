import Image from 'next/image'
import { LinkedinLogo, Medal, ShieldCheck, Handshake, Sparkle } from '@phosphor-icons/react/dist/ssr'
import type { Metadata } from 'next'
import { getFounder, getSiteSettings } from '@/lib/queries'
import { getIcon } from '@/lib/icons'
import { RichText, richTextToPlain } from '@/lib/lexical-to-react'
import type { Media } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Nosotros',
  description:
    'Conoce a Atenea Outsourcing: más de 20 años de experiencia en contabilidad, finanzas y tributación en Ecuador. Fundada por la Ing. Patricia Rojas Túquerrez.',
}

export const revalidate = 60

const valueIcons = [Medal, ShieldCheck, Handshake, Sparkle]

export default async function NosotrosPage() {
  const [founder, settings] = await Promise.all([getFounder(), getSiteSettings()])

  const missionTitle = settings.nosotrosMissionTitle ?? 'Simplicidad al servicio de tu crecimiento'
  const missionParagraphs =
    settings.nosotrosMissionParagraphs?.map((p) => p.text).filter(Boolean) ?? [
      'Somos consultores contables financieros independientes, especializados en ofrecer servicios de asesoría y consultoría en contabilidad-finanzas, nómina e impuestos.',
      'Nos capacitamos y actualizamos de manera continua para proporcionar a nuestros clientes un servicio personalizado y de alta calidad, acompañando el crecimiento de sus empresas en el sector financiero de Ecuador y Latinoamérica.',
    ]
  const valores =
    settings.nosotrosValores?.map((v) => ({ title: v.title, desc: v.desc })) ?? []

  const bioLongParagraphs =
    settings.fundadoraBioLong?.map((p) => p.text).filter(Boolean) ?? []

  const founderName = founder?.name ?? 'Ing. Patricia Rojas Túquerrez'
  const founderRole = founder?.role ?? 'Gerente General · Fundadora'
  const founderPhoto =
    founder?.photo && typeof founder.photo !== 'number'
      ? (founder.photo as Media)
      : null
  const founderPhotoUrl = founderPhoto?.url ?? '/patricia.png'
  const founderPhotoAlt = founderPhoto?.alt || `${founderName} — ${founderRole}`
  const credentials = founder?.credentials ?? []
  const linkedinHref =
    founder?.linkedin ?? 'https://www.linkedin.com/in/atenea-outsourcing-b0a850326/'

  // Si no hay párrafos en SiteSettings, intentar derivar del richText del fundador
  const bioRichTextText = founder?.bio ? richTextToPlain(founder.bio) : ''

  return (
    <>
      {/* Header */}
      <section className="bg-[var(--navy)] pt-20 pb-16 px-6 md:px-[60px] border-b border-white/[0.07]">
        <div className="max-w-[1280px] mx-auto">
          <span className="section-tag">La firma</span>
          <h1
            className="font-[family-name:var(--font-display)] font-medium text-[var(--cream)] leading-[1.1] mt-1 mb-5"
            style={{ fontSize: 'clamp(32px,4vw,52px)' }}
          >
            ¿Quiénes somos?
          </h1>
          <p className="text-[16px] font-light text-white/55 leading-[1.75] max-w-[560px]">
            Firma especializada en brindar soluciones integrales de contabilidad, finanzas y tributación con más de dos décadas de trayectoria.
          </p>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 px-6 md:px-[60px] bg-white">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="section-tag">Nuestra misión</span>
            <h2
              className="font-[family-name:var(--font-display)] font-medium text-[var(--navy)] mb-5"
              style={{ fontSize: 'clamp(24px,3vw,36px)' }}
            >
              {missionTitle}
            </h2>
            <div className="divider" />
            {missionParagraphs.map((text, i) => (
              <p
                key={i}
                className={`text-[15px] text-[var(--gray-mid)] leading-[1.8] ${i < missionParagraphs.length - 1 ? 'mb-5' : ''}`}
              >
                {text}
              </p>
            ))}
          </div>
          {valores.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px border border-[#d8e2eb] bg-[#d8e2eb]">
              {valores.map(({ title, desc }, index) => {
                const Icon = valueIcons[index % valueIcons.length]
                return (
                <div
                  key={title}
                  className="group relative min-h-[170px] overflow-hidden bg-white p-6 transition-colors duration-300 hover:bg-[var(--bg)]"
                >
                  <span className="absolute left-0 top-0 h-0.5 w-10 bg-[var(--coral)] transition-all duration-300 group-hover:w-20" />
                  <div className="mb-7 flex items-start justify-end gap-5">
                    <div className="flex h-9 w-9 items-center justify-center border border-[var(--coral-border)] bg-[var(--coral-muted)]">
                      <Icon size={17} color="var(--coral)" weight="duotone" />
                    </div>
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-[19px] font-medium leading-tight text-[var(--navy)] mb-3">
                    {title}
                  </h3>
                  <p className="max-w-[260px] text-[13px] text-[var(--gray-mid)] leading-[1.75]">{desc}</p>
                </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Fundadora */}
      {founder && (
        <section className="py-20 px-6 md:px-[60px] bg-[var(--bg)]">
          <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Photo */}
            <div className="relative max-w-[440px] mx-auto lg:mx-0">
              <div className="aspect-[4/5] overflow-hidden relative">
                <Image
                  src={founderPhotoUrl}
                  alt={founderPhotoAlt}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 90vw, 440px"
                />
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[var(--navy)]/90 to-transparent">
                  <p className="font-[family-name:var(--font-display)] text-[16px] font-medium text-white">
                    {founderName}
                  </p>
                  <p className="text-[11px] tracking-[0.08em] text-[var(--coral)] mt-0.5 font-[family-name:var(--font-body)]">
                    {founderRole}
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-[var(--coral)]" />
            </div>

            {/* Bio */}
            <div>
              <span className="section-tag">Fundadora</span>
              <h2
                className="font-[family-name:var(--font-display)] font-medium text-[var(--navy)] leading-[1.2] mb-5 mt-1"
                style={{ fontSize: 'clamp(26px,3vw,38px)' }}
              >
                {founderName}
              </h2>
              <div className="divider" />
              <div className="space-y-4 mb-8">
                {bioLongParagraphs.length > 0 ? (
                  bioLongParagraphs.map((text, i) => (
                    <p key={i} className="text-[15px] text-[var(--gray-mid)] leading-[1.8]">
                      {text}
                    </p>
                  ))
                ) : founder.bio ? (
                  <RichText
                    data={founder.bio}
                    className="prose-atenea text-[15px] text-[var(--gray-mid)] leading-[1.8]"
                  />
                ) : bioRichTextText ? (
                  <p className="text-[15px] text-[var(--gray-mid)] leading-[1.8]">
                    {bioRichTextText}
                  </p>
                ) : null}
              </div>

              {credentials.length > 0 && (
                <div className="space-y-0 mb-8 border border-[#e2e8f0]">
                  {credentials.map((c, i) => {
                    const Icon = getIcon(c.icon)
                    return (
                      <div
                        key={c.id ?? i}
                        className={`flex items-start gap-4 p-4 ${i < credentials.length - 1 ? 'border-b border-[#e2e8f0]' : ''}`}
                      >
                        <div className="w-9 h-9 bg-[var(--coral-muted)] border border-[var(--coral-border)] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Icon size={16} color="var(--coral)" weight="duotone" />
                        </div>
                        <div>
                          <p className="text-[10px] tracking-[0.15em] uppercase text-[var(--gray-light)] mb-0.5 font-[family-name:var(--font-body)]">
                            {c.label}
                          </p>
                          <p className="text-[13px] font-medium text-[var(--navy)] leading-[1.4] font-[family-name:var(--font-body)]">
                            {c.value}
                          </p>
                          {c.sub && (
                            <p className="text-[12px] text-[var(--gray-mid)] font-[family-name:var(--font-body)] mt-0.5">
                              {c.sub}
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              {linkedinHref && (
                <a
                  href={linkedinHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-[#e2e8f0] text-[var(--gray-mid)] hover:text-[var(--navy)] hover:border-[var(--navy)] text-[12px] font-medium tracking-[0.06em] uppercase transition-all duration-200 font-[family-name:var(--font-body)]"
                >
                  <LinkedinLogo size={16} weight="duotone" /> Ver en LinkedIn
                </a>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
