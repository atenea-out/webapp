/* eslint-disable @typescript-eslint/no-explicit-any */
import { existsSync } from 'fs'
import path from 'path'
import process from 'process'

type LexDoc = {
  root: {
    type: 'root'
    format: ''
    indent: 0
    version: 1
    direction: 'ltr'
    children: any[]
  }
}

type ProcessWithEnvFile = typeof process & {
  loadEnvFile?: (path?: string) => void
}

function loadLocalEnv() {
  const processWithEnvFile = process as ProcessWithEnvFile
  if (existsSync('.env.local') && processWithEnvFile.loadEnvFile) {
    processWithEnvFile.loadEnvFile('.env.local')
  }
}

function lexPara(text: string): any {
  return {
    type: 'paragraph',
    version: 1,
    direction: 'ltr',
    format: '',
    indent: 0,
    textFormat: 0,
    children: [
      {
        type: 'text',
        version: 1,
        detail: 0,
        format: 0,
        mode: 'normal',
        style: '',
        text,
      },
    ],
  }
}

function lexDoc(paragraphs: string[]): LexDoc {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children: paragraphs.map(lexPara),
    },
  }
}

const teamProfiles = [
  {
    name: 'Patricia Rojas',
    role: 'Fundadora, Gerente de Contabilidad, Finanzas e Impuestos',
    isFounder: true,
    photo: 'patricia rojas.jpg',
    summary:
      'Lidera la visión contable, financiera y tributaria de Atenea con más de 25 años de experiencia en empresas nacionales y multinacionales.',
    bio: [
      'Con más de 25 años de experiencia en contabilidad, finanzas, nómina e impuestos, ha trabajado en empresas multinacionales y nacionales de alto reconocimiento.',
      'Su experiencia abarca la industria farmacéutica, de servicios y comercial. En el sector farmacéutico se destacó como Fact Leader en un proyecto de consolidación y estabilización de procesos de tercerización contable en el exterior.',
      'Ha liderado la planificación, dirección y coordinación de actividades contables y financieras, garantizando calidad de servicio, cumplimiento normativo y relación efectiva con clientes internos y externos.',
      'Cuenta con una Ingeniería Comercial con especialización en Contabilidad y Auditoría por la Universidad Politécnica Salesiana y una Maestría en Tributación por la Universidad Simón Bolívar.',
    ],
    credentials: [
      {
        icon: 'GraduationCap',
        label: 'Formación',
        value: 'Ing. Comercial, Especialización en Contabilidad y Auditoría',
        sub: 'Universidad Politécnica Salesiana',
      },
      {
        icon: 'Certificate',
        label: 'Postgrado',
        value: 'Maestría en Tributación',
        sub: 'Universidad Simón Bolívar',
      },
      {
        icon: 'Desktop',
        label: 'Sistemas',
        value: 'SAP/R3 y sistemas contables',
        sub: 'Gestión financiera y cumplimiento',
      },
    ],
    shortCredentials: [
      { text: 'Más de 25 años de experiencia' },
      { text: 'Contabilidad, finanzas e impuestos' },
      { text: 'SAP/R3 · NIIF · Normativa SRI' },
    ],
    linkedin: 'https://www.linkedin.com/in/atenea-outsourcing-b0a850326/',
    email: 'patricia.rojas@atenea-outsourcing.com',
    order: 1,
  },
  {
    name: 'Ximena Rojas',
    role: 'Asociada de Contabilidad, Procesos e Implementación',
    isFounder: false,
    photo: 'ximena-rojas.jpg',
    summary:
      'Fortalece procesos contables, tributarios y financieros con foco en control interno, sistemas de gestión y mejora operativa.',
    bio: [
      'Con más de 15 años de experiencia en contabilidad, finanzas y tributación, ha trabajado en la gestión y coordinación de procesos contables y financieros.',
      'Su experiencia abarca contabilidad, impuestos, inventarios, activos fijos, tesorería y cartera, aportando al fortalecimiento del control interno y al cumplimiento normativo.',
      'Ha participado en la implementación y optimización de sistemas contables y de gestión financiera, contribuyendo a la generación de información confiable para la toma de decisiones.',
      'Cuenta con el título de Ingeniera en Contabilidad y Auditoría por la Universidad Central del Ecuador, es Contadora Pública Autorizada, posee un Diplomado en NIIF por la Universidad de Aconcagua y una Maestría en Tributación por la Universidad de Las Américas.',
    ],
    credentials: [
      {
        icon: 'GraduationCap',
        label: 'Formación',
        value: 'Ing. en Contabilidad y Auditoría',
        sub: 'Universidad Central del Ecuador',
      },
      {
        icon: 'Certificate',
        label: 'Especialización',
        value: 'Diplomado NIIF y Maestría en Tributación',
        sub: 'Universidad de Aconcagua · UDLA',
      },
      {
        icon: 'Desktop',
        label: 'Sistemas',
        value: 'SAFI · Contífico · SAP · Oracle',
        sub: 'ERP y gestión financiera',
      },
    ],
    shortCredentials: [
      { text: 'Más de 15 años de experiencia' },
      { text: 'Procesos contables y tributarios' },
      { text: 'SAFI · Contífico · SAP · Oracle' },
    ],
    order: 2,
  },
  {
    name: 'Alejandra Monteros',
    role: 'Analista Contable',
    isFounder: false,
    photo: 'alejandra-montero.jpg',
    summary:
      'Acompaña la ejecución contable diaria con orden, precisión documental y cumplimiento oportuno de procesos asignados.',
    bio: [
      'Cuenta con tres años de experiencia en el ámbito contable y financiero, participando en la gestión y ejecución de procesos contables.',
      'Su experiencia se ha desarrollado en registros contables, conciliaciones, apoyo en procesos tributarios y gestión documental.',
      'Participa activamente en tareas de outsourcing contable y en el cumplimiento oportuno de procesos asignados, destacándose por su organización, responsabilidad y orientación a plazos.',
      'Cuenta con el título de Licenciada en Finanzas por la Universidad Central del Ecuador.',
    ],
    credentials: [
      {
        icon: 'GraduationCap',
        label: 'Formación',
        value: 'Licenciada en Finanzas',
        sub: 'Universidad Central del Ecuador',
      },
      {
        icon: 'Certificate',
        label: 'Gestión',
        value: 'Registros, conciliaciones y soporte tributario',
        sub: 'Outsourcing contable',
      },
    ],
    shortCredentials: [
      { text: 'Gestión contable y financiera' },
      { text: 'Conciliaciones y soporte tributario' },
      { text: 'Orden documental y cumplimiento' },
    ],
    order: 3,
  },
  {
    name: 'Gonzalo Rojas',
    role: 'Especialista en Levantamiento y Control de Activos Fijos',
    isFounder: false,
    photo: 'david-rojas.jpg',
    summary:
      'Especialista en control patrimonial, levantamiento físico y depuración de activos para organizaciones públicas y privadas.',
    bio: [
      'Cuenta con experiencia en levantamiento y control de activos fijos, participando en proyectos para empresas del sector público y privado en diferentes provincias del país.',
      'Su trayectoria incluye tomas físicas de inventarios de activos fijos, conciliación de información, etiquetado, validación y depuración de bases de datos.',
      'Ha brindado soporte en actividades operativas y administrativas relacionadas con control patrimonial, auditorías y procesos de regularización de activos.',
      'Cursó estudios de Administración de Empresas en la Universidad Politécnica Salesiana y complementa su formación con experiencia práctica en campo.',
    ],
    credentials: [
      {
        icon: 'GraduationCap',
        label: 'Formación',
        value: 'Administración de Empresas',
        sub: 'Universidad Politécnica Salesiana',
      },
      {
        icon: 'Certificate',
        label: 'Especialidad',
        value: 'Control patrimonial y activos fijos',
        sub: 'Levantamiento, conciliación y depuración',
      },
    ],
    shortCredentials: [
      { text: 'Control de activos fijos' },
      { text: 'Levantamiento patrimonial' },
      { text: 'Inventarios y auditoría operativa' },
    ],
    order: 4,
  },
]

