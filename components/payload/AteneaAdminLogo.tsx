import React from 'react'
import Image from 'next/image'

export function AteneaAdminLogo() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '4px 0 22px' }}>
      <Image
        src="/logo.png"
        alt="Atenea Outsourcing"
        width={280}
        height={120}
        style={{
          display: 'block',
          height: 58,
          maxWidth: 180,
          objectFit: 'contain',
          opacity: 0.92,
          width: 'auto',
        }}
      />
    </div>
  )
}
