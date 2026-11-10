'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

export interface AgentInfo {
  id: string;
  name: string;
  color: string;
  tagBg: string;
  tagText: string;
  baseX: number; // percentage of viewport width (0.0 to 1.0)
  baseY: number; // percentage of viewport height (0.0 to 1.0)
  orbitSpeed: number;
  orbitRadius: number;
}

export const AGENT_REGISTRY: AgentInfo[] = [
  { id: 'scout', name: 'Scout', color: '#3b82f6', tagBg: '#1e3a8a', tagText: '#93c5fd', baseX: 0.12, baseY: 0.22, orbitSpeed: 0.8, orbitRadius: 35 },
  { id: 'layout', name: 'Layout', color: '#ff3b2f', tagBg: '#7f1d1d', tagText: '#fca5a5', baseX: 0.84, baseY: 0.18, orbitSpeed: 0.6, orbitRadius: 40 },
  { id: 'typeset', name: 'Typeset', color: '#10b981', tagBg: '#064e3b', tagText: '#6ee7b7', baseX: 0.18, baseY: 0.52, orbitSpeed: 0.9, orbitRadius: 30 },
  { id: 'motion', name: 'Motion', color: '#f59e0b', tagBg: '#78350f', tagText: '#fde68a', baseX: 0.82, baseY: 0.48, orbitSpeed: 0.7, orbitRadius: 45 },
  { id: 'qa', name: 'QA', color: '#ec4899', tagBg: '#831843', tagText: '#fbcfe8', baseX: 0.88, baseY: 0.72, orbitSpeed: 0.85, orbitRadius: 35 },
  { id: 'deploy', name: 'Deploy', color: '#8b5cf6', tagBg: '#4c1d95', tagText: '#ddd6fe', baseX: 0.14, baseY: 0.76, orbitSpeed: 0.65, orbitRadius: 38 },
  { id: 'copy', name: 'Copy', color: '#06b6d4', tagBg: '#164e63', tagText: '#a5f3fc', baseX: 0.28, baseY: 0.35, orbitSpeed: 0.75, orbitRadius: 32 },
  { id: 'lint', name: 'Lint', color: '#84cc16', tagBg: '#365314', tagText: '#bef264', baseX: 0.72, baseY: 0.32, orbitSpeed: 0.8, orbitRadius: 36 },
  { id: 'index', name: 'Index', color: '#6366f1', tagBg: '#312e81', tagText: '#c7d2fe', baseX: 0.32, baseY: 0.68, orbitSpeed: 0.7, orbitRadius: 34 },
  { id: 'render', name: 'Render', color: '#f43f5e', tagBg: '#881337', tagText: '#fecdd3', baseX: 0.74, baseY: 0.64, orbitSpeed: 0.9, orbitRadius: 42 },
  { id: 'palette', name: 'Palette', color: '#14b8a6', tagBg: '#134e4a', tagText: '#99f6e4', baseX: 0.50, baseY: 0.15, orbitSpeed: 0.55, orbitRadius: 40 },
  { id: 'review', name: 'Review', color: '#eab308', tagBg: '#713f12', tagText: '#fef08a', baseX: 0.50, baseY: 0.85, orbitSpeed: 0.6, orbitRadius: 38 },
];

interface ActiveWireframe {
  id: string;
  agent: AgentInfo;
  rect: { left: number; top: number; width: number; height: number };
  label: string;
}

interface CursorState {
  agent: AgentInfo;
  screenX: number; // Viewport-relative X
  screenY: number; // Viewport-relative Y
  status: 'patrol' | 'gliding' | 'wireframing' | 'building';
  targetEl?: HTMLElement;
  label: string;
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
  const [activeAgents, setActiveAgents] = useState<CursorState[]>([]);
  const [wireframes, setWireframes] = useState<ActiveWireframe[]>([]);

  const cursorsRef = useRef<CursorState[]>([]);
  const queueRef = useRef<HTMLElement[]>([]);
  const buildingSetRef = useRef<Set<HTMLElement>>(new Set());
  const wireframesMapRef = useRef<Map<string, ActiveWireframe>>(new Map());
  const rafIdRef = useRef<number | null>(null);

