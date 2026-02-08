import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://jadauto.ca',
      lastModified: new Date(),
    },
    {
      url: 'https://jadauto.ca/inventory',
      lastModified: new Date(),
    },
  ]
}