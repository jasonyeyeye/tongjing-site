export const locale = 'en';

export function useTranslations() {
  return {
    nav: {
      home: 'Home',
      brands: 'Brands',
      products: 'Products',
      tools: 'Selection Tools',
      about: 'About Us',
      contact: 'Contact',
      news: 'News',
    },
    hero: {
      title: 'Leading Chinese Electronics Brands, Global Quality Standards',
      subtitle: 'China NewChip connects you with top-tier electronic component manufacturers in China — semiconductors, crystal resonators, oscillators, and more — serving clients in 50+ countries',
      cta: 'Explore Products',
      ctaSecondary: 'Contact Us',
    },
    product: {
      title: 'Electronic Components & Chips',
      resonators: 'Crystal Resonators',
      oscillators: 'Crystal Oscillators',
      rtc: 'RTC Modules',
      viewDetail: 'View Details',
      parameters: 'Specifications',
      filter: 'Filter',
      sort: 'Sort',
      stock: 'Stock',
      price: 'Price',
      search: 'Search products, brands, or part numbers...',
      resultCount: '{count} products found',
    },
    about: {
      title: 'About China NewChip',
      subtitle: 'Your Gateway to High-Quality Chinese Electronics Brands',
      intro: 'China NewChip is a professional platform promoting Chinese electronic components and semiconductor brands globally. We partner with leading manufacturers to deliver certified, high-quality electronic parts at competitive prices.',
      strengths: {
        automation: {
          title: 'Smart Manufacturing',
          desc: 'State-of-the-art automated production lines with 100M+ monthly capacity',
        },
        quality: {
          title: 'Certified Quality',
          desc: 'ISO9001, ISO14001, AEC-Q100 certified products meeting international standards',
        },
        direct: {
          title: 'Direct from Manufacturer',
          desc: 'No middlemen — factory-direct pricing and supply chain transparency',
        },
        capacity: {
          title: 'Global Distribution',
          desc: 'Serving 50+ countries with reliable logistics and technical support',
        },
      },
      certifications: {
        title: 'Certifications & Standards',
        items: ['ISO9001:2015', 'ISO14001', 'RoHS', 'REACH', 'AEC-Q100', 'AEC-Q200', 'Halogen Free'],
      },
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'Get Expert Technical Support & Custom Solutions',
      phone: 'Phone',
      email: 'Email',
      address: 'Headquarters',
      hours: 'Business Hours',
      offices: {
        title: 'Global Offices',
        shenzhen: 'Shenzhen R&D Center',
        jiangsu: 'Suzhou Sales Office',
      },
      mapPlaceholder: 'Map Location',
    },
    news: {
      title: 'Industry News & Insights',
      categories: {
        all: 'All',
        tech: 'Technical Articles',
        industry: 'Industry News',
        company: 'Company Updates',
      },
    },
    inquiry: {
      title: 'Send Inquiry',
      name: 'Full Name',
      company: 'Company Name',
      email: 'Business Email',
      phone: 'Phone Number',
      products: 'Products of Interest',
      message: 'Your Requirements',
      submit: 'Submit Inquiry',
    },
    footer: {
      address: 'Address',
      email: 'Email',
      phone: 'Phone',
      copyright: '© 2026 China NewChip Electronics. All rights reserved.',
    },
    filter: {
      brandComparison: 'Compare Brands',
      reset: 'Reset Filters',
      apply: 'Apply Filters',
    },
    seo: {
      title: 'China NewChip - Electronic Components & Chinese Chip Brands Platform',
      description: 'Discover leading Chinese electronics brands and electronic components. Sourcing high-quality semiconductors, crystal resonators, oscillators from certified manufacturers in China. Global shipping available.',
    },
  };
}
