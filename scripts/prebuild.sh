#!/bin/bash
set -e

# Prebuild script for Cloudflare Pages
# Fetches data from Admin Worker KV and generates local JSON files

WORKER_URL="${WORKER_URL:-https://admin-worker.wangzczg-3e8.workers.dev}"
DATA_DIR="src/data"

echo "=== Starting prebuild ==="
echo "Fetching data from: $WORKER_URL"

# Create data directory if not exists
mkdir -p "$DATA_DIR"

# Fetch products
echo "Fetching products..."
curl -sf "$WORKER_URL/api/export/products" > "$DATA_DIR/products.json" || echo "[]" > "$DATA_DIR/products.json"
echo "Products: $(cat $DATA_DIR/products.json | grep -o '"model"' | wc -l) records"

# Fetch brands
echo "Fetching brands..."
curl -sf "$WORKER_URL/api/export/brands" > "$DATA_DIR/brands.json" || echo "[]" > "$DATA_DIR/brands.json"
echo "Brands: $(cat $DATA_DIR/brands.json | grep -o '"name"' | wc -l) records"

# Fetch articles
echo "Fetching articles..."
curl -sf "$WORKER_URL/api/export/articles" > "$DATA_DIR/articles.json" || echo "[]" > "$DATA_DIR/articles.json"
echo "Articles: $(cat $DATA_DIR/articles.json | grep -o '"title"' | wc -l) records"

echo "=== Prebuild complete ==="
