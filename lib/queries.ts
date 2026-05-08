import 'server-only'
import { getPayloadClient } from './payload'
import type { Post, Service, Industry, Team, SiteSetting, Navigation } from '@/payload-types'

/**
 * Thin wrappers sobre la Local API de Payload.
 * Todo se cachea via React `cache` implícito en Server Components cuando la misma
 * request consulta el mismo recurso varias veces.
 */

export async function getSiteSettings(): Promise<SiteSetting> {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'site-settings', depth: 2 }) as Promise<SiteSetting>
}

export async function getNavigation(): Promise<Navigation> {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'navigation', depth: 1 }) as Promise<Navigation>
}

export async function getServices(): Promise<Service[]> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'services',
    limit: 100,
    sort: 'order',
    depth: 1,
  })
  return docs as Service[]
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'services',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })
  return (docs[0] as Service) ?? null
}

export async function getIndustries(): Promise<Industry[]> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'industries',
    limit: 100,
    sort: 'order',
    depth: 1,
  })
  return docs as Industry[]
}

export async function getPosts(limit = 100): Promise<Post[]> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'posts',
    where: { status: { equals: 'published' } },
    limit,
    sort: '-publishedAt',
    depth: 2,
  })
  return docs as Post[]
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'posts',
    where: {
      and: [
        { slug: { equals: slug } },
        { status: { equals: 'published' } },
      ],
    },
    limit: 1,
    depth: 2,
  })
  return (docs[0] as Post) ?? null
}

export async function getTeam(): Promise<Team[]> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'team',
    limit: 100,
    sort: 'order',
    depth: 1,
  })
  return docs as Team[]
}

export async function getFounder(): Promise<Team | null> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'team',
    where: { isFounder: { equals: true } },
    limit: 1,
    depth: 1,
  })
  return (docs[0] as Team) ?? null
}
