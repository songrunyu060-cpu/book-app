import Link from "next/link"

// 纯服务端组件，无客户端代码
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6 text-center">
      <div className="w-full max-w-xl">
        {/* 卡通 404 标题 */}
        <div className="relative">
          <h1 className="animate-bounce bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text font-black text-[120px] text-transparent drop-shadow-lg">
            404
          </h1>
          <div className="absolute top-10 -right-6 rotate-12">
            <span className="rounded-full bg-white px-3 py-1 font-bold text-lg text-purple-500 shadow-md">
              OOPS!
            </span>
          </div>
        </div>

        {/* 卡通云朵框 */}
        <div className="relative mt-4 overflow-hidden rounded-3xl border-4 border-purple-200 bg-white p-8 shadow-xl">
          <div className="absolute -top-6 -left-6 h-10 w-20 rounded-full bg-blue-100 opacity-70"></div>
          <div className="absolute -right-6 -bottom-6 h-12 w-24 rounded-full bg-pink-100 opacity-70"></div>

          <h2 className="mb-3 font-bold text-2xl text-gray-700 md:text-3xl">
            页面迷路啦 🧭
          </h2>
          <p className="mb-6 text-gray-500">
            你访问的页面不存在，或者已经跑到童话世界里去咯～
          </p>

          {/* 按钮组（使用 Next Link，服务端友好） */}
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/"
              className="rounded-full bg-purple-400 px-6 py-3 font-semibold text-white shadow-md transition-transform hover:scale-105 hover:bg-purple-500"
            >
              🏠 回到首页
            </Link>
          </div>
        </div>

        <p className="mt-6 text-gray-400 text-sm">
          抱歉，无法找到该页面
        </p>
      </div>
    </div>
  )
}
