/**
 * 同步文章数据
 * 从飞书云文档读取 block 内容 → 生成 src/data/articles.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { getToken } from './client';

const API_BASE = 'https://open.feishu.cn/open-apis';

// 从环境变量读取文档 token 列表（空格分隔的多个文档）
// FEISHU_ARTICLE_DOCS=doc_id_1 doc_id_2 doc_id_3 doc_id_4
const ARTICLE_DOCS = (process.env.FEISHU_ARTICLE_DOCS || '').trim().split(/\s+/).filter(Boolean);

interface ArticleBlock {
  slug: string;
  title: string;
  category: 'tech' | 'industry' | 'company';
  date: string;
  author: string;
  excerpt: string;
  content: string;
  image?: string;
}

/**
 * 从飞书云文档获取所有 block
 */
async function fetchDocumentBlocks(docId: string, token: string): Promise<any[]> {
  const items: any[] = [];
  let pageToken: string | undefined;

  do {
    const url = new URL(`${API_BASE}/docx/v1/documents/${docId}/blocks`);
    url.searchParams.set('document_id', docId);
    url.searchParams.set('page_size', '500');
    if (pageToken) url.searchParams.set('page_token', pageToken);

    const resp = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await resp.json() as { code: number; msg: string; data: { items: any[]; page_token: string; has_more: boolean } };

    if (data.code !== 0) {
      throw new Error(`Failed to fetch blocks: ${data.code} ${data.msg}`);
    }

    items.push(...data.data.items);
    pageToken = data.data.has_more ? data.data.page_token : undefined;
  } while (pageToken);

  return items;
}

async function fetchDocumentMeta(docId: string, token: string): Promise<{ title: string }> {
  const resp = await fetch(`${API_BASE}/docx/v1/documents/${docId}?document_id=${docId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await resp.json() as { code: number; data: { document: { document_id: string; title: string } } };
  if (data.code !== 0) throw new Error(`Failed to fetch doc meta: ${data.code} ${data.msg}`);
  return { title: data.data.document.title };
}

/**
 * 将 block 树展平并提取文本内容
 */
function extractTextFromElements(elements: any[]): string {
  return elements.map(el => {
    if (el.text_run) return el.text_run.content || '';
    if (el.mention_user) return '';
    if (el.mention_doc) return '';
    if (el.equation) return '';
    return '';
  }).join('');
}

/**
 * 解析飞书 block 树为段落列表
 */
function parseBlocks(blocks: any[]): string[] {
  const lines: string[] = [];
  let i = 0;

  // 构建 children 索引
  const childrenMap: Record<string, any[]> = {};
  for (const block of blocks) {
    if (block.children && block.children.length > 0) {
      childrenMap[block.block_id] = block.children;
    }
  }

  function processBlock(block: any) {
    const bt = block.block_type;

    if (bt === 2) { // paragraph
      const text = extractTextFromElements(block.paragraph?.elements || []);
      if (text) lines.push(text);
    } else if (bt === 3) { // heading1
      const text = extractTextFromElements(block.heading1?.elements || []);
      if (text) lines.push(`## ${text}`);
    } else if (bt === 4) { // heading2
      const text = extractTextFromElements(block.heading2?.elements || []);
      if (text) lines.push(`### ${text}`);
    } else if (bt === 5) { // heading3
      const text = extractTextFromElements(block.heading3?.elements || []);
      if (text) lines.push(`#### ${text}`);
    } else if (bt === 12) { // bullet
      const text = extractTextFromElements(block.bullet?.elements || []);
      if (text) lines.push(`- ${text}`);
    } else if (bt === 13) { // ordered
      const text = extractTextFromElements(block.ordered?.elements || []);
      if (text) lines.push(`1. ${text}`);
    } else if (bt === 14) { // code
      const text = extractTextFromElements(block.code?.elements || []);
      if (text) lines.push('```\n' + text + '\n```');
    } else if (bt === 15) { // quote
      const text = extractTextFromElements(block.quote?.elements || []);
      if (text) lines.push(`> ${text}`);
    } else if (bt === 22) { // divider
      lines.push('---');
    } else if (bt === 'table') { // table（只读）
      // 表格 block_children 里有 rows
      // 简化处理，标记表格存在
      lines.push('[TABLE]');
    }
  }

  // 遍历顶层 blocks（block_id 是 document 根节点的直接子节点）
  // 飞书 doc 返回的 blocks，第一项是 document metadata（block_id = doc_id）
  const rootBlock = blocks[0];
  if (!rootBlock) return lines;

  const topLevelIds = rootBlock.children || [];

  // 重新遍历以保持顺序
  const blockMap: Record<string, any> = {};
  for (const b of blocks) {
    blockMap[b.block_id] = b;
  }

  for (const childId of topLevelIds) {
    const child = blockMap[childId];
    if (!child) continue;

    processBlock(child);

    // 处理子块
    if (child.children) {
      for (const subId of child.children) {
        const sub = blockMap[subId];
        if (sub) processBlock(sub);
      }
    }
  }

  return lines;
}

/**
 * 根据标题自动推断 category 和 slug
 */
