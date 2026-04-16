import Link from "next/link";
import Image from "next/image";
import logoFontImage from "@/src/public/image/logoFontImage.png";

export default function UserHeader() {
  return (
    <div className="h-[80px] fixed top-0 left-0 w-full z-10 bg-transparent backdrop-blur-sm flex items-center pr-60">
      <div className="flex items-center pl-70">
        <Image src={logoFontImage} alt="logo" width={150} height={110} />
      </div>
      <div className="flex items-center gap-4 text-white/90 mt-[4px] ml-auto">
        <div className="flex items-center gap-6">
          <Link href="/">首 页</Link>
          <Link href="/books">图 书</Link>
          <Link href="/collect">收 藏</Link>
          <Link href="/borrow">借 阅</Link>
          <Link href="/notice">通 知</Link>
          <Link href="/setting">设 置</Link>
        </div>
        <div className="w-[1px] h-4 bg-white"></div>
        <div className="flex items-center gap-6">
          <Link href="/user/login">登 录</Link>
          <Link href="/user/register">注 册</Link>
        </div>
      </div>
    </div>
  );
}
