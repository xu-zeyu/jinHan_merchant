import type { ApiResult } from "@/types/api.types";

/**
 * 管理端 API 客户端。
 * 契约来源：Apifox 项目 9001157（PetTown 管理后台接口）。
 * 统一响应包络 Result<T> = { code, msg, data }，成功 code 为 "200"。
 * 通过 Next.js rewrites 将 /api/admin/* 反向代理到后端，避免跨域。
 */

const API_SUCCESS_CODE = "200";
const TOKEN_STORAGE_KEY = "jinhan-merchant-token";

export class ApiError extends Error {
  readonly code: string;

  constructor(code: string, message: string) {
    super(message);
    this.name = "ApiError";
    this.code = code;
  }
}

export function setAccessToken(token: string | null): void {
  if (typeof window === "undefined") return;
  if (token) {
    window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
  } else {
    window.localStorage.removeItem(TOKEN_STORAGE_KEY);
  }
}

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_STORAGE_KEY);
}

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  /** JSON 请求体；GET 时传 query */
  body?: unknown;
  query?: Record<string, string | number | boolean | undefined>;
  signal?: AbortSignal;
};

function buildUrl(path: string, query?: RequestOptions["query"]): string {
  if (!query) return path;
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== "") {
      search.set(key, String(value));
    }
  }
  const qs = search.toString();
  return qs ? `${path}?${qs}` : path;
}

/** 发起管理端请求并解包 Result<T>，失败抛出 ApiError */
export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const { method = "GET", body, query, signal } = options;

  const headers = new Headers({ Accept: "application/json" });
  const token = getAccessToken();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  let payload: string | undefined;
  if (body !== undefined) {
    headers.set("Content-Type", "application/json");
    payload = JSON.stringify(body);
  }

  const response = await fetch(buildUrl(path, query), {
    method,
    headers,
    body: payload,
    signal,
    credentials: "same-origin",
  });

  let result: ApiResult<T>;
  try {
    result = (await response.json()) as ApiResult<T>;
  } catch {
    throw new ApiError(
      String(response.status),
      response.ok ? "响应格式错误" : `请求失败（HTTP ${response.status}）`
    );
  }

  if (!response.ok || result.code !== API_SUCCESS_CODE) {
    throw new ApiError(
      result.code || String(response.status),
      result.msg || "请求失败"
    );
  }

  return result.data;
}
