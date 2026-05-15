import type { MetadataRoute } from 'next'
import { getSiteUrl } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const url = getSiteUrl()
  const now = new Date()
  const legalRoutes = [
    '/legal',
    '/legal/privacy',
    '/legal/terms',
    '/legal/dpa',
    '/legal/cookies',
    '/legal/acceptable-use',
    '/legal/security',
    '/legal/dpdp',
    '/legal/eu-privacy',
    '/legal/sub-processors',
    '/ai-transparency',
  ]

  return [
    {
      url,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...legalRoutes.map((route) => ({
      url: `${url}${route}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
