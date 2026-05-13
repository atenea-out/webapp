import React from 'react'

const quickLinks = [
  { href: '/admin/globals/site-settings', label: 'Landing y ajustes' },
  { href: '/admin/globals/navigation', label: 'Navegación' },
  { href: '/admin/collections/services', label: 'Servicios' },
  { href: '/admin/collections/media', label: 'Media' },
]

export function AteneaDashboardIntro() {
  return (
    <section
      style={{
        border: '1px solid rgba(255,255,255,0.08)',
        marginBottom: 24,
        padding: '20px 22px',
      }}
    >
      <div
        style={{
          alignItems: 'flex-start',
          display: 'flex',
          gap: 18,
          justifyContent: 'space-between',
        }}
      >
        <div>
          <p
            style={{
              color: 'rgba(239, 98, 94, 0.9)',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.16em',
              margin: '0 0 8px',
              textTransform: 'uppercase',
            }}
          >
            Panel Atenea
          </p>
          <h1
            style={{
              color: 'rgba(255,255,255,0.88)',
              fontSize: 22,
              fontWeight: 500,
              lineHeight: 1.25,
              margin: '0 0 8px',
            }}
          >
            Gestión de contenido del sitio corporativo
          </h1>
          <p
            style={{
              color: 'rgba(255,255,255,0.54)',
              fontSize: 13,
              lineHeight: 1.65,
              margin: 0,
              maxWidth: 680,
            }}
          >
            Actualiza textos, servicios, industrias, noticias e imágenes manteniendo consistencia
            editorial.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            flexShrink: 0,
            flexWrap: 'wrap',
            gap: 8,
            justifyContent: 'flex-end',
            maxWidth: 430,
          }}
        >
          {quickLinks.map((link) => (
            <a
              href={link.href}
              key={link.href}
              style={{
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'rgba(255,255,255,0.72)',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.06em',
                padding: '9px 11px',
                textDecoration: 'none',
                textTransform: 'uppercase',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
