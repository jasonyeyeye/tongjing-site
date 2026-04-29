#!/bin/bash
set -e

# Prebuild script for Cloudflare Pages
# Fetches data from Admin Worker KV and generates local JSON files

WORKER_URL="${WORKER_URL:-https://admin-worker.wangzczg-3e8.workers.dev}"
DATA_DIR="src/data"
TEMP_FILE="/tmp/teable_data.json"

echo "=== Starting prebuild ==="
echo "Fetching data from: $WORKER_URL"

# Create data directory if not exists
mkdir -p "$DATA_DIR"

# Fetch products
echo "Fetching products..."
curl -sf "$WORKER_URL/api/export/products" > "$TEMP_FILE" || echo "[]" > "$TEMP_FILE"

# Count products
PRODUCT_COUNT=$(cat "$TEMP_FILE" | grep -o '"model"' | wc -l)
echo "Products fetched: $PRODUCT_COUNT"

# Create products directory structure and write individual files
mkdir -p "$DATA_DIR/products"

if [ "$PRODUCT_COUNT" -gt 0 ]; then
    # Parse products and create individual files
    node -e "
const data = require('$TEMP_FILE');
const brands = {};

data.forEach(product => {
    const brandSlug = (product.brand || 'unknown').toLowerCase().replace(/[^a-z0-9]/g, '-');
    const brandDir = '$DATA_DIR/products/' + brandSlug;
    
    // Track brand
    if (!brands[brandSlug]) {
        brands[brandSlug] = {
            id: brandSlug,
            slug: brandSlug,
            name: product.brand || brandSlug,
            name_localized: { en: product.brand || brandSlug, zh: product.brand || brandSlug },
            description: '',
            description_localized: {},
            categories: [],
            featured: true
        };
    }
    
    // Ensure brand directory exists
    require('fs').mkdirSync(brandDir, { recursive: true });
    
    // Create model slug from model name
    const modelSlug = product.model.replace(/[^a-zA-Z0-9]/g, '-');
    const productFile = brandDir + '/' + modelSlug + '.json';
    
    // Write product file
    require('fs').writeFileSync(productFile, JSON.stringify(product, null, 2));
});

    // Write brands.json
    const brandsArray = Object.values(brands);
    require('fs').writeFileSync('$DATA_DIR/brands.json', JSON.stringify(brandsArray, null, 2));
    console.log('Brands written:', brandsArray.length);
    console.log('Products written:', data.length);
"
else
    echo "No products fetched, using empty data"
    echo "[]" > "$DATA_DIR/products.json"
fi

# Fetch brands
echo "Fetching brands..."
curl -sf "$WORKER_URL/api/export/brands" > "$DATA_DIR/brands_fetch.json" || echo "[]" > "$DATA_DIR/brands_fetch.json"

# Fetch articles
echo "Fetching articles..."
curl -sf "$WORKER_URL/api/export/articles" > "$DATA_DIR/articles.json" || echo "[]" > "$DATA_DIR/articles.json"

echo "=== Prebuild complete ==="
ls -la "$DATA_DIR/" 2>/dev/null || true
ls -la "$DATA_DIR/products/" 2>/dev/null || true
