import type { Metadata } from "next"
import Script from "next/script"
import "./globals.css"
import { auth } from "@/auth"
import { AuthSessionProvider } from "@/components/providers/session-provider"
import { cn } from "@/lib/utils"

/**
 * 用于设置页面标题和描述
 * @type {Metadata}
 */
export const metadata: Metadata = {
  title: "西瓜书屋",
  description: "西瓜书屋，一个免费的图书搜索平台",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  return (
    <html
      lang="zh-CN"
      className={cn("h-full", "antialiased", "font-sans")}
      suppressHydrationWarning
    >
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
        >{`
          (function () {
            try {
              var stored = localStorage.getItem('theme');
              if (stored === 'light' || stored === 'dark') {
                document.documentElement.dataset.theme = stored;
              }
            } catch (e) {}
          })();
        `}</Script>
      </head>
      <body className="flex min-h-full flex-col">
        <AuthSessionProvider session={session}>
          {children}
        </AuthSessionProvider>
      </body>
    </html>
  )
}
