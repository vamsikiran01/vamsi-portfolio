'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, FileDown } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#09090b]/85 border-b border-zinc-800/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Name / Logo */}
        <Link
          href="#"
          className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3b2f] rounded"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff3b2f] shadow-[0_0_8px_#ff3b2f] group-hover:scale-125 transition-transform" />
          <span className="font-anton text-lg tracking-wider text-white uppercase">
            VAMSI KIRAN
          </span>
          <span className="text-[11px] font-mono text-zinc-300 border border-zinc-800 bg-zinc-900/60 px-1.5 py-0.5 rounded">
            AI/ML
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 font-mono text-xs text-zinc-300">
          <a
            href="#work"
            className="hover:text-white transition-colors focus-visible:outline-none focus-visible:text-[#ff3b2f]"
          >
            // WORK
          </a>
          <a
            href="#stack"
            className="hover:text-white transition-colors focus-visible:outline-none focus-visible:text-[#ff3b2f]"
          >
            // STACK
          </a>
          <a
            href="#record"
            className="hover:text-white transition-colors focus-visible:outline-none focus-visible:text-[#ff3b2f]"
          >
            // RECORD
          </a>
          <a
            href="#about"
            className="hover:text-white transition-colors focus-visible:outline-none focus-visible:text-[#ff3b2f]"
          >
            // ABOUT
          </a>
          <a
            href="#contact"
            className="hover:text-white transition-colors focus-visible:outline-none focus-visible:text-[#ff3b2f]"
          >
            // CONTACT
          </a>
        </nav>

        {/* Right CTA Badge & Resume */}
        <div className="flex items-center gap-3">
          {/* Status Beacon from resume */}
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full border border-zinc-800 bg-zinc-900/80 font-mono text-[11px] text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Available Immediately</span>
          </div>

          {/* Download Resume Button */}
          <a
            href="/resume.pdf"
            download="Aradhyula_Vamsi_Kiran_Resume.pdf"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-700 text-xs font-mono transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3b2f]"
          >
            <FileDown className="w-3.5 h-3.5 text-[#ff3b2f]" />
            <span className="hidden sm:inline">Resume PDF</span>
          </a>
        </div>
      </div>
    </header>
  );
};
