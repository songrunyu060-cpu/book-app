# Anime.js 动画集成方案（西瓜书屋）

> 面向当前技术栈：**Next.js 16**、**React 19**、**Tailwind CSS 4**、**tw-animate-css**。  
> 目标：在保留现有 CSS 动效的前提下，按需引入 **Anime.js v4**，实现更精细的时序、弹性、交错与交互驱动动画。

---

## 1. 现状与选型

### 1.1 项目里已有的动效

| 方式 | 位置 / 依赖 | 特点 |
|------|-------------|------|
| Tailwind `transition-*` | 全站组件 | 轻量、无 JS，适合 hover/focus |
| `tw-animate-css` + `motion-safe:*` | 如 `home/page.tsx` | 入场、脉冲、与 `prefers-reduced-motion` 配合 |
| 自定义 `@keyframes` | `globals.css`（`home-ken-burns` 等） | 无限循环背景类动效，纯 CSS |

用户首页 `home/page.tsx` 已大量使用 `motion-safe:animate-in`、`motion-safe:hover:-translate-y-*` 等，**简单展示动效不必全部换成 Anime.js**。

### 1.2 何时用 Anime.js

适合：

- **交错入场**（列表、卡片网格 `stagger`）
- **复杂时间轴**（多元素按顺序联动，如轮播切换 + 文案 + 指示器）
- **弹性 / 弹簧**（`spring()`、`ease: 'out(4)'`）
- **数值滚动**（借阅数、统计看板 `animate` 数字属性）
- **拖拽、滚动进度**（`createDraggable`、`onScroll` 等 v4 API）
- **由事件精确触发**（点击收藏、提交成功、Tab 切换）

不必用：

- 纯 hover 变色、阴影、单次 `opacity` 过渡 → 继续 Tailwind 即可
- 无限循环的装饰性背景 → 现有 `@keyframes` 更省包体

### 1.3 与 Framer Motion / GSAP 的简要对比

| 库 | 包体 / 心智 | 与本项目 |
|----|-------------|----------|
| **Anime.js v4** | 中等，API 偏命令式 | 适合「局部 Client 组件 + 精确时序」，不强制包装整棵组件树 |
| Framer Motion | 较大，声明式 `motion.*` | 与 React 耦合深，换栈成本高 |
| 纯 CSS | 最小 | 已覆盖大部分场景，复杂序列难维护 |

**建议策略：CSS 负责基础态与无障碍；Anime.js 负责「需要编排」的 Client 区块。**

---

## 2. 安装与版本注意

```bash
npm install animejs
```

v4 **没有默认导出**，需使用命名导入：

```ts
// ✅ v4
import { animate, createScope, stagger, spring } from "animejs"

// ❌ v3 写法，会报错
import anime from "animejs"
```

TypeScript 一般可直接使用包内类型；若个别 API 无类型，可在 `src/types/animejs.d.ts` 中按需补充。

---

## 3. 与 Next.js App Router 的约束

1. **Anime.js 只能在浏览器执行**  
   所有调用必须放在 `"use client"` 组件内，或通过 `dynamic(..., { ssr: false })` 懒加载。

2. **避免 SSR 与首屏 DOM 不一致**  
   - 首屏入场：可保留 CSS `motion-safe:animate-in`，或 Client 挂载后再 `animate`（接受极短延迟）。  
   - 不要在没有 `ref` 的根节点上于服务端猜测初始 transform。

3. **清理实例**  
   官方推荐 `createScope({ root }).add(...)`，在 `useEffect` 返回里调用 `scope.revert()`，防止路由切换后动画泄漏。

4. **与 Server Component 共存**  
   - 页面可以是 **Server Component**，只把「需要动画的岛」拆成 Client 子组件，例如 `BookCardGridAnimated.tsx`。  
   - 不要把整页 `layout.tsx` 改成 Client 仅为动画。

5. **尊重无障碍**  
   与现有 `motion-safe:` 一致，在触发 JS 动画前检测：

   ```ts
   const prefersReducedMotion =
     typeof window !== "undefined" &&
     window.matchMedia("(prefers-reduced-motion: reduce)").matches
   ```

   为 `true` 时跳过或改为瞬时状态（`duration: 0`）。

---

## 4. 推荐集成方案（由简到繁）

### 方案 A：Client 组件 + `createScope`（官方推荐，默认采用）

**适用**：单个区块内的入场、循环、点击反馈。  
**优点**：作用域清晰、自动 `revert`、可在 scope 内注册 `methods` 供事件调用。

目录建议：

```
src/
  lib/
    motion/
      prefers-reduced-motion.ts   # 检测 reduced motion
  hooks/
    use-anime-scope.ts            # 封装 createScope + cleanup
  components/
    motion/
      stagger-fade-in.tsx         # 可复用列表入场
```

