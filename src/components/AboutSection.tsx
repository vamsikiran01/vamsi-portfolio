'use client';

import React from 'react';
import { User, Lightbulb, Target, Users, Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      aria-label="About Aradhyula Vamsi Kiran"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-800/80"
    >
      <div className="mb-14">
        <div
          data-build="type"
          className="text-xs font-mono text-[#ff3b2f] tracking-widest uppercase mb-2 flex items-center gap-2"
        >
          <User className="w-3.5 h-3.5" />
          <span>04 // IDENTITY</span>
        </div>
        <h2
          data-build="wipe"
          className="font-anton text-4xl sm:text-6xl text-white uppercase tracking-tight"
        >
          About Me
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: 2 Resume-Grounded Paragraphs */}
        <div className="lg:col-span-6 space-y-6">
          <p
            data-build="type"
            className="text-sm sm:text-base text-zinc-200 leading-relaxed font-sans"
          >
            I am an AI/ML graduate (B.Tech AIML, 2026) with hands-on experience in AI-powered application development, web designing, and structured problem-solving. My core skill set combines Python fundamentals, advanced prompt engineering techniques—including zero-shot, few-shot, and chain-of-thought—and web development fundamentals (HTML, CSS, JavaScript).
          </p>

          <p
            data-build="type"
            className="text-sm sm:text-base text-zinc-200 leading-relaxed font-sans"
          >
            With a growing focus on agentic AI, RAG pipelines, and autonomous LLM-driven workflows, I am passionate about building reliable software and solving real-world challenges through clean, adaptable thinking. From architecting Django full-stack systems to integrating the Gemini Flash API and engineering structured prompt workflows, I emphasize resilient code and testable outcomes.
          </p>

          <div
            data-build="pop"
            className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center gap-3.5"
          >
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping flex-shrink-0" />
            <div className="text-xs font-mono text-zinc-300">
              <span className="text-white font-semibold">Immediate Availability:</span> Ready to contribute to forward-thinking engineering teams immediately upon offer.
            </div>
          </div>
        </div>

        {/* Right: 4 Engineering Principles Worked By */}
        <div className="lg:col-span-6 space-y-4">
          <h3
            data-build="type"
            className="font-anton text-xl text-white uppercase tracking-wider mb-2"
          >
            4 Principles I Work By
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Principle 1 */}
            <div
              data-build="pop"
              className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 hover:border-[#ff3b2f]/40 transition-colors"
            >
              <Target className="w-5 h-5 text-[#ff3b2f] mb-2" />
              <h4 className="font-anton text-base text-white uppercase tracking-tight">
                Analytical Thinking
              </h4>
              <p className="text-xs text-zinc-300 mt-1 font-sans leading-relaxed">
                Deconstructing complex software requirements into systematic, testable application workflows.
              </p>
            </div>

            {/* Principle 2 */}
            <div
              data-build="pop"
              className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 hover:border-[#ff3b2f]/40 transition-colors"
            >
              <Lightbulb className="w-5 h-5 text-[#ff3b2f] mb-2" />
              <h4 className="font-anton text-base text-white uppercase tracking-tight">
                Structured Communication
              </h4>
              <p className="text-xs text-zinc-300 mt-1 font-sans leading-relaxed">
                Clear documentation, explicit prompt chaining, and transparent logic between systems.
              </p>
            </div>

            {/* Principle 3 */}
            <div
              data-build="pop"
              className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 hover:border-[#ff3b2f]/40 transition-colors"
            >
              <Users className="w-5 h-5 text-[#ff3b2f] mb-2" />
              <h4 className="font-anton text-base text-white uppercase tracking-tight">
                Teamwork &amp; Adaptability
              </h4>
              <p className="text-xs text-zinc-300 mt-1 font-sans leading-relaxed">
                Collaborating proactively across engineering disciplines and mastering new tools rapidly.
              </p>
            </div>

            {/* Principle 4 */}
            <div
              data-build="pop"
              className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 hover:border-[#ff3b2f]/40 transition-colors"
            >
              <Sparkles className="w-5 h-5 text-[#ff3b2f] mb-2" />
              <h4 className="font-anton text-base text-white uppercase tracking-tight">
                Clean Adaptable Logic
              </h4>
              <p className="text-xs text-zinc-300 mt-1 font-sans leading-relaxed">
                Writing resilient, maintainable codebases that scale smoothly from prototype to production.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
