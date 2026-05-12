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
    </div>
  )
}
