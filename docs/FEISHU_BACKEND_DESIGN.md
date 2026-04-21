# 飞书后台系统设计方案
**项目：tongjing-site（晶振产品网站）**
**方案：静态网站 + 飞书多维表格/云文档作为内容后台 + 构建时同步**
**日期：2026-04-21**

---

## 一、现状分析

### 1.1 现有架构

```
静态资源 (dist/)
├── Astro 6 + Tailwind CSS v4
├── 输出：纯静态 HTML（Cloudflare Pages 部署）
├── 内置搜索：pagefind（构建时生成索引）
└── 联系表单：Cloudflare Worker（单独部署）

源代码 (src/)
├── data/              ← 内容硬编码在此
│   ├── products.ts    # 6个晶振产品（型号/频率/容差/封装/价格/库存）
│   ├── articles.ts    # 4篇技术文章（Markdown 富文本）
│   ├── brands.ts      # 品牌数据
│   └── crossReference.ts  # 竞品对照表（8条记录）
├── pages/             # 页面路由
├── components/       # UI 组件
├── layouts/           # 页面布局
└── utils/            # 工具函数（i18n）
```

### 1.2 现有数据结构

**products.ts（6个产品）**
| 字段 | 类型 | 示例 |
|------|------|------|
| id | string | `tongjing-tj3225k` |
| brandId | string | `tongjing` |
| model | string | `TJ3225K-26.000M` |
| category | enum | `resonator` / `oscillator` / `rtc` |
| frequency | string | `26MHz` |
| tolerance | string | `±10ppm` |
| package | string | `SMD3225` |
| loadCapacitance | string | `12pF` |
| esr | string | `30Ω` |
| stock | string | `500,000 PCS` |
| priceRange | string | `$0.08 - $0.12` |
| badge | enum | `hot` / `new` / `default` / `discontinued` / `futures` |
| specifications | Record<string,string> | `{ Package: "3.2×2.5×0.8mm", ... }` |

**articles.ts（4篇文章）**
| 字段 | 类型 |
|------|------|
| slug | string |
| title | string |
| category | `tech` / `industry` / `company` |
| date | string |
| author | string |
| excerpt | string |
| content | string（Markdown） |
| image | string（图片路径） |

**crossReference.ts（8条对照）**
| 字段 | 类型 |
|------|------|
| tongjing | string |
| epson / ndk / kds / murata | string（可选） |
| package | `3225` / `2520` / `2016` / `1610` |
| productId | string |

**brands.ts**
| 字段 | 类型 |
|------|------|
| id | string |
| name | string |
| logo | string |
| description | string |
| certifications | string[] |

---

## 二、目标架构

### 2.1 整体架构

```
┌─────────────────────────────────────────────────────────┐
│                    飞书（内容后台）                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │
│  │ 电子表格     │  │ 云文档       │  │ 多维表格          │  │
│  │ Products   │  │ Articles    │  │ (可选备选)       │  │
│  │ Brands     │  │             │  │                 │  │
│  │ CrossRef   │  │             │  │                 │  │
│  └─────────────┘  └─────────────┘  └─────────────────┘  │
└──────────────────────────┬──────────────────────────────┘
                           │ 同步脚本（构建时触发）
                           ▼
┌─────────────────────────────────────────────────────────┐
│              Astro 静态网站（src/data/）                  │
│  products.ts  articles.ts  brands.ts  crossReference.ts │
└──────────────────────────┬──────────────────────────────┘
                           │ astro build
                           ▼
┌─────────────────────────────────────────────────────────┐
│              Cloudflare Pages（静态托管）                  │
│                    dist/ (HTML/CSS/JS)                   │
└─────────────────────────────────────────────────────────┘
```

### 2.2 内容存储方案

| 内容类型 | 飞书载体 | 理由 |
|----------|----------|------|
| 产品数据（6个，结构化） | 电子表格 | API 读写完整，增删改查都验证通过 |
| 品牌数据（少量结构化） | 电子表格 | 与产品数据一起管理方便 |
| 竞品对照（8条，结构化） | 电子表格 | 同上 |
| 文章内容（富文本/Markdown） | 云文档 | block API 支持富文本，内容创作体验好 |
| 图片资源 | 飞书云空间 / public/images | 图片存飞书，通过 URL 引用 |

**为什么不选多维表格？**
多维表格的增删改查 API 部分返回 404（删除/更新记录有问题），电子表格的 v2 API 完整稳定。

### 2.3 同步触发方式

