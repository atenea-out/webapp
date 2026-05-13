import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { editorOrAdmin, publicRead } from '@/lib/access'

export const Team: CollectionConfig = {
  slug: 'team',
  labels: { singular: 'Miembro del equipo', plural: 'Equipo' },
  admin: {
    useAsTitle: 'name',
    group: 'Contenido',
  },
  access: {
    create: editorOrAdmin,
    read: publicRead,
    update: editorOrAdmin,
    delete: editorOrAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nombre completo',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
      label: 'Cargo',
      required: true,
    },
    {
      name: 'summary',
      type: 'textarea',
      label: 'Descripción corta',
      admin: {
        description: 'Texto breve para tarjetas de equipo en el landing.',
      },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Fotografía',
    },
    {
      name: 'bio',
      type: 'richText',
      label: 'Biografía',
      editor: lexicalEditor({}),
    },
    {
      name: 'isFounder',
      type: 'checkbox',
      label: 'Es fundador/a',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Marca solo a la persona que aparece como fundadora en /nosotros y en el home',
      },
    },
    {
      name: 'credentials',
      type: 'array',
      label: 'Credenciales (formación, títulos)',
      admin: { description: 'Bloques que aparecen en la página /nosotros' },
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'Ícono',
          options: [
            { label: 'Formación / Birrete', value: 'GraduationCap' },
            { label: 'Postgrado / Certificado', value: 'Certificate' },
            { label: 'Sistemas / Escritorio', value: 'Desktop' },
          ],
        },
        { name: 'label', type: 'text', required: true, label: 'Etiqueta (Formación, Postgrado...)' },
        { name: 'value', type: 'text', required: true, label: 'Valor principal' },
        { name: 'sub', type: 'text', label: 'Subtítulo / institución' },
      ],
    },
    {
      name: 'shortCredentials',
      type: 'array',
      label: 'Credenciales cortas (preview del home)',
      admin: { description: 'Chips simples que aparecen en la sección Fundadora del home' },
      fields: [
        { name: 'text', type: 'text', required: true },
      ],
    },
    {
      name: 'linkedin',
      type: 'text',
      label: 'URL LinkedIn',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
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
