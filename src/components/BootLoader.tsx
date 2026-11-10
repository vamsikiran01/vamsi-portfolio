'use client';

import React, { useEffect, useState } from 'react';
import { Terminal, Cpu, CheckCircle } from 'lucide-react';

interface BootLoaderProps {
  onComplete: () => void;
}

export const BootLoader: React.FC<BootLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('CALIBRATING NEURAL CORES...');
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Check if agents are disabled via URL or localStorage
    const params = new URLSearchParams(window.location.search);
    if (params.get('agents') === 'off') {
      setVisible(false);
      onComplete();
      return;
    }

    const messages = [
      { p: 20, text: 'MOUNTING VAMSI-OS v1.0 KERNEL...' },
      { p: 45, text: 'INITIALIZING 12 AUTONOMOUS ROBOT AGENTS...' },
      { p: 75, text: 'CALIBRATING WIREFRAME MESH & PROMPT ENGINE...' },
      { p: 95, text: 'SYSTEM VERIFIED // DISPATCHING SWARM...' },
      { p: 100, text: 'ALL SYSTEMS OPERATIONAL.' },
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < messages.length) {
        setProgress(messages[currentStep].p);
        setStage(messages[currentStep].text);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setVisible(false);
          onComplete();
        }, 250);
      }
    }, 140);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[99999] bg-[#09090b] flex flex-col items-center justify-center p-6 select-none transition-opacity duration-300">
      <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-xl p-6 shadow-2xl relative overflow-hidden">
        {/* Glowing top line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff3b2f] to-transparent animate-pulse" />

        <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-[#ff3b2f]" />
            <span className="font-mono text-xs tracking-wider text-zinc-300 uppercase font-semibold">
              VAMSI.OS // AGENT SWARM
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#ff3b2f] animate-ping" />
            <span className="font-mono text-[11px] text-zinc-400">BOOTING</span>
          </div>
        </div>

        <div className="space-y-3 font-mono">
          <div className="text-xs text-zinc-400 flex items-center justify-between">
            <span className="truncate pr-2">{stage}</span>
            <span className="text-[#ff3b2f] font-bold">{progress}%</span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
            <div
              className="h-full bg-gradient-to-r from-red-600 to-[#ff3b2f] transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="pt-2 text-[10px] text-zinc-400 flex justify-between items-center">
            <span>SWARM: 12 AGENTS</span>
            <span className="text-zinc-400">ESC / CLICK TO BYPASS</span>
          </div>
        </div>
      </div>
    </div>
  );
};
