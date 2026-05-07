export const API_ENDPOINTS = {
  // Auth
  LOGIN: "/api/auth/login",
  LOGOUT: "/api/auth/logout",
  REGISTER: "/api/auth/register",
  REFRESH_TOKEN: "/api/auth/refresh",

  // Products
  PRODUCTS: "/api/products",
  PRODUCT_DETAIL: (id: string) => `/api/products/${id}`,

  // Categories
  CATEGORIES: "/api/categories",
  CATEGORY_DETAIL: (id: string) => `/api/categories/${id}`,

  // Orders
  ORDERS: "/api/orders",
  ORDER_DETAIL: (id: string) => `/api/orders/${id}`,

  // Refunds
  REFUNDS: "/api/refunds",
  REFUND_DETAIL: (id: string) => `/api/refunds/${id}`,

  // Customers
  CUSTOMERS: "/api/customers",
  CUSTOMER_DETAIL: (id: string) => `/api/customers/${id}`,

  // AI
  AI_GENERATE: "/api/ai/generate",

  // Analytics
  ANALYTICS: "/api/analytics",

  // Finance
  FINANCE_TRANSACTIONS: "/api/finance/transactions",
  FINANCE_SETTLEMENTS: "/api/finance/settlements",
} as const;
