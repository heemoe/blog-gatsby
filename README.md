# blog-gatsby

一个基于 `Astro` 的个人博客仓库，目标是把内容维护成本压到最低：

- 内容直接保存在仓库的 Markdown 文件里
- 站点由 `Astro` 生成纯静态页面
- 生产部署目标是 `Cloudflare Pages`
- 不再保留 CMS、Netlify、Gatsby、评论、标签/分类/归档页

## Codex 入口

默认先读：

- `AGENTS.md`
- `docs/plans/PLANS.md`
- `docs/plans/2026-04-22-gatsby-to-astro-cloudflare.md`

如果任务涉及发文或页面内容，再补读：

- `src/content/blog/`
- `src/content/pages/`
- `src/site.config.ts`

## 快速开始

安装依赖：

```bash
npm install
```

启动本地开发：

```bash
npm run dev
```

运行检查：

```bash
npm run check
```

构建生产产物：

```bash
npm run build
```

产物输出目录固定为：

```bash
dist/
```

## 目录结构

- `src/content/blog/`
  - 博客文章 Markdown。
- `src/content/pages/`
  - 当前仅保留静态页面内容，例如 About。
- `src/pages/`
  - Astro 路由页面：首页、文章详情、About、404、RSS。
- `src/layouts/`
  - 页面布局。
- `src/components/`
  - 轻量 Astro 组件。
- `src/site.config.ts`
  - 站点标题、作者、导航、canonical 域名、Cloudflare Pages 参数。
- `public/`
  - 静态资源、`_redirects`、`robots.txt`。

## 内容模型

博客文章固定 frontmatter 模板如下：

```md
---
title: Example title
description: One short summary sentence for cards and SEO.
date: 2026-04-22T12:00:00Z
draft: false
slug: example-title
tags:
  - astro
heroImage: /media/example-cover.jpg
---
```

说明：

- `title`、`description`、`date`、`draft`、`slug` 是固定字段。
- `tags`、`heroImage` 是可选字段。
- 公开文章路由统一为 `/posts/<slug>/`。
- `draft: true` 的文章允许先合并，但不会出现在公开列表、RSS 和 sitemap 中。
- 文章图片优先放到 `public/media/`，正文中使用绝对路径，例如 `/media/example-cover.jpg`。

## 新增/修改文章工作流

默认使用 `短分支 + PR + Cloudflare Preview + 合并到 main`：

1. 从 `main` 拉出一个短分支，例如：

```bash
git checkout -b post/my-new-post
```

2. 在 `src/content/blog/` 新建或修改 Markdown 文件。
3. 如果有图片，放到 `public/media/`。
4. 本地运行：

```bash
npm run dev
npm run check
npm run build
```

5. 推送分支并创建 PR。
6. 在 Cloudflare Pages 的 Preview URL 上检查：
   - 排版
   - 图片路径
   - 代码块渲染
   - 链接
   - 标题与描述
7. 通过后合并到 `main`，由 Cloudflare Pages 自动发布。

约束：

- 不直接推 `main`
- 不通过 GitHub 网页热改生产内容
- 小改动也保留 Preview，避免 Markdown 或静态资源路径问题直接进生产

## Cloudflare Pages 配置

仓库内唯一有效的部署参数是：

- 生产分支：`main`
- 构建命令：`npm run build`
- 输出目录：`dist`
- 目标域名：`https://zsms.me`

推荐上线顺序：

1. 先让仓库在 Cloudflare Pages 上跑通 `*.pages.dev`
2. 再绑定 `zsms.me`
3. 确认生产流量完全由 Cloudflare Pages 提供后，再处理 Netlify 退场

## 需要人工完成的事项

这些步骤不能由仓库代码代替：

1. 把默认生产分支从 `master` 改成 `main`
2. 在 Cloudflare Pages 连接 GitHub 仓库，并把生产分支设为 `main`
3. 验证 `*.pages.dev` 预发布
4. 绑定 `zsms.me`
5. 如果 Cloudflare 没有自动处理 apex 域名记录，手工确认 DNS
6. Cloudflare 生产验证通过后，再去 Netlify：
   - 移除自定义域名绑定
   - 关闭自动部署
   - 停用旧 Identity / Git Gateway
   - 观察稳定后归档或删除旧站点

## 旧 Netlify 处理原则

- 不要在 Cloudflare 生产站验证前提前删除 Netlify
- 先切 Cloudflare，再停 Netlify
- 如果同域历史上装过 Gatsby 的离线缓存，新站已经在前端主动注销旧 service worker，减少切换后读到旧资源的概率

## 当前站点范围

v1 只保留：

- 首页
- 文章详情页
- About
- RSS
- sitemap
- 404

明确不保留：

- Netlify CMS `/admin`
- Disqus 评论
- 标签页
- 分类页
- 归档页
- Gatsby / Flow / Jest 旧链路
