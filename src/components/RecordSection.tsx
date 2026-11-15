'use client';

import React from 'react';
import { Briefcase, GraduationCap, Award, Calendar, CheckCircle2, ArrowUpRight } from 'lucide-react';

const CERTIFICATIONS = [
  {
    title: 'NVIDIA: Prompt Engineering and Data Analysis',
    platform: 'Coursera',
    date: 'May 20, 2026',
    url: 'https://www.coursera.org/account/accomplishments/certificate/EKC6907WD4DS',
  },
  {
    title: 'Generative AI: Introduction and Applications',
    platform: 'Coursera',
    date: 'May 11, 2024',
    url: 'https://www.coursera.org/account/accomplishments/verify/S9APDECENE79',
  },
  {
    title: 'Python Basics — Core Programming Foundations',
    platform: 'Coursera',
    date: 'Nov 29, 2024',
    url: 'https://www.coursera.org/account/accomplishments/certificate/LVZF57BSTEWQ',
  },
  {
    title: 'HTML, CSS and JavaScript for Web Developers',
    platform: 'Coursera',
    date: 'May 7, 2024',
    url: 'https://www.coursera.org/account/accomplishments/certificate/RBVDRDLPB4LB',
  },
  {
    title: 'Introduction to Databases for Back-end Development',
    platform: 'Coursera',
    date: 'Dec 17, 2024',
    url: 'https://www.coursera.org/account/accomplishments/certificate/YUZZQN41YG6M',
  },
];

