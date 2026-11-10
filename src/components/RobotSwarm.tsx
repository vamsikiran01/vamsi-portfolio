'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

// The 12 autonomous building agents requested
export interface AgentInfo {
  id: string;
  name: string;
  color: string;
  tagBg: string;
  tagText: string;
}

export const AGENT_REGISTRY: AgentInfo[] = [
  { id: 'scout', name: 'Scout', color: '#3b82f6', tagBg: '#1e3a8a', tagText: '#93c5fd' },
  { id: 'layout', name: 'Layout', color: '#ff3b2f', tagBg: '#7f1d1d', tagText: '#fca5a5' },
  { id: 'typeset', name: 'Typeset', color: '#10b981', tagBg: '#064e3b', tagText: '#6ee7b7' },
  { id: 'motion', name: 'Motion', color: '#f59e0b', tagBg: '#78350f', tagText: '#fde68a' },
  { id: 'qa', name: 'QA', color: '#ec4899', tagBg: '#831843', tagText: '#fbcfe8' },
  { id: 'deploy', name: 'Deploy', color: '#8b5cf6', tagBg: '#4c1d95', tagText: '#ddd6fe' },
  { id: 'copy', name: 'Copy', color: '#06b6d4', tagBg: '#164e63', tagText: '#a5f3fc' },
  { id: 'lint', name: 'Lint', color: '#84cc16', tagBg: '#365314', tagText: '#bef264' },
  { id: 'index', name: 'Index', color: '#6366f1', tagBg: '#312e81', tagText: '#c7d2fe' },
  { id: 'render', name: 'Render', color: '#f43f5e', tagBg: '#881337', tagText: '#fecdd3' },
  { id: 'palette', name: 'Palette', color: '#14b8a6', tagBg: '#134e4a', tagText: '#99f6e4' },
  { id: 'review', name: 'Review', color: '#eab308', tagBg: '#713f12', tagText: '#fef08a' },
];

interface ActiveWireframe {
  id: string;
  agent: AgentInfo;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  scale: number;
}

interface CursorState {
  agent: AgentInfo;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  active: boolean;
  status: 'idle' | 'gliding' | 'wireframing' | 'building' | 'done';
  targetEl?: HTMLElement;
}

interface RobotSwarmProps {
  isBootComplete: boolean;
  isPaused: boolean;
  isAgentsEnabled: boolean;
}

