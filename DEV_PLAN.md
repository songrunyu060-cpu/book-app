# 开发计划（可直接执行）

> 目标：把当前 Next.js 项目推进到“可上线、可迭代”的工程形态。计划覆盖环境区分、Neon 数据库、Drizzle ORM（含 drizzle-kit、drizzle-zod）、鉴权与权限、Vercel 部署与上线检查。

## 0. 最终路由结构（作为开发基准）

### 用户端
- `/auth/login` 登录
- `/auth/register` 注册
- `/user/home` 首页
- `/user/books` 图书列表
- `/user/books/[id]` 图书详情
- `/user/collect` 收藏
- `/user/borrow` 借阅记录
- `/user/notice` 通知
- `/user/setting` 设置

### 管理员后台
- `/admin/login` 管理员登录
- `/admin/dashboard` 数据看板
- `/admin/user` 用户管理
- `/admin/book` 图书管理
- `/admin/category` 分类管理
- `/admin/borrow` 借阅记录
- `/admin/review` 书评审核
- `/admin/banner` 轮播图
- `/admin/recommend` 推荐管理
- `/admin/notice` 公告管理

## 1. 环境区分（dev / preview / prod）

### 1.1 环境目标
- **dev（本地）**：开发 + 本地调试，连接 Neon 的 dev 数据库（或分支）。
- **preview（预览）**：每个 PR 自动部署；连接 Neon 的 preview 数据库（或 Neon branch），用于验收。
- **prod（生产）**：正式域名；连接 Neon prod 数据库；严格的权限、审计与回滚策略。

### 1.2 环境变量规范
建议统一命名，避免“环境漂移”：
- **数据库**
  - `DATABASE_URL`：Neon 连接串（drizzle 使用）
- **应用**
  - `NEXT_PUBLIC_APP_ENV`：`development | preview | production`（可选，用于埋点/开关）
- **鉴权**
  - `AUTH_SECRET` 或等价密钥（具体取决于你选用的鉴权方案）
- **可选**
  - `NEXT_PUBLIC_SITE_URL`：用于回调/分享链接拼接（按需）

约束：
- `.env`：只放本地开发值，不入库（由 `.gitignore` 管控）
- `.env.example`：入库，列出所有变量名与示例占位
- Vercel：分别在 **Production** / **Preview** 环境配置对应变量

## 2. 数据库（Neon）+ Drizzle 体系落地

> 技术栈：Neon + Postgres + Drizzle ORM + drizzle-kit + drizzle-zod

### 2.1 Neon 侧准备
- 创建 Neon project
- 建议建立 2 套数据库策略（二选一）：
  - **策略 A（简单）**：dev / prod 两个数据库（两套 `DATABASE_URL`）
  - **策略 B（更强）**：prod 为主库；preview 使用 Neon branching（每个 PR/环境分支一套）

### 2.2 安装依赖（建议）
（这里不给具体版本号，直接用包管理器拉最新兼容版本）
- `drizzle-orm`
- `drizzle-kit`
- `drizzle-zod`
- `postgres`（drizzle 常用 driver，或你偏好的 pg driver）

### 2.3 目录结构建议（清晰、可扩展）
- `src/db/`
  - `client.ts`：创建 drizzle 实例（读取 `DATABASE_URL`）
  - `schema/`：表结构
  - `migrations/`：drizzle-kit 生成的迁移
  - `index.ts`：导出 db 与 schema
- `drizzle.config.ts`：drizzle-kit 配置

### 2.4 drizzle-kit 工作流（团队一致）
- **新增/修改表结构**：改 `src/db/schema/*`
- **生成迁移**：`drizzle-kit generate`
- **执行迁移**：`drizzle-kit migrate`
- **CI/部署约束**：
  - Preview 环境可自动迁移（看你风险偏好）
  - Production 建议手动/受控迁移（避免上线时不可控破坏）

### 2.5 drizzle-zod 使用规范
目标：让前后端在“输入校验/DTO”上有统一来源，减少重复劳动。
- 为每个核心实体生成：
  - `insertSchema`：创建用
  - `updateSchema`：更新用（部分字段可选）
  - `selectSchema`：输出用（可按需裁剪）
- 所有 API 入参必须过 zod 校验（失败返回统一错误结构）

## 3. 鉴权与权限（用户端 + 管理端）

### 3.1 角色模型（建议最小可用）
- `role`：`user | admin`
- 管理端页面与接口必须验证 `admin`

### 3.2 会话策略（建议）
优先选择“可在 Next.js Server Actions / Route Handlers 使用”的方案：
- **Cookie Session（推荐工程感）**
  - 登录成功：写入 httpOnly cookie（session id 或签名 token）
  - 服务端读取 cookie 校验
  - 好处：更安全、易做权限判断、避免把敏感 token 暴露在浏览器 JS
- **JWT（可选）**
  - 若使用 JWT，也建议放 httpOnly cookie

### 3.3 路由保护（页面级）
按路由分区做保护：
- `/user/**`：要求登录（role 为 user 或 admin 也可访问，看业务）
- `/admin/**`：要求登录且 role=admin
- `/auth/**`：已登录可重定向到首页（防止重复登录）

