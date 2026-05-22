import Image from 'next/image'
import { Medal, ShieldCheck, Handshake, Sparkle } from '@phosphor-icons/react/dist/ssr'
import type { Metadata } from 'next'
import { getSiteSettings, getTeam } from '@/lib/queries'
import { richTextToPlain } from '@/lib/lexical-to-react'
import type { Media, Team } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Nosotros',
  description:
    'Conoce a Atenea Outsourcing: más de 20 años de experiencia en contabilidad, finanzas y tributación en Ecuador. Fundada por la Ing. Patricia Rojas Túquerrez.',
}

export const revalidate = 60

const valueIcons = [Medal, ShieldCheck, Handshake, Sparkle]

function getMemberPhoto(member: Team) {
  return member.photo && typeof member.photo !== 'number' ? (member.photo as Media) : null
}

export default async function NosotrosPage() {
  const [settings, team] = await Promise.all([getSiteSettings(), getTeam()])

  const missionTitle = settings.nosotrosMissionTitle ?? 'Simplicidad al servicio de tu crecimiento'
  const missionParagraphs =
    settings.nosotrosMissionParagraphs?.map((p) => p.text).filter(Boolean) ?? [
      'Somos consultores contables financieros independientes, especializados en ofrecer servicios de asesoría y consultoría en contabilidad-finanzas, nómina e impuestos.',
      'Nos capacitamos y actualizamos de manera continua para proporcionar a nuestros clientes un servicio personalizado y de alta calidad, acompañando el crecimiento de sus empresas en el sector financiero de Ecuador y Latinoamérica.',
    ]
  const valores =
    settings.nosotrosValores?.map((v) => ({ title: v.title, desc: v.desc })) ?? []

  const visibleTeam = team

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

      {visibleTeam.length > 0 && (
        <section className="bg-[var(--bg)] px-6 py-20 md:px-[60px]">
          <div className="hidden" />
          <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 lg:grid-cols-[0.88fr_1.12fr] xl:grid-cols-[400px_1fr]">
            <aside className="lg:self-start">
              <span className="section-tag">Equipo Atenea</span>
              <h2
                className="mt-2 font-[family-name:var(--font-display)] font-medium leading-[1.1] text-[var(--navy)]"
                style={{ fontSize: 'clamp(30px,3.5vw,48px)' }}
              >
                Una red experta alrededor de cada decisión.
              </h2>
              <div className="my-6 h-px w-full bg-[#d8e2eb]">
                <div className="h-px w-20 bg-[var(--coral)]" />
              </div>
              <p className="max-w-[380px] text-[15px] leading-[1.85] text-[var(--gray-mid)]">
                Perfiles complementarios que integran contabilidad, tributación, procesos y
                control financiero con una forma de trabajo cercana, rigurosa y confidencial.
              </p>
              <div className="hidden">
                <div className="bg-white p-5">
                  <p className="font-[family-name:var(--font-display)] text-[34px] leading-none text-[var(--navy)]">
                    {String(visibleTeam.length).padStart(2, '0')}
                  </p>
                  <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--gray-light)]">
                    Especialistas
                  </p>
                </div>
                <div className="bg-white p-5">
                  <p className="font-[family-name:var(--font-display)] text-[34px] leading-none text-[var(--navy)]">
                    360
                  </p>
                  <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--gray-light)]">
                    Visión integral
                  </p>
                </div>
              </div>
            </aside>

            <div className="grid grid-cols-1 gap-5">
              {visibleTeam.map((member, index) => {
                const photo = getMemberPhoto(member)
                const photoUrl = photo?.url ?? '/patricia.png'
                const photoAlt = photo?.alt || `${member.name} - ${member.role}`
                const summary = member.summary || richTextToPlain(member.bio).slice(0, 180)
                const chips = member.shortCredentials?.map((c) => c.text).filter(Boolean).slice(0, 3) ?? []

                return (
                  <article
                    key={member.id}
                    className="group grid grid-cols-1 border border-[#d8e2eb] bg-white transition-colors duration-300 hover:border-[#cbd8e3] hover:bg-[#fbfcfd] md:grid-cols-[220px_1fr]"
                  >
                    <div className="relative h-[300px] overflow-hidden border-b border-[#d8e2eb] bg-[var(--navy)] md:h-full md:min-h-[260px] md:border-b-0 md:border-r">
                      <Image
                        src={photoUrl}
                        alt={photoAlt}
                        fill
                        className="object-cover object-top grayscale transition duration-500 group-hover:grayscale-0 group-hover:scale-[1.02]"
                        sizes="(max-width: 768px) 100vw, 230px"
                      />
                      <div className="absolute inset-0 bg-[var(--navy)]/42 transition duration-500 group-hover:bg-[var(--navy)]/18" />
                    </div>

                    <div className="relative flex min-h-[260px] flex-col p-6 sm:p-8 lg:p-9">
                      <div className="mb-7 flex items-start justify-between gap-6">
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--coral)]">
                            {member.isFounder ? 'Fundadora · Dirección' : 'Equipo especialista'}
                          </p>
                          <h3 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(26px,3vw,34px)] font-medium leading-tight text-[var(--navy)]">
                            {member.name}
                          </h3>
                        </div>
                        <span className="shrink-0 text-[11px] font-semibold tracking-[0.14em] text-[var(--gray-light)]">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>

                      <p className="max-w-[680px] text-[11px] font-semibold uppercase leading-[1.6] tracking-[0.12em] text-[var(--gray-mid)]">
                        {member.role}
                      </p>
                      {summary && (
                        <p className="mt-5 max-w-[720px] text-[14px] leading-[1.85] text-[var(--gray-mid)]">
                          {summary}
                        </p>
                      )}
                      {chips.length > 0 && (
                        <div className="mt-auto flex flex-wrap gap-2 pt-7">
                          {chips.map((chip) => (
                            <span
                              key={chip}
                              className="border border-[#d8e2eb] bg-[var(--bg)] px-3 py-2 text-[10px] font-semibold tracking-[0.08em] text-[var(--gray-mid)]"
                            >
                              {chip}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
