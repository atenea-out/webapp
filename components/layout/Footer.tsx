import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, InstagramLogo, LinkedinLogo, EnvelopeSimple, Phone, MapPin, LockKey } from '@phosphor-icons/react/dist/ssr'
import { getNavigation, getSiteSettings, getServices } from '@/lib/queries'

export async function Footer() {
  const [nav, settings, services] = await Promise.all([
    getNavigation(),
    getSiteSettings(),
    getServices(),
  ])

  const servicesLinks = services.map((s) => ({
    label: s.title,
    href: `/servicios/${s.slug}`,
  }))
  const companyLinks =
    nav.footerCompanyItems && nav.footerCompanyItems.length > 0
      ? nav.footerCompanyItems.map((i) => ({ label: i.label, href: i.href }))
      : [
          { label: 'Nosotros', href: '/nosotros' },
          { label: 'Industrias', href: '/industrias' },
          { label: 'Noticias', href: '/noticias' },
          { label: 'Contacto', href: '/contacto' },
          { label: 'Política de privacidad', href: '/politica-de-privacidad' },
        ]

  const phone = settings.phone ?? '(+593) 999 828 903'
  const phoneHref = `tel:${(phone.match(/\+?\d+/g) || []).join('')}`
  const email = settings.email ?? 'info@atenea-outsourcing.com'
  const address =
    settings.address ?? 'Alfonso Pereira E4-39 y Jorge Drom,\nEdificio Iñaquito II. Quito, Ecuador'
  const instagram = settings.instagram ?? 'https://www.instagram.com/ateneaoutsourcing'
  const linkedin = settings.linkedin ?? 'https://www.linkedin.com/in/atenea-outsourcing-b0a850326/'
  const description =
    settings.footerDescription ?? 'Simplificamos lo complejo para que tú te enfoques en crecer.'

  const preEyebrow = settings.footerPreCtaEyebrow ?? 'Empieza hoy'
  const preTitle = settings.footerPreCtaTitle ?? '¿Listo para simplificar tu contabilidad?'
  const preLabel = settings.footerPreCtaLabel ?? 'Hablar con un experto'
  const preHref = nav.ctaHref ?? '/contacto'

  return (
    <footer className="bg-[var(--navy)] text-[var(--cream)]">

      {/* ── Pre-footer CTA strip ── */}
      <div className="border-t border-white/[0.07] border-b border-b-white/[0.05]">
        <div className="max-w-[1280px] mx-auto px-6 md:px-[60px] py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-[11px] tracking-[0.18em] uppercase text-[var(--coral)] font-[family-name:var(--font-body)] mb-3">
              {preEyebrow}
            </p>
            <h2
              className="font-[family-name:var(--font-display)] font-medium text-[var(--cream)] leading-[1.15]"
              style={{ fontSize: 'clamp(22px,3vw,34px)' }}
            >
              {preTitle}
            </h2>
          </div>
          <Link
            href={preHref}
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-[var(--coral)] text-white text-[12px] font-medium tracking-[0.1em] uppercase border border-[var(--coral)] hover:bg-[var(--coral-light)] hover:border-[var(--coral-light)] transition-all duration-200 font-[family-name:var(--font-body)] flex-shrink-0"
          >
            {preLabel} <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>

      {/* ── Main footer ── */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-[60px] py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Brand */}
        <div className="lg:col-span-1">
          <div className="mb-6">
            <Image
              src="/logo.png"
              alt="Atenea Outsourcing"
              width={130}
              height={48}
              className="h-10 w-auto object-contain brightness-0 invert"
            />
          </div>
          <p className="text-[13px] text-white/50 leading-[1.8] mb-7 max-w-[220px]">
            {description}
          </p>
          <div className="flex gap-2.5">
            {instagram && (
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all duration-200"
                aria-label="Instagram"
              >
                <InstagramLogo size={16} weight="duotone" />
              </a>
            )}
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <LinkedinLogo size={16} weight="duotone" />
              </a>
            )}
          </div>
        </div>

        {/* Services */}
        <div>
          <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/35 mb-5 font-[family-name:var(--font-body)]">
            Servicios
          </p>
          <ul className="space-y-3">
            {servicesLinks.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="text-[13px] text-white/55 hover:text-white transition-colors duration-150 font-[family-name:var(--font-body)]"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/35 mb-5 font-[family-name:var(--font-body)]">
            Empresa
          </p>
          <ul className="space-y-3">
            {companyLinks.map((c) => (
              <li key={c.href}>
                <Link
                  href={c.href}
                  className="text-[13px] text-white/55 hover:text-white transition-colors duration-150 font-[family-name:var(--font-body)]"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/35 mb-5 font-[family-name:var(--font-body)]">
            Contacto
          </p>
          <ul className="space-y-4">
            <li className="flex gap-3 items-start">
              <MapPin size={14} weight="duotone" className="text-white/30 mt-1 flex-shrink-0" />
              <span className="text-[13px] text-white/55 leading-[1.7] font-[family-name:var(--font-body)] whitespace-pre-line">
                {address}
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <Phone size={14} weight="duotone" className="text-white/30 flex-shrink-0" />
              <a href={phoneHref} className="text-[13px] text-white/55 hover:text-white transition-colors duration-150 font-[family-name:var(--font-body)]">
                {phone}
              </a>
            </li>
            <li className="flex gap-3 items-center">
              <EnvelopeSimple size={14} weight="duotone" className="text-white/30 flex-shrink-0" />
              <a href={`mailto:${email}`} className="text-[13px] text-white/55 hover:text-white transition-colors duration-150 font-[family-name:var(--font-body)]">
                {email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-[1280px] mx-auto px-6 md:px-[60px] py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-white/25 font-[family-name:var(--font-body)]">
            © {new Date().getFullYear()} Atenea Outsourcing. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <p className="text-[11px] text-white/25 font-[family-name:var(--font-body)]">
              Quito, Ecuador
            </p>
            <span className="text-white/15">·</span>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-[11px] text-white/40 hover:text-[var(--coral)] transition-colors duration-150 font-[family-name:var(--font-body)]"
            >
              <LockKey size={12} weight="duotone" />
              Administración
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
