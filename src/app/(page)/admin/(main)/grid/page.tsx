const GRID_PLACEHOLDER_IDS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
] as const

export default function AdminGrid() {
  return (
    <div className="grid h-screen w-full grid-cols-[280px_1fr] grid-rows-[auto_1fr_auto] overflow-hidden bg-slate-100">
      {/* 1. 左侧导航 - 跨越全行 */}
      <aside className="z-20 row-span-full bg-slate-900 p-6 text-white shadow-xl">
        <div className="mb-8 font-black text-xl tracking-tighter">
          LIBRARY OS
        </div>
        <nav className="space-y-2">
          {["仪表盘", "全部图书", "借阅管理", "设置"].map(
            (item) => (
              <div
                key={item}
                className="cursor-pointer rounded-xl px-4 py-3 text-slate-300 text-sm transition-colors hover:bg-white/10 hover:text-white"
              >
                {item}
              </div>
            )
          )}
        </nav>
      </aside>

      {/* 2. 顶部 Header - 位于第1行、第2列 */}
      <header className="z-10 flex h-16 items-center justify-between border-slate-200 border-b bg-white px-8">
        <div className="font-bold text-slate-800">
          全部图书
        </div>
        <div className="h-8 w-8 rounded-full border border-indigo-200 bg-indigo-100" />
      </header>

      {/* 3. 主体内容 - 位于第2行、第2列 - 开启独立滚动 */}
      <main className="overflow-y-auto bg-slate-50 p-6">
        {/* 你的自适应书架 */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(200px,100%),1fr))] gap-4">
          {GRID_PLACEHOLDER_IDS.map((id) => (
            <div
              key={id}
              className="group aspect-3/4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-slate-100 to-slate-50 font-bold text-slate-300">
                BOOK {id}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 4. 底部 Footer - 位于第3行、第2列 */}
      <footer className="flex h-12 items-center border-slate-200 border-t bg-white px-8 text-slate-400 text-xs italic">
        © 2026 Library Management System - Powered by
        Next.js 16 & Tailwind 4.0
      </footer>
    </div>
  )
}
