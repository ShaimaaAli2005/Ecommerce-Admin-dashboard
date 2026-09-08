/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#17233C',
        secondary: '#60708F',
        accent: '#E89A5B',
        background: '#F7F5F0',
        card: '#FFFFFF',
        textMain: '#1F2937',
        textMuted: '#7B8190',
        success: '#4F8A70',
        error: '#C95C5C',
        borderLine: '#E5E7EB',
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        btn: '10px',
        input: '10px',
        card: '16px',
        img: '12px',
        modal: '16px',
      }
    },
  },
  plugins: [],
}