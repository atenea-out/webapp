import type { Metadata } from 'next'
import { getSiteSettings } from '@/lib/queries'
import { settingText } from '@/lib/settings-text'

export const metadata: Metadata = {
  title: 'Politica de Privacidad',
  description: 'Politica de privacidad y tratamiento de datos personales de Atenea Outsourcing.',
  robots: { index: false },
}

const defaultSections = [
  {
    title: 'Datos que recopilamos',
    text: 'Al utilizar nuestro formulario de contacto, recopilamos: nombre completo, direccion de correo electronico, numero de telefono opcional y el contenido del mensaje enviado.',
  },
  {
    title: 'Finalidad del tratamiento',
    text: 'Los datos recopilados se utilizan exclusivamente para responder a su consulta y, con su consentimiento, para enviarle informacion relevante sobre nuestros servicios.',
  },
  {
    title: 'Conservacion de datos',
    text: 'Sus datos seran conservados durante el tiempo necesario para cumplir con la finalidad para la que fueron recopilados, o conforme a lo exigido por la legislacion ecuatoriana vigente.',
  },
  {
    title: 'Derechos del titular',
    text: 'Usted tiene derecho a acceder, rectificar, cancelar y oponerse al tratamiento de sus datos personales en cualquier momento, escribiendonos al correo principal del sitio.',
  },
  {
    title: 'Seguridad',
    text: 'Aplicamos medidas tecnicas y organizativas adecuadas para proteger sus datos contra accesos no autorizados, perdidas o alteraciones.',
  },
]

type PrivacySection = {
  title?: string | null
  text?: string | null
}

function getPrivacySections(settings: unknown): PrivacySection[] {
  const sections = (settings as { privacySections?: PrivacySection[] | null }).privacySections
  return sections && sections.length > 0 ? sections : defaultSections
}

export default async function PoliticaPrivacidadPage() {
  const settings = await getSiteSettings()
  const sections = getPrivacySections(settings)

  return (
    <section className="py-20 px-6 md:px-[60px] bg-[var(--cream-light)]">
      <div className="max-w-[780px] mx-auto">
        <span className="section-tag">{settingText(settings, 'privacyEyebrow', 'Legal')}</span>
        <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(28px,3.5vw,42px)] font-medium text-[var(--dark)] mt-1 mb-4">
          {settingText(settings, 'privacyTitle', 'Politica de Privacidad')}
        </h1>
        <div className="divider" />
        <div className="prose-atenea space-y-6">
          <p>{settingText(settings, 'privacyIntro', 'En Atenea Outsourcing, nos comprometemos a proteger la privacidad de los datos personales que nos confian.')}</p>
          {sections.map((section, index) => (
            <div key={`${section.title ?? 'section'}-${index}`} className="space-y-3">
              {section.title && <h2>{section.title}</h2>}
              {section.text && <p>{section.text}</p>}
            </div>
          ))}
          <p className="text-[13px] text-[var(--gray-light)]">
            {settingText(settings, 'privacyUpdatedAtLabel', 'Ultima actualizacion: abril 2025')}
          </p>
        </div>
      </div>
    </section>
  )
}