export const RecordSection: React.FC = () => {
  return (
    <section
      id="record"
      aria-label="Experience and Education Record"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-800/80"
    >
      <div className="mb-16">
        <div
          data-build="type"
          className="text-xs font-mono text-[#ff3b2f] tracking-widest uppercase mb-2 flex items-center gap-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b2f]" />
          <span>03 // CHRONOLOGY</span>
        </div>
        <h2
          data-build="wipe"
          className="font-anton text-4xl sm:text-6xl text-white uppercase tracking-tight"
        >
          The Record
        </h2>
        <p
          data-build="type"
          className="text-xs sm:text-sm text-zinc-300 font-sans mt-2 max-w-xl"
        >
          A truthful chronological timeline of professional internships, academic degrees, and industry certifications.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Professional Internships */}
        <div className="space-y-8">
          <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
            <Briefcase className="w-5 h-5 text-[#ff3b2f]" />
            <h3 className="font-anton text-xl sm:text-2xl text-white uppercase tracking-wider">
              Internships &amp; Industry Experience
            </h3>
          </div>

          <div className="relative pl-6 border-l border-zinc-800 space-y-10">
            {/* Internship 1: APSSDC */}
            <div data-build="pop" className="relative group">
              <span className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#09090b] border-2 border-[#ff3b2f] group-hover:bg-[#ff3b2f] transition-colors" />
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                <h4 className="font-anton text-lg sm:text-xl text-white uppercase tracking-tight">
                  Web Development with Django Intern
                </h4>
                <span className="font-mono text-xs text-[#ff3b2f] bg-red-950/40 border border-red-900/40 px-2 py-0.5 rounded">
                  Apr – Jun 2025
                </span>
              </div>
              <div className="font-mono text-xs text-zinc-300 mb-3">
                APSSDC (Andhra Pradesh State Skill Development Corporation)
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-zinc-300 font-sans">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#ff3b2f] mt-2 flex-shrink-0" />
                  <span>
                    Built a full-stack Library Management System using Django, HTML, CSS, JavaScript, and SQLite with user authentication, admin dashboard, and book return reminders.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#ff3b2f] mt-2 flex-shrink-0" />
                  <span>
                    Applied structured AI-driven thinking to map complex requirements into systematic, testable application workflows.
                  </span>
                </li>
              </ul>
            </div>

            {/* Internship 2: Demy Software Solutions */}
            <div data-build="pop" className="relative group">
              <span className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#09090b] border-2 border-zinc-600 group-hover:border-[#ff3b2f] group-hover:bg-[#ff3b2f] transition-colors" />
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                <h4 className="font-anton text-lg sm:text-xl text-white uppercase tracking-tight">
                  Cloud &amp; DevOps Intern
                </h4>
                <span className="font-mono text-xs text-zinc-300 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded">
                  Jun – Jul 2024
                </span>
              </div>
              <div className="font-mono text-xs text-zinc-300 mb-3">
                Demy Software Solutions
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-zinc-300 font-sans">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#ff3b2f] mt-2 flex-shrink-0" />
                  <span>
                    Gained hands-on experience with AWS EC2, cloud infrastructure management, and real-world DevOps pipelines.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#ff3b2f] mt-2 flex-shrink-0" />
                  <span>
                    Strengthened deployment skills for AI/ML production environments.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right: Education & Certifications */}
        <div className="space-y-10">
          {/* Education */}
          <div>
            <div className="flex items-center gap-2 border-b border-zinc-800 pb-3 mb-6">
              <GraduationCap className="w-5 h-5 text-[#ff3b2f]" />
              <h3 className="font-anton text-xl sm:text-2xl text-white uppercase tracking-wider">
                Education
              </h3>
            </div>

            <div className="space-y-6">
              {/* B.Tech */}
              <div
                data-build="pop"
                className="p-5 rounded-xl bg-zinc-950 border border-zinc-800/80 hover:border-zinc-700 transition-colors"
              >
                <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                  <h4 className="font-anton text-base sm:text-lg text-white uppercase">
                    B.Tech — Computer Science, AI &amp; Machine Learning
                  </h4>
                  <span className="font-mono text-xs text-[#ff3b2f]">2022 – 2026</span>
                </div>
                <div className="font-mono text-xs text-zinc-300 flex items-center justify-between flex-wrap gap-2">
                  <span>Nadimpalli Satyanarayana Raju Institute of Technology (NSRIT)</span>
                  <span className="text-xs font-mono font-bold text-white bg-zinc-900 border border-zinc-700/80 px-2 py-0.5 rounded">
                    CGPA: 8.51
                  </span>
                </div>
                <div className="text-xs text-zinc-400 mt-1">Visakhapatnam, Andhra Pradesh</div>
              </div>

              {/* Intermediate */}
              <div
                data-build="pop"
                className="p-5 rounded-xl bg-zinc-950 border border-zinc-800/80 hover:border-zinc-700 transition-colors"
              >
                <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                  <h4 className="font-anton text-base sm:text-lg text-white uppercase">
                    Board of Intermediate Education
                  </h4>
                  <span className="font-mono text-xs text-zinc-300">2020 – 2022</span>
                </div>
                <div className="font-mono text-xs text-zinc-300">
                  Kalam&apos;s Junior College
                </div>
                <div className="text-xs text-zinc-400 mt-1">Vizianagaram, Andhra Pradesh</div>
              </div>
            </div>
          </div>

          {/* 5 Verified Certifications with Live Credentials & Dates */}
          <div>
            <div className="flex items-center gap-2 border-b border-zinc-800 pb-3 mb-6">
              <Award className="w-5 h-5 text-[#ff3b2f]" />
              <h3 className="font-anton text-xl sm:text-2xl text-white uppercase tracking-wider">
                Verified Certifications
              </h3>
            </div>

            <div data-build="pop" className="grid grid-cols-1 gap-2.5">
              {CERTIFICATIONS.map((cert) => (
                <a
                  key={cert.title}
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 p-3.5 rounded-lg bg-zinc-950 border border-zinc-800/80 hover:border-[#ff3b2f]/60 hover:bg-zinc-900/60 transition-all duration-150 group cursor-pointer"
                  title={`View verified certificate on ${cert.platform}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <CheckCircle2 className="w-4 h-4 text-[#ff3b2f] flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors truncate">
                        {cert.title}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400 mt-0.5">
                        <span className="text-[#ff3b2f] font-semibold">{cert.platform}</span>
                        <span>•</span>
                        <span>Completed: {cert.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-zinc-400 group-hover:text-[#ff3b2f] flex-shrink-0 transition-colors">
                    <span className="hidden sm:inline">Verify</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
