import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#080807",
        charcoal: "#11110f",
        soot: "#191814",
        stone: "#9d9587",
        limestone: "#d9d1c1",
        parchment: "#f2eadc",
        gold: "#c9a55b",
        champagne: "#e4c987",
      },
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        sans: ['"Inter"', "Arial", "Helvetica", "sans-serif"],
      },
      boxShadow: {
        glow: "0 24px 80px rgba(201, 165, 91, 0.14)",
      },
    },
  },
  plugins: [],
};

export default config;
