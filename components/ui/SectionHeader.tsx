import { clsx } from 'clsx'

type SectionHeaderProps = {
  tag?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  dark?: boolean
  className?: string
}

export function SectionHeader({ tag, title, subtitle, align = 'left', dark = false, className }: SectionHeaderProps) {
  return (
    <div className={clsx(align === 'center' && 'text-center', className)}>
      {tag && <span className="section-tag">{tag}</span>}
      <h2 className={clsx(
        'font-[family-name:var(--font-display)] text-[clamp(30px,3.5vw,48px)] font-medium leading-[1.15] tracking-[-0.02em] mb-5',
        dark ? 'text-[var(--cream)]' : 'text-[var(--navy)]',
      )}>
        {title}
      </h2>
      <div className={clsx('divider', align === 'center' && 'mx-auto')} />
      {subtitle && (
        <p className={clsx(
          'text-[16px] font-light leading-[1.7] max-w-[560px]',
          dark ? 'text-[var(--cream-dark)]' : 'text-[var(--gray-mid)]',
        )}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
