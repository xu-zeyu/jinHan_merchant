import { Bell, Globe, Lock, Palette, Shield, Store, User } from "lucide-react";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Separator} from "@radix-ui/react-menu";
import {Switch} from "@/components/ui/switch";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";


export default function SettingsViewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">系统设置</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          集中管理店铺资料、团队权限和系统偏好
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <nav className="space-y-1">
          {[
            { icon: Store, label: "店铺信息", active: true },
            { icon: User, label: "团队管理" },
            { icon: Shield, label: "权限设置" },
            { icon: Bell, label: "通知偏好" },
            { icon: Palette, label: "外观设置" },
            { icon: Lock, label: "安全设置" },
          ].map(({ icon: Icon, label, active }) => (
            <Button
              key={label}
              className="w-full justify-start"
              variant={active ? "secondary" : "ghost"}
            >
              <Icon className="mr-2 h-4 w-4" />
              {label}
            </Button>
          ))}
        </nav>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>店铺信息</CardTitle>
              <CardDescription>管理您店铺的基本信息和品牌资料</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="store-name">店铺名称</Label>
                  <Input defaultValue="JinHan 宠物商城" id="store-name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="store-domain">店铺域名</Label>
                  <div className="flex">
                    <span className="flex items-center rounded-l-xl border border-r-0 border-border bg-muted px-3 text-sm text-muted-foreground">
                      jinhan.pet/
                    </span>
                    <Input className="rounded-l-none" defaultValue="store" id="store-domain" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">店铺简介</Label>
                <Input
                  defaultValue="专注宠物食品与用品，为爱宠提供优质生活"
                  id="description"
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>营业状态</Label>
                  <p className="text-xs text-muted-foreground">关闭后将暂停接受新订单</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>通知偏好</CardTitle>
              <CardDescription>选择您希望接收的通知类型</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "新订单通知", desc: "有新订单时发送通知" },
                { label: "退款申请通知", desc: "有退款申请时发送通知" },
                { label: "库存预警", desc: "商品库存低于阈值时提醒" },
                { label: "营销报告", desc: "每周发送营销数据报告" },
              ].map(({ label, desc }) => (
                <div key={label} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{label}</p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button variant="outline">取消</Button>
            <Button>保存设置</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
