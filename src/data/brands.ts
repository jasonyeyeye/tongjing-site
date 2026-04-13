export interface Brand {
  id: string;
  slug: string;
  name: Record<string, string>;
  tagline: Record<string, string>;
  description: Record<string, string>;
  logo?: string;
  primaryColor: string;
  website?: string;
}

export const brands: Brand[] = [
  {
    id: 'tongjing',
    slug: 'tongjing',
    name: {
      en: 'TongJing',
    },
    tagline: {
      en: 'Japanese Quality Heritage',
    },
    description: {
      en: 'Professional crystal resonator manufacturer with 30 years of expertise, inheriting Japanese quality standards.',
    },
    primaryColor: '#2563EB',
    website: 'https://chinanewchip.com',
  },
];

export function getBrand(idOrSlug: string): Brand | undefined {
  return brands.find(b => b.id === idOrSlug || b.slug === idOrSlug);
}

export function getBrandBySlug(slug: string): Brand | undefined {
  return brands.find(b => b.slug === slug);
}

export function getAllBrands(): Brand[] {
  return brands;
}
