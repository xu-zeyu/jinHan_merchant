import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col justify-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary-700">
          Create Account
        </p>
        <h2 className="mt-4 text-3xl font-semibold text-slate-900">注册商家账号</h2>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          完成店铺注册后，可以继续接入商品、订单和会员模块。
        </p>
      </div>

      <form className="mt-8 space-y-4">
        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-700">店铺名称</span>
          <input
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-primary"
            placeholder="JinHan 宠物旗舰店"
            type="text"
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-700">邮箱</span>
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
          创建账号
        </button>
      </form>

      <p className="mt-6 text-sm text-slate-500">
        已有账号？
        <Link className="ml-2 font-medium text-primary-700 hover:text-primary-800" href="/login">
          去登录
        </Link>
      </p>
    </div>
  );
}
