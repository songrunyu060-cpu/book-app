// 登录页（只保留核心内容）
export default function LoginPage() {
  return (
    <div className="relative rounded-3xl p-8 sm:p-10 bg-transparent backdrop-blur-md ring-1 ring-white/25 shadow-[0_24px_70px_rgba(0,0,0,0.35)]">
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-transparent" />

      {/* 标题 */}
      <div className="relative mb-7">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
          密码登录
        </h1>
      </div>

      {/* 表单 */}
      <form className="relative space-y-5">
        <div>
          <label
            className="block text-white/85 text-sm mb-1 ml-0.5"
            htmlFor="login-account"
          >
            账号
          </label>
          <input
            id="login-account"
            type="text"
            placeholder="请输入您的账号"
            className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder:text-white/45 ring-1 ring-white/20 focus:outline-none focus:ring-2 focus:ring-white/35"
          />
        </div>

        <div>
          <label
            className="block text-white/85 text-sm mb-1 ml-0.5"
            htmlFor="login-password"
          >
            密码
          </label>
          <input
            id="login-password"
            type="password"
            placeholder="请输入密码"
            className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder:text-white/45 ring-1 ring-white/20 focus:outline-none focus:ring-2 focus:ring-white/35"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl font-medium text-slate-950 bg-white hover:bg-white/90 active:bg-white/80 transition"
        >
          登 录 / 注 册
        </button>
      </form>
    </div>
  )
}
