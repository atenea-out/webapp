import React from 'react'
import Link from 'next/link'

function ReturnIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M6.75 3.25L2 8l4.75 4.75"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.45"
      />
      <path
        d="M2.5 8H14"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.45"
      />
    </svg>
  )
}

export function AteneaLoginIntro() {
  return (
    <div style={{ margin: '0 0 26px' }}>
      <Link
        href="/"
        style={{
          alignItems: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          color: 'rgba(255, 255, 255, 0.66)',
          display: 'inline-flex',
          fontSize: 10.5,
          fontWeight: 700,
          gap: 10,
          justifyContent: 'space-between',
          letterSpacing: '0.12em',
          margin: '0 0 28px',
          minHeight: 44,
          padding: '0 2px',
          textDecoration: 'none',
          textTransform: 'uppercase',
          width: '100%',
        }}
      >
        <span style={{ alignItems: 'center', display: 'inline-flex', gap: 10 }}>
          <span
            style={{
              alignItems: 'center',
              color: 'rgba(239, 98, 94, 0.86)',
              display: 'inline-flex',
              height: 18,
              justifyContent: 'center',
              width: 18,
            }}
          >
            <ReturnIcon />
          </span>
          Volver al sitio corporativo
        </span>
      </Link>

      <div
        style={{
          borderLeft: '1px solid rgba(239, 98, 94, 0.72)',
          padding: '2px 0 2px 18px',
        }}
      >
        <p
          style={{
            color: 'rgba(239, 98, 94, 0.9)',
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.16em',
            margin: '0 0 10px',
            textTransform: 'uppercase',
          }}
        >
          Atenea Outsourcing CMS
        </p>
        <p
          style={{
            color: 'rgba(255, 255, 255, 0.66)',
            fontSize: 14,
            lineHeight: 1.7,
            margin: 0,
            maxWidth: 420,
          }}
        >
          Administra los contenidos corporativos de Atenea con consistencia, control y criterio.
        </p>
      </div>
      <button
        type="button"
        disabled
        aria-disabled="true"
        title="Disponible cuando se configure Microsoft Entra ID"
        style={{
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.055)',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          borderRadius: 2,
          color: 'rgba(255, 255, 255, 0.72)',
          cursor: 'not-allowed',
          display: 'inline-flex',
          fontSize: 12,
          fontWeight: 600,
          gap: 10,
          letterSpacing: '0.05em',
          marginTop: 18,
          minHeight: 42,
          opacity: 0.82,
          padding: '0 16px',
          textTransform: 'uppercase',
        }}
      >
        <span
          aria-hidden="true"
          style={{
            display: 'grid',
            gap: 1.5,
            gridTemplateColumns: 'repeat(2, 7px)',
          }}
        >
          <span style={{ background: '#f25022', height: 7, width: 7 }} />
          <span style={{ background: '#7fba00', height: 7, width: 7 }} />
          <span style={{ background: '#00a4ef', height: 7, width: 7 }} />
          <span style={{ background: '#ffb900', height: 7, width: 7 }} />
        </span>
        Acceso con Office 365
      </button>
    </div>
  )
}
