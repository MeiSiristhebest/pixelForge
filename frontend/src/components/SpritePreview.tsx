"use client";

import * as PIXI from "pixi.js";
import { useEffect, useRef, useState } from "react";

interface SpritePreviewProps {
  spriteUrl: string | null;
  frameWidth?: number;
  frameHeight?: number;
  animationSpeed?: number;
}

export function SpritePreview({
  spriteUrl,
  frameWidth: _frameWidth = 64,
  frameHeight: _frameHeight = 64,
  animationSpeed: _animationSpeed = 0.1,
}: SpritePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (!containerRef.current) return;

    const initPixi = async () => {
      const app = new PIXI.Application();
      await app.init({
        width: 400,
        height: 400,
        backgroundAlpha: 0,
        antialias: false,
        resolution: 1,
      });

      containerRef.current?.appendChild(app.canvas);
      appRef.current = app;
    };

    initPixi();

    return () => {
      if (appRef.current) {
        appRef.current.destroy(true);
        appRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const loadSprite = async () => {
      if (!spriteUrl || !appRef.current) return;

      const app = appRef.current;

      // Clear previous children
      while (app.stage.children.length > 0) {
        app.stage.removeChildAt(0);
      }

      try {
        const texture = await PIXI.Assets.load(spriteUrl);
        const sprite = new PIXI.Sprite(texture);

        // Scale to fit with zoom
        const baseScale = Math.min(400 / sprite.width, 400 / sprite.height);
        sprite.scale.set(baseScale * zoom);
        sprite.x = (400 - sprite.width * zoom) / 2;
        sprite.y = (400 - sprite.height * zoom) / 2;

        // Disable interpolation for pixel-perfect rendering
        if (texture.source) {
          texture.source.scaleMode = "nearest";
        }

        app.stage.addChild(sprite);
      } catch (error) {
        console.error("Failed to load sprite:", error);
      }
    };

    loadSprite();
  }, [spriteUrl, zoom]);

  return (
    <div className="flex flex-col items-center">
      {/* Preview Container with Retro Monitor Frame */}
      <div className="relative w-full">
        {/* Monitor Frame */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg transform translate-x-1 translate-y-1" />
        <div className="relative bg-gray-900 rounded-lg p-3 border-2 border-gray-700">
          {/* Screen */}
          <div className="relative aspect-square bg-[#0a0a0f] rounded overflow-hidden scanlines">
            <div ref={containerRef} className="w-full h-full" />

            {/* Empty State */}
            {!spriteUrl && (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-16 h-16 border-2 border-dashed border-gray-700 rounded flex items-center justify-center mb-4">
                  <span className="text-3xl text-gray-600">◇</span>
                </div>
                <p className="text-gray-600 text-sm text-center px-4">
                  Your character will appear here
                </p>
              </div>
            )}
          </div>

          {/* Monitor Details */}
          <div className="flex items-center justify-between mt-3 px-1">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-gray-500">READY</span>
            </div>
            <span className="text-xs text-gray-600 font-mono">PX-2024</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      {spriteUrl && (
        <div className="flex items-center gap-4 mt-6">
          {/* Play/Pause */}
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="btn-pixel !py-2 !px-4 flex items-center gap-2"
          >
            <span>{isPlaying ? "❚❚" : "▶"}</span>
            <span className="text-sm">{isPlaying ? "Pause" : "Play"}</span>
          </button>

          {/* Zoom Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))}
              className="w-10 h-10 border-2 border-gray-700 hover:border-purple-500 text-gray-400 hover:text-white transition-colors"
            >
              −
            </button>
            <span className="text-gray-400 text-sm w-16 text-center font-mono">
              {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(3, z + 0.25))}
              className="w-10 h-10 border-2 border-gray-700 hover:border-purple-500 text-gray-400 hover:text-white transition-colors"
            >
              +
            </button>
          </div>

          {/* Download */}
          <a
            href={spriteUrl}
            download
            className="btn-pixel !py-2 !px-4 flex items-center gap-2"
          >
            <span>↓</span>
            <span className="text-sm">Download</span>
          </a>
        </div>
      )}
    </div>
  );
}
