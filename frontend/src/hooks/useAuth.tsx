"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  ReactNode,
} from "react";

interface User {
  id: string;
  email: string;
  username: string;
  is_active: boolean;
  created_at: string;
}

interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string) => Promise<void>;
  logout: () => void;
  getAccessToken: () => string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const TOKENS_KEY = "pixelforge_tokens";

// js-cache-storage: Cache localStorage reads at module level
let cachedTokens: AuthTokens | null | undefined;

function getCachedTokens(): AuthTokens | null {
  if (cachedTokens !== undefined) {
    return cachedTokens ?? null;
  }
  // SSR安全检查
  if (typeof window === 'undefined') {
    return null;
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

function setCachedTokens(tokens: AuthTokens | null) {
  cachedTokens = tokens;
  // SSR安全检查
  if (typeof window === 'undefined') {
    return;
  }
  if (tokens) {
    localStorage.setItem(TOKENS_KEY, JSON.stringify(tokens));
  } else {
    localStorage.removeItem(TOKENS_KEY);
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  // rerender-lazy-state-init: Use function for expensive initial state
  const [user, setUser] = useState<User | null>(null);
  const [tokens, setTokens] = useState<AuthTokens | null>(getCachedTokens);
  const [isLoading, setIsLoading] = useState(true);

  // Use ref to avoid stale closure in async operations
  const tokensRef = useRef(tokens);
  tokensRef.current = tokens;

  // Load tokens from localStorage on mount
  useEffect(() => {
    const storedTokens = getCachedTokens();
    if (storedTokens) {
      setTokens(storedTokens);
      fetchUser(storedTokens.access_token);
    } else {
      setIsLoading(false);
    }
  }, []);

  // Fetch current user with token
  const fetchUser = useCallback(async (accessToken: string) => {
    try {
      const response = await fetch(`${API_URL}/api/v1/auth/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        // rerender-functional-setstate: Use functional form
        setUser(() => userData);
      } else {
        // Token expired, try refresh
        const currentTokens = getCachedTokens();
        if (currentTokens) {
          await refreshTokens(currentTokens.refresh_token);
        }
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Refresh tokens
  const refreshTokens = useCallback(async (refreshToken: string) => {
    try {
      const response = await fetch(`${API_URL}/api/v1/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (response.ok) {
        const newTokens = await response.json();
        setTokens(newTokens);
        setCachedTokens(newTokens);
        await fetchUser(newTokens.access_token);
      } else {
        // Refresh failed, logout
        logout();
      }
    } catch {
      logout();
    }
  }, [fetchUser]);

  // Login
  const login = useCallback(async (username: string, password: string) => {
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    const response = await fetch(`${API_URL}/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Login failed");
    }

    const newTokens = await response.json();
    setTokens(newTokens);
    setCachedTokens(newTokens);
    await fetchUser(newTokens.access_token);
  }, [fetchUser]);

  // Register
  const register = useCallback(async (email: string, username: string, password: string) => {
    const response = await fetch(`${API_URL}/api/v1/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, username, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Registration failed");
    }

    // Auto-login after registration
    await login(username, password);
  }, [login]);

  // Logout
  const logout = useCallback(() => {
    setUser(null);
    setTokens(null);
    setCachedTokens(null);
  }, []);

  // Get access token
  const getAccessToken = useCallback(() => {
    return tokensRef.current?.access_token || null;
  }, []);

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout,
      getAccessToken,
    }),
    [user, isLoading, login, register, logout, getAccessToken]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
