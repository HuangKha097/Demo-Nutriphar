import type { PaginationParams } from "@/types";

export const queryKeys = {
  products: {
    all: ["products"] as const,
    list: (params?: PaginationParams) => ["products", "list", params] as const,
    detail: (id: string) => ["products", "detail", id] as const,
  },
  categories: {
    all: ["categories"] as const,
    list: (params?: PaginationParams) => ["categories", "list", params] as const,
    simple: () => ["categories", "simple"] as const,
    detail: (id: string) => ["categories", "detail", id] as const,
  },
  news: {
    all: ["news"] as const,
    list: (params?: PaginationParams) => ["news", "list", params] as const,
    detail: (id: string) => ["news", "detail", id] as const,
  },
  users: {
    all: ["users"] as const,
    list: (params?: PaginationParams) => ["users", "list", params] as const,
    detail: (id: string) => ["users", "detail", id] as const,
  },
  roles: {
    all: ["roles"] as const,
    list: (params?: PaginationParams) => ["roles", "list", params] as const,
    detail: (id: string) => ["roles", "detail", id] as const,
  },
};
