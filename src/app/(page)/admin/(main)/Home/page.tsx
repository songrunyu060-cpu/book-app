// 管理员端首页 用户统计、图书统计、借阅统计、分类统计、书评统计
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="h-full-screen">
      <div className="group w-full max-w-4xl mx-auto rounded-2xl bg-slate-50 overflow-hidden border-slate-100 border hover:shadow-xl transition-all duration-300 shadow-md">
        <div className="relative aspect-video">
          <Image
            src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=400"
            alt="Book Cover"
            width={400}
            height={225}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute left-3 top-3 bg-blue-400 text-white  px-2 py-1 rounded-lg">
            nextjs 16
          </div>
          <div className="absolute right-3 top-3 bg-red-400 text-white  px-2 py-1 rounded-lg">
            {" "}
            收藏
          </div>
        </div>
        <div className="p-4">
          <div className="pb-2">
            <p className="line-clamp-3 leading-relaxed">
              探索 React 19 和 Next.js 16 的最新特性，掌握
              Server Components 与全新的 Cache
              卡打卡打卡三大卡司打卡速度快机制撒打卡打卡打卡三大卡司打卡速度快机制撒打卡打卡打卡三大卡司打卡速度快
              卡打卡打卡三大卡司打卡速度快机制撒打卡打卡打卡三大卡司打卡速度快机制撒打卡打卡打卡三大卡司打卡速度快
              机制撒打卡打卡打卡三大卡司打卡速度快机制撒打卡打卡打卡三大卡司打卡速度快机制撒打卡打卡打卡三大卡司打卡速度快机制撒打卡打卡打卡三大卡司打卡速度快
            </p>
          </div>
          <div className="pt-4 flex items-center justify-between border-t border-gray-100">
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
