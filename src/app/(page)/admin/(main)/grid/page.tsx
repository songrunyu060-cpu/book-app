const GRID_PLACEHOLDER_IDS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
] as const

export default function AdminGrid() {
  return (
    <div className="h-screen w-full grid grid-cols-[280px_1fr] grid-rows-[auto_1fr_auto] overflow-hidden bg-slate-100">
      {/* 1. 左侧导航 - 跨越全行 */}
      <aside className="row-span-full bg-slate-900 text-white p-6 shadow-xl z-20">
        <div className="text-xl font-black mb-8 tracking-tighter">
          LIBRARY OS
        </div>
        <nav className="space-y-2">
          {["仪表盘", "全部图书", "借阅管理", "设置"].map(
            (item) => (
              <div
                key={item}
                className="px-4 py-3 rounded-xl hover:bg-white/10 cursor-pointer transition-colors text-slate-300 hover:text-white text-sm"
              >
                {item}
              </div>
            )
          )}
        </nav>
      </aside>

      {/* 2. 顶部 Header - 位于第1行、第2列 */}
      <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between z-10">
        <div className="font-bold text-slate-800">
          全部图书
        </div>
        <div className="w-8 h-8 bg-indigo-100 rounded-full border border-indigo-200" />
      </header>

      {/* 3. 主体内容 - 位于第2行、第2列 - 开启独立滚动 */}
      <main className="p-6 overflow-y-auto bg-slate-50">
        {/* 你的自适应书架 */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(200px,100%),1fr))] gap-4">
          {GRID_PLACEHOLDER_IDS.map((id) => (
            <div
              key={id}
              className="group aspect-3/4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className="h-full w-full bg-linear-to-br from-slate-100 to-slate-50 flex items-center justify-center text-slate-300 font-bold">
                BOOK {id}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 4. 底部 Footer - 位于第3行、第2列 */}
      <footer className="h-12 bg-white border-t border-slate-200 px-8 flex items-center text-xs text-slate-400 italic">
        © 2026 Library Management System - Powered by
        Next.js 16 & Tailwind 4.0
      </footer>
    </div>
  )
}
