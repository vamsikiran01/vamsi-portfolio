'use client';

import React, { useState } from 'react';
import { Mail, Linkedin, Github, Copy, Check, ArrowUpRight } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const email = 'aradhyulavamsikiran@gmail.com';
  const linkedinUrl = 'https://www.linkedin.com/in/aradhyula-vamsi-kiran-016a9229a/';
  const githubUrl = 'https://github.com/vamsikiran01';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      aria-label="Contact Aradhyula Vamsi Kiran"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-800/80 relative z-10"
    >
      {/* Big Call-to-Action Card */}
      <div
        data-build="pop"
        className="p-8 sm:p-12 rounded-3xl bg-zinc-950/90 border border-zinc-800/90 shadow-2xl relative overflow-hidden mb-16"
      >
        <div
          aria-hidden="true"
          className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-[#ff3b2f]/10 blur-3xl pointer-events-none"
        />

        <div className="max-w-3xl relative z-10 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/50 border border-red-800/40 text-[#ff3b2f] font-mono text-[11px] font-semibold tracking-wider uppercase">
            <span>AVAILABLE TO JOIN IMMEDIATELY</span>
          </div>

          <h3 className="font-anton text-3xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-[1.05]">
            Ready to build agentic AI &amp; full-stack systems.
          </h3>

          <p className="text-zinc-300 text-sm sm:text-base font-sans leading-relaxed">
            Looking for an AI/ML Graduate, Prompt Engineer, or Python &amp; Django developer? Reach out directly via email or LinkedIn.
          </p>

          {/* Action Row matching frame 07 */}
          <div className="flex flex-wrap items-center gap-3.5 pt-3 relative z-20">
            {/* Primary Email Button */}
            <a
              href={`mailto:${email}`}
              onClick={copyEmail}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#ff3b2f] hover:bg-[#e03025] text-white font-mono text-xs uppercase font-bold tracking-wider transition-all duration-150 shadow-[0_0_20px_rgba(255,59,47,0.35)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>COPIED TO CLIPBOARD</span>
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 text-white" />
                  <span>{email.toUpperCase()}</span>
                </>
              )}
            </a>

            {/* LinkedIn Profile Button */}
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-700 font-mono text-xs uppercase font-semibold tracking-wider transition-all duration-150 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3b2f] cursor-pointer"
            >
              <Linkedin className="w-4 h-4 text-[#ff3b2f]" />
              <span>LINKEDIN PROFILE</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
            </a>

            {/* GitHub Profile Button */}
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-700 font-mono text-xs uppercase font-semibold tracking-wider transition-all duration-150 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3b2f] cursor-pointer"
            >
              <Github className="w-4 h-4 text-zinc-300" />
              <span>GITHUB PROFILE</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer strictly with NO phone number matching frame 07 */}
      <footer className="border-t border-zinc-900 pt-8 pb-16 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-400">
        <div>
          &copy; {new Date().getFullYear()} ARADHYULA VAMSI KIRAN. Built strictly from verified resume facts.
        </div>
        <div className="flex items-center gap-2 text-zinc-400 text-[11px]">
          <span>Based in Visakhapatnam, AP</span>
          <span>•</span>
          <span>B.Tech AIML (2022-2026)</span>
        </div>
      </footer>
    </section>
  );
};
