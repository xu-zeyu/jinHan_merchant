import { CreditCard, Package, TrendingUp, Users } from "lucide-react";

import { PageHeader } from "@/components/common/page-header";

const metrics = [
  { label: "今日销售额", value: "¥12,480", detail: "较昨日 +18%", icon: TrendingUp },
  { label: "在售商品", value: "128", detail: "6 个待优化", icon: Package },
  { label: "待处理订单", value: "36", detail: "8 单需尽快发货", icon: CreditCard },
  { label: "活跃会员", value: "2,486", detail: "本周新增 132", icon: Users },
];

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        description="聚焦店铺健康度、销售转化和待办事项，优先处理最影响经营结果的动作。"
        title="商家工作台"
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map(({ label, value, detail, icon: Icon }) => (
          <article
            key={label}
            className="rounded-3xl border border-white/80 bg-white/90 p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-slate-500">{label}</p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
                  {value}
                </p>
              </div>
              <div className="rounded-2xl bg-primary-50 p-3 text-primary-700">
                <Icon className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-500">{detail}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <article className="rounded-3xl border border-white/80 bg-white/90 p-6 shadow-sm">
          <p className="text-lg font-semibold text-slate-900">今日经营重点</p>
          <div className="mt-5 grid gap-3">
            {[
              "检查高销量猫粮库存，避免爆款断货。",
              "优先处理超过 24 小时未发货订单。",
              "更新宠物零食专题页，准备周末活动。",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl bg-primary-50/70 px-4 py-3 text-sm text-slate-600"
              >
                {item}
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-3xl border border-white/80 bg-slate-900 p-6 text-white shadow-sm">
          <p className="text-lg font-semibold">增长提示</p>
          <p className="mt-3 text-sm leading-7 text-white/70">
            小型犬主粮近 7 天点击增长明显，可以优先补充短视频素材和商品卖点文案。
          </p>
          <div className="mt-6 rounded-2xl bg-white/10 p-4">
            <p className="text-sm text-white/70">推荐动作</p>
            <p className="mt-2 text-xl font-semibold">上新 3 款高毛利零食组合</p>
          </div>
        </article>
      </section>
    </>
  );
}