```
方式 A（推荐）：手动触发
  编辑飞书内容 → 本地运行 sync 脚本 → git push → CI/CD 构建

方式 B：CI/CD 自动触发
  编辑飞书内容 → 手动调用 CI workflow_dispatch → 自动同步 + 构建

方式 C：定时同步（备选）
  cron job 每天自动同步一次（适合更新不频繁的场景）
```

---

## 三、飞书数据结构设计

### 3.1 电子表格：产品数据（Products）

**表格 Token**：`By6bsNps8hU3lst9puPcjKsknEf`（已验证可用）
**Sheet ID**：`7bb28e`（首个工作表）

#### 表头格式

| A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| id | brandId | model | category | frequency | tolerance | package | loadCapacitance | esr | stock | priceRange | badge | pkg_width | pkg_height | pkg_depth | load_cap | esr_max | op_temp |

**category 枚举值**：`resonator` / `oscillator` / `rtc`
**badge 枚举值**：`hot` / `new` / `default` / `discontinued` / `futures`

**specifications 组装**：同步时将 M~R 列组装为 `Record<string,string>`：
```typescript
specifications: {
  'Package': `${row.pkg_width}×${row.pkg_height}×${row.pkg_depth}mm`,
  'Load Capacitance': row.load_cap,
  'ESR': row.esr_max,
  'Operating Temp': row.op_temp,
}

#### 示例数据行

| id | brandId | model | category | frequency | tolerance | package | loadCapacitance | esr | stock | priceRange | badge | specifications |
|----|---------|-------|----------|-----------|-----------|---------|-----------------|-----|-------|------------|-------|----------------|
| tongjing-tj3225k | tongjing | TJ3225K-26.000M | resonator | 26MHz | ±10ppm | SMD3225 | 12pF | 30Ω | 500,000 PCS | $0.08 - $0.12 | hot | `{...}` |

---

### 3.2 电子表格：品牌数据（Brands）

新建表格，Sheet 1 名：`Brands`

| A | B | C | D | E |
|---|---|---|---|---|
| id | name | description | certifications | logo |

**certifications 列格式**：JSON 数组字符串
```json
["ISO9001","AEC-Q100","RoHS"]
```

---

### 3.3 电子表格：竞品对照（CrossReference）

新建表格，Sheet 1 名：`CrossRef`

| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| tongjing | epson | ndk | kds | murata | package | productId |

**package 枚举值**：`3225` / `2520` / `2016` / `1610`

---

### 3.4 云文档：文章内容（Articles）

每篇文章一个云文档，文档标题 = 文章标题。

**文档元数据**（存在文档第一页或通过 API 字段）：
| 字段 | 位置 |
|------|------|
| slug | 文档标题（URL slug 从标题生成） |
| category | 第一行特殊标记 `#category:tech` |
| date | block 元数据 |
| author | block 元数据 |
| excerpt | block 元数据 |
| image | block 元数据 |

**文章内容**：
- 正文使用 Markdown block（飞书原生支持 Markdown 语法）
- 图片通过 `image` 块插入

**备选方案（更结构化）**：元数据存电子表格，文章内容存云文档，通过 `slug` 字段关联。

**推荐方案**：元数据 + 正文全部存云文档，通过 block API 读取解析。

---

## 四、同步脚本设计

### 4.1 脚本架构

```
scripts/
├── feishu/
│   ├── sync.ts           # 主入口，调用各模块
│   ├── client.ts         # 飞书 API 客户端（tenant_access_token 管理）
│   ├── products.ts       # 产品数据同步
│   ├── articles.ts       # 文章数据同步
│   ├── brands.ts         # 品牌数据同步
│   ├── crossRef.ts       # 竞品对照同步
│   └── types.ts          # TypeScript 类型定义
├── data/                 # 同步输出（git 管理）
│   ├── products.ts
│   ├── articles.ts
│   ├── brands.ts
│   └── crossReference.ts
└── output/               # 临时输出（.gitignore）
```

### 4.2 同步流程

```
1. 获取 tenant_access_token（缓存，TTL 内复用）
2. 并行获取所有电子表格数据（products / brands / crossRef）
3. 遍历文章云文档列表，获取每篇文档的 block 数据
4. 解析 block → 转换为 TypeScript 格式
5. 生成 .ts 文件到 src/data/
6. 输出同步报告（新增/更新/删除数量）
```

### 4.3 飞书 API 客户端设计

