const seededMediaFallbacks: Record<string, string> = {
  'news-sri-comprobantes-2026.png': '/assets/media/news-sri-comprobantes-2026.png',
  'news-sri-comprobantes-2027.png': '/assets/media/news-sri-comprobantes-2027.png',
  'news-sri-comprobantes-2027-1600x900.png': '/assets/media/news-sri-comprobantes-2027-1600x900.png',
  'news-sri-comprobantes-2027-400x300.png': '/assets/media/news-sri-comprobantes-2027-400x300.png',
  'news-sri-comprobantes-2027-800x600.png': '/assets/media/news-sri-comprobantes-2027-800x600.png',
  'news-sri-comprobantes-2028.png': '/assets/media/news-sri-comprobantes-2028.png',
  'news-sri-comprobantes-2028-1600x900.png': '/assets/media/news-sri-comprobantes-2028-1600x900.png',
  'news-sri-comprobantes-2028-400x300.png': '/assets/media/news-sri-comprobantes-2028-400x300.png',
  'news-sri-comprobantes-2028-800x600.png': '/assets/media/news-sri-comprobantes-2028-800x600.png',
}

export function resolveMediaUrl(url?: string | null) {
  if (!url) return null

  const filename = url.match(/^\/api\/media\/file\/([^/?#]+)/)?.[1]

  if (filename) {
    return seededMediaFallbacks[decodeURIComponent(filename)] || url
  }

  return url
}