  // Initialize cursors pool: 12 on desktop, 6 on mobile
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 6 : 12;
    const initialPool: CursorState[] = AGENT_REGISTRY.slice(0, count).map((agent) => {
      const initX = agent.baseX * window.innerWidth;
      const initY = agent.baseY * window.innerHeight;
      return {
        agent,
        screenX: initX,
        screenY: initY,
        status: 'patrol',
        label: `${agent.name} // Patrol`,
      };
    });
    cursorsRef.current = initialPool;
    setActiveAgents(initialPool);
  }, []);

  // Reveal all if agents are disabled
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

    // Filter elements in reading order
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
      { rootMargin: '120px 0px 120px 0px', threshold: 0.05 }
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

  // Main Loop
  useEffect(() => {
    if (!isBootComplete || !isAgentsEnabled) return;

    let startTime = performance.now();

    const loop = (now: number) => {
      const time = (now - startTime) / 1000;

      if (!isPaused && typeof window !== 'undefined') {
        const winW = window.innerWidth;
        const winH = window.innerHeight;

        // 1. Assign queue items to available patrolling cursors (Max 6 concurrent builds)
        const currentBuildingCount = buildingSetRef.current.size;
        const maxConcurrent = 6;

        if (currentBuildingCount < maxConcurrent && queueRef.current.length > 0) {
          const availableCursor = cursorsRef.current.find((c) => c.status === 'patrol');
          if (availableCursor) {
            const nextEl = queueRef.current.shift();
            if (nextEl && !buildingSetRef.current.has(nextEl)) {
              buildingSetRef.current.add(nextEl);
              availableCursor.status = 'gliding';
              availableCursor.targetEl = nextEl;
              availableCursor.label = `${availableCursor.agent.name} // Approaching`;
            }
          }
        }

        // 2. Update each cursor
        cursorsRef.current.forEach((c) => {
          if (c.status === 'patrol' || !c.targetEl) {
            // PATROL MODE: Hover naturally in its assigned screen sector
            const orbitX = Math.cos(time * c.agent.orbitSpeed + c.agent.baseX * 10) * c.agent.orbitRadius;
            const orbitY = Math.sin(time * c.agent.orbitSpeed + c.agent.baseY * 10) * c.agent.orbitRadius;

            const targetScreenX = Math.max(30, Math.min(winW - 160, c.agent.baseX * winW + orbitX));
            const targetScreenY = Math.max(70, Math.min(winH - 80, c.agent.baseY * winH + orbitY));

            // Smooth ease
            c.screenX += (targetScreenX - c.screenX) * 0.08;
            c.screenY += (targetScreenY - c.screenY) * 0.08;
            c.label = `${c.agent.name} // Patrolling`;
            return;
          }

          // GLIDING or BUILDING target element
          const rect = c.targetEl.getBoundingClientRect();

          // Target is in viewport coordinates
          const targetScreenX = rect.left + Math.min(rect.width * 0.1, 40);
          const targetScreenY = rect.top + Math.min(rect.height * 0.1, 30);

          const dx = targetScreenX - c.screenX;
          const dy = targetScreenY - c.screenY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          c.screenX += dx * 0.22;
          c.screenY += dy * 0.22;

          if (c.status === 'gliding' && dist < 35) {
            // Reached element -> Start Wireframing
            c.status = 'wireframing';
            c.label = `${c.agent.name} // Wireframing`;
            const buildType = c.targetEl.getAttribute('data-build') || 'pop';

            const wire: ActiveWireframe = {
              id: `wire-${c.agent.id}`,
              agent: c.agent,
              rect: {
                left: rect.left,
                top: rect.top,
                width: Math.max(rect.width, 24),
                height: Math.max(rect.height, 24),
              },
              label: `${c.agent.name} // [${buildType.toUpperCase()}]`,
            };
            wireframesMapRef.current.set(c.agent.id, wire);

            // Drag out wireframe and reveal
            setTimeout(() => {
              if (c.targetEl) {
                c.status = 'building';
                c.label = `${c.agent.name} // Constructing`;
                c.targetEl.setAttribute('data-building', 'true');
                c.targetEl.style.visibility = 'visible';

                if (buildType === 'type') {
                  runTypeAnimation(c.targetEl, () => {
                    completeBuild(c);
                  });
                } else {
                  setTimeout(() => {
                    completeBuild(c);
                  }, 480);
                }
              }
            }, 220);
          } else if (c.status === 'building' || c.status === 'wireframing') {
            // Keep wireframe tracking element dynamically if user scrolls
            const wire = wireframesMapRef.current.get(c.agent.id);
            if (wire && c.targetEl) {
              const liveRect = c.targetEl.getBoundingClientRect();
              wire.rect = {
                left: liveRect.left,
                top: liveRect.top,
                width: Math.max(liveRect.width, 24),
                height: Math.max(liveRect.height, 24),
              };
            }
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
      }
      wireframesMapRef.current.delete(c.agent.id);
      // Return to active patrol mode instead of disappearing
      c.status = 'patrol';
      c.targetEl = undefined;
      c.label = `${c.agent.name} // Active`;
    };

    rafIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isBootComplete, isAgentsEnabled, isPaused]);

  if (!isAgentsEnabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9990] overflow-hidden select-none">
      {/* 1. Wireframe Boxes */}
      {wireframes.map((w) => (
        <div
          key={w.id}
          className="fixed transition-all duration-150 pointer-events-none"
          style={{
            left: `${w.rect.left}px`,
            top: `${w.rect.top}px`,
            width: `${w.rect.width}px`,
            height: `${w.rect.height}px`,
            border: `1.5px dashed ${w.agent.color}`,
            backgroundColor: `${w.agent.color}15`,
            boxShadow: `0 0 18px ${w.agent.color}45`,
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
              border: `1px solid ${w.agent.color}60`,
            }}
          >
            {w.label}
          </div>
        </div>
      ))}

      {/* 2. Robot Cursors — ALWAYS VISIBLE AS YOU SCROLL DOWN */}
      {activeAgents.map((c) => (
        <div
          key={c.agent.id}
          className="fixed top-0 left-0 transition-transform pointer-events-none"
          style={{
            transform: `translate3d(${c.screenX}px, ${c.screenY}px, 0)`,
            willChange: 'transform',
          }}
        >
          {/* Cursor SVG Arrow Pointer */}
          <svg
            className="w-5 h-5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
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
              borderColor: `${c.agent.color}90`,
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

            {/* Agent Name & Status */}
            <span className="font-mono text-[10px] font-bold tracking-wide">
              {c.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
