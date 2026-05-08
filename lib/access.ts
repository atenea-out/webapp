import type { Access, FieldAccess } from 'payload'

type Role = 'admin' | 'editor'
type AccessUser = {
  id?: string | number
  role?: Role | null
}

function getUser(args: Parameters<Access>[0] | Parameters<FieldAccess>[0]) {
  return args.req.user as AccessUser | null | undefined
}

export const isAdmin = (args: Parameters<Access>[0] | Parameters<FieldAccess>[0]) => {
  return getUser(args)?.role === 'admin'
}

export const isEditorOrAdmin = (args: Parameters<Access>[0] | Parameters<FieldAccess>[0]) => {
  const role = getUser(args)?.role
  return role === 'admin' || role === 'editor'
}

export const publicRead: Access = () => true

export const editorOrAdmin: Access = (args) => isEditorOrAdmin(args)

export const adminOnly: Access = (args) => isAdmin(args)

export const adminFieldOnly: FieldAccess = (args) => isAdmin(args)

export const publishedOrEditor: Access = (args) => {
  if (isEditorOrAdmin(args)) return true

  return {
    status: {
      equals: 'published',
    },
  }
}

export const adminOrSelf: Access = (args) => {
  if (isAdmin(args)) return true

  const user = getUser(args)
  if (!user?.id) return false

  return {
    id: {
      equals: user.id,
    },
  }
}
