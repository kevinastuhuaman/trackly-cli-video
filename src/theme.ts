export const theme = {
  colors: {
    bg: "#0a0a0f",
    surface: "#14141f",
    border: "#1e1e2e",
    accent: "#a855f7",
    accentBright: "#c084fc",
    amber: "#fbbf24",
    green: "#22c55e",
    white: "#fafaf9",
    muted: "#a1a1aa",
    dim: "#52525b",
  },
  // Match Trackly web app: system font stack with Inter
  font: {
    body: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", system-ui, sans-serif',
    display: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", system-ui, sans-serif',
    mono: '"SF Mono", "Fira Code", "Menlo", monospace',
  },
  fps: 30,
  width: 1080,
  height: 1080,
} as const;
