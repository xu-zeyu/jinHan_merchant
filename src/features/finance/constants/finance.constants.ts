import type {
  FinanceStat,
  FinanceTransactionRecord,
} from "../types/finance.types";

export const financeStats: FinanceStat[] = [
  { label: "账户余额", value: "¥48,320", hint: "可提现金额" },
  { label: "本月收入", value: "¥86,420", hint: "较上月 +12.5%" },
  { label: "本月支出", value: "¥12,680", hint: "含退款与佣金" },
  { label: "净利润", value: "¥73,740", hint: "利润率 85.3%" },
];

export const transactions: FinanceTransactionRecord[] = [
  { id: "TXN-001", type: "销售收入", amount: "+¥12,480", time: "2024-05-07 09:12", status: "已到账" },
  { id: "TXN-002", type: "退款支出", amount: "-¥328", time: "2024-05-07 10:08", status: "已退款" },
  { id: "TXN-003", type: "平台佣金", amount: "-¥624", time: "2024-05-06 12:22", status: "已扣除" },
  { id: "TXN-004", type: "销售收入", amount: "+¥10,500", time: "2024-05-06 14:30", status: "已到账" },
  { id: "TXN-005", type: "提现", amount: "-¥5,000", time: "2024-05-05 11:45", status: "处理中" },
  { id: "TXN-006", type: "销售收入", amount: "+¥11,200", time: "2024-05-05 15:16", status: "已到账" },
  { id: "TXN-007", type: "退款支出", amount: "-¥156", time: "2024-05-04 13:08", status: "已退款" },
  { id: "TXN-008", type: "销售收入", amount: "+¥7,800", time: "2024-05-04 17:54", status: "已到账" },
  { id: "TXN-009", type: "平台佣金", amount: "-¥540", time: "2024-05-03 10:18", status: "已扣除" },
  { id: "TXN-010", type: "销售收入", amount: "+¥9,600", time: "2024-05-03 18:36", status: "已到账" },
];
