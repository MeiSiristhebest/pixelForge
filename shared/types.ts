// Shared TypeScript types between frontend and backend

export interface GenerateRequest {
  prompt: string;
  style: "fantasy" | "sci-fi" | "medieval" | "modern";
  action: "idle" | "walk" | "run" | "attack";
}

export interface GenerateResponse {
  task_id: string;
  status: TaskStatus;
  websocket_url: string;
}

export type TaskStatus =
  | "QUEUED"
  | "SUBMITTED"
  | "PROCESSING"
  | "UPLOADING"
  | "COMPLETED"
  | "FAILED"
  | "RETRYING";

export interface TaskStatusResponse {
  task_id: string;
  status: TaskStatus;
  progress: number;
  message?: string;
  sprite_url?: string;
  error?: string;
  created_at?: string;
  completed_at?: string;
}

export interface WebSocketMessage {
  task_id: string;
  status: TaskStatus;
  progress: number;
  message?: string;
  sprite_url?: string;
  error?: string;
  timestamp?: string;
}

export interface SpriteSheet {
  url: string;
  frame_width: number;
  frame_height: number;
  frame_count: number;
  fps: number;
}

export interface HealthCheckResponse {
  status: "healthy" | "unhealthy";
  timestamp: string;
  service: string;
}