function inferMeta(title: string): { slug: string; category: 'tech' | 'industry' | 'company' } {
  const t = title.toLowerCase();
  if (t.includes('industry') || t.includes('market') || t.includes('trend')) {
    return { slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-'), category: 'industry' };
  }
  if (t.includes('company') || t.includes('achievement') || t.includes('certification') || t.includes('news')) {
    return { slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-'), category: 'company' };
  }
  return { slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-'), category: 'tech' };
}

/**
 * 主同步函数
 */
async function syncArticles(): Promise<ArticleBlock[]> {
  if (ARTICLE_DOCS.length === 0) {
    throw new Error('Missing env: FEISHU_ARTICLE_DOCS (space-separated doc IDs)');
  }

  const token = await getToken();

  const articles: ArticleBlock[] = [];

  for (const docId of ARTICLE_DOCS) {
    console.log(`   Fetching doc ${docId}...`);

    // 获取文档元数据（标题）
    const meta = await fetchDocumentMeta(docId, token);
    const title = meta.title;

    // 获取文档内容
    const blocks = await fetchDocumentBlocks(docId, token);
    const lines = parseBlocks(blocks);

    if (lines.length === 0) {
      console.warn(`   ⚠️  Doc ${docId} has no content, skipping`);
      continue;
    }

    const slugInfo = inferMeta(title);

    // 从 lines 提取 date、author、excerpt（如果有元信息行）
    let date = new Date().toISOString().slice(0, 10);
    let author = 'China NewChip';
    let excerpt = '';
    let image: string | undefined;
    const contentLines: string[] = [];
    let inMeta = true;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (inMeta) {
        if (line.startsWith('## ') || line.startsWith('### ') || line.startsWith('- ')) {
          inMeta = false;
        } else if (line.startsWith('date:')) {
          date = line.replace('date:', '').trim();
          continue;
        } else if (line.startsWith('author:')) {
          author = line.replace('author:', '').trim();
          continue;
        } else if (line.startsWith('excerpt:')) {
          excerpt = line.replace('excerpt:', '').trim();
          continue;
        } else if (line.startsWith('image:')) {
          image = line.replace('image:', '').trim();
          continue;
        }
      }

      if (!inMeta) {
        contentLines.push(line);
      }
    }

    if (!excerpt) {
      excerpt = contentLines.find(l => l.length > 20 && !l.startsWith('#')) || title;
    }

    articles.push({
      slug: slugInfo.slug,
      title,
      category: slugInfo.category,
      date,
      author,
      excerpt,
      content: contentLines.join('\n'),
      image,
    });
  }

  return articles;
}

function generateArticlesFile(articles: ArticleBlock[]): string {
  const lines: string[] = [];
  lines.push(`// Generated by scripts/feishu/sync.ts — do not edit manually`);
  lines.push(`// Sync: npx tsx scripts/feishu/sync.ts articles`);
  lines.push(``);
  lines.push(`export interface Article {`);
  lines.push(`  slug: string;`);
  lines.push(`  title: string;`);
  lines.push(`  category: 'tech' | 'industry' | 'company';`);
  lines.push(`  date: string;`);
  lines.push(`  author: string;`);
  lines.push(`  excerpt: string;`);
  lines.push(`  content: string;`);
  lines.push(`  image?: string;`);
  lines.push(`}`);
  lines.push(``);
  lines.push(`export const articles: Article[] = [`);

  for (const a of articles) {
    lines.push(`  {`);
    lines.push(`    slug: '${a.slug}',`);
    lines.push(`    title: ${JSON.stringify(a.title)},`);
    lines.push(`    category: '${a.category}' as const,`);
    lines.push(`    date: '${a.date}',`);
    lines.push(`    author: ${JSON.stringify(a.author)},`);
    lines.push(`    excerpt: ${JSON.stringify(a.excerpt)},`);
    lines.push("    content: `");
    lines.push(a.content);
    lines.push("`,");
    if (a.image) {
      lines.push(`    image: ${JSON.stringify(a.image)},`);
    }
    lines.push(`  },`);
  }

  lines.push(`];`);
  lines.push(``);
  lines.push(`export function getArticleBySlug(slug: string): Article | undefined {`);
  lines.push(`  return articles.find((a) => a.slug === slug);`);
  lines.push(`}`);
  lines.push(``);
  lines.push(`export function getAllArticles(): Article[] {`);
  lines.push(`  return articles;`);
  lines.push(`}`);
  lines.push(``);
  lines.push(`export function getArticlesByCategory(category: Article['category']): Article[] {`);
  lines.push(`  return articles.filter((a) => a.category === category);`);
  lines.push(`}`);

  return lines.join('\n');
}

export async function run() {
  console.log('📝 Syncing articles from Feishu...');

  try {
    const articles = await syncArticles();
    console.log(`   Found ${articles.length} articles`);

    const output = generateArticlesFile(articles);
    const outputPath = path.resolve(process.cwd(), 'src/data/articles.ts');
    fs.writeFileSync(outputPath, output, 'utf-8');

    console.log(`   ✅ Written to src/data/articles.ts`);
    return { articles, count: articles.length };
  } catch (err) {
    console.error(`   ❌ Failed to sync articles: ${err}`);
    process.exit(1);
  }
}
