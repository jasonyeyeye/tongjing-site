#!/bin/bash
set -e

# Prebuild script for Cloudflare Pages
# Fetches data from Admin Worker KV and generates product JSON files

WORKER_URL="${WORKER_URL:-https://admin-worker.wangzczg-3e8.workers.dev}"
DATA_DIR="src/data"
TEMP_FILE="/tmp/teable_products.json"

echo "=== Starting prebuild ==="
echo "Fetching data from: $WORKER_URL"

# Create data directory if not exists
mkdir -p "$DATA_DIR"

# Fetch products from KV
echo "Fetching products..."
curl -sf "$WORKER_URL/api/export/products" > "$TEMP_FILE" || echo "[]" > "$TEMP_FILE"

# Count products
PRODUCT_COUNT=$(cat "$TEMP_FILE" | grep -o '"model"' | wc -l)
echo "Products fetched: $PRODUCT_COUNT"

# Create products directory
mkdir -p "$DATA_DIR/products"

if [ "$PRODUCT_COUNT" -gt 0 ]; then
    # Parse products and create individual files using Node.js
    node -e "
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('$TEMP_FILE', 'utf8'));

// Brand mapping
const brandMap = {
    '同晶': 'tongjing',
    'Tongjing': 'tongjing',
    'tongjing': 'tongjing'
};

// Category mapping based on model prefix
function getCategory(model) {
    const prefix = model.split('-')[0].toUpperCase();
    if (prefix.includes('32')) return 'rtc';
    if (prefix.startsWith('2A') || prefix.startsWith('3A')) return 'resonator';
    if (prefix.startsWith('5A') || prefix.startsWith('7A')) return 'oscillator';
    return 'oscillator';
}

// Lifecycle status to badge mapping
function getBadge(status, featured) {
    const s = (status || '').toLowerCase();
    if (s === '量产' || s === 'active') return featured ? 'hot' : 'default';
    if (s === '样品' || s === 'sample') return 'new';
    if (s.includes('停产') || s.includes('eol')) return 'discontinued';
    if (s.includes('推荐替代')) return 'futures';
    return 'default';
}

// Track unique brands
const brands = {};

data.forEach(product => {
    // Determine brand
    const brandName = product.brand || 'tongjing';
    const brandSlug = brandMap[brandName] || 'tongjing';

    // Create brand entry if not exists
    if (!brands[brandSlug]) {
        brands[brandSlug] = {
            id: brandSlug,
            slug: brandSlug,
            name: brandName,
            name_localized: { en: brandName, zh: brandName },
            description: '',
            description_localized: {},
            categories: [],
            featured: true
        };
        // Create brand directory
        fs.mkdirSync('$DATA_DIR/products/' + brandSlug, { recursive: true });
    }

    // Add category to brand if not exists
    const category = getCategory(product.model);
    if (!brands[brandSlug].categories.includes(category)) {
        brands[brandSlug].categories.push(category);
    }

    // Create product file - write Teable raw format for products.ts to transform
    const productFile = '$DATA_DIR/products/' + brandSlug + '/' + product.model + '.json';

    // Write the Teable raw format (products.ts will transform it)
    fs.writeFileSync(productFile, JSON.stringify(product, null, 2));
    console.log('Written: ' + productFile);
});

// Write brands.json
fs.writeFileSync('$DATA_DIR/brands.json', JSON.stringify(Object.values(brands), null, 2));
console.log('Total brands: ' + Object.keys(brands).length);
console.log('Total products: ' + data.length);
"
else
    echo "No products fetched"
fi

# Always create empty arrays for data files if not exist
[ ! -f "$DATA_DIR/products.json" ] && echo "[]" > "$DATA_DIR/products.json"

# Fetch brands (backup)
echo "Fetching brands..."
curl -sf "$WORKER_URL/api/export/brands" > "$DATA_DIR/brands_fetch.json" || echo "[]" > "$DATA_DIR/brands_fetch.json"

# Fetch articles
echo "Fetching articles..."
curl -sf "$WORKER_URL/api/export/articles" > "$DATA_DIR/articles.json" || echo "[]" > "$DATA_DIR/articles.json"

echo "=== Prebuild complete ==="

# List generated files
echo "Generated files:"
ls -la "$DATA_DIR/" 2>/dev/null || true
ls -la "$DATA_DIR/products/" 2>/dev/null || true
ls "$DATA_DIR/products/"*/*.json 2>/dev/null | head -10 || true
