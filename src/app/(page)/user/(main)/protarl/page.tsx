"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

export default function BookDetailDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // 确保在客户端挂载后再渲染 Portal，避免 SSR 报错
  useEffect(() => {
    setMounted(true)
    // 防止抽屉打开时页面滚动
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!mounted) return null

  return (
    <>
      {/* 触发按钮：留在业务页面中 */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-xl bg-slate-900 px-6 py-3 text-white shadow-lg transition-all hover:bg-slate-800 active:scale-95"
      >
        查看图书详情
      </button>

      {/* 使用 Portal 将抽屉挂载到 body 末尾 */}
      {createPortal(
        <div
          className={`fixed inset-0 z-50 ${isOpen ? "visible" : "invisible"}`}
        >
          {/* 1. 背景遮罩（用 button 满足 a11y：可键盘聚焦并触发关闭） */}
          <button
            type="button"
            aria-label="关闭抽屉"
            className={`absolute inset-0 cursor-default border-0 bg-slate-900/40 p-0 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-0"}
            `}
            onClick={() => setIsOpen(false)}
          />

          {/* 2. 侧边栏面板 */}
          <aside
            className={`absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isOpen ? "translate-x-0" : "translate-x-full"}
          `}
          >
            <div className="p-8">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="mb-8 text-slate-400 transition-colors hover:text-slate-900"
              >
                关闭后退 ←
              </button>

              <div className="space-y-6">
                <h2
                  className={`font-black text-3xl transition-all delay-100 duration-700 ${isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                >
                  Next.js 16 架构全书
                </h2>
                <div
                  className={`h-1 w-12 bg-indigo-600 transition-all delay-200 duration-700 ${isOpen ? "scale-x-100" : "scale-x-0"} origin-left`}
                />
                <p
                  className={`text-slate-600 leading-relaxed transition-all delay-300 duration-700 ${isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                >
                  这是关于 App Router 与 Server Components
                  的深度实战指南。
                </p>
              </div>
            </div>
          </aside>
        </div>,
        document.body
      )}
    </>
  )
}