**`useAnimeScope` 示例（封装层，可选）：**

```tsx
"use client"

import { createScope } from "animejs"
import { useEffect, useRef } from "react"

type ScopeInstance = ReturnType<typeof createScope> extends (...args: infer A) => infer R
  ? R
  : never

export function useAnimeScope(setup: (scope: ScopeInstance) => void, deps: unknown[] = []) {
  const rootRef = useRef<HTMLDivElement>(null)
  const scopeRef = useRef<ScopeInstance | null>(null)

  useEffect(() => {
    if (!rootRef.current) return
    scopeRef.current = createScope({ root: rootRef.current }).add(setup)
    return () => scopeRef.current?.revert()
  }, deps)

  return { rootRef, scopeRef }
}
```

**子组件用法：**

```tsx
"use client"

import { animate, stagger } from "animejs"
import { useAnimeScope } from "@/hooks/use-anime-scope"

export function CategoryCardsAnimated({ children }: { children: React.ReactNode }) {
  const { rootRef } = useAnimeScope((self) => {
    animate(".card-item", {
      opacity: [0, 1],
      translateY: [16, 0],
      delay: stagger(80),
      duration: 500,
      ease: "out(3)",
    })
    self.add("replay", () => {
      animate(".card-item", { opacity: [0, 1], translateY: [16, 0], delay: stagger(80) })
    })
  })

  return (
    <div ref={rootRef} className="grid gap-4">
      {children}
    </div>
  )
}
```

---

### 方案 B：命令式 `animate` + 事件（无 scope 的轻量调用）

**适用**：按钮点击、Toast 出现、收藏心形弹跳等**单次、短动画**。

```tsx
"use client"

import { animate, spring } from "animejs"

function onFavorite(el: HTMLElement) {
  animate(el, {
    scale: [1, 1.35, 1],
    ease: spring({ bounce: 0.6 }),
    duration: 600,
  })
}
```

注意：频繁创建的全局 `animate` 要在组件卸载时 `animation.pause()` 或改用方案 A 的 scope。

---

### 方案 C：时间轴 `timeline`（多步骤编排）

**适用**：登录成功 → 勾号 → 文案 → 跳转；轮播「旧图出 / 新图入 / 标题淡入」。

```tsx
import { createTimeline, stagger } from "animejs"

const tl = createTimeline({ defaults: { ease: "out(3)" } })
tl.add(".slide-out", { opacity: [1, 0], translateX: [0, -40], duration: 280 })
  .add(".slide-in", { opacity: [0, 1], translateX: [40, 0], duration: 320 }, "-=120")
  .add(".slide-caption", { opacity: [0, 1], translateY: [12, 0], duration: 400 }, "-=200")
```

可与 `home` 轮播的 `useState` 切换索引联动，在 `useEffect` 依赖 `activeIndex` 时 `tl.restart()`。

---

### 方案 D：滚动 / 视口驱动

**适用**：图书详情章节进度、推荐流「滚到可视区再入场」。

思路：

1. `IntersectionObserver` 标记进入视口的节点；
2. 首次进入时对节点 `animate`（并加 `data-animated` 防止重复）；
3. 或使用 Anime.js 文档中的 scroll 相关工具（按官网当前 API 选用）。

与 Tailwind `animate-in` 二选一即可，避免同一元素两套入场。

---

### 方案 E：路由级过渡（慎用）

App Router 下**没有**传统的单一 `pages/_app` 过渡层。若要做「页面切换淡入」：

- 在 `(main)/layout.tsx` 的 Client 包装层对 `children` 做 `key={pathname}` + `animate`；
- 或使用 View Transitions API（实验性，需评估浏览器支持）。

**优先级低**：管理后台表格页切换用 CSS 淡入即可。

---

### 方案 F：与 Tailwind 分工（推荐长期架构）

```
┌─────────────────────────────────────────────────────────┐
│  Server / 静态 UI：布局、颜色、排版                        │
├─────────────────────────────────────────────────────────┤
│  Tailwind + tw-animate-css：hover、focus、简单入场       │
│  globals.css @keyframes：无限循环装饰（blob、shimmer）   │
├─────────────────────────────────────────────────────────┤
│  Anime.js（Client 岛）：stagger、timeline、spring、数字   │
└─────────────────────────────────────────────────────────┘
```

---

## 5. 在本项目中的落点建议

结合现有路由与页面，建议**分阶段**接入：

