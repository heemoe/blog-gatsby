# AGENTS.md

## 1. 项目定位

本仓库是一个基于 `gatsby-starter-lumen` 演进而来的 Gatsby 博客项目。

主要工作对象如下：

- 站点内容：`content/posts/`、`content/pages/`
- 站点配置：`config.js`、`gatsby-config.js`
- 页面模板与组件：`src/templates/`、`src/components/`
- Gatsby 构建逻辑：`gatsby/`、`gatsby-node.js`
- 静态资源与 CMS 配置：`static/`、`static/admin/config.yml`

默认把它视为“内容 + 前端主题 + 静态站点构建配置”仓库，而不是一个正在快速升级依赖的现代前端基建仓库。

## 2. 默认阅读顺序

进入仓库后，默认先读以下文件，再开始分析或改动：

- `README.md`
- `AGENTS.md`
- `package.json`
- `config.js`

然后按任务类型补读相关文件。

## 3. 按任务类型的必读文件

### 3.1 文章、页面内容、文案修改

必须先读：

- `content/posts/*` 或 `content/pages/*` 中的目标文件
- `config.js`

如果任务涉及文章列表、标签页、归档页如何展示，再补读：

- `src/templates/`
- `gatsby/create-pages.js`

### 3.2 页面样式、组件、模板调整

必须先读：

- 目标组件或模板文件
- 对应的 `*.module.scss`

如改动影响页面生成逻辑，再补读：

- `gatsby/create-pages.js`
- `gatsby/pagination/`

### 3.3 构建、插件、部署、CMS 配置

必须先读：

- `package.json`
- `gatsby-config.js`
- `netlify.toml`

按需要补读：

- `static/admin/config.yml`
- `Dockerfile.development`
- `Dockerfile.production`
- `.circleci/` 或 `.github/`

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
- 不主动统一 `yarn.lock` 和 `package-lock.json`，除非用户明确要求处理包管理器策略。
- 不主动升级 Gatsby、React、`node-sass`、Flow、Jest 等旧栈依赖；这类工作单独作为升级任务处理。
- 不提交无关格式化、批量重命名或目录重排。
- 修改文章或页面内容时，只动目标内容和必要的渲染链路。
- 修改构建或部署配置时，要明确说明影响范围。

## 6. 验证规则

默认优先做和改动范围匹配的验证，而不是无差别全量跑一遍：

- JS 逻辑改动：`npm run lint:js`
- SCSS 改动：`npm run lint:scss`
- 组件或模板改动：`npm test`
- 构建链路或 Gatsby 配置改动：`npm run build`

如果本地环境、依赖安装状态、旧版本工具链或沙箱限制导致无法验证，必须明确说清楚阻塞点，不能假装已验证。

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

- 当前仓库同时存在 `yarn.lock` 和 `package-lock.json`，处理依赖前先确认本次任务是否真的需要改锁文件。
- 这是一个较老的 Gatsby 技术栈，运行环境兼容性问题要优先归因为“版本/工具链差异”，不要直接把问题当成业务代码错误。
- 初始化 Codex 协作环境时，优先补齐说明文档与计划规范，不默认引入额外工程化配置。
