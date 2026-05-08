export type RefundStatus = "处理中" | "已完成" | "待审核";

export type RefundReason = "商品破损" | "不想要了" | "发错货" | "质量问题" | "尺寸不符";

export interface RefundRecord {
  amount: string;
  customer: string;
  id: string;
  orderId: string;
  product: string;
  reason: RefundReason;
  reviewedAt: string;
  status: RefundStatus;
}

export interface RefundStat {
  hint: string;
  label: string;
  value: string;
}
