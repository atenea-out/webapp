import type { CollectionConfig } from 'payload'
import { adminFieldOnly, adminOnly, adminOrSelf } from '@/lib/access'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Usuario',
    plural: 'Usuarios',
  },
  auth: true,
  access: {
    create: adminOnly,
    read: adminOrSelf,
    update: adminOrSelf,
    delete: adminOnly,
  },
  admin: {
    useAsTitle: 'email',
    group: 'Administración',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nombre',
      required: true,
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto de perfil',
      admin: {
        description: 'Imagen visible en el perfil y la esquina superior del panel.',
      },
    },
    {
      name: 'role',
      type: 'select',
      label: 'Rol',
      defaultValue: 'editor',
      access: {
        create: adminFieldOnly,
        update: adminFieldOnly,
      },
      options: [
        { label: 'Administrador', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
    },
  ],
}
