"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ROUTES } from "@/constants/routes";
import { ApiError } from "@/services/api-client";

import { changePassword } from "../api/change-password";
import { NEW_PASSWORD_HINT } from "../constants/auth.constants";
import {
  changePasswordSchema,
  type ChangePasswordFormValues,
} from "../schemas/change-password.schema";
import { useAuthStore } from "../store/use-auth-store";

/** 修改本人密码（ADMIN-V1-08）。改密成功后旧 token 失效，回登录页重新登录。 */
export function ChangePasswordForm() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { oldPassword: "", newPassword: "", confirmPassword: "" },
  });

  const mutation = useMutation({
    mutationFn: (values: ChangePasswordFormValues) =>
      changePassword({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      }),
    onSuccess: () => {
      logout();
      router.replace(ROUTES.LOGIN);
    },
    onError: (error) => {
      setSubmitError(
        error instanceof ApiError ? error.message : "修改密码失败，请稍后重试"
      );
    },
  });

  return (
    <form
      className="mt-8 space-y-4"
      onSubmit={form.handleSubmit((values) => {
        setSubmitError(null);
        mutation.mutate(values);
      })}
    >
      <div className="space-y-2">
        <Label htmlFor="oldPassword">原密码</Label>
        <Input
          autoComplete="current-password"
          id="oldPassword"
          type="password"
          {...form.register("oldPassword")}
        />
        {form.formState.errors.oldPassword ? (
          <p className="text-sm text-destructive">
            {form.formState.errors.oldPassword.message}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="newPassword">新密码</Label>
        <Input
          autoComplete="new-password"
          id="newPassword"
          type="password"
          {...form.register("newPassword")}
        />
        <p className="text-xs text-muted-foreground">{NEW_PASSWORD_HINT}</p>
        {form.formState.errors.newPassword ? (
          <p className="text-sm text-destructive">
            {form.formState.errors.newPassword.message}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">确认新密码</Label>
        <Input
          autoComplete="new-password"
          id="confirmPassword"
          type="password"
          {...form.register("confirmPassword")}
        />
        {form.formState.errors.confirmPassword ? (
          <p className="text-sm text-destructive">
            {form.formState.errors.confirmPassword.message}
          </p>
        ) : null}
      </div>

      {submitError ? (
        <p className="rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {submitError}
        </p>
      ) : null}

      <Button className="w-full" disabled={mutation.isPending} type="submit">
        {mutation.isPending ? <LoaderCircle className="animate-spin" /> : null}
        确认修改
      </Button>
    </form>
  );
}
