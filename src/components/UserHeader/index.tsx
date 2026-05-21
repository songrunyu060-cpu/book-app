"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { cn } from "@/lib/utils"
import logoFontImage from "@/public/image/logoFontImage.png"
import { Button } from "../ui/button"

export default function UserHeader() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const navLinks = [
    { name: "首 页", href: "/user/home" },
    { name: "图 书", href: "/user/books" },
    { name: "收 藏", href: "/user/collect" },
    { name: "借 阅", href: "/user/borrow" },
    { name: "推 荐", href: "/user/recommend" },
    { name: "设 置", href: "/user/setting" },
  ]
  const onLogout = async () => {
    if (!window.confirm("确定要退出登录吗？")) return
    await signOut({
      callbackUrl: "/user/login",
    })
  }
  return (
    <div className="fixed top-0 left-0 z-10 h-[80px] w-full bg-black/30 backdrop-blur-sm">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        <Link
          href="/user/home"
          className="flex items-center"
        >
          <Image
            src={logoFontImage}
            alt="logo"
            width={150}
            height={110}
            className="object-contain"
            priority
          />
        </Link>
        <nav className="flex items-center gap-8">
          <div className="flex items-center gap-8 font-medium text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-all hover:text-white",
                  pathname === link.href
                    ? "scale-110 text-white"
                    : "text-white/70"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="h-4 w-px bg-white/20"></div>
          {!session ? (
            <div className="flex items-center gap-6 text-sm">
              <Link
                href="/user/login"
                className="text-white/70 transition-colors hover:text-white"
              >
                登 录
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-6 text-sm">
              <Button
                className="rounded-full"
                onClick={onLogout}
              >
                退出登录
              </Button>
              <Link
                href="/user/profile"
                className="text-white/70 transition-colors hover:text-white"
              >
                {session.user?.phone}
              </Link>
              <Link
                href="/user/profile"
                className="text-white/70 transition-colors hover:text-white"
              >
                {session.user?.email}
              </Link>
            </div>
          )}
        </nav>
      </div>
    </div>
  )
}
