import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import '../globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { getSiteSettings, getNavigation } from '@/lib/queries'

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
  title: {
    default: 'Atenea Outsourcing | Consultoría Contable y Financiera',
    template: '%s — Atenea Outsourcing',
  },
  description:
    'Firma especializada en contabilidad, finanzas y tributación con más de 20 años de trayectoria en Ecuador y Latinoamérica.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://atenea-outsourcing.com'),
  openGraph: {
    type: 'website',
    locale: 'es_EC',
    siteName: 'Atenea Outsourcing',
  },
  icons: {
    icon: [
      {
        url: '/media/images/favicon.png',
        type: 'image/png',
      },
    ],
    shortcut: '/media/images/favicon.png',
    apple: '/media/images/favicon.png',
  },
  robots: { index: true, follow: true },
}

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, nav] = await Promise.all([getSiteSettings(), getNavigation()])
  return (
    <html lang="es" className={`${playfair.variable} ${dmSans.variable}`}>
      <body suppressHydrationWarning>
        <Navbar
          items={nav.items}
          ctaLabel={nav.ctaLabel}
          ctaHref={nav.ctaHref}
          portalLabel={nav.portalLabel}
          portalHref={nav.portalHref}
        />
        <main className="pt-[76px]">{children}</main>
        <Footer />
        <WhatsAppButton number={settings.whatsappNumber} />
      </body>
    </html>
  )
}
