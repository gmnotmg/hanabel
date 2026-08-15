import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        script: ["var(--font-script)", "cursive"],
      },
      colors: {
        ink: "#1a0a2e",
        muted: "#7c6a8e",
        lilac: {
          50: "#fdf9ff",
          100: "#f8edff",
          200: "#f1ddff",
          300: "#e5baff",
          400: "#d9a0ff",
          500: "#c783f3",
          600: "#a869e3",
          700: "#8c56d4",
          800: "#7040b6",
        },
        blush: "#ffbefb",
        mint: "#bcebd8",
        butter: "#fff4bf",
      },
      boxShadow: {
        soft: "0 18px 48px rgba(140, 86, 212, 0.14)",
        card: "0 9px 30px rgba(140, 86, 212, 0.10)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
