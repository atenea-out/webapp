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
  mode?: 'founder' | 'team' | null
  sectionDescription?: string | null
  sectionEyebrow?: string | null
  sectionTitle?: string | null
  team?: TeamPreviewItem[] | null
}

export type TeamPreviewItem = {
  name: string
  role: string
  photoAlt?: string | null
  photoUrl?: string | null
  summary?: string | null
}

const defaultBio = [
  'Con más de 20 años de experiencia en contabilidad e impuestos, ha trabajado en empresas multinacionales y nacionales. Su trayectoria abarca industrias farmacéuticas, de servicios y comerciales.',
  'Ha liderado proyectos de consolidación contable internacional, planificación financiera y coordinación de actividades financieras con foco en cumplimiento normativo y decisiones confiables.',
]

const defaultChips = [
  'Ing. Comercial - Univ. Politécnica Salesiana',
  'Maestría en Tributación - Univ. Simón Bolívar',
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
  mode,
  sectionDescription,
  sectionEyebrow,
  sectionTitle,
  team,
}: FundadoraPreviewProps = {}) {
  const displayName = name || 'Ing. Patricia Rojas Túquerrez'
  const displayRole = role || 'Gerente General · Fundadora'
  const img = photoUrl || '/patricia.png'
  const imgAlt = photoAlt || `${displayName} - ${displayRole}`
  const paragraphs = bioParagraphs && bioParagraphs.length > 0 ? bioParagraphs : defaultBio
  const chipList = chips && chips.length > 0 ? chips : defaultChips
  const linkedinHref = linkedin || 'https://www.linkedin.com/in/atenea-outsourcing-b0a850326/'
  const showTeam = mode === 'team' && team && team.length > 1

  if (showTeam) {
    return (
      <section className="py-[var(--section-pad)] px-6 md:px-[60px] bg-[var(--bg)]">
        <div className="max-w-[1280px] mx-auto">
          <div className="max-w-[620px] mb-10 md:mb-12">
            <span className="section-tag">{sectionEyebrow || 'Equipo'}</span>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(28px,3.4vw,44px)] font-medium text-[var(--navy)] leading-[1.15] mb-5">
              {sectionTitle || 'Conoce nuestro equipo'}
            </h2>
            {sectionDescription && (
              <p className="text-[15px] text-[var(--gray-mid)] leading-[1.8]">
                {sectionDescription}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px border border-[#d8e2ea] bg-[#d8e2ea]">
            {team.map((member) => (
              <article key={`${member.name}-${member.role}`} className="bg-[var(--bg)] p-6 md:p-7">
                <div className="relative aspect-[4/5] mb-6 overflow-hidden bg-[var(--navy)]">
                  <Image
                    src={member.photoUrl || '/patricia.png'}
                    alt={member.photoAlt || `${member.name} - ${member.role}`}
                    fill
                    className="object-cover object-top saturate-[0.86]"
                    sizes="(max-width: 768px) calc(100vw - 48px), (max-width: 1024px) 50vw, 33vw"
                  />
                  <div
                    className="absolute inset-0 mix-blend-multiply"
                    style={{ background: 'rgba(3, 58, 71, 0.26)' }}
                    aria-hidden="true"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[var(--navy)]/82 to-transparent" />
                </div>
                <p className="font-[family-name:var(--font-display)] text-[20px] font-medium text-[var(--navy)] leading-[1.2]">
                  {member.name}
                </p>
                <p className="mt-2 text-[11px] font-medium tracking-[0.12em] uppercase text-[var(--coral)] font-[family-name:var(--font-body)]">
                  {member.role}
                </p>
                {member.summary && (
                  <p className="mt-4 text-[14px] text-[var(--gray-mid)] leading-[1.75]">
                    {member.summary}
                  </p>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-[var(--section-pad)] px-6 md:px-[60px] bg-[var(--bg)]">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Photo */}
        <div className="relative w-full max-w-[420px] mx-auto lg:mx-0">
          <div className="aspect-[4/5] rounded-sm overflow-hidden relative bg-[var(--navy)]">
            <Image
              src={img}
              alt={imgAlt}
              fill
              className="object-cover object-top saturate-[0.82]"
              sizes="(max-width: 640px) calc(100vw - 48px), (max-width: 1024px) 420px, 420px"
              loading="eager"
            />
            <div
              className="absolute inset-0 mix-blend-multiply"
              style={{ background: 'rgba(3, 58, 71, 0.34)' }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/92 via-[var(--navy)]/18 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
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
