import type { CollectionConfig } from 'payload'
import { editorOrAdmin, publicRead } from '@/lib/access'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Medio', plural: 'Medios' },
  hooks: {
    beforeValidate: [
      ({ data, req }) => {
        if (data && !data.alt) {
          data.alt = req.file?.name || data.filename || 'Imagen Atenea Outsourcing'
        }

        return data
      },
    ],
  },
  access: {
    create: editorOrAdmin,
    read: publicRead,
    update: editorOrAdmin,
    delete: editorOrAdmin,
  },
  admin: {
    group: 'Contenido',
  },
  upload: {
    staticDir: 'public/media',
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 800, height: 600, position: 'centre' },
      { name: 'hero', width: 1600, height: 900, position: 'centre' },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Texto alternativo (SEO)',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Caption',
    },
  ],
}
