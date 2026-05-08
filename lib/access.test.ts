import { describe, expect, it } from 'vitest'
import {
  adminFieldOnly,
  adminOnly,
  adminOrSelf,
  editorOrAdmin,
  isAdmin,
  isEditorOrAdmin,
  publicRead,
  publishedOrEditor,
} from './access'

function args(user?: { id?: string | number; role?: 'admin' | 'editor' | null } | null) {
  return { req: { user } } as never
}

describe('Payload access helpers', () => {
  it('identifies admin and editor roles', () => {
    expect(isAdmin(args({ role: 'admin' }))).toBe(true)
    expect(isAdmin(args({ role: 'editor' }))).toBe(false)
    expect(isEditorOrAdmin(args({ role: 'admin' }))).toBe(true)
    expect(isEditorOrAdmin(args({ role: 'editor' }))).toBe(true)
    expect(isEditorOrAdmin(args(null))).toBe(false)
  })

  it('allows public reads for content that powers the site', () => {
    expect(publicRead(args(null))).toBe(true)
  })

  it('allows content writes only for editors and admins', () => {
    expect(editorOrAdmin(args({ role: 'editor' }))).toBe(true)
    expect(editorOrAdmin(args({ role: 'admin' }))).toBe(true)
    expect(editorOrAdmin(args(null))).toBe(false)
  })

  it('limits post reads to published documents for public visitors', () => {
    expect(publishedOrEditor(args(null))).toEqual({
      status: {
        equals: 'published',
      },
    })
    expect(publishedOrEditor(args({ role: 'editor' }))).toBe(true)
  })

  it('limits user management to admins while allowing users to read themselves', () => {
    expect(adminOnly(args({ role: 'admin' }))).toBe(true)
    expect(adminOnly(args({ role: 'editor' }))).toBe(false)
    expect(adminFieldOnly(args({ role: 'editor' }))).toBe(false)
    expect(adminOrSelf(args({ id: 'user-1', role: 'editor' }))).toEqual({
      id: {
        equals: 'user-1',
      },
    })
    expect(adminOrSelf(args(null))).toBe(false)
  })
})
