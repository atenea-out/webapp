'use client'

import { useRef, useEffect, useState } from 'react'

type CountUpProps = {
  value: string   // e.g. "+20", "99%", "+5"
  className?: string
  style?: React.CSSProperties
}

function parse(raw: string) {
  const match = raw.match(/^([^0-9]*)(\d+)([^0-9]*)$/)
  if (!match) return { prefix: '', num: 0, suffix: raw }
  return { prefix: match[1], num: parseInt(match[2], 10), suffix: match[3] }
}

function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4)
}

export function CountUp({ value, className, style }: CountUpProps) {
  const { prefix, num, suffix } = parse(value)
  const ref              = useRef<HTMLSpanElement>(null)
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)

  // Trigger when element enters viewport
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Animate with requestAnimationFrame + easeOut
  useEffect(() => {
    if (!started || num === 0) return

    const duration = 1600
    const startTime = performance.now()

    let raf: number
    const animate = (now: number) => {
      const elapsed  = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased    = easeOutQuart(progress)

      setCount(Math.floor(eased * num))

      if (progress < 1) {
        raf = requestAnimationFrame(animate)
      } else {
        setCount(num)
      }
    }

    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [started, num])

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}{count}{suffix}
    </span>
  )
}
