import Link from "next/link";

// 纯服务端组件，无客户端代码
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6 text-center">
      <div className="max-w-xl w-full">
        {/* 卡通 404 标题 */}
        <div className="relative">
          <h1 className="text-[120px] font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 drop-shadow-lg animate-bounce">
            404
          </h1>
          <div className="absolute top-10 -right-6 rotate-12">
            <span className="bg-white px-3 py-1 rounded-full text-purple-500 font-bold shadow-md text-lg">
              OOPS!
            </span>
          </div>
        </div>

        {/* 卡通云朵框 */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mt-4 relative overflow-hidden border-4 border-purple-200">
          <div className="absolute -top-6 -left-6 w-20 h-10 bg-blue-100 rounded-full opacity-70"></div>
          <div className="absolute -bottom-6 -right-6 w-24 h-12 bg-pink-100 rounded-full opacity-70"></div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-3">
            页面迷路啦 🧭
          </h2>
          <p className="text-gray-500 mb-6">
            你访问的页面不存在，或者已经跑到童话世界里去咯～
          </p>

          {/* 按钮组（使用 Next Link，服务端友好） */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-6 py-3 bg-purple-400 hover:bg-purple-500 text-white font-semibold rounded-full shadow-md transition-transform hover:scale-105"
            >
              🏠 回到首页
            </Link>
          </div>
        </div>

        <p className="text-sm text-gray-400 mt-6">抱歉，无法找到该页面</p>
      </div>
    </div>
  );
}
