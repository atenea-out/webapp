import { describe, expect, it } from 'vitest'
import { cleanMessage, cleanText, createContactEmail, getContactRecipients, validateContactPayload } from './contact'

describe('contact helpers', () => {
  it('normalizes text fields and strips control characters', () => {
    expect(cleanText('  Ana\u0000   Rojas  ', 20)).toBe('Ana Rojas')
    expect(cleanText('abcdef', 3)).toBe('abc')
  })

  it('keeps message line breaks and removes unsafe control characters', () => {
    expect(cleanMessage(' Hola\r\nmundo\u0000 ')).toBe('Hola\nmundo')
  })

  it('accepts valid contact payloads', () => {
    const result = validateContactPayload({
      name: 'Patricia',
      email: 'PATRICIA@example.com',
      phone: '+593 999 000 000',
      service: 'Legal e Impuestos',
      message: 'Necesito asesoría para mi empresa.',
    })

    expect(result.error).toBeUndefined()
    expect(result.data).toMatchObject({
      name: 'Patricia',
      email: 'patricia@example.com',
      phone: '+593 999 000 000',
      service: 'Legal e Impuestos',
    })
  })

  it('rejects missing required fields, invalid email, and short messages', () => {
    expect(validateContactPayload({ email: 'a@b.com', message: 'Mensaje valido' }).error).toBe(
      'Campos requeridos incompletos.',
    )
    expect(validateContactPayload({ name: 'Ana', email: 'bad', message: 'Mensaje valido' }).error).toBe(
      'Email inválido.',
    )
    expect(validateContactPayload({ name: 'Ana', email: 'ana@example.com', message: 'corto' }).error).toBe(
      'El mensaje debe tener al menos 10 caracteres.',
    )
  })

  it('flags honeypot submissions as bots', () => {
    expect(
      validateContactPayload({
        name: 'Bot',
        email: 'bot@example.com',
        message: 'Mensaje suficientemente largo.',
        website: 'https://spam.example',
      }).isBot,
    ).toBe(true)
  })

  it('escapes user content in html email but preserves plain text', () => {
    const email = createContactEmail(
      {
        name: '<Ana>',
        email: 'ana@example.com',
        phone: '',
        service: 'Legal',
        message: 'Hola <script>alert("x")</script>\nGracias',
      },
      'https://atenea-outsourcing.com',
    )

    expect(email.html).toContain('&lt;Ana&gt;')
    expect(email.html).toContain('&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;<br/>Gracias')
    expect(email.html).toContain('https://atenea-outsourcing.com/logo.png')
    expect(email.html).toContain('Atenea Outsourcing')
    expect(email.text).toContain('Hola <script>alert("x")</script>')
  })

  it('always includes required contact recipients and removes duplicates', () => {
    expect(getContactRecipients('INFO@ATENEA-OUTSOURCING.COM', 'ventas@example.com')).toEqual([
      'info@atenea-outsourcing.com',
      'patricia.rojas@atenea-outsourcing.com',
      'ventas@example.com',
    ])
  })
})
