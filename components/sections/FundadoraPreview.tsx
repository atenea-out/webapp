'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, ArrowRight, LinkedinLogo } from '@phosphor-icons/react/dist/ssr'

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
  email?: string | null
  photoAlt?: string | null
  photoUrl?: string | null
  summary?: string | null
  detail?: string | null
  credentials?: string[] | null
  linkedin?: string | null
  isFounder?: boolean | null
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
  const teamItems =
    team && team.length > 0
      ? team
      : [
          {
            name: displayName,
            role: displayRole,
            photoAlt: imgAlt,
            photoUrl: img,
            summary: paragraphs[0],
            detail: paragraphs.join(' '),
            credentials: chipList,
            linkedin: linkedinHref,
            isFounder: true,
          },
        ]
  const showTeam = mode === 'team' && teamItems.length > 0
  const [activeIndex, setActiveIndex] = useState(0)
  const activeMember = teamItems[Math.min(activeIndex, teamItems.length - 1)] || teamItems[0]
  const activeDetail = activeMember?.detail || activeMember?.summary || ''
  const activeCredentials = activeMember?.credentials?.filter(Boolean) ?? []
  const activeLabel = String(Math.min(activeIndex + 1, teamItems.length)).padStart(2, '0')
  const totalLabel = String(teamItems.length).padStart(2, '0')
  const progressWidth = `${((Math.min(activeIndex, teamItems.length - 1) + 1) / teamItems.length) * 100}%`
  const displaySectionTitle =
    !sectionTitle || sectionTitle.includes('Criterio senior')
      ? 'Especialistas con criterio y cercanía.'
      : sectionTitle
  const displaySectionDescription =
    sectionDescription ||
    'Un equipo contable, tributario y financiero que acompaña cada decisión con rigor técnico, confidencialidad y trato humano.'

  const goToPrevious = () => {
    setActiveIndex((current) => (current === 0 ? teamItems.length - 1 : current - 1))
  }

  const goToNext = () => {
    setActiveIndex((current) => (current === teamItems.length - 1 ? 0 : current + 1))
  }

  if (showTeam && activeMember) {
    return (
      <section className="py-[var(--section-pad)] px-6 md:px-[60px] bg-[var(--bg)] border-y border-[#d8e2ea]">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-8 max-w-[760px] md:mb-10">
            <span className="section-tag">{sectionEyebrow || 'Equipo Atenea'}</span>
            <h2 className="max-w-[620px] font-[family-name:var(--font-display)] text-[clamp(30px,3.5vw,48px)] font-medium text-[var(--navy)] leading-[1.15]">
              {displaySectionTitle}
            </h2>
            <div className="divider" />
            <p className="max-w-[620px] text-[15px] md:text-[16px] text-[var(--gray-mid)] leading-[1.75]">
              {displaySectionDescription}
            </p>
          </div>

          <div className="border border-[#d8e2ea] bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] xl:grid-cols-[440px_1fr] lg:h-[620px]">
              <div className="border-b border-[#d8e2ea] bg-[var(--navy)] lg:border-b-0 lg:border-r">
                <div className="relative h-[390px] w-full overflow-hidden bg-[var(--navy)] sm:h-[460px] lg:h-full">
                  <Image
                    src={activeMember.photoUrl || '/patricia.png'}
                    alt={activeMember.photoAlt || `${activeMember.name} - ${activeMember.role}`}
                    fill
                    className="object-cover object-top saturate-[0.88]"
                    sizes="(max-width: 1024px) calc(100vw - 48px), 440px"
                  />
                  <div
                    className="absolute inset-0 mix-blend-multiply"
                    style={{ background: 'rgba(3, 58, 71, 0.24)' }}
                    aria-hidden="true"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[var(--navy)]/90 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="mb-3 text-[10px] font-semibold tracking-[0.18em] uppercase text-[var(--coral)] font-[family-name:var(--font-body)]">
                      Perfil {activeLabel} / {totalLabel}
                    </p>
                    <h3 className="font-[family-name:var(--font-display)] text-[clamp(30px,7vw,44px)] font-medium leading-[0.98] text-white">
                      {activeMember.name}
                    </h3>
                    <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.1em] leading-[1.55] text-white/78 font-[family-name:var(--font-body)] sm:text-[11px]">
                      {activeMember.role}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex min-h-0 flex-col">
                <div className="flex h-full flex-col p-5 sm:p-6 md:p-8 lg:p-10 xl:p-12">
                  <div className="mb-6 h-px w-full bg-[#d8e2ea] md:mb-8">
                    <div
                      className="h-px bg-[var(--coral)] transition-all duration-500 ease-out"
                      style={{ width: progressWidth }}
                    />
                  </div>

                  {activeMember.summary && (
                    <p className="font-[family-name:var(--font-display)] text-[22px] leading-[1.2] text-[var(--navy)] md:text-[30px]">
                      {activeMember.summary}
                    </p>
                  )}

                  {activeDetail && (
                    <p className="mt-5 max-w-[620px] text-[14px] leading-[1.8] text-[var(--gray-mid)] md:mt-6 md:text-[15px] md:leading-[1.85]">
                      {activeDetail}
                    </p>
                  )}

                  {activeCredentials.length > 0 && (
                    <div className="mt-auto flex gap-2 overflow-x-auto pt-6 md:pt-7 lg:overflow-visible">
                      {activeCredentials.map((credential) => (
                        <span
                          key={credential}
                          className="shrink-0 whitespace-nowrap border border-[#d8e2ea] bg-[var(--bg)] px-3 py-2 text-[11px] font-medium tracking-[0.05em] text-[var(--gray-mid)] font-[family-name:var(--font-body)]"
                        >
                          {credential}
                        </span>
                      ))}
                    </div>
                  )}

                </div>
              </div>
            </div>

            <div className="border-t border-[#d8e2ea]">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto]">
                <div className="flex overflow-x-auto md:grid md:grid-cols-4 md:overflow-visible">
                  {teamItems.map((member, index) => {
                    const selected = index === activeIndex

                    return (
                      <button
                        key={`${member.name}-${member.role}`}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        aria-pressed={selected}
                        className={`group flex min-h-[82px] min-w-[220px] items-center gap-3 border-r border-[#d8e2ea] px-5 py-4 text-left transition-colors duration-200 last:border-r-0 md:min-h-[92px] md:min-w-0 ${
                          selected ? 'bg-[var(--navy)] text-white' : 'bg-white text-[var(--navy)] hover:bg-[var(--bg)]'
                        }`}
                      >
                        <span
                          className={`text-[10px] font-semibold tracking-[0.16em] font-[family-name:var(--font-body)] ${
                            selected ? 'text-[var(--coral)]' : 'text-[#8aa0ad]'
                          }`}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span>
                          <span className="block font-[family-name:var(--font-display)] text-[18px] leading-[1.1]">
                            {member.name}
                          </span>
                          <span
                            className={`mt-1 block text-[10px] font-semibold uppercase tracking-[0.1em] font-[family-name:var(--font-body)] ${
                              selected ? 'text-white/62' : 'text-[var(--gray-mid)]'
                            }`}
                          >
                            {member.isFounder ? 'Dirección' : 'Especialista'}
                          </span>
                        </span>
                      </button>
                    )
                  })}
                </div>
                <div className="grid grid-cols-2 border-t border-[#d8e2ea] md:border-l md:border-t-0">
                  <button
                    type="button"
                    onClick={goToPrevious}
                    aria-label="Ver perfil anterior"
                    className="flex min-h-[58px] items-center justify-center border-r border-[#d8e2ea] text-[var(--navy)] transition-colors duration-200 hover:bg-[var(--bg)] md:min-h-[92px] md:w-16"
                  >
                    <ArrowLeft size={18} weight="duotone" />
                  </button>
                  <button
                    type="button"
                    onClick={goToNext}
                    aria-label="Ver perfil siguiente"
                    className="flex min-h-[58px] items-center justify-center text-[var(--navy)] transition-colors duration-200 hover:bg-[var(--bg)] md:min-h-[92px] md:w-16"
                  >
                    <ArrowRight size={18} weight="duotone" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-[var(--section-pad)] px-6 md:px-[60px] bg-[var(--bg)]">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
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

        <div>
          <span className="section-tag">Fundadora</span>
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(28px,3vw,38px)] font-medium text-[var(--navy)] leading-[1.2] mb-5">
            {displayName}
          </h2>
          <div className="divider" />

          <div className="space-y-4 mb-8">
            {paragraphs.map((p) => (
              <p key={p} className="text-[15px] text-[var(--gray-mid)] leading-[1.8]">
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