```typescript
// scripts/feishu/client.ts
class FeishuClient {
  private token: string | null = null;
  private tokenExpiry = 0;

  async getToken(): Promise<string> { ... }
  async getSheetValues(token, sheetToken, range): Promise<any[]> { ... }
  async getDocumentBlocks(token, docToken): Promise<Block[]> { ... }
  async listDocuments(token, folderToken?): Promise<DocMeta[]> { ... }
}
```

**Token 管理**：缓存到内存，TTL = 2 小时，快过期时自动刷新。

### 4.4 错误处理策略

| 场景 | 处理方式 |
|------|----------|
| Token 获取失败 | 重试 3 次，间隔 2s，失败则 exit(1) |
| 表格读取失败 | 跳过该表，输出警告，继续处理其他表 |
| 文章读取失败 | 跳过该文章，输出警告 |
| 数据解析失败 | 输出具体行号和错误原因，exit(1) |
| 输出文件写入失败 | 输出错误，exit(1) |

---

## 五、数据模型映射

### 5.1 Products 映射

```
飞书表格行 → TypeScript Product 对象
```

| 表格列 | Product 字段 | 转换 |
|--------|-------------|------|
| id | id | 直接赋值 |
| brandId | brandId | 直接赋值 |
| model | model | 直接赋值 |
| category | category | 直接赋值（enum） |
| frequency | frequency | 直接赋值 |
| tolerance | tolerance | 直接赋值 |
| package | package | 直接赋值 |
| loadCapacitance | loadCapacitance | 直接赋值 |
| esr | esr | 直接赋值 |
| stock | stock | 直接赋值 |
| priceRange | priceRange | 直接赋值 |
| badge | badge | 直接赋值（enum） |
| M (JSON) | specifications | JSON.parse() |

### 5.2 Articles 映射

```
飞书云文档 blocks → TypeScript Article 对象
```

解析策略：
- 文档标题 → slug（转小写，空格变连字符，去除特殊字符）
- 第一个 `Heading1` block → 检测 `#category:xxx` 标记
- 第二个 `Heading1` block → 实际文章标题（跳过 category 行）
- `Paragraph` blocks → 收集为 content 数组，最后 join('\n')
- `Table` blocks → 保留 Markdown 表格语法
- `Bullet` / `Ordered` → 保留列表语法

**简化方案（优先实现）**：
- 在电子表格（Articles Index）存元数据（slug / title / category / date / author / excerpt / image）
- 正文 content 存云文档，通过 API 读取文档内容
- 同步时：通过表格的 `docToken` 字段关联到具体云文档

---

## 六、文件输出格式

### 6.1 输出 products.ts

```typescript
// Generated by scripts/feishu/sync.ts — do not edit manually
import type { Product } from './types';

export const products: Product[] = [
  {
    id: 'tongjing-tj3225k',
    brandId: 'tongjing',
    model: 'TJ3225K-26.000M',
    // ... (完整对象)
    specifications: {
      'Package': '3.2×2.5×0.8mm',
      'Load Capacitance': '12pF',
      // ...
    },
  },
  // ...
];

export function getAllProducts(): Product[] { return products; }
export function getProductBySlug(id: string): Product | undefined { return products.find(p => p.id === id); }
// ... 其他现有函数保留
```

### 6.2 输出 articles.ts

```typescript
// Generated by scripts/feishu/sync.ts — do not edit manually
import type { Article } from './types';

export const articles: Article[] = [
  {
    slug: 'crystal-resonator-principles-applications',
    title: 'Working Principle and Applications of Crystal Resonators',
    category: 'tech',
    date: '2026-03-15',
    author: 'Dr. Zhang Wei',
    excerpt: '...',
    content: `## Introduction\n\nCrystal resonators are...`,
    image: '/images/article-crystal-principles_001.jpg',
  },
  // ...
];
```

---

## 七、使用流程

### 7.1 内容编辑流程

```
1. 编辑飞书内容
   ├── 产品/品牌/竞品 → 打开电子表格编辑
   └── 文章 → 打开云文档编辑

2. 本地同步
   $ npx tsx scripts/feishu/sync.ts          # 同步所有
   $ npx tsx scripts/feishu/sync.ts products # 只同步产品

3. 提交变更
   $ git add src/data/ && git commit -m "chore: sync content from Feishu"
   $ git push

4. CI/CD 自动构建
   └── Cloudflare Pages 自动构建 + 部署
```

### 7.2 CI/CD 集成

**.github/workflows/sync-and-build.yml**：

```yaml
name: Sync from Feishu and Build
on:
  workflow_dispatch:  # 手动触发
  schedule:
    - cron: '0 2 * * *'  # 每天凌晨 2 点自动同步（可选）

