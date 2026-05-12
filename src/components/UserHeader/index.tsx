import Image from "next/image"
import Link from "next/link"
import logoFontImage from "@/public/image/logoFontImage.png"

export default function UserHeader() {
  return (
    <div className="h-[80px] fixed top-0 left-0 w-full z-10 bg-black/30 backdrop-blur-sm flex items-center pr-60">
      <div className="flex items-center pl-70">
        <Image
          src={logoFontImage}
          alt="logo"
          width={150}
          height={110}
          className="w-[150px] h-auto"
        />
      </div>
      <div className="flex items-center gap-4 text-white/90 mt-[4px] ml-auto">
        <div className="flex items-center gap-6">
          <Link href="/user/home">首 页</Link>
          <Link href="/user/books">图 书</Link>
          <Link href="/user/collect">收 藏</Link>
          <Link href="/user/borrow">借 阅</Link>
          <Link href="/user/recommend">推 荐</Link>
          <Link href="/user/setting">设 置</Link>
        </div>
        <div className="w-px h-4 bg-white"></div>
        <div className="flex items-center gap-6">
          <Link href="/user/login">登 录</Link>
          <Link href="/user/register">注 册</Link>
        </div>
      </div>
    </div>
  )
}
