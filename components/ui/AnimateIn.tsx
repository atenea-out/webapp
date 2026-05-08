'use client'

import { useRef, useEffect, useState } from 'react'
import { clsx } from 'clsx'

type AnimateInProps = {
  children: React.ReactNode
  delay?: number
  className?: string
  threshold?: number
}

export function AnimateIn({
  children,
  delay = 0,
  className,
  threshold = 0.12,
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect() }
      },
      { threshold },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={clsx('reveal', visible && 'is-visible', className)}
    >
      {children}
    </div>
  )
}
