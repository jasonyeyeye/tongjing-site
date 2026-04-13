# China NewChip - Astro 项目规范

## 项目概述

- 多语言静态网站 (zh/en/ja/de)
- 使用 Astro 6 + Tailwind CSS v4
- 部署在 Cloudflare Pages
- 内置搜索 (pagefind)

## 技术栈

- **框架**: Astro 6.1.3
- **样式**: Tailwind CSS v4 + @tailwindcss/vite
- **国际化**: @astrojs/sitemap + 自定义 i18n
- **搜索**: pagefind
- **部署**: @astrojs/cloudflare

## 目录结构

```
src/
├── components/       # Astro 组件
│   ├── ui/           # 基础 UI 组件 (Button, Input, Select, Card, Badge)
│   ├── layout/       # 布局组件 (Header, Footer, Container)
│   ├── common/       # 通用组件 (LanguageSwitcher)
│   ├── form/         # 表单组件 (ContactForm, InquiryForm)
│   └── product/      # 产品相关组件
├── layouts/          # 页面布局 (BaseLayout)
├── pages/            # 页面
│   ├── zh/          # 中文
│   ├── en/          # 英文
│   ├── ja/          # 日文
│   └── de/          # 德文
├── i18n/            # 翻译文件
├── data/            # 静态数据
├── styles/          # 全局样式
└── utils/           # 工具函数
```

## 代码规范

- 组件使用 .astro 格式
- 样式使用 Tailwind CSS 类名
- 国际化使用 i18n.ts 工具函数
- 图片使用 WebP 格式优先

## 可用命令

```bash
npm run dev      # 开发服务器
npm run build    # 构建生产版本
npm run preview  # 预览构建结果
```

## 团队成员

项目团队包含以下专家 Agent，可通过 `claude --agent <name>` 调用：

| Agent | 职责 | 使用示例 |
|-------|------|---------|
| frontend-dev | 前端开发、UI优化、组件重构 | `claude --agent frontend-dev "优化产品卡片组件"` |
| performance-dev | 性能优化、Core Web Vitals | `claude --agent performance-dev "分析并优化LCP"` |
| seo-dev | SEO优化、元标签、结构化数据 | `claude --agent seo-dev "审查SEO结构"` |
| i18n-dev | 多语言一致性、本地化 | `claude --agent i18n-dev "检查中日翻译一致性"` |
| code-reviewer | 代码审查、安全检查 | `claude --agent code-reviewer "审查ContactForm组件"` |
| architect | 架构设计、可扩展性 | `claude --agent architect "评估内容集合设计"` |

## 快速开始团队优化

```bash
# 1. 性能全面审计
claude --agent performance-dev "全面审计网站性能，提出改进方案"

# 2. SEO 检查
claude --agent seo-dev "检查所有页面的SEO标签和结构化数据"

# 3. 代码审查
claude --agent code-reviewer "审查 src/components 下的所有组件"

# 4. 前端优化
claude --agent frontend-dev "评估UI一致性，改进用户体验"

# 5. 国际化审计
claude --agent i18n-dev "确保四种语言的内容同步"
```
