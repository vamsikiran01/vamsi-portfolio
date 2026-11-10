'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

export interface AgentInfo {
  id: string;
  name: string;
  color: string;
  tagBg: string;
  tagText: string;
  slotIndex: number;
  tier: 1 | 2; // Tier 1: lower bottom line, Tier 2: slightly higher bottom line
}

export const AGENT_REGISTRY: AgentInfo[] = [
  { id: 'scout', name: 'Scout', color: '#ff4d4d', tagBg: '#7f1d1d', tagText: '#fca5a5', slotIndex: 0, tier: 1 },
  { id: 'layout', name: 'Layout', color: '#38bdf8', tagBg: '#0369a1', tagText: '#bae6fd', slotIndex: 1, tier: 2 },
  { id: 'typeset', name: 'Typeset', color: '#34d399', tagBg: '#065f46', tagText: '#a7f3d0', slotIndex: 2, tier: 1 },
  { id: 'motion', name: 'Motion', color: '#facc15', tagBg: '#854d0e', tagText: '#fef08a', slotIndex: 3, tier: 2 },
  { id: 'qa', name: 'QA', color: '#f472b6', tagBg: '#9d174d', tagText: '#fbcfe8', slotIndex: 4, tier: 2 },
  { id: 'deploy', name: 'Deploy', color: '#c084fc', tagBg: '#6b21a8', tagText: '#f3e8ff', slotIndex: 5, tier: 2 },
  { id: 'copy', name: 'Copy', color: '#22d3ee', tagBg: '#155e75', tagText: '#cffafe', slotIndex: 6, tier: 1 },
  { id: 'lint', name: 'Lint', color: '#fb923c', tagBg: '#9a3412', tagText: '#ffedd5', slotIndex: 7, tier: 2 },
  { id: 'index', name: 'Index', color: '#818cf8', tagBg: '#3730a3', tagText: '#e0e7ff', slotIndex: 8, tier: 1 },
  { id: 'render', name: 'Render', color: '#4ade80', tagBg: '#166534', tagText: '#dcfce7', slotIndex: 9, tier: 2 },
  { id: 'palette', name: 'Palette', color: '#f87171', tagBg: '#991b1b', tagText: '#fee2e2', slotIndex: 10, tier: 1 },
  { id: 'review', name: 'Review', color: '#eab308', tagBg: '#713f12', tagText: '#fef08a', slotIndex: 11, tier: 1 },
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
  status: 'resting' | 'gliding' | 'wireframing' | 'building' | 'returning';
  targetEl?: HTMLElement;
  label: string;
}

interface RobotSwarmProps {
  isBootComplete: boolean;
  isPaused: boolean;
  isAgentsEnabled: boolean;
  onCountUpdate?: (built: number, total: number) => void;
}

