export const MAX_CONTACT_BODY_BYTES = 8_192
export const CONTACT_RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
export const CONTACT_RATE_LIMIT_MAX = 5
export const REQUIRED_CONTACT_RECIPIENTS = [
  'info@atenea-outsourcing.com',
  'patricia.rojas@atenea-outsourcing.com',
]

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

export function getContactRecipients(...emails: Array<string | null | undefined>) {
  return Array.from(
    new Set(
      [...REQUIRED_CONTACT_RECIPIENTS, ...emails]
        .map((email) => cleanText(email, 254).toLowerCase())
        .filter((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)),
    ),
  )
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
    return { error: 'Email inválido.' }
  }

  if (data.message.length < 10) {
    return { error: 'El mensaje debe tener al menos 10 caracteres.' }
  }

  return { data }
}

export function createContactEmail(data: ContactData, siteUrl = process.env.NEXT_PUBLIC_SITE_URL) {
  const safeName = escapeHtml(data.name)
  const safeEmail = escapeHtml(data.email)
  const safePhone = escapeHtml(data.phone)
  const safeService = escapeHtml(data.service)
  const safeMessage = escapeHtml(data.message).replace(/\n/g, '<br/>')
  const baseUrl = siteUrl?.replace(/\/$/, '') || 'https://atenea-outsourcing.com'
  const logoUrl = `${baseUrl}/logo.png`

  return {
    subject: `Nuevo contacto: ${data.name.slice(0, 80)}`,
    text: [
      'Nuevo mensaje de contacto',
      `Nombre: ${data.name}`,
      `Email: ${data.email}`,
      data.phone ? `Teléfono: ${data.phone}` : '',
      data.service ? `Servicio: ${data.service}` : '',
      '',
      data.message,
    ]
      .filter(Boolean)
      .join('\n'),
    html: `
      <div style="margin:0; padding:0; background:#f0f5fa;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f0f5fa; padding:32px 16px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px; background:#ffffff; border:1px solid #d8e2eb; border-collapse:collapse;">
                <tr>
                  <td style="background:#023044; padding:28px 32px; border-bottom:3px solid #ef625e;">
                    <img src="${logoUrl}" width="150" alt="Atenea Outsourcing" style="display:block; width:150px; height:auto; margin:0 0 28px;" />
                    <p style="margin:0 0 10px; font-family:Arial, sans-serif; font-size:11px; line-height:1.4; letter-spacing:0.18em; text-transform:uppercase; color:#ef625e;">Formulario web</p>
                    <h1 style="margin:0; font-family:Georgia, 'Times New Roman', serif; font-size:30px; line-height:1.15; font-weight:500; color:#ebe6e2;">Nuevo mensaje de contacto</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding:30px 32px 10px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                      <tr>
                        <td style="padding:14px 0; border-bottom:1px solid #d8e2eb; font-family:Arial, sans-serif; font-size:11px; text-transform:uppercase; letter-spacing:0.12em; color:#64748b; width:132px;">Nombre</td>
                        <td style="padding:14px 0; border-bottom:1px solid #d8e2eb; font-family:Arial, sans-serif; font-size:15px; color:#023044;">${safeName}</td>
                      </tr>
                      <tr>
                        <td style="padding:14px 0; border-bottom:1px solid #d8e2eb; font-family:Arial, sans-serif; font-size:11px; text-transform:uppercase; letter-spacing:0.12em; color:#64748b;">Email</td>
                        <td style="padding:14px 0; border-bottom:1px solid #d8e2eb; font-family:Arial, sans-serif; font-size:15px;"><a href="mailto:${safeEmail}" style="color:#ef625e; text-decoration:none;">${safeEmail}</a></td>
                      </tr>
                      ${data.phone ? `<tr><td style="padding:14px 0; border-bottom:1px solid #d8e2eb; font-family:Arial, sans-serif; font-size:11px; text-transform:uppercase; letter-spacing:0.12em; color:#64748b;">Teléfono</td><td style="padding:14px 0; border-bottom:1px solid #d8e2eb; font-family:Arial, sans-serif; font-size:15px; color:#023044;">${safePhone}</td></tr>` : ''}
                      ${data.service ? `<tr><td style="padding:14px 0; border-bottom:1px solid #d8e2eb; font-family:Arial, sans-serif; font-size:11px; text-transform:uppercase; letter-spacing:0.12em; color:#64748b;">Servicio</td><td style="padding:14px 0; border-bottom:1px solid #d8e2eb; font-family:Arial, sans-serif; font-size:15px; color:#023044;">${safeService}</td></tr>` : ''}
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:18px 32px 34px;">
                    <p style="margin:0 0 10px; font-family:Arial, sans-serif; font-size:11px; text-transform:uppercase; letter-spacing:0.12em; color:#64748b;">Mensaje</p>
                    <div style="font-family:Georgia, 'Times New Roman', serif; font-size:17px; line-height:1.75; color:#023044; background:#f8fbfd; border-left:3px solid #ef625e; padding:18px 20px;">${safeMessage}</div>
                    <p style="margin:28px 0 0; font-family:Arial, sans-serif; font-size:12px; line-height:1.6; color:#64748b;">Este correo fue generado automáticamente desde el sitio web de Atenea Outsourcing.</p>
                  </td>
                </tr>
              </table>
              <p style="margin:16px 0 0; font-family:Arial, sans-serif; font-size:11px; color:#94a3b8;">© ${new Date().getFullYear()} Atenea Outsourcing</p>
            </td>
          </tr>
        </table>
      </div>
    `,
  }
}
