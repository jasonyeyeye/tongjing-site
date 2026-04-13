import { products, type Product } from './products';

export interface SearchResult {
  type: 'product' | 'category' | 'brand';
  title: string;
  subtitle: string;
  href: string;
}

export function searchProducts(query: string): SearchResult[] {
  if (!query || query.length < 2) return [];

  const q = query.toLowerCase().trim();
  const results: SearchResult[] = [];

  // Search products
  products.forEach((product: Product) => {
    const model = product.model.toLowerCase();
    const brand = product.brandId.toLowerCase();
    const category = product.category.toLowerCase();
    const frequency = product.frequency.toLowerCase();
    const pkg = product.package.toLowerCase();

    if (model.includes(q) || brand.includes(q) || category.includes(q) ||
        frequency.includes(q) || pkg.includes(q) || q.includes(frequency)) {
      results.push({
        type: 'product',
        title: product.model,
        subtitle: `${product.frequency} · ${product.package} · ${product.tolerance}`,
        href: `/products/${product.id}`,
      });
    }
  });

  // Search categories
  const categories = [
    { key: 'resonators', label: 'Crystal Resonators', href: '/products' },
    { key: 'oscillators', label: 'Crystal Oscillators', href: '/products' },
    { key: 'rtc', label: 'RTC Modules', href: '/products' },
  ];

  categories.forEach(cat => {
    if (cat.label.toLowerCase().includes(q) || cat.key.includes(q)) {
      results.push({
        type: 'category',
        title: cat.label,
        subtitle: 'Product Category',
        href: cat.href,
      });
    }
  });

  return results.slice(0, 8);
}

// Cross reference search - find TongJing equivalent for competitor part numbers
export interface CrossRefResult {
  tongjing: string;
  epson?: string;
  ndk?: string;
  kds?: string;
  murata?: string;
  package: string;
}

export function searchCrossReference(query: string): CrossRefResult[] {
  if (!query || query.length < 1) return [];

  const q = query.toLowerCase().trim();

  const crossRefData: CrossRefResult[] = [
    { tongjing: 'TJ3225K-26M', epson: 'FA-238', ndk: 'NX3225GA', kds: 'DSX211G', murata: 'CRSS2012', package: '3225' },
    { tongjing: 'TJ3225K-24M', epson: 'FA-238V', ndk: 'NX3225GA', kds: 'DSX211G', murata: 'CRSS2012', package: '3225' },
    { tongjing: 'TJ2520K-24M', epson: 'FA-128', ndk: 'NX2520SA', kds: 'DSX210G', murata: 'CRSS1608', package: '2520' },
    { tongjing: 'TJ2520K-25M', epson: 'FA-128', ndk: 'NX2520GA', kds: 'DSX210G', murata: 'CRSS1608', package: '2520' },
    { tongjing: 'TJ2016K-16M', epson: 'FA-1608', ndk: 'NX2012SA', kds: 'DSX1612G', murata: 'CRSS1210', package: '2016' },
    { tongjing: 'TJ2016K-24M', epson: 'FA-1608', ndk: 'NX2012GA', kds: 'DSX1612G', murata: 'CRSS1210', package: '2016' },
    { tongjing: 'TJ1610K-12M', epson: 'FA-1612', ndk: 'NX1612SA', kds: 'DSX1208G', murata: 'CRSS1005', package: '1610' },
    { tongjing: 'TJ1610K-24M', epson: 'FA-1612', ndk: 'NX1612GA', kds: 'DSX1208G', murata: 'CRSS1005', package: '1610' },
  ];

  // Filter by query
  return crossRefData.filter(item => {
    return item.tongjing.toLowerCase().includes(q) ||
           item.epson?.toLowerCase().includes(q) ||
           item.ndk?.toLowerCase().includes(q) ||
           item.kds?.toLowerCase().includes(q) ||
           item.murata?.toLowerCase().includes(q) ||
           item.package.toLowerCase().includes(q);
  });
}

// Get all products (exported for reuse)
export { products, getAllProducts, getProductBySlug, getProductByModel, getProductsByBrand } from './products';
export type { Product } from './products';