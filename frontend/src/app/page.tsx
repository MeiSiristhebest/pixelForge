'use client';

import { useState, memo } from 'react';
import dynamic from 'next/dynamic';
import { useAuth } from '@/hooks/useAuth';
import { GenerateForm } from '@/components/GenerateForm';

// Dynamic imports for heavy components
const SpritePreview = dynamic(
  () => import('@/components/SpritePreview').then((mod) => mod.SpritePreview),
  {
    ssr: false,
    loading: () => (
      <div className="aspect-square bg-gray-900 rounded flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent animate-spin" />
      </div>
    ),
  }
);

const LandingPage = dynamic(() => import('./landing/page'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent animate-spin mx-auto mb-4" />
        <p className="text-gray-400">Loading...</p>
      </div>
    </div>
  ),
});

// Icons
const SparklesIcon = memo(function SparklesIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7l2-7z" />
    </svg>
  );
});

const GameControllerIcon = memo(function GameControllerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M6 9h2v2H6V9zm4 0h4v2h-4V9zm6 0h2v2h-2V9zM4 11h2v2H4v-2zm14 0h2v2h-2v-2zM6 13h2v2H6v-2zm10 0h2v2h-2v-2zM8 15h8v2H8v-2zM10 17h4v2h-4v-2z" />
    </svg>
  );
});

export default function Home() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [spriteUrl, setSpriteUrl] = useState<string | null>(null);

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </main>
    );
  }

  // Show landing page for unauthenticated users
  if (!isAuthenticated) {
    return <LandingPage />;
  }

  // Authenticated Dashboard
  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center rounded-lg">
              <SparklesIcon />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                PixelForge
              </h1>
              <p className="text-gray-500 text-sm">Welcome, {user?.username}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={logout}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            Sign Out
          </button>
        </header>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Generate Section */}
          <section className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <SparklesIcon />
              Generate Character
            </h2>
            <GenerateForm onSpriteGenerated={setSpriteUrl} />
          </section>

          {/* Preview Section */}
          <section className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <GameControllerIcon />
              Preview
            </h2>
            <SpritePreview spriteUrl={spriteUrl} />
          </section>
        </div>
      </div>
    </main>
  );
}
