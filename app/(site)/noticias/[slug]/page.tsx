import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, CalendarBlank, Tag, Phone, EnvelopeSimple } from '@phosphor-icons/react/dist/ssr'
import type { Metadata } from 'next'
import { getPostBySlug, getPosts, getSiteSettings } from '@/lib/queries'
import { RichText } from '@/lib/lexical-to-react'
import type { Media } from '@/payload-types'
import { settingText } from '@/lib/settings-text'

type Props = { params: Promise<{ slug: string }> }

export const revalidate = 60

export async function generateStaticParams() {
  const posts = await getPosts(100)
  return posts.map((p) => ({ slug: p.slug! }))
}

const categoryLabels: Record<string, string> = {
  tributario: 'Tributario',
  laboral: 'Laboral',
  contable: 'Contable',
  financiero: 'Financiero',
  empresarial: 'Empresarial',
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
  }
}

function formatDate(dateStr?: string | null) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('es-EC', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function NoticiaPage({ params }: Props) {
  const { slug } = await params
  const [post, settings] = await Promise.all([getPostBySlug(slug), getSiteSettings()])
  if (!post) notFound()

  const phone = settings.phone ?? '(+593) 999 828 903'
  const phoneHref = `tel:${(phone.match(/\+?\d+/g) || []).join('')}`
  const email = settings.email ?? 'info@atenea-outsourcing.com'
  const featuredImg =
    post.featuredImage && typeof post.featuredImage !== 'number'
      ? (post.featuredImage as Media)
      : null

  return (
    <>
      <section className="bg-[var(--dark)] pt-20 pb-16 px-6 md:px-[60px] border-b-[3px] border-[var(--gold)]">
        <div className="max-w-[860px] mx-auto">
          <Link
            href="/noticias"
            className="inline-flex items-center gap-2 text-[12px] tracking-[0.08em] uppercase text-[var(--gold-light)] mb-8 hover:text-[var(--gold)] transition-colors font-[family-name:var(--font-dm-sans)]"
          >
            <ArrowLeft size={14} /> {settingText(settings, 'newsDetailBackLabel', 'Todas las noticias')}
          </Link>
          <div className="flex items-center gap-3 mb-5">
            {post.category && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-medium tracking-[0.08em] uppercase rounded-sm border border-[var(--gold-border)] bg-[var(--gold-muted)] text-[var(--gold-light)]">
                <Tag size={11} /> {categoryLabels[post.category] || post.category}
              </span>
            )}
            <span className="flex items-center gap-1.5 text-[12px] text-[var(--gray-light)]">
              <CalendarBlank size={13} /> {formatDate(post.publishedAt)}
            </span>
          </div>
          <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(26px,3.5vw,44px)] font-medium text-[var(--cream)] leading-[1.15]">
            {post.title}
          </h1>
        </div>
      </section>

      <section className="py-16 px-6 md:px-[60px] bg-[var(--cream-light)]">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
          <article className="lg:col-span-2">
            {featuredImg?.url && (
              <div className="aspect-[16/9] relative mb-8 overflow-hidden">
                <Image
                  src={featuredImg.url}
                  alt={featuredImg.alt || post.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              </div>
            )}
            {post.excerpt && (
              <p className="text-[17px] font-light text-[var(--dark)] leading-[1.85] mb-8 pb-8 border-b border-[var(--cream-dark)]">
                {post.excerpt}
              </p>
            )}
            <RichText data={post.content} className="prose-atenea" />
          </article>

          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-[var(--dark)] rounded-sm p-7 border-t-2 border-[var(--gold)]">
              <p className="font-[family-name:var(--font-playfair)] text-[18px] font-medium text-[var(--cream)] mb-3">
                {settingText(settings, 'newsDetailCtaTitle', 'Necesitas asesoria?')}
              </p>
              <p className="text-[13px] text-[var(--gray-light)] leading-[1.7] mb-5">
                {settingText(
                  settings,
                  'newsDetailCtaDescription',
                  'Nuestro equipo puede orientarte sobre como estos cambios afectan a tu empresa especificamente.',
                )}
              </p>
              <Link
                href="/contacto"
                className="flex items-center justify-center w-full px-5 py-3 bg-[var(--gold)] text-[var(--dark)] text-[12px] font-medium tracking-[0.08em] uppercase rounded-sm hover:bg-[var(--gold-light)] transition-all duration-200 font-[family-name:var(--font-dm-sans)]"
              >
                {settingText(settings, 'newsDetailCtaLabel', 'Consultar ahora')}
              </Link>
            </div>

            <div className="bg-[var(--white)] border border-[var(--cream-dark)] rounded-sm p-6">
              <p className="text-[11px] tracking-[0.12em] uppercase text-[var(--gray-light)] mb-4 font-[family-name:var(--font-dm-sans)]">
                {settingText(settings, 'newsDetailContactLabel', 'Contacto directo')}
              </p>
              <a href={phoneHref} className="flex items-center gap-2.5 text-[14px] text-[var(--dark)] hover:text-[var(--gold)] transition-colors mb-2">
                <Phone size={15} color="var(--gold)" /> {phone}
              </a>
              <a href={`mailto:${email}`} className="flex items-center gap-2.5 text-[13px] text-[var(--dark)] hover:text-[var(--gold)] transition-colors">
                <EnvelopeSimple size={15} color="var(--gold)" /> {email}
              </a>
            </div>

            <div>
              <p className="text-[11px] tracking-[0.12em] uppercase text-[var(--gray-light)] mb-4 font-[family-name:var(--font-dm-sans)]">
                {settingText(settings, 'newsDetailMoreLabel', 'Ver mas articulos')}
              </p>
              <Link
                href="/noticias"
                className="text-[13px] text-[var(--gold)] underline underline-offset-3 hover:text-[var(--gold-light)] transition-colors"
              >
                {settingText(settings, 'newsDetailBackToListLabel', 'Volver al listado de noticias')}
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
