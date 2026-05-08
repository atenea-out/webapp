import type { GlobalConfig } from 'payload'
import { editorOrAdmin, publicRead } from '@/lib/access'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  access: {
    read: publicRead,
    update: editorOrAdmin,
  },
  label: 'Navegación',
  admin: {
    group: 'Configuración',
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Items del menú principal',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Etiqueta',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          label: 'URL',
          required: true,
        },
      ],
    },
    {
      name: 'ctaLabel',
      type: 'text',
      label: 'Texto del botón CTA',
      defaultValue: 'Contáctanos',
    },
    {
      name: 'ctaHref',
      type: 'text',
      label: 'URL del botón CTA',
      defaultValue: '/contacto',
    },
    {
      name: 'portalLabel',
      type: 'text',
      label: 'Texto botón Acceso Clientes',
      defaultValue: 'Acceso Clientes',
    },
    {
      name: 'portalHref',
      type: 'text',
      label: 'URL Acceso Clientes',
      defaultValue: '/portal',
    },
    {
      name: 'footerCompanyItems',
      type: 'array',
      label: 'Enlaces columna Empresa (footer)',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
      ],
    },
  ],
}
