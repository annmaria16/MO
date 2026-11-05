/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        manorama: {
          red: '#D32F2F',
          darkRed: '#B71C1C',
          lightRed: '#FFEBEE',
          charcoal: '#1E293B',
          dark: '#0F172A',
          gray: '#64748B',
          lightGray: '#F1F5F9',
          border: '#E2E8F0'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        malayalam: ['"Anek Malayalam"', '"Noto Sans Malayalam"', '"Manjari"', 'sans-serif'],
        serif: ['"Merriweather"', '"Georgia"', 'serif'],
        newspaper: ['"Playfair Display"', '"Times New Roman"', 'serif']
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
      }
    },
  },
  plugins: [],
}