export const RobotSwarm: React.FC<RobotSwarmProps> = ({
  isBootComplete,
  isPaused,
  isAgentsEnabled,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeAgents, setActiveAgents] = useState<CursorState[]>([]);
  const [wireframes, setWireframes] = useState<ActiveWireframe[]>([]);
  const [builtCount, setBuiltCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const cursorsRef = useRef<CursorState[]>([]);
  const queueRef = useRef<HTMLElement[]>([]);
  const buildingSetRef = useRef<Set<HTMLElement>>(new Set());
  const wireframesMapRef = useRef<Map<string, ActiveWireframe>>(new Map());
  const rafIdRef = useRef<number | null>(null);

  // Initialize cursors pool (12 on desktop, 6 on mobile)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 6 : 12;
    const initialPool: CursorState[] = AGENT_REGISTRY.slice(0, count).map((agent, i) => ({
      agent,
      x: 100 + (i % 4) * 80,
      y: 100 + Math.floor(i / 4) * 60,
      targetX: 100 + (i % 4) * 80,
      targetY: 100 + Math.floor(i / 4) * 60,
      active: false,
      status: 'idle',
    }));
    cursorsRef.current = initialPool;
    setActiveAgents(initialPool);
  }, []);

  // Instant build helper if agents disabled
  const instantBuildAll = useCallback(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-build]');
    elements.forEach((el) => {
      el.setAttribute('data-built', 'true');
      el.removeAttribute('data-building');
      el.style.visibility = 'visible';
    });
    setWireframes([]);
    wireframesMapRef.current.clear();
    buildingSetRef.current.clear();
    queueRef.current = [];
  }, []);

  // When agents disabled or toggled off
  useEffect(() => {
    if (!isAgentsEnabled) {
      document.documentElement.classList.remove('build-mode');
      instantBuildAll();
    } else {
      document.documentElement.classList.add('build-mode');
    }
  }, [isAgentsEnabled, instantBuildAll]);

  // Main Element Collector & Intersection Observer
  useEffect(() => {
    if (!isBootComplete || !isAgentsEnabled) return;

    const allElements = Array.from(document.querySelectorAll<HTMLElement>('[data-build]'));
    setTotalCount(allElements.length);

    // Filter elements in reading order (top-to-bottom, left-to-right)
    const sorted = allElements
      .filter((el) => el.getAttribute('data-built') !== 'true')
      .sort((a, b) => {
        const rectA = a.getBoundingClientRect();
        const rectB = b.getBoundingClientRect();
        const topDiff = (window.scrollY + rectA.top) - (window.scrollY + rectB.top);
        if (Math.abs(topDiff) > 20) return topDiff;
        return rectA.left - rectB.left;
      });

    // Check for already scrolled past elements and reveal them instantly
    sorted.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0) {
        el.setAttribute('data-built', 'true');
        el.style.visibility = 'visible';
      }
    });

    const pending = sorted.filter((el) => el.getAttribute('data-built') !== 'true');
    queueRef.current = pending;

    // IntersectionObserver to add elements into queue when scrolled into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting && el.getAttribute('data-built') !== 'true') {
            if (!queueRef.current.includes(el) && !buildingSetRef.current.has(el)) {
              queueRef.current.push(el);
            }
          }
        });
      },
      { rootMargin: '100px 0px 100px 0px', threshold: 0.05 }
    );

    pending.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [isBootComplete, isAgentsEnabled]);

  // Typing helper
  const runTypeAnimation = (el: HTMLElement, onDone: () => void) => {
    const originalText = el.getAttribute('data-original-text') || el.innerText || '';
    if (!el.hasAttribute('data-original-text')) {
      el.setAttribute('data-original-text', originalText);
    }
    el.innerText = '';
    el.style.visibility = 'visible';
    el.classList.add('typing-caret');

    let idx = 0;
    const speed = originalText.length > 80 ? 12 : 25;
    const timer = setInterval(() => {
      if (isPaused) return;
      if (idx < originalText.length) {
        el.innerText = originalText.slice(0, idx + 1);
        idx++;
      } else {
        clearInterval(timer);
        el.classList.remove('typing-caret');
        onDone();
      }
    }, speed);
  };

  // Main Animation Loop
  useEffect(() => {
    if (!isBootComplete || !isAgentsEnabled) return;

    let lastTick = performance.now();

    const loop = (now: number) => {
      const dt = Math.min((now - lastTick) / 1000, 0.1);
      lastTick = now;

      if (!isPaused) {
        // 1. Assign queue items to available idle cursors (Max 6 concurrent builds)
        const currentBuildingCount = buildingSetRef.current.size;
        const maxConcurrent = 6;

        if (currentBuildingCount < maxConcurrent && queueRef.current.length > 0) {
          const availableCursor = cursorsRef.current.find((c) => c.status === 'idle');
          if (availableCursor) {
            const nextEl = queueRef.current.shift();
            if (nextEl && !buildingSetRef.current.has(nextEl)) {
              buildingSetRef.current.add(nextEl);
              availableCursor.status = 'gliding';
              availableCursor.active = true;
              availableCursor.targetEl = nextEl;

              const rect = nextEl.getBoundingClientRect();
              const pageX = rect.left + window.scrollX;
              const pageY = rect.top + window.scrollY;

              availableCursor.targetX = pageX + rect.width * 0.1;
              availableCursor.targetY = pageY + rect.height * 0.1;
            }
          }
        }

        // 2. Update each cursor
        cursorsRef.current.forEach((c) => {
          if (!c.active || !c.targetEl) return;

          const rect = c.targetEl.getBoundingClientRect();
          const targetPageX = rect.left + window.scrollX;
          const targetPageY = rect.top + window.scrollY;

          // Smooth lerp toward target
          const dx = targetPageX - c.x;
          const dy = targetPageY - c.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          c.x += dx * 0.22;
          c.y += dy * 0.22;

          if (c.status === 'gliding' && dist < 30) {
            // Reached element -> Start Wireframing
            c.status = 'wireframing';
            const wireframeId = `wireframe-${c.agent.id}-${Date.now()}`;
            const buildType = c.targetEl.getAttribute('data-build') || 'pop';

            const wire: ActiveWireframe = {
              id: wireframeId,
              agent: c.agent,
              x: targetPageX,
              y: targetPageY,
              width: Math.max(rect.width, 20),
              height: Math.max(rect.height, 20),
              label: `${c.agent.name} // [${buildType.toUpperCase()}]`,
              scale: 0.1,
            };
            wireframesMapRef.current.set(c.agent.id, wire);

            // Drag out wireframe
            setTimeout(() => {
              if (c.targetEl) {
                c.status = 'building';
                c.targetEl.setAttribute('data-building', 'true');
                c.targetEl.style.visibility = 'visible';

                if (buildType === 'type') {
                  runTypeAnimation(c.targetEl, () => {
                    completeBuild(c);
                  });
                } else {
                  // Pop or Wipe completes in ~500ms
                  setTimeout(() => {
                    completeBuild(c);
                  }, 480);
                }
              }
            }, 220);
          }
        });
      }

      // Sync React state
      setActiveAgents([...cursorsRef.current]);
      setWireframes(Array.from(wireframesMapRef.current.values()));

      rafIdRef.current = requestAnimationFrame(loop);
    };

    const completeBuild = (c: CursorState) => {
      if (c.targetEl) {
        c.targetEl.setAttribute('data-built', 'true');
        c.targetEl.removeAttribute('data-building');
        c.targetEl.style.visibility = 'visible';
        buildingSetRef.current.delete(c.targetEl);
        setBuiltCount((prev) => prev + 1);
      }
      wireframesMapRef.current.delete(c.agent.id);
      c.status = 'idle';
      c.active = false;
      c.targetEl = undefined;
    };

    rafIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isBootComplete, isAgentsEnabled, isPaused]);

  if (!isAgentsEnabled) return null;

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[9990] overflow-visible"
      style={{
        // fixed overlay
      }}
    >
      {/* 1. Wireframe Boxes */}
      {wireframes.map((w) => {
        const relY = w.y - (typeof window !== 'undefined' ? window.scrollY : 0);
        return (
          <div
            key={w.id}
            className="absolute transition-all duration-200 pointer-events-none"
            style={{
              left: `${w.x}px`,
              top: `${relY}px`,
              width: `${w.width}px`,
              height: `${w.height}px`,
              border: `1.5px dashed ${w.agent.color}`,
              backgroundColor: `${w.agent.color}15`,
              boxShadow: `0 0 16px ${w.agent.color}40`,
            }}
          >
            {/* 4 Corner resize handles */}
            <span
              className="absolute -top-1 -left-1 w-2 h-2"
              style={{ backgroundColor: w.agent.color }}
            />
            <span
              className="absolute -top-1 -right-1 w-2 h-2"
              style={{ backgroundColor: w.agent.color }}
            />
            <span
              className="absolute -bottom-1 -left-1 w-2 h-2"
              style={{ backgroundColor: w.agent.color }}
            />
            <span
              className="absolute -bottom-1 -right-1 w-2 h-2"
              style={{ backgroundColor: w.agent.color }}
            />

            {/* Micro tag label */}
            <div
              className="absolute -top-5 left-0 px-2 py-0.5 rounded text-[10px] font-mono tracking-wider font-semibold shadow-md whitespace-nowrap"
              style={{
                backgroundColor: w.agent.tagBg,
                color: w.agent.tagText,
                border: `1px solid ${w.agent.color}50`,
              }}
            >
              {w.label}
            </div>
          </div>
        );
      })}

      {/* 2. Robot Cursors */}
      {activeAgents.map((c) => {
        if (!c.active) return null;
        const relY = c.y - (typeof window !== 'undefined' ? window.scrollY : 0);

        return (
          <div
            key={c.agent.id}
            className="absolute transition-transform pointer-events-none"
            style={{
              transform: `translate3d(${c.x}px, ${relY}px, 0)`,
              willChange: 'transform',
            }}
          >
            {/* Cursor SVG Arrow Pointer */}
            <svg
              className="w-5 h-5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
              viewBox="0 0 24 24"
              fill={c.agent.color}
              stroke="#ffffff"
              strokeWidth="1.5"
            >
              <path d="M3 3l7 18 3-7 7-3L3 3z" />
            </svg>

            {/* Pill Name Tag with Robot Head */}
            <div
              className="absolute left-4 top-2 flex items-center gap-1.5 px-2 py-1 rounded-full border shadow-xl backdrop-blur-sm whitespace-nowrap"
              style={{
                backgroundColor: `${c.agent.tagBg}f0`,
                borderColor: `${c.agent.color}80`,
                color: c.agent.tagText,
              }}
            >
              {/* Robot Face Box */}
              <div
                className="relative w-3.5 h-3.5 rounded-[3px] border flex items-center justify-center p-0.5"
                style={{
                  backgroundColor: '#09090b',
                  borderColor: c.agent.color,
                }}
              >
                {/* Antenna with pulsing tip */}
                <span
                  className="robot-antenna-tip absolute -top-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                  style={{ backgroundColor: c.agent.color, color: c.agent.color }}
                />

                {/* Blinking LED eyes */}
                <div className="flex gap-0.5 items-center justify-center">
                  <span
                    className="robot-eye w-0.5 h-1 rounded-full"
                    style={{ backgroundColor: c.agent.color }}
                  />
                  <span
                    className="robot-eye w-0.5 h-1 rounded-full"
                    style={{ backgroundColor: c.agent.color }}
                  />
                </div>
              </div>

              {/* Agent Name */}
              <span className="font-mono text-[11px] font-bold tracking-wide">
                {c.agent.name}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
