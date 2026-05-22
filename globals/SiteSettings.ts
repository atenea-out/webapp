import type { GlobalConfig } from 'payload'
import { editorOrAdmin, publicRead } from '@/lib/access'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: publicRead,
    update: editorOrAdmin,
  },
  label: 'Configuración del sitio',
  admin: {
    group: 'Configuración',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'siteName',
              type: 'text',
              label: 'Nombre del sitio',
              defaultValue: 'Atenea Outsourcing',
            },
            {
              name: 'tagline',
              type: 'text',
              label: 'Tagline',
              defaultValue: 'Consultoría Contable & Financiera',
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              label: 'Logo',
            },
          ],
        },
        {
          label: 'Contacto',
          fields: [
            {
              name: 'phone',
              type: 'text',
              label: 'Teléfono',
              defaultValue: '(+593) 999 828 903',
            },
            {
              name: 'email',
              type: 'text',
              label: 'Email principal',
              defaultValue: 'info@atenea-outsourcing.com',
            },
            {
              name: 'emailSecondary',
              type: 'text',
              label: 'Email secundario',
              defaultValue: 'patricia.rojas@atenea-outsourcing.com',
            },
            {
              name: 'address',
              type: 'textarea',
              label: 'Dirección',
              defaultValue:
                'Alfonso Pereira E4-39 y Jorge Drom, Edificio de Oficinas Iñaquito II. Quito – Ecuador',
            },
            {
              name: 'whatsappNumber',
              type: 'text',
              label: 'Número WhatsApp (solo dígitos con código de país)',
              defaultValue: '593999828903',
              admin: { description: 'Sin + ni espacios. Ej: 593999828903' },
            },
          ],
        },
        {
          label: 'Redes sociales',
          fields: [
            {
              name: 'socialLinks',
              type: 'array',
              label: 'Redes sociales visibles',
              admin: {
                description:
                  'Agrega, ordena u oculta redes sociales sin tocar código. Si esta lista queda vacía, se usan Instagram y LinkedIn como respaldo.',
              },
              fields: [
                {
                  name: 'platform',
                  type: 'select',
                  label: 'Red social',
                  required: true,
                  options: [
                    { label: 'Instagram', value: 'instagram' },
                    { label: 'LinkedIn', value: 'linkedin' },
                    { label: 'Facebook', value: 'facebook' },
                    { label: 'YouTube', value: 'youtube' },
                    { label: 'TikTok', value: 'tiktok' },
                    { label: 'X / Twitter', value: 'x' },
                    { label: 'WhatsApp', value: 'whatsapp' },
                    { label: 'Sitio externo', value: 'website' },
                  ],
                },
                {
                  name: 'label',
                  type: 'text',
                  label: 'Etiqueta visible',
                  admin: { description: 'Opcional. Si queda vacía se usa el nombre de la red.' },
                },
                { name: 'url', type: 'text', label: 'URL', required: true },
                {
                  name: 'order',
                  type: 'number',
                  label: 'Orden',
                  defaultValue: 10,
                },
              ],
            },
            {
              name: 'instagram',
              type: 'text',
              label: 'Instagram URL',
              defaultValue: 'https://www.instagram.com/ateneaoutsourcing',
            },
            {
              name: 'linkedin',
              type: 'text',
              label: 'LinkedIn URL',
              defaultValue: 'https://www.linkedin.com/in/atenea-outsourcing-b0a850326/',
            },
          ],
        },
        {
          label: 'SEO Global',
          fields: [
            {
              name: 'metaDescription',
              type: 'textarea',
              label: 'Meta description por defecto',
              defaultValue:
                'Atenea Outsourcing — Firma especializada en contabilidad, finanzas y tributación con más de 20 años de trayectoria en Ecuador y Latinoamérica.',
              admin: { description: 'Máximo 160 caracteres' },
            },
            {
              name: 'ogImage',
              type: 'upload',
              relationTo: 'media',
              label: 'OG Image por defecto (1200x630px)',
            },
            {
              name: 'googleVerification',
              type: 'text',
              label: 'Google Search Console verification code',
            },
          ],
        },
        {
          label: 'Hero & Stats',
          fields: [
            {
              name: 'heroBadge',
              type: 'text',
              label: 'Badge superior del hero',
              defaultValue: 'Consultoría Contable & Financiera',
            },
            {
              name: 'heroTitle',
              type: 'text',
              label: 'Título del hero (con {highlight} para la palabra destacada)',
              defaultValue: 'Sabiduría frente a los {highlight} empresariales',
              admin: { description: 'Usa la variable {highlight} para marcar la palabra que irá en coral cursiva' },
            },
            {
              name: 'heroHighlight',
              type: 'text',
              label: 'Palabra destacada del título',
              defaultValue: 'desafíos',
            },
            {
              name: 'heroSubtitle',
              type: 'text',
              label: 'Subtítulo del hero',
              defaultValue:
                'En Atenea, simplificamos lo complejo para que tú te enfoques en crecer.',
            },
            {
              name: 'heroMediaMode',
              type: 'select',
              label: 'Fondo del hero',
              defaultValue: 'video',
              options: [
                { label: 'Video humano + overlay financiero', value: 'video' },
                { label: 'Imagen humana', value: 'image' },
                { label: 'Composición financiera abstracta', value: 'abstract' },
              ],
            },
            {
              name: 'heroVideoSrc',
              type: 'text',
              label: 'Hero video URL',
              defaultValue: '/assets/media/hero-atenea.mp4',
              admin: {
                description: 'Ej: /assets/media/hero-atenea.mp4. El video se reproduce sin audio.',
              },
            },
            {
              name: 'heroPosterSrc',
              type: 'text',
              label: 'Hero poster/fallback URL',
              defaultValue: '/assets/media/hero-atenea-poster.jpg',
              admin: {
                description: 'Imagen de respaldo para carga lenta o mobile. Ej: /assets/media/hero-atenea-poster.jpg',
              },
            },
            {
              name: 'heroBackgroundImageSrc',
              type: 'text',
              label: 'Hero imagen de fondo URL',
              admin: {
                description: 'Se usa cuando el modo del hero es Imagen humana.',
              },
            },
            {
              name: 'heroOverlayOpacity',
              type: 'number',
              label: 'Oscuridad del overlay del hero',
              defaultValue: 0.3,
              min: 0,
              max: 0.92,
              admin: {
                step: 0.01,
                description: '0 = sin oscurecer, 0.92 = muy oscuro. Recomendado: 0.28 a 0.38 para video.',
              },
            },
            {
              name: 'heroShowFinancialOverlay',
              type: 'checkbox',
              label: 'Mostrar gráfico financiero sutil sobre el video',
              defaultValue: true,
            },
            {
              name: 'heroCtaPrimaryLabel',
              type: 'text',
              label: 'Botón primario — texto',
              defaultValue: 'Nuestros Servicios',
            },
            {
              name: 'heroCtaPrimaryHref',
              type: 'text',
              label: 'Botón primario — URL',
              defaultValue: '/servicios',
            },
            {
              name: 'heroCtaSecondaryLabel',
              type: 'text',
              label: 'Botón secundario — texto',
              defaultValue: 'Contáctanos',
            },
            {
              name: 'heroCtaSecondaryHref',
              type: 'text',
              label: 'Botón secundario — URL',
              defaultValue: '/contacto',
            },
            {
              name: 'heroEspecialidades',
              type: 'array',
              label: 'Especialidades (panel lateral derecho)',
              fields: [
                { name: 'text', type: 'text', required: true },
              ],
            },
            {
              name: 'heroCredits',
              type: 'array',
              label: 'Credenciales (chips bajo especialidades)',
              fields: [
                { name: 'text', type: 'text', required: true },
              ],
            },
            {
              name: 'stats',
              type: 'array',
              label: 'Estadísticas',
              maxRows: 4,
              fields: [
                { name: 'value', type: 'text', label: 'Valor (ej: +20)' },
                { name: 'label', type: 'text', label: 'Etiqueta (ej: Años de experiencia)' },
                { name: 'detail', type: 'text', label: 'Detalle (ej: Fundada en 2003)' },
              ],
            },
          ],
        },
        {
          label: 'Home — Valores & Razones',
          fields: [
            {
              name: 'quienesSomosText',
              type: 'textarea',
              label: 'Texto sección ¿Quiénes somos? (home)',
              defaultValue:
                'Firma especializada en soluciones integrales de contabilidad, finanzas y tributación con más de dos décadas de trayectoria.',
            },
            {
              name: 'valores',
              type: 'array',
              label: 'Valores (sección ¿Quiénes somos? del home)',
              maxRows: 4,
              fields: [
                { name: 'title', type: 'text', required: true, label: 'Título' },
                { name: 'description', type: 'textarea', required: true, label: 'Descripción' },
                { name: 'image', type: 'upload', relationTo: 'media', label: 'Imagen' },
                {
                  name: 'imageUrl',
                  type: 'text',
                  label: 'URL externa de imagen (fallback)',
                  admin: { description: 'Si no subes imagen, se usa esta URL' },
                },
              ],
            },
            {
              name: 'razonesTitle',
              type: 'text',
              label: 'Título sección Razones',
              defaultValue: 'Permítenos formar parte del crecimiento de tu empresa',
            },
            {
              name: 'razones',
              type: 'array',
              label: 'Razones (sección Nuestra diferencia)',
              fields: [
                {
                  name: 'icon',
                  type: 'select',
                  label: 'Ícono',
                  options: [
                    { label: 'Flexibilidad / ArrowsLeftRight', value: 'ArrowsLeftRight' },
                    { label: 'Oportunidad / Clock', value: 'Clock' },
                    { label: 'Soluciones / Lightbulb', value: 'Lightbulb' },
                    { label: 'Confidencialidad / Lock', value: 'Lock' },
                    { label: 'Compromiso / Handshake', value: 'Handshake' },
                  ],
                },
                { name: 'title', type: 'text', required: true, label: 'Título' },
                { name: 'description', type: 'textarea', required: true, label: 'Descripción' },
              ],
            },
          ],
        },
        {
          label: 'Home — Equipo',
          fields: [
            {
              name: 'teamSectionMode',
              type: 'select',
              label: 'Modo de la sección de equipo',
              defaultValue: 'team',
              options: [
                { label: 'Fundadora destacada', value: 'founder' },
                { label: 'Conoce nuestro equipo', value: 'team' },
              ],
            },
            {
              name: 'teamSectionEyebrow',
              type: 'text',
              label: 'Eyebrow de la sección',
              defaultValue: 'Equipo Atenea',
            },
            {
              name: 'teamSectionTitle',
              type: 'text',
              label: 'Título de la sección',
              defaultValue: 'Especialistas con criterio y cercanía.',
            },
            {
              name: 'teamSectionDescription',
              type: 'textarea',
              label: 'Descripción de la sección',
              defaultValue:
                'Un equipo contable, tributario y financiero que acompaña cada decisión con rigor técnico, confidencialidad y trato humano.',
            },
            {
              name: 'fundadoraBioShort',
              type: 'array',
              label: 'Bio corta (home) — párrafos',
              admin: { description: 'Párrafos usados cuando el home muestra a la fundadora destacada.' },
              fields: [
                { name: 'text', type: 'textarea', required: true },
              ],
            },
          ],
        },
        {
          label: 'Nosotros',
          fields: [
            {
              name: 'nosotrosMissionTitle',
              type: 'text',
              label: 'Título de la misión',
              defaultValue: 'Simplicidad al servicio de tu crecimiento',
            },
            {
              name: 'nosotrosMissionParagraphs',
              type: 'array',
              label: 'Párrafos de la misión',
              fields: [
                { name: 'text', type: 'textarea', required: true },
              ],
            },
            {
              name: 'nosotrosValores',
              type: 'array',
              label: 'Valores (cards cortos /nosotros)',
              maxRows: 4,
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'desc', type: 'textarea', required: true, label: 'Descripción' },
              ],
            },
            {
              name: 'fundadoraBioLong',
              type: 'array',
              label: 'Bio larga (página /nosotros) — párrafos',
              fields: [
                { name: 'text', type: 'textarea', required: true },
              ],
            },
          ],
        },
        {
          label: 'Páginas interiores',
          fields: [
            { name: 'servicesPageEyebrow', type: 'text', label: 'Servicios - eyebrow', defaultValue: 'Lo que ofrecemos' },
            { name: 'servicesPageTitle', type: 'text', label: 'Servicios - título', defaultValue: 'Nuestros Servicios' },
            {
              name: 'servicesPageDescription',
              type: 'textarea',
              label: 'Servicios - descripción',
              defaultValue: 'Soluciones integrales en contabilidad, finanzas y cumplimiento tributario, diseñadas para agregar valor real a tu empresa.',
            },
            { name: 'servicesCardLinkLabel', type: 'text', label: 'Servicios - texto ver detalle', defaultValue: 'Ver detalle' },
            { name: 'servicesCtaTitle', type: 'text', label: 'Servicios CTA - título', defaultValue: '¿No estás seguro qué servicio necesitas?' },
            { name: 'servicesCtaDescription', type: 'text', label: 'Servicios CTA - descripción', defaultValue: 'Contáctanos y te orientamos sin compromiso.' },
            { name: 'servicesCtaLabel', type: 'text', label: 'Servicios CTA - botón', defaultValue: 'Hablar con un experto' },
            { name: 'servicesCtaHref', type: 'text', label: 'Servicios CTA - URL', defaultValue: '/contacto' },

            { name: 'serviceDetailBackLabel', type: 'text', label: 'Detalle servicio - volver', defaultValue: 'Todos los servicios' },
            { name: 'serviceDetailIncludesTitle', type: 'text', label: 'Detalle servicio - título contenido', defaultValue: '¿Qué incluye este servicio?' },
            { name: 'serviceDetailCtaTitle', type: 'text', label: 'Detalle servicio CTA - título', defaultValue: '¿Te interesa este servicio?' },
            { name: 'serviceDetailCtaDescription', type: 'textarea', label: 'Detalle servicio CTA - descripción', defaultValue: 'Contáctanos y un experto te orientará sobre la mejor solución para tu empresa.' },
            { name: 'serviceDetailCtaLabel', type: 'text', label: 'Detalle servicio CTA - botón', defaultValue: 'Solicitar información' },
            { name: 'serviceDetailPhoneLabel', type: 'text', label: 'Detalle servicio - teléfono label', defaultValue: 'Llámanos' },
            { name: 'serviceDetailMoreLabel', type: 'text', label: 'Detalle servicio - también ofrecemos', defaultValue: 'También ofrecemos' },
            { name: 'serviceDetailMoreLinkLabel', type: 'text', label: 'Detalle servicio - ver todos', defaultValue: 'Ver todos los servicios' },

            { name: 'industriesPageEyebrow', type: 'text', label: 'Industrias - eyebrow', defaultValue: 'Sectores' },
            { name: 'industriesPageTitle', type: 'text', label: 'Industrias - título', defaultValue: 'Experiencia en Industrias' },
            { name: 'industriesPageDescription', type: 'textarea', label: 'Industrias - descripción', defaultValue: 'Profesionales altamente especializados que ofrecen soluciones en múltiples sectores económicos de Ecuador y Latinoamérica.' },
            { name: 'industriesCtaEyebrow', type: 'text', label: 'Industrias CTA - eyebrow', defaultValue: '¿Tu sector?' },
            { name: 'industriesCtaTitle', type: 'text', label: 'Industrias CTA - título', defaultValue: '¿Tu industria no está en la lista?' },
            { name: 'industriesCtaDescription', type: 'textarea', label: 'Industrias CTA - descripción', defaultValue: 'Trabajamos con cualquier sector empresarial. Contáctanos y diseñamos la solución correcta para ti.' },
            { name: 'industriesCtaLabel', type: 'text', label: 'Industrias CTA - botón', defaultValue: 'Hablemos' },
            { name: 'industriesCtaHref', type: 'text', label: 'Industrias CTA - URL', defaultValue: '/contacto' },

            { name: 'newsPageEyebrow', type: 'text', label: 'Noticias - eyebrow', defaultValue: 'Actualidad' },
            { name: 'newsPageTitle', type: 'text', label: 'Noticias - título', defaultValue: 'Noticias y Artículos' },
            { name: 'newsPageDescription', type: 'textarea', label: 'Noticias - descripción', defaultValue: 'Análisis, guías y novedades sobre el entorno tributario, contable y financiero en Ecuador y Latinoamérica.' },
            { name: 'newsEmptyTitle', type: 'text', label: 'Noticias vacío - título', defaultValue: 'Noticias' },
            { name: 'newsEmptyText', type: 'text', label: 'Noticias vacío - texto', defaultValue: 'Aún no hay noticias publicadas. Vuelve pronto.' },
            { name: 'newsReadLabel', type: 'text', label: 'Noticias - leer destacado', defaultValue: 'Leer artículo' },
            { name: 'newsReadMoreLabel', type: 'text', label: 'Noticias - leer tarjetas', defaultValue: 'Leer más' },
            { name: 'newsDetailBackLabel', type: 'text', label: 'Detalle noticia - volver', defaultValue: 'Todas las noticias' },
            { name: 'newsDetailCtaTitle', type: 'text', label: 'Detalle noticia CTA - título', defaultValue: '¿Necesitas asesoría?' },
            { name: 'newsDetailCtaDescription', type: 'textarea', label: 'Detalle noticia CTA - descripción', defaultValue: 'Nuestro equipo puede orientarte sobre cómo estos cambios afectan a tu empresa específicamente.' },
            { name: 'newsDetailCtaLabel', type: 'text', label: 'Detalle noticia CTA - botón', defaultValue: 'Consultar ahora' },
            { name: 'newsDetailContactLabel', type: 'text', label: 'Detalle noticia - contacto directo', defaultValue: 'Contacto directo' },
            { name: 'newsDetailMoreLabel', type: 'text', label: 'Detalle noticia - más artículos', defaultValue: 'Ver más artículos' },
            { name: 'newsDetailBackToListLabel', type: 'text', label: 'Detalle noticia - volver listado', defaultValue: 'Volver al listado de noticias' },

            { name: 'contactPageEyebrow', type: 'text', label: 'Contacto - eyebrow', defaultValue: 'Ponte en contacto' },
            { name: 'contactPageTitle', type: 'text', label: 'Contacto - título', defaultValue: 'Contáctanos' },
            { name: 'contactPageDescription', type: 'textarea', label: 'Contacto - descripción', defaultValue: 'Estamos aquí para responder tus preguntas y escuchar tus necesidades. Escríbenos o llámanos.' },
            { name: 'contactInfoTitle', type: 'text', label: 'Contacto - información título', defaultValue: 'Información de contacto' },
            { name: 'contactAddressLabel', type: 'text', label: 'Contacto - dirección label', defaultValue: 'Dirección' },
            { name: 'contactPhoneLabel', type: 'text', label: 'Contacto - teléfono label', defaultValue: 'Teléfono' },
            { name: 'contactEmailLabel', type: 'text', label: 'Contacto - correo label', defaultValue: 'Correo' },
            { name: 'contactSocialLabel', type: 'text', label: 'Contacto - redes label', defaultValue: 'Redes sociales' },
            { name: 'contactFormTitle', type: 'text', label: 'Contacto - formulario título', defaultValue: 'Envíanos un mensaje' },

            { name: 'privacyEyebrow', type: 'text', label: 'Privacidad - eyebrow', defaultValue: 'Legal' },
            { name: 'privacyTitle', type: 'text', label: 'Privacidad - título', defaultValue: 'Política de Privacidad' },
            { name: 'privacyIntro', type: 'textarea', label: 'Privacidad - intro', defaultValue: 'En Atenea Outsourcing, nos comprometemos a proteger la privacidad de los datos personales que nos confían.' },
            {
              name: 'privacySections',
              type: 'array',
              label: 'Privacidad - secciones',
              fields: [
                { name: 'title', type: 'text', required: true, label: 'Título' },
                { name: 'text', type: 'textarea', required: true, label: 'Texto' },
              ],
            },
            { name: 'privacyUpdatedAtLabel', type: 'text', label: 'Privacidad - última actualización', defaultValue: 'Última actualización: abril 2025' },
          ],
        },
        {
          label: 'Footer',
          fields: [
            {
              name: 'footerDescription',
              type: 'textarea',
              label: 'Descripción bajo el logo',
              defaultValue: 'Simplificamos lo complejo para que tú te enfoques en crecer.',
            },
            {
              name: 'footerPreCtaEyebrow',
              type: 'text',
              label: 'Eyebrow pre-footer',
              defaultValue: 'Empieza hoy',
            },
            {
              name: 'footerPreCtaTitle',
              type: 'textarea',
              label: 'Título pre-footer (acepta \\n para salto)',
              defaultValue: '¿Listo para simplificar\ntu contabilidad?',
            },
            {
              name: 'footerPreCtaLabel',
              type: 'text',
              label: 'Texto botón pre-footer',
              defaultValue: 'Hablar con un experto',
            },
          ],
        },
      ],
    },
  ],
}
