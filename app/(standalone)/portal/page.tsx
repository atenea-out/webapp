'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft,
  Eye,
  EyeSlash,
  GoogleLogo,
  LinkedinLogo,
  LockKey,
  MicrosoftOutlookLogo,
  EnvelopeSimple,
} from '@phosphor-icons/react'

const socialProviders = [
  { label: 'Google', icon: GoogleLogo },
  { label: 'Microsoft', icon: MicrosoftOutlookLogo },
  { label: 'LinkedIn', icon: LinkedinLogo },
]

export default function PortalPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    // Simulación: en el futuro conecta al CRM/SSO real.
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1400)
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] lg:flex" style={{ fontFamily: 'var(--font-body)' }}>
      <div className="hidden lg:flex lg:w-[45%] flex-col justify-between p-12 bg-[var(--navy)] relative overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.04]"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        <div className="absolute -bottom-32 -left-32 w-[420px] h-[420px] rounded-full bg-[var(--coral)] opacity-[0.08] blur-3xl pointer-events-none" />

        <Link href="/" className="relative z-10 inline-flex w-fit">
          <Image
            src="/logo.png"
            alt="Atenea Outsourcing"
            width={280}
            height={120}
            className="h-[50px] w-auto object-contain opacity-95 transition-opacity hover:opacity-100"
            priority
          />
        </Link>

        <div className="relative z-10 space-y-6">
          <div className="w-10 h-px bg-[var(--coral)]" />
          <h1
            className="text-white leading-[1.15] tracking-[-0.02em]"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(30px,3vw,42px)',
              fontWeight: 500,
            }}
          >
            Portal exclusivo
            <br />
            para nuestros
            <br />
            clientes
          </h1>
          <p className="text-white/55 text-[14px] leading-[1.75] max-w-[340px]">
            Accede a tus reportes financieros, estados de cuenta y comunicaciones con tu equipo
            Atenea en un solo lugar.
          </p>
        </div>

        <p className="relative z-10 text-white/28 text-[11px] tracking-[0.12em] uppercase">
          © {new Date().getFullYear()} Atenea Outsourcing - Acceso seguro
        </p>
      </div>

      <div className="relative flex min-h-screen flex-1 flex-col px-6 py-8 sm:px-8 lg:items-center lg:justify-center lg:py-12">
        <div className="-mx-6 -mt-8 mb-10 flex h-[76px] items-center border-b border-white/[0.08] bg-[var(--navy)] px-6 sm:-mx-8 sm:px-8 lg:hidden">
          <Link href="/" className="inline-flex">
            <Image
              src="/logo.png"
              alt="Atenea Outsourcing"
              width={280}
              height={120}
              className="h-[46px] w-auto object-contain"
              priority
            />
          </Link>
        </div>

        <div className="w-full max-w-[430px]">
          <Link
            href="/"
            className="mb-10 inline-flex w-fit items-center gap-1.5 text-[12px] tracking-[0.08em] uppercase text-[var(--gray-mid)] transition-colors duration-200 hover:text-[var(--navy)] lg:absolute lg:left-12 lg:top-12 lg:mb-0"
          >
            <ArrowLeft size={13} /> Volver al sitio
          </Link>

          <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-sm bg-[var(--navy)]">
            <LockKey size={21} color="white" weight="duotone" />
          </div>

          <h2
            className="mb-1 text-[var(--navy)] tracking-[-0.02em]"
            style={{ fontFamily: 'var(--font-display)', fontSize: '30px', fontWeight: 500 }}
          >
            Inicia sesión
          </h2>
          <p className="mb-7 text-[14px] leading-relaxed text-[var(--gray-mid)]">
            Ingresa con tus credenciales o continúa con una cuenta corporativa.
          </p>

          {!submitted ? (
            <>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                {socialProviders.map(({ label, icon: Icon }) => (
                  <button
                    key={label}
                    type="button"
                    className="inline-flex min-h-11 items-center justify-center gap-2 border border-[var(--navy)]/12 bg-white px-4 py-3 text-[12px] font-medium text-[var(--navy)] transition-all duration-200 hover:border-[var(--navy)]/35 hover:bg-[var(--navy)]/[0.03]"
                    aria-label={`Continuar con ${label}`}
                  >
                    <Icon size={17} weight="regular" />
                    <span className="sm:hidden">{label}</span>
                  </button>
                ))}
              </div>

              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-[var(--navy)]/10" />
                <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--gray-light)]">
                  O con correo
                </span>
                <div className="h-px flex-1 bg-[var(--navy)]/10" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] tracking-[0.1em] uppercase text-[var(--navy)]/60 font-medium">
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <EnvelopeSimple
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--navy)]/35"
                    />
                    <input
                      type="email"
                      required
                      placeholder="cliente@empresa.com"
                      className="w-full border border-[var(--navy)]/14 bg-white py-3.5 pl-10 pr-4 text-[14px] text-[var(--navy)] outline-none transition-all duration-200 placeholder:text-[var(--navy)]/28 focus:border-[var(--navy)]/45 focus:ring-2 focus:ring-[var(--navy)]/8"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] tracking-[0.1em] uppercase text-[var(--navy)]/60 font-medium">
                    Contraseña
                  </label>
                  <div className="relative">
                    <LockKey
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--navy)]/35"
                      weight="duotone"
                    />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      className="w-full border border-[var(--navy)]/14 bg-white py-3.5 pl-10 pr-11 text-[14px] text-[var(--navy)] outline-none transition-all duration-200 placeholder:text-[var(--navy)]/28 focus:border-[var(--navy)]/45 focus:ring-2 focus:ring-[var(--navy)]/8"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center text-[var(--navy)]/38 transition-colors hover:text-[var(--navy)]/70"
                      aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    >
                      {showPassword ? <EyeSlash size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-[11px] text-[var(--coral)] hover:underline tracking-wide"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 flex w-full items-center justify-center gap-2 bg-[var(--navy)] px-6 py-4 text-[12px] font-medium uppercase tracking-[0.1em] text-white transition-all duration-200 hover:bg-[var(--navy)]/88 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Verificando...
                    </>
                  ) : (
                    'Ingresar al portal'
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="border border-[var(--navy)]/10 bg-white p-8 text-center space-y-4">
              <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto">
                <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 text-emerald-500">
                  <path
                    d="M5 10l4 4 6-7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <p
                  className="text-[var(--navy)] font-medium text-[15px]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Credenciales verificadas
                </p>
                <p className="text-[var(--gray-mid)] text-[12px] mt-1 leading-relaxed">
                  El portal de clientes estará disponible próximamente.
                  <br />
                  Te notificaremos cuando esté listo.
                </p>
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                <Link
                  href="/"
                  className="inline-flex min-h-10 items-center justify-center border border-[var(--navy)]/12 px-4 text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--navy)] transition-colors hover:border-[var(--navy)]/30 hover:bg-[var(--navy)]/[0.03]"
                >
                  Volver al sitio
                </Link>
                <Link
                  href="/contacto"
                  className="inline-flex min-h-10 items-center justify-center bg-[var(--coral)] px-4 text-[11px] font-medium uppercase tracking-[0.1em] text-white transition-colors hover:bg-[var(--coral-light)]"
                >
                  Solicitar acceso
                </Link>
              </div>
            </div>
          )}

          <p className="mt-8 text-center text-[11px] text-[var(--navy)]/38 leading-relaxed">
            ¿No tienes acceso aún?{' '}
            <Link href="/contacto" className="text-[var(--coral)] hover:underline">
              Contáctanos
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
