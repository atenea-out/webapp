'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  ArrowRight,
  List,
  LockKey,
  X,
} from '@phosphor-icons/react'
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

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      {/* ── Navbar navy, igual que el sitio original ── */}
      <nav
        className={clsx(
          'fixed top-0 left-0 right-0 z-[90] h-[76px]',
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
            width={280}
            height={120}
            className="h-[46px] w-auto object-contain transition-opacity duration-200 group-hover:opacity-80 md:h-[50px]"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-9">
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
        <div className="hidden lg:flex items-center gap-3">
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
          className="lg:hidden inline-flex h-11 w-11 items-center justify-center text-white transition-colors duration-200 hover:text-[var(--coral)]"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? <X size={24} /> : <List size={24} />}
        </button>
      </nav>

      {/* Mobile menu — también navy */}
      <div
        id="mobile-navigation"
        className={clsx(
          'fixed inset-0 z-[80] bg-[var(--navy)] flex flex-col pt-[76px] px-5 pb-5 overflow-hidden',
          'transition-all duration-300 lg:hidden',
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 86% 18%, rgba(239,98,94,0.14) 0%, transparent 26%), linear-gradient(155deg, rgba(255,255,255,0.055) 0%, transparent 34%)',
          }}
          aria-hidden="true"
        />

        <div className="relative flex min-h-full flex-col">
          <div className="border-b border-white/[0.08] pb-3 pt-4">
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[var(--coral)]">
              Menu principal
            </p>
            <p className="mt-2 max-w-[310px] text-[13px] leading-[1.55] text-white/62">
              Consultoría contable, tributaria y financiera para decisiones empresariales más claras.
            </p>
          </div>

          <ul className="mt-4 flex flex-col gap-1.5">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={clsx(
                    'group flex min-h-[52px] items-center gap-4 border px-4 py-2 transition-colors duration-200',
                    pathname === item.href
                      ? 'border-[var(--coral)]/45 bg-[var(--coral)]/10 text-white'
                      : 'border-white/[0.08] bg-white/[0.03] text-white hover:border-white/20 hover:bg-white/[0.06]',
                  )}
                >
                  <span
                    className={clsx(
                      'h-6 w-px shrink-0 bg-[var(--coral)]/45 transition-opacity duration-200 group-hover:opacity-100',
                      pathname === item.href ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  <span className="min-w-0 flex-1 font-[family-name:var(--font-display)] text-[22px] font-medium leading-none">
                    {item.label}
                  </span>
                  <ArrowRight
                    size={18}
                    className="shrink-0 text-white/35 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[var(--coral)]"
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div className="pt-4">
            <div className="grid grid-cols-2 gap-2">
              <Link
                href={portal.href}
                onClick={() => setMenuOpen(false)}
                className="flex min-h-11 items-center justify-center gap-2 border border-white/20 bg-white/[0.04] px-3 py-3 text-center text-[10px] font-medium uppercase tracking-[0.1em] text-white/78 transition-colors duration-200 hover:border-white/45 hover:bg-white/[0.08] hover:text-white"
              >
                <LockKey size={14} weight="duotone" />
                {portal.label}
              </Link>
              <Link
                href={cta.href}
                onClick={() => setMenuOpen(false)}
                className="flex min-h-11 items-center justify-center gap-2 bg-[var(--coral)] px-3 py-3 text-center text-[10px] font-medium uppercase tracking-[0.1em] text-white shadow-[0_18px_36px_rgba(239,98,94,0.22)] transition-colors duration-200 hover:bg-[var(--coral-light)]"
              >
                {cta.label}
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="mt-3 border-t border-white/[0.08] pt-3">
              <Link
                href="/politica-de-privacidad"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.12em] text-white/55 transition-colors duration-200 hover:text-white"
              >
                Política de privacidad
                <ArrowRight size={14} />
              </Link>
              <p className="mt-1.5 text-[11px] leading-relaxed text-white/32">
                Atenea Outsourcing. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
