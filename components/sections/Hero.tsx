import { Button } from '@/components/ui/Button'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'

const defaultEspecialidades = ['Contabilidad', 'Tributación', 'Nómina', 'Tesorería', 'Legal']
const defaultCredits = ['NIIF', 'SRI', 'SAP', 'ERP']

type HeroProps = {
  badge?: string | null
  title?: string | null
  highlight?: string | null
  subtitle?: string | null
  ctaPrimaryLabel?: string | null
  ctaPrimaryHref?: string | null
  ctaSecondaryLabel?: string | null
  ctaSecondaryHref?: string | null
  especialidades?: string[] | null
  credits?: string[] | null
}

/**
 * Composición financiera abstracta — consultora premium.
 * Integrada con el design system: coral #ef625e para la curva principal,
 * blanco sutil para la estructura. Geometría limpia, no dashboard genérico.
 */
function FinancialComposition() {
  const nodes = [[320, 490], [510, 350], [720, 165]] as const
  const volBars: [number, number][] = [
    [130,14],[210,10],[290,20],[370,12],[450,26],
    [530,16],[610,30],[690,20],[770,36],[850,42],[880,50],
  ]
  const kpiCards = [
    { x: 606, w: 70 },
    { x: 694, w: 64 },
    { x: 776, w: 76 },
  ]

  return (
    <svg
      viewBox="0 0 900 700"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-full h-full"
      preserveAspectRatio="xMaxYMid slice"
    >
      {/* ── Grid de fondo — precisión contable ── */}
      {[100,175,250,325,400,475,550,625].map(y => (
        <line key={`h${y}`} x1="0" y1={y} x2="900" y2={y}
          stroke="white" strokeWidth="0.35" opacity="0.06" />
      ))}
      {[100,200,300,400,500,600,700,800].map(x => (
        <line key={`v${x}`} x1={x} y1="0" x2={x} y2="700"
          stroke="white" strokeWidth="0.35" opacity="0.06" />
      ))}

      {/* ── Diagonales estructurales sutiles ── */}
      <line x1="0" y1="700" x2="900" y2="0"   stroke="white" strokeWidth="0.5" opacity="0.015" />
      <line x1="0" y1="460" x2="900" y2="140" stroke="white" strokeWidth="0.35" opacity="0.015" />

      {/* ── Ejes del chart ── */}
      <line x1="80" y1="55"  x2="80"  y2="585" stroke="white" strokeWidth="0.8" opacity="0.22" />
      <line x1="80" y1="585" x2="885" y2="585" stroke="white" strokeWidth="0.8" opacity="0.22" />

      {/* Ticks eje Y */}
      {[485,400,315,230,140].map(y => (
        <line key={y} x1="74" y1={y} x2="82" y2={y} stroke="white" strokeWidth="0.8" opacity="0.20" />
      ))}
      {/* Labels eje Y */}
      {[485,400,315,230,140].map((y,i) => (
        <rect key={y} x="14" y={y-3} width={22+i*4} height="5" rx="1"
          fill="white" opacity="0.13" />
      ))}

      {/* Ticks eje X */}
      {[180,280,380,480,580,680,780,875].map(x => (
        <line key={x} x1={x} y1="583" x2={x} y2="591" stroke="white" strokeWidth="0.8" opacity="0.18" />
      ))}
      {/* Labels eje X */}
      {[164,264,364,464,564,664,760].map(x => (
        <rect key={x} x={x} y="598" width="30" height="4" rx="1"
          fill="white" opacity="0.12" />
      ))}

      {/* ── Serie secundaria — blanco punteado ── */}
      <path
        d="M80,578 C180,572 270,558 355,534 C440,510 488,482 568,452 C648,422 706,390 790,358 C830,342 860,330 885,322"
        stroke="white" strokeWidth="0.9" strokeDasharray="5,5"
        fill="none" opacity="0.18"
      />

      {/* ── Área bajo curva coral ── */}
      <path
        d="M80,565 C160,558 230,535 320,490 C410,445 435,408 510,350 C585,292 638,222 720,165 C782,120 836,94 885,76 L885,585 L80,585 Z"
        fill="#ef625e" opacity="0.055"
      />
      {/* ── Área blanca superpuesta (profundidad) ── */}
      <path
        d="M80,565 C160,558 230,535 320,490 C410,445 435,408 510,350 C585,292 638,222 720,165 C782,120 836,94 885,76 L885,585 L80,585 Z"
        fill="white" opacity="0.025"
      />

      {/* ── Curva principal CORAL ── */}
      <path
        d="M80,565 C160,558 230,535 320,490 C410,445 435,408 510,350 C585,292 638,222 720,165 C782,120 836,94 885,76"
        stroke="#ef625e" strokeWidth="2.4" strokeLinecap="round"
        fill="none" opacity="0.90"
      />

      {/* ── Nodos intermedios sobre la curva coral ── */}
      {nodes.map(([cx, cy]) => (
        <g key={`${cx},${cy}`}>
          {/* Línea drop al eje X */}
          <line x1={cx} y1={cy+6} x2={cx} y2="585"
            stroke="#ef625e" strokeWidth="0.6" strokeDasharray="3,4" opacity="0.20" />
          {/* Dot */}
          <circle cx={cx} cy={cy} r="3.5" fill="#ef625e" opacity="0.75" />
          <circle cx={cx} cy={cy} r="7"   stroke="#ef625e" strokeWidth="0.8" fill="none" opacity="0.22" />
        </g>
      ))}

      {/* ── Nodo final — anchor point prominente ── */}
      <circle cx="885" cy="76" r="5.5" fill="#ef625e" opacity="1"   />
      <circle cx="885" cy="76" r="12"  stroke="#ef625e" strokeWidth="1"   fill="none" opacity="0.32" />
      <circle cx="885" cy="76" r="22"  stroke="#ef625e" strokeWidth="0.5" fill="none" opacity="0.13" />
      <circle cx="885" cy="76" r="36"  stroke="#ef625e" strokeWidth="0.25" fill="none" opacity="0.06" />
      {/* Drop line desde nodo final */}
      <line x1="885" y1="92"  x2="885" y2="585"
        stroke="#ef625e" strokeWidth="0.8" strokeDasharray="4,4" opacity="0.20" />

      {/* Nodo de origen */}
      <circle cx="80" cy="565" r="3" fill="white" opacity="0.28" />

      {/* ── Callout del nodo final ── */}
      <rect x="748" y="46"  width="76" height="44" rx="2"
        fill="white" opacity="0.06" />
      <rect x="748" y="46"  width="76" height="44" rx="2"
        stroke="white" strokeWidth="0.5" fill="none" opacity="0.18" />
      {/* Valor coral */}
      <rect x="756" y="55"  width="34" height="6"  rx="1" fill="#ef625e" opacity="0.60" />
      <rect x="756" y="66"  width="52" height="4"  rx="1" fill="white"   opacity="0.24" />
      <rect x="756" y="74"  width="38" height="3"  rx="1" fill="white"   opacity="0.14" />

      {/* ── KPI cards — esquina superior ── */}
      {kpiCards.map(({ x, w }) => (
        <g key={x}>
          <rect x={x} y="14" width={w} height="40" rx="2"
            fill="white" opacity="0.04" />
          <rect x={x} y="14" width={w} height="40" rx="2"
            stroke="white" strokeWidth="0.5" fill="none" opacity="0.13" />
          <rect x={x+7} y="22" width={w-22} height="4" rx="1" fill="white" opacity="0.16" />
          {/* Value con accent coral en el primero */}
          <rect x={x+7} y="30" width={w-14} height="8" rx="1"
            fill={x === 776 ? '#ef625e' : 'white'}
            opacity={x === 776 ? 0.35 : 0.28} />
          <rect x={x+7} y="42" width={w-30} height="3" rx="1" fill="white" opacity="0.12" />
        </g>
      ))}

      {/* ── Histograma de volumen — debajo del chart ── */}
      {volBars.map(([x, h]) => (
        <rect key={x} x={x-8} y={585} width="15" height={h} rx="1"
          fill="white" opacity="0.09" />
      ))}

    </svg>
  )
}

