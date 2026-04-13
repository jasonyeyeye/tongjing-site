import { locales, type Locale } from '../utils/i18n';

export interface Brand {
  id: string;
  slug: string;
  name: Record<Locale, string>;
  tagline: Record<Locale, string>;
  description: Record<Locale, string>;
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
      zh: '同晶',
      ja: '同晶',
      de: 'TongJing',
    },
    tagline: {
      en: 'Japanese Quality Heritage',
      zh: '日系品质基因',
      ja: '日系品質を受け継ぐ',
      de: 'Japanische Qualitätstradition',
    },
    description: {
      en: 'Professional crystal resonator manufacturer with 30 years of expertise, inheriting Japanese quality standards.',
      zh: '专注晶振30年，传承日系品质理念的国家高新技术企业。',
      ja: '水晶振動子30年の実績を受け継ぐ、日系品質の専門メーカー。',
      de: 'Professioneller Kristalloszillator-Hersteller mit 30 Jahren Erfahrung und japanischer Qualitätstradition.',
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
