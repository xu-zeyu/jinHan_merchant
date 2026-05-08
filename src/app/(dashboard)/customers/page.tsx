import { Mail, MessageCircle, MoreHorizontal, Search, Star } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const customers = [
  { id: "C001", name: "张女士", pets: "英短 ×1", orders: 12, spent: "¥3,280", level: "黄金会员", avatar: "张" },
  { id: "C002", name: "李先生", pets: "金毛 ×1", orders: 8, spent: "¥2,150", level: "白银会员", avatar: "李" },
  { id: "C003", name: "王女士", pets: "布偶 ×2", orders: 24, spent: "¥8,920", level: "钻石会员", avatar: "王" },
  { id: "C004", name: "赵先生", pets: "柯基 ×1", orders: 5, spent: "¥980", level: "普通会员", avatar: "赵" },
  { id: "C005", name: "刘女士", pets: "泰迪 ×1, 橘猫 ×1", orders: 16, spent: "¥5,640", level: "黄金会员", avatar: "刘" },
  { id: "C006", name: "陈先生", pets: "拉布拉多 ×1", orders: 3, spent: "¥560", level: "普通会员", avatar: "陈" },
];

const levelVariantMap: Record<string, "default" | "secondary" | "warning" | "success"> = {
  "钻石会员": "default",
  "黄金会员": "warning",
  "白银会员": "secondary",
  "普通会员": "secondary",
};

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">会员体系</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          围绕会员分层、复购行为和宠物画像做精细化运营
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "全部会员", value: "2,486" },
          { label: "钻石会员", value: "128" },
          { label: "黄金会员", value: "456" },
          { label: "本月新增", value: "132" },
        ].map(({ label, value }) => (
          <Card key={label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-2xl font-bold">{value}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-9" placeholder="搜索会员..." />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {customers.map((customer) => (
              <Card key={customer.id} className="group">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{customer.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold">{customer.name}</p>
                        <p className="text-xs text-muted-foreground">{customer.pets}</p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className="h-8 w-8 opacity-0 group-hover:opacity-100" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <MessageCircle className="mr-2 h-4 w-4" />
                          发送消息
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          发送邮件
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <Badge variant={levelVariantMap[customer.level]}>{customer.level}</Badge>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="h-3 w-3 fill-current" />
                      <span className="text-xs font-medium">{customer.orders} 单</span>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">累计消费</span>
                    <span className="font-semibold">{customer.spent}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
