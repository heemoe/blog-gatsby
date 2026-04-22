# AGENTS.md

## 1. 项目定位

本仓库当前是一个基于 `Astro` 的个人博客项目，部署目标是 `Cloudflare Pages`。

主要工作对象如下：

- 站点内容：`src/content/blog/`、`src/content/pages/`
- 站点配置：`src/site.config.ts`、`astro.config.mjs`
- 页面与布局：`src/pages/`、`src/layouts/`、`src/components/`
- 内容读取逻辑：`src/lib/content.ts`、`src/content/config.ts`
- 静态资源：`public/`

默认把它视为“内容 + 主题样式 + 静态站点构建配置”仓库，而不是一个以依赖升级为核心的前端基建仓库。

## 2. 默认阅读顺序

进入仓库后，默认先读以下文件，再开始分析或改动：

- `README.md`
- `AGENTS.md`
- `package.json`
- `src/site.config.ts`
- 如任务较大，再补读 `docs/plans/PLANS.md`

然后按任务类型补读相关文件。

## 3. 按任务类型的必读文件

### 3.1 文章、页面内容、文案修改

必须先读：

- `src/content/blog/*` 或 `src/content/pages/*` 中的目标文件
- `src/site.config.ts`

如果任务涉及首页卡片、RSS、SEO 摘要或文章 URL，再补读：

- `src/lib/content.ts`
- 对应的 `src/pages/*.astro`

### 3.2 页面样式、组件、模板调整

必须先读：

- 目标页面、组件或布局文件
- `src/styles/global.css`

如改动影响内容渲染或路由，再补读：

- `src/lib/content.ts`
- `src/content/config.ts`
- 对应的 `src/pages/*.astro`

### 3.3 构建、插件、部署、CMS 配置

必须先读：

- `package.json`
- `astro.config.mjs`
- `src/site.config.ts`

按需要补读：

- `README.md`
- `docs/plans/2026-04-22-gatsby-to-astro-cloudflare.md`
- `.github/`

## 4. 开工前必须做的事

在开始写代码、改配置、改内容前，Agent 默认要先完成：

1. 明确本次任务目标。
2. 说明会读哪些关键文件。
3. 判断是否需要执行计划。
4. 判断是否存在以下风险并先提醒用户：

- 修改会明显占用大量 Context Limit
- Prompt 边界不清晰
- 可能出现推理死循环、反复修补同一问题
- 需求和现有仓库状态明显冲突

## 5. 变更原则

- 优先做最小必要改动，不把初始化任务扩展成依赖升级或结构重构。
- 不主动扩展为 Astro、TypeScript 或部署链路升级，除非用户明确要求。
- 不提交无关格式化、批量重命名或目录重排。
- 修改文章或页面内容时，只动目标内容和必要的渲染链路。
- 修改构建或部署配置时，要明确说明影响范围。
- `public/` 下的静态资源默认应提交到仓库，不要再把它当构建产物目录处理。
- 如果改动会影响已发布 URL、RSS 或静态资源路径，要显式说明是否允许破坏旧链接。

## 6. 验证规则

默认优先做和改动范围匹配的验证，而不是无差别全量跑一遍：

- 内容 schema、页面逻辑、组件或布局改动：`npm run check`
- 构建链路、部署配置、路由或静态资源改动：`npm run build`
- 跨内容与页面渲染的改动：`npm run check` + `npm run build`

如果本地环境、依赖安装状态或 Node/Astro 版本差异导致无法验证，必须明确说清楚阻塞点，不能假装已验证。

## 7. 长任务计划

当任务满足以下任一条件时，必须先创建或更新计划文档：

- 涉及多个目录、多个模板或多个页面
- 预计工作量较大，容易吃掉较多上下文
- 会牵动构建、部署、内容、样式中的多个层面
- 需要分阶段交付或中途恢复

计划规范见：

- `docs/plans/PLANS.md`

## 8. 输出风格

本仓库默认使用结构化、专业程序员风格输出：

- 先给结论，再给依据
- 尽量引用具体文件路径
- 不确定项要显式说明
- 风险和前提条件不要弱化

## 9. 仓库级注意事项

- 当前有效内容目录是 `src/content/`，不是旧的 `content/`。
- 当前有效静态资源目录是 `public/`，站点构建产物目录是 `dist/`，两者不要混淆。
- 当前有效站点配置入口是 `src/site.config.ts` 与 `astro.config.mjs`，不要再按 Gatsby 文件名找配置。
- 仓库已经明确移除 CMS、标签页、分类页、归档页、评论和旧 Gatsby 链路；除非用户明确要求，不要默认恢复这些能力。
- 如果任务涉及 Cloudflare Pages、域名或默认分支切换，先区分哪些是仓库内改动，哪些是需要人工在平台侧完成的步骤。
