// Internationalization utility
// Supports: en (default), zh, ja, ko, de

export type Locale = 'en' | 'zh' | 'ja' | 'ko' | 'de';

export const locales: { code: Locale; name: string; nativeName: string }[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
];

// Get locale from cookie or default to 'en'
export function getLocale(): Locale {
  if (typeof document !== 'undefined') {
    const match = document.cookie.match(/locale=([^;]+)/);
    if (match) {
      const lang = match[1] as Locale;
      if (locales.some(l => l.code === lang)) return lang;
    }
  }
  return 'en';
}

// Set locale cookie
export function setLocale(locale: Locale) {
  if (typeof document !== 'undefined') {
    document.cookie = `locale=${locale};path=/;max-age=31536000`;
  }
}

// Translations for all locales
type TranslationKeys = {
  nav: Record<string, string>;
  hero: Record<string, string>;
  product: Record<string, string>;
  about: Record<string, string>;
  contact: Record<string, string>;
  news: Record<string, string>;
  inquiry: Record<string, string>;
  footer: Record<string, string>;
  filter: Record<string, string>;
  seo: Record<string, string>;
  common: Record<string, string>;
};

const translations: Record<Locale, TranslationKeys> = {
  en: {
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
    common: {
      loading: 'Loading...',
      noResults: 'No results found',
      backToTop: 'Back to top',
      learnMore: 'Learn More',
      viewAll: 'View All',
    },
  },
  zh: {
    nav: {
      home: '首页',
      brands: '品牌',
      products: '产品',
      tools: '选型工具',
      about: '关于我们',
      contact: '联系我们',
      news: '新闻资讯',
    },
    hero: {
      title: '中国领先电子品牌，全球品质标准',
      subtitle: '中国芯平台为您连接中国顶级电子元器件制造商 — 半导体、石英晶体谐振器、振荡器等 — 服务全球50+国家客户',
      cta: '浏览产品',
      ctaSecondary: '联系我们',
    },
    product: {
      title: '电子元器件与芯片',
      resonators: '石英晶体谐振器',
      oscillators: '石英晶体振荡器',
      rtc: 'RTC模块',
      viewDetail: '查看详情',
      parameters: '规格参数',
      filter: '筛选',
      sort: '排序',
      stock: '库存',
      price: '价格',
      search: '搜索产品、品牌或型号...',
      resultCount: '共 {count} 个产品',
    },
    about: {
      title: '关于中国芯',
      subtitle: '您的优质中国电子产品门户',
      intro: '中国芯是专业推广中国电子元器件和半导体品牌的全球平台。我们与领先制造商合作，提供认证、高品质的电子元器件，价格有竞争力。',
      strengths: {
        automation: {
          title: '智能制造',
          desc: '先进的自动化生产线，月产能超1亿只',
        },
        quality: {
          title: '品质认证',
          desc: 'ISO9001、ISO14001、AEC-Q100认证产品，符合国际标准',
        },
        direct: {
          title: '原厂直供',
          desc: '无中间商，工厂直接定价，供应链透明',
        },
        capacity: {
          title: '全球分销',
          desc: '服务50+国家，可靠物流和技术支持',
        },
      },
      certifications: {
        title: '认证与标准',
        items: ['ISO9001:2015', 'ISO14001', 'RoHS', 'REACH', 'AEC-Q100', 'AEC-Q200', 'Halogen Free'],
      },
    },
    contact: {
      title: '联系我们',
      subtitle: '获取专业技术支持与定制方案',
      phone: '电话',
      email: '邮箱',
      address: '总部地址',
      hours: '营业时间',
      offices: {
        title: '全球办公室',
        shenzhen: '深圳研发中心',
        jiangsu: '苏州销售办公室',
      },
      mapPlaceholder: '地图位置',
    },
    news: {
      title: '行业动态与资讯',
      categories: {
        all: '全部',
        tech: '技术文章',
        industry: '行业新闻',
        company: '公司动态',
      },
    },
    inquiry: {
      title: '发送询价',
      name: '姓名',
      company: '公司名称',
      email: '商务邮箱',
      phone: '电话号码',
      products: '感兴趣的产品',
      message: '您的需求',
      submit: '提交询价',
    },
    footer: {
      address: '地址',
      email: '邮箱',
      phone: '电话',
      copyright: '© 2026 中国芯电子有限公司. 保留所有权利.',
    },
    filter: {
      brandComparison: '品牌对比',
      reset: '重置筛选',
      apply: '应用筛选',
    },
    seo: {
      title: '中国芯 - 电子元器件与中国芯片品牌平台',
      description: '发现领先的中国电子品牌和电子元器件。从中国认证制造商采购高品质半导体、石英晶体谐振器、振荡器。支持全球发货。',
    },
    common: {
      loading: '加载中...',
      noResults: '未找到结果',
      backToTop: '返回顶部',
      learnMore: '了解更多',
      viewAll: '查看全部',
    },
  },
  ja: {
    nav: {
      home: 'ホーム',
      brands: 'ブランド',
      products: '製品',
      tools: '選定ツール',
      about: '会社概要',
      contact: 'お問い合わせ',
      news: 'ニュース',
    },
    hero: {
      title: '中国トップ電子ブランド、グローバル品質基準',
      subtitle: '中国芯プラットフォームは中国 최고의電子部品メーカーとお客様を繋ぎます — 半導体、水晶振動子、発振器など — 50か国以上でサービス提供',
      cta: '製品を見る',
      ctaSecondary: 'お問い合わせ',
    },
    product: {
      title: '電子部品・チップ',
      resonators: '水晶振動子',
      oscillators: '水晶発振器',
      rtc: 'RTCモジュール',
      viewDetail: '詳細を見る',
      parameters: '仕様',
      filter: 'フィルター',
      sort: '並べ替え',
      stock: '在庫',
      price: '価格',
      search: '製品、ブランド、型番号を検索...',
      resultCount: '{count} 件の製品',
    },
    about: {
      title: '中国芯について',
      subtitle: '高品質な中国電子製品への入り口',
      intro: '中国芯は、中国の電子部品と半導体ブランドの世界的なプロモーションを行う専門プラットフォームです。领先的メーカーと提携し、認定を受けた高品質な電子部品競争力のある価格で提供します。',
      strengths: {
        automation: {
          title: 'スマート製造',
          desc: '最先进的自动化生产线，月产能超过1亿只',
        },
        quality: {
          title: '認証品質',
          desc: 'ISO9001、ISO14001、AEC-Q100認証製品、国際基準に適合',
        },
        direct: {
          title: 'メーカー直送',
          desc: '中間業者なし、工場直接価格、サプライチェーンの透明性',
        },
        capacity: {
          title: 'グローバル展開',
          desc: '50か国以上でサービスを提供、信頼性の高い物流と技術サポート',
        },
      },
      certifications: {
        title: '認証と基準',
        items: ['ISO9001:2015', 'ISO14001', 'RoHS', 'REACH', 'AEC-Q100', 'AEC-Q200', 'Halogen Free'],
      },
    },
    contact: {
      title: 'お問い合わせ',
      subtitle: '専門的な技術サポートとカスタムソリューション',
      phone: '電話',
      email: 'メール',
      address: '本社',
      hours: '営業時間',
      offices: {
        title: 'グローバルオフィス',
        shenzhen: '深センR&Dセンター',
        jiangsu: '蘇州販売オフィス',
      },
      mapPlaceholder: '地図',
    },
    news: {
      title: '業界ニュースと情報',
      categories: {
        all: 'すべて',
        tech: '技術記事',
        industry: '業界ニュース',
        company: '会社情報',
      },
    },
    inquiry: {
      title: '見積もり依頼',
      name: '氏名',
      company: '会社名',
      email: 'ビジネスメール',
      phone: '電話番号',
      products: '関心のある製品',
      message: '要件',
      submit: '見積もり依頼を送信',
    },
    footer: {
      address: '住所',
      email: 'メール',
      phone: '電話',
      copyright: '© 2026 中国芯電子株式会社. 全著作権所有.',
    },
    filter: {
      brandComparison: 'ブランド比較',
      reset: 'フィルターをリセット',
      apply: 'フィルターを適用',
    },
    seo: {
      title: '中国芯 - 電子部品与中国_chipブランドプラットフォーム',
      description: '一流の中国電子ブランドと電子部品を発見。中国の認定メーカーから高品質な半導体、水晶振動子、発振器を調達。グローバル出荷対応。',
    },
    common: {
      loading: '読み込み中...',
      noResults: '結果が見つかりません',
      backToTop: 'トップへ戻る',
      learnMore: '詳細を見る',
      viewAll: 'すべて見る',
    },
  },
  ko: {
    nav: {
      home: '홈',
      brands: '브랜드',
      products: '제품',
      tools: '선택 도구',
      about: '회사 소개',
      contact: '문의',
      news: '뉴스',
    },
    hero: {
      title: '중국 최고 전자 브랜드, 글로벌 품질 기준',
      subtitle: '차이나 뉴칩은 최고의 중국 전자 부품 제조업체와 당신을 연결합니다 — 반도체, 수정 진동자, 발진기 등 — 50개 이상 국가에 서비스 제공',
      cta: '제품 보기',
      ctaSecondary: '문의하기',
    },
    product: {
      title: '전자 부품 및 칩',
      resonators: '수정 진동자',
      oscillators: '수정 발진기',
      rtc: 'RTC 모듈',
      viewDetail: '상세 보기',
      parameters: '사양',
      filter: '필터',
      sort: '정렬',
      stock: '재고',
      price: '가격',
      search: '제품, 브랜드, 型番号 검색...',
      resultCount: '{count}개 제품',
    },
    about: {
      title: '차이나 뉴칩 소개',
      subtitle: '고품질 중국 전자제품으로의的大门',
      intro: '차이나 뉴칩은 중국 전자 부품 및 반도체 브랜드를 전 세계적으로 홍보하는 전문 플랫폼입니다.-leading 제조업체와 협력하여 인증된 고품질 전자 부품을 경쟁력 있는 가격으로 제공합니다.',
      strengths: {
        automation: {
          title: '스마트 제조',
          desc: '최先进的自动化生产线，月产能超过1亿只',
        },
        quality: {
          title: '인증 품질',
          desc: 'ISO9001, ISO14001, AEC-Q100 인증 제품, 국제 표준 충족',
        },
        direct: {
          title: '제조업체 직송',
          desc: '중간상인 없음, 공장 직접 가격, 공급망 투명성',
        },
        capacity: {
          title: '글로벌 유통',
          desc: '50개 이상 국가에 서비스, 신뢰할 수 있는 물류와 기술 지원',
        },
      },
      certifications: {
        title: '인증 및 기준',
        items: ['ISO9001:2015', 'ISO14001', 'RoHS', 'REACH', 'AEC-Q100', 'AEC-Q200', 'Halogen Free'],
      },
    },
    contact: {
      title: '문의하기',
      subtitle: '전문 기술 지원 및 사용자 정의 솔루션',
      phone: '전화',
      email: '이메일',
      address: '본사',
      hours: '영업 시간',
      offices: {
        title: '글로벌 오피스',
        shenzhen: '선전 R&D 센터',
        jiangsu: '쑤저우 영업 오피스',
      },
      mapPlaceholder: '지도 위치',
    },
    news: {
      title: '산업 뉴스 및 정보',
      categories: {
        all: '전체',
        tech: '기술 기사',
        industry: '산업 뉴스',
        company: '회사 뉴스',
      },
    },
    inquiry: {
      title: '문의 보내기',
      name: '이름',
      company: '회사명',
      email: '비즈니스 이메일',
      phone: '전화번호',
      products: '관심 제품',
      message: '요구 사항',
      submit: '문의 제출',
    },
    footer: {
      address: '주소',
      email: '이메일',
      phone: '전화',
      copyright: '© 2026 차이나 뉴칩 일렉트로닉스. 모든 권리 보유.',
    },
    filter: {
      brandComparison: '브랜드 비교',
      reset: '필터 초기화',
      apply: '필터 적용',
    },
    seo: {
      title: '차이나 뉴칩 - 전자 부품 및 중국 칩 브랜드 플랫폼',
      description: '최고의 중국 전자 브랜드와 전자 부품 발견. 중국의 인증된 제조업체에서高品質 반도체, 수정 진동자, 발진기 조달. 글로벌 배송 가능.',
    },
    common: {
      loading: '로딩 중...',
      noResults: '결과 없음',
      backToTop: '맨 위로',
      learnMore: '자세히 보기',
      viewAll: '전체 보기',
    },
  },
  de: {
    nav: {
      home: 'Startseite',
      brands: 'Marken',
      products: 'Produkte',
      tools: 'Auswahlwerkzeuge',
      about: 'Über uns',
      contact: 'Kontakt',
      news: 'Neuigkeiten',
    },
    hero: {
      title: 'Führende chinesische Elektronikmarken, globale Qualitätsstandards',
      subtitle: 'China NewChip verbindet Sie mit erstklassigen elektronischen Komponentenherstellern in China — Halbleiter, Quarzresonatoren, Oszillatoren und mehr — bedient Kunden in über 50 Ländern',
      cta: 'Produkte erkunden',
      ctaSecondary: 'Kontakt',
    },
    product: {
      title: 'Elektronische Komponenten & Chips',
      resonators: 'Quarzresonatoren',
      oscillators: 'Quarzoszillatoren',
      rtc: 'RTC-Module',
      viewDetail: 'Details ansehen',
      parameters: 'Spezifikationen',
      filter: 'Filter',
      sort: 'Sortieren',
      stock: 'Lager',
      price: 'Preis',
      search: 'Produkte, Marken oder Teilenummern suchen...',
      resultCount: '{count} Produkte gefunden',
    },
    about: {
      title: 'Über China NewChip',
      subtitle: 'Ihr Tor zu hochwertigen chinesischen Elektronikmarken',
      intro: 'China NewChip ist eine professionelle Plattform zur Förderung chinesischer Elektronikkomponenten und Halbleitermarken weltweit. Wir arbeiten mit führenden Herstellern zusammen, um zertifizierte, hochwertige Elektronikartikel zu wettbewerbsfähigen Preisen zu liefern.',
      strengths: {
        automation: {
          title: 'Intelligente Fertigung',
          desc: 'Modernste automatisierte Produktionslinien mit über 100M+ monatlicher Kapazität',
        },
        quality: {
          title: 'Zertifizierte Qualität',
          desc: 'ISO9001, ISO14001, AEC-Q100 zertifizierte Produkte, die internationale Standards erfüllen',
        },
        direct: {
          title: 'Direkt vom Hersteller',
          desc: 'Keine Zwischenhändler — Fabrikpreise und transparente Lieferkette',
        },
        capacity: {
          title: 'Globale Distribution',
          desc: 'Bedient über 50 Länder mit zuverlässiger Logistik und technischem Support',
        },
      },
      certifications: {
        title: 'Zertifizierungen & Standards',
        items: ['ISO9001:2015', 'ISO14001', 'RoHS', 'REACH', 'AEC-Q100', 'AEC-Q200', 'Halogen Free'],
      },
    },
    contact: {
      title: 'Kontakt',
      subtitle: 'Erhalten Sie technischen Support & kundenspezifische Lösungen',
      phone: 'Telefon',
      email: 'E-Mail',
      address: 'Hauptsitz',
      hours: 'Geschäftszeiten',
      offices: {
        title: 'Globale Büros',
        shenzhen: 'Shenzhen F&E-Zentrum',
        jiangsu: 'Suzhou Vertriebsbüro',
      },
      mapPlaceholder: 'Kartenstandort',
    },
    news: {
      title: 'Branchennews & Einblicke',
      categories: {
        all: 'Alle',
        tech: 'Technische Artikel',
        industry: 'Branchnachrichten',
        company: 'Unternehmensnachrichten',
      },
    },
    inquiry: {
      title: 'Anfrage senden',
      name: 'Vollständiger Name',
      company: 'Firmenname',
      email: 'Geschäftliche E-Mail',
      phone: 'Telefonnummer',
      products: 'Interessante Produkte',
      message: 'Ihre Anforderungen',
      submit: 'Anfrage absenden',
    },
    footer: {
      address: 'Adresse',
      email: 'E-Mail',
      phone: 'Telefon',
      copyright: '© 2026 China NewChip Electronics. Alle Rechte vorbehalten.',
    },
    filter: {
      brandComparison: 'Marken vergleichen',
      reset: 'Filter zurücksetzen',
      apply: 'Filter anwenden',
    },
    seo: {
      title: 'China NewChip - Elektronische Komponenten & Chinesische Chipmarken Plattform',
      description: 'Entdecken Sie führende chinesische Elektronikmarken und elektronische Komponenten. Beschaffung hochwertiger Halbleiter, Quarzresonatoren, Oszillatoren von zertifizierten Herstellern in China. Globaler Versand verfügbar.',
    },
    common: {
      loading: 'Wird geladen...',
      noResults: 'Keine Ergebnisse gefunden',
      backToTop: 'Zurück nach oben',
      learnMore: 'Mehr erfahren',
      viewAll: 'Alle ansehen',
    },
  },
};

// Get translations for a locale
export function getTranslations(locale: Locale = 'en'): TranslationKeys {
  return translations[locale] || translations.en;
}

// useTranslations hook - returns translations for current locale
export function useTranslations(): TranslationKeys {
  const locale = getLocale();
  return translations[locale] || translations.en;
}

// Get translation by key path (e.g., 'nav.home')
export function t(key: string, locale: Locale = 'en'): string {
  const keys = key.split('.');
  let value: any = translations[locale] || translations.en;

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key; // Return key if translation not found
    }
  }

  return typeof value === 'string' ? value : key;
}