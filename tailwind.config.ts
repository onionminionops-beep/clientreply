import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        inbox: {
          bg: "#0a0a0a",
          card: "#141414",
          border: "#222222",
          text: "#e8e8e8",
          muted: "#888888",
          accent: "#2563eb",
        },
      },
    },
  },
  plugins: [],
};
export default config;
