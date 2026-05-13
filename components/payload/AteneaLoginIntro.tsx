import React from 'react'

export function AteneaLoginIntro() {
  return (
    <div
      style={{
        borderLeft: '1px solid rgba(239, 98, 94, 0.72)',
        margin: '0 0 26px',
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
        <span
          style={{
            color: 'rgba(255, 255, 255, 0.38)',
            fontSize: 10,
            letterSpacing: '0.12em',
          }}
        >
          Próximamente
        </span>
      </button>
    </div>
  )
}
