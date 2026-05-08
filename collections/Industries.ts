import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { editorOrAdmin, publicRead } from '@/lib/access'

export const Industries: CollectionConfig = {
  slug: 'industries',
  labels: { singular: 'Industria', plural: 'Industrias' },
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
      label: 'Nombre de la industria',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
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
      name: 'icon',
      type: 'select',
      label: 'Ícono (Phosphor)',
      options: [
        { label: 'Farmacéutica / Matraz', value: 'Flask' },
        { label: 'Comercial / Carrito', value: 'ShoppingCart' },
        { label: 'Legal / Balanza', value: 'Scales' },
        { label: 'Educación / Birrete', value: 'GraduationCap' },
        { label: 'Otros / 3 puntos', value: 'DotsThreeCircle' },
      ],
    },
    {
      name: 'descriptionLong',
      type: 'textarea',
      label: 'Descripción larga (página /industrias)',
      admin: { description: 'Texto descriptivo que aparece en la sección completa' },
    },
    {
      name: 'descriptionShort',
      type: 'textarea',
      label: 'Descripción corta (home preview)',
      admin: { description: 'Texto corto para el panel interactivo del home' },
    },
    {
      name: 'services',
      type: 'array',
      label: 'Servicios especializados (bullets)',
      fields: [
        { name: 'text', type: 'text', required: true },
      ],
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Descripción (legacy / richText)',
      editor: lexicalEditor({}),
      admin: { description: 'Campo legado; se usa solo si descriptionLong está vacío' },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen (opcional)',
    },
    {
      name: 'order',
      type: 'number',
      label: 'Orden',
      defaultValue: 99,
      admin: { position: 'sidebar' },
    },
  ],
}
