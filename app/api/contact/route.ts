import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getSiteSettings } from '@/lib/queries'
import {
  CONTACT_RATE_LIMIT_MAX,
  CONTACT_RATE_LIMIT_WINDOW_MS,
  ContactPayload,
  MAX_CONTACT_BODY_BYTES,
  createContactEmail,
  getContactRecipients,
  validateContactPayload,
} from '@/lib/contact'

const rateLimit = new Map<string, { count: number; resetAt: number }>()

function getClientIp(req: NextRequest) {
  const forwarded = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  return forwarded || req.headers.get('x-real-ip') || 'unknown'
}

function checkRateLimit(key: string) {
  const now = Date.now()
  const current = rateLimit.get(key)

  if (!current || current.resetAt <= now) {
    rateLimit.set(key, { count: 1, resetAt: now + CONTACT_RATE_LIMIT_WINDOW_MS })
    return true
  }

  if (current.count >= CONTACT_RATE_LIMIT_MAX) return false
  current.count += 1
  return true
}

async function verifyTurnstile(token: string, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY
  const isRequired = process.env.NODE_ENV === 'production' || Boolean(secret)

  if (!isRequired) return true
  if (!secret || !token) return false

  const formData = new FormData()
  formData.append('secret', secret)
  formData.append('response', token)
  if (ip !== 'unknown') formData.append('remoteip', ip)

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) return false

  const result = (await response.json()) as { success?: boolean }
  return result.success === true
}

export async function POST(req: NextRequest) {
  try {
    if (req.headers.get('content-type')?.includes('application/json') !== true) {
      return NextResponse.json({ error: 'Formato de solicitud inválido.' }, { status: 415 })
    }

    const contentLength = Number(req.headers.get('content-length') || 0)
    if (contentLength > MAX_CONTACT_BODY_BYTES) {
      return NextResponse.json({ error: 'El mensaje es demasiado largo.' }, { status: 413 })
    }

    const clientIp = getClientIp(req)
    if (!checkRateLimit(clientIp)) {
      return NextResponse.json({ error: 'Demasiados intentos. Intenta de nuevo más tarde.' }, { status: 429 })
    }

    const payload = (await req.json()) as ContactPayload
    const validation = validateContactPayload(payload)

    if (validation.isBot) return NextResponse.json({ success: true })
    if (!validation.data) {
      return NextResponse.json({ error: validation.error || 'Solicitud inválida.' }, { status: 400 })
    }

    const isHuman = await verifyTurnstile(validation.data.turnstileToken, clientIp)
    if (!isHuman) {
      return NextResponse.json({ error: 'No pudimos validar la verificación de seguridad.' }, { status: 400 })
    }

    const resendApiKey = process.env.RESEND_API_KEY
    if (!resendApiKey) {
      return NextResponse.json({ error: 'El servicio de contacto no está configurado.' }, { status: 503 })
    }

    const resend = new Resend(resendApiKey)
    const { name, email, phone, service, message } = validation.data
    const settings = await getSiteSettings()
    const recipients = getContactRecipients(settings.email, settings.emailSecondary)
    const emailContent = createContactEmail(
      { name, email, phone, service, message },
      process.env.NEXT_PUBLIC_SITE_URL,
    )

    await resend.emails.send({
      from: 'Atenea CMS <noreply@atenea-outsourcing.com>',
      to: recipients,
      replyTo: email,
      subject: emailContent.subject,
      text: emailContent.text,
      html: emailContent.html,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Error al enviar el mensaje. Intenta nuevamente.' }, { status: 500 })
  }
}
