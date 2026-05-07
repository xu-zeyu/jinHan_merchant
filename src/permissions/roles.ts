export type Role = "admin" | "operator" | "editor" | "customer_service";

export type Permission =
  | "products:read"
  | "products:write"
  | "products:delete"
  | "categories:read"
  | "categories:write"
  | "categories:delete"
  | "orders:read"
  | "orders:write"
  | "refunds:read"
  | "refunds:write"
  | "customers:read"
  | "customers:write"
  | "analytics:read"
  | "finance:read"
  | "finance:write"
  | "settings:read"
  | "settings:write"
  | "team:manage";

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  admin: [
    "products:read", "products:write", "products:delete",
    "categories:read", "categories:write", "categories:delete",
    "orders:read", "orders:write",
    "refunds:read", "refunds:write",
    "customers:read", "customers:write",
    "analytics:read",
    "finance:read", "finance:write",
    "settings:read", "settings:write",
    "team:manage",
  ],
  operator: [
    "products:read", "products:write",
    "categories:read", "categories:write",
    "orders:read", "orders:write",
    "refunds:read", "refunds:write",
    "customers:read",
    "analytics:read",
    "finance:read",
    "settings:read",
  ],
  editor: [
    "products:read", "products:write",
    "categories:read",
    "orders:read",
    "customers:read",
  ],
  customer_service: [
    "orders:read", "orders:write",
    "refunds:read", "refunds:write",
    "customers:read", "customers:write",
  ],
};
