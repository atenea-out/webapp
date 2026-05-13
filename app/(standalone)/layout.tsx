import { DM_Sans, Playfair_Display } from 'next/font/google'
import type { Metadata } from 'next'
import '../globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Portal de Clientes — Atenea Outsourcing',
  description: 'Acceso seguro para clientes de Atenea Outsourcing.',
  icons: {
    icon: [{ url: '/assets/media/images/favicon.png', type: 'image/png' }],
    shortcut: '/assets/media/images/favicon.png',
    apple: '/assets/media/images/favicon.png',
  },
}

export default function StandaloneLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${playfair.variable} ${dmSans.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
