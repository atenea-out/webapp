import { CountUp } from '@/components/ui/CountUp'

type Stat = { value: string; label: string; detail: string }

const defaultStats: Stat[] = [
  { value: '+20', label: 'Años de experiencia', detail: 'Fundada en 2003' },
  { value: '+5', label: 'Líneas de servicio', detail: 'Especializadas' },
  { value: '99%', label: 'Satisfacción', detail: 'De nuestros clientes' },
]

export function StatsBar({ stats: statsProp }: { stats?: Stat[] | null } = {}) {
  const stats = statsProp && statsProp.length > 0 ? statsProp : defaultStats
  return (
    <section className="bg-[var(--navy)] border-t border-white/[0.07] px-6 md:px-[60px] overflow-hidden relative">

      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {stats.map(({ value, label, detail }, i) => (
            <div
              key={label}
              className={[
                'relative h-[147px] md:h-[130px] lg:h-[124px] md:px-10 flex flex-col items-center justify-center text-center',
                i > 0 && 'border-t md:border-t-0 md:border-l border-white/[0.08]',
              ].filter(Boolean).join(' ')}
            >
              {/* Number — animates when scrolled into view */}
              <CountUp
                value={value}
                className="font-[family-name:var(--font-display)] text-[var(--coral)] leading-none mb-3 tracking-[-0.02em]"
                style={{ fontSize: 'clamp(38px,4vw,52px)' }}
              />

              {/* Label */}
              <span className="text-[13px] font-medium text-white/90 mb-1 font-[family-name:var(--font-body)]">
                {label}
              </span>

              {/* Detail */}
              <span className="text-[10px] tracking-[0.1em] uppercase text-white/35 font-[family-name:var(--font-body)]">
                {detail}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
