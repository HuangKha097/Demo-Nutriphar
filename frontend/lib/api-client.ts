import { getCookie } from "cookies-next";
import { API_BASE_URL } from "@/services/api";

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined | null>;
}

export async function apiClient<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  // Common token keys for the app
  const token = getCookie("auth-token") || getCookie("cms-auth-uid");

  const headers = new Headers(options.headers);
  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  // Build URL with query params
  const url = new URL(`${API_BASE_URL}${endpoint}`);
  if (options.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  const response = await fetch(url.toString(), {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API Error: ${response.status}`);
  }

  // Handle empty responses
  const text = await response.text();
  return text ? JSON.parse(text) : ({} as T);
}

// Convenience methods
apiClient.get = <T>(endpoint: string, params?: FetchOptions["params"], options?: RequestInit) =>
  apiClient<T>(endpoint, { method: "GET", params, ...options });

apiClient.post = <T>(endpoint: string, body?: any, options?: RequestInit) =>
  apiClient<T>(endpoint, { method: "POST", body: body ? JSON.stringify(body) : undefined, ...options });

apiClient.put = <T>(endpoint: string, body?: any, options?: RequestInit) =>
  apiClient<T>(endpoint, { method: "PUT", body: body ? JSON.stringify(body) : undefined, ...options });

apiClient.patch = <T>(endpoint: string, body?: any, options?: RequestInit) =>
  apiClient<T>(endpoint, { method: "PATCH", body: body ? JSON.stringify(body) : undefined, ...options });

apiClient.delete = <T>(endpoint: string, options?: RequestInit) =>
  apiClient<T>(endpoint, { method: "DELETE", ...options });
