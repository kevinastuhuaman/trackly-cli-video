/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a0f",
        surface: "#14141f",
        border: "#1e1e2e",
        accent: "#a855f7",
        "accent-bright": "#c084fc",
        amber: "#fbbf24",
        muted: "#a1a1aa",
        dim: "#52525b",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["SF Mono", "Fira Code", "monospace"],
        brand: ["Cabinet Grotesk", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
