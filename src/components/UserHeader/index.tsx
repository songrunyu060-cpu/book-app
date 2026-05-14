"use client"
import Image from "next/image"
import Link from "next/link"
import logoFontImage from "@/public/image/logoFontImage.png"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function UserHeader() {
  const pathname = usePathname()

  const navLinks = [
    { name: "首 页", href: "/user/home" },
    { name: "图 书", href: "/user/books" },
    { name: "收 藏", href: "/user/collect" },
    { name: "借 阅", href: "/user/borrow" },
    { name: "推 荐", href: "/user/recommend" },
    { name: "设 置", href: "/user/setting" },
  ]
  return (
    <div className="h-[80px] fixed top-0 left-0 w-full z-10 bg-black/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6">
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
          <div className="flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-all hover:text-white",
                  pathname === link.href
                    ? "text-white scale-110"
                    : "text-white/70"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="w-px h-4 bg-white/20"></div>
          <div className="flex items-center gap-6 text-sm">
            <Link
              href="/user/login"
              className="text-white/70 hover:text-white transition-colors"
            >
              登 录
            </Link>
            <Link
              href="/user/register"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full border border-white/20 transition-all text-white"
            >
              注 册
            </Link>
          </div>
        </nav>
        {/* // <div className="flex items-center gap-4 text-white/90 mt-[4px] ml-auto">
        //   <div className="flex items-center gap-6">
        //     <Link href="/user/home">首 页</Link>
        //     <Link href="/user/books">图 书</Link>
        //     <Link href="/user/collect">收 藏</Link>
        //     <Link href="/user/borrow">借 阅</Link>
        //     <Link href="/user/recommend">推 荐</Link>
        //     <Link href="/user/setting">设 置</Link>
        //   </div>
        //   <div className="w-px h-4 bg-white"></div>
        //   <div className="flex items-center gap-6">
        //     <Link href="/user/login">登 录</Link>
        //     <Link href="/user/register">注 册</Link>
        //   </div>
        // </div> */}
      </div>
    </div>
  )
}
