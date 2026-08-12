import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#291d35",
        muted: "#766b80",
        lilac: {
          50: "#fbf8ff",
          100: "#f4edff",
          200: "#e9dcff",
          300: "#d6bcff",
          400: "#bd91f4",
          500: "#a76be8",
          600: "#8f4bd1",
          700: "#7436b4",
        },
        blush: "#f5b5da",
        mint: "#bcebd8",
        butter: "#ffe2a9",
      },
      boxShadow: {
        soft: "0 16px 45px rgba(83, 48, 115, 0.10)",
        card: "0 8px 28px rgba(67, 45, 92, 0.07)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
