import { MetadataRoute } from 'next'

// هذا السطر يحل مشكلة الـ Build في Vercel نهائياً
export const dynamic = 'force-dynamic'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://jadauto.ca',
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://jadauto.ca/inventory',
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ]
}