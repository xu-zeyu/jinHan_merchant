"use client";

import { RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

import { toCaptchaImageSrc, useCaptcha } from "../hooks/use-captcha";

type CaptchaFieldProps = {
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

/** 登录图形验证码：图片 + 输入 + 刷新（ADMIN-V1-01） */
export function CaptchaField({ value, onChange, error }: CaptchaFieldProps) {
  const { data, isLoading, isFetching, refetch } = useCaptcha();

  return (
    <div className="space-y-2">
      <Label htmlFor="captchaCode">图形验证码</Label>
      <div className="flex gap-2">
        <Input
          autoComplete="off"
          className="flex-1"
          id="captchaCode"
          maxLength={8}
          placeholder="请输入验证码"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
        <div className="h-10 w-28 shrink-0 overflow-hidden rounded-xl border border-border bg-muted/40">
          {isLoading || !data ? (
            <Skeleton className="h-full w-full rounded-none" />
          ) : (
            // 验证码为后端 Base64 data URI，next/image 不适用
            // eslint-disable-next-line @next/next/no-img-element
            <img
              alt="图形验证码"
              className="h-full w-full cursor-pointer object-cover"
              src={toCaptchaImageSrc(data.imageBase64)}
              onClick={() => {
                onChange("");
                void refetch();
              }}
            />
          )}
        </div>
        <Button
          aria-label="刷新验证码"
          disabled={isFetching}
          size="icon"
          type="button"
          variant="outline"
          onClick={() => {
            onChange("");
            void refetch();
          }}
        >
          <RefreshCw className={isFetching ? "animate-spin" : undefined} />
        </Button>
      </div>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
}
