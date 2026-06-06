import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        sans:    ['DM Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg:       '#080d18',
        surface:  '#0d1929',
        surface2: '#162032',
        gold:     '#C9A84C',
        muted:    '#8A9BB0',
        text:     '#F0EDE6',
      },
    },
  },
  plugins: [],
}

export default config
