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
        background: "#FFFFFF",
        panel: "#F6F8FB",
        border: "#E4E9F0",
        accent: {
          amber: "#D97706",
          blue: "#2563EB",
          emerald: "#059669",
          slate: "#334155"
        }
      },
    },
  },
  plugins: [],
};
export default config;
