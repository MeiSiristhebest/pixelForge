"use client";

import { useCallback, useState, useRef, useMemo } from "react";
import { useWebSocket } from "./useWebSocket";

interface GenerateParams {
  prompt: string;
  style: string;
  action: string;
}

interface GenerateResponse {
  task_id: string;
  status: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8000";

export function useGenerateTask() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [taskId, setTaskId] = useState<string | null>(null);
  const [spriteUrl, setSpriteUrl] = useState<string | null>(null);

  // Use ref to track current taskId for WebSocket URL
  const taskIdRef = useRef(taskId);
  taskIdRef.current = taskId;

  // Memoize WebSocket URL to prevent unnecessary reconnections
  const wsUrl = useMemo(() => {
    return taskId ? `${WS_URL}/ws/task/${taskId}` : "";
  }, [taskId]);

  // rerender-functional-setstate: Use functional form for all setState
  const handleWsMessage = useCallback((data: any) => {
    if (data.status) {
      setStatus(() => data.status);
    }
    if (data.sprite_url) {
      setSpriteUrl(() => data.sprite_url);
    }
    if (data.status === "COMPLETED" || data.status === "FAILED") {
      setIsGenerating(() => false);
    }
    if (data.error) {
      setError(() => data.error);
      setIsGenerating(() => false);
    }
  }, []);

  const { connect } = useWebSocket({
    url: wsUrl,
    onMessage: handleWsMessage,
  });

  const generate = useCallback(async (params: GenerateParams) => {
    setIsGenerating(true);
    setStatus("submitting");
    setError(null);
    setSpriteUrl(null);

    try {
      const response = await fetch(`${API_URL}/api/v1/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error("Failed to submit generation task");
      }

      const data: GenerateResponse = await response.json();
      setTaskId(data.task_id);
      setStatus("queued");

      // Connect WebSocket for real-time updates
      connect();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setIsGenerating(false);
    }
  }, [connect]);

  // Memoize return value
  return useMemo(
    () => ({
      generate,
      isGenerating,
      status,
      error,
      taskId,
      spriteUrl,
    }),
    [generate, isGenerating, status, error, taskId, spriteUrl]
  );
}
