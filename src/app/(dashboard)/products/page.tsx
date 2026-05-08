import { Edit, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react";

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const products = [
  { id: "P001", name: "皇家猫粮 2kg", category: "猫粮", price: "¥328", stock: 156, status: "在售" },
  { id: "P002", name: "宠物智能饮水机", category: "用品", price: "¥199", stock: 42, status: "在售" },
  { id: "P003", name: "狗狗磨牙棒套装", category: "零食", price: "¥89", stock: 230, status: "在售" },
  { id: "P004", name: "猫砂 10L×2", category: "猫砂", price: "¥156", stock: 88, status: "在售" },
  { id: "P005", name: "宠物营养膏", category: "保健品", price: "¥128", stock: 0, status: "缺货" },
  { id: "P006", name: "小型犬主粮 1.5kg", category: "狗粮", price: "¥268", stock: 64, status: "在售" },
  { id: "P007", name: "宠物梳毛器", category: "用品", price: "¥49", stock: 312, status: "在售" },
  { id: "P008", name: "猫咪抓板", category: "玩具", price: "¥79", stock: 178, status: "在售" },
];

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">商品管理</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            管理商品卡片、售价、库存和营销素材
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          新增商品
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 items-center gap-3">
              <div className="relative flex-1 sm:max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input className="pl-9" placeholder="搜索商品名称..." />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="分类筛选" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部分类</SelectItem>
                  <SelectItem value="cat-food">猫粮</SelectItem>
                  <SelectItem value="dog-food">狗粮</SelectItem>
                  <SelectItem value="snacks">零食</SelectItem>
                  <SelectItem value="supplies">用品</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <span className="text-sm text-muted-foreground">
              共 {products.length} 件商品
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {products.map((product) => (
              <Card key={product.id} className="group">
                <CardContent className="p-4">
                  <div className="mb-3 flex h-32 items-center justify-center rounded-xl bg-muted">
                    <span className="text-3xl">📦</span>
                  </div>
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className="h-8 w-8 opacity-0 group-hover:opacity-100" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          编辑
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          删除
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-lg font-bold text-primary-700">{product.price}</span>
                    <Badge variant={product.status === "缺货" ? "destructive" : "success"}>
                      {product.status}
                    </Badge>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    库存: {product.stock} 件
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
