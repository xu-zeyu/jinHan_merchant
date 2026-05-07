export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",

  // Products
  PRODUCTS: "/products",
  PRODUCTS_NEW: "/products/new",
  PRODUCTS_EDIT: (id: string) => `/products/${id}/edit`,

  // Categories
  CATEGORIES: "/categories",
  CATEGORIES_NEW: "/categories/new",
  CATEGORIES_EDIT: (id: string) => `/categories/${id}/edit`,

  // Orders
  ORDERS: "/orders",
  ORDERS_DETAIL: (id: string) => `/orders/${id}`,

  // Refunds
  REFUNDS: "/refunds",
  REFUNDS_DETAIL: (id: string) => `/refunds/${id}`,

  // Customers
  CUSTOMERS: "/customers",
  CUSTOMERS_DETAIL: (id: string) => `/customers/${id}`,

  // AI
  AI_PRODUCT_GENERATOR: "/ai/product-generator",
  AI_CONTENT_WRITER: "/ai/content-writer",

  // Analytics
  ANALYTICS: "/analytics",

  // Finance
  FINANCE: "/finance",
  FINANCE_TRANSACTIONS: "/finance/transactions",
  FINANCE_SETTLEMENTS: "/finance/settlements",

  // Settings
  SETTINGS: "/settings",
  SETTINGS_PROFILE: "/settings/profile",
  SETTINGS_STORE: "/settings/store",
  SETTINGS_TEAM: "/settings/team",
  SETTINGS_PERMISSIONS: "/settings/permissions",

  // Auth
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
} as const;
