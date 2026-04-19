// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {
//       colors: {
//         'deep-forest': '#041F1A',
//         'mineral-teal': '#00B4A6',
//         'teal-dark': '#005952',
//         'lime-energy': '#BCF60C',
//         'sunrise-gold': '#FFB347',
//         'charcoal': '#0A0D10',
//         'charcoal-light': '#14181E',
//         'mist': '#E2E8F0',
//       },
//       fontFamily: {
//         sans: ['Outfit', 'sans-serif'],
//       },
//       animation: {
//         'float-slow': 'float 6s ease-in-out infinite',
//         'float-fast': 'float 3s ease-in-out infinite',
//         'pulse-glow': 'pulse-glow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
//         'scan-vertical': 'scan-vertical 3s linear infinite',
//       },
//       keyframes: {
//         float: {
//           '0%, 100%': { transform: 'translateY(0)' },
//           '50%': { transform: 'translateY(-15px)' },
//         },
//         'pulse-glow': {
//           '0%, 100%': { opacity: '0.4', filter: 'blur(3xl)' },
//           '50%': { opacity: '0.8', filter: 'blur(2xl)' },
//         },
//         'scan-vertical': {
//           '0%': { top: '-10%' },
//           '100%': { top: '110%' },
//         }
//       }
//     },
//   },
//   plugins: [],
// };




/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'forest': {
          950: '#011208',
          900: '#022818',
          800: '#064e3b',
          700: '#065f46',
          600: '#047857',
          500: '#059669',
          400: '#10b981',
          300: '#34d399',
          200: '#6ee7b7',
          100: '#d1fae5',
          50:  '#ecfdf5',
        },
        'mint': '#a7f3d0',
        'teal-eco': '#0d9488',
        'sky-eco': '#0ea5e9',
        'gold-eco': '#f59e0b',
        'charcoal': '#040d08',
        'leaf': '#16a34a',
      },
      fontFamily: {
        sans: ['Sora', 'sans-serif'],
        display: ['Cabinet Grotesk', 'Sora', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'eco-mesh': 'radial-gradient(at 20% 30%, rgba(16,185,129,0.15) 0%, transparent 50%), radial-gradient(at 80% 70%, rgba(6,182,212,0.10) 0%, transparent 50%)',
        'forest-gradient': 'linear-gradient(135deg, #011208 0%, #022818 40%, #064e3b 100%)',
        'glass-shine': 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.02) 100%)',
      },
      animation: {
        'float': 'float 7s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'float-delayed': 'float 7s ease-in-out 2s infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'scan': 'scan 3s linear infinite',
        'leaf-drift': 'leaf-drift 15s ease-in-out infinite',
        'orbit': 'orbit 20s linear infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-18px) rotate(3deg)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(16,185,129,0.3), 0 0 40px rgba(16,185,129,0.1)' },
          '50%': { boxShadow: '0 0 40px rgba(16,185,129,0.6), 0 0 80px rgba(16,185,129,0.2)' },
        },
        scan: {
          '0%': { top: '-5%' },
          '100%': { top: '105%' },
        },
        'leaf-drift': {
          '0%': { transform: 'translate(0,0) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '0.8' },
          '100%': { transform: 'translate(80px,-120px) rotate(180deg)', opacity: '0' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(140px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(140px) rotate(-360deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        'eco': '0 0 30px rgba(16,185,129,0.25)',
        'eco-lg': '0 0 60px rgba(16,185,129,0.35)',
        'glass': '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
        'card-eco': '0 4px 24px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.06) inset',
      },
      backdropBlur: {
        'eco': '20px',
      },
    },
  },
  plugins: [],
};