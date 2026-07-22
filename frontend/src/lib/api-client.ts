/**
 * PixelForge API Client
 * Based on native-data-fetching best practices
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8000";

// Typed error class for API errors
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// Token management
const TOKENS_KEY = "pixelforge_tokens";

interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

let cachedTokens: AuthTokens | null | undefined;

export function getTokens(): AuthTokens | null {
  if (cachedTokens !== undefined) {
    return cachedTokens ?? null;
  }
  try {
    const stored = localStorage.getItem(TOKENS_KEY);
    cachedTokens = stored ? JSON.parse(stored) : null;
  } catch {
    cachedTokens = null;
    localStorage.removeItem(TOKENS_KEY);
  }
  return cachedTokens ?? null;
}

export function setTokens(tokens: AuthTokens | null) {
  cachedTokens = tokens;
  if (tokens) {
    localStorage.setItem(TOKENS_KEY, JSON.stringify(tokens));
  } else {
    localStorage.removeItem(TOKENS_KEY);
  }
}

export function clearTokens() {
  cachedTokens = null;
  localStorage.removeItem(TOKENS_KEY);
}

// Token refresh lock to prevent multiple simultaneous refreshes
let isRefreshing = false;
let refreshPromise: Promise<AuthTokens> | null = null;

async function refreshTokens(): Promise<AuthTokens> {
  const currentTokens = getTokens();
  if (!currentTokens) {
    throw new ApiError("No refresh token available", 401);
  }

  if (!isRefreshing) {
    isRefreshing = true;
    refreshPromise = fetch(`${API_URL}/api/v1/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: currentTokens.refresh_token }),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new ApiError("Token refresh failed", response.status);
        }
        const newTokens = await response.json();
        setTokens(newTokens);
        return newTokens;
      })
      .finally(() => {
        isRefreshing = false;
        refreshPromise = null;
      });
  }

  return refreshPromise!;
}

// Retry logic with exponential backoff
async function fetchWithRetry(
  url: string,
  options: RequestInit,
  retries = 2,
): Promise<Response> {
  for (let i = 0; i <= retries; i++) {
    try {
      const response = await fetch(url, options);

      // Don't retry on 4xx errors (client errors)
      if (response.status >= 400 && response.status < 500) {
        return response;
      }

      // Retry on 5xx errors (server errors)
      if (response.status >= 500 && i < retries) {
        await new Promise((r) => setTimeout(r, Math.pow(2, i) * 1000));
        continue;
      }

      return response;
    } catch (error) {
      if (i === retries) throw error;
      await new Promise((r) => setTimeout(r, Math.pow(2, i) * 1000));
    }
  }

  throw new Error("Max retries exceeded");
}

// Authenticated fetch wrapper with automatic token refresh
export async function authFetch(
  url: string,
  options: RequestInit = {},
): Promise<Response> {
  const tokens = getTokens();

  const headers = new Headers(options.headers);
  if (tokens?.access_token) {
    headers.set("Authorization", `Bearer ${tokens.access_token}`);
  }

  const response = await fetchWithRetry(`${API_URL}${url}`, {
    ...options,
    headers,
  });

  // Handle 401 - try to refresh token
  if (response.status === 401 && tokens?.refresh_token) {
    try {
      const newTokens = await refreshTokens();
      headers.set("Authorization", `Bearer ${newTokens.access_token}`);
      return fetchWithRetry(`${API_URL}${url}`, {
        ...options,
        headers,
      });
    } catch {
      clearTokens();
      throw new ApiError("Session expired", 401);
    }
  }

  return response;
}

// API client with typed methods
export const api = {
  // Auth endpoints
  auth: {
    login: async (username: string, password: string) => {
      const formData = new URLSearchParams();
      formData.append("username", username);
      formData.append("password", password);

      const response = await fetch(`${API_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new ApiError(error.detail || "Login failed", response.status);
      }

      const tokens = await response.json();
      setTokens(tokens);
      return tokens;
    },

    register: async (email: string, username: string, password: string) => {
      const response = await fetch(`${API_URL}/api/v1/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new ApiError(
          error.detail || "Registration failed",
          response.status,
        );
      }

      return response.json();
    },

    me: async () => {
      const response = await authFetch("/api/v1/auth/me");
      if (!response.ok) {
        throw new ApiError("Failed to fetch user", response.status);
      }
      return response.json();
    },

    logout: () => {
      clearTokens();
    },
  },

  // Generation endpoints
  generation: {
    generate: async (params: {
      prompt: string;
      style: string;
      action: string;
    }) => {
      const response = await authFetch("/api/v1/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new ApiError(
          error.detail || "Generation failed",
          response.status,
        );
      }

      return response.json();
    },

    getStatus: async (taskId: string) => {
      const response = await authFetch(`/api/v1/tasks/${taskId}`);
      if (!response.ok) {
        throw new ApiError("Failed to get task status", response.status);
      }
      return response.json();
    },
  },

  // Health check
  health: async () => {
    const response = await fetch(`${API_URL}/health`);
    if (!response.ok) {
      throw new ApiError("Health check failed", response.status);
    }
    return response.json();
  },
};

// WebSocket URL builder
export function getWebSocketUrl(taskId: string): string {
  return `${WS_URL}/ws/task/${taskId}`;
}
