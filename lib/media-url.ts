const seededMediaFallbacks: Record<string, string> = {
  'alejandra-montero.jpg': '/assets/media/team/alejandra-montero.jpg',
  'david-rojas.jpg': '/assets/media/team/gonzalo-rojas.jpg',
  'gonzalo-rojas.jpg': '/assets/media/team/gonzalo-rojas.jpg',
  'news-sri-comprobantes-2026.png': '/assets/media/news-sri-comprobantes-2026.png',
  'news-sri-comprobantes-2027.png': '/assets/media/news-sri-comprobantes-2027.png',
  'news-sri-comprobantes-2027-1600x900.png': '/assets/media/news-sri-comprobantes-2027-1600x900.png',
  'news-sri-comprobantes-2027-400x300.png': '/assets/media/news-sri-comprobantes-2027-400x300.png',
  'news-sri-comprobantes-2027-800x600.png': '/assets/media/news-sri-comprobantes-2027-800x600.png',
  'news-sri-comprobantes-2028.png': '/assets/media/news-sri-comprobantes-2028.png',
  'news-sri-comprobantes-2028-1600x900.png': '/assets/media/news-sri-comprobantes-2028-1600x900.png',
  'news-sri-comprobantes-2028-400x300.png': '/assets/media/news-sri-comprobantes-2028-400x300.png',
  'news-sri-comprobantes-2028-800x600.png': '/assets/media/news-sri-comprobantes-2028-800x600.png',
  'patricia rojas.jpg': '/assets/media/team/patricia-rojas.jpg',
  'patricia-rojas.jpg': '/assets/media/team/patricia-rojas.jpg',
  'ximena-rojas.jpg': '/assets/media/team/ximena-rojas.jpg',
}

export function resolveMediaUrl(url?: string | null) {
  if (!url) return null

  const filename =
    url.match(/^\/api\/media\/file\/([^/?#]+)/)?.[1] ||
    url.match(/^\/media\/([^/?#]+)/)?.[1]

  if (filename) {
    return seededMediaFallbacks[decodeURIComponent(filename)] || url
  }

  return url
}
