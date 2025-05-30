export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        sakura: 'sakura 10s linear infinite',
      },
      keyframes: {
        sakura: {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(360deg)', opacity: '0' },
        },
      },
      fontFamily: {
        agrandir: ['Agrandir', 'sans-serif'],
        akziden: ['Akziden Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
