import React from 'react'
import Link from 'next/link'

export function AteneaLogoutButton() {
  return (
    <Link
      href="/admin/logout"
      style={{
        alignItems: 'center',
        background: 'rgba(255, 255, 255, 0.035)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: 2,
        color: 'rgba(255, 255, 255, 0.68)',
        display: 'flex',
        fontSize: 12,
        fontWeight: 600,
        gap: 11,
        justifyContent: 'center',
        letterSpacing: '0.08em',
        margin: '16px 20px 18px',
        minHeight: 42,
        padding: '0 14px',
        textDecoration: 'none',
        textTransform: 'uppercase',
      }}
    >
      <span
        aria-hidden="true"
        style={{
          alignItems: 'center',
          background: 'rgba(239, 98, 94, 0.12)',
          border: '1px solid rgba(239, 98, 94, 0.34)',
          borderRadius: '999px',
          display: 'inline-flex',
          height: 22,
          justifyContent: 'center',
          position: 'relative',
          width: 22,
        }}
      >
        <span
          style={{
            background: '#ef625e',
            borderRadius: 999,
            height: 8,
            left: 10,
            opacity: 0.95,
            position: 'absolute',
            top: 4,
            width: 2,
          }}
        />
        <span
          style={{
            border: '2px solid rgba(239, 98, 94, 0.9)',
            borderTopColor: 'transparent',
            borderRadius: '999px',
            height: 11,
            width: 11,
          }}
        />
      </span>
      Cerrar sesión
    </Link>
  )
}
