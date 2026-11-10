import type { Metadata } from 'next';
import { Anton, Geist, Geist_Mono, Caveat_Brush } from 'next/font/google';
import './globals.css';

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap',
});

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

const caveatBrush = Caveat_Brush({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-caveat-brush',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Aradhyula Vamsi Kiran | AI/ML Engineer & Prompt Specialist',
  description:
    'Portfolio of Aradhyula Vamsi Kiran — B.Tech AIML Graduate, AI-powered application development, advanced prompt engineering, and autonomous LLM-driven workflows.',
  keywords: [
    'Aradhyula Vamsi Kiran',
    'AI/ML Graduate',
    'Prompt Engineering',
    'Gemini Flash API',
    'Django Developer',
    'Autonomous Workflows',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${geistSans.variable} ${geistMono.variable} ${caveatBrush.variable}`}
    >
      <head>
        {/* Anti-FOUC Inline Preboot Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var params = new URLSearchParams(window.location.search);
                  var agentsParam = params.get('agents');
                  var stored = localStorage.getItem('vamsi_portfolio_agents');
                  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                  var enabled = true;
                  if (agentsParam === 'on') {
                    enabled = true;
                  } else if (agentsParam === 'off') {
                    enabled = false;
                  } else if (stored !== null) {
                    enabled = stored === 'true';
                  } else if (reducedMotion) {
                    enabled = false;
                  }
                  if (enabled) {
                    document.documentElement.classList.add('build-mode');
                  }
                } catch (e) {
                  console.error(e);
                }
              })();
            `,
          }}
        />
      </head>
      <body className="bg-[#09090b] text-[#fafafa] font-sans selection:bg-[#ff3b2f]/30 selection:text-white relative">
        {children}
      </body>
    </html>
  );
}
