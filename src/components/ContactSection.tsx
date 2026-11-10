'use client';

import React, { useState } from 'react';
import { Mail, Linkedin, Github, Copy, Check, ArrowUpRight, Send } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const email = 'aradhyulavamsikiran@gmail.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      aria-label="Contact Aradhyula Vamsi Kiran"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-800/80"
    >
      <div className="mb-14">
        <div
          data-build="type"
          className="text-xs font-mono text-[#ff3b2f] tracking-widest uppercase mb-2 flex items-center gap-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b2f]" />
          <span>05 // INITIATE TRANSMISSION</span>
        </div>
        <h2
          data-build="wipe"
          className="font-anton text-4xl sm:text-6xl text-white uppercase tracking-tight"
        >
          Let&apos;s Connect
        </h2>
      </div>

      {/* Big Call-to-Action Card */}
      <div
        data-build="pop"
        className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-zinc-950 via-[#0d0909] to-zinc-950 border border-zinc-800/90 shadow-2xl relative overflow-hidden mb-16"
      >
        <div
          aria-hidden="true"
          className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-[#ff3b2f]/10 blur-3xl pointer-events-none"
        />

        <div className="max-w-2xl relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/50 text-emerald-400 font-mono text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Available to join immediately</span>
          </div>

          <h3 className="font-anton text-3xl sm:text-5xl text-white uppercase tracking-tight leading-tight">
            Ready to build reliable software &amp; autonomous AI workflows.
          </h3>

          <p className="text-zinc-300 text-sm sm:text-base font-sans leading-relaxed">
            Whether you are looking for an AI/ML engineer skilled in Gemini Flash API integrations, advanced prompt engineering, or full-stack Django development—reach out directly.
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {/* Mailto link button */}
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#ff3b2f] hover:bg-[#e03025] text-white font-mono text-xs uppercase font-semibold tracking-wider transition-all duration-150 shadow-[0_0_20px_rgba(255,59,47,0.35)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Send className="w-4 h-4" />
              <span>Send Email</span>
            </a>

            {/* Copy button */}
            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 font-mono text-xs tracking-wider transition-all duration-150 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3b2f]"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>{email}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Social Links Row */}
      <div
        data-build="pop"
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mb-20"
      >
        <a
          href="https://linkedin.com/in/aradhyulavamsikiran"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between p-4 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-[#ff3b2f]/50 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <Linkedin className="w-5 h-5 text-zinc-400 group-hover:text-[#ff3b2f] transition-colors" />
            <div>
              <div className="text-sm font-semibold text-white">LinkedIn</div>
              <div className="text-xs font-mono text-zinc-400">Professional Profile</div>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
        </a>

        <a
          href="https://github.com/aradhyulavamsikiran"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between p-4 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-[#ff3b2f]/50 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <Github className="w-5 h-5 text-zinc-400 group-hover:text-[#ff3b2f] transition-colors" />
            <div>
              <div className="text-sm font-semibold text-white">GitHub</div>
              <div className="text-xs font-mono text-zinc-400">Open Source &amp; Code</div>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
        </a>
      </div>

      {/* Footer strictly with NO phone number */}
      <footer className="border-t border-zinc-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-400">
        <div>
          &copy; {new Date().getFullYear()} ARADHYULA VAMSI KIRAN. All rights reserved.
        </div>
        <div className="flex items-center gap-3">
          <span>NEXT.JS 15</span>
          <span>•</span>
          <span>TAILWIND CSS</span>
          <span>•</span>
          <span className="text-[#ff3b2f]">ROBOT SWARM ENGINE</span>
        </div>
      </footer>
    </section>
  );
};
