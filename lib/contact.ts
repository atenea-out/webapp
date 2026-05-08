export const MAX_CONTACT_BODY_BYTES = 8_192
export const CONTACT_RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
export const CONTACT_RATE_LIMIT_MAX = 5

export type ContactPayload = {
  name?: unknown
  email?: unknown
  phone?: unknown
  service?: unknown
  message?: unknown
  website?: unknown
}

export type ContactData = {
  name: string
  email: string
  phone: string
  service: string
  message: string
}

export type ContactValidation = {
  data?: ContactData
  error?: string
  isBot?: boolean
}

export function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== 'string') return ''
  return value.replace(/[\u0000-\u001F\u007F]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, maxLength)
}

export function cleanMessage(value: unknown) {
  if (typeof value !== 'string') return ''
  return value
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim()
    .slice(0, 2_000)
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function validateContactPayload(payload: ContactPayload): ContactValidation {
  if (cleanText(payload.website, 200)) return { isBot: true }

  const data = {
    name: cleanText(payload.name, 100),
    email: cleanText(payload.email, 254).toLowerCase(),
    phone: cleanText(payload.phone, 40),
    service: cleanText(payload.service, 120),
    message: cleanMessage(payload.message),
  }

  if (!data.name || !data.email || !data.message) {
    return { error: 'Campos requeridos incompletos.' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(data.email)) {
    return { error: 'Email invalido.' }
  }

  if (data.message.length < 10) {
    return { error: 'El mensaje debe tener al menos 10 caracteres.' }
  }

  return { data }
}

export function createContactEmail(data: ContactData) {
  const safeName = escapeHtml(data.name)
  const safeEmail = escapeHtml(data.email)
  const safePhone = escapeHtml(data.phone)
  const safeService = escapeHtml(data.service)
  const safeMessage = escapeHtml(data.message).replace(/\n/g, '<br/>')

  return {
    subject: `Nuevo contacto: ${data.name.slice(0, 80)}`,
    text: [
      'Nuevo mensaje de contacto',
      `Nombre: ${data.name}`,
      `Email: ${data.email}`,
      data.phone ? `Telefono: ${data.phone}` : '',
      data.service ? `Servicio: ${data.service}` : '',
      '',
      data.message,
    ]
      .filter(Boolean)
      .join('\n'),
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #1a1a18;">
        <div style="border-top: 3px solid #b8986a; padding-top: 24px; margin-bottom: 32px;">
          <h2 style="font-size: 22px; margin: 0 0 4px;">Nuevo mensaje de contacto</h2>
          <p style="color: #8a8a82; font-family: sans-serif; font-size: 13px; margin: 0;">Atenea Outsourcing - Formulario web</p>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #ebe6e2; font-family: sans-serif; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #8a8a82; width: 120px;">Nombre</td><td style="padding: 10px 0; border-bottom: 1px solid #ebe6e2; font-size: 15px;">${safeName}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #ebe6e2; font-family: sans-serif; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #8a8a82;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #ebe6e2; font-size: 15px;"><a href="mailto:${safeEmail}" style="color: #b8986a;">${safeEmail}</a></td></tr>
          ${data.phone ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #ebe6e2; font-family: sans-serif; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #8a8a82;">Telefono</td><td style="padding: 10px 0; border-bottom: 1px solid #ebe6e2; font-size: 15px;">${safePhone}</td></tr>` : ''}
          ${data.service ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #ebe6e2; font-family: sans-serif; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #8a8a82;">Servicio</td><td style="padding: 10px 0; border-bottom: 1px solid #ebe6e2; font-size: 15px;">${safeService}</td></tr>` : ''}
        </table>
        <div style="margin-top: 24px;">
          <p style="font-family: sans-serif; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #8a8a82; margin-bottom: 8px;">Mensaje</p>
          <p style="font-size: 15px; line-height: 1.75; background: #f5f1ee; padding: 16px; border-left: 3px solid #b8986a;">${safeMessage}</p>
        </div>
        <p style="margin-top: 32px; font-family: sans-serif; font-size: 12px; color: #8a8a82;">(c) ${new Date().getFullYear()} Atenea Outsourcing</p>
      </div>
    `,
  }
}
