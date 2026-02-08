import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://jadauto.ca',
      lastModified: new Date(),
      changeFrequency: 'daily', // نخبر جوجل أننا نحدث السيارات يومياً
      priority: 1,
    },
    {
      url: 'https://jadauto.ca/inventory',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: 'https://jadauto.ca/financing',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]
}