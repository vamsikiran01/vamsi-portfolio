'use client';

import React from 'react';
import { Layers } from 'lucide-react';

const STACK_ITEMS = [
  // Languages
  { name: 'Python', category: 'Language' },
  { name: 'SQL', category: 'Language' },
  { name: 'HTML5', category: 'Language' },
  { name: 'CSS3', category: 'Language' },
  { name: 'JavaScript', category: 'Language' },

  // Prompt Engineering
  { name: 'Zero-shot Prompting', category: 'Prompt Eng' },
  { name: 'One-shot Prompting', category: 'Prompt Eng' },
  { name: 'Few-shot Prompting', category: 'Prompt Eng' },
  { name: 'Chain-of-thought (CoT)', category: 'Prompt Eng' },
  { name: 'Role Prompting', category: 'Prompt Eng' },
  { name: 'Prompt Chaining', category: 'Prompt Eng' },
  { name: 'Output Formatting (JSON)', category: 'Prompt Eng' },
  { name: 'LLM Parameter Tuning', category: 'Prompt Eng' },

  // AI / ML & NLP
  { name: 'Gemini Flash API', category: 'AI & LLM' },
  { name: 'RAG Pipelines', category: 'AI & LLM' },
  { name: 'LLM Workflows', category: 'Agentic AI' },
  { name: 'TensorFlow', category: 'AI / ML' },
  { name: 'PyTorch', category: 'AI / ML' },
  { name: 'Scikit-learn', category: 'AI / ML' },
  { name: 'NLTK', category: 'NLP' },
  { name: 'spaCy', category: 'NLP' },
  { name: 'Hugging Face', category: 'AI & LLM' },

  // Data & Visualization
  { name: 'Pandas', category: 'Data' },
  { name: 'NumPy', category: 'Data' },
  { name: 'Matplotlib', category: 'Visualization' },
  { name: 'Seaborn', category: 'Visualization' },

  // Web & Backend
  { name: 'Django', category: 'Backend' },
  { name: 'SQLite', category: 'Database' },

  // Dev Tools
  { name: 'Git', category: 'Dev Tools' },
  { name: 'VS Code', category: 'Dev Tools' },
  { name: 'Google Colab', category: 'Dev Tools' },
];

export const StackSection: React.FC = () => {
  return (
    <section
      id="stack"
      aria-label="Technical Stack"
      className="py-20 bg-[#09090b] border-t border-zinc-800/80 overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div
          data-build="type"
          className="text-xs font-mono text-[#ff3b2f] tracking-widest uppercase mb-2 flex items-center gap-2"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>02 // CAPABILITIES</span>
        </div>
        <h2
          data-build="wipe"
          className="font-anton text-4xl sm:text-5xl text-white uppercase tracking-tight"
        >
          Technical Arsenal
        </h2>
        <p
          data-build="type"
          className="text-xs sm:text-sm text-zinc-300 font-sans mt-2"
        >
          Production-proven AI/ML frameworks, prompt architectures, RAG pipelines, and development tools.
        </p>
      </div>

      {/* Endless Marquee moving left with faded edges, pauses on hover */}
      <div
        className="relative w-full overflow-hidden select-none py-3"
        style={{
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
          maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
        }}
      >
        <div className="marquee-track flex gap-4">
          {[...STACK_ITEMS, ...STACK_ITEMS].map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800/90 hover:border-[#ff3b2f]/60 transition-colors shadow-sm flex-shrink-0"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b2f]" />
              <span className="font-mono text-xs font-semibold text-zinc-200">
                {item.name}
              </span>
              <span className="text-[10px] font-mono text-zinc-300 bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded">
                {item.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
