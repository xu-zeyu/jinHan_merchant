"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Ban,
  Cake,
  PawPrint,
  ShieldCheck,
  Weight,
} from "lucide-react";
import Link from "next/link";

import { AsyncState } from "@/components/common/async-state";
import { EmptyState } from "@/components/common/empty-state";
import { ListShell } from "@/components/common/list-pagination";
import { PageHeader } from "@/components/common/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";
import { useHasPermission } from "@/features/auth/hooks/use-permission";
import { useToast } from "@/hooks/use-toast";
import { PERMISSION_CODES } from "@/permissions/permission-codes";

import {
  GENDER_LABELS,
  USER_STATUS,
  USER_STATUS_LABELS,
} from "../constants/user.constants";
import {
  useUser,
  useUserPets,
  useUserStatusMutation,
} from "../hooks/use-users";

function formatDate(value: string | null) {
  return value ? value.replace("T", " ").slice(0, 16) : "-";
}

type UserDetailProps = {
  userId: string;
};

/** C 端用户详情 + 宠物数据（ADMIN-V1-12 / ADMIN-V1-13） */
export function UserDetailView({ userId }: UserDetailProps) {
  const { toast } = useToast();
  const canStatus = useHasPermission(PERMISSION_CODES.USER_STATUS);
  const userQuery = useUser(userId);
  const petsQuery = useUserPets(userId);
  const statusMutation = useUserStatusMutation();
  const [toggling, setToggling] = useState(false);

  const user = userQuery.data;
  const banned = user?.status === USER_STATUS.BANNED;

  const toggleStatus = () => {
    if (!user) return;
    const tip = banned
      ? `确认解封用户 ${user.phone}？`
      : `确认封禁用户 ${user.phone}？封禁后其小程序会话立即失效且无法登录。`;
    if (!window.confirm(tip)) return;

    setToggling(true);
    statusMutation.mutate(
      {
        id: user.id,
        status: banned ? USER_STATUS.ACTIVE : USER_STATUS.BANNED,
      },
      {
        onSuccess: () => {
          toast({ title: banned ? "已解封" : "已封禁" });
          void userQuery.refetch();
        },
        onError: (err) =>
          toast({
            title: "操作失败",
            description: err instanceof Error ? err.message : undefined,
          }),
        onSettled: () => setToggling(false),
      }
    );
  };

  return (
    <>
      <PageHeader
        action={
          <Button asChild variant="outline">
            <Link href={ROUTES.USERS}>
              <ArrowLeft /> 返回列表
            </Link>
          </Button>
        }
        description="用户资料与宠物档案。"
        title="用户详情"
      />

      <AsyncState
        onRetry={() => void userQuery.refetch()}
        error={userQuery.error}
        isError={userQuery.isError}
        isLoading={userQuery.isLoading}
      >
        {user ? (
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle className="text-base">基础资料</CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant={banned ? "destructive" : "default"}>
                  {USER_STATUS_LABELS[user.status] ?? user.status}
                </Badge>
                <Button
                  disabled={!canStatus || toggling}
                  size="sm"
                  variant={banned ? "outline" : "destructive"}
                  onClick={toggleStatus}
                >
                  {banned ? <ShieldCheck /> : <Ban />}
                  {banned ? "解封" : "封禁"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <dl className="grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-xs text-muted-foreground">手机号</dt>
                  <dd className="mt-1 text-sm font-medium">{user.phone}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">注册来源</dt>
                  <dd className="mt-1 text-sm font-medium">{user.source}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">注册时间</dt>
                  <dd className="mt-1 text-sm font-medium">
                    {formatDate(user.createdAt)}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">用户 ID</dt>
                  <dd className="mt-1 text-sm font-medium">{user.id}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        ) : null}
      </AsyncState>

      <section className="mt-2">
        <div className="mb-3 flex items-center gap-2">
          <PawPrint className="h-4 w-4 text-brand-strong" />
          <h2 className="text-lg font-semibold">
            宠物数据
            {petsQuery.data ? (
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                共 {petsQuery.data.petCount} 只
              </span>
            ) : null}
          </h2>
        </div>

        <AsyncState
          onRetry={() => void petsQuery.refetch()}
          error={petsQuery.error}
          isEmpty={
            !petsQuery.isLoading && (petsQuery.data?.pets.length ?? 0) === 0
          }
          isError={petsQuery.isError}
          isLoading={petsQuery.isLoading}
          empty={
            <EmptyState description="该用户尚未创建宠物档案" title="暂无宠物" />
          }
        >
          <ListShell>
            {(petsQuery.data?.pets ?? []).map((pet) => (
              <div key={pet.id} className="flex flex-wrap items-center gap-4 px-5 py-4">
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-primary/10">
                  {pet.avatarUrl ? (
                    // 宠物头像为第三方 URL 缩略图
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      alt={pet.name}
                      className="h-full w-full object-cover"
                      src={pet.avatarUrl}
                    />
                  ) : (
                    <PawPrint className="h-5 w-5 text-brand-strong" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold">{pet.name}</p>
                    <Badge variant="outline">{pet.species}</Badge>
                    {pet.breed ? (
                      <Badge variant="secondary">{pet.breed}</Badge>
                    ) : null}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {GENDER_LABELS[pet.gender] ?? pet.gender}
                    {pet.birthDate ? ` · 生日 ${pet.birthDate}` : ""}
                    {pet.sterilized ? " · 已绝育" : ""}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  {pet.weightKg !== null ? (
                    <span className="inline-flex items-center gap-1">
                      <Weight className="h-3.5 w-3.5" />
                      {pet.weightKg} kg
                    </span>
                  ) : null}
                  <span className="inline-flex items-center gap-1">
                    <Cake className="h-3.5 w-3.5" />
                    {formatDate(pet.createdTime)}
                  </span>
                </div>
              </div>
            ))}
          </ListShell>
        </AsyncState>
      </section>
    </>
  );
}
