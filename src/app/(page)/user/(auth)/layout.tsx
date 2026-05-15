import { UserHeader } from "@/components"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="absolute h-full w-full overflow-hidden">
      <UserHeader />
      <div className="absolute z-0 h-full w-full">
        <video
          src="/video/welcome.mp4"
          autoPlay
          muted
          loop
          className="h-full w-full object-cover object-left"
        ></video>
      </div>
      {/* 右侧垂直居中容器（共用） */}
      <div className="relative z-2 flex min-h-screen w-full items-center justify-end px-10 sm:px-10 lg:px-60">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  )
}
