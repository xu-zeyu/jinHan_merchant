import { FolderTree, Plus, Search } from "lucide-react";

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

const categories = [
  { id: "CAT-01", name: "猫粮", products: 45, revenue: "¥32,000", status: "活跃" },
  { id: "CAT-02", name: "狗粮", products: 38, revenue: "¥24,000", status: "活跃" },
  { id: "CAT-03", name: "宠物零食", products: 62, revenue: "¥15,000", status: "活跃" },
  { id: "CAT-04", name: "宠物用品", products: 28, revenue: "¥10,000", status: "活跃" },
  { id: "CAT-05", name: "宠物保健品", products: 15, revenue: "¥5,420", status: "活跃" },
  { id: "CAT-06", name: "宠物玩具", products: 34, revenue: "¥8,200", status: "活跃" },
  { id: "CAT-07", name: "猫砂", products: 12, revenue: "¥4,800", status: "活跃" },
  { id: "CAT-08", name: "宠物服饰", products: 8, revenue: "¥2,100", status: "待完善" },
];

export default function CategoriesViewPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">宠物分类</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            按宠物类型、功能需求和品牌结构组织类目
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          新增分类
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="relative flex-1 sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9" placeholder="搜索分类..." />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {categories.map((cat) => (
              <Card key={cat.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                      <FolderTree className="h-5 w-5 text-primary" />
                    </div>
                    <Badge variant={cat.status === "活跃" ? "success" : "secondary"}>
                      {cat.status}
                    </Badge>
                  </div>
                  <p className="mt-3 text-sm font-semibold">{cat.name}</p>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{cat.products} 件商品</span>
                    <span className="font-medium text-primary-700">{cat.revenue}</span>
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
