'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Play, Pause, Bot, BotOff, Film, X } from 'lucide-react';

interface ControlsDockProps {
  isPaused: boolean;
  onTogglePause: () => void;
  isAgentsEnabled: boolean;
  onToggleAgents: () => void;
  isTouring: boolean;
  onStartTour: () => void;
  onStopTour: () => void;
}

export const ControlsDock: React.FC<ControlsDockProps> = ({
  isPaused,
  onTogglePause,
  isAgentsEnabled,
  onToggleAgents,
  isTouring,
  onStartTour,
  onStopTour,
}) => {
  // Keyboard shortcuts: T = tour, A = agents, P = pause, Esc = stop tour
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is inside an input/textarea
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

  return (
    <aside
      aria-label="Portfolio Controls"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] pointer-events-auto"
    >
      <div className="flex items-center gap-2 p-1.5 bg-[#09090b]/90 border border-zinc-800/90 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.8)] backdrop-blur-md">
        {/* Pause / Resume Button */}
        <button
          onClick={onTogglePause}
          title={isPaused ? 'Resume Build (P)' : 'Pause Build (P)'}
          aria-label={isPaused ? 'Resume Build' : 'Pause Build'}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-full transition-all duration-150 text-zinc-300 hover:text-white hover:bg-zinc-800/80 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3b2f]"
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
          <kbd className="hidden md:inline-block px-1 py-0.2 text-[10px] bg-zinc-900 border border-zinc-700/60 rounded text-zinc-400">
            P
          </kbd>
        </button>

        <span className="w-px h-4 bg-zinc-800" />

        {/* Agents On / Off Button */}
        <button
          onClick={onToggleAgents}
          title={isAgentsEnabled ? 'Disable Robot Agents (A)' : 'Enable Robot Agents (A)'}
          aria-label={isAgentsEnabled ? 'Disable Robot Agents' : 'Enable Robot Agents'}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-full transition-all duration-150 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3b2f] ${
            isAgentsEnabled
              ? 'text-white bg-zinc-800/90 shadow-inner'
              : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/60'
          }`}
        >
          {isAgentsEnabled ? (
            <>
              <Bot className="w-3.5 h-3.5 text-[#ff3b2f]" />
              <span>Agents On</span>
            </>
          ) : (
            <>
              <BotOff className="w-3.5 h-3.5 text-zinc-500" />
              <span>Agents Off</span>
            </>
          )}
          <kbd className="hidden md:inline-block px-1 py-0.2 text-[10px] bg-zinc-900 border border-zinc-700/60 rounded text-zinc-400">
            A
          </kbd>
        </button>

        <span className="w-px h-4 bg-zinc-800" />

        {/* Tour Button */}
        <button
          onClick={isTouring ? onStopTour : onStartTour}
          title={isTouring ? 'Stop Tour (Esc)' : 'Cinematic Screen-Record Tour (T)'}
          aria-label={isTouring ? 'Stop Tour' : 'Cinematic Screen-Record Tour'}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-medium rounded-full transition-all duration-150 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3b2f] ${
            isTouring
              ? 'bg-[#ff3b2f] text-white animate-pulse shadow-[0_0_15px_rgba(255,59,47,0.5)]'
              : 'text-zinc-300 hover:text-white hover:bg-zinc-800/80'
          }`}
        >
          {isTouring ? (
            <>
              <X className="w-3.5 h-3.5 text-white" />
              <span>Stop Tour</span>
            </>
          ) : (
            <>
              <Film className="w-3.5 h-3.5 text-[#ff3b2f]" />
              <span>Tour</span>
            </>
          )}
          <kbd className="hidden md:inline-block px-1 py-0.2 text-[10px] bg-zinc-900 border border-zinc-700/60 rounded text-zinc-400">
            {isTouring ? 'ESC' : 'T'}
          </kbd>
        </button>
      </div>
    </aside>
  );
};
