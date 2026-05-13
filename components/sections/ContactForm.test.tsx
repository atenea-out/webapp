import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ContactForm } from './ContactForm'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('ContactForm', () => {
  it('renders a hidden honeypot field and client-side length limits', () => {
    const { container } = render(<ContactForm serviceOptions={['Legal']} />)

    const website = container.querySelector<HTMLInputElement>('input[name="website"]')
    const name = container.querySelector<HTMLInputElement>('input[name="name"]')
    const email = container.querySelector<HTMLInputElement>('input[name="email"]')
    const message = container.querySelector<HTMLTextAreaElement>('textarea[name="message"]')

    expect(website).toBeInTheDocument()
    expect(website).toHaveAttribute('tabIndex', '-1')
    expect(name).toHaveAttribute('maxLength', '100')
    expect(email).toHaveAttribute('maxLength', '254')
    expect(message).toHaveAttribute('minLength', '10')
    expect(message).toHaveAttribute('maxLength', '2000')
  })

  it('submits the current form data to the contact endpoint', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    })
    vi.stubGlobal('fetch', fetchMock)

    const user = userEvent.setup()
    const { container } = render(<ContactForm serviceOptions={['Legal']} />)

    await user.type(container.querySelector<HTMLInputElement>('input[name="name"]')!, 'Ana Rojas')
    await user.type(container.querySelector<HTMLInputElement>('input[name="email"]')!, 'ana@example.com')
    await user.selectOptions(container.querySelector<HTMLSelectElement>('select[name="service"]')!, 'Legal')
    await user.type(container.querySelector<HTMLTextAreaElement>('textarea[name="message"]')!, 'Necesito asesoría.')
    await user.click(screen.getByRole('button', { name: /enviar/i }))

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1))
    const [, options] = fetchMock.mock.calls[0]

    expect(fetchMock).toHaveBeenCalledWith('/api/contact', expect.objectContaining({ method: 'POST' }))
    expect(JSON.parse(options.body)).toMatchObject({
      name: 'Ana Rojas',
      email: 'ana@example.com',
      service: 'Legal',
      message: 'Necesito asesoría.',
      website: '',
    })
  })

  it('shows server-side validation errors', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({ error: 'Email inválido.' }),
      }),
    )

    const user = userEvent.setup()
    const { container } = render(<ContactForm />)

    await user.type(container.querySelector<HTMLInputElement>('input[name="name"]')!, 'Ana')
    await user.type(container.querySelector<HTMLInputElement>('input[name="email"]')!, 'bad@example.com')
    await user.type(container.querySelector<HTMLTextAreaElement>('textarea[name="message"]')!, 'Mensaje valido.')
    await user.click(screen.getByRole('button', { name: /enviar/i }))

    expect(await screen.findByText('Email inválido.')).toBeInTheDocument()
  })
})
