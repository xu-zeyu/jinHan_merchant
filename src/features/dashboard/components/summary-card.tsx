import Link from "next/link";
import { ArrowUpRight, type LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

type SummaryCardProps = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  count?: number;
  loading: boolean;
  error: boolean;
};

export function SummaryCard({ title, description, href, icon: Icon, count, loading, error }: SummaryCardProps) {
  return (
    <Link className="group block" href={href}>
      <Card className="glass-highlight h-full transition-transform duration-200 hover:-translate-y-1">
        <CardContent className="p-5 sm:p-6">
          <div className="flex items-start justify-between">
            <div className="glass-soft flex h-10 w-10 items-center justify-center rounded-2xl text-brand-strong">
              <Icon className="h-5 w-5" />
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
          <p className="mt-5 text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-1 text-3xl font-semibold tracking-tight tabular-nums">
            {loading ? "…" : error ? "—" : count ?? "—"}
          </p>
          <p className="mt-3 border-t border-white/50 pt-3 text-xs text-muted-foreground dark:border-white/10">{error ? "数据暂不可用，点击查看详情" : description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
