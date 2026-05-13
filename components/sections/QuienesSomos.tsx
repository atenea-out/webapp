import Image from 'next/image'
import { AnimateIn } from '@/components/ui/AnimateIn'

type Valor = { title: string; description: string; imgSrc: string; eyebrow?: string | null }

const valueEyebrows: Record<string, string> = {
  excelencia: 'Rigor verificable',
  confidencialidad: 'Custodia financiera',
  compromiso: 'Relación de largo plazo',
  innovación: 'Criterio actualizado',
}

const staticAboutImages: Record<string, string> = {
  '/media/images/quienes-excelencia.png': '/assets/media/images/quienes-excelencia.png',
  '/media/images/quienes-confidencialidad.png': '/assets/media/images/quienes-confidencialidad.png',
  '/media/images/quienes-compromiso.png': '/assets/media/images/quienes-compromiso.png',
  '/media/images/quienes-innovacion.png': '/assets/media/images/quienes-innovacion.png',
}

function resolveAboutImage(src: string) {
  return staticAboutImages[src] || src
}

function getValueEyebrow(title: string, eyebrow?: string | null) {
  if (eyebrow) return eyebrow

  return valueEyebrows[title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')] || 'Criterio Atenea'
}

const defaultValores: Valor[] = [
  {
    title: 'Excelencia',
    description:
      'Estándares de calidad superiores en cada entregable, con procesos auditables y resultados verificables.',
    imgSrc: '/assets/media/images/quienes-excelencia.png',
    eyebrow: 'Rigor verificable',
  },
  {
    title: 'Confidencialidad',
    description: 'Tratamiento seguro y estricto de la información financiera de cada cliente.',
    imgSrc: '/assets/media/images/quienes-confidencialidad.png',
    eyebrow: 'Custodia financiera',
  },
  {
    title: 'Compromiso',
    description: 'Relaciones de largo plazo basadas en resultados reales y confianza mutua.',
    imgSrc: '/assets/media/images/quienes-compromiso.png',
    eyebrow: 'Relación de largo plazo',
  },
  {
    title: 'Innovación',
    description: 'Actualización permanente ante cambios normativos y avances tecnológicos del sector.',
    imgSrc: '/assets/media/images/quienes-innovacion.png',
    eyebrow: 'Criterio actualizado',
  },
]

type QuienesSomosProps = {
  text?: string | null
  valores?: Valor[] | null
}

export function QuienesSomos({ text, valores: valoresProp }: QuienesSomosProps = {}) {
  const valores = valoresProp && valoresProp.length > 0 ? valoresProp : defaultValores
  const intro =
    text ||
    'Firma especializada en soluciones integrales de contabilidad, finanzas y tributación con más de dos décadas de trayectoria.'

  return (
    <section className="bg-white py-[var(--section-pad)] px-6 md:px-[60px]">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 items-start">
        <AnimateIn>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {valores.map(({ title, description, imgSrc, eyebrow }) => (
            <article
              key={title}
              className="group relative h-56 md:h-64 w-full overflow-hidden bg-[var(--navy)] border border-[var(--navy)]/10"
            >
              {imgSrc && (
                <Image
                  src={resolveAboutImage(imgSrc)}
                  alt={title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={90}
                  className="object-cover transition-[filter] duration-700 ease-out md:grayscale md:saturate-[0.7] group-hover:grayscale-0 group-hover:saturate-100"
                />
              )}

              <div
                className="absolute inset-0 transition-opacity duration-700"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(2,48,68,0.08) 0%, rgba(2,48,68,0.28) 42%, rgba(2,48,68,0.88) 100%)',
                }}
                aria-hidden="true"
              />
              <div
                className="absolute inset-0 opacity-70 mix-blend-color"
                style={{ background: 'rgba(2,48,68,0.18)' }}
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 h-px bg-[var(--coral)]/45 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative z-10 flex h-full flex-col justify-end p-5 md:p-6">
                <div className="max-w-[270px]">
                  <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--coral)]/90">
                    {getValueEyebrow(title, eyebrow)}
                  </p>
                  <h3 className="font-[family-name:var(--font-display)] text-[1.55rem] font-medium leading-none text-white">
                    {title}
                  </h3>
                  <p className="mt-3 text-[12px] text-white/68 leading-[1.65] transition-colors duration-500 group-hover:text-white/86">
                    {description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
