import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "375px",
        md: "1024px",
      },
      colors: {
        black: "#2B4162",
        white: "#FFFFFF",
        orange: "#FC7614",
        gray: "#7C8798",
        "light-gray": "#969FAD",
        "dark-blue": "#262E38",
        "very-dark-blue": "#131518",
      },
    },
  },
  plugins: [],
} satisfies Config;
