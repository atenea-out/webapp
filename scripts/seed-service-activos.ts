/* eslint-disable @typescript-eslint/no-explicit-any */
import { existsSync } from 'fs'
import process from 'process'

type ProcessWithEnvFile = typeof process & {
  loadEnvFile?: (path?: string) => void
}

function loadLocalEnv() {
  const processWithEnvFile = process as ProcessWithEnvFile
  if (existsSync('.env.local') && processWithEnvFile.loadEnvFile) {
    processWithEnvFile.loadEnvFile('.env.local')
  }
}

const service = {
  title: 'Levantamiento y Control de Activos Fijos',
  slug: 'levantamiento-control-activos-fijos',
  number: '07',
  icon: 'Barcode',
  shortDescription:
    'Levantamiento físico, etiquetado, conciliación y depuración de activos fijos para control patrimonial y auditorías.',
  bullets: [
    { text: 'Levantamiento físico y toma de inventario de activos fijos' },
    { text: 'Etiquetado y codificación de activos' },
    { text: 'Conciliación entre el inventario físico y registros contables' },
    { text: 'Depuración y actualización de bases de datos' },
    { text: 'Clasificación y validación de activos' },
    { text: 'Regularización de diferencias e identificación de activos obsoletos o no localizados' },
    { text: 'Soporte para auditorías internas y externas' },
    { text: 'Carga y actualización de información en sistemas de activos fijos del cliente' },
  ],
  order: 7,
}

async function main() {
  loadLocalEnv()
  const [{ default: configPromise }, { getPayload }] = await Promise.all([
    import('../payload.config'),
    import('payload'),
  ])
  const payload = await getPayload({ config: configPromise as any })

  const existing = await payload.find({
    collection: 'services',
    where: { slug: { equals: service.slug } },
    limit: 1,
  })

  if (existing.docs[0]) {
    await payload.update({ collection: 'services', id: existing.docs[0].id, data: service as any })
    console.log(`updated: ${service.title}`)
    return
  }

  await payload.create({ collection: 'services', data: service as any })
  console.log(`created: ${service.title}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
