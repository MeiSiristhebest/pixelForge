"use client";

import { useState } from "react";
import { useGenerateTask } from "@/hooks/useGenerateTask";

const STYLE_OPTIONS = [
  { value: "fantasy", label: "Fantasy", icon: "⚔" },
  { value: "sci-fi", label: "Sci-Fi", icon: "◎" },
  { value: "medieval", label: "Medieval", icon: "⚜" },
  { value: "modern", label: "Modern", icon: "◈" },
];

const ACTION_OPTIONS = [
  { value: "idle", label: "Idle", desc: "Standing animation" },
  { value: "walk", label: "Walk", desc: "Walking cycle" },
  { value: "run", label: "Run", desc: "Running cycle" },
  { value: "attack", label: "Attack", desc: "Attack sequence" },
];

interface GenerateFormProps {
  onSpriteGenerated?: (url: string) => void;
}

export function GenerateForm({ onSpriteGenerated }: GenerateFormProps) {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("fantasy");
  const [action, setAction] = useState("idle");
  const { generate, isGenerating, status, error, spriteUrl } = useGenerateTask();

  // Call callback when sprite is generated
  if (spriteUrl && onSpriteGenerated) {
    onSpriteGenerated(spriteUrl);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    await generate({
      prompt: prompt.trim(),
      style,
      action,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Prompt Input */}
      <div>
        <label
          htmlFor="prompt"
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          Character Description
        </label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="A brave knight with golden armor and a glowing sword..."
          className="input-pixel w-full rounded resize-none"
          rows={4}
          disabled={isGenerating}
        />
        <p className="mt-2 text-xs text-gray-600">
          Describe your character in detail for best results
        </p>
      </div>

      {/* Style Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Art Style
        </label>
        <div className="grid grid-cols-2 gap-3">
          {STYLE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setStyle(opt.value)}
              disabled={isGenerating}
              className={`
                p-4 rounded border-2 transition-all duration-200 text-left
                ${
                  style === opt.value
                    ? "border-purple-500 bg-purple-500/10"
                    : "border-gray-700 hover:border-gray-600 bg-gray-800/50"
                }
              `}
            >
              <span className="text-2xl block mb-1">{opt.icon}</span>
              <span className="text-white font-medium">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Action Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Animation Type
        </label>
        <div className="grid grid-cols-2 gap-3">
          {ACTION_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setAction(opt.value)}
              disabled={isGenerating}
              className={`
                p-4 rounded border-2 transition-all duration-200 text-left
                ${
                  action === opt.value
                    ? "border-pink-500 bg-pink-500/10"
                    : "border-gray-700 hover:border-gray-600 bg-gray-800/50"
                }
              `}
            >
              <span className="text-white font-medium block">{opt.label}</span>
              <span className="text-gray-500 text-sm">{opt.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isGenerating || !prompt.trim()}
        className="btn-pixel w-full text-center text-lg flex items-center justify-center gap-3"
      >
        {isGenerating ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <span className="text-xl">✦</span>
            Generate Character
          </>
        )}
      </button>

      {/* Status Display */}
      {status && (
        <div className="p-4 card-pixel">
          <div className="flex items-center gap-3">
            <div
              className={`w-3 h-3 rounded-full ${
                status === "COMPLETED"
                  ? "bg-green-500"
                  : status === "FAILED"
                    ? "bg-red-500"
                    : "bg-yellow-500 animate-pulse"
              }`}
            />
            <p className="text-sm text-gray-300">
              Status:{" "}
              <span className="text-purple-400 font-medium">{status}</span>
            </p>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="p-4 border-2 border-red-500/50 bg-red-500/10 rounded">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}
    </form>
  );
}
