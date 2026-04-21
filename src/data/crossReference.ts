export interface CrossRefItem {
  tongjing: string;
  epson?: string;
  ndk?: string;
  kds?: string;
  murata?: string;
  package: '3225' | '2520' | '2016' | '1610';
  productId: string;
}

export interface CrossRefProduct extends CrossRefItem {
  href: string;
}

export const crossRefData: CrossRefItem[] = [
  { tongjing: 'TJ3225K-26M', epson: 'FA-238', ndk: 'NX3225GA', kds: 'DSX211G', murata: 'CRSS2012', package: '3225', productId: 'tongjing-tj3225k' },
  { tongjing: 'TJ3225K-24M', epson: 'FA-238V', ndk: 'NX3225GA', kds: 'DSX211G', murata: 'CRSS2012', package: '3225', productId: 'tongjing-tj3225k' },
  { tongjing: 'TJ2520K-24M', epson: 'FA-128', ndk: 'NX2520SA', kds: 'DSX210G', murata: 'CRSS1608', package: '2520', productId: 'tongjing-tj2520k' },
  { tongjing: 'TJ2520K-25M', epson: 'FA-128', ndk: 'NX2520GA', kds: 'DSX210G', murata: 'CRSS1608', package: '2520', productId: 'tongjing-tj2520k' },
  { tongjing: 'TJ2016K-16M', epson: 'FA-1608', ndk: 'NX2012SA', kds: 'DSX1612G', murata: 'CRSS1210', package: '2016', productId: 'tongjing-tj2016k' },
  { tongjing: 'TJ2016K-24M', epson: 'FA-1608', ndk: 'NX2012GA', kds: 'DSX1612G', murata: 'CRSS1210', package: '2016', productId: 'tongjing-tj2016k' },
  { tongjing: 'TJ1610K-12M', epson: 'FA-1612', ndk: 'NX1612SA', kds: 'DSX1208G', murata: 'CRSS1005', package: '1610', productId: 'tongjing-tj1610k' },
  { tongjing: 'TJ1610K-24M', epson: 'FA-1612', ndk: 'NX1612GA', kds: 'DSX1208G', murata: 'CRSS1005', package: '1610', productId: 'tongjing-tj1610k' },
];

export function getCrossRefWithHref(): CrossRefProduct[] {
  return crossRefData.map(item => ({
    ...item,
    href: `/products/${item.productId}`,
  }));
}

export function searchCrossRef(query: string, brand?: string): CrossRefProduct[] {
  if (!query && !brand) return getCrossRefWithHref();
  if (!query) return getCrossRefWithHref().filter(item => {
    const brandKey = brand as keyof CrossRefItem;
    return item[brandKey] !== undefined;
  });

  const q = query.toLowerCase().trim();
  return getCrossRefWithHref().filter(item => {
    if (brand && brand !== 'all') {
      const brandKey = brand as keyof CrossRefItem;
      const brandValue = item[brandKey];
      if (brandValue && !brandValue.toLowerCase().includes(q)) return false;
    } else {
      const searchStr = `${item.tongjing} ${item.epson || ''} ${item.ndk || ''} ${item.kds || ''} ${item.murata || ''}`.toLowerCase();
      if (!searchStr.includes(q)) return false;
    }
    return true;
  });
}
