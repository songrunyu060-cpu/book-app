"use client"

import React, { useState, useEffect } from "react"
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
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all active:scale-95 shadow-lg"
      >
        查看图书详情
      </button>

      {/* 使用 Portal 将抽屉挂载到 body 末尾 */}
      {createPortal(
        <div
          className={`fixed inset-0 z-50 ${isOpen ? "visible" : "invisible"}`}
        >
          {/* 1. 背景遮罩 */}
          <div
            className={`
              absolute inset-0 bg-slate-900/40 backdrop-blur-sm
              transition-opacity duration-500
              ${isOpen ? "opacity-100" : "opacity-0"}
            `}
            onClick={() => setIsOpen(false)}
          />

          {/* 2. 侧边栏面板 */}
          <aside
            className={`
            absolute top-0 right-0 h-full w-full max-w-md bg-white
            shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
            ${isOpen ? "translate-x-0" : "translate-x-full"}
          `}
          >
            <div className="p-8">
              <button
                onClick={() => setIsOpen(false)}
                className="mb-8 text-slate-400 hover:text-slate-900 transition-colors"
              >
                关闭后退 ←
              </button>

              <div className="space-y-6">
                <h2
                  className={`text-3xl font-black transition-all duration-700 delay-100 ${isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                >
                  Next.js 16 架构全书
                </h2>
                <div
                  className={`h-1 w-12 bg-indigo-600 transition-all duration-700 delay-200 ${isOpen ? "scale-x-100" : "scale-x-0"} origin-left`}
                />
                <p
                  className={`text-slate-600 leading-relaxed transition-all duration-700 delay-300 ${isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
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
