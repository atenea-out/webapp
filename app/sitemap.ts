import type { MetadataRoute } from 'next'
import { getPosts, getServices } from '@/lib/queries'

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://atenea-outsourcing.com').replace(/\/$/, '')

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, posts] = await Promise.all([getServices(), getPosts(100)])
  const now = new Date()
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/nosotros`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/servicios`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/industrias`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/noticias`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/contacto`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    {
      url: `${baseUrl}/politica-de-privacidad`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  const serviceRoutes: MetadataRoute.Sitemap = services.filter((service) => service.slug).map((service) => ({
    url: `${baseUrl}/servicios/${service.slug}`,
    lastModified: service.updatedAt ? new Date(service.updatedAt) : now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const postRoutes: MetadataRoute.Sitemap = posts.filter((post) => post.slug).map((post) => ({
    url: `${baseUrl}/noticias/${post.slug}`,
    lastModified: post.updatedAt ? new Date(post.updatedAt) : post.publishedAt ? new Date(post.publishedAt) : now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...serviceRoutes, ...postRoutes]
}
