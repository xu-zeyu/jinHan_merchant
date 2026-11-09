import type { ReactNode } from "react";
import { AlertCircle, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/cn";

type AsyncStateProps = {
  isLoading: boolean;
  isError: boolean;
  error?: unknown;
  isEmpty?: boolean;
  empty?: ReactNode;
  children: ReactNode;
  className?: string;
  onRetry?: () => void;
};

/** 列表/详情的 加载 / 错误 / 空态 统一处理 */
export function AsyncState({
  isLoading,
  isError,
  error,
  isEmpty,
  empty,
  children,
  className,
  onRetry,
}: AsyncStateProps) {
  if (isLoading) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-2xl border border-border/60 bg-card py-16",
          className
        )}
      >
        <LoaderCircle className="h-5 w-5 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    const message =
      error instanceof Error ? error.message : "加载失败，请稍后重试";
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center rounded-2xl border border-destructive/30 bg-destructive/5 py-12 text-center",
          className
        )}
      >
        <AlertCircle className="h-6 w-6 text-destructive" />
        <p className="mt-3 text-sm text-destructive">{message}</p>
        {onRetry ? (
          <Button className="mt-4" size="sm" variant="outline" onClick={onRetry}>重试</Button>
        ) : null}
      </div>
    );
  }

  if (isEmpty) {
    return <>{empty}</>;
  }

  return <>{children}</>;
}
