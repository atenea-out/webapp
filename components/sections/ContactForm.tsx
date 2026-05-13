'use client'

import { useEffect, useRef, useState } from 'react'
import { PaperPlaneTilt, CircleNotch, CheckCircle, WarningCircle } from '@phosphor-icons/react'

const defaultServiceOptions = [
  'Outsourcing Contable Financiero',
  'Nómina y Cumplimiento Laboral',
  'Tesorería',
  'Apoyo Administrativo',
  'Revisiones Especiales',
  'Legal e Impuestos',
  'Otro / No estoy seguro',
]

type Status = 'idle' | 'loading' | 'success' | 'error'

type TurnstileRenderOptions = {
  sitekey: string
  callback: (token: string) => void
  'expired-callback': () => void
  'error-callback': () => void
  theme: 'light' | 'dark' | 'auto'
}

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: TurnstileRenderOptions) => string
      reset: (widgetId?: string) => void
    }
  }
}

export function ContactForm({ serviceOptions }: { serviceOptions?: string[] } = {}) {
  const options = serviceOptions && serviceOptions.length > 0 ? serviceOptions : defaultServiceOptions
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  const turnstileRef = useRef<HTMLDivElement | null>(null)
  const turnstileWidgetId = useRef<string | null>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError]   = useState('')
  const [captchaError, setCaptchaError] = useState('')
  const [form, setForm]     = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    website: '',
    turnstileToken: '',
  })

  useEffect(() => {
    if (!turnstileSiteKey || !turnstileRef.current || turnstileWidgetId.current) return

    const renderTurnstile = () => {
      if (!window.turnstile || !turnstileRef.current || turnstileWidgetId.current) return
      turnstileWidgetId.current = window.turnstile.render(turnstileRef.current, {
        sitekey: turnstileSiteKey,
        theme: 'light',
        callback: (token) => {
          setCaptchaError('')
          setForm((prev) => ({ ...prev, turnstileToken: token }))
        },
        'expired-callback': () => {
          setForm((prev) => ({ ...prev, turnstileToken: '' }))
          setCaptchaError('La verificación expiró. Inténtalo nuevamente.')
        },
        'error-callback': () => {
          setForm((prev) => ({ ...prev, turnstileToken: '' }))
          setCaptchaError('No pudimos cargar la verificación de seguridad.')
        },
      })
    }

    if (window.turnstile) {
      renderTurnstile()
      return
    }

    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    script.async = true
    script.defer = true
    script.onload = renderTurnstile
    document.head.appendChild(script)
  }, [turnstileSiteKey])

  const resetTurnstile = () => {
    if (!turnstileWidgetId.current) return
    window.turnstile?.reset(turnstileWidgetId.current)
    setForm((prev) => ({ ...prev, turnstileToken: '' }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setError('')
    setCaptchaError('')
    if (turnstileSiteKey && !form.turnstileToken) {
      setCaptchaError('Completa la verificación de seguridad para enviar el mensaje.')
      setStatus('idle')
      return
    }
    try {
      const res  = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Error al enviar.'); setStatus('error'); resetTurnstile(); return }
      setStatus('success')
      setForm({ name: '', email: '', phone: '', service: '', message: '', website: '', turnstileToken: '' })
      resetTurnstile()
    } catch {
      setError('Error de conexión. Intenta nuevamente.')
      setStatus('error')
    }
  }

  const inputBase =
    'w-full bg-[var(--bg)] border border-[#e2e8f0] px-4 py-3 text-[14px] text-[var(--navy)] placeholder-[var(--gray-light)] font-[family-name:var(--font-body)] transition-colors duration-150 focus:outline-none focus:border-[var(--coral)] focus:bg-white'

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 gap-4">
        <CheckCircle size={52} color="var(--coral)" weight="duotone" />
        <h3 className="font-[family-name:var(--font-display)] text-[22px] font-medium text-[var(--navy)]">
          ¡Mensaje enviado!
        </h3>
        <p className="text-[14px] text-[var(--gray-mid)] max-w-[320px] leading-[1.7]">
          Hemos recibido tu consulta. Te responderemos en menos de 24 horas hábiles.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 text-[12px] tracking-[0.08em] uppercase text-[var(--coral)] underline underline-offset-3 font-[family-name:var(--font-body)] hover:text-[var(--coral-light)] transition-colors"
        >
          Enviar otro mensaje
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-[10px] tracking-[0.15em] uppercase text-[var(--gray-mid)] mb-2 font-[family-name:var(--font-body)]">
            Nombre completo *
          </label>
          <input type="text" name="name" value={form.name} onChange={handleChange}
            maxLength={100}
            placeholder="Tu nombre completo" required className={inputBase} />
        </div>
        <div>
          <label className="block text-[10px] tracking-[0.15em] uppercase text-[var(--gray-mid)] mb-2 font-[family-name:var(--font-body)]">
            Correo electrónico *
          </label>
          <input type="email" name="email" value={form.email} onChange={handleChange}
            maxLength={254}
            placeholder="tu@empresa.com" required className={inputBase} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-[10px] tracking-[0.15em] uppercase text-[var(--gray-mid)] mb-2 font-[family-name:var(--font-body)]">
            Teléfono
          </label>
          <input type="tel" name="phone" value={form.phone} onChange={handleChange}
            maxLength={40}
            placeholder="+593 999 000 000" className={inputBase} />
        </div>
        <div>
          <label className="block text-[10px] tracking-[0.15em] uppercase text-[var(--gray-mid)] mb-2 font-[family-name:var(--font-body)]">
            Servicio de interés
          </label>
          <select name="service" value={form.service} onChange={handleChange} className={inputBase}>
            <option value="">Selecciona un servicio...</option>
            {options.map((s) => <option key={s} value={s}>{s}</option>)}
            {(!serviceOptions || serviceOptions.length === 0) ? null : (
              <option value="Otro / No estoy seguro">Otro / No estoy seguro</option>
            )}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-[10px] tracking-[0.15em] uppercase text-[var(--gray-mid)] mb-2 font-[family-name:var(--font-body)]">
          Mensaje *
        </label>
        <textarea name="message" value={form.message} onChange={handleChange}
          placeholder="¿En qué podemos ayudarte? Cuéntanos sobre tu empresa y necesidades..."
          required minLength={10} maxLength={2000} rows={5} className={`${inputBase} resize-none`} />
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          type="text"
          name="website"
          value={form.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 text-red-600 text-[13px] font-[family-name:var(--font-body)]">
          <WarningCircle size={16} weight="duotone" /> {error}
        </div>
      )}

      <div className="flex flex-col gap-3">
        {turnstileSiteKey && (
          <div>
            <div ref={turnstileRef} className="min-h-[65px]" />
            {captchaError && (
              <p className="mt-2 text-[12px] text-red-600 font-[family-name:var(--font-body)]">
                {captchaError}
              </p>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="flex items-center justify-center gap-2.5 w-full px-6 py-4 bg-[var(--navy)] text-white text-[12px] font-medium tracking-[0.1em] uppercase border border-[var(--navy)] hover:bg-[var(--coral)] hover:border-[var(--coral)] transition-all duration-200 disabled:opacity-60 disabled:pointer-events-none font-[family-name:var(--font-body)]"
        >
          {status === 'loading'
            ? <><CircleNotch size={16} className="animate-spin" /> Enviando...</>
            : <><PaperPlaneTilt size={16} weight="duotone" /> Enviar mensaje</>}
        </button>
        <p className="text-[11px] text-[var(--gray-light)] text-center leading-relaxed font-[family-name:var(--font-body)]">
          Al enviar este formulario, usted acepta el procesamiento de sus datos conforme a nuestra{' '}
          <a href="/politica-de-privacidad" className="underline underline-offset-2 hover:text-[var(--coral)] transition-colors">
            Política de Privacidad
          </a>.
        </p>
      </div>
    </form>
  )
}
