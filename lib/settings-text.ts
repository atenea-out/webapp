export function settingText(settings: unknown, key: string, fallback: string) {
  const value = (settings as Record<string, unknown>)?.[key]
  return typeof value === 'string' && value.trim() ? value : fallback
}

export function settingPath(settings: unknown, key: string, fallback: string) {
  const value = settingText(settings, key, fallback)
  return value.startsWith('/') || value.startsWith('http') ? value : fallback
}
