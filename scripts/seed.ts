/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Seed script — popula el CMS con el contenido actualmente hardcodeado
 * en el landing, para que al activar la lectura desde Payload el sitio
 * se vea idéntico.
 *
 * Uso:
 *   pnpm exec tsx scripts/seed.ts         (o npx tsx scripts/seed.ts)
 *   node --import @swc-node/register/esm-register scripts/seed.ts
 */
import configPromise from '../payload.config'
import { getPayload } from 'payload'

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

async function main() {
  const payload = await getPayload({ config: configPromise as any })

  console.log('→ Seeding Services...')
  const services = [
    {
      title: 'Outsourcing Contable y Financiero',
      slug: 'outsourcing-contable-financiero',
      number: '01',
      icon: 'BookOpen',
      shortDescription:
        'Gestión integral de procesos contables. Estados financieros locales e internacionales, reportes gerenciales en línea.',
      bullets: [
        { text: 'Manejo integral de procesos contables mensuales y anuales' },
        { text: 'Elaboración de estados financieros locales e internacionales (NIIF)' },
        { text: 'Reportes gerenciales en línea con indicadores clave' },
        { text: 'Consolidación de operaciones multi-entidad' },
        { text: 'Implementación de controles internos' },
      ],
      order: 1,
    },
    {
      title: 'Nómina y Cumplimiento Laboral',
      slug: 'nomina-cumplimiento-laboral',
      number: '02',
      icon: 'Users',
      shortDescription:
        'Manejo profesional de nómina, pagos, finiquitos y contratos con soporte en regulaciones legales vigentes.',
      bullets: [
        { text: 'Cálculo y procesamiento de nómina mensual' },
        { text: 'Gestión de pagos al IESS y retenciones' },
        { text: 'Liquidaciones y finiquitos' },
        { text: 'Elaboración y registro de contratos' },
        { text: 'Asesoría en cumplimiento de normativa laboral' },
      ],
      order: 2,
    },
    {
      title: 'Tesorería',
      slug: 'tesoreria',
      number: '03',
      icon: 'CurrencyDollar',
      shortDescription:
        'Gestión de flujos de caja, pagos a proveedores e implementación de mejoras para optimizar la liquidez.',
      bullets: [
        { text: 'Planificación y control de flujos de caja' },
        { text: 'Gestión de pagos a proveedores' },
        { text: 'Conciliaciones bancarias' },
        { text: 'Optimización de capital de trabajo' },
        { text: 'Reportes de tesorería para la gerencia' },
      ],
      order: 3,
    },
    {
      title: 'Apoyo Administrativo',
      slug: 'apoyo-administrativo',
      number: '04',
      icon: 'Briefcase',
      shortDescription:
        'Cumplimiento de obligaciones legales: representación legal, domicilio fiscal y constitución de empresas.',
      bullets: [
        { text: 'Constitución de sociedades' },
        { text: 'Representación legal y tributaria' },
        { text: 'Provisión de domicilio fiscal' },
        { text: 'Gestión de trámites ante entes de control' },
        { text: 'Soporte administrativo integral' },
      ],
      order: 4,
    },
    {
      title: 'Revisiones Especiales',
      slug: 'revisiones-especiales',
      number: '05',
      icon: 'MagnifyingGlass',
      shortDescription:
        'Auditorías internas y revisiones de procesos contables, estados financieros y cumplimiento fiscal.',
      bullets: [
        { text: 'Auditorías internas' },
        { text: 'Revisión de estados financieros' },
        { text: 'Evaluación de cumplimiento fiscal' },
        { text: 'Diagnóstico de procesos contables' },
        { text: 'Recomendaciones de mejora' },
      ],
      order: 5,
    },
    {
      title: 'Legal e Impuestos',
      slug: 'legal-impuestos',
      number: '06',
      icon: 'Scales',
      shortDescription:
        'Planificación fiscal, recuperación de impuestos (IR, IVA, ISD) y asesoría tributaria personalizada.',
      bullets: [
        { text: 'Planificación tributaria estratégica' },
        { text: 'Recuperación de IR, IVA e ISD' },
        { text: 'Asesoría en normativa SRI' },
        { text: 'Declaraciones tributarias mensuales y anuales' },
        { text: 'Defensa en procesos de determinación tributaria' },
      ],
      order: 6,
    },
  ]

  for (const s of services) {
    const existing = await payload.find({
      collection: 'services',
      where: { slug: { equals: s.slug } },
      limit: 1,
    })
    if (existing.docs[0]) {
      await payload.update({ collection: 'services', id: existing.docs[0].id, data: s as any })
      console.log(`  ↻ updated: ${s.title}`)
    } else {
      await payload.create({ collection: 'services', data: s as any })
      console.log(`  + created: ${s.title}`)
    }
  }

  console.log('→ Seeding Industries...')
  const industries = [
    {
      title: 'Farmacéutica',
      slug: 'farmaceutica',
      icon: 'Flask',
      descriptionLong:
        'En el sector farmacéutico, nuestro enfoque está en la optimización de procesos contables y financieros para garantizar el cumplimiento normativo en un entorno altamente regulado. Aportamos con la consolidación de operaciones, la gestión eficiente de costos y el análisis financiero que permite a las empresas tomar decisiones estratégicas para su crecimiento y sostenibilidad.',
      descriptionShort:
        'En el sector farmacéutico, nuestro enfoque está en la optimización de procesos contables y financieros para garantizar el cumplimiento normativo en un entorno altamente regulado. Aportamos con la consolidación de operaciones, la gestión eficiente de costos y el análisis financiero que permite tomar decisiones estratégicas.',
      services: [
        { text: 'Consolidación de operaciones contables' },
        { text: 'Gestión de costos regulados' },
        { text: 'Cumplimiento normativo sectorial' },
        { text: 'Reportes financieros para auditorías' },
      ],
      order: 1,
    },
    {
      title: 'Comercial',
      slug: 'comercial',
      icon: 'ShoppingCart',
      descriptionLong:
        'Entendemos que la dinámica del sector comercial requiere agilidad y control financiero. Nos enfocamos en mejorar la eficiencia operativa mediante una gestión contable integral, optimización de flujos de caja y control de inventarios. Aportamos soluciones que permiten mantener la rentabilidad y adaptarse rápidamente a los cambios del mercado.',
      descriptionShort:
        'Entendemos que la dinámica del sector comercial requiere agilidad y control financiero. Nos enfocamos en mejorar la eficiencia operativa mediante gestión contable integral, optimización de flujos de caja y control de inventarios.',
      services: [
        { text: 'Gestión contable integral' },
        { text: 'Optimización de flujos de caja' },
        { text: 'Control de inventarios' },
        { text: 'Análisis de rentabilidad' },
      ],
      order: 2,
    },
    {
      title: 'Legal',
      slug: 'legal',
      icon: 'Scales',
      descriptionLong:
        'En el ámbito legal, nuestro objetivo es proporcionar una base financiera sólida que respalde la gestión jurídica. Aportamos servicios de asesoría contable y tributaria que facilitan la constitución de sociedades, el manejo de obligaciones fiscales y la gestión financiera de firmas legales.',
      descriptionShort:
        'En el ámbito legal, nuestro objetivo es proporcionar una base financiera sólida que respalde la gestión jurídica. Aportamos con asesoría contable y tributaria que facilita la constitución de sociedades y la gestión de obligaciones fiscales.',
      services: [
        { text: 'Asesoría contable para firmas legales' },
        { text: 'Constitución de sociedades' },
        { text: 'Manejo de obligaciones fiscales' },
        { text: 'Soporte administrativo eficiente' },
      ],
      order: 3,
    },
    {
      title: 'Educación',
      slug: 'educacion',
      icon: 'GraduationCap',
      descriptionLong:
        'Para el sector educativo, nos enfocamos en la gestión eficiente de recursos financieros y administrativos. Aportamos soluciones para el manejo de nómina, el cumplimiento de regulaciones fiscales y la planificación financiera, apoyando a las instituciones en su misión educativa.',
      descriptionShort:
        'Para el sector educativo, nos enfocamos en la gestión eficiente de recursos financieros y administrativos: nómina, cumplimiento fiscal y planificación financiera, apoyando la misión educativa de las instituciones.',
      services: [
        { text: 'Gestión de nómina institucional' },
        { text: 'Cumplimiento tributario educativo' },
        { text: 'Planificación financiera' },
        { text: 'Control presupuestario' },
      ],
      order: 4,
    },
    {
      title: 'Otros Sectores',
      slug: 'otros-sectores',
      icon: 'DotsThreeCircle',
      descriptionLong:
        'Nuestro enfoque en otros sectores se basa en la adaptabilidad y personalización. Aportamos soluciones contables, financieras y legales diseñadas para responder a las necesidades específicas de cada industria, ayudando a optimizar procesos, reducir riesgos y potenciar el crecimiento empresarial.',
      descriptionShort:
        'Nuestro enfoque en otros sectores se basa en la adaptabilidad y personalización. Aportamos soluciones contables, financieras y legales diseñadas para responder a las necesidades específicas de cada industria.',
      services: [
        { text: 'Diagnóstico financiero personalizado' },
        { text: 'Implementación de controles' },
        { text: 'Asesoría tributaria especializada' },
        { text: 'Acompañamiento continuo' },
      ],
      order: 5,
    },
  ]

  for (const ind of industries) {
    const existing = await payload.find({
      collection: 'industries',
      where: { slug: { equals: ind.slug } },
      limit: 1,
    })
    if (existing.docs[0]) {
      await payload.update({ collection: 'industries', id: existing.docs[0].id, data: ind as any })
      console.log(`  ↻ updated: ${ind.title}`)
    } else {
      await payload.create({ collection: 'industries', data: ind as any })
      console.log(`  + created: ${ind.title}`)
    }
  }

  console.log('→ Seeding Team (Patricia — founder)...')
  const patricia = {
    name: 'Ing. Patricia Rojas Túquerrez',
    role: 'Gerente General · Fundadora',
    isFounder: true,
    bio: lexDoc([
      'Con más de 20 años de experiencia en el ámbito de la contabilidad e impuestos, ha trabajado en diversas empresas multinacionales y nacionales de renombre. Su experiencia abarca la industria farmacéutica, servicios y comercial.',
      'En el sector farmacéutico, se destacó como Fact Leader en un proyecto de consolidación y estabilización de procesos a la tercerización contable en el exterior. Su liderazgo se ha destacado en la planificación, dirección y coordinación de actividades contables y financieras.',
      'Ha manejado con eficacia la relación con clientes internos y externos, consolidando procesos contables a nivel internacional e implementando avanzados sistemas de gestión.',
    ]),
    credentials: [
      {
        icon: 'GraduationCap',
        label: 'Formación',
        value: 'Ing. Comercial, Especialización Contabilidad y Auditoría',
        sub: 'Universidad Politécnica Salesiana',
      },
      {
        icon: 'Certificate',
        label: 'Postgrado',
        value: 'Maestría en Tributación',
        sub: 'Universidad Andina Simón Bolívar',
      },
      {
        icon: 'Desktop',
        label: 'Sistemas',
        value: 'SAP · ERP · NIIF · Normativa SRI',
        sub: 'Certificaciones internacionales',
      },
    ],
    shortCredentials: [
      { text: 'Ing. Comercial — Univ. Politécnica Salesiana' },
      { text: 'Maestría en Tributación — Univ. Simón Bolívar' },
      { text: 'SAP · ERP · Normativa NIIF' },
    ],
    linkedin: 'https://www.linkedin.com/in/atenea-outsourcing-b0a850326/',
    order: 1,
  }

  const existingFounder = await payload.find({
    collection: 'team',
    where: { isFounder: { equals: true } },
    limit: 1,
  })
  if (existingFounder.docs[0]) {
    await payload.update({ collection: 'team', id: existingFounder.docs[0].id, data: patricia as any })
    console.log('  ↻ updated founder')
  } else {
    await payload.create({ collection: 'team', data: patricia as any })
    console.log('  + created founder')
  }

  console.log('→ Seeding Navigation global...')
  await payload.updateGlobal({
    slug: 'navigation',
    data: {
      items: [
        { label: 'Nosotros', href: '/nosotros' },
        { label: 'Servicios', href: '/servicios' },
        { label: 'Industrias', href: '/industrias' },
        { label: 'Noticias', href: '/noticias' },
        { label: 'Contacto', href: '/contacto' },
      ],
      ctaLabel: 'Contáctanos',
      ctaHref: '/contacto',
      portalLabel: 'Acceso Clientes',
      portalHref: '/portal',
      footerCompanyItems: [
        { label: 'Nosotros', href: '/nosotros' },
        { label: 'Industrias', href: '/industrias' },
        { label: 'Noticias', href: '/noticias' },
        { label: 'Contacto', href: '/contacto' },
        { label: 'Política de privacidad', href: '/politica-de-privacidad' },
      ],
    } as any,
  })
  console.log('  ↻ navigation saved')

  console.log('→ Seeding SiteSettings global...')
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'Atenea Outsourcing',
      tagline: 'Consultoría Contable y Financiera',
      phone: '(+593) 999 828 903',
      email: 'info@atenea-outsourcing.com',
      emailSecondary: 'patricia.rojas@atenea-outsourcing.com',
      address:
        'Alfonso Pereira E4-39 y Jorge Drom,\nEdificio de Oficinas Iñaquito II.\nQuito – Ecuador',
      whatsappNumber: '593999828903',
      instagram: 'https://www.instagram.com/ateneaoutsourcing',
      linkedin: 'https://www.linkedin.com/in/atenea-outsourcing-b0a850326/',
      metaDescription:
        'Firma especializada en contabilidad, finanzas y tributación con más de 20 años de trayectoria en Ecuador y Latinoamérica.',

      // Paginas interiores
      servicesPageEyebrow: 'Lo que ofrecemos',
      servicesPageTitle: 'Nuestros Servicios',
      servicesPageDescription:
        'Soluciones integrales en contabilidad, finanzas y cumplimiento tributario, diseñadas para agregar valor real a tu empresa.',
      servicesCardLinkLabel: 'Ver detalle',
      servicesCtaTitle: '¿No estás seguro qué servicio necesitas?',
      servicesCtaDescription: 'Contáctanos y te orientamos sin compromiso.',
      servicesCtaLabel: 'Hablar con un experto',
      servicesCtaHref: '/contacto',
      serviceDetailBackLabel: 'Todos los servicios',
      serviceDetailIncludesTitle: '¿Qué incluye este servicio?',
      serviceDetailCtaTitle: '¿Te interesa este servicio?',
      serviceDetailCtaDescription:
        'Contáctanos y un experto te orientará sobre la mejor solución para tu empresa.',
      serviceDetailCtaLabel: 'Solicitar información',
      serviceDetailPhoneLabel: 'Llámanos',
      serviceDetailMoreLabel: 'También ofrecemos',
      serviceDetailMoreLinkLabel: 'Ver todos los servicios',
      industriesPageEyebrow: 'Sectores',
      industriesPageTitle: 'Experiencia en Industrias',
      industriesPageDescription:
        'Profesionales altamente especializados que ofrecen soluciones en múltiples sectores económicos de Ecuador y Latinoamérica.',
      industriesCtaEyebrow: '¿Tu sector?',
      industriesCtaTitle: '¿Tu industria no está en la lista?',
      industriesCtaDescription:
        'Trabajamos con cualquier sector empresarial. Contáctanos y diseñamos la solución correcta para ti.',
      industriesCtaLabel: 'Hablemos',
      industriesCtaHref: '/contacto',
      newsPageEyebrow: 'Actualidad',
      newsPageTitle: 'Noticias y Artículos',
      newsPageDescription:
        'Análisis, guías y novedades sobre el entorno tributario, contable y financiero en Ecuador y Latinoamérica.',
      newsEmptyTitle: 'Noticias',
      newsEmptyText: 'Aún no hay noticias publicadas. Vuelve pronto.',
      newsReadLabel: 'Leer artículo',
      newsReadMoreLabel: 'Leer más',
      newsDetailBackLabel: 'Todas las noticias',
      newsDetailCtaTitle: '¿Necesitas asesoría?',
      newsDetailCtaDescription:
        'Nuestro equipo puede orientarte sobre cómo estos cambios afectan a tu empresa específicamente.',
      newsDetailCtaLabel: 'Consultar ahora',
      newsDetailContactLabel: 'Contacto directo',
      newsDetailMoreLabel: 'Ver más artículos',
      newsDetailBackToListLabel: 'Volver al listado de noticias',
      contactPageEyebrow: 'Ponte en contacto',
      contactPageTitle: 'Contáctanos',
      contactPageDescription:
        'Estamos aqui para responder tus preguntas y escuchar tus necesidades. Escribenos o llamanos.',
      contactInfoTitle: 'Información de contacto',
      contactAddressLabel: 'Dirección',
      contactPhoneLabel: 'Teléfono',
      contactEmailLabel: 'Correo',
      contactSocialLabel: 'Redes sociales',
      contactFormTitle: 'Envíanos un mensaje',
      privacyEyebrow: 'Legal',
      privacyTitle: 'Política de Privacidad',
      privacyIntro:
        'En Atenea Outsourcing, nos comprometemos a proteger la privacidad de los datos personales que nos confían.',
      privacySections: [
        {
          title: 'Datos que recopilamos',
          text: 'Al utilizar nuestro formulario de contacto, recopilamos nombre completo, correo electrónico, teléfono opcional y contenido del mensaje.',
        },
        {
          title: 'Finalidad del tratamiento',
          text: 'Los datos se utilizan exclusivamente para responder a consultas y enviar informacion relevante sobre nuestros servicios cuando corresponda.',
        },
        {
          title: 'Conservación de datos',
          text: 'Los datos se conservan durante el tiempo necesario para cumplir con la finalidad para la que fueron recopilados.',
        },
        {
          title: 'Derechos del titular',
          text: 'El titular puede solicitar acceso, rectificación, cancelación u oposición escribiendo al correo principal del sitio.',
        },
        {
          title: 'Seguridad',
          text: 'Aplicamos medidas técnicas y organizativas adecuadas para proteger los datos contra accesos no autorizados.',
        },
      ],
      privacyUpdatedAtLabel: 'Última actualización: abril 2025',

      // Hero
      heroBadge: 'Consultoría Contable & Financiera',
      heroTitle: 'Sabiduría frente a los {highlight} empresariales',
      heroHighlight: 'desafíos',
      heroSubtitle: 'En Atenea, simplificamos lo complejo para que tú te enfoques en crecer.',
      heroMediaMode: 'video',
      heroVideoSrc: '/media/hero-atenea.mp4',
      heroPosterSrc: '/media/hero-atenea-poster.jpg',
      heroOverlayOpacity: 0.3,
      heroShowFinancialOverlay: true,
      heroCtaPrimaryLabel: 'Nuestros Servicios',
      heroCtaPrimaryHref: '/servicios',
      heroCtaSecondaryLabel: 'Contáctanos',
      heroCtaSecondaryHref: '/contacto',
      heroEspecialidades: [
        { text: 'Contabilidad' },
        { text: 'Tributación' },
        { text: 'Nómina' },
        { text: 'Tesorería' },
        { text: 'Legal' },
      ],
      heroCredits: [{ text: 'NIIF' }, { text: 'SRI' }, { text: 'SAP' }, { text: 'ERP' }],

      // Stats
      stats: [
        { value: '+20', label: 'Años de experiencia', detail: 'Fundada en 2003' },
        { value: '+5', label: 'Líneas de servicio', detail: 'Especializadas' },
        { value: '99%', label: 'Satisfacción', detail: 'De nuestros clientes' },
      ],

      // Quienes somos
      quienesSomosText:
        'Firma especializada en soluciones integrales de contabilidad, finanzas y tributación con más de dos décadas de trayectoria.',
      valores: [
        {
          title: 'Excelencia',
          description:
            'Estándares de calidad superiores en cada entregable, con procesos auditables y resultados verificables.',
          imageUrl:
            '/media/images/quienes-excelencia.png',
        },
        {
          title: 'Confidencialidad',
          description:
            'Tratamiento seguro y estricto de la información financiera de cada cliente.',
          imageUrl:
            '/media/images/quienes-confidencialidad.png',
        },
        {
          title: 'Compromiso',
          description: 'Relaciones de largo plazo basadas en resultados reales y confianza mutua.',
          imageUrl:
            '/media/images/quienes-compromiso.png',
        },
        {
          title: 'Innovación',
          description:
            'Actualización permanente ante cambios normativos y avances tecnológicos del sector.',
          imageUrl:
            '/media/images/quienes-innovacion.png',
        },
      ],

      // Razones
      razonesTitle: 'Permítenos formar parte del\ncrecimiento de tu empresa',
      razones: [
        {
          icon: 'ArrowsLeftRight',
          title: 'Flexibilidad',
          description:
            'Adaptamos nuestros servicios a las necesidades específicas de cada cliente y su industria.',
        },
        {
          icon: 'Clock',
          title: 'Oportunidad',
          description:
            'Entregamos resultados en los tiempos acordados, garantizando cumplimiento de plazos legales.',
        },
        {
          icon: 'Lightbulb',
          title: 'Soluciones',
          description:
            'Enfoque en resolver problemas reales con estrategias prácticas y efectivas.',
        },
        {
          icon: 'Lock',
          title: 'Confidencialidad',
          description:
            'Manejo estricto y seguro de la información financiera de nuestros clientes.',
        },
        {
          icon: 'Handshake',
          title: 'Compromiso',
          description:
            'Relación de largo plazo basada en confianza mutua y resultados verificables.',
        },
      ],

      // Fundadora home
      fundadoraBioShort: [
        {
          text: 'Con más de 20 años de experiencia en contabilidad e impuestos, ha trabajado en diversas empresas multinacionales y nacionales. Su experiencia abarca las industrias farmacéutica, servicios y comercial.',
        },
        {
          text: 'Destacada como Fact Leader en proyectos de consolidación contable internacional. Su liderazgo se evidencia en la planificación y coordinación de actividades financieras garantizando el cumplimiento normativo.',
        },
      ],

      // Nosotros
      nosotrosMissionTitle: 'Simplicidad al servicio de tu crecimiento',
      nosotrosMissionParagraphs: [
        {
          text: 'Somos consultores contables financieros independientes, especializados en ofrecer servicios de asesoría y consultoría en contabilidad-finanzas, nómina e impuestos.',
        },
        {
          text: 'Nos capacitamos y actualizamos de manera continua para proporcionar a nuestros clientes un servicio personalizado y de alta calidad, acompañando el crecimiento de sus empresas en el sector financiero de Ecuador y Latinoamérica.',
        },
      ],
      nosotrosValores: [
        { title: 'Excelencia', desc: 'Estándares de calidad superiores en cada entregable.' },
        {
          title: 'Confidencialidad',
          desc: 'Tratamiento seguro y estricto de la información financiera.',
        },
        {
          title: 'Compromiso',
          desc: 'Relaciones de largo plazo basadas en resultados reales.',
        },
        {
          title: 'Innovación',
          desc: 'Actualización permanente ante cambios normativos y tecnológicos.',
        },
      ],
      fundadoraBioLong: [
        {
          text: 'Con más de 20 años de experiencia en el ámbito de la contabilidad e impuestos, ha trabajado en diversas empresas multinacionales y nacionales de renombre. Su experiencia abarca la industria farmacéutica, servicios y comercial.',
        },
        {
          text: 'En el sector farmacéutico, se destacó como Fact Leader en un proyecto de consolidación y estabilización de procesos a la tercerización contable en el exterior. Su liderazgo se ha destacado en la planificación, dirección y coordinación de actividades contables y financieras.',
        },
        {
          text: 'Ha manejado con eficacia la relación con clientes internos y externos, consolidando procesos contables a nivel internacional e implementando avanzados sistemas de gestión.',
        },
      ],

      // Footer
      footerDescription: 'Simplificamos lo complejo para que tú te enfoques en crecer.',
      footerPreCtaEyebrow: 'Empieza hoy',
      footerPreCtaTitle: '¿Listo para simplificar tu contabilidad?',
      footerPreCtaLabel: 'Hablar con un experto',
    } as any,
  })
  console.log('  ↻ site-settings saved')

  console.log('\n✓ Seed completed.')
  process.exit(0)
}

main().catch((err) => {
  console.error('✗ Seed failed:', err)
  process.exit(1)
})
