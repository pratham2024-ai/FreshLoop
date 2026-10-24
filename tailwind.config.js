/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FAF7F2',
          100: '#F5EFE6',
          200: '#ECE4D5',
          300: '#DFD3BF',
          400: '#C8B69B',
        },
        forest: {
          950: '#0A1710',
          900: '#112319',
          850: '#162E21',
          800: '#1C3B2B',
          700: '#26523C',
          600: '#316C4F',
          500: '#3F8864',
          400: '#5BA57F',
          200: '#B8DBC9',
          100: '#E5EFE9',
          50: '#F0F6F2',
        },
        citrus: {
          600: '#C75918',
          500: '#E06D28',
          400: '#F18747',
          300: '#FBA976',
          200: '#FED3B9',
          100: '#FFEDE2',
          50: '#FFF7F2',
        },
        sage: {
          600: '#5F7060',
          500: '#7A8B7B',
          400: '#98A799',
          300: '#B5C2B6',
          200: '#CCD8CD',
          100: '#E9EFE9',
          50: '#F4F7F4',
        },
        charcoal: {
          950: '#111413',
          900: '#181E1B',
          800: '#242C28',
          700: '#35403B',
          600: '#4B5953',
          500: '#62726B',
          400: '#7A8982',
          300: '#9FAEA7',
          200: '#C2CBC7',
          100: '#E2E6E4',
        },
      },
      fontFamily: {
        serif: ['"Fraunces"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        editorial: '0 20px 40px -15px rgba(17, 35, 25, 0.08)',
        card: '0 4px 24px -2px rgba(17, 35, 25, 0.06)',
        lift: '0 16px 36px -8px rgba(17, 35, 25, 0.12)',
        warm: '0 16px 36px -10px rgba(224, 109, 40, 0.18)',
        glow: '0 0 25px rgba(224, 109, 40, 0.25)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '104': '26rem',
        '120': '30rem',
      }
    },
  },
  plugins: [],
}
