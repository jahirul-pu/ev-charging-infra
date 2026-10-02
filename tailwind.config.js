/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        electric: {
          cyan: '#00f2fe',
          blue: '#4facfe',
          green: '#10b981',
          volt: '#a3e635',
          amber: '#f59e0b',
          crimson: '#ef4444',
        },
        dark: {
          bg: '#090d16',
          card: '#0f172a',
          cardHover: '#17223b',
          border: '#1e293b',
          muted: '#64748b',
        }
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Manrope', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['var(--font-display)', 'Space Grotesk', 'Manrope', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'flow': 'flow 20s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 15px rgba(0, 242, 254, 0.3))' },
          '100%': { filter: 'drop-shadow(0 0 30px rgba(0, 242, 254, 0.8))' },
        }
      }
    },
  },
  plugins: [],
}
