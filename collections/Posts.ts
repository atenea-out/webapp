import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { editorOrAdmin, publishedOrEditor } from '@/lib/access'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Noticia', plural: 'Noticias' },
  admin: {
    useAsTitle: 'title',
    group: 'Contenido',
    defaultColumns: ['title', 'category', 'status', 'publishedAt'],
    preview: (doc) => `${process.env.NEXT_PUBLIC_SITE_URL}/noticias/${doc?.slug}`,
  },
  versions: {
    drafts: { autosave: { interval: 5000 } },
  },
  access: {
    create: editorOrAdmin,
    read: publishedOrEditor,
    update: editorOrAdmin,
    delete: editorOrAdmin,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug (URL)',
      required: true,
      unique: true,
      admin: { description: 'Se genera automáticamente. Ej: reforma-tributaria-2025' },
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
      name: 'excerpt',
      type: 'textarea',
      label: 'Resumen (también usado como meta description)',
      maxLength: 160,
      admin: { description: 'Máximo 160 caracteres para SEO óptimo' },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen principal',
    },
    {
      name: 'category',
      type: 'select',
      label: 'Categoría',
      options: [
        { label: 'Tributario', value: 'tributario' },
        { label: 'Laboral', value: 'laboral' },
        { label: 'Contable', value: 'contable' },
        { label: 'Financiero', value: 'financiero' },
        { label: 'Empresarial', value: 'empresarial' },
      ],
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Contenido',
      editor: lexicalEditor({}),
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'team',
      label: 'Autor',
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Fecha de publicación',
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      label: 'Estado',
      defaultValue: 'draft',
      options: [
        { label: 'Borrador', value: 'draft' },
        { label: 'Publicado', value: 'published' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
}