### 3.4 接口保护（数据级）
无论页面怎么跳转，后端接口必须做最终裁决：
- 所有写操作（创建/更新/删除）都必须校验登录态
- 管理端接口必须校验 role=admin
- 关键资源（如借阅记录、收藏）必须校验“资源归属”（只能操作自己的数据）

### 3.5 审计与安全最小集
- 登录/登出/权限拒绝：至少记录到服务端日志（后续可接审计表）
- 防止越权：所有 where 条件必须带上 `userId`（用户侧）
- 重要操作（如借阅、归还、审核通过/拒绝）：建议做操作记录表（后续扩展）

## 4. 领域模型与表设计（建议最小闭环）

> 先做“可用闭环”，别一开始就做全量字段。

### 4.1 必备表（P0）
- `users`：用户（含 role）
- `books`：图书
- `categories`：分类
- `borrows`：借阅记录
- `favorites`：收藏（userId + bookId）

### 4.2 管理端增强表（P1/P2）
- `reviews`：书评（含审核状态）
- `banners`：轮播图
- `recommendations`：推荐位
- `notices`：公告/通知（可拆：系统公告 vs 用户通知）

### 4.3 状态枚举建议
- `borrows.status`: `borrowed | returned | overdue`（或更细）
- `reviews.status`: `pending | approved | rejected`

## 5. API 设计与实现顺序（匹配 2–3 小时/天）

### 5.1 API 约定（最小但统一）
- 统一响应：
  - 成功：`{ data, meta? }`
  - 失败：`{ error: { code, message, details? } }`
- 所有入参使用 zod 校验（来源：drizzle-zod 或手写 schema）

### 5.2 实现顺序（从用户闭环到后台）
- **P0（先跑通）**
  - auth：注册、登录、登出、获取当前用户
  - books：列表、详情
  - favorites：收藏/取消收藏、收藏列表
  - borrows：借阅、归还（或仅记录）、借阅列表
- **P1（后台可用）**
  - admin/books：CRUD
  - admin/categories：CRUD
  - admin/users：列表、禁用/恢复（可选）
- **P2**
  - review/banner/recommend/notice：按业务逐步补齐

## 6. 部署（Vercel）与上线流程

### 6.1 Vercel 项目设置
- 导入 Git 仓库
- 选择包管理器（pnpm）
- 设置构建命令（默认 `next build`）与输出（Next.js 自动识别）

### 6.2 环境变量配置（关键）
- Preview 环境变量：指向 preview 数据库（或 Neon branch）
- Production 环境变量：指向 prod 数据库
- 鉴权密钥（`AUTH_SECRET` 等）在 Vercel 侧设置

### 6.3 数据库迁移策略
- Preview：可自动迁移（提升效率）
- Production：建议受控迁移（在部署前/部署窗口执行）

### 6.4 上线检查清单（最小）
- 认证：登录/登出、cookie 生效、刷新不掉登录
- 权限：用户无法访问 `/admin/**`；管理员可访问全部
- 数据：列表/详情/收藏/借阅核心链路可用
- 错误处理：接口失败时页面有可理解提示

## 7. 每天 2–3 小时的里程碑计划（建议 3 周）

> 以 15 个工作日拆分（你可以按周末/空闲天调整）。

### 第 1 周：工程地基 + 鉴权打通（5 天）
- **Day 1**：环境变量规范、`.env.example`、Neon 建库/连接串准备
- **Day 2**：Drizzle 基础落地（db client、schema 目录、drizzle-kit 配好）
- **Day 3**：核心表 P0（users/books/categories/favorites/borrows）+ 迁移跑通
- **Day 4**：drizzle-zod 接入（insert/update/select schema），统一错误返回
- **Day 5**：鉴权最小闭环（注册/登录/登出/当前用户）+ 路由/接口保护

### 第 2 周：用户端闭环（5 天）
- **Day 6**：`/user/home`（推荐/入口卡片，先假数据也行）
- **Day 7**：`/user/books` 列表（搜索/分页/筛选最小集）
- **Day 8**：`/user/books/[id]` 详情（收藏/借阅入口）
- **Day 9**：`/user/collect`（收藏列表/取消收藏）
- **Day 10**：`/user/borrow`（借阅记录列表 + 状态）

### 第 3 周：后台可用 + 部署上线（5 天）
- **Day 11**：`/admin/login` + admin 路由保护 + 后台布局/导航
- **Day 12**：`/admin/dashboard`（指标卡 + 基础图表/列表）
- **Day 13**：`/admin/category` CRUD
- **Day 14**：`/admin/book` CRUD
- **Day 15**：Vercel 部署、Preview/Prod 环境变量、迁移策略固化、上线自测清单跑通

## 8. 质量与工程化（按需逐步加）
- **日志**：关键操作与错误统一记录
- **数据校验**：所有写接口 zod 校验；所有读接口做分页/限流（后续）
- **权限回归**：每次新增接口都写一条“越权用例”自测
- **发布纪律**：Production 迁移受控、可回滚（至少有备份策略）

---

## 附：你当前项目需要尽快对齐的点（建议优先）
- README 里的旧路由需要更新为“最终路由结构”（避免后续误导）
- 目前已创建的 `/user/login`、`/user/register`、`/user/dashboard`、`/admin/dataview` 需要迁移/重命名到：
  - `/auth/login`、`/auth/register`
  - `/user/home`
  - `/admin/dashboard`
