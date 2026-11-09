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
import { Switch } from "@/components/ui/switch";

import {
  roleFormSchema,
  type CreateRoleFormValues,
  type RoleFormValues,
  type UpdateRoleFormValues,
} from "../schemas/role.schema";
import type { AdminRole } from "../types/role.types";

type RoleFormDialogProps = {
  open: boolean;
  role: AdminRole | null;
  submitting: boolean;
  errorMessage: string | null;
  onClose: () => void;
  onCreate: (values: CreateRoleFormValues) => void;
  onUpdate: (values: UpdateRoleFormValues) => void;
};

/** 创建/编辑角色（ADMIN-V1-09） */
export function RoleFormDialog({
  open,
  role,
  submitting,
  errorMessage,
  onClose,
  onCreate,
  onUpdate,
}: RoleFormDialogProps) {
  const isEdit = role !== null;

  const form = useForm<RoleFormValues>({
    resolver: zodResolver(roleFormSchema),
    defaultValues: { code: "", name: "", description: "", enabled: true },
  });

  useEffect(() => {
    if (!open) return;
    form.reset(
      isEdit
        ? {
            code: role.code,
            name: role.name,
            description: role.description,
            enabled: role.enabled,
          }
        : { code: "", name: "", description: "", enabled: true }
    );
  }, [open, isEdit, role, form]);

  return (
    <Dialog open={open} onOpenChange={(next) => (next ? null : onClose())}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEdit ? "编辑角色" : "创建角色"}</DialogTitle>
          <DialogDescription>
            角色编码创建后不可修改；被账号引用的角色无法删除（ADMIN-V1-09）
          </DialogDescription>
        </DialogHeader>

        <form
          className="space-y-4"
          onSubmit={form.handleSubmit((values) => {
            if (isEdit) {
              onUpdate({
                name: values.name,
                description: values.description || undefined,
                enabled: values.enabled,
              });
              return;
            }
            onCreate({
              code: values.code,
              name: values.name,
              description: values.description || undefined,
            });
          })}
        >
          <div className="space-y-2">
            <Label htmlFor="role-code">角色编码</Label>
            <Input
              autoComplete="off"
              disabled={isEdit}
              id="role-code"
              placeholder="3-50 位小写字母、数字或下划线"
              {...form.register("code")}
            />
            {form.formState.errors.code ? (
              <p className="text-sm text-destructive">
                {form.formState.errors.code.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="role-name">角色名称</Label>
            <Input
              id="role-name"
              placeholder="请输入角色名称"
              {...form.register("name")}
            />
            {form.formState.errors.name ? (
              <p className="text-sm text-destructive">
                {form.formState.errors.name.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="role-description">角色说明（可选）</Label>
            <Input
              id="role-description"
              placeholder="最多 500 字"
              {...form.register("description")}
            />
          </div>

          {isEdit ? (
            <div className="flex items-center justify-between rounded-xl border border-border/60 px-4 py-3">
              <div>
                <p className="text-sm font-medium">启用角色</p>
                <p className="text-xs text-muted-foreground">
                  禁用后该角色权限对后续请求立即失效
                </p>
              </div>
              <Switch
                checked={form.watch("enabled")}
                onCheckedChange={(checked) =>
                  form.setValue("enabled", checked)
                }
              />
            </div>
          ) : null}

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
