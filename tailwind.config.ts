import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#09090b',
        accent: {
          DEFAULT: '#ff3b2f',
          glow: 'rgba(255, 59, 47, 0.4)',
          hover: '#e03025',
        },
      },
      fontFamily: {
        anton: ['var(--font-anton)', 'Impact', 'sans-serif'],
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
        caveat: ['var(--font-caveat-brush)', 'cursive'],
      },
    },
  },
  plugins: [],
};

export default config;
