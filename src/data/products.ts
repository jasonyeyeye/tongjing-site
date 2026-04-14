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

export const products: Product[] = [
  {
    id: 'tongjing-tj3225k',
    brandId: 'tongjing',
    model: 'TJ3225K-26.000M',
    category: 'resonator',
    frequency: '26MHz',
    tolerance: '±10ppm',
    package: 'SMD3225',
    loadCapacitance: '12pF',
    esr: '30Ω',
    stock: '500,000 PCS',
    priceRange: '$0.08 - $0.12',
    badge: 'hot',
    specifications: {
      'Frequency': '26MHz',
      'Tolerance': '±10ppm',
      'Package': '3.2×2.5×0.8mm',
      'Load Capacitance': '12pF',
      'ESR': '30Ω max',
      'Operating Temp': '-40°C to +85°C',
    },
  },
  {
    id: 'tongjing-tj2520k',
    brandId: 'tongjing',
    model: 'TJ2520K-24.000M',
    category: 'resonator',
    frequency: '24MHz',
    tolerance: '±20ppm',
    package: 'SMD2520',
    loadCapacitance: '12pF',
    esr: '40Ω',
    stock: '320,000 PCS',
    priceRange: '$0.07 - $0.10',
    badge: 'new',
    specifications: {
      'Frequency': '24MHz',
      'Tolerance': '±20ppm',
      'Package': '2.5×2.0×0.65mm',
      'Load Capacitance': '12pF',
      'ESR': '40Ω max',
      'Operating Temp': '-40°C to +85°C',
    },
  },
  {
    id: 'tongjing-tj2016k',
    brandId: 'tongjing',
    model: 'TJ2016K-16.000M',
    category: 'resonator',
    frequency: '16MHz',
    tolerance: '±10ppm',
    package: 'SMD2016',
    loadCapacitance: '8pF',
    esr: '50Ω',
    stock: '180,000 PCS',
    priceRange: '$0.06 - $0.09',
    badge: 'default',
    specifications: {
      'Frequency': '16MHz',
      'Tolerance': '±10ppm',
      'Package': '2.0×1.6×0.5mm',
      'Load Capacitance': '8pF',
      'ESR': '50Ω max',
      'Operating Temp': '-40°C to +85°C',
    },
  },
  {
    id: 'tongjing-tj3225o',
    brandId: 'tongjing',
    model: 'TJ3225O-25.000M',
    category: 'oscillator',
    frequency: '25MHz',
    tolerance: '±50ppm',
    package: 'SMD3225',
    loadCapacitance: '20pF',
    esr: '30Ω',
    stock: '2 weeks lead time',
    priceRange: '$0.10 - $0.15',
    badge: 'futures',
    specifications: {
      'Frequency': '25MHz',
      'Tolerance': '±50ppm',
      'Package': '3.2×2.5×1.0mm',
      'Output': 'CMOS',
      'Voltage': '3.3V',
      'Operating Temp': '-40°C to +85°C',
    },
  },
  {
    id: 'tongjing-tj1610k',
    brandId: 'tongjing',
    model: 'TJ1610K-12.000M',
    category: 'resonator',
    frequency: '12MHz',
    tolerance: '±20ppm',
    package: 'SMD1610',
    loadCapacitance: '8pF',
    esr: '60Ω',
    stock: '85,000 PCS',
    priceRange: '$0.05 - $0.07',
    badge: 'default',
    specifications: {
      'Frequency': '12MHz',
      'Tolerance': '±20ppm',
      'Package': '1.6×1.0×0.35mm',
      'Load Capacitance': '8pF',
      'ESR': '60Ω max',
      'Operating Temp': '-40°C to +85°C',
    },
  },
  {
    id: 'tongjing-tj2520o',
    brandId: 'tongjing',
    model: 'TJ2520O-40.000M',
    category: 'oscillator',
    frequency: '40MHz',
    tolerance: '±30ppm',
    package: 'SMD2520',
    loadCapacitance: '15pF',
    esr: '40Ω',
    stock: '150,000 PCS',
    priceRange: '$0.09 - $0.13',
    badge: 'default',
    specifications: {
      'Frequency': '40MHz',
      'Tolerance': '±30ppm',
      'Package': '2.5×2.0×0.9mm',
      'Output': 'CMOS',
      'Voltage': '3.3V',
      'Operating Temp': '-40°C to +85°C',
    },
  },
];

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