async function upsertMedia(payload: any, fileName: string, alt: string) {
  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: fileName } },
    limit: 1,
  })

  if (existing.docs[0]) {
    return existing.docs[0]
  }

  const filePath = path.resolve('public', 'media', 'team', fileName)

  if (!existsSync(filePath)) {
    throw new Error(`No se encontró la imagen: ${filePath}`)
  }

  return payload.create({
    collection: 'media',
    data: {
      alt,
      caption: 'Equipo Atenea Outsourcing',
    },
    filePath,
  })
}

async function upsertTeamMember(payload: any, profile: (typeof teamProfiles)[number]) {
  const media = await upsertMedia(payload, profile.photo, `${profile.name} - ${profile.role}`)
  const data = {
    name: profile.name,
    role: profile.role,
    summary: profile.summary,
    photo: media.id,
    bio: lexDoc(profile.bio),
    isFounder: profile.isFounder,
    credentials: profile.credentials,
    shortCredentials: profile.shortCredentials,
    linkedin: profile.linkedin,
    email: profile.email,
    order: profile.order,
  }

  const existing = profile.isFounder
    ? await payload.find({
        collection: 'team',
        where: { isFounder: { equals: true } },
        limit: 1,
      })
    : await payload.find({
        collection: 'team',
        where: { name: { equals: profile.name } },
        limit: 1,
      })

  if (existing.docs[0]) {
    await payload.update({ collection: 'team', id: existing.docs[0].id, data })
    console.log(`  updated: ${profile.name}`)
    return
  }

  await payload.create({ collection: 'team', data })
  console.log(`  created: ${profile.name}`)
}

async function main() {
  loadLocalEnv()
  const [{ default: configPromise }, { getPayload }] = await Promise.all([
    import('../payload.config'),
    import('payload'),
  ])
  const payload = await getPayload({ config: configPromise as any })

  console.log('Seeding Team...')
  for (const profile of teamProfiles) {
    await upsertTeamMember(payload, profile)
  }

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      teamSectionMode: 'team',
      teamSectionEyebrow: 'Equipo Atenea',
      teamSectionTitle: 'Especialistas con criterio y cercanía.',
      teamSectionDescription:
        'Un equipo contable, tributario y financiero que acompaña cada decisión con rigor técnico, confidencialidad y trato humano.',
    },
  })
  console.log('Team section enabled.')
}

main()
  .then(() => {
    console.log('Team seed completed.')
    process.exit(0)
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
