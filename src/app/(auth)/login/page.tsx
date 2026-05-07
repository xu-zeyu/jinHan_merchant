import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col justify-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary-700">
          Sign In
        </p>
        <h2 className="mt-4 text-3xl font-semibold text-slate-900">登录商家后台</h2>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          当前为静态占位登录页，后续可接入真实认证流程。
        </p>
      </div>

      <form className="mt-8 space-y-4">
        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-700">邮箱</span>
          <input
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-primary"
            placeholder="merchant@jinhan.pet"
            type="email"
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-700">密码</span>
          <input
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-primary"
            placeholder="请输入密码"
            type="password"
          />
        </label>
        <button
          className="w-full rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary-600"
          type="submit"
        >
          登录
        </button>
      </form>

      <div className="mt-6 flex items-center justify-between text-sm text-slate-500">
        <Link className="hover:text-primary-700" href="/forgot-password">
          忘记密码
        </Link>
        <Link className="hover:text-primary-700" href="/register">
          注册新账号
        </Link>
      </div>
    </div>
  );
}
