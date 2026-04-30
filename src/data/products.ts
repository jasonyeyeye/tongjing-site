export interface Product {
  id: string;
  brandId: string;
  model: string;
  category: 'resonator' | 'oscillator' | 'rtc';
  frequency: string;
  tolerance: string;
  package: string;
  loadCapacitance: string;
  esr: string;
  stock: string;
  priceRange: string;
  badge: 'hot' | 'new' | 'default' | 'discontinued' | 'futures';
  specifications: Record<string, string>;
}

// Import all JSON files from products directory
const productModules = import.meta.glob('./products/**/*.json', { eager: true });

// Teable data format (from KV)
interface TeableProduct {
  model: string;
  brand: string;
  short_description: string;
  description: string;
  lifecycle_status: string;
  featured: boolean;
  image_url: string;
  datasheet_url: string;
  parameters: {
    frequency: string;
    package_type: string;
    output_logic: string;
    voltage_supply: string;
    operating_temperature: string;
  };
  industries: string[];
  alternatives: string[];
  compatible_replacements: string[];
}

// Transform Teable data to Product format
function transformTeableProduct(data: TeableProduct): Product {
  // Generate ID from model name
  const modelSlug = data.model.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
  const brandSlug = 'tongjing'; // Map 同晶 to tongjing

  // Determine category from model prefix
  let category: 'resonator' | 'oscillator' | 'rtc' = 'oscillator';
  const modelPrefix = data.model.split('-')[0].toUpperCase();
  if (modelPrefix.includes('32')) {
    category = 'rtc';
  } else if (modelPrefix.startsWith('2A') || modelPrefix.startsWith('3A')) {
    category = 'resonator';
  } else if (modelPrefix.startsWith('5A') || modelPrefix.startsWith('7A')) {
    category = 'oscillator';
  }

  // Map lifecycle_status to badge
  let badge: Product['badge'] = 'default';
  const status = data.lifecycle_status?.toLowerCase() || '';
  if (status === '量产' || status === 'active') {
    badge = data.featured ? 'hot' : 'default';
  } else if (status === '样品' || status === 'sample') {
    badge = 'new';
  } else if (status.includes('停产') || status.includes('eol')) {
    badge = 'discontinued';
  } else if (status.includes('推荐替代')) {
    badge = 'futures';
  }

  // Parse frequency
  const freq = data.parameters?.frequency || '';

  // Build specifications object
  const specs: Record<string, string> = {
    'Frequency': freq,
    'Package': data.parameters?.package_type || '',
    'Output': data.parameters?.output_logic || '',
    'Voltage': data.parameters?.voltage_supply || '',
    'Operating Temp': data.parameters?.operating_temperature || '',
  };

  // Add description as short description in specs
  if (data.short_description) {
    specs['Description'] = data.short_description;
  }

  return {
    id: `${brandSlug}-${modelSlug}`,
    brandId: brandSlug,
    model: data.model,
    category,
    frequency: freq,
    tolerance: '', // Teable doesn't have tolerance field, could parse from frequency
    package: data.parameters?.package_type || '',
    loadCapacitance: '',
    esr: '',
    stock: 'In Stock', // Default stock status
    priceRange: 'Contact for Quote',
    badge,
    specifications: specs,
  };
}

// Load products from JSON files
function loadProducts(): Product[] {
  const products: Product[] = [];

  for (const [path, module] of Object.entries(productModules)) {
    const productData = (module as any).default;
    if (productData && productData.model) {
      try {
        products.push(transformTeableProduct(productData));
      } catch (e) {
        console.warn(`Failed to transform product from ${path}:`, e);
      }
    }
  }

  return products;
}

// Export loaded products
export const products: Product[] = loadProducts();

export function getProductsByBrand(brandId: string): Product[] {
  return products.filter(p => p.brandId === brandId);
}

export function getProductBySlug(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductByModel(model: string): Product | undefined {
  return products.find(p => p.model === model);
}

export function getAllProducts(): Product[] {
  return products;
}
