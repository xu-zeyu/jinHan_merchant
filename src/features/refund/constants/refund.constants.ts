import type { RefundRecord, RefundStat } from "../types/refund.types";

export const refundStats: RefundStat[] = [
  { label: "全部售后", value: "24", hint: "近 7 日申请量平稳" },
  { label: "待审核", value: "5", hint: "2 单超 30 分钟未处理" },
  { label: "处理中", value: "8", hint: "客服已接管 3 单" },
  { label: "已完成", value: "11", hint: "自动退款命中率 68%" },
];

export const refunds: RefundRecord[] = [
  { id: "REF-001", orderId: "ORD-20240501", customer: "张女士", product: "皇家猫粮 2kg", amount: "¥328", reason: "商品破损", reviewedAt: "今天 10:58", status: "处理中" },
  { id: "REF-002", orderId: "ORD-20240503", customer: "王女士", product: "狗狗磨牙棒套装", amount: "¥89", reason: "不想要了", reviewedAt: "今天 11:26", status: "已完成" },
  { id: "REF-003", orderId: "ORD-20240504", customer: "赵先生", product: "猫砂 10L×2", amount: "¥156", reason: "发错货", reviewedAt: "今天 12:10", status: "待审核" },
  { id: "REF-004", orderId: "ORD-20240506", customer: "陈先生", product: "宠物营养膏", amount: "¥128", reason: "质量问题", reviewedAt: "今天 12:42", status: "处理中" },
  { id: "REF-005", orderId: "ORD-20240508", customer: "吴先生", product: "小型犬主粮", amount: "¥268", reason: "尺寸不符", reviewedAt: "今天 13:25", status: "已完成" },
  { id: "REF-006", orderId: "ORD-20240509", customer: "黄女士", product: "猫咪抓板", amount: "¥79", reason: "不想要了", reviewedAt: "今天 14:03", status: "待审核" },
  { id: "REF-007", orderId: "ORD-20240510", customer: "杨先生", product: "宠物智能饮水机", amount: "¥199", reason: "质量问题", reviewedAt: "今天 14:48", status: "处理中" },
  { id: "REF-008", orderId: "ORD-20240511", customer: "孙女士", product: "小型犬主粮", amount: "¥268", reason: "发错货", reviewedAt: "今天 15:22", status: "已完成" },
  { id: "REF-009", orderId: "ORD-20240512", customer: "郑先生", product: "宠物梳毛器", amount: "¥49", reason: "商品破损", reviewedAt: "今天 15:56", status: "处理中" },
];
