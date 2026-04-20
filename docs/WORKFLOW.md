# 工作流手册（Git `main` + Neon `main/dev/preview` + Vercel）

> 适用场景：你当前仓库 Git 主分支是 `main`；Neon 已建 3 个分支：`main`（生产）、`dev`（本地开发）、`preview`（预览环境共享）；部署平台为 Vercel。

## 1. 一句话总览（最重要）

- **本地开发**永远连 Neon `dev`
- **Vercel Preview** 永远连 Neon `preview`
- **Vercel Production** 永远连 Neon `main`
- **数据库结构变更**靠 drizzle-kit 的 **迁移文件**同步到各环境（不是“把 dev 库直接推到别的库”）

## 2. 分支/环境对应关系

### 2.1 Git 分支（建议最简）
- `main`：稳定分支，可随时生产部署
- 功能分支：每个需求一个分支，用完合并并删除
  - 命名示例：`feat/auth`、`feat/books`、`fix/hydration`

> 你暂时不需要 Git `dev` 分支；等多人协作或并行任务很多再加。

### 2.2 Neon 分支
- `main`：生产数据库（Production）
- `preview`：预览数据库（Preview，共享）
- `dev`：开发数据库（Local dev）

### 2.3 Vercel 环境变量绑定
在 Vercel 项目 Settings → Environment Variables 配置：

- **Production**
  - `DATABASE_URL` = Neon `main` 分支连接串
  - `AUTH_SECRET` 等密钥也在 Production 里配置
- **Preview**
  - `DATABASE_URL` = Neon `preview` 分支连接串
  - `AUTH_SECRET` 等密钥在 Preview 里配置（可同值或不同值）

本地：
- `.env.local`
  - `DATABASE_URL` = Neon `dev` 分支连接串
  - `AUTH_SECRET` 等本地值

> `.env.example` 入库；`.env.local` 不入库。

## 3. 日常开发流程（PR → Preview → 合并 → 上线）

### 3.1 开始一个需求

```bash
git checkout main
git pull
git checkout -b feat/xxx
pnpm dev
```

本地默认读取 `.env.local`，所以会连 Neon `dev`。

### 3.2 推送并创建 PR

```bash
git push -u origin HEAD
```

然后在 GitHub 创建 PR：
- Vercel 会自动生成 **Preview Deployment**
- Preview 环境访问时使用 Neon `preview`

### 3.3 合并到 `main`
PR 验收通过后合并：
- `main` 更新 → Vercel 自动触发 **Production Deployment**
- 生产环境访问时使用 Neon `main`

## 4. 数据库迁移（Drizzle / drizzle-kit）怎么做才安全

### 4.1 关键原则
- **迁移文件要提交到 git**（`src/db/migrations/*`）
- 不要在生产库手改结构，统一走迁移
- 生产库有数据时，尽量用“可回滚/可分阶段”的迁移策略（见 4.4）

### 4.2 标准操作（生成迁移）
当你改了 `src/db/schema/*`：

```bash
pnpm db:generate
```

这一步会生成新的 migration 文件。

### 4.3 把迁移应用到不同 Neon 分支（切换 DATABASE_URL 决定目标）

#### A）先在本地 dev 分支验证
确保 `.env.local` 指向 Neon `dev`：

```bash
pnpm db:migrate
```

#### B）再应用到 preview（用于 Vercel Preview）
临时把 `DATABASE_URL` 换成 Neon `preview` 连接串，再执行：

```bash
pnpm db:migrate
```

#### C）最后应用到 production（Neon main）
上线窗口/低峰期，把 `DATABASE_URL` 换成 Neon `main` 连接串，再执行：

```bash
pnpm db:migrate
```

> 你也可以在本地临时用一条命令覆盖（不会改文件）：
>
> `DATABASE_URL="你的连接串" pnpm db:migrate`

### 4.4 生产已有数据时的“安全迁移”建议（常用套路）
- **新增字段**：先加为可空（nullable）→ 回填数据 → 再加 NOT NULL/约束
- **改类型/重命名/删除字段**：尽量分两次发布
  - 第一次：新增新列或兼容逻辑（双写/兼容读）
  - 第二次：迁移数据、切换读写、最后再删除旧列
- **大表加索引/改类型**：注意锁表风险，尽量在低峰做，并先在 preview 演练

## 5. 如何验证“连的是哪个 Neon 分支”

你已经有了接口：
- `/api/env-check`

做法：
1. 在 Neon `dev` 分支插入一条 `env='dev'`
2. 在 Neon `preview` 分支插入一条 `env='preview'`
3. 本地访问 `http://localhost:xxxx/api/env-check`：
   - 返回里出现 `dev` → 说明本地连的是 dev
4. 打开 Vercel Preview：
   - 返回里出现 `preview` → 说明 Preview 连的是 preview

## 6. 常见坑（避免踩）
- **本地误连 preview/prod**：开发时别把 `.env.local` 写成 preview/prod 的连接串
- **只改了数据库没生成迁移**：会导致别的环境字段缺失
- **迁移只在 dev 跑过**：部署到 preview/prod 会报 `column does not exist`
- **生产迁移直接 DROP/改类型**：容易数据丢失或锁表，建议分阶段

