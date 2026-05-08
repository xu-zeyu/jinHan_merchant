export type OrderStatus = "已完成" | "已发货" | "待发货" | "待处理";

export type DeliveryType = "普通快递" | "同城急送" | "门店自提";

export interface OrderRecord {
  amount: string;
  customer: string;
  delivery: DeliveryType;
  id: string;
  items: number;
  time: string;
  status: OrderStatus;
}

export interface OrderStat {
  hint: string;
  label: string;
  value: string;
}
