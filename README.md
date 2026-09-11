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

构建后核对 canonical、分享图片、RSS、sitemap 与 robots 的域名：

```bash
npm run check:urls
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
  - Astro 路由页面：首页、文章详情、About、404、RSS、robots.txt。
- `src/layouts/`
  - 页面布局。
- `src/components/`
  - 轻量 Astro 组件。
- `src/site.config.ts`
  - 站点标题、作者、导航、canonical 域名的唯一配置源；Cloudflare Pages 参数供人工核对，不会自动修改平台设置。
- `public/`
  - 静态资源和 `_redirects`；`robots.txt` 由 Astro 根据站点配置生成。

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
git switch main
git pull --ff-only origin main
git switch -c post/my-new-post
```

2. 在 `src/content/blog/` 新建或修改 Markdown 文件。
3. 如果有图片，放到 `public/media/`。
4. 本地运行：

```bash
npm run dev
npm run check
npm run build
npm run check:urls
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

当前部署参数（2026-09-06 已通过 Cloudflare API 核对）：

- 生产分支：`main`
- 构建命令：`npm run build`
- 输出目录：`dist`
- 项目名称：`blog-gatsby`
- 生产域名：`https://blog.zsms.me`
- Pages 默认域名：`https://blog-gatsby-92w.pages.dev`
- GitHub 集成：`heemoe/blog-gatsby`；生产自动部署和分支预览均已开启

`https://zsms.me` 是独立的个人主页，博客上线不应修改它的 DNS 或重定向。博客的 canonical、分享图片、RSS、sitemap 和 robots 均使用 `src/site.config.ts` 中的 `site`，预览构建也保持生产域名。

检查预览或生产环境的链接（先在本地完成构建；预览 URL 从对应 PR / Cloudflare 部署记录获取）：

```bash
npm run check:urls -- https://blog.zsms.me
```

推荐上线顺序：

1. 先让仓库在 Cloudflare Pages 上跑通 `*.pages.dev`
2. 再绑定 `blog.zsms.me`（当前已 active，无需重新绑定）
3. 确认生产流量完全由 Cloudflare Pages 提供后，再处理 Netlify 退场

## 上线收尾状态

GitHub 默认分支 `main`、Cloudflare Pages 项目连接和 `blog.zsms.me` 域名验证均已完成。修复发布仍按分支、PR、预览、合并的顺序进行，合并后检查生产环境生成的链接。

旧 `zsms.netlify.app` 当前返回 404，不能据此认定 Netlify 后台已完成清理。剩余平台侧核对项：

- 确认旧 Netlify 项目的自定义域名已解绑。
- 确认自动部署已关闭，旧 Identity / Git Gateway 已停用（如曾启用）。
- 确认没有仍需保留的数据，再决定是否删除旧站点；不要只凭 404 删除账号或其他站点。

迁移进度和后续验证记录见 `docs/plans/2026-04-22-gatsby-to-astro-cloudflare.md`。

## 旧 Netlify 处理原则

- 不要在 Cloudflare 生产站验证前提前删除 Netlify
- 先切 Cloudflare，再停 Netlify
- 如果同域历史上装过 Gatsby 的离线缓存，新站已经在前端主动注销旧 service worker，减少切换后读到旧资源的概率

## 当前站点范围

### 外观与响应式

- 保留黑红排版；日间使用暖白底，夜间使用炭黑底，正文和代码块同步适配。
- 首次访问跟随系统外观。导航右侧的太阳/月亮按钮可切换模式，选择保存在当前浏览器，刷新及跨页继续生效。
- 未手动选择时跟随系统变化；禁用 JavaScript 时也会按系统外观显示，并隐藏切换按钮。
- 手机导航保留 Writing、About 与主题按钮，RSS 仍可从页脚访问；平板文章改为单栏，代码和表格在自身区域内滚动。
- 主题逻辑回归检查：`npm run test:theme`。视觉规范见 `src/styles/global.css`、`src/styles/reading.css`；配色代码块配置在 `astro.config.mjs`。

### 页面与功能

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
