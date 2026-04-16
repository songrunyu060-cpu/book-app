export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-blue-50 relative overflow-hidden">
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -right-20 w-80 h-80 bg-red-100/20 rounded-full blur-3xl"></div>

      <div className="max-w-md mx-auto min-h-screen flex flex-col justify-center px-6 relative z-10">
        {children}
      </div>
    </div>
  )
}
