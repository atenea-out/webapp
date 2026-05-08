'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { LockKey, EnvelopeSimple, Eye, EyeSlash, ArrowLeft } from '@phosphor-icons/react'

export default function PortalPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading]           = useState(false)
  const [submitted, setSubmitted]       = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    // Simulación — en el futuro conecta al CRM real
    setTimeout(() => { setLoading(false); setSubmitted(true) }, 1400)
  }

  return (
    <div className="min-h-screen flex bg-[var(--bg)]" style={{ fontFamily: 'var(--font-body)' }}>

      {/* ── LEFT PANEL — brand ── */}
      <div
        className="hidden lg:flex lg:w-[45%] flex-col justify-between p-12 bg-[var(--navy)] relative overflow-hidden"
      >
        {/* Decorative grid background */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.04]"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Coral accent blob */}
        <div className="absolute -bottom-32 -left-32 w-[420px] h-[420px] rounded-full bg-[var(--coral)] opacity-[0.08] blur-3xl pointer-events-none" />

        {/* Logo */}
        <Link href="/" className="relative z-10">
          <Image
            src="/logo.png"
            alt="Atenea Outsourcing"
            width={160}
            height={54}
            className="h-10 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
          />
        </Link>

        {/* Middle copy */}
        <div className="relative z-10 space-y-6">
          <div className="w-10 h-px bg-[var(--coral)]" />
          <h1
            className="text-white leading-[1.15] tracking-[-0.02em]"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3vw,40px)', fontWeight: 500 }}
          >
            Portal exclusivo<br />para nuestros<br />clientes
          </h1>
          <p className="text-white/50 text-[14px] leading-[1.75] max-w-[320px]">
            Accede a tus reportes financieros, estados de cuenta y comunicaciones con tu equipo Atenea en un solo lugar.
          </p>
        </div>

        {/* Bottom tagline */}
        <p className="relative z-10 text-white/25 text-[11px] tracking-[0.12em] uppercase">
          © {new Date().getFullYear()} Atenea Outsourcing — Acceso seguro
        </p>
      </div>

      {/* ── RIGHT PANEL — form ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">

        {/* Back link */}
        <Link
          href="/"
          className="self-start mb-10 ml-1 flex items-center gap-1.5 text-[12px] tracking-[0.08em] uppercase text-[var(--gray-mid)] hover:text-[var(--navy)] transition-colors duration-200"
        >
          <ArrowLeft size={13} /> Volver al sitio
        </Link>

        <div className="w-full max-w-[400px]">

          {/* Icon */}
          <div className="mb-8 w-11 h-11 rounded-sm bg-[var(--navy)] flex items-center justify-center">
            <LockKey size={20} color="white" weight="duotone" />
          </div>

          <h2
            className="text-[var(--navy)] mb-1 tracking-[-0.02em]"
            style={{ fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: 500 }}
          >
            Inicia sesión
          </h2>
          <p className="text-[var(--gray-mid)] text-[13px] mb-8 leading-relaxed">
            Ingresa tus credenciales para acceder a tu portal.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-[11px] tracking-[0.1em] uppercase text-[var(--navy)]/60 font-medium">
                  Correo electrónico
                </label>
                <div className="relative">
                  <EnvelopeSimple
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--navy)]/30"
                  />
                  <input
                    type="email"
                    required
                    placeholder="cliente@empresa.com"
                    className="w-full pl-9 pr-4 py-3 text-[13px] bg-white border border-[var(--navy)]/12 text-[var(--navy)] placeholder:text-[var(--navy)]/25 outline-none focus:border-[var(--navy)]/40 focus:ring-2 focus:ring-[var(--navy)]/6 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-[11px] tracking-[0.1em] uppercase text-[var(--navy)]/60 font-medium">
                  Contraseña
                </label>
                <div className="relative">
                  <LockKey
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--navy)]/30"
                    weight="duotone"
                  />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    className="w-full pl-9 pr-10 py-3 text-[13px] bg-white border border-[var(--navy)]/12 text-[var(--navy)] placeholder:text-[var(--navy)]/25 outline-none focus:border-[var(--navy)]/40 focus:ring-2 focus:ring-[var(--navy)]/6 transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--navy)]/30 hover:text-[var(--navy)]/60 transition-colors"
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  >
                    {showPassword ? <EyeSlash size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* Forgot */}
              <div className="flex justify-end">
                <button type="button" className="text-[11px] text-[var(--coral)] hover:underline tracking-wide">
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[var(--navy)] text-white text-[12px] tracking-[0.1em] uppercase font-medium
                           hover:bg-[var(--navy)]/85 disabled:opacity-60 disabled:cursor-not-allowed
                           transition-all duration-200 flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Verificando…
                  </>
                ) : (
                  'Ingresar al portal'
                )}
              </button>

            </form>
          ) : (
            /* Estado simulado — reemplazar con redirección al CRM real */
            <div className="border border-[var(--navy)]/10 bg-white p-8 text-center space-y-4">
              <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto">
                <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 text-emerald-500">
                  <path d="M5 10l4 4 6-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p className="text-[var(--navy)] font-medium text-[15px]" style={{ fontFamily: 'var(--font-display)' }}>
                  Credenciales verificadas
                </p>
                <p className="text-[var(--gray-mid)] text-[12px] mt-1 leading-relaxed">
                  El portal de clientes estará disponible próximamente.<br />
                  Te notificaremos cuando esté listo.
                </p>
              </div>
              <Link
                href="/"
                className="inline-block mt-2 text-[11px] tracking-[0.1em] uppercase text-[var(--coral)] hover:underline"
              >
                Volver al inicio
              </Link>
            </div>
          )}

          <p className="mt-8 text-center text-[11px] text-[var(--navy)]/30 leading-relaxed">
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
