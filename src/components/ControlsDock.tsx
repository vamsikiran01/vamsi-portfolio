'use client';

import React, { useEffect } from 'react';
import { Play, Pause, Bot, BotOff, Film, X } from 'lucide-react';

interface ControlsDockProps {
  isPaused: boolean;
  onTogglePause: () => void;
  isAgentsEnabled: boolean;
  onToggleAgents: () => void;
  isTouring: boolean;
  onStartTour: () => void;
  onStopTour: () => void;
  builtCount?: number;
  totalCount?: number;
}

export const ControlsDock: React.FC<ControlsDockProps> = ({
  isPaused,
  onTogglePause,
  isAgentsEnabled,
  onToggleAgents,
  isTouring,
  onStartTour,
  onStopTour,
  builtCount = 0,
  totalCount = 68,
}) => {
  // Keyboard shortcuts: T = tour, A = agents, P = pause, Esc = stop tour
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key === 't' || e.key === 'T') {
        e.preventDefault();
        if (isTouring) onStopTour();
        else onStartTour();
      } else if (e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        onToggleAgents();
      } else if (e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        onTogglePause();
      } else if (e.key === 'Escape') {
        if (isTouring) {
          e.preventDefault();
          onStopTour();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTouring, onStartTour, onStopTour, onToggleAgents, onTogglePause]);

  const displayTotal = totalCount > 0 ? totalCount : 68;
  const displayBuilt = Math.min(builtCount, displayTotal);

  return (
    <aside
      aria-label="Portfolio Controls"
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[9999] pointer-events-auto"
    >
      <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 bg-[#09090b]/95 border border-zinc-800 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.9)] backdrop-blur-md">
        {/* Live Built Counter (like in preview video) */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 font-mono text-[10px] sm:text-xs text-zinc-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>
            {displayBuilt}/{displayTotal} BUILT
          </span>
        </div>

        <span className="w-px h-4 bg-zinc-800" />

        {/* Pause / Resume Button */}
        <button
          onClick={onTogglePause}
          title={isPaused ? 'Resume Build (P)' : 'Pause Build (P)'}
          aria-label={isPaused ? 'Resume Build' : 'Pause Build'}
          className="flex items-center gap-1 px-2.5 sm:px-3 py-1 text-xs font-mono font-medium rounded-full transition-all duration-150 text-zinc-300 hover:text-white hover:bg-zinc-800 active:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#ff3b2f]"
        >
          {isPaused ? (
            <>
              <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
              <span className="hidden sm:inline">Resume</span>
            </>
          ) : (
            <>
              <Pause className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="hidden sm:inline">Pause</span>
            </>
          )}
          <kbd className="hidden md:inline-block px-1 py-0.2 text-[9px] bg-zinc-900 border border-zinc-700/60 rounded text-zinc-400">
            P
          </kbd>
        </button>

        <span className="w-px h-4 bg-zinc-800" />

        {/* Agents On / Off Button */}
        <button
          onClick={onToggleAgents}
          title={isAgentsEnabled ? 'Disable Robot Agents (A)' : 'Enable Robot Agents (A)'}
          aria-label={isAgentsEnabled ? 'Disable Robot Agents' : 'Enable Robot Agents'}
          className={`flex items-center gap-1 px-2.5 sm:px-3 py-1 text-xs font-mono font-medium rounded-full transition-all duration-150 active:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#ff3b2f] ${
            isAgentsEnabled
              ? 'text-white bg-zinc-800 border border-zinc-700/80 shadow-inner'
              : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/60'
          }`}
        >
          {isAgentsEnabled ? (
            <>
              <Bot className="w-3.5 h-3.5 text-[#ff3b2f]" />
              <span>Agents: ON</span>
            </>
          ) : (
            <>
              <BotOff className="w-3.5 h-3.5 text-zinc-500" />
              <span>Agents: OFF</span>
            </>
          )}
          <kbd className="hidden md:inline-block px-1 py-0.2 text-[9px] bg-zinc-900 border border-zinc-700/60 rounded text-zinc-400">
            A
          </kbd>
        </button>

        <span className="w-px h-4 bg-zinc-800" />

        {/* Tour Button */}
        <button
          onClick={isTouring ? onStopTour : onStartTour}
          title={isTouring ? 'Stop Tour (Esc)' : 'Cinematic Tour (T)'}
          aria-label={isTouring ? 'Stop Tour' : 'Cinematic Tour'}
          className={`flex items-center gap-1 px-3 py-1 text-xs font-mono font-medium rounded-full transition-all duration-150 active:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#ff3b2f] ${
            isTouring
              ? 'bg-[#ff3b2f] text-white animate-pulse shadow-[0_0_15px_rgba(255,59,47,0.5)]'
              : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
          }`}
        >
          {isTouring ? (
            <>
              <X className="w-3.5 h-3.5 text-white" />
              <span>Stop</span>
            </>
          ) : (
            <>
              <Film className="w-3.5 h-3.5 text-[#ff3b2f]" />
              <span>Tour</span>
            </>
          )}
          <kbd className="hidden md:inline-block px-1 py-0.2 text-[9px] bg-zinc-900 border border-zinc-700/60 rounded text-zinc-400">
            {isTouring ? 'ESC' : 'T'}
          </kbd>
        </button>
      </div>
    </aside>
  );
};
