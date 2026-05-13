import {
  FacebookLogo,
  GlobeSimple,
  InstagramLogo,
  LinkedinLogo,
  TiktokLogo,
  WhatsappLogo,
  XLogo,
  YoutubeLogo,
} from '@phosphor-icons/react/dist/ssr'
import type { Icon } from '@phosphor-icons/react'
import type { SiteSetting } from '@/payload-types'

export type SocialPlatform =
  | 'facebook'
  | 'instagram'
  | 'linkedin'
  | 'tiktok'
  | 'website'
  | 'whatsapp'
  | 'x'
  | 'youtube'

export type NormalizedSocialLink = {
  Icon: Icon
  label: string
  platform: SocialPlatform
  url: string
}

const socialMeta: Record<SocialPlatform, { Icon: Icon; label: string }> = {
  facebook: { Icon: FacebookLogo, label: 'Facebook' },
  instagram: { Icon: InstagramLogo, label: 'Instagram' },
  linkedin: { Icon: LinkedinLogo, label: 'LinkedIn' },
  tiktok: { Icon: TiktokLogo, label: 'TikTok' },
  website: { Icon: GlobeSimple, label: 'Sitio web' },
  whatsapp: { Icon: WhatsappLogo, label: 'WhatsApp' },
  x: { Icon: XLogo, label: 'X' },
  youtube: { Icon: YoutubeLogo, label: 'YouTube' },
}

export function getSocialLinks(settings: SiteSetting): NormalizedSocialLink[] {
  const configured =
    settings.socialLinks
      ?.filter((item) => item.platform && item.url)
      .sort((a, b) => (a.order ?? 10) - (b.order ?? 10))
      .map((item) => {
        const platform = item.platform as SocialPlatform
        const meta = socialMeta[platform] ?? socialMeta.website

        return {
          Icon: meta.Icon,
          label: item.label || meta.label,
          platform,
          url: item.url,
        }
      }) ?? []

  if (configured.length > 0) return configured

  return [
    settings.instagram
      ? {
          Icon: socialMeta.instagram.Icon,
          label: socialMeta.instagram.label,
          platform: 'instagram' as const,
          url: settings.instagram,
        }
      : null,
    settings.linkedin
      ? {
          Icon: socialMeta.linkedin.Icon,
          label: socialMeta.linkedin.label,
          platform: 'linkedin' as const,
          url: settings.linkedin,
        }
      : null,
  ].filter(Boolean) as NormalizedSocialLink[]
}
