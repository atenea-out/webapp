import Link from 'next/link'
import { clsx } from 'clsx'

type ButtonProps = {
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  external?: boolean
}

const variants = {
  primary:   'bg-[var(--navy)] text-white border-[var(--navy)] hover:bg-[var(--coral)] hover:border-[var(--coral)]',
  secondary: 'bg-transparent text-[var(--navy)] border-[#cbd5e1] hover:border-[var(--navy)] hover:bg-[var(--navy)]/[0.04]',
  ghost:     'bg-transparent text-[var(--coral)] border-[var(--coral-border)] hover:bg-[var(--coral-muted)] hover:border-[var(--coral)]',
}

const sizes = {
  sm: 'px-5 py-2 text-[11px] tracking-[0.1em]',
  md: 'px-8 py-3 text-[12px] tracking-[0.08em]',
  lg: 'px-10 py-4 text-[13px] tracking-[0.08em]',
}

export function Button({
  href, onClick, variant = 'primary', size = 'md',
  children, className, type = 'button', disabled = false, external = false,
}: ButtonProps) {
  const base = clsx(
    'inline-flex items-center justify-center gap-2 font-[family-name:var(--font-body)] font-medium',
    'uppercase rounded-sm border transition-all duration-200',
    variants[variant],
    sizes[size],
    disabled && 'opacity-50 pointer-events-none',
    className,
  )

  if (href) {
    return (
      <Link href={href} className={base} {...(external && { target: '_blank', rel: 'noopener noreferrer' })}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={base}>
      {children}
    </button>
  )
}
