import { MapPin, Phone, EnvelopeSimple, InstagramLogo, LinkedinLogo } from '@phosphor-icons/react/dist/ssr'
import { ContactForm } from '@/components/sections/ContactForm'
import type { Metadata } from 'next'
import { getSiteSettings, getServices } from '@/lib/queries'
import { settingText } from '@/lib/settings-text'

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Contactanos para recibir asesoria en contabilidad, finanzas y tributacion. Estamos en Quito, Ecuador.',
}

export const revalidate = 60

export default async function ContactoPage() {
  const [settings, services] = await Promise.all([getSiteSettings(), getServices()])

  const phone = settings.phone ?? '(+593) 999 828 903'
  const phoneHref = `tel:${(phone.match(/\+?\d+/g) || []).join('')}`
  const email = settings.email ?? 'info@atenea-outsourcing.com'
  const emailSecondary = settings.emailSecondary ?? ''
  const address = settings.address ?? 'Alfonso Pereira E4-39 y Jorge Drom, Edificio de Oficinas Inaquito II. Quito - Ecuador'
  const instagram = settings.instagram ?? 'https://www.instagram.com/ateneaoutsourcing'
  const linkedin = settings.linkedin ?? 'https://www.linkedin.com/in/atenea-outsourcing-b0a850326/'
  const serviceOptions = services.map((s) => s.title)

  return (
    <>
      <section className="bg-[var(--navy)] pt-20 pb-16 px-6 md:px-[60px] border-b border-white/[0.07]">
        <div className="max-w-[1280px] mx-auto">
          <span className="section-tag">{settingText(settings, 'contactPageEyebrow', 'Ponte en contacto')}</span>
          <h1
            className="font-[family-name:var(--font-display)] font-medium text-[var(--cream)] leading-[1.1] mt-1 mb-5"
            style={{ fontSize: 'clamp(32px,4vw,52px)' }}
          >
            {settingText(settings, 'contactPageTitle', 'Contactanos')}
          </h1>
          <p className="text-[16px] font-light text-white/55 leading-[1.75] max-w-[480px]">
            {settingText(
              settings,
              'contactPageDescription',
              'Estamos aqui para responder tus preguntas y escuchar tus necesidades. Escribenos o llamanos.',
            )}
          </p>
        </div>
      </section>

      <section className="py-20 px-6 md:px-[60px] bg-[var(--bg)]">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-5 gap-16">
          <div className="lg:col-span-2">
            <h2 className="font-[family-name:var(--font-display)] text-[22px] font-medium text-[var(--navy)] mb-8">
              {settingText(settings, 'contactInfoTitle', 'Informacion de contacto')}
            </h2>

            <ul className="space-y-6 mb-10">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[var(--coral-muted)] border border-[var(--coral-border)] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={17} color="var(--coral)" weight="duotone" />
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.15em] uppercase text-[var(--gray-light)] mb-1.5 font-[family-name:var(--font-body)]">
                    {settingText(settings, 'contactAddressLabel', 'Direccion')}
                  </p>
                  <p className="text-[14px] text-[var(--navy)] leading-[1.7] font-[family-name:var(--font-body)] whitespace-pre-line">
                    {address}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[var(--coral-muted)] border border-[var(--coral-border)] flex items-center justify-center flex-shrink-0">
                  <Phone size={17} color="var(--coral)" weight="duotone" />
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.15em] uppercase text-[var(--gray-light)] mb-1.5 font-[family-name:var(--font-body)]">
                    {settingText(settings, 'contactPhoneLabel', 'Telefono')}
                  </p>
                  <a
                    href={phoneHref}
                    className="text-[14px] text-[var(--navy)] hover:text-[var(--coral)] transition-colors font-[family-name:var(--font-body)]"
                  >
                    {phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[var(--coral-muted)] border border-[var(--coral-border)] flex items-center justify-center flex-shrink-0">
                  <EnvelopeSimple size={17} color="var(--coral)" weight="duotone" />
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.15em] uppercase text-[var(--gray-light)] mb-1.5 font-[family-name:var(--font-body)]">
                    {settingText(settings, 'contactEmailLabel', 'Correo')}
                  </p>
                  <a
                    href={`mailto:${email}`}
                    className="block text-[14px] text-[var(--navy)] hover:text-[var(--coral)] transition-colors font-[family-name:var(--font-body)]"
                  >
                    {email}
                  </a>
                  {emailSecondary && (
                    <a
                      href={`mailto:${emailSecondary}`}
                      className="block text-[14px] text-[var(--navy)] hover:text-[var(--coral)] transition-colors mt-0.5 font-[family-name:var(--font-body)]"
                    >
                      {emailSecondary}
                    </a>
                  )}
                </div>
              </li>
            </ul>

            {(instagram || linkedin) && (
              <div>
                <p className="text-[10px] tracking-[0.15em] uppercase text-[var(--gray-light)] mb-3 font-[family-name:var(--font-body)]">
                  {settingText(settings, 'contactSocialLabel', 'Redes sociales')}
                </p>
                <div className="flex gap-3">
                  {instagram && (
                    <a
                      href={instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#e2e8f0] text-[12px] text-[var(--gray-mid)] hover:text-[var(--navy)] hover:border-[var(--navy)] transition-all duration-200 font-[family-name:var(--font-body)]"
                    >
                      <InstagramLogo size={14} /> Instagram
                    </a>
                  )}
                  {linkedin && (
                    <a
                      href={linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#e2e8f0] text-[12px] text-[var(--gray-mid)] hover:text-[var(--navy)] hover:border-[var(--navy)] transition-all duration-200 font-[family-name:var(--font-body)]"
                    >
                      <LinkedinLogo size={14} /> LinkedIn
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-3 bg-white border border-[#e2e8f0] p-8 md:p-10">
            <h2 className="font-[family-name:var(--font-display)] text-[22px] font-medium text-[var(--navy)] mb-6">
              {settingText(settings, 'contactFormTitle', 'Envianos un mensaje')}
            </h2>
            <ContactForm serviceOptions={serviceOptions} />
          </div>
        </div>
      </section>
    </>
  )
}
