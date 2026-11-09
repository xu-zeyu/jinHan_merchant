"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApiError } from "@/services/api-client";
import { ROUTES } from "@/constants/routes";

import { loginAdmin } from "../api/login";
import { CaptchaField } from "./captcha-field";
import { useCaptcha } from "../hooks/use-captcha";
import { loginSchema, type LoginFormValues } from "../schemas/login.schema";
import { useAuthStore } from "../store/use-auth-store";
import { getAuthenticatedRedirectPath } from "../utils/auth-routing";

/** 管理员登录表单（ADMIN-V1-02，依赖 ADMIN-V1-01 验证码） */
export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setSession = useAuthStore((state) => state.setSession);
  const captchaQuery = useCaptcha();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "", captchaCode: "" },
  });

  const loginMutation = useMutation({
    mutationFn: (values: LoginFormValues) => {
      const captchaId = captchaQuery.data?.captchaId;
      if (!captchaId) {
        return Promise.reject(new ApiError("CAPTCHA_MISSING", "验证码未加载，请刷新"));
      }
      return loginAdmin({ ...values, captchaId });
    },
    onSuccess: (data) => {
      setSession({ token: data.token, account: data.account });
      if (data.account.passwordChangeRequired) {
        router.replace(ROUTES.CHANGE_PASSWORD);
        return;
      }
      router.replace(getAuthenticatedRedirectPath(searchParams.get("redirect")));
    },
    onError: (error) => {
      setSubmitError(error instanceof ApiError ? error.message : "登录失败，请稍后重试");
      form.setValue("captchaCode", "");
      form.setValue("password", "");
      void captchaQuery.refetch();
    },
  });

  return (
    <form
      className="mt-8 space-y-4"
      onSubmit={form.handleSubmit((values) => {
        setSubmitError(null);
        loginMutation.mutate(values);
      })}
    >
      <div className="space-y-2">
        <Label htmlFor="username">管理员账号</Label>
        <Input
          autoComplete="username"
          id="username"
          placeholder="请输入管理员账号"
          {...form.register("username")}
        />
        {form.formState.errors.username ? (
          <p className="text-sm text-destructive">
            {form.formState.errors.username.message}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">密码</Label>
        <Input
          autoComplete="current-password"
          id="password"
          placeholder="请输入密码"
          type="password"
          {...form.register("password")}
        />
        {form.formState.errors.password ? (
          <p className="text-sm text-destructive">
            {form.formState.errors.password.message}
          </p>
        ) : null}
      </div>

      <CaptchaField
        error={form.formState.errors.captchaCode?.message}
        value={form.watch("captchaCode")}
        onChange={(value) => form.setValue("captchaCode", value)}
      />

      {submitError ? (
        <p className="rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {submitError}
        </p>
      ) : null}

      <Button
        className="w-full"
        disabled={loginMutation.isPending || !captchaQuery.data}
        type="submit"
      >
        {loginMutation.isPending ? (
          <LoaderCircle className="animate-spin" />
        ) : null}
        登录
      </Button>
    </form>
  );
}