export const RobotSwarm: React.FC<RobotSwarmProps> = ({
  isBootComplete,
  isPaused,
  isAgentsEnabled,
  onCountUpdate,
}) => {
  const [activeAgents, setActiveAgents] = useState<CursorState[]>([]);
  const [wireframes, setWireframes] = useState<ActiveWireframe[]>([]);

  const cursorsRef = useRef<CursorState[]>([]);
  const queueRef = useRef<HTMLElement[]>([]);
  const buildingSetRef = useRef<Set<HTMLElement>>(new Set());
  const wireframesMapRef = useRef<Map<string, ActiveWireframe>>(new Map());
  const rafIdRef = useRef<number | null>(null);

  const totalCountRef = useRef(0);
  const builtCountRef = useRef(0);

  // Compute resting coordinates along the bottom of the screen
  const getRestCoordinates = useCallback((agent: AgentInfo, winW: number, winH: number) => {
    const isMobile = winW < 768;
    const totalSlots = isMobile ? 6 : 12;
    const idx = isMobile ? agent.slotIndex % 6 : agent.slotIndex;

    // Distribute horizontally across the bottom
    // Leave room on both margins and skip center area slightly for dock if needed
    const step = (winW - 80) / (totalSlots - 1 || 1);
    const baseX = 40 + idx * step;

    // Stagger in two tiers at the very bottom of the screen
    // Tier 1 is close to the bottom (winH - 42px), Tier 2 is slightly higher (winH - 78px)
    const baseY = agent.tier === 1 ? winH - 44 : winH - 80;

    return { baseX, baseY };
  }, []);

  // Initialize cursors pool at the bottom of the screen
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 6 : 12;
    const winW = window.innerWidth;
    const winH = window.innerHeight;

    const initialPool: CursorState[] = AGENT_REGISTRY.slice(0, count).map((agent) => {
      const { baseX, baseY } = getRestCoordinates(agent, winW, winH);
      return {
        agent,
        screenX: baseX,
        screenY: baseY,
        status: 'resting',
        label: agent.name,
      };
    });

    cursorsRef.current = initialPool;
    setActiveAgents(initialPool);
  }, [getRestCoordinates]);

  // Reveal all if agents disabled
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
    builtCountRef.current = elements.length;
    onCountUpdate?.(elements.length, elements.length);
  }, [onCountUpdate]);

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
    totalCountRef.current = allElements.length;
    onCountUpdate?.(builtCountRef.current, allElements.length);

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

    // Scrolled past elements reveal immediately
    sorted.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0) {
        el.setAttribute('data-built', 'true');
        el.style.visibility = 'visible';
        builtCountRef.current++;
      }
    });

    const pending = sorted.filter((el) => el.getAttribute('data-built') !== 'true');
    queueRef.current = pending;
    onCountUpdate?.(builtCountRef.current, totalCountRef.current);

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
  }, [isBootComplete, isAgentsEnabled, onCountUpdate]);

  // Typewriter animation
  const runTypeAnimation = (el: HTMLElement, onDone: () => void) => {
    const originalText = el.getAttribute('data-original-text') || el.innerText || '';
    if (!el.hasAttribute('data-original-text')) {
      el.setAttribute('data-original-text', originalText);
    }
    el.innerText = '';
    el.style.visibility = 'visible';
    el.classList.add('typing-caret');

    let idx = 0;
    const speed = originalText.length > 80 ? 10 : 20;
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

        // 1. Assign queue items to available resting cursors (Max 4 concurrent builds to avoid clutter)
        const currentBuildingCount = buildingSetRef.current.size;
        const maxConcurrent = 4;

        if (currentBuildingCount < maxConcurrent && queueRef.current.length > 0) {
          const availableCursor = cursorsRef.current.find((c) => c.status === 'resting');
          if (availableCursor) {
            const nextEl = queueRef.current.shift();
            if (nextEl && !buildingSetRef.current.has(nextEl)) {
              buildingSetRef.current.add(nextEl);
              availableCursor.status = 'gliding';
              availableCursor.targetEl = nextEl;
              availableCursor.label = `${availableCursor.agent.name}`;
            }
          }
        }

        // 2. Update each cursor
        cursorsRef.current.forEach((c) => {
          const { baseX, baseY } = getRestCoordinates(c.agent, winW, winH);

          // STATUS: RESTING (Stay at bottom of the screen with subtle bobbing)
          if (c.status === 'resting') {
            const bobY = Math.sin(time * 2 + c.agent.slotIndex * 0.8) * 3;
            const bobX = Math.cos(time * 1.5 + c.agent.slotIndex * 0.8) * 2;

            const targetX = baseX + bobX;
            const targetY = baseY + bobY;

            c.screenX += (targetX - c.screenX) * 0.15;
            c.screenY += (targetY - c.screenY) * 0.15;
            c.label = c.agent.name;
            return;
          }

          // STATUS: RETURNING (Gliding back down to bottom resting position)
          if (c.status === 'returning') {
            const dx = baseX - c.screenX;
            const dy = baseY - c.screenY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            c.screenX += dx * 0.16;
            c.screenY += dy * 0.16;

            if (dist < 15) {
              c.status = 'resting';
              c.label = c.agent.name;
            }
            return;
          }

          // STATUS: GLIDING OR BUILDING (Working on target element)
          if (c.targetEl) {
            const rect = c.targetEl.getBoundingClientRect();

            // Destination at top-left edge of the element
            const targetX = rect.left + Math.min(rect.width * 0.08, 30);
            const targetY = rect.top + Math.min(rect.height * 0.12, 20);

            const dx = targetX - c.screenX;
            const dy = targetY - c.screenY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            c.screenX += dx * 0.22;
            c.screenY += dy * 0.22;

            if (c.status === 'gliding' && dist < 30) {
              // Reached element -> Start Wireframing
              c.status = 'wireframing';
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

              // Unveil and build
              setTimeout(() => {
                if (c.targetEl) {
                  c.status = 'building';
                  c.targetEl.setAttribute('data-building', 'true');
                  c.targetEl.style.visibility = 'visible';

                  if (buildType === 'type') {
                    runTypeAnimation(c.targetEl, () => {
                      finishAndReturn(c);
                    });
                  } else {
                    setTimeout(() => {
                      finishAndReturn(c);
                    }, 450);
                  }
                }
              }, 200);
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
          }
        });
      }

      // Sync React state
      setActiveAgents([...cursorsRef.current]);
      setWireframes(Array.from(wireframesMapRef.current.values()));

      rafIdRef.current = requestAnimationFrame(loop);
    };

    const finishAndReturn = (c: CursorState) => {
      if (c.targetEl) {
        c.targetEl.setAttribute('data-built', 'true');
        c.targetEl.removeAttribute('data-building');
        c.targetEl.style.visibility = 'visible';
        buildingSetRef.current.delete(c.targetEl);
        builtCountRef.current++;
        onCountUpdate?.(builtCountRef.current, totalCountRef.current);
      }
      wireframesMapRef.current.delete(c.agent.id);
      // Glides smoothly back down to bottom dock instead of hovering over content
      c.status = 'returning';
      c.targetEl = undefined;
      c.label = c.agent.name;
    };

    rafIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isBootComplete, isAgentsEnabled, isPaused, getRestCoordinates, onCountUpdate]);

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
              border: `1px solid ${w.agent.color}70`,
            }}
          >
            {w.label}
          </div>
        </div>
      ))}

      {/* 2. Robot Cursors — ASSEMBLED AT THE BOTTOM OF THE SCREEN */}
      {activeAgents.map((c) => (
        <div
          key={c.agent.id}
          className="fixed top-0 left-0 transition-transform pointer-events-none"
          style={{
            transform: `translate3d(${c.screenX}px, ${c.screenY}px, 0)`,
            willChange: 'transform',
          }}
        >
          {/* Cursor SVG Arrow Pointer pointing upwards into the page */}
          <svg
            className="w-4 h-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] transform -rotate-45"
            viewBox="0 0 24 24"
            fill={c.agent.color}
            stroke="#09090b"
            strokeWidth="1.5"
          >
            <path d="M3 3l7 18 3-7 7-3L3 3z" />
          </svg>

          {/* Pill Name Tag with Robot Head */}
          <div
            className="absolute left-3.5 top-0 flex items-center gap-1.5 px-2 py-0.5 rounded-full border shadow-xl backdrop-blur-sm whitespace-nowrap"
            style={{
              backgroundColor: `${c.agent.tagBg}f0`,
              borderColor: `${c.agent.color}95`,
              color: c.agent.tagText,
            }}
          >
            {/* Robot Face Box */}
            <div
              className="relative w-3 h-3 rounded-[2.5px] border flex items-center justify-center p-0.5"
              style={{
                backgroundColor: '#09090b',
                borderColor: c.agent.color,
              }}
            >
              {/* Antenna with pulsing tip */}
              <span
                className="robot-antenna-tip absolute -top-1 left-1/2 -translate-x-1/2 w-0.5 h-0.5 rounded-full"
                style={{ backgroundColor: c.agent.color, color: c.agent.color }}
              />

              {/* Blinking LED eyes */}
              <div className="flex gap-0.5 items-center justify-center">
                <span
                  className="robot-eye w-0.5 h-0.5 rounded-full"
                  style={{ backgroundColor: c.agent.color }}
                />
                <span
                  className="robot-eye w-0.5 h-0.5 rounded-full"
                  style={{ backgroundColor: c.agent.color }}
                />
              </div>
            </div>

            {/* Agent Name */}
            <span className="font-mono text-[10px] font-bold tracking-wider uppercase">
              {c.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
