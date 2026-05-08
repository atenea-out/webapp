import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { editorOrAdmin, publicRead } from '@/lib/access'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: { singular: 'Servicio', plural: 'Servicios' },
  admin: {
    useAsTitle: 'title',
    group: 'Contenido',
    defaultColumns: ['title', 'order'],
  },
  access: {
    create: editorOrAdmin,
    read: publicRead,
    update: editorOrAdmin,
    delete: editorOrAdmin,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Nombre del servicio',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug (URL)',
      required: true,
      unique: true,
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.title) {
              return data.title
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .trim()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'number',
      type: 'text',
      label: 'Número (ej: 01)',
      admin: { description: 'Número decorativo que aparece en la tarjeta' },
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      label: 'Descripción corta (para cards en landing)',
      required: true,
    },
    {
      name: 'fullDescription',
      type: 'richText',
      label: 'Descripción completa (página individual)',
      editor: lexicalEditor({}),
    },
    {
      name: 'icon',
      type: 'select',
      label: 'Ícono (Phosphor)',
      options: [
        { label: 'Contabilidad / Libro', value: 'BookOpen' },
        { label: 'Nómina / Personas', value: 'Users' },
        { label: 'Tesorería / Moneda', value: 'CurrencyDollar' },
        { label: 'Administrativo / Maletín', value: 'Briefcase' },
        { label: 'Auditoría / Lupa', value: 'MagnifyingGlass' },
        { label: 'Legal / Balanza', value: 'Scales' },
      ],
    },
    {
      name: 'bullets',
      type: 'array',
      label: 'Qué incluye (lista de bullets página detalle)',
      admin: { description: 'Bullets que se muestran en la página de detalle del servicio' },
      fields: [
        { name: 'text', type: 'text', required: true },
      ],
    },
    {
      name: 'order',
      type: 'number',
      label: 'Orden de aparición',
      defaultValue: 99,
      admin: { position: 'sidebar' },
    },
  ],
}
