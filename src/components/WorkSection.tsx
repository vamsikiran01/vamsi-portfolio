'use client';

import React from 'react';
import { Github, Database, Brain, ArrowUpRight } from 'lucide-react';

export const WorkSection: React.FC = () => {
  const githubUrl = 'https://github.com/vamsikiran01';

  return (
    <section
      id="work"
      aria-label="Work that ships"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-800/80 relative z-10"
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
            <div className="flex items-center gap-3 pt-2 sm:pt-0 relative z-20">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700/80 text-xs font-mono transition-all active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3b2f]"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Code</span>
              </a>
              <a
                href="https://emotions-tracker-six.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[#ff3b2f] hover:bg-[#e03025] text-white text-xs font-mono font-semibold transition-all active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
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
                Built an LLM-powered journal emotion analysis app: text or voice entries are analysed by Gemini Flash via a Supabase Edge Function with structured function calling, returning emotion, confidence and insights.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b2f] mt-2 flex-shrink-0" />
              <span>
                Engineered chain-of-thought prompting and prompt chaining with context from Kaggle &ldquo;Sentiment Analysis for Mental Health&rdquo; dataset (51,000+ entries, 7 classes); Compromise.js for client-side NLP.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b2f] mt-2 flex-shrink-0" />
              <span>
                Crafted rule-based fallback engine for API downtime, explainability heatmap, CBT cognitive-distortion detection, and a mood dashboard with streaks and trends.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b2f] mt-2 flex-shrink-0" />
              <span>
                Evaluated rule-based NLP fallback engine on 350 balanced samples (50 per class) from Kaggle dataset: 58.3% accuracy and 60.2% macro-F1 across 7 classes.
              </span>
            </li>
          </ul>

          {/* Tech Chips */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-900">
            {[
              'React',
              'TypeScript',
              'Tailwind CSS',
              'Supabase Edge Functions',
              'PostgreSQL',
              'Gemini Flash API',
              'Compromise.js',
              'Recharts',
              'Prompt Engineering',
              'NLP',
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

        {/* Project 2: Library Management System (Readora) */}
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
                  FULL-STACK DJANGO // JUN &ndash; JUL 2025
                </span>
                <h3 className="font-anton text-2xl sm:text-3xl text-white uppercase tracking-tight group-hover:text-[#ff3b2f] transition-colors">
                  Library Management System (Readora)
                </h3>
              </div>
            </div>

            {/* Links */}
            <div className="flex items-center gap-3 pt-2 sm:pt-0 relative z-20">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700/80 text-xs font-mono transition-all active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3b2f]"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Code</span>
              </a>
              <a
                href="https://readora-5qfw.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[#ff3b2f] hover:bg-[#e03025] text-white text-xs font-mono font-semibold transition-all active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
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
                Django MVT application with three core models (role-based users, books, issued books); loan rules by role (14 days students, 30 days faculty) and an automatic &#8377;10/day overdue fine.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b2f] mt-2 flex-shrink-0" />
              <span>
                Integrated Google Books ISBN auto-fetch, QR-code receipts, 12 in-browser PDF textbooks, due-soon and overdue reminders with email alerts, and an analytics dashboard.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b2f] mt-2 flex-shrink-0" />
              <span>
                UI design and frontend development (login, register, book issue, catalog search, reminders pages) built with Django, HTML, CSS, JavaScript, and Tailwind CSS. Deployed on Vercel.
              </span>
            </li>
          </ul>

          {/* Tech Chips */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-900">
            {[
              'Django',
              'SQLite',
              'HTML5',
              'CSS3',
              'Tailwind CSS',
              'JavaScript',
              'Chart.js',
              'Google Books API',
              'Vercel',
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
