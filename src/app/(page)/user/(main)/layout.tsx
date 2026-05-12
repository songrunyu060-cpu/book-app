import { UserHeader } from "@/components"

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <UserHeader />
      <main className="mx-auto w-full max-w-6xl px-4 pt-[80px] pb-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}
