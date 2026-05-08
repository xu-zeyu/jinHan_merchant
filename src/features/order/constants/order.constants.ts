import type { OrderRecord, OrderStat } from "../types/order.types";

export const orderStats: OrderStat[] = [
  { label: "全部订单", value: "128", hint: "较昨日 +8 笔" },
  { label: "待发货", value: "36", hint: "10 笔临近超时" },
  { label: "已发货", value: "52", hint: "同城配占 28%" },
  { label: "已完成", value: "40", hint: "签收率 96.2%" },
];

export const orders: OrderRecord[] = [
  { id: "ORD-20240501", customer: "张女士", items: 3, amount: "¥328", time: "今天 10:32", delivery: "普通快递", status: "已发货" },
  { id: "ORD-20240502", customer: "李先生", items: 1, amount: "¥199", time: "今天 11:15", delivery: "同城急送", status: "待发货" },
  { id: "ORD-20240503", customer: "王女士", items: 2, amount: "¥89", time: "今天 12:08", delivery: "门店自提", status: "已完成" },
  { id: "ORD-20240504", customer: "赵先生", items: 1, amount: "¥156", time: "今天 13:45", delivery: "普通快递", status: "待发货" },
  { id: "ORD-20240505", customer: "刘女士", items: 4, amount: "¥128", time: "今天 14:20", delivery: "普通快递", status: "已发货" },
  { id: "ORD-20240506", customer: "陈先生", items: 2, amount: "¥456", time: "今天 15:00", delivery: "同城急送", status: "待处理" },
  { id: "ORD-20240507", customer: "周女士", items: 1, amount: "¥268", time: "今天 15:35", delivery: "门店自提", status: "已完成" },
  { id: "ORD-20240508", customer: "吴先生", items: 3, amount: "¥512", time: "今天 16:10", delivery: "普通快递", status: "已发货" },
  { id: "ORD-20240509", customer: "黄女士", items: 2, amount: "¥148", time: "今天 16:48", delivery: "同城急送", status: "待发货" },
  { id: "ORD-20240510", customer: "杨先生", items: 5, amount: "¥628", time: "今天 17:12", delivery: "普通快递", status: "待处理" },
  { id: "ORD-20240511", customer: "孙女士", items: 2, amount: "¥184", time: "今天 18:04", delivery: "门店自提", status: "已完成" },
  { id: "ORD-20240512", customer: "郑先生", items: 1, amount: "¥72", time: "今天 18:36", delivery: "普通快递", status: "已发货" },
];
