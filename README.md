# blog-gatsby

基于 `gatsby-starter-lumen` 的个人博客项目，仓库里同时包含博客内容、Gatsby 站点代码、样式和部署配置。

## Codex 入口

这个仓库已经按 Codex 协作方式补齐了最小初始化文档：

- 项目级协作规则：`AGENTS.md`
- 长任务计划规范：`docs/plans/PLANS.md`

如果后续要让 Codex 持续参与内容维护、主题修改、构建排障或部署配置调整，默认先读这两个文件。

## 快速开始

当前仓库同时存在 `yarn.lock` 和 `package-lock.json`。没有明确需求时，不要顺手同时更新两套锁文件。

可选安装方式：

```bash
npm install
```

或：

```bash
yarn install
```

启动开发环境：

```bash
npm run develop
```

构建生产版本：

```bash
npm run build
```

运行测试：

```bash
npm test
```

运行检查：

```bash
npm run lint:js
npm run lint:scss
npm run flow
```

说明：

- 如果本机 `yarn` 通过 `corepack` 首次下载失败，需要先处理本机缓存或权限问题。
- 这是较老的 Gatsby 技术栈，遇到启动或构建异常时，要优先检查 Node 与依赖兼容性。

## 常用脚本

- `npm run develop`
  - 清理 `.cache` 和 `public/` 后启动 Gatsby 本地开发环境。
- `npm run build`
  - 清理后执行生产构建。
- `npm run deploy`
  - 构建带前缀路径的静态站点并发布到 `gh-pages`。
- `npm run lint:js`
  - 执行 JS/JSX 的 ESLint 检查。
- `npm run lint:scss`
  - 执行 SCSS 的 stylelint 检查。
- `npm test`
  - 运行 Jest 测试。

## 目录结构

- `content/posts/`
  - 博客文章 Markdown。
- `content/pages/`
  - About、Archives 等静态页面内容。
- `src/components/`
  - 可复用 UI 组件。
- `src/templates/`
  - Gatsby 页面模板。
- `src/assets/scss/`
  - 全局样式、变量与 mixin。
- `gatsby/`
  - 页面创建、分页等 Gatsby 构建逻辑。
- `static/`
  - 静态资源与 Netlify CMS 配置。

## 关键配置入口

- `config.js`
  - 站点标题、菜单、作者信息、社交信息等站点元数据。
- `gatsby-config.js`
  - Gatsby 插件、数据源和构建配置。
- `netlify.toml`
  - Netlify 部署配置。
- `static/admin/config.yml`
  - Netlify CMS 配置。

## Codex 协作建议

- 小改动直接做，但要保持最小必要修改。
- 涉及多个模板、多个目录或可能大量占用上下文时，先按 `docs/plans/PLANS.md` 建计划。
- 如果 Prompt 边界不清晰，先指出不清晰点，再进入实现。
- 如果存在潜在推理死循环或连锁修复风险，先提醒再推进。
