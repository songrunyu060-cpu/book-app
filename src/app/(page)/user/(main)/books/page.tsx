import Image from "next/image"
import { Button } from "@/components/ui/button"

// 图书列表页
export default function Books() {
  return (
    <div>
      <div className="flex items-center justify-between rounded-lg border border-gray-100 bg-white p-4 shadow-md">
        {/* 左侧组合：头像 + 文字 */}
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500">
            B
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-gary-900 text-sm">
              新书借阅通知
            </span>
            <span className="text-gray-500 text-xs">
              你借阅的《Next.js 实战》即将到期
            </span>
          </div>
        </div>
        {/* 右侧：时间 */}
        <div className="text-gray-400 text-xs">12:30</div>
      </div>
      {/* 作业一 */}
      <div className="mt-4 flex w-48 flex-col items-center rounded-lg border border-gray-100 bg-white p-8 hover:shadow-sm">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 text-2xl">
          Z
        </div>
        <div className="mb-2 font-bold text-xl">周宇</div>
        <div className="line-clamp-3 text-gray-500 text-xs">
          是一个老六，，喜欢看小说，喜欢看小说，，喜欢看小说，，喜欢看小说，，喜欢看小说，喜欢看小说，喜欢看小说，
        </div>
      </div>
      {/* 作业二 */}
      <div className="flex items-center justify-between p-4">
        <div className="font-bold text-2xl">BOOK APP</div>
        <div className="flex items-center gap-4">
          <span className="hover:text-blue-500">首页</span>
          <span className="hover:text-blue-500">借阅</span>
          <span className="hover:text-blue-500">
            个人中心
          </span>
        </div>
        <div>
          <Button variant="outline">退出</Button>
        </div>
      </div>
      {/* 作业三 */}
      <div className="flex items-center justify-between gap-8 p-4">
        <div className="flex flex-1 items-center justify-between rounded-lg border border-gray-100 p-4 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 text-2xl">
            Z
          </div>
          <div className="flex flex-col gap-2 font-bold text-xl">
            <div className="text-gray-500">总书籍</div>
            <div className="font-bold text-2xl">100003</div>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-between rounded-lg border border-gray-100 p-4 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 text-2xl">
            Z
          </div>
          <div className="flex flex-col gap-2 font-bold text-xl">
            <div className="text-gray-500">已借出</div>
            <div className="font-bold text-2xl">100003</div>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-between rounded-lg border border-gray-100 p-4 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 text-2xl">
            Z
          </div>
          <div className="flex flex-col gap-2 font-bold text-xl">
            <div className="text-gray-500">逾期</div>
            <div className="font-bold text-2xl">100003</div>
          </div>
        </div>
      </div>

      {/* 相对定位作为容器，限制最大宽度，溢出隐藏保证圆角 */}
      <div className="group relative w-full max-w-[240px] overflow-hidden rounded-2xl bg-white shadow-lg">
        {/* 图片容器，固定宽高比 */}
        <div className="aspect-3/4 bg-gray-200">
          <Image
            src="/images/111.webp"
            alt="Book"
            width={240}
            height={320}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
        {/* 绝对定位标签：右上角 */}
        <div className="absolute top-2 right-2 rounded-full bg-red-500 px-2 py-1 font-bold text-sm text-white shadow-sm">
          热销
        </div>
        {/* 底部遮罩文字：绝对定位在底部 */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <h3 className="truncate font-bold text-white">
            Next.js 16 全栈开发
          </h3>
          <p className="text-gray-300 text-xs">周宇 著</p>
        </div>
      </div>
      {/* 作业一 */}
      <div className="flex items-center justify-center rounded-lg border-2 border-gray-100 p-2">
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-500">
          <span className="font-bold text-2xl text-white">
            D
          </span>
          <div className="absolute right-0 bottom-0 h-4 w-4 rounded-full border-2 border-white bg-green-500"></div>
        </div>
      </div>
      {/* 作业二 */}
      <div className="flex min-h-[50vh] flex-col items-center justify-center rounded-lg border-2 border-gray-300 border-dashed bg-gray-100">
        <div className="flex flex-col items-center gap-4">
          <div className="mb-2 h-8 w-8 rounded-full bg-blue-500"></div>
          <span>暂无书籍</span>
        </div>
      </div>
      {/* 作业三 */}
      <div className="sticky top-[80px] h-20 w-full rounded-2xl bg-amber-300">
        吸附卡片效果
      </div>

      <div className="group relative w-full max-w-sm overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:shadow-xl">
        {/* 上半部分：封面图容器 (Day 2: Positioning & Aspect) */}
        <div className="relative aspect-video overflow-hidden bg-gray-100">
          <Image
            src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=400"
            alt="Book Cover"
            width={400}
            height={225}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* 绝对定位标签 (Day 2: Absolute) */}
          <span className="absolute top-3 left-3 rounded-lg bg-blue-600 px-2 py-1 font-semibold text-white text-xs">
            Next.js 16
          </span>
          {/* 绝对定位收藏按钮 */}
          <Button className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/80 p-2 text-gray-600 backdrop-blur-md transition-colors hover:text-red-500">
            ♥
          </Button>
        </div>

        {/* 下半部分：信息与操作 (Day 1: Flexbox) */}
        <div className="flex flex-col gap-3 p-4">
          <div className="flex items-start justify-between">
            <h3 className="flex-1 truncate font-bold text-gray-900 text-lg">
              深入浅出 React 高级实践
            </h3>
            <span className="ml-2 font-bold text-green-600 text-sm">
              可借阅
            </span>
          </div>

          <p className="line-clamp-2 text-gray-500 text-sm">
            探索 React 19 和 Next.js 16 的最新特性，掌握
            Server Components 与全新的 Cache
            机制撒打卡打卡打卡三大卡司打卡速度快
          </p>

          <div className="flex items-center justify-between border-gray-100 border-t pt-2">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 shrink-0 rounded-full bg-gray-300" />
              <span className="text-gray-600 text-xs">
                周宇 编著
              </span>
            </div>
            <Button className="rounded-lg bg-gray-900 px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-gray-800">
              立即借阅
            </Button>
          </div>
        </div>
      </div>

      <div className="group w-full max-w-sm overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-200 hover:shadow-xl">
        {/* 上半部分 */}
        <div className="relative aspect-video">
          <Image
            src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=400"
            alt="Book Cover"
            width={400}
            height={225}
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <span className="absolute top-3 left-3 rounded-lg bg-blue-600 px-2 py-1 text-white text-xs">
            Next.js 16
          </span>
          <span className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white p-2 text-red-400 text-sm">
            ♥
          </span>
        </div>
        {/* 下半部分 */}
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="font-bold text-xl">
              深入浅出 React 高级实践
            </div>
            <span className="ml-2 font-bold text-green-600 text-sm">
              可借阅
            </span>
          </div>
          <div className="mb-2 border-gray-100 border-b-2 py-2">
            <p className="line-clamp-2 text-gray-500 text-sm">
              探索 React 19 和 Next.js 16 的最新特性，掌握
              Server Components 与全新的 Cache
              机制撒打卡打卡打卡三大卡司打卡速度快
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 shrink-0 rounded-full bg-gray-300" />
              <span className="text-gray-600 text-xs">
                周宇 编著
              </span>
            </div>
            <Button className="rounded-lg bg-gray-900 px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-gray-800">
              立即借阅
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-md antialiased">
        {/* 玻璃拟态卡片 */}
        <div className="group relative rounded-2xl border border-white/20 bg-white/70 p-4 shadow-lg backdrop-blur-xl transition-all duration-300 hover:shadow-xl">
          <div className="flex gap-4">
            {/* 头像：利用 ring 增加精致感 */}
            <div className="relative h-12 w-12 shrink-0 ring-4 ring-white">
              <div className="overflow-hidden rounded-full shadow-md">
                <Image
                  src="https://api.dicebear.com/7.x/avataaars/png?seed=user134&size=48"
                  alt="avatar"
                  width={48}
                  height={48}
                />
              </div>
              {/* 状态点：带上白色描边隔离背景 */}
              <div className="absolute right-0 bottom-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500"></div>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 tracking-tight">
                  周宇 (Next.js Dev)
                </h4>
                <span className="font-bold text-[10px] text-slate-400 uppercase tracking-widest">
                  2 MINS AGO
                </span>
              </div>

              {/* 运用不同的颜色深度区分信息层级 */}
              <p className="mt-1 text-slate-600 text-sm leading-relaxed">
                刚刚给你的{" "}
                <span className="font-medium text-blue-600">
                  《Next.js 16 实战》
                </span>{" "}
                提交了一个 Pull Request，优化了数据流架构。
              </p>

              {/* 底部交互区：半透明背景 */}
              <div className="mt-4 flex justify-end gap-2">
                <Button className="rounded-full bg-slate-900 px-3 py-1.5 font-medium text-white text-xs transition-colors hover:bg-slate-800">
                  查看详情
                </Button>
                <Button className="rounded-full bg-slate-100 px-3 py-1.5 font-medium text-slate-600 text-xs transition-colors hover:bg-slate-200">
                  忽略
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 className="font-medium text-sm uppercase leading-relaxed tracking-widest">
        Product Features
      </h2>

      <div className="w-full p-4">
        {/* 作业一 毛玻璃搜索栏 */}
        <div
          className={
            "h-16 w-full bg-white/40 backdrop-blur-md" +
            "rounded-xl border border-white/40 shadow-sm ring-1 ring-black/5" +
            "transition-all duration-300 hover:border-gray-300 hover:shadow-2xl"
          }
        />
        {/* 作业 2：深度渐变按钮 */}
        <Button className="rounded-xl bg-linear-to-r from-blue-500 to-indigo-500 px-4 py-2 text-white shadow-[0_10px_20px_-10px_rgba(37,99,235,0.4)]">
          搜索
        </Button>
        {/* 作业 3：排版练习 */}
        <div className="w-full p-4">
          <div className="mb-2 font-bold text-2xl text-slate-900 tracking-tight">
            图书管理系统
          </div>
          <div className="text-slate-600 text-sm leading-loose">
            我是介绍。， 我是介绍。， 我是介绍。，
            我是介绍。， 我是介绍。， 我是介绍。，
            我是介绍。， 我是介绍。， 我是介绍。，
            我是介绍。， 我是介绍。， 我是介绍。，
            我是介绍。， 我是介绍。， 我是介绍。，
            我是介绍。， 我是介绍。， 我是介绍。，
            我是介绍。， 我是介绍。， 我是介绍。，
            我是介绍。，
          </div>
        </div>
      </div>

      <Button className="rounded-2xl bg-blue-600 px-8 py-3 font-bold text-white shadow-blue-500/50 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-blue-700">
        探索 Next.js 16
      </Button>

      <section className="w-full p-8">
        <h3 className="mb-4 font-bold text-slate-400 text-xs uppercase tracking-widest">
          Practice 1: OKLCH Gradient
        </h3>
        <div className="relative h-48 max-w-2xl overflow-hidden rounded-3xl shadow-2xl">
          {/* v4.0 的 bg-linear-to-br 渐变 */}
          <div className="absolute inset-0 overflow-hidden bg-linear-to-br from-sky-500/80 via-indigo-600/80 to-purple-700/80" />

          {/* 内容区：利用 backdrop-blur 增加层次 */}
          <div className="relative flex h-full items-center justify-center border border-white/20 p-8 backdrop-blur-sm">
            <h2 className="font-bold text-2xl text-white tracking-tighter">
              2026 年度精选技术丛书
            </h2>
          </div>
        </div>
      </section>
      <section>
        <h3 className="mb-4 font-bold text-slate-400 text-xs uppercase tracking-widest">
          Practice 2: Layered Shadows & Rings
        </h3>
        <div className="flex items-center gap-6 border border-slate-200 p-4">
          <div className="group relative rounded-full">
            {/* 头像容器 */}
            <div className="/* v4.0 组合逻辑：环绕圈 (Ring) 与 描边 (Outline) 同时使用 */ /* 初始阴影 */ /* 悬浮时：利用 group-hover 改变阴影颜色和位移 */ h-20 w-20 cursor-pointer overflow-hidden rounded-full border border-black/5 shadow-md ring-4 ring-white transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_30px_-10px_rgba(79,70,229,0.4)]">
              <Image
                src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=400"
                alt="Reader"
                className="h-full w-full object-cover"
                width={80}
                height={80}
              />
            </div>
          </div>
          <div className="text-slate-800">
            <p className="font-bold">借阅者：周宇</p>
            <p className="text-slate-500 text-sm">
              正在研读《Next.js 16 架构》
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-xl">
        <h3 className="mb-4 font-bold text-slate-400 text-xs uppercase tracking-widest">
          Practice 3: Typography System
        </h3>
        <div className="space-y-4">
          <h1 className="font-black text-5xl text-slate-900 tracking-tighter">
            代码的禅意
          </h1>
          <p className="flex items-center gap-2 font-medium text-slate-400 text-sm">
            <span className="h-px w-8 bg-slate-200"></span>
            THE ART OF MODERN CODE
          </p>

          {/* 首字下沉效果：first-letter */}
          <p className="text-lg text-slate-600 leading-relaxed first-letter:float-left first-letter:mr-3 first-letter:font-black first-letter:text-5xl first-letter:text-slate-900">
            在进入 Next.js 16
            的世界之前，我们必须理解什么是真正的“感知性能”。这不仅仅是
            LCP
            指标的跳动，更是开发者与用户之间的一场无声对话。利用
            OKLCH
            色彩空间，我们能构建出更符合直觉的视觉体验...
          </p>
        </div>

        <div className="group relative h-72 w-72 cursor-pointer">
          {/* 背景装饰：跟随卡片浮动的光晕 */}
          <div className="absolute -inset-2 rounded-2xl bg-linear-to-r from-indigo-500 to-blue-500 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-30"></div>
          {/* 主卡片 */}
          <div className="/* 核心动效：悬浮上移 + 阴影加深 + 激活缩放 */ relative flex h-full w-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 ease-out hover:-translate-y-3 hover:shadow-2xl hover:shadow-blue-500/20 active:scale-95">
            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 transition-transform duration-500 group-hover:rotate-12">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <title>课程</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 text-xl tracking-tight">
                Next.js 16 深度进阶
              </h3>
              <p className="mt-2 text-slate-500 text-sm leading-relaxed">
                掌握最新的 Server Components
                缓存机制与全栈性能优化...
              </p>
            </div>
            {/* 底部交互：利用 group-hover 让按钮“滑入” */}
            <div className="flex items-center justify-between">
              <span className="font-bold text-indigo-600 text-xs">
                NEW RELEASE
              </span>
              <div className="flex h-8 w-8 translate-x-4 items-center justify-center rounded-full bg-slate-900 text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                →
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        {/* 挑战 1：磁吸感社交按钮 */}
        <div className="flex w-full items-center justify-center gap-4 p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-amber-200 transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:bg-amber-400 hover:shadow-amber-500/40 hover:shadow-lg">
            <span className="font-medium text-2xl">T</span>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-blue-200 transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:bg-blue-400 hover:shadow-blue-500/40 hover:shadow-lg">
            <span className="font-medium text-2xl">G</span>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-emerald-200 transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:bg-emerald-400 hover:shadow-emerald-500/40 hover:shadow-lg">
            <span className="font-medium text-2xl">D</span>
          </div>
        </div>
        {/* 挑战 2：骨架屏加载态 (Skeleton) */}
        <div>
          <div className="flex h-48 w-full animate-pulse flex-col items-center justify-center gap-4 rounded-lg duration-[2s]">
            <div className="h-12 w-12 rounded-full bg-slate-200"></div>
            <div className="h-4 w-full rounded-full bg-slate-200"></div>
            <div className="h-4 w-full rounded-full bg-slate-200"></div>
          </div>
        </div>
        {/* 挑战 3：全屏导航微动效 */}
        <div className="flex w-24 flex-col gap-4">
          <div className="group p-2">
            <div className="text-slate-400 transition-all duration-300 group-hover:translate-x-2 group-hover:text-slate-600">
              首页
            </div>
            <div className="h-[2px] w-full origin-left scale-x-0 bg-slate-600 transition-all duration-300 group-hover:scale-x-100"></div>
          </div>
          <div className="group p-2">
            <div className="text-slate-400 transition-all duration-300 group-hover:translate-x-2 group-hover:text-slate-600">
              图书
            </div>
            <div className="h-[2px] w-full origin-left scale-x-0 bg-slate-600 transition-all duration-300 group-hover:scale-x-100"></div>
          </div>
          <div className="group p-2">
            <div className="text-slate-400 transition-all duration-300 group-hover:translate-x-2 group-hover:text-slate-600">
              关于
            </div>
            <div className="h-[2px] w-full origin-left scale-x-0 bg-slate-600 transition-all duration-300 group-hover:scale-x-100"></div>
          </div>
        </div>
      </section>
    </div>
  )
}
