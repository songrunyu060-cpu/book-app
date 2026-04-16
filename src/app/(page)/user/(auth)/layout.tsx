import { UserHeader } from "@/src/components";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full w-full absolute overflow-hidden">
      <UserHeader />
      <div className="h-full w-full absolute z-0">
        <video
          src="/video/welcome.mp4"
          autoPlay
          muted
          loop
          className="h-full w-full object-cover object-left"
        ></video>
      </div>
      {/* 右侧垂直居中容器（共用） */}
      <div className="min-h-screen w-full flex items-center justify-end px-10 sm:px-10 lg:px-60 relative z-2">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
