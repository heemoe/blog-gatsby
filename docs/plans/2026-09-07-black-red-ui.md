# 黑红色博客 UI 重构

## Goal
- 移除旧视觉系统，从头构建现代、克制、有个人辨识度的黑红色博客 UI。
- 首页、文章、About、404 在桌面和手机上形成完整一致的阅读体验。

## Scope
- 重写全局样式、站点布局、导航、文章列表和页面模板。
- 新增必要的轻量视觉资源（如 favicon）与可访问性支持。
- 保留全部文章正文、发布日期、slug、草稿过滤、RSS、sitemap、SEO 域名、重定向与旧 service worker 注销逻辑。
- 不升级依赖、不恢复 CMS/分类/标签/归档页，不修改 Cloudflare 平台或发布生产站。

## Read First
- README.md、AGENTS.md、package.json、src/site.config.ts、docs/plans/PLANS.md
- src/styles/global.css、src/layouts/BaseLayout.astro、src/components/*.astro
- src/pages/index.astro、src/pages/about/index.astro、src/pages/posts/[...slug].astro、src/pages/404.astro
- src/lib/content.ts、src/content/config.ts、src/content/pages/about.md、src/content/blog/*
- astro.config.mjs、public/_redirects、scripts/check-site-urls.mjs

## Risks
- 涉及多个模板、样式和真实浏览器验证，占用较多上下文；以本计划记录阶段进度。
- “不要 AI 感”按克制的编辑式设计理解：无渐变、发光、玻璃效果、圆角卡片堆叠和营销式文案。
- 历史文章有很长的 inline code 和 pre，需要小屏、缩放与键盘访问验证。
- 保持旧链接兼容，不允许本次 UI 改动破坏已发布 URL。

## Plan
1. 审计内容与路由约束，确定黑红视觉与布局规范。
2. 重写全局基础、首页、导航、页脚，并行重建阅读页与辅助页面。
3. 运行 Astro 检查、生产构建、URL 检查，检查桌面/手机真实渲染与交互。
4. 修正有证据的问题，保存检查结果并展示本地预览。

## Verification
- npm run check、npm run build、npm run check:urls。
- 浏览器检查首页、About、404、全部 7 篇文章；桌面与 390px/320px 手机宽度。
- 检查导航与文章链接、焦点可见性、跳过导航、正文代码/图片、页面横向溢出、减弱动画偏好。
- 确认公开文章数量、draft 排除、URL/RSS/SEO 和内容不变。

## Open Questions
- 暂无阻塞问题；沿用英文内容与作者身份，基于现有文章构建 UI。

## Status Log
- 2026-09-07：仓库工作区干净，当前分支 main，已有依赖；Node v24.9.0。
- 2026-09-07：完成基础阅读与内容审计，确认 7 篇公开文章、2 篇草稿；开始实现。
- 2026-09-07：在 `codex/black-red-ui` 完成全部 UI。移除 PostCard 与旧全局规则，新增 PostEntry、reading.css、favicon；全站使用炭黑/朱红编辑排版，没有额外依赖或远程字体。
- 2026-09-07：独立审查发现列表与详情的日期时区不一致；已统一为 UTC，并在生产构建页面确认 Swift closure 文章显示 March 20, 2018。原始时间戳未修改。
- 2026-09-07：最终 `npm run check` 通过（0 errors / warnings / hints），`npm run build`、`npm run check:urls`、`git diff --check` 通过。10 个 HTML 页面、RSS、2 个 sitemap、robots 与 2 个分享图片校验通过；正文、配置、内容读取逻辑、依赖、重定向无改动。
- 2026-09-07：Playwright 浏览器覆盖 320/390/768/1440px × 首页/About/404/全部 7 篇文章，共 40 组；无页面横向溢出、缺图或重复主标题。8 个代码块均可键盘聚焦。实看桌面首页/About/文章与手机首页/文章，收紧手机列表间距并提升小字字号。
- 2026-09-07：最终生产构建预览验证了 Skip to content、文章进入、Earlier note、返回列表、About 导航状态、正文图片、减弱动画偏好、修复后的日期；无浏览器运行时错误。预览地址 `http://127.0.0.1:4322/`，仅本机可访问；已请求在 Codex 右侧打开。
- 2026-09-07：Playwright CLI 下载受网络限制，改用已安装的 Playwright 连接器完成实际浏览器检查。初次预览端口受沙箱限制，经执行权限检查后启动本机服务；无剩余验证阻塞。
- 2026-09-07：桌面与手机最终截图保存在 `/Users/trz/.codex/visualizations/2026/09/07/01a07a60-13df-7091-bff1-a1899fea21fa/`。临时浏览器输出已移出工作区；所有阶段完成，未创建 PR、合并或发布生产站。
- 2026-09-07：按后续反馈完成标题/间距协调、响应式细化与日夜模式；实现和最新验证记录见 `2026-09-07-ui-refinement-and-themes.md`。仍未提交或发布。
