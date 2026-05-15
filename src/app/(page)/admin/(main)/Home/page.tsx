// 管理员端首页 用户统计、图书统计、借阅统计、分类统计、书评统计

import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="h-full-screen">
      <div className="group mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 shadow-md transition-all duration-300 hover:shadow-xl">
        <div className="relative aspect-video">
          <Image
            src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=400"
            alt="Book Cover"
            width={400}
            height={225}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 rounded-lg bg-blue-400 px-2 py-1 text-white">
            nextjs 16
          </div>
          <div className="absolute top-3 right-3 rounded-lg bg-red-400 px-2 py-1 text-white">
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
          <div className="flex items-center justify-between border-gray-100 border-t pt-4">
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
    </div>
  )
}
