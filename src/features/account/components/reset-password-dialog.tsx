"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "../schemas/account.schema";
import type { AdminAccount } from "../types/account.types";

type ResetPasswordDialogProps = {
  account: AdminAccount | null;
  submitting: boolean;
  errorMessage: string | null;
  onClose: () => void;
  onConfirm: (values: ResetPasswordFormValues) => void;
};

/** 重置管理员密码（ADMIN-V1-08）：重置后目标账号下次登录须改密 */
export function ResetPasswordDialog({
  account,
  submitting,
  errorMessage,
  onClose,
  onConfirm,
}: ResetPasswordDialogProps) {
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "" },
  });

  return (
    <Dialog
      open={account !== null}
      onOpenChange={(next) => (next ? null : onClose())}
    >
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>重置密码</DialogTitle>
          <DialogDescription>
            为「{account?.displayName ?? account?.username}
            」设置新密码；确认后该账号所有会话失效，下次登录须修改密码。
          </DialogDescription>
        </DialogHeader>

        <form
          className="space-y-4"
          onSubmit={form.handleSubmit((values) => onConfirm(values))}
        >
          <div className="space-y-2">
            <Label htmlFor="reset-password">新密码</Label>
            <Input
              autoComplete="new-password"
              id="reset-password"
              placeholder="8-64 位，至少含字母和数字"
              type="password"
              {...form.register("password")}
            />
            {form.formState.errors.password ? (
              <p className="text-sm text-destructive">
                {form.formState.errors.password.message}
              </p>
            ) : null}
          </div>

          {errorMessage ? (
            <p className="rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {errorMessage}
            </p>
          ) : null}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              取消
            </Button>
            <Button disabled={submitting} type="submit">
              确认重置
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
