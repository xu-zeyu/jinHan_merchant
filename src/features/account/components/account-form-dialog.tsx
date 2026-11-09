"use client";

import { useEffect } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRoleOptions } from "@/features/role/hooks/use-roles";
import { useHasPermission } from "@/features/auth/hooks/use-permission";
import { useAuthStore } from "@/features/auth/store/use-auth-store";
import { PERMISSION_CODES } from "@/permissions/permission-codes";

import {
  createAccountSchema,
  updateAccountSchema,
  type CreateAccountFormValues,
  type UpdateAccountFormValues,
} from "../schemas/account.schema";
import type { AdminAccount } from "../types/account.types";

const NO_ROLE = "none";

type AccountFormDialogProps = {
  open: boolean;
  account: AdminAccount | null;
  submitting: boolean;
  errorMessage: string | null;
  onClose: () => void;
  onCreate: (values: CreateAccountFormValues) => void;
  onUpdate: (values: UpdateAccountFormValues) => void;
};

/** 创建/编辑管理员账号（ADMIN-V1-05 / ADMIN-V1-06） */
export function AccountFormDialog({
  open,
  account,
  submitting,
  errorMessage,
  onClose,
  onCreate,
  onUpdate,
}: AccountFormDialogProps) {
  const isEdit = account !== null;
  const currentAccountId = useAuthStore((state) => state.account?.id);
  const canAssignRole = useHasPermission(PERMISSION_CODES.ACCOUNT_ASSIGN_ROLE);
  const canEditRole = canAssignRole && (!isEdit || account?.id !== currentAccountId) && !account?.superAdmin;
  const { data: roleOptions } = useRoleOptions(open && canEditRole);

  const form = useForm<CreateAccountFormValues>({
    resolver: zodResolver(isEdit ? updateAccountSchema : createAccountSchema),
    defaultValues: {
      username: "",
      displayName: "",
      password: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (!open) return;
    form.reset(
      isEdit
        ? {
            username: account.username,
            displayName: account.displayName,
            password: "",
            phone: account.phone ?? "",
            roleId: account.roleId ?? undefined,
          }
        : { username: "", displayName: "", password: "", phone: "" }
    );
  }, [open, isEdit, account, form]);

  const handleSubmit = form.handleSubmit((values) => {
    const payload = {
      displayName: values.displayName,
      phone: values.phone || undefined,
      ...(canEditRole && values.roleId !== undefined && values.roleId !== account?.roleId
        ? { roleId: values.roleId }
        : {}),
    };
    if (isEdit) {
      onUpdate(payload);
      return;
    }
    onCreate({
      username: values.username,
      displayName: values.displayName,
      password: values.password,
      phone: values.phone || undefined,
      roleId: canEditRole ? values.roleId : undefined,
    });
  });

  return (
    <Dialog open={open} onOpenChange={(next) => (next ? null : onClose())}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEdit ? "编辑管理员" : "创建管理员"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "修改显示名、手机号或分配角色（ADMIN-V1-06）"
              : "创建后首次登录将被强制修改初始密码（ADMIN-V1-05）"}
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="username">用户名</Label>
            <Input
              autoComplete="off"
              disabled={isEdit}
              id="username"
              placeholder="4-50 位字母或数字"
              {...form.register("username")}
            />
            {form.formState.errors.username ? (
              <p className="text-sm text-destructive">
                {form.formState.errors.username.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="displayName">显示名</Label>
            <Input
              id="displayName"
              placeholder="请输入显示名"
              {...form.register("displayName")}
            />
            {form.formState.errors.displayName ? (
              <p className="text-sm text-destructive">
                {form.formState.errors.displayName.message}
              </p>
            ) : null}
          </div>

          {!isEdit ? (
            <div className="space-y-2">
              <Label htmlFor="password">初始密码</Label>
              <Input
                autoComplete="new-password"
                id="password"
                placeholder="8-72 位，含字母、数字和符号"
                type="password"
                {...form.register("password")}
              />
              {form.formState.errors.password ? (
                <p className="text-sm text-destructive">
                  {form.formState.errors.password.message}
                </p>
              ) : null}
            </div>
          ) : null}

          <div className="space-y-2">
            <Label htmlFor="phone">手机号（可选）</Label>
            <Input
              id="phone"
              placeholder="11 位手机号"
              {...form.register("phone")}
            />
            {form.formState.errors.phone ? (
              <p className="text-sm text-destructive">
                {form.formState.errors.phone.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label>角色</Label>
            <Select
              disabled={!canEditRole}
              value={form.watch("roleId") !== undefined ? String(form.watch("roleId")) : NO_ROLE}
              onValueChange={(value) =>
                form.setValue(
                  "roleId",
                  value === NO_ROLE ? undefined : Number(value)
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="选择角色（可选）" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={NO_ROLE}>{isEdit ? "保持当前角色" : "不分配角色"}</SelectItem>
                {(roleOptions ?? []).map((option) => (
                  <SelectItem key={option.value} value={String(option.value)}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {!canEditRole && isEdit ? (
              <p className="text-xs text-muted-foreground">当前账号或超级管理员的角色不能在此修改。</p>
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
              {isEdit ? "保存" : "创建"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
