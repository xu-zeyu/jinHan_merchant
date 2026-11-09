"use client";

import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { usePermissionCatalog } from "../hooks/use-roles";
import type { AdminRole } from "../types/role.types";

type RolePermissionsDialogProps = {
  role: AdminRole | null;
  selected: string[];
  selectedLoading: boolean;
  selectedError: boolean;
  submitting: boolean;
  errorMessage: string | null;
  onClose: () => void;
  onConfirm: (permissions: string[]) => void;
};

/** 角色权限分配（ADMIN-V1-10）：提交的权限码必须存在于权限目录 */
export function RolePermissionsDialog({
  role,
  selected,
  selectedLoading,
  selectedError,
  submitting,
  errorMessage,
  onClose,
  onConfirm,
}: RolePermissionsDialogProps) {
  const { data: catalog, isLoading, isError } = usePermissionCatalog();
  const [checked, setChecked] = useState<Set<string>>(new Set());

  useEffect(() => {
    setChecked(new Set(selected));
  }, [selected, role]);

  const grouped = useMemo(() => catalog ?? [], [catalog]);

  const toggle = (code: string, next: boolean) => {
    setChecked((prev) => {
      const copy = new Set(prev);
      if (next) copy.add(code);
      else copy.delete(code);
      return copy;
    });
  };

  return (
    <Dialog
      open={role !== null}
      onOpenChange={(next) => (next ? null : onClose())}
    >
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>分配权限 · {role?.name}</DialogTitle>
          <DialogDescription>
            权限变更即时生效；仅可选择权限目录中存在的编码（ADMIN-V1-10）
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-80 space-y-2 overflow-y-auto rounded-xl border border-border/60 p-3">
          {isLoading || selectedLoading ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              加载权限…
            </p>
          ) : isError || selectedError ? (
            <p className="py-6 text-center text-sm text-destructive">
              权限加载失败，请关闭后重试。
            </p>
          ) : (
            grouped.map((permission) => (
              <label
                key={permission.code}
                className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-muted/50"
              >
                <Checkbox
                  checked={checked.has(permission.code)}
                  onCheckedChange={(next) =>
                    toggle(permission.code, next === true)
                  }
                />
                <span className="flex-1 text-sm">{permission.name}</span>
                <code className="text-xs text-muted-foreground">
                  {permission.code}
                </code>
              </label>
            ))
          )}
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
          <Button
            disabled={submitting || isLoading || selectedLoading || isError || selectedError}
            onClick={() => onConfirm(Array.from(checked))}
          >
            保存分配
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
