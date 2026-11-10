'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BootLoader } from '@/components/BootLoader';
import { RobotSwarm } from '@/components/RobotSwarm';
import { ControlsDock } from '@/components/ControlsDock';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { WorkSection } from '@/components/WorkSection';
import { StackSection } from '@/components/StackSection';
import { RecordSection } from '@/components/RecordSection';
import { AboutSection } from '@/components/AboutSection';
import { ContactSection } from '@/components/ContactSection';

export default function Home() {
  const [bootComplete, setBootComplete] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isAgentsEnabled, setIsAgentsEnabled] = useState(true);
  const [isTouring, setIsTouring] = useState(false);

  const tourRafIdRef = useRef<number | null>(null);
  const tourStartTimeRef = useRef<number | null>(null);
  const tourStartScrollRef = useRef<number>(0);
  const tourTotalDistanceRef = useRef<number>(0);

  // Initialize agents state from URL params or localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const agentsParam = params.get('agents');
    const stored = localStorage.getItem('vamsi_portfolio_agents');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let enabled = true;
    if (agentsParam === 'on') {
      enabled = true;
    } else if (agentsParam === 'off') {
      enabled = false;
    } else if (stored !== null) {
      enabled = stored === 'true';
    } else if (reducedMotion) {
      enabled = false;
    }

    setIsAgentsEnabled(enabled);

    if (!enabled) {
      document.documentElement.classList.remove('build-mode');
    }
  }, []);

  const handleToggleAgents = useCallback(() => {
    setIsAgentsEnabled((prev) => {
      const nextState = !prev;
      localStorage.setItem('vamsi_portfolio_agents', String(nextState));
      if (!nextState) {
        document.documentElement.classList.remove('build-mode');
      } else {
        document.documentElement.classList.add('build-mode');
      }
      return nextState;
    });
  }, []);

  const handleTogglePause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  // Stop Tour Handler
  const handleStopTour = useCallback(() => {
    if (tourRafIdRef.current) {
      cancelAnimationFrame(tourRafIdRef.current);
      tourRafIdRef.current = null;
    }
    setIsTouring(false);
    tourStartTimeRef.current = null;
  }, []);

  // Auto-scroll loop for Tour mode
  const runTourScroll = useCallback(() => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const duration = Math.max(22000, totalHeight * 7); // ~140px/sec steady speed for crystal clear screen recordings

    const step = (timestamp: number) => {
      if (!tourStartTimeRef.current) {
        tourStartTimeRef.current = timestamp;
      }

      const elapsed = timestamp - tourStartTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Custom smooth easing: ease-in, linear steady, ease-out
      let eased: number;
      if (progress < 0.1) {
        // Ease in
        eased = 0.5 * Math.pow(progress / 0.1, 2) * 0.1;
      } else if (progress > 0.9) {
        // Ease out
        const p = (progress - 0.9) / 0.1;
        eased = 0.9 + (1 - Math.pow(1 - p, 2)) * 0.1;
      } else {
        // Linear steady reading speed
        eased = progress;
      }

      window.scrollTo(0, eased * totalHeight);

      if (progress < 1) {
        tourRafIdRef.current = requestAnimationFrame(step);
      } else {
        handleStopTour();
      }
    };

    tourRafIdRef.current = requestAnimationFrame(step);
  }, [handleStopTour]);

  // Start Tour Handler
  const handleStartTour = useCallback(() => {
    setIsTouring(true);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Wait for hero to build, then begin auto-scroll
    setTimeout(() => {
      tourStartTimeRef.current = null;
      runTourScroll();
    }, 1800);
  }, [runTourScroll]);

  // Cancel tour on any user scroll or gesture
  useEffect(() => {
    if (!isTouring) return;

    const stopOnUserAction = (e: Event) => {
      handleStopTour();
    };

    window.addEventListener('wheel', stopOnUserAction, { passive: true });
    window.addEventListener('touchstart', stopOnUserAction, { passive: true });
    window.addEventListener('touchmove', stopOnUserAction, { passive: true });

    return () => {
      window.removeEventListener('wheel', stopOnUserAction);
      window.removeEventListener('touchstart', stopOnUserAction);
      window.removeEventListener('touchmove', stopOnUserAction);
    };
  }, [isTouring, handleStopTour]);

  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] relative selection:bg-[#ff3b2f]/30 selection:text-white">
      {/* 1. Initial System Boot Loader */}
      <BootLoader onComplete={() => setBootComplete(true)} />

      {/* 2. Signature Autonomous Robot Swarm Animation Engine */}
      <RobotSwarm
        isBootComplete={bootComplete}
        isPaused={isPaused}
        isAgentsEnabled={isAgentsEnabled}
      />

      {/* 3. Top Navigation Bar */}
      <Navbar />

      {/* 4. Hero Section */}
      <main>
        <Hero />
        <WorkSection />
        <StackSection />
        <RecordSection />
        <AboutSection />
        <ContactSection />
      </main>

      {/* 5. Floating Bottom Controls Dock */}
      <ControlsDock
        isPaused={isPaused}
        onTogglePause={handleTogglePause}
        isAgentsEnabled={isAgentsEnabled}
        onToggleAgents={handleToggleAgents}
        isTouring={isTouring}
        onStartTour={handleStartTour}
        onStopTour={handleStopTour}
      />
    </div>
  );
}
