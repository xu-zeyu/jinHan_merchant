export type FinanceTransactionStatus = "已到账" | "已退款" | "已扣除" | "处理中";

export type FinanceTransactionType = "销售收入" | "退款支出" | "平台佣金" | "提现";

export interface FinanceTransactionRecord {
  amount: string;
  id: string;
  status: FinanceTransactionStatus;
  time: string;
  type: FinanceTransactionType;
}

export interface FinanceStat {
  hint: string;
  label: string;
  value: string;
}
