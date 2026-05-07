import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col justify-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary-700">
          Reset Password
        </p>
        <h2 className="mt-4 text-3xl font-semibold text-slate-900">找回密码</h2>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          输入登录邮箱后，后续可以接入邮件验证码或重置链接。
        </p>
      </div>

      <form className="mt-8 space-y-4">
        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-700">登录邮箱</span>
          <input
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-primary"
            placeholder="merchant@jinhan.pet"
            type="email"
          />
        </label>
        <button
          className="w-full rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary-600"
          type="submit"
        >
          发送重置链接
        </button>
      </form>

      <p className="mt-6 text-sm text-slate-500">
        想起密码了？
        <Link className="ml-2 font-medium text-primary-700 hover:text-primary-800" href="/login">
          返回登录
        </Link>
      </p>
    </div>
  );
}
