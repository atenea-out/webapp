import type { CSSProperties } from 'react'
import type { SiteSetting } from '@/payload-types'

const DEFAULT_THEME = {
  navy: '#023044',
  navyMid: '#034060',
  navyLight: '#0a4a6e',
  coral: '#ef625e',
  coralLight: '#f2837f',
  background: '#F0F5FA',
  subtleBackground: '#e8eef5',
  cream: '#ebe6e2',
  creamDark: '#d4cdc8',
  text: '#334155',
  textMid: '#475569',
  textMuted: '#94a3b8',
}

const HEX_COLOR = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/

function normalizeHex(value: string) {
  const hex = value.trim()
  if (hex.length === 4) {
    const [, r, g, b] = hex
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase()
  }
  return hex.toLowerCase()
}

function pickHex(value: string | null | undefined, fallback: string) {
  if (!value || !HEX_COLOR.test(value)) return fallback
  return normalizeHex(value)
}

function hexToRgb(hex: string) {
  const normalized = normalizeHex(hex).replace('#', '')
  const value = Number.parseInt(normalized, 16)
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  }
}

function rgba(hex: string, alpha: number) {
  const { r, g, b } = hexToRgb(hex)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export function getThemeStyle(settings?: SiteSetting | null): CSSProperties {
  const navy = pickHex(settings?.themeNavy, DEFAULT_THEME.navy)
  const navyMid = pickHex(settings?.themeNavyMid, DEFAULT_THEME.navyMid)
  const coral = pickHex(settings?.themeCoral, DEFAULT_THEME.coral)
  const coralLight = pickHex(settings?.themeCoralLight, DEFAULT_THEME.coralLight)
  const background = pickHex(settings?.themeBackground, DEFAULT_THEME.background)
  const cream = pickHex(settings?.themeCream, DEFAULT_THEME.cream)
  const text = pickHex(settings?.themeText, DEFAULT_THEME.text)
  const textMid = pickHex(settings?.themeTextMuted, DEFAULT_THEME.textMid)

  return {
    '--navy': navy,
    '--navy-mid': navyMid,
    '--navy-light': DEFAULT_THEME.navyLight,
    '--coral': coral,
    '--coral-light': coralLight,
    '--coral-muted': rgba(coral, 0.1),
    '--coral-border': rgba(coral, 0.3),
    '--bg': background,
    '--bg-subtle': DEFAULT_THEME.subtleBackground,
    '--cream-light': background,
    '--cream': cream,
    '--cream-dark': DEFAULT_THEME.creamDark,
    '--gray': text,
    '--gray-mid': textMid,
    '--gray-light': DEFAULT_THEME.textMuted,
  } as CSSProperties
}
