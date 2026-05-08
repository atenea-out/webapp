import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, CalendarBlank, Tag } from '@phosphor-icons/react/dist/ssr'
import type { Metadata } from 'next'
import { getPosts, getSiteSettings } from '@/lib/queries'
import type { Post, Media } from '@/payload-types'
import { settingText } from '@/lib/settings-text'

export const metadata: Metadata = {
  title: 'Noticias',
  description: 'Articulos y novedades sobre contabilidad, finanzas, tributacion y legislacion laboral en Ecuador.',
}

export const revalidate = 60

const categoryColors: Record<string, string> = {
  tributario: 'bg-amber-50 text-amber-700 border-amber-200',
  laboral: 'bg-blue-50 text-blue-700 border-blue-200',
  contable: 'bg-green-50 text-green-700 border-green-200',
  financiero: 'bg-purple-50 text-purple-700 border-purple-200',
  empresarial: 'bg-gray-50 text-gray-600 border-gray-200',
}

const categoryLabels: Record<string, string> = {
  tributario: 'Tributario',
  laboral: 'Laboral',
  contable: 'Contable',
  financiero: 'Financiero',
  empresarial: 'Empresarial',
}

function formatDate(dateStr?: string | null) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('es-EC', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function getImageUrl(img: Post['featuredImage']): string | null {
  if (!img) return null
  if (typeof img === 'number') return null
  return (img as Media).url ?? null
}

export default async function NoticiasPage() {
  const [posts, settings] = await Promise.all([getPosts(50), getSiteSettings()])

  if (posts.length === 0) {
    return (
      <section className="py-20 px-6 md:px-[60px] bg-[var(--cream-light)] min-h-[60vh]">
        <div className="max-w-[780px] mx-auto text-center">
          <h1 className="font-[family-name:var(--font-playfair)] text-[32px] font-medium text-[var(--dark)] mb-4">
            {settingText(settings, 'newsEmptyTitle', 'Noticias')}
          </h1>
          <p className="text-[15px] text-[var(--gray)]">
            {settingText(settings, 'newsEmptyText', 'Aun no hay noticias publicadas. Vuelve pronto.')}
          </p>
        </div>
      </section>
    )
  }

  const [featured, ...rest] = posts

  return (
    <>
      <section className="bg-[var(--dark)] pt-20 pb-16 px-6 md:px-[60px] border-b-[3px] border-[var(--gold)]">
        <div className="max-w-[1280px] mx-auto">
          <span className="section-tag" style={{ color: 'var(--gold-light)' }}>
            {settingText(settings, 'newsPageEyebrow', 'Actualidad')}
          </span>
          <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(32px,4vw,52px)] font-medium text-[var(--cream)] leading-[1.1] mt-1 mb-5">
            {settingText(settings, 'newsPageTitle', 'Noticias y Articulos')}
          </h1>
          <p className="text-[16px] font-light text-[var(--gray-light)] leading-[1.75] max-w-[520px]">
            {settingText(
              settings,
              'newsPageDescription',
              'Analisis, guias y novedades sobre el entorno tributario, contable y financiero en Ecuador y Latinoamerica.',
            )}
          </p>
        </div>
      </section>

      <section className="py-20 px-6 md:px-[60px] bg-[var(--cream-light)]">
        <div className="max-w-[1280px] mx-auto">
          <Link
            href={`/noticias/${featured.slug}`}
            className="group block mb-10 bg-[var(--white)] border border-[var(--cream-dark)] rounded-sm overflow-hidden hover:border-[var(--gold)]/40 hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)] transition-all duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="aspect-[16/9] lg:aspect-auto bg-gradient-to-br from-[var(--cream)] to-[var(--cream-dark)] flex items-center justify-center relative overflow-hidden">
                {getImageUrl(featured.featuredImage) ? (
                  <Image
                    src={getImageUrl(featured.featuredImage)!}
                    alt={featured.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                ) : (
                  <span className="font-[family-name:var(--font-playfair)] text-[60px] font-light text-[var(--cream-dark)]">A</span>
                )}
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  {featured.category && (
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-medium tracking-[0.08em] uppercase rounded-sm border ${categoryColors[featured.category]}`}>
                      <Tag size={11} /> {categoryLabels[featured.category]}
                    </span>
                  )}
                  <span className="text-[11px] text-[var(--gray-light)]">{formatDate(featured.publishedAt)}</span>
                </div>
                <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(20px,2.5vw,28px)] font-medium text-[var(--dark)] leading-[1.25] mb-4">
                  {featured.title}
                </h2>
                {featured.excerpt && (
                  <p className="text-[14px] text-[var(--gray)] leading-[1.75] mb-6">{featured.excerpt}</p>
                )}
                <div className="flex items-center gap-1.5 text-[11px] tracking-[0.1em] uppercase text-[var(--gold)] font-medium font-[family-name:var(--font-dm-sans)]">
                  {settingText(settings, 'newsReadLabel', 'Leer articulo')} <ArrowUpRight size={13} />
                </div>
              </div>
            </div>
          </Link>

          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map((post) => {
                const imgUrl = getImageUrl(post.featuredImage)
                return (
                  <Link
                    key={post.slug}
                    href={`/noticias/${post.slug}`}
                    className="group flex flex-col bg-[var(--white)] border border-[var(--cream-dark)] rounded-sm overflow-hidden hover:border-[var(--gold)]/40 hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300"
                  >
                    <div className="aspect-[16/9] bg-gradient-to-br from-[var(--cream)] to-[var(--cream-dark)] flex items-center justify-center relative overflow-hidden">
                      {imgUrl ? (
                        <Image
                          src={imgUrl}
                          alt={post.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <span className="font-[family-name:var(--font-playfair)] text-[40px] font-light text-[var(--cream-dark)]">A</span>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        {post.category && (
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium tracking-[0.06em] uppercase rounded-sm border ${categoryColors[post.category]}`}>
                            {categoryLabels[post.category]}
                          </span>
                        )}
                        <span className="flex items-center gap-1 text-[11px] text-[var(--gray-light)]">
                          <CalendarBlank size={11} /> {formatDate(post.publishedAt)}
                        </span>
                      </div>
                      <h3 className="font-[family-name:var(--font-playfair)] text-[17px] font-medium text-[var(--dark)] leading-[1.3] mb-3 flex-1">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-[13px] text-[var(--gray)] leading-[1.7] mb-4 line-clamp-3">{post.excerpt}</p>
                      )}
                      <div className="flex items-center gap-1 text-[11px] tracking-[0.08em] uppercase text-[var(--gold)] font-medium mt-auto font-[family-name:var(--font-dm-sans)]">
                        {settingText(settings, 'newsReadMoreLabel', 'Leer mas')} <ArrowUpRight size={12} />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
