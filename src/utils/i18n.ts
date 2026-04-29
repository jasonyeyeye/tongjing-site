// Internationalization utility - Client-side & Server-side
// Supports: en (default), zh, ja, ko, de

export type Locale = 'en' | 'zh' | 'ja' | 'ko' | 'de';

export const locales: { code: Locale; name: string; nativeName: string }[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
];

// Get locale from cookie (client-side)
export function getLocale(): Locale {
  if (typeof document === 'undefined') return 'en';
  const match = document.cookie.match(/locale=([^;]+)/);
  if (match) {
    const lang = match[1] as Locale;
    if (locales.some(l => l.code === lang)) return lang;
  }
  return 'en';
}

// Set locale cookie
export function setLocale(locale: Locale) {
  if (typeof document !== 'undefined') {
    document.cookie = `locale=${locale};path=/;max-age=31536000;SameSite=Lax`;
  }
}

// Flat translations for client-side
const flatTranslations: Record<Locale, Record<string, string>> = {
  en: {
    'nav.home': 'Home', 'nav.brands': 'Brands', 'nav.products': 'Products', 'nav.tools': 'Selection Tools',
    'nav.about': 'About Us', 'nav.contact': 'Contact', 'nav.news': 'News',
    'hero.title': 'Leading Chinese Electronics Brands, Global Quality Standards',
    'hero.subtitle': 'China NewChip connects you with top-tier electronic component manufacturers in China — semiconductors, crystal resonators, oscillators, and more — serving clients in 50+ countries',
    'hero.cta': 'Explore Products', 'hero.ctaSecondary': 'Contact Us',
    'product.resonators': 'Crystal Resonators', 'product.oscillators': 'Crystal Oscillators', 'product.rtc': 'RTC Modules',
    'product.viewDetail': 'View Details', 'product.search': 'Search products, brands, or part numbers...',
    'about.title': 'About China NewChip', 'about.subtitle': 'Your Gateway to High-Quality Chinese Electronics Brands',
    'about.intro': 'China NewChip is a professional platform promoting Chinese electronic components and semiconductor brands globally. We partner with leading manufacturers to deliver certified, high-quality electronic parts at competitive prices.',
    'about.smartManuf': 'Smart Manufacturing', 'about.certQuality': 'Certified Quality',
    'about.directFromMfg': 'Direct from Manufacturer', 'about.globalDist': 'Global Distribution',
    'footer.copyright': '© 2026 China NewChip Electronics. All rights reserved.',
    'common.learnMore': 'Learn More', 'common.viewAll': 'View All',
    'filter.reset': 'Reset',
    'header.inquiry': 'Inquiry',
  },
  zh: {
    'nav.home': '首页', 'nav.brands': '品牌', 'nav.products': '产品', 'nav.tools': '选型工具',
    'nav.about': '关于我们', 'nav.contact': '联系我们', 'nav.news': '新闻资讯',
    'hero.title': '中国领先电子品牌，全球品质标准',
    'hero.subtitle': '中国芯平台为您连接中国顶级电子元器件制造商 — 半导体、石英晶体谐振器、振荡器等 — 服务全球50+国家客户',
    'hero.cta': '浏览产品', 'hero.ctaSecondary': '联系我们',
    'product.resonators': '石英晶体谐振器', 'product.oscillators': '石英晶体振荡器', 'product.rtc': 'RTC模块',
    'product.viewDetail': '查看详情', 'product.search': '搜索产品、品牌或型号...',
    'about.title': '关于中国芯', 'about.subtitle': '您的优质中国电子产品门户',
    'about.intro': '中国芯是专业推广中国电子元器件和半导体品牌的全球平台。我们与领先制造商合作，提供认证、高品质的电子元器件，价格有竞争力。',
    'about.smartManuf': '智能制造', 'about.certQuality': '品质认证',
    'about.directFromMfg': '原厂直供', 'about.globalDist': '全球分销',
    'footer.copyright': '© 2026 中国芯电子有限公司. 保留所有权利.',
    'common.learnMore': '了解更多', 'common.viewAll': '查看全部',
    'filter.reset': '重置',
    'header.inquiry': '询价',
  },
  ja: {
    'nav.home': 'ホーム', 'nav.brands': 'ブランド', 'nav.products': '製品', 'nav.tools': '選定ツール',
    'nav.about': '会社概要', 'nav.contact': 'お問い合わせ', 'nav.news': 'ニュース',
    'hero.title': '中国トップ電子ブランド、グローバル品質基準',
    'hero.subtitle': '中国芯プラットフォームは中国最高の電子部品メーカーとお客様を繋ぎます — 半导体、水晶振動子、発振器など — 50か国以上でサービス提供',
    'hero.cta': '製品を見る', 'hero.ctaSecondary': 'お問い合わせ',
    'product.resonators': '水晶振動子', 'product.oscillators': '水晶発振器', 'product.rtc': 'RTCモジュール',
    'product.viewDetail': '詳細を見る', 'product.search': '製品、ブランド、型番号を検索...',
    'about.title': '中国芯について', 'about.subtitle': '高品質な中国電子製品への入り口',
    'about.intro': '中国芯は、中国の電子部品と半导体ブランドの世界的なプロモーションを行う専門プラットフォームです。领先的メーカーと提携し、認定を受けた高品质な電子部品競争力のある価格で提供します。',
    'about.smartManuf': 'スマート製造', 'about.certQuality': '認証品質',
    'about.directFromMfg': 'メーカー直送', 'about.globalDist': 'グローバル展開',
    'footer.copyright': '© 2026 中国芯電子株式会社. 全著作権所有.',
    'common.learnMore': '詳細を見る', 'common.viewAll': 'すべて見る',
    'filter.reset': 'リセット',
    'header.inquiry': '見積もり',
  },
  ko: {
    'nav.home': '홈', 'nav.brands': '브랜드', 'nav.products': '製品', 'nav.tools': '選択 도구',
    'nav.about': '회사 소개', 'nav.contact': '문의', 'nav.news': '뉴스',
    'hero.title': '중국 최고 전자 브랜드, 글로벌 품질 기준',
    'hero.subtitle': '차이나 뉴칩은 최고의 중국 전자 부품 제조업체와 당신을 연결합니다 — 반도체, 수정 진동자, 발진기 등 — 50개 이상 국가에 서비스 제공',
    'hero.cta': '製品 보기', 'hero.ctaSecondary': '문의하기',
    'product.resonators': '수정 진동자', 'product.oscillators': '수정 발진기', 'product.rtc': 'RTC 모듈',
    'product.viewDetail': '상세 보기', 'product.search': '製品, 브랜드, 型番号を検索...',
    'about.title': '차이나 뉴칩 소개', 'about.subtitle': '고품질 중국 전자제품으로의大门',
    'about.intro': '차이나 뉴칩은 중국 전자 부품 및 반도체 브랜드를 전 세계적으로 홍보하는 전문 플랫폼입니다.-leading 제조업체와 협력하여 인증된 고품질 전자 부품을 경쟁력 있는 가격으로 제공합니다.',
    'about.smartManuf': '스마트 제조', 'about.certQuality': '인증 품질',
    'about.directFromMfg': '제조업체 직송', 'about.globalDist': '글로벌 유통',
    'footer.copyright': '© 2026 차이나 뉴칩 일렉트로닉스. 모든 권리 보유.',
    'common.learnMore': '자세히 보기', 'common.viewAll': '전체 보기',
    'filter.reset': '초기화',
    'header.inquiry': '문의',
  },
  de: {
    'nav.home': 'Startseite', 'nav.brands': 'Marken', 'nav.products': 'Produkte', 'nav.tools': 'Auswahlwerkzeuge',
    'nav.about': 'Über uns', 'nav.contact': 'Kontakt', 'nav.news': 'Neuigkeiten',
    'hero.title': 'Führende chinesische Elektronikmarken, globale Qualitätsstandards',
    'hero.subtitle': 'China NewChip verbindet Sie mit erstklassigen elektronischen Komponentenherstellern in China — Halbleiter, Quarzresonatoren, Oszillatoren und mehr — bedient Kunden in über 50 Ländern',
    'hero.cta': 'Produkte erkunden', 'hero.ctaSecondary': 'Kontakt',
    'product.resonators': 'Quarzresonatoren', 'product.oscillators': 'Quarzoszillatoren', 'product.rtc': 'RTC-Module',
    'product.viewDetail': 'Details ansehen', 'product.search': 'Produkte, Marken oder Teilenummern suchen...',
    'about.title': 'Über China NewChip', 'about.subtitle': 'Ihr Tor zu hochwertigen chinesischen Elektronikmarken',
    'about.intro': 'China NewChip ist eine professionelle Plattform zur Förderung chinesischer Elektronikkomponenten und Halbleitermarken weltweit. Wir arbeiten mit führenden Herstellern zusammen, um zertifizierte, hochwertige Elektronikartikel zu wettbewerbsfähigen Preisen zu liefern.',
    'about.smartManuf': 'Intelligente Fertigung', 'about.certQuality': 'Zertifizierte Qualität',
    'about.directFromMfg': 'Direkt vom Hersteller', 'about.globalDist': 'Globale Distribution',
    'footer.copyright': '© 2026 China NewChip Electronics. Alle Rechte vorbehalten.',
    'common.learnMore': 'Mehr erfahren', 'common.viewAll': 'Alle ansehen',
    'filter.reset': 'Zurücksetzen',
    'header.inquiry': 'Anfrage',
  },
};