export function Hero({
  badge,
  title,
  highlight,
  subtitle,
  ctaPrimaryLabel,
  ctaPrimaryHref,
  ctaSecondaryLabel,
  ctaSecondaryHref,
  especialidades: especialidadesProp,
  credits: creditsProp,
}: HeroProps = {}) {
  const badgeText = badge || 'Consultoría Contable & Financiera'
  const titleTemplate = title || 'Sabiduría frente a los {highlight} empresariales'
  const highlightWord = highlight || 'desafíos'
  const subtitleText = subtitle || 'En Atenea, simplificamos lo complejo para que tú te enfoques en crecer.'
  const primary = {
    label: ctaPrimaryLabel || 'Nuestros Servicios',
    href: ctaPrimaryHref || '/servicios',
  }
  const secondary = {
    label: ctaSecondaryLabel || 'Contáctanos',
    href: ctaSecondaryHref || '/contacto',
  }
  const especialidades =
    especialidadesProp && especialidadesProp.length > 0 ? especialidadesProp : defaultEspecialidades
  const credits = creditsProp && creditsProp.length > 0 ? creditsProp : defaultCredits

  // Split "... {highlight} ..." into [before, after]
  const [titleBefore, titleAfter] = titleTemplate.includes('{highlight}')
    ? titleTemplate.split('{highlight}')
    : [titleTemplate, '']

  return (
    <section className="relative min-h-[calc(100vh-72px)] flex items-center overflow-hidden bg-[var(--navy)] py-24">

      {/* Gradiente coral — arriba derecha */}
      <div
        className="absolute top-0 right-0 w-[55%] h-[70%] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top right, rgba(239,98,94,0.06) 0%, transparent 65%)' }}
        aria-hidden="true"
      />

      {/* Panel diagonal */}
      <div
        className="absolute top-0 right-0 w-[48%] h-full bg-white/[0.016] hidden lg:block pointer-events-none"
        style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 0 100%)' }}
        aria-hidden="true"
      />

      {/* Composición financiera — integrada con gradient mask */}
      <div
        className="absolute inset-0 pointer-events-none select-none hidden lg:block"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, transparent 18%, rgba(0,0,0,0.3) 34%, rgba(0,0,0,0.75) 52%, black 70%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, transparent 18%, rgba(0,0,0,0.3) 34%, rgba(0,0,0,0.75) 52%, black 70%)',
        }}
        aria-hidden="true"
      >
        <FinancialComposition />
      </div>

      {/* Layout */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-[60px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px] gap-12 xl:gap-20 items-center">

          {/* Columna izquierda */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-10 border border-[var(--coral-border)] bg-[var(--coral-muted)] rounded-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--coral)]" />
              <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[var(--coral)] font-[family-name:var(--font-body)]">
                {badgeText}
              </span>
            </div>

            <h1
              className="font-[family-name:var(--font-display)] font-medium leading-[1.07] text-[var(--cream)] mb-7 tracking-[-0.02em]"
              style={{ fontSize: 'clamp(40px,5.5vw,80px)' }}
            >
              {titleBefore}
              {titleAfter !== '' && (
                <em className="text-[var(--coral)]" style={{ fontStyle: 'italic' }}>
                  {highlightWord}
                </em>
              )}
              {titleAfter}
            </h1>

            <p className="text-[17px] font-light text-[var(--cream-dark)] leading-[1.8] mb-12 max-w-[460px]">
              {subtitleText}
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                href={primary.href}
                variant="primary"
                size="lg"
                className="!bg-transparent !border-[var(--coral)]/50 !text-[var(--coral)] hover:!border-[var(--coral)] hover:!bg-[var(--coral)]/8"
              >
                {primary.label}
              </Button>
              <Button
                href={secondary.href}
                variant="ghost"
                size="lg"
                className="!bg-white/10 !border-white/25 !text-white backdrop-blur-md hover:!bg-white/20 hover:!border-white/45"
              >
                {secondary.label}
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>

          {/* Columna derecha — panel especialidades */}
          <div className="hidden lg:block">
            <div className="border border-white/[0.1] bg-white/[0.05] backdrop-blur-sm">

              <div className="px-8 pt-8 pb-5 border-b border-white/[0.07]">
                <p className="text-[10px] tracking-[0.22em] uppercase text-white/40 font-[family-name:var(--font-body)]">
                  Nos especializamos en
                </p>
              </div>

              <div className="px-8 py-2">
                {especialidades.map((item, i) => (
                  <div key={item} className="flex items-center gap-5 py-4 border-b border-white/[0.05] last:border-0">
                    <span className="text-[11px] font-medium text-[var(--coral)] font-[family-name:var(--font-body)] tabular-nums w-5 flex-shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[15px] font-medium text-[var(--cream)] font-[family-name:var(--font-body)]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="px-8 py-5 bg-white/[0.03] border-t border-white/[0.07]">
                <p className="text-[11px] font-medium text-white/55 tracking-[0.06em] mb-3 font-[family-name:var(--font-body)]">
                  Ecuador · Latinoamérica
                </p>
                <div className="flex flex-wrap gap-2">
                  {credits.map((cred) => (
                    <span
                      key={cred}
                      className="px-2.5 py-1 text-[10px] tracking-[0.1em] font-medium text-white/40 border border-white/[0.1] font-[family-name:var(--font-body)]"
                    >
                      {cred}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
