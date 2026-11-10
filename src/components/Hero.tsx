'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowDown, MapPin, Sparkles, Award, Briefcase, GraduationCap, ChevronRight } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      aria-label="Hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#09090b] pt-20 pb-16 px-4 sm:px-6 lg:px-8"
    >
      {/* 1. Giant Word PORTFOLIO in Anton behind headshot with metallic sheen */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden"
      >
        <span
          className="font-anton text-[19vw] sm:text-[17vw] tracking-tighter uppercase portfolio-sheen opacity-75 font-normal leading-none transform -translate-y-4 sm:-translate-y-8"
        >
          PORTFOLIO
        </span>
      </div>

      {/* Grid pattern background overlay for high-tech architectural vibe */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,#18181b25_1px,transparent_1px),linear-gradient(to_bottom,#18181b25_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
        {/* 2. Left Column: Handwritten Greeting, Name, Role, Bio, CTA, Location */}
        <div className="lg:col-span-4 flex flex-col justify-center space-y-4 sm:space-y-5 text-left order-2 lg:order-1">
          {/* Handwritten Greeting */}
          <div
            data-build="type"
            className="font-caveat text-3xl sm:text-4xl text-[#ff3b2f] tracking-wide select-none transform -rotate-1 origin-left"
          >
            Hello, I&apos;m
          </div>

          {/* Name Huge in Anton */}
          <h1
            data-build="wipe"
            className="font-anton text-4xl sm:text-5xl xl:text-6xl uppercase tracking-tight text-white leading-[0.95]"
          >
            ARADHYULA<br />
            <span className="text-zinc-100">VAMSI KIRAN</span>
          </h1>

          {/* Role in Red */}
          <div
            data-build="type"
            className="flex items-center gap-2 text-xs sm:text-sm font-mono tracking-widest uppercase font-semibold text-[#ff3b2f]"
          >
            <span className="w-2 h-2 rounded-full bg-[#ff3b2f] animate-pulse" />
            <span>AI/ML Engineer &amp; Prompt Specialist</span>
          </div>

          {/* 2-line Bio strictly from resume summary */}
          <p
            data-build="type"
            className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed max-w-md"
          >
            AI/ML graduate (B.Tech AIML, 2026) experienced in AI-powered application development, advanced prompt engineering, and autonomous LLM-driven workflows. Passionate about building reliable software through clean, adaptable thinking.
          </p>

          {/* Actions: View Work Button & Resume */}
          <div
            data-build="pop"
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <a
              href="#work"
              className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-lg bg-[#ff3b2f] hover:bg-[#e03025] text-white font-mono text-xs tracking-wider uppercase font-semibold transition-all duration-150 shadow-[0_0_20px_rgba(255,59,47,0.35)] hover:shadow-[0_0_25px_rgba(255,59,47,0.55)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>View work</span>
              <ArrowDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 font-mono text-xs tracking-wider uppercase transition-all duration-150 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3b2f]"
            >
              <span>Get in touch</span>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-300" />
            </a>
          </div>

          {/* Based in city line */}
          <div
            data-build="type"
            className="flex items-center gap-2 text-xs font-mono text-zinc-400 pt-1"
          >
            <MapPin className="w-3.5 h-3.5 text-[#ff3b2f]" />
            <span>Based in Visakhapatnam, AP</span>
          </div>
        </div>

        {/* 3. Center Column: Headshot centered, B&W, soft red glow, bottom edge fade */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative order-1 lg:order-2 my-2 lg:my-0">
          <div className="relative w-full max-w-[340px] sm:max-w-[420px] aspect-[4/5] flex items-center justify-center">
            {/* Soft Red Radial Glow behind headshot */}
            <div
              aria-hidden="true"
              className="absolute inset-0 m-auto w-64 sm:w-80 h-64 sm:h-80 rounded-full bg-[radial-gradient(circle,rgba(255,59,47,0.42)_0%,rgba(255,59,47,0.12)_45%,transparent_72%)] blur-2xl pointer-events-none -z-1"
            />

            {/* Subtle orbital concentric ring */}
            <div
              aria-hidden="true"
              className="absolute inset-0 m-auto w-[290px] sm:w-[370px] h-[290px] sm:h-[370px] rounded-full border border-dashed border-[#ff3b2f]/25 pointer-events-none animate-[spin_60s_linear_infinite]"
            />

            {/* Headshot image with B&W grayscale, high contrast, and bottom edge fade */}
            <div
              data-build="pop"
              className="relative w-full h-full flex items-end justify-center select-none"
              style={{
                WebkitMaskImage: 'linear-gradient(to bottom, black 65%, transparent 98%)',
                maskImage: 'linear-gradient(to bottom, black 65%, transparent 98%)',
              }}
            >
              <Image
                src="/headshot.png"
                alt="Aradhyula Vamsi Kiran"
                width={500}
                height={600}
                priority
                className="w-auto h-[92%] object-contain filter grayscale contrast-125 brightness-95 transition-all duration-300 hover:filter-none"
              />
            </div>
          </div>
        </div>

        {/* 4. Right Column: 3 Real Stats strictly from resume */}
        <div className="lg:col-span-3 flex flex-col justify-center space-y-4 order-3">
          {/* Stat 1 */}
          <div
            data-build="pop"
            className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80 hover:border-[#ff3b2f]/50 transition-colors duration-200 group relative overflow-hidden"
          >
            <div className="flex items-center justify-between pb-1">
              <span className="font-anton text-3xl sm:text-4xl text-white group-hover:text-[#ff3b2f] transition-colors">
                2
              </span>
              <Briefcase className="w-5 h-5 text-zinc-300 group-hover:text-[#ff3b2f] transition-colors" />
            </div>
            <div className="font-mono text-xs uppercase tracking-wider text-zinc-200 font-semibold">
              Internships Completed
            </div>
            <div className="text-[11px] text-zinc-300 mt-1 font-sans">
              APSSDC (Django Full-Stack) &amp; Demy Software Solutions (Cloud/DevOps)
            </div>
          </div>

          {/* Stat 2 */}
          <div
            data-build="pop"
            className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80 hover:border-[#ff3b2f]/50 transition-colors duration-200 group relative overflow-hidden"
          >
            <div className="flex items-center justify-between pb-1">
              <span className="font-anton text-3xl sm:text-4xl text-white group-hover:text-[#ff3b2f] transition-colors">
                5
              </span>
              <Award className="w-5 h-5 text-zinc-300 group-hover:text-[#ff3b2f] transition-colors" />
            </div>
            <div className="font-mono text-xs uppercase tracking-wider text-zinc-200 font-semibold">
              Industry Certifications
            </div>
            <div className="text-[11px] text-zinc-300 mt-1 font-sans">
              NVIDIA Prompt Engineering, GenAI, Python Basics, Web Dev &amp; Databases
            </div>
          </div>

          {/* Stat 3 */}
          <div
            data-build="pop"
            className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80 hover:border-[#ff3b2f]/50 transition-colors duration-200 group relative overflow-hidden"
          >
            <div className="flex items-center justify-between pb-1">
              <span className="font-anton text-3xl sm:text-4xl text-white group-hover:text-[#ff3b2f] transition-colors">
                2026
              </span>
              <GraduationCap className="w-5 h-5 text-zinc-300 group-hover:text-[#ff3b2f] transition-colors" />
            </div>
            <div className="font-mono text-xs uppercase tracking-wider text-zinc-200 font-semibold">
              B.Tech AIML Graduate
            </div>
            <div className="text-[11px] text-zinc-300 mt-1 font-sans">
              Nadimpalli Satyanarayana Raju Institute of Technology, Visakhapatnam
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
