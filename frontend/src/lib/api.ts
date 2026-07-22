const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      return { error: error || "Request failed" };
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Unknown error" };
  }
}

export const api = {
  generate: (params: { prompt: string; style: string; action: string }) =>
    fetchApi<{ task_id: string; status: string }>("/api/v1/generate", {
      method: "POST",
      body: JSON.stringify(params),
    }),

  getTaskStatus: (taskId: string) =>
    fetchApi<{ task_id: string; status: string; result?: any }>(`/api/v1/tasks/${taskId}`),

  healthCheck: () => fetchApi<{ status: string }>("/health"),
};
