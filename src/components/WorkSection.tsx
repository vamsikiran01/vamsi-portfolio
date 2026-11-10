'use client';

import React from 'react';
import { ExternalLink, Github, Sparkles, Terminal, Database, Brain, ArrowUpRight } from 'lucide-react';

export const WorkSection: React.FC = () => {
  return (
    <section
      id="work"
      aria-label="Work that ships"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-800/80"
    >
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
        <div>
          <div
            data-build="type"
            className="text-xs font-mono text-[#ff3b2f] tracking-widest uppercase mb-2 flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b2f]" />
            <span>01 // FEATURED WORK</span>
          </div>
          <h2
            data-build="wipe"
            className="font-anton text-4xl sm:text-6xl text-white uppercase tracking-tight"
          >
            Work that ships
          </h2>
        </div>

        {/* Short line + 3 stats on the right */}
        <div className="lg:max-w-md flex flex-col justify-end space-y-3">
          <p
            data-build="type"
            className="text-xs sm:text-sm text-zinc-300 font-sans"
          >
            Engineered with rigorous NLP pipelines, prompt architectures, and full-stack reliability.
          </p>

          <div
            data-build="pop"
            className="grid grid-cols-3 gap-3 pt-2 border-t border-zinc-800/80"
          >
            <div>
              <div className="font-anton text-xl sm:text-2xl text-white">2</div>
              <div className="font-mono text-[10px] text-zinc-300 uppercase">Core Systems</div>
            </div>
            <div>
              <div className="font-anton text-xl sm:text-2xl text-[#ff3b2f]">100%</div>
              <div className="font-mono text-[10px] text-zinc-300 uppercase">Resume Facts</div>
            </div>
            <div>
              <div className="font-anton text-xl sm:text-2xl text-white">0</div>
              <div className="font-mono text-[10px] text-zinc-300 uppercase">Imagined Metrics</div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects List: Text Cards (no screenshots, 3-4 bullet points, chips, links) */}
      <div className="space-y-8">
        {/* Project 1: Mental Health Detection Using NLP */}
        <div
          data-build="pop"
          className="p-6 sm:p-8 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 hover:border-[#ff3b2f]/50 transition-all duration-200 group relative"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/80 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-lg bg-red-950/50 border border-red-800/40 text-[#ff3b2f]">
                <Brain className="w-5 h-5" />
              </span>
              <div>
                <span className="font-mono text-[11px] text-[#ff3b2f] tracking-wider uppercase font-semibold">
                  FINAL YEAR PROJECT // MAR 2026
                </span>
                <h3 className="font-anton text-2xl sm:text-3xl text-white uppercase tracking-tight group-hover:text-[#ff3b2f] transition-colors">
                  Mental Health Detection Using NLP
                </h3>
              </div>
            </div>

            {/* Links */}
            <div className="flex items-center gap-3 pt-2 sm:pt-0">
              <a
                href="https://github.com/aradhyulavamsikiran"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700/80 text-xs font-mono transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3b2f]"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Code</span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[#ff3b2f] hover:bg-[#e03025] text-white text-xs font-mono font-semibold transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>Live Demo</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* 3 to 4 Bullet Points strictly from resume */}
          <ul className="space-y-3 font-sans text-xs sm:text-sm text-zinc-300 mb-6">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b2f] mt-2 flex-shrink-0" />
              <span>
                Developed an AI-powered journal emotion analysis application using the Gemini Flash API and curated text datasets to classify journal entries into emotional categories such as anxiety, depression, and neutral through text data.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b2f] mt-2 flex-shrink-0" />
              <span>
                Crafted and implemented the complete workflow including advanced prompting strategies (zero-shot, few-shot, and chain-of-thought), journaling interface, emotion insights dashboard, and history tracking system for structured wellness monitoring and analysis.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b2f] mt-2 flex-shrink-0" />
              <span>
                Engineered robust prompt chains with role prompting, output formatting, and LLM parameter tuning to ensure consistent JSON responses and high analytical accuracy.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b2f] mt-2 flex-shrink-0" />
              <span>
                Leveraged NLP libraries including Scikit-learn, NLTK, and spaCy to pre-process textual inputs and benchmark emotion classification patterns.
              </span>
            </li>
          </ul>

          {/* Tech Chips */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-900">
            {[
              'Gemini Flash API',
              'Python',
              'Prompt Engineering',
              'Chain-of-thought',
              'Few-shot',
              'Zero-shot',
              'NLP',
              'Scikit-learn',
              'NLTK',
              'spaCy',
            ].map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-[11px]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Project 2: Library Management System */}
        <div
          data-build="pop"
          className="p-6 sm:p-8 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 hover:border-[#ff3b2f]/50 transition-all duration-200 group relative"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/80 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-lg bg-zinc-900 border border-zinc-700/60 text-zinc-300 group-hover:text-[#ff3b2f] transition-colors">
                <Database className="w-5 h-5" />
              </span>
              <div>
                <span className="font-mono text-[11px] text-[#ff3b2f] tracking-wider uppercase font-semibold">
                  FULL-STACK DJANGO // MAY 2025
                </span>
                <h3 className="font-anton text-2xl sm:text-3xl text-white uppercase tracking-tight group-hover:text-[#ff3b2f] transition-colors">
                  Library Management System
                </h3>
              </div>
            </div>

            {/* Links */}
            <div className="flex items-center gap-3 pt-2 sm:pt-0">
              <a
                href="https://github.com/aradhyulavamsikiran"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700/80 text-xs font-mono transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3b2f]"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Code</span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[#ff3b2f] hover:bg-[#e03025] text-white text-xs font-mono font-semibold transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>Live Demo</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* 3 to 4 Bullet Points strictly from resume */}
          <ul className="space-y-3 font-sans text-xs sm:text-sm text-zinc-300 mb-6">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b2f] mt-2 flex-shrink-0" />
              <span>
                Built a full-stack Library Management System using Django, HTML, CSS, JavaScript, and SQLite with user authentication, admin dashboard, and book return reminders.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b2f] mt-2 flex-shrink-0" />
              <span>
                Developed a full-stack Django web application with complete CRUD operations, role-based administrative control, user authentication, and database-driven book catalog management.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b2f] mt-2 flex-shrink-0" />
              <span>
                Applied structured AI-driven thinking to map complex software requirements into systematic, testable application workflows.
              </span>
            </li>
          </ul>

          {/* Tech Chips */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-900">
            {[
              'Django',
              'SQLite',
              'Python',
              'HTML5',
              'CSS3',
              'JavaScript',
              'User Authentication',
              'CRUD Operations',
              'Admin Dashboard',
            ].map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-[11px]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
