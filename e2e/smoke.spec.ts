import { expect, test } from '@playwright/test'

const routes = ['/', '/contacto', '/servicios', '/industrias', '/nosotros', '/noticias', '/admin']

for (const route of routes) {
  test(`${route} responds`, async ({ page }) => {
    const response = await page.goto(route)

    expect(response?.ok()).toBe(true)
    await expect(page.locator('body')).not.toBeEmpty()
  })
}

test('contact form validates an invalid email without navigating away', async ({ page }) => {
  await page.goto('/contacto')

  await page.locator('input[name="name"]').fill('Ana Rojas')
  await page.locator('input[name="email"]').fill('bad-email')
  await page.locator('textarea[name="message"]').fill('Necesito asesoria para mi empresa.')
  await page.getByRole('button', { name: /enviar/i }).click()

  await expect(page.locator('input[name="email"]')).toBeFocused()
})
