import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif']
      },
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#dfeeff',
          200: '#b7d8ff',
          300: '#8fc2ff',
          400: '#5ea5ff',
          500: '#2c86ff',
          600: '#1c69db',
          700: '#1757b7',
          800: '#144a96',
          900: '#123f7a'
        }
      },
      boxShadow: {
        card: '0 10px 35px rgba(15, 23, 42, 0.12)'
      }
    }
  },
  plugins: []
};

export default config;
