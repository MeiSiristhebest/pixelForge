export interface GenerateRequest {
  prompt: string;
  style: "fantasy" | "sci-fi" | "medieval" | "modern";
  action: "idle" | "walk" | "run" | "attack";
}

export interface GenerateResponse {
  task_id: string;
  status: TaskStatus;
}

export type TaskStatus =
  | "queued"
  | "processing"
  | "generating"
  | "post_processing"
  | "uploading"
  | "completed"
  | "failed";

export interface TaskResult {
  task_id: string;
  status: TaskStatus;
  sprite_url?: string;
  error?: string;
  created_at: string;
  completed_at?: string;
}

export interface SpriteSheet {
  url: string;
  frame_width: number;
  frame_height: number;
  frame_count: number;
  fps: number;
}
