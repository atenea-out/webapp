import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { LinkedinLogo } from '@phosphor-icons/react/dist/ssr'

type FundadoraPreviewProps = {
  name?: string | null
  role?: string | null
  photoUrl?: string | null
  photoAlt?: string | null
  bioParagraphs?: string[] | null
  chips?: string[] | null
  linkedin?: string | null
}

const defaultBio = [
  'Con más de 20 años de experiencia en contabilidad e impuestos, ha trabajado en diversas empresas multinacionales y nacionales. Su experiencia abarca las industrias farmacéutica, servicios y comercial.',
  'Destacada como Fact Leader en proyectos de consolidación contable internacional. Su liderazgo se evidencia en la planificación y coordinación de actividades financieras garantizando el cumplimiento normativo.',
]

const defaultChips = [
  'Ing. Comercial — Univ. Politécnica Salesiana',
  'Maestría en Tributación — Univ. Simón Bolívar',
  'SAP · ERP · Normativa NIIF',
]

export function FundadoraPreview({
  name,
  role,
  photoUrl,
  photoAlt,
  bioParagraphs,
  chips,
  linkedin,
}: FundadoraPreviewProps = {}) {
  const displayName = name || 'Ing. Patricia Rojas Túquerrez'
  const displayRole = role || 'Gerente General · Fundadora'
  const img = photoUrl || '/patricia.png'
  const imgAlt = photoAlt || `${displayName} — ${displayRole}`
  const paragraphs = bioParagraphs && bioParagraphs.length > 0 ? bioParagraphs : defaultBio
  const chipList = chips && chips.length > 0 ? chips : defaultChips
  const linkedinHref = linkedin || 'https://www.linkedin.com/in/atenea-outsourcing-b0a850326/'

  return (
    <section className="py-[var(--section-pad)] px-6 md:px-[60px] bg-[var(--bg)]">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Photo */}
        <div className="relative max-w-[420px] mx-auto lg:mx-0">
          <div className="aspect-[4/5] rounded-sm overflow-hidden relative">
            <Image
              src={img}
              alt={imgAlt}
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 90vw, 420px"
            />
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[var(--navy)]/90 to-transparent">
              <p className="font-[family-name:var(--font-display)] text-[16px] font-medium text-white">
                {displayName}
              </p>
              <p className="text-[12px] tracking-[0.08em] text-[var(--coral)] font-[family-name:var(--font-body)] mt-0.5">
                {displayRole}
              </p>
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-[var(--coral)]" />
        </div>

        {/* Bio */}
        <div>
          <span className="section-tag">Fundadora</span>
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(28px,3vw,38px)] font-medium text-[var(--navy)] leading-[1.2] mb-5">
            {displayName}
          </h2>
          <div className="divider" />

          <div className="space-y-4 mb-8">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-[15px] text-[var(--gray-mid)] leading-[1.8]">
                {p}
              </p>
            ))}
          </div>

          {chipList.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-8">
              {chipList.map((cred) => (
                <span
                  key={cred}
                  className="px-3 py-1.5 text-[11px] border border-[#e2e8f0] text-[var(--gray-mid)] rounded-sm font-[family-name:var(--font-body)]"
                >
                  {cred}
                </span>
              ))}
            </div>
          )}

          <div className="flex gap-3">
            <Button href="/nosotros" variant="primary" size="md">
              Ver perfil completo
            </Button>
            {linkedinHref && (
              <a
                href={linkedinHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#e2e8f0] text-[var(--gray-mid)] hover:text-[var(--navy)] hover:border-[var(--navy)] rounded-sm text-[12px] font-medium tracking-[0.06em] uppercase transition-all duration-200 font-[family-name:var(--font-body)]"
              >
                <LinkedinLogo size={16} weight="duotone" /> LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
