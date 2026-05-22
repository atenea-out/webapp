import {
  BookOpen,
  Users,
  CurrencyDollar,
  Briefcase,
  MagnifyingGlass,
  Scales,
  Flask,
  ShoppingCart,
  GraduationCap,
  DotsThreeCircle,
  Certificate,
  Desktop,
  ArrowsLeftRight,
  Clock,
  Lightbulb,
  Lock,
  Handshake,
  Barcode,
} from '@phosphor-icons/react/dist/ssr'
import type { Icon } from '@phosphor-icons/react'

/**
 * Map de strings del CMS → componentes Phosphor.
 * Los enums de los selects en Payload coinciden exactamente con las keys aquí.
 */
export const ICONS: Record<string, Icon> = {
  // Services
  BookOpen,
  Users,
  CurrencyDollar,
  Briefcase,
  MagnifyingGlass,
  Barcode,
  // Services + Industries
  Scales,
  // Industries
  Flask,
  ShoppingCart,
  GraduationCap,
  DotsThreeCircle,
  // Team credentials
  Certificate,
  Desktop,
  // Razones
  ArrowsLeftRight,
  Clock,
  Lightbulb,
  Lock,
  Handshake,
}

/**
 * Devuelve el componente de ícono o un fallback seguro.
 */
export function getIcon(name?: string | null): Icon {
  if (!name) return ICONS.DotsThreeCircle
  return ICONS[name] ?? ICONS.DotsThreeCircle
}
