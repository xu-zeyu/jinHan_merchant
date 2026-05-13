import Link from "next/link";

import { ROUTES } from "@/constants/routes";

export default function RegisterPage() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col justify-center">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary-700">
        Register
      </p>
      <h2 className="mt-4 text-3xl font-semibold text-slate-900">注册商家账号</h2>
      <p className="mt-3 text-sm leading-6 text-slate-500">
        当前为静态占位页，后续可接入真实商家入驻与账号创建流程。
      </p>

      <Link className="mt-8 text-sm font-medium text-primary-700" href={ROUTES.LOGIN}>
        已有账号，去登录
      </Link>
    </div>
  );
}
