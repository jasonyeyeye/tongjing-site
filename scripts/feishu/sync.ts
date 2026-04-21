/**
 * 飞书内容同步脚本 - 主入口
 * 用法：
 *   npx tsx scripts/feishu/sync.ts        # 同步所有
 *   npx tsx scripts/feishu/sync.ts products  # 只同步产品
 *   npx tsx scripts/feishu/sync.ts brands   # 只同步品牌
 *   npx tsx scripts/feishu/sync.ts crossref # 只同步竞品对照
 */

import { run as runProducts } from './products';
import { run as runBrands } from './brands';
import { run as runCrossRef } from './crossRef';
import { run as runArticles } from './articles';

async function main() {
  const args = process.argv.slice(2);
  const target = args[0] || 'all';

  console.log('🚀 Feishu Content Sync');
  console.log(`   Target: ${target}`);
  console.log('');

  if (target === 'all' || target === 'products') {
    await runProducts();
  }
  if (target === 'all' || target === 'brands') {
    await runBrands();
  }
  if (target === 'all' || target === 'crossref') {
    await runCrossRef();
  }
  if (target === 'all' || target === 'articles') {
    await runArticles();
  }

  console.log('');
  console.log('✨ Done');
}

main().catch((err) => {
  console.error('❌ Sync failed:', err);
  process.exit(1);
});