// Nested translations for server-side use (backward compatibility)
const translations = {
  en: {
    nav: { home: 'Home', brands: 'Brands', products: 'Products', tools: 'Selection Tools', about: 'About Us', contact: 'Contact', news: 'News' },
    hero: { title: 'Leading Chinese Electronics Brands, Global Quality Standards', subtitle: 'China NewChip connects you with top-tier electronic component manufacturers in China — semiconductors, crystal resonators, oscillators, and more — serving clients in 50+ countries', cta: 'Explore Products', ctaSecondary: 'Contact Us' },
    product: { resonators: 'Crystal Resonators', oscillators: 'Crystal Oscillators', rtc: 'RTC Modules', viewDetail: 'View Details', search: 'Search products, brands, or part numbers...' },
    about: {
      title: 'About China NewChip', subtitle: 'Your Gateway to High-Quality Chinese Electronics Brands',
      intro: 'China NewChip is a professional platform promoting Chinese electronic components and semiconductor brands globally. We partner with leading manufacturers to deliver certified, high-quality electronic parts at competitive prices.',
      strengths: {
        automation: { title: 'Smart Manufacturing', desc: 'State-of-the-art automated production lines with 100M+ monthly capacity' },
        quality: { title: 'Certified Quality', desc: 'ISO9001, ISO14001, AEC-Q100 certified products meeting international standards' },
        direct: { title: 'Direct from Manufacturer', desc: 'No middlemen — factory-direct pricing and supply chain transparency' },
        capacity: { title: 'Global Distribution', desc: 'Serving 50+ countries with reliable logistics and technical support' },
      },
      certifications: { title: 'Certifications & Standards', items: ['ISO9001:2015', 'ISO14001', 'RoHS', 'REACH', 'AEC-Q100', 'AEC-Q200', 'Halogen Free'] },
    },
    contact: { title: 'Contact Us', subtitle: 'Get Expert Technical Support & Custom Solutions' },
    news: { title: 'Industry News & Insights', categories: { all: 'All', tech: 'Technical Articles', industry: 'Industry News', company: 'Company Updates' } },
    footer: { copyright: '© 2026 China NewChip Electronics. All rights reserved.' },
    common: { learnMore: 'Learn More', viewAll: 'View All' },
    filter: { reset: 'Reset' },
    nav2: { products: 'Products', contact: 'Contact' },
  },
  zh: {
    nav: { home: '首页', brands: '品牌', products: '产品', tools: '选型工具', about: '关于我们', contact: '联系我们', news: '新闻资讯' },
    hero: { title: '中国领先电子品牌，全球品质标准', subtitle: '中国芯平台为您连接中国顶级电子元器件制造商 — 半导体、石英晶体谐振器、振荡器等 — 服务全球50+国家客户', cta: '浏览产品', ctaSecondary: '联系我们' },
    product: { resonators: '石英晶体谐振器', oscillators: '石英晶体振荡器', rtc: 'RTC模块', viewDetail: '查看详情', search: '搜索产品、品牌或型号...' },
    about: {
      title: '关于中国芯', subtitle: '您的优质中国电子产品门户',
      intro: '中国芯是专业推广中国电子元器件和半导体品牌的全球平台。我们与领先制造商合作，提供认证、高品质的电子元器件，价格有竞争力。',
      strengths: {
        automation: { title: '智能制造', desc: '先进的自动化生产线，月产能超1亿只' },
        quality: { title: '品质认证', desc: 'ISO9001、ISO14001、AEC-Q100认证产品，符合国际标准' },
        direct: { title: '原厂直供', desc: '无中间商，工厂直接定价，供应链透明' },
        capacity: { title: '全球分销', desc: '服务50+国家，可靠物流和技术支持' },
      },
      certifications: { title: '认证与标准', items: ['ISO9001:2015', 'ISO14001', 'RoHS', 'REACH', 'AEC-Q100', 'AEC-Q200', 'Halogen Free'] },
    },
    contact: { title: '联系我们', subtitle: '获取专业技术支持与定制方案' },
    news: { title: '行业动态与资讯', categories: { all: '全部', tech: '技术文章', industry: '行业新闻', company: '公司动态' } },
    footer: { copyright: '© 2026 中国芯电子有限公司. 保留所有权利.' },
    common: { learnMore: '了解更多', viewAll: '查看全部' },
    filter: { reset: '重置' },
    nav2: { products: '产品', contact: '联系我们' },
  },
  ja: {
    nav: { home: 'ホーム', brands: 'ブランド', products: '製品', tools: '選定ツール', about: '会社概要', contact: 'お問い合わせ', news: 'ニュース' },
    hero: { title: '中国トップ電子ブランド、グローバル品質基準', subtitle: '中国芯プラットフォームは中国最高の電子部品メーカーとお客様を繋ぎます — 半导体、水晶振動子、発振器など — 50か国以上でサービス提供', cta: '製品を見る', ctaSecondary: 'お問い合わせ' },
    product: { resonators: '水晶振動子', oscillators: '水晶発振器', rtc: 'RTCモジュール', viewDetail: '詳細を見る', search: '製品、ブランド、型番号を検索...' },
    about: {
      title: '中国芯について', subtitle: '高品質な中国電子製品への入り口',
      intro: '中国芯は、中国の電子部品と半导体ブランドの世界的なプロモーションを行う専門プラットフォームです。领先的メーカーと提携し、认定を受けた高品质な電子部品競争力のある価格で提供します。',
      strengths: {
        automation: { title: 'スマート製造', desc: '最先进的自动化生产线，月产能超过1亿只' },
        quality: { title: '認証品質', desc: 'ISO9001、ISO14001、AEC-Q100認証製品、国際基準に適合' },
        direct: { title: 'メーカー直送', desc: '中間業者なし、工場直接価格、サプライチェーンの透明性' },
        capacity: { title: 'グローバル展開', desc: '50か国以上でサービスを提供、信頼性の高い物流と技術サポート' },
      },
      certifications: { title: '認証と基準', items: ['ISO9001:2015', 'ISO14001', 'RoHS', 'REACH', 'AEC-Q100', 'AEC-Q200', 'Halogen Free'] },
    },
    contact: { title: 'お問い合わせ', subtitle: '専門的な技術サポートとカスタムソリューション' },
    news: { title: '業界ニュースと情報', categories: { all: 'すべて', tech: '技術記事', industry: '業界ニュース', company: '会社情報' } },
    footer: { copyright: '© 2026 中国芯電子株式会社. 全著作権所有.' },
    common: { learnMore: '詳細を見る', viewAll: 'すべて見る' },
    filter: { reset: 'フィルターをリセット' },
    nav2: { products: '製品', contact: 'お問い合わせ' },
  },
  ko: {
    nav: { home: '홈', brands: '브랜드', products: '제품', tools: '선택 도구', about: '회사 소개', contact: '문의', news: '뉴스' },
    hero: { title: '중국 최고 전자 브랜드, 글로벌 품질 기준', subtitle: '차이나 뉴칩은 최고의 중국 전자 부품 제조업체와 당신을 연결합니다 — 반도체, 수정 진동자, 발진기 등 — 50개 이상 국가에 서비스提供', cta: '제품 보기', ctaSecondary: '문의하기' },
    product: { resonators: '수정 진동자', oscillators: '수정 발진기', rtc: 'RTC 모듈', viewDetail: '상세 보기', search: '製品, 브랜드, 型番号を検索...' },
    about: {
      title: '차이나 뉴칩 소개', subtitle: '고품질 중국 전자제품으로의大门',
      intro: '차이나 뉴칩은 중국 전자 부품 및 반도체 브랜드를 전 세계적으로 홍보하는 전문 플랫폼입니다.-leading 제조업체와 협력하여 인증된 고품질 전자 부품을 경쟁력 있는 가격으로提供합니다。',
      strengths: {
        automation: { title: '스마트 제조', desc: '최先进的自动化生产线，月产能超过1亿只' },
        quality: { title: '인증 품질', desc: 'ISO9001, ISO14001, AEC-Q100 인증 제품, 국제 표준 충족' },
        direct: { title: '제조업체 직송', desc: '중간상인 없음, 공장 직접 가격, 공급망 투명성' },
        capacity: { title: '글로벌 유통', desc: '50개 이상 국가에 서비스, 신뢰할 수 있는 물류와 기술 지원' },
      },
      certifications: { title: '인증 및 기준', items: ['ISO9001:2015', 'ISO14001', 'RoHS', 'REACH', 'AEC-Q100', 'AEC-Q200', 'Halogen Free'] },
    },
    contact: { title: '문의하기', subtitle: '전문 기술 지원 및 사용자 정의 솔루션' },
    news: { title: '산업 뉴스 및 정보', categories: { all: '전체', tech: '기술 기사', industry: '산업 뉴스', company: '회사 뉴스' } },
    footer: { copyright: '© 2026 차이나 뉴칩 일렉트로닉스. 모든 권리 보유.' },
    common: { learnMore: '자세히 보기', viewAll: '전체 보기' },
    filter: { reset: '필터 초기화' },
    nav2: { products: '제품', contact: '문의' },
  },
  de: {
    nav: { home: 'Startseite', brands: 'Marken', products: 'Produkte', tools: 'Auswahlwerkzeuge', about: 'Über uns', contact: 'Kontakt', news: 'Neuigkeiten' },
    hero: { title: 'Führende chinesische Elektronikmarken, globale Qualitätsstandards', subtitle: 'China NewChip verbindet Sie mit erstklassigen elektronischen Komponentenherstellern in China — Halbleiter, Quarzresonatoren, Oszillatoren und mehr — bedient Kunden in über 50 Ländern', cta: 'Produkte erkunden', ctaSecondary: 'Kontakt' },
    product: { resonators: 'Quarzresonatoren', oscillators: 'Quarzoszillatoren', rtc: 'RTC-Module', viewDetail: 'Details ansehen', search: 'Produkte, Marken oder Teilenummern suchen...' },
    about: {
      title: 'Über China NewChip', subtitle: 'Ihr Tor zu hochwertigen chinesischen Elektronikmarken',
      intro: 'China NewChip ist eine professionelle Plattform zur Förderung chinesischer Elektronikkomponenten und Halbleitermarken weltweit. Wir arbeiten mit führenden Herstellern zusammen, um zertifizierte, hochwertige Elektronikartikel zu wettbewerbsfähigen Preisen zu liefern.',
      strengths: {
        automation: { title: 'Intelligente Fertigung', desc: 'Modernste automatisierte Produktionslinien mit über 100M+ monatlicher Kapazität' },
        quality: { title: 'Zertifizierte Qualität', desc: 'ISO9001, ISO14001, AEC-Q100 zertifizierte Produkte, die internationale Standards erfüllen' },
        direct: { title: 'Direkt vom Hersteller', desc: 'Keine Zwischenhändler — Fabrikpreise und transparente Lieferkette' },
        capacity: { title: 'Globale Distribution', desc: 'Bedient über 50 Länder mit zuverlässiger Logistik und technischem Support' },
      },
      certifications: { title: 'Zertifizierungen & Standards', items: ['ISO9001:2015', 'ISO14001', 'RoHS', 'REACH', 'AEC-Q100', 'AEC-Q200', 'Halogen Free'] },
    },
    contact: { title: 'Kontakt', subtitle: 'Erhalten Sie technischen Support & kundenspezifische Lösungen' },
    news: { title: 'Branchennews & Einblicke', categories: { all: 'Alle', tech: 'Technische Artikel', industry: 'Branchnachrichten', company: 'Unternehmensnachrichten' } },
    footer: { copyright: '© 2026 China NewChip Electronics. Alle Rechte vorbehalten.' },
    common: { learnMore: 'Mehr erfahren', viewAll: 'Alle ansehen' },
    filter: { reset: 'Filter zurücksetzen' },
    nav2: { products: 'Produkte', contact: 'Kontakt' },
  },
};

// For backward compatibility - server-side rendering
export function useTranslations() {
  return translations['en'];
}

// For client-side - get flat translations
export function getFlatTranslations(locale: Locale): Record<string, string> {
  return flatTranslations[locale] || flatTranslations['en'];
}

// Get translation by key (for client-side)
export function t(key: string, locale: Locale = 'en'): string {
  return flatTranslations[locale]?.[key] || flatTranslations['en']?.[key] || key;
}