jobs:
  sync-and-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
      - run: npm ci
      - run: npx tsx scripts/feishu/sync.ts
        env:
          FEISHU_APP_ID: ${{ secrets.FEISHU_APP_ID }}
          FEISHU_APP_SECRET: ${{ secrets.FEISHU_APP_SECRET }}
      - run: npm run build
      - uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: tongjing-site
          directory: dist
```

---

## 八、实施计划

### Phase 1：基础同步脚本（第1步）
- [ ] 创建 `scripts/feishu/` 目录结构
- [ ] 实现 `client.ts`（Token 管理 + API 调用）
- [ ] 实现 `products.ts`（电子表格读取 + 生成 products.ts）
- [ ] 实现 `sync.ts`（主入口）
- [ ] 验证：运行脚本，对比输出与现有 `src/data/products.ts` 完全一致

### Phase 2：完善数据同步（第2步）
- [ ] 实现 `brands.ts`
- [ ] 实现 `crossRef.ts`
- [ ] 创建飞书电子表格（Brands / CrossRef）
- [ ] 验证所有数据同步正确

### Phase 3：文章同步（第3步）
- [ ] 设计与创建文章云文档结构
- [ ] 实现 `articles.ts`（云文档读取 + 生成 articles.ts）
- [ ] 将现有 4 篇文章迁移到飞书云文档
- [ ] 验证文章内容完整（Markdown 表格/列表/代码块）

### Phase 4：CI/CD 集成（第4步）
- [ ] 配置 GitHub Secrets（FEISHU_APP_ID / FEISHU_APP_SECRET）
- [ ] 创建 sync workflow
- [ ] 测试手动触发 workflow
- [ ] 可选：配置每日自动同步 cron

### Phase 5：文档与交接（第5步）
- [ ] 更新 README.md（说明新工作流）
- [ ] 更新 CLAUDE.md（同步脚本使用说明）
- [ ] 整理飞书电子表格（在飞书中创建正式的数据管理文档）

---

## 九、关键决策点（需哥确认）

### D1：同步触发方式 ✅ 确认

**选择：A — 手动同步**

流程：编辑飞书内容 → 本地运行脚本 → git push → CI/CD 构建

### D2：specifications 字段存储格式 ✅ 确认

**选择：每个规格单独一列**

电子表格列：id / brandId / model / category / frequency / tolerance / package / loadCapacitance / esr / stock / priceRange / badge / specifications

每个规格独立字段（Frequency / Tolerance / Package / Load Capacitance / ESR / Operating Temp），同步时组装成 `Record<string,string>`。

### D3：图片资源存放 ✅ 确认

**选择：A — 继续存 public/images/**

图片作为静态资源管理，在飞书电子表格中记录图片路径（如 `/images/product-resonator-3225_001.jpg`）。

---

## 十、已知限制与风险

| 风险 | 影响 | 缓解措施 |
|------|------|----------|
| 飞书 API 限流 | 频繁同步可能触发 | 脚本内加延迟，Token 缓存复用 |
| 电子表格列顺序变化 | 解析错误 | 脚本用字母索引（A/B/C...）而非首行匹配 |
| 云文档内容格式不标准 | 解析失败 | 提供同步报告，失败则 exit |
| 飞书访问权限 | 需保证 bot 有文档读取权限 | 将 bot 添加为文档协作者 |
| 多语言扩展 | 未来可能需要中英双语 | 设计时预留 locale 字段 |

---

## 十一、飞书资源清单（本次测试创建）

| 资源类型 | Token / ID | 用途 |
|----------|------------|------|
| 电子表格 | `By6bsNps8hU3lst9puPcjKsknEf` | 产品数据（已有测试数据） |
| 多维表格 | `BascnOsq4s8j7gtqE9aJqbR5nWd` | 测试用（暂不使用） |
| 云文档 | `O2cjdQl1zoYCXQxf4sJcvOEunzd` | 测试用（暂不使用） |
| 文件夹 | `WvUrfbpqUlcWLTdDi48cX4s4nm1` | 旺财-产品数据（测试创建） |

**正式环境需创建**：
- 产品数据电子表格（复用 `By6bsNps8hU3lst9puPcjKsknEf` 或新建）
- 品牌数据电子表格（新建）
- 竞品对照电子表格（新建）
- 文章云文档（每个文章一个，共 4 个）
