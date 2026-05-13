import { Button } from "@/components/ui/button"
import Image from "next/image"

// 图书列表页
export default function Books() {
  return (
    <div>
      <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-lg shadow-md">
        {/* 左侧组合：头像 + 文字 */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
            B
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gary-900">
              新书借阅通知
            </span>
            <span className="text-xs text-gray-500">
              你借阅的《Next.js 实战》即将到期
            </span>
          </div>
        </div>
        {/* 右侧：时间 */}
        <div className="text-xs text-gray-400">12:30</div>
      </div>
      {/* 作业一 */}
      <div className="mt-4 w-48 flex flex-col items-center rounded-lg border border-gray-100 bg-white p-8 hover:shadow-sm">
        <div className="flex items-center justify-center w-20 h-20 bg-gray-200 rounded-full text-2xl mb-4">
          Z
        </div>
        <div className="text-sm font-bold font-bold text-xl mb-2">
          周宇
        </div>
        <div className="line-clamp-3 text-xs text-gray-500">
          是一个老六，，喜欢看小说，喜欢看小说，，喜欢看小说，，喜欢看小说，，喜欢看小说，喜欢看小说，喜欢看小说，
        </div>
      </div>
      {/* 作业二 */}
      <div className="flex items-center justify-between p-4">
        <div className="text-2xl font-bold">BOOK APP</div>
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
      <div className="flex items-center justify-between p-4 gap-8">
        <div className="flex items-center justify-between flex-1 border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-center w-20 h-20 bg-gray-200 rounded-full text-2xl mb-4">
            Z
          </div>
          <div className="flex flex-col  gap-2 text-sm font-bold font-bold text-xl">
            <div className="text-gray-500">总书籍</div>
            <div className="text-2xl font-bold">100003</div>
          </div>
        </div>
        <div className="flex items-center justify-between flex-1 border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-center w-20 h-20 bg-gray-200 rounded-full text-2xl mb-4">
            Z
          </div>
          <div className="flex flex-col  gap-2 text-sm font-bold font-bold text-xl">
            <div className="text-gray-500">已借出</div>
            <div className="text-2xl font-bold">100003</div>
          </div>
        </div>
        <div className="flex items-center justify-between flex-1 border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-center w-20 h-20 bg-gray-200 rounded-full text-2xl mb-4">
            Z
          </div>
          <div className="flex flex-col  gap-2 text-sm font-bold font-bold text-xl">
            <div className="text-gray-500">逾期</div>
            <div className="text-2xl font-bold">100003</div>
          </div>
        </div>
      </div>

      {/* 相对定位作为容器，限制最大宽度，溢出隐藏保证圆角 */}
      <div className="relative w-full max-w-[240px] rounded-2xl overflow-hidden shadow-lg bg-white group">
        {/* 图片容器，固定宽高比 */}
        <div className="aspect-3/4 bg-gray-200">
          <Image
            src="/images/111.webp"
            alt="Book"
            width={240}
            height={320}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
        </div>
        {/* 绝对定位标签：右上角 */}
        <div className="absolute top-2 right-2 bg-red-500 text-white text-sm px-2 py-1 rounded-full font-bold shadow-sm">
          热销
        </div>
        {/* 底部遮罩文字：绝对定位在底部 */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <h3 className="text-white font-bold truncate">
            Next.js 16 全栈开发
          </h3>
          <p className="text-gray-300 text-xs">周宇 著</p>
        </div>
      </div>
      {/* 作业一 */}
      <div className="flex items-center justify-center p-2 border-2 border-gray-100 rounded-lg">
        <div className="relative flex items-center justify-center w-16 h-16 bg-pink-500 rounded-2xl">
          <span className="text-white text-2xl font-bold">
            D
          </span>
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
      </div>
      {/* 作业二 */}
      <div className="flex flex-col items-center justify-center  min-h-[50vh] bg-gray-100 border-dashed border-2 border-gray-300 rounded-lg">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 bg-blue-500 mb-2 rounded-full"></div>
          <span>暂无书籍</span>
        </div>
      </div>
      {/* 作业三 */}
      <div className="w-full h-20 sticky top-[80px] bg-amber-300 rounded-2xl">
        吸附卡片效果
      </div>

      <div className="group relative w-full max-w-sm bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
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
          <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-lg font-semibold">
            Next.js 16
          </span>
          {/* 绝对定位收藏按钮 */}
          <Button className="w-8 h-8 absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-md rounded-full text-gray-600 hover:text-red-500 transition-colors">
            ♥
          </Button>
        </div>

        {/* 下半部分：信息与操作 (Day 1: Flexbox) */}
        <div className="p-4 flex flex-col gap-3">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-gray-900 truncate flex-1">
              深入浅出 React 高级实践
            </h3>
            <span className="text-green-600 text-sm font-bold ml-2">
              可借阅
            </span>
          </div>

          <p className="text-gray-500 text-sm line-clamp-2">
            探索 React 19 和 Next.js 16 的最新特性，掌握
            Server Components 与全新的 Cache
            机制撒打卡打卡打卡三大卡司打卡速度快
          </p>

          <div className="pt-2 flex items-center justify-between border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-300 rounded-full shrink-0" />
              <span className="text-xs text-gray-600">
                周宇 编著
              </span>
            </div>
            <Button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
              立即借阅
            </Button>
          </div>
        </div>
      </div>

      <div className="group w-full max-w-sm bg-white border border-gray-200 overflow-hidden rounded-2xl hover:shadow-xl transition-all duration-200">
        {/* 上半部分 */}
        <div className="relative aspect-video">
          <Image
            src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=400"
            alt="Book Cover"
            width={400}
            height={225}
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-lg">
            Next.js 16
          </span>
          <span className="absolute w-8 h-8 flex items-center justify-center top-3 right-3 text-red-400 bg-white rounded-full p-2 text-sm">
            ♥
          </span>
        </div>
        {/* 下半部分 */}
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold">
              深入浅出 React 高级实践
            </div>
            <span className="text-green-600 text-sm font-bold ml-2">
              可借阅
            </span>
          </div>
          <div className="py-2 mb-2 border-b-2 border-gray-100">
            <p className="text-gray-500 text-sm line-clamp-2">
              探索 React 19 和 Next.js 16 的最新特性，掌握
              Server Components 与全新的 Cache
              机制撒打卡打卡打卡三大卡司打卡速度快
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-300 rounded-full shrink-0" />
              <span className="text-xs text-gray-600">
                周宇 编著
              </span>
            </div>
            <Button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
              立即借阅
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto antialiased">
        {/* 玻璃拟态卡片 */}
        <div className="group relative p-4 bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ">
          <div className="flex gap-4">
            {/* 头像：利用 ring 增加精致感 */}
            <div className="relative w-12 h-12 shrink-0 ring-4 ring-white ">
              <div className="rounded-full shadow-md overflow-hidden">
                <Image
                  src="https://api.dicebear.com/7.x/avataaars/png?seed=user134&size=48"
                  alt="avatar"
                  width={48}
                  height={48}
                />
              </div>
              {/* 状态点：带上白色描边隔离背景 */}
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-slate-900 font-bold tracking-tight">
                  周宇 (Next.js Dev)
                </h4>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  2 MINS AGO
                </span>
              </div>

              {/* 运用不同的颜色深度区分信息层级 */}
              <p className="mt-1 text-slate-600 text-sm leading-relaxed">
                刚刚给你的{" "}
                <span className="text-blue-600 font-medium">
                  《Next.js 16 实战》
                </span>{" "}
                提交了一个 Pull Request，优化了数据流架构。
              </p>

              {/* 底部交互区：半透明背景 */}
              <div className="mt-4 flex gap-2 justify-end">
                <Button className="px-3 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-full hover:bg-slate-800 transition-colors">
                  查看详情
                </Button>
                <Button className="px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-medium rounded-full hover:bg-slate-200 transition-colors">
                  忽略
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-sm font-medium tracking-widest leading-relaxed uppercase">
        Product Features
      </h2>

      <div className="w-full p-4">
        {/* 作业一 毛玻璃搜索栏 */}
        <div
          className={
            "w-full h-16 bg-white/40 backdrop-blur-md " +
            "border border-white/40 ring-1 ring-black/5 rounded-xl shadow-sm " +
            "hover:border-gray-300 hover:shadow-2xl transition-all duration-300"
          }
        />
        {/* 作业 2：深度渐变按钮 */}
        <Button className="bg-linear-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-xl  shadow-[0_10px_20px_-10px_rgba(37,99,235,0.4)] ">
          搜索
        </Button>
        {/* 作业 3：排版练习 */}
        <div className="w-full p-4">
          <div className="text-slate-900 text-2xl font-bold tracking-tight mb-2">
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

      <Button className="bg-blue-600 text-white shadow-lg shadow-blue-500/50 hover:-translate-y-1 hover:scale-105 hover:bg-blue-700 transition-all duration-300 px-8 py-3 rounded-2xl font-bold">
        探索 Next.js 16
      </Button>

      <section className="w-full p-8">
        <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">
          Practice 1: OKLCH Gradient
        </h3>
        <div className="relative max-w-2xl h-48 rounded-3xl overflow-hidden shadow-2xl">
          {/* v4.0 的 bg-linear-to-br 渐变 */}
          <div className="absolute inset-0 bg-linear-to-br from-sky-500/80 via-indigo-600/80 to-purple-700/80 overflow-hidden" />

          {/* 内容区：利用 backdrop-blur 增加层次 */}
          <div className="relative h-full flex items-center justify-center p-8 backdrop-blur-sm border border-white/20">
            <h2 className="text-white text-2xl font-bold tracking-tighter">
              2026 年度精选技术丛书
            </h2>
          </div>
        </div>
      </section>
      <section>
        <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">
          Practice 2: Layered Shadows & Rings
        </h3>
        <div className="flex items-center gap-6 border border-slate-200 p-4">
          <div className="group relative  rounded-full">
            {/* 头像容器 */}
            <div
              className="
              w-20 h-20 rounded-full 
              /* v4.0 组合逻辑：环绕圈 (Ring) 与 描边 (Outline) 同时使用 */
              ring-4 ring-white 
              border border-black/5
              /* 初始阴影 */
              shadow-md 
              /* 悬浮时：利用 group-hover 改变阴影颜色和位移 */
              group-hover:shadow-[0_20px_30px_-10px_rgba(79,70,229,0.4)] 
              group-hover:-translate-y-2
              transition-all duration-500 cursor-pointer
              overflow-hidden
            "
            >
              <Image
                src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=400"
                alt="Reader"
                className="w-full h-full object-cover"
                width={80}
                height={80}
              />
            </div>
          </div>
          <div className="text-slate-800">
            <p className="font-bold">借阅者：周宇</p>
            <p className="text-sm text-slate-500">
              正在研读《Next.js 16 架构》
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-xl">
        <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">
          Practice 3: Typography System
        </h3>
        <div className="space-y-4">
          <h1 className="text-slate-900 text-5xl font-black tracking-tighter">
            代码的禅意
          </h1>
          <p className="text-slate-400 text-sm font-medium flex items-center gap-2">
            <span className="w-8 h-px bg-slate-200"></span>
            THE ART OF MODERN CODE
          </p>

          {/* 首字下沉效果：first-letter */}
          <p className="text-slate-600 text-lg leading-relaxed first-letter:text-5xl first-letter:font-black first-letter:text-slate-900 first-letter:mr-3 first-letter:float-left">
            在进入 Next.js 16
            的世界之前，我们必须理解什么是真正的“感知性能”。这不仅仅是
            LCP
            指标的跳动，更是开发者与用户之间的一场无声对话。利用
            OKLCH
            色彩空间，我们能构建出更符合直觉的视觉体验...
          </p>
        </div>

        <div className="group relative w-72 h-72 cursor-pointer">
          {/* 背景装饰：跟随卡片浮动的光晕 */}
          <div
            className="absolute -inset-2 bg-linear-to-r from-indigo-500
           to-blue-500 rounded-2xl blur-xl opacity-0 
           group-hover:opacity-30 transition-opacity duration-500"
          ></div>
          {/* 主卡片 */}
          <div
            className="
              relative h-full w-full 
              bg-white border border-slate-200 rounded-2xl p-6
              flex flex-col justify-between
              /* 核心动效：悬浮上移 + 阴影加深 + 激活缩放 */
              transition-all duration-300 ease-out
              hover:-translate-y-3 hover:shadow-2xl hover:shadow-blue-500/20
              active:scale-95
            "
          >
            <div>
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-4 group-hover:rotate-12 transition-transform duration-500">
                <svg
                  className="w-6 h-6"
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
              <h3 className="text-slate-900 font-bold text-xl tracking-tight">
                Next.js 16 深度进阶
              </h3>
              <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                掌握最新的 Server Components
                缓存机制与全栈性能优化...
              </p>
            </div>
            {/* 底部交互：利用 group-hover 让按钮“滑入” */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-600">
                NEW RELEASE
              </span>
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                →
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        {/* 挑战 1：磁吸感社交按钮 */}
        <div className="flex justify-center items-center gap-4 w-full  p-4">
          <div className="flex items-center justify-center w-12 h-12 bg-amber-200 border border-slate-200 rounded-full hover:bg-amber-400 hover:scale-105 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-500/40 transition-all duration-300">
            <span className="text-2xl font-medium">T</span>
          </div>
          <div className="flex items-center justify-center w-12 h-12 bg-blue-200 border border-slate-200 rounded-full hover:bg-blue-400 hover:scale-105 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300">
            <span className="text-2xl font-medium">G</span>
          </div>
          <div className="flex items-center justify-center w-12 h-12 bg-emerald-200 border border-slate-200 rounded-full hover:bg-emerald-400 hover:scale-105 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/40 transition-all duration-300">
            <span className="text-2xl font-medium">D</span>
          </div>
        </div>
        {/* 挑战 2：骨架屏加载态 (Skeleton) */}
        <div>
          <div className="flex flex-col justify-center items-center gap-4 w-full h-48  rounded-lg animate-pulse duration-[2s]">
            <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
            <div className="w-full h-4 bg-slate-200 rounded-full "></div>
            <div className="w-full h-4 bg-slate-200 rounded-full "></div>
          </div>
        </div>
        {/* 挑战 3：全屏导航微动效 */}
        <div className="flex flex-col gap-4 w-24">
          <div className=" group p-2 ">
            <div className="text-slate-400  group-hover:text-slate-600 group-hover:translate-x-2 transition-all duration-300">
              首页
            </div>
            <div className="w-full h-[2px] bg-slate-600 scale-x-0 origin-left  group-hover:scale-x-100 transition-all duration-300 "></div>
          </div>
          <div className=" group p-2 ">
            <div className="text-slate-400  group-hover:text-slate-600 group-hover:translate-x-2 transition-all duration-300">
              图书
            </div>
            <div className="w-full h-[2px] bg-slate-600 scale-x-0 origin-left  group-hover:scale-x-100 transition-all duration-300 "></div>
          </div>
          <div className=" group p-2 ">
            <div className="text-slate-400  group-hover:text-slate-600 group-hover:translate-x-2 transition-all duration-300">
              关于
            </div>
            <div className="w-full h-[2px] bg-slate-600 scale-x-0 origin-left  group-hover:scale-x-100 transition-all duration-300 "></div>
          </div>
        </div>
      </section>
    </div>
  )
}
