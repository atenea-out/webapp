import React from 'react'
import Image from 'next/image'
import type { Payload } from 'payload'

type MediaAvatar = {
  alt?: string | null
  url?: string | null
}

type PayloadUser = {
  avatar?: MediaAvatar | number | string | null
  email?: string | null
  id?: number | string
  name?: string | null
}

type AteneaUserAvatarProps = {
  payload?: Payload
  user?: PayloadUser | null
}

function getInitials(user?: PayloadUser | null) {
  const source = user?.name || user?.email || 'Atenea'
  return source
    .split(/[.\s@_-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

async function getResolvedUserAvatar(user?: PayloadUser | null, payload?: Payload) {
  const avatar = user?.avatar

  if (typeof avatar === 'object' && avatar !== null) {
    return avatar
  }

  if (!payload || !user?.id) {
    return null
  }

  try {
    const resolvedUser = await payload.findByID({
      collection: 'users',
      id: user.id,
      depth: 1,
    })

    const resolvedAvatar = (resolvedUser as PayloadUser).avatar

    return typeof resolvedAvatar === 'object' && resolvedAvatar !== null ? resolvedAvatar : null
  } catch {
    return null
  }
}

export async function AteneaUserAvatar({ payload, user }: AteneaUserAvatarProps) {
  const avatar = await getResolvedUserAvatar(user, payload)
  const imageUrl = typeof avatar === 'object' && avatar !== null ? avatar.url : null
  const label = user?.name || user?.email || 'Usuario Atenea'

  if (imageUrl) {
    return (
      <Image
        src={imageUrl}
        alt={typeof avatar === 'object' && avatar?.alt ? avatar.alt : label}
        width={34}
        height={34}
        style={{
          border: '1px solid rgba(255, 255, 255, 0.22)',
          borderRadius: '999px',
          display: 'block',
          height: 34,
          objectFit: 'cover',
          width: 34,
        }}
      />
    )
  }

  return (
    <span
      aria-label={label}
      role="img"
      style={{
        alignItems: 'center',
        background: 'rgba(239, 98, 94, 0.16)',
        border: '1px solid rgba(239, 98, 94, 0.28)',
        borderRadius: '999px',
        color: 'rgba(255, 255, 255, 0.86)',
        display: 'inline-flex',
        fontSize: 11,
        fontWeight: 700,
        height: 34,
        justifyContent: 'center',
        letterSpacing: '0.08em',
        width: 34,
      }}
    >
      {getInitials(user)}
    </span>
  )
}
