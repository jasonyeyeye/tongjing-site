# ELECTRO-PARTS 产品数据同步方案 - 完整计划

## 1. 问题分析

### 当前架构（错误）
```
Teable数据 → Admin Worker → KV
                              ↓
                    预构建脚本写 JSON 文件
                              ↓
                    src/data/products.ts (硬编码，不读JSON!)
                              ↓
                    getStaticPaths() 使用硬编码数据
```

### 问题
- `src/data/products.ts` 是 TypeScript 硬编码数组，不读取任何 JSON 文件
- 预构建脚本写入的 JSON 文件完全被忽略
- 产品页面使用 `products.ts` 中的硬编码数据

---

## 2. 目标架构

```
Teable数据 → Admin Worker → KV (products_data)
                              ↓
                    预构建脚本读取 KV API
                              ↓
                    生成 src/data/products.json (数组格式)
                              ↓
                    修改 products.ts 从 JSON 读取
                              ↓
                    Astro getStaticPaths() 使用动态数据
                              ↓
                    生成静态产品页面
```

---

## 3. 数据格式

### Teable 原始数据 (从 KV 导出)
```json
{
  "model": "7A-25.000MEEJ-T",
  "brand": "同晶",
  "short_description": "7A",
  "parameters": {
    "frequency": "25.000 MHz",
    "package_type": "7050"
  }
}
```

### products.json (预构建生成)
```json
[
  {
    "id": "tongjing-7a-25-000meej-t",
    "brandId": "tongjing",
    "model": "7A-25.000MEEJ-T",
    "brand": "同晶",
    "category": "oscillator",
    "frequency": "25.000 MHz",
    "tolerance": "±50 ppm",
    "package": "7050",
    "specifications": {...}
  }
]
```

---

## 4. 执行计划

### Phase 1: 修改 products.ts 支持 JSON 加载

**文件**: `src/data/products.ts`

**改动**:
- 保留 `Product` 接口定义
- `products` 数组改为从 JSON 文件动态加载
- 添加 `loadProducts()` 函数
- 保持 `getProductsByBrand()`, `getAllProducts()` 等导出函数不变

**验证**: 本地运行 `npm run build` 确认正常

### Phase 2: 修改产品页面适配新数据格式

**文件**: `src/pages/products/[slug].astro`

**改动**:
- `getStaticPaths()` 改为从加载的 products 数组读取
- 页面模板适配新的产品数据字段

**验证**: 本地 `npm run dev` 检查产品页面

### Phase 3: 更新预构建脚本

**文件**: `scripts/prebuild.sh`

**改动**:
- 从 KV API 获取 Teable 数据
- 转换为目标格式（匹配 Product 接口）
- 生成 `src/data/products.json`
- 生成 `src/data/brands.json`

### Phase 4: 测试完整流程

**步骤**:
1. 后台点击"同步Teable" → 数据存入 KV
2. 后台点击"触发构建" → Pages 构建
3. 预构建脚本获取 KV 数据 → 生成 JSON
4. Astro 读取 JSON → 生成静态页面
5. 验证网站显示 Teable 数据

---

## 5. 详细任务清单

### Task 1: 修改 products.ts
- [ ] 读取 `src/data/products.json`
- [ ] 转换 Teable 数据格式为 Product 接口
- [ ] 实现 `loadProducts()` 函数
- [ ] 保留现有导出函数

### Task 2: 修改产品页面
- [ ] 更新 `getStaticPaths()` 读取逻辑
- [ ] 适配新的数据字段
- [ ] 确保参数显示正确

### Task 3: 更新预构建脚本
- [ ] 从 `https://admin-worker.xx.workers.dev/api/export/products` 获取数据
- [ ] 转换数据格式
- [ ] 写入 `src/data/products.json`
- [ ] 处理品牌数据

### Task 4: 提交并测试
- [ ] 提交代码到 GitHub
- [ ] 后台同步 Teable 数据
- [ ] 触发构建
- [ ] 验证产品页面显示

---

## 6. 关键文件

| 文件 | 作用 |
|------|------|
| `src/data/products.ts` | 产品数据加载器（需修改） |
| `src/data/products.json` | 预构建生成的产品数据 |
| `src/pages/products/[slug].astro` | 产品详情页 |
| `scripts/prebuild.sh` | 预构建脚本（需修改） |
| `admin-worker/index.ts` | Worker（已完成） |

---

## 7. 注意事项

1. **数据格式兼容**: Teable 字段名是中文（如 `型号`、`品牌`），需要转换为英文字段
2. **ID 生成**: 产品 ID 需要从 model 名称生成 slug
3. **分类判断**: 根据产品型号前缀（7A/5A/3A/2A）判断是 oscillator 还是 resonator
4. **品牌映射**: Teable 品牌名 `同晶` → `tongjing`

---

## 8. 成功标准

1. `npm run build` 本地构建成功
2. 预构建脚本正确生成 `products.json`
3. 后台"同步Teable"后触发构建
4. 网站产品页面显示 Teable 中的数据
5. 每次 Teable 更新后，网站同步更新