| 优先级 | 页面 / 模块 | 动画需求 | 建议方案 |
|--------|-------------|----------|----------|
| P0 | `user/(main)/home` 分类卡片、榜单行 | 列表 stagger 入场 | A + `stagger` |
| P0 | 首页轮播切换 | 切 slide 时间轴 | C，与现有 CSS Ken Burns 可并存（图内 CSS，切换 JS） |
| P1 | `user/(main)/books` 图书网格 | 筛选后重新 stagger | A，`deps` 含筛选条件 |
| P1 | `books/[id]` 详情 | 封面视差、章节滚动高亮 | D |
| P2 | `login` 登录成功 | 勾号 + 跳转 timeline | C |
| P2 | `admin/.../dataview` | 数字增长 | B，`animate({ innerText: [0, n] })` 等 |
| P3 | `collect` / `borrow` | 空状态插画、行删除淡出 | B / A |
| P3 | `BackTop` | 出现/消失弹性 | B + `spring` |

**不建议**第一版就重写整个 `home/page.tsx`（1700+ 行）：先拆 `RecommendedCarousel`、`CategorySection` 等为独立 Client 组件再接入。

---

## 6. 示例：首页轮播切换（示意）

在保留 `home-ken-burns` 等 CSS 的前提下，仅对「切换瞬间」用 timeline：

```tsx
"use client"

import { createTimeline } from "animejs"
import { useEffect, useRef } from "react"

export function useCarouselTransition(activeIndex: number) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!rootRef.current) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    const tl = createTimeline()
    tl.add(rootRef.current.querySelectorAll("[data-slide-active]"), {
      opacity: [0.6, 1],
      scale: [0.98, 1],
      duration: 420,
      ease: "out(3)",
    })
    return () => tl.pause()
  }, [activeIndex])

  return rootRef
}
```

---

## 7. 示例：图书列表交错入场

```tsx
"use client"

import { animate, stagger } from "animejs"
import { useEffect, useRef } from "react"

export function useBookGridStagger(bookIds: string[]) {
  const ref = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (!ref.current) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    animate(ref.current.querySelectorAll("[data-book-card]"), {
      opacity: [0, 1],
      translateY: [20, 0],
      delay: stagger(60, { from: "center" }),
      duration: 480,
      ease: "out(3)",
    })
  }, [bookIds])

  return ref
}
```

`bookIds` 变化时重新执行，实现筛选后的「再入场」。

---

## 8. 性能与体验

- **只动画 `transform` / `opacity`**，避免每帧改 `width`、`top`（减少 layout）。
- **同时运行动画数量**：首页已有大量 CSS 动画，新增 JS 动画时控制同屏并发（例如仅可视区 stagger）。
- **路由离开**：务必 `scope.revert()` 或 `timeline.pause()`。
- **Lighthouse**：动画不应阻塞 LCP；首屏关键图不要用 JS 延迟显示。
- **包体**：按路由拆分 Client 组件，避免在 `layout.tsx` 顶层 `import "animejs"` 拖大全局 bundle。

---

## 9. 实施步骤（ checklist ）

- [ ] `npm install animejs`
- [ ] 新增 `src/lib/motion/prefers-reduced-motion.ts`
- [ ] 新增 `src/hooks/use-anime-scope.ts`（可选）
- [ ] 从 `home` 拆出一个最小 Client 块（如分类卡片）做 POC
- [ ] 确认 `npm run build` 无 SSR 报错
- [ ] 在系统「减少动态效果」下走查一遍
- [ ] 再逐步扩展到轮播、books 列表、admin 数据看板

---

## 10. 风险与规避

| 风险 | 规避 |
|------|------|
| v3 教程默认 `import anime` | 统一 v4 命名导入，Code Review 时检查 |
| hydration 警告 | 动画初始样式与 CSS 首屏一致，或挂载后再播 |
| 与 Tailwind 重复动画 | 同一元素只保留一种入场方式 |
| 内存泄漏 | `createScope` + `revert`；路由切换清理 timeline |
| 首页过重 | 拆组件 + 动态 import 动画岛 |

---

## 11. 参考链接

- [Anime.js 官方文档](https://animejs.com/documentation)
- [Using with React](https://animejs.com/documentation/getting-started/using-with-react)
- [v4.0.0 Release（破坏性变更说明）](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)
- 本项目：`src/app/globals.css`（首页 keyframes）、`src/app/(page)/user/(main)/home/page.tsx`（`motion-safe` 用法）

---

## 12. 结论

**推荐路径**：采用 **方案 A（createScope + Client 组件岛）** 作为默认；简单交互用 **方案 B**；轮播/登录用 **方案 C**；保留现有 **Tailwind + CSS keyframes** 处理 hover 与无限循环装饰。

这样可以在不推翻现有首页动效的前提下，用 Anime.js 补齐「交错、弹性、时间轴、数值」四类能力，并按上表 P0 → P3 分阶段落地。
