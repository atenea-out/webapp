import Image from 'next/image'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { AnimateIn } from '@/components/ui/AnimateIn'

type Valor = { title: string; description: string; imgSrc: string }

const defaultValores: Valor[] = [
  {
    title: 'Excelencia',
    description: 'Estándares de calidad superiores en cada entregable, con procesos auditables y resultados verificables.',
    imgSrc: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=2000&q=90&auto=format&fit=crop',
  },
  {
    title: 'Confidencialidad',
    description: 'Tratamiento seguro y estricto de la información financiera de cada cliente.',
    imgSrc: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=2000&q=90&auto=format&fit=crop',
  },
  {
    title: 'Compromiso',
    description: 'Relaciones de largo plazo basadas en resultados reales y confianza mutua.',
    imgSrc: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=2000&q=90&auto=format&fit=crop',
  },
  {
    title: 'Innovación',
    description: 'Actualización permanente ante cambios normativos y avances tecnológicos del sector.',
    imgSrc: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=2000&q=90&auto=format&fit=crop',
  },
]

type QuienesSomosProps = {
  text?: string | null
  valores?: Valor[] | null
}

/**
 * Letras animadas — slide vertical con stagger CSS puro.
 * Cada letra tiene un container overflow-hidden.
 * El span interno contiene la letra dos veces en flex-col.
 * En hover: translate-y(-50%) sube exactamente una letra.
 * stagger: transitionDelay incremental por índice.
 */
function AnimatedTitle({ text }: { text: string }) {
  return (
    <div className="flex flex-wrap leading-none mb-2" aria-label={text}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          style={{ height: '1.75rem' }}
          aria-hidden="true"
        >
          <span
            className="flex flex-col transition-transform duration-500 group-hover:-translate-y-1/2"
            style={{ transitionDelay: `${i * 32}ms` }}
          >
            <span className="font-[family-name:var(--font-display)] text-[1.375rem] font-medium text-white leading-7">
              {char === ' ' ? '\u00A0' : char}
            </span>
            <span className="font-[family-name:var(--font-display)] text-[1.375rem] font-medium text-white leading-7">
              {char === ' ' ? '\u00A0' : char}
            </span>
          </span>
        </span>
      ))}
    </div>
  )
}

export function QuienesSomos({ text, valores: valoresProp }: QuienesSomosProps = {}) {
  const valores = valoresProp && valoresProp.length > 0 ? valoresProp : defaultValores
  const intro =
    text ||
    'Firma especializada en soluciones integrales de contabilidad, finanzas y tributación con más de dos décadas de trayectoria.'
  return (
    <section className="bg-white py-[var(--section-pad)] px-6 md:px-[60px]">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 items-start">

        {/* LEFT — Header */}
        <AnimateIn className="lg:sticky lg:top-28">
          <span className="section-tag">Sobre Nosotros</span>
          <h2
            className="font-[family-name:var(--font-display)] font-medium text-[var(--navy)] leading-[1.15] tracking-[-0.02em] mt-1 mb-4"
            style={{ fontSize: 'clamp(28px,3vw,42px)' }}
          >
            ¿Quiénes somos?
          </h2>
          <p className="text-[15px] font-light text-[var(--gray-mid)] leading-[1.75] max-w-[400px]">
            {intro}
          </p>
        </AnimateIn>

        {/* RIGHT — Cards 2×2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {valores.map(({ title, description, imgSrc }, i) => (
            <AnimateIn key={title} delay={i * 70}>
              {/* group para que CSS hover haga efecto en hijos */}
              <div className="group relative h-56 md:h-64 w-full overflow-hidden cursor-pointer bg-[var(--navy)]">

                {/* Imagen: B&W en desktop, color en mobile — scale en hover */}
                {imgSrc && (
                  <Image
                    src={imgSrc}
                    alt={title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={90}
                    className="object-cover transition-all duration-500 ease-out
                               group-hover:scale-105
                               md:grayscale group-hover:grayscale-0"
                  />
                )}

                {/* Overlay gradiente — más oscuro abajo para texto legible */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10 transition-opacity duration-500 group-hover:from-black/60" />

                {/* Contenido */}
                <div className="relative z-10 flex h-full flex-col justify-between p-5">

                  {/* Flecha top-right: rota -45° en hover */}
                  <ArrowRight
                    size={22}
                    weight="regular"
                    className="ml-auto text-white/60 group-hover:text-white transition-all duration-500 group-hover:-rotate-45"
                  />

                  {/* Bottom: título animado + descripción */}
                  <div>
                    <AnimatedTitle text={title} />
                    <p className="text-[12px] text-white/65 leading-[1.65] max-w-[200px] transition-colors duration-500 group-hover:text-white/85">
                      {description}
                    </p>
                  </div>
                </div>

              </div>
            </AnimateIn>
          ))}
        </div>

      </div>
    </section>
  )
}
