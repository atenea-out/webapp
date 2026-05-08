'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { List, X, LockKey } from '@phosphor-icons/react'
import { clsx } from 'clsx'

type NavItem = { label: string; href: string }

const defaultNavItems: NavItem[] = [
  { label: 'Nosotros',   href: '/nosotros' },
  { label: 'Servicios',  href: '/servicios' },
  { label: 'Industrias', href: '/industrias' },
  { label: 'Noticias',   href: '/noticias' },
  { label: 'Contacto',   href: '/contacto' },
]

type NavbarProps = {
  items?: NavItem[] | null
  ctaLabel?: string | null
  ctaHref?: string | null
  portalLabel?: string | null
  portalHref?: string | null
}

export function Navbar({
  items,
  ctaLabel,
  ctaHref,
  portalLabel,
  portalHref,
}: NavbarProps = {}) {
  const navItems: NavItem[] =
    items && items.length > 0 ? items.map((i) => ({ label: i.label, href: i.href })) : defaultNavItems
  const cta = { label: ctaLabel || 'Contáctanos', href: ctaHref || '/contacto' }
  const portal = { label: portalLabel || 'Acceso Clientes', href: portalHref || '/portal' }

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname                = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* ── Navbar navy, igual que el sitio original ── */}
      <nav
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 h-[72px]',
          'flex items-center justify-between px-6 md:px-[60px]',
          'bg-[var(--navy)] border-b border-white/[0.08]',
          'transition-shadow duration-300',
          scrolled && 'shadow-[0_2px_24px_rgba(2,48,68,0.45)]',
        )}
      >
        {/* Logo — diseñado para fondo oscuro */}
        <Link href="/" className="flex items-center group">
          <Image
            src="/logo.png"
            alt="Atenea Outsourcing"
            width={174}
            height={58}
            className="h-11 w-auto object-contain transition-opacity duration-200 group-hover:opacity-80"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-9">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={clsx(
                  'relative text-[13px] font-normal tracking-[0.05em] uppercase',
                  'transition-colors duration-200',
                  'after:absolute after:bottom-[-3px] after:left-0 after:h-px after:bg-[var(--coral)]',
                  'after:transition-[width] after:duration-300',
                  pathname === item.href
                    ? 'text-white after:w-full'
                    : 'text-white/70 hover:text-white after:w-0 hover:after:w-full',
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href={portal.href}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-white/70 text-[12px] font-medium tracking-[0.08em] uppercase rounded-sm border border-white/20 hover:text-white hover:border-white/50 transition-all duration-200"
          >
            <LockKey size={13} weight="duotone" />
            {portal.label}
          </Link>
          <Link
            href={cta.href}
            className="inline-flex items-center px-6 py-2.5 bg-[var(--coral)] text-white text-[12px] font-medium tracking-[0.08em] uppercase rounded-sm border border-[var(--coral)] transition-all duration-200 hover:bg-[var(--coral-light)] hover:border-[var(--coral-light)] hover:-translate-y-px"
          >
            {cta.label}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-1 text-white"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <List size={24} />}
        </button>
      </nav>

      {/* Mobile menu — también navy */}
      <div
        className={clsx(
          'fixed inset-0 z-40 bg-[var(--navy)] flex flex-col pt-[72px] px-6 pb-10',
          'transition-all duration-300 md:hidden',
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
      >
        <Image
          src="/logo.png"
          alt="Atenea Outsourcing"
          width={140}
          height={46}
          className="h-9 w-auto mt-6 mb-2"
        />
        <ul className="flex flex-col gap-1 mt-4">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={clsx(
                  'block py-4 border-b border-white/[0.08]',
                  'font-[family-name:var(--font-display)] text-2xl font-medium',
                  pathname === item.href ? 'text-[var(--coral)]' : 'text-white',
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-col gap-3">
          <Link
            href={portal.href}
            onClick={() => setMenuOpen(false)}
            className="text-center px-6 py-3.5 text-white/80 text-[13px] font-medium tracking-[0.08em] uppercase rounded-sm border border-white/25 hover:border-white/50 hover:text-white transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <LockKey size={14} weight="duotone" />
            {portal.label}
          </Link>
          <Link
            href={cta.href}
            onClick={() => setMenuOpen(false)}
            className="text-center px-6 py-3.5 bg-[var(--coral)] text-white text-[13px] font-medium tracking-[0.08em] uppercase rounded-sm hover:bg-[var(--coral-light)] transition-colors duration-200"
          >
            {cta.label}
          </Link>
        </div>
      </div>
    </>
  )
}
