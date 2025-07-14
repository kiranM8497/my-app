// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      animation: {
        "pulse-slow": "pulse 10s infinite",
        "pulse-fast": "pulse 4s infinite",
        fade: "fadeIn 6s ease-in-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
