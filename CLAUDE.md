# trackly-cli-video

Animated product launch videos built as React components, rendered to MP4 via Remotion. No After Effects -- write scenes in TSX, preview with hot-reload, render with Chrome Headless.

## Tech Stack

- **Remotion 4** -- React-based video engine (compositions, spring animations, interpolate)
- **React 18** -- each scene is a functional component
- **TypeScript 5**
- **TailwindCSS 4** -- enabled via `@remotion/tailwind` webpack override in `remotion.config.ts`
- **Inline styles dominate** -- Tailwind is available but most styling uses `style={}` objects referencing `theme.ts`

## Directory Structure

```
src/
  index.ts              # registerRoot() entry point
  Root.tsx              # Composition config: 1090 frames, 30fps, 1080x1080
  TracklyLaunch.tsx     # Series sequencer -- scenes in <Series.Sequence> with frame durations
  theme.ts              # Design tokens: colors, fonts, dimensions (single source of truth)
  components/
    Terminal.tsx         # TerminalWindow + TypingText + OutputLine (reusable)
    FadeIn.tsx           # FadeIn (directional) + ScaleIn spring wrappers
  scenes/
    Scene1Install.tsx    # npm install + ASCII art           (120 frames / 4.0s)
    Scene2Login.tsx      # OAuth browser popup               (120 frames / 4.0s)
    Scene3Jobs.tsx       # Job listings table, row springs   (130 frames / 4.3s)
    Scene4Ask.tsx        # Natural language AI query          (140 frames / 4.7s)
    Scene5MCP.tsx        # JSON config + agent badges         (130 frames / 4.3s)
    Scene6ApiKey.tsx     # API key creation flow              (120 frames / 4.0s)
    Scene7Pillars.tsx    # Three access methods + SVG icons   (120 frames / 4.0s)
    Scene8CTA.tsx        # App icon, badges, install cmd      (210 frames / 7.0s)
public/                  # Static assets (staticFile() references)
  trackly-appicon.png
  apple-logo-white.png
  trackly-app-store.png
  favicon-512x512.png
  og-image.png
remotion.config.ts       # Webpack override enabling Tailwind
```

## Key Commands

```bash
npm run dev        # Remotion Studio with hot-reload at localhost:3000
npm run preview    # Remotion preview (lighter than Studio)
npm run build      # Render to out/trackly-launch.mp4
```

Manual render with options:
```bash
npx remotion render src/index.ts TracklyLaunch out/trackly-launch.mp4
```

## Scene Architecture

1. **Root.tsx** defines the `<Composition>` with total frames (1090), fps (30), and dimensions (1080x1080).
2. **TracklyLaunch.tsx** sequences scenes using `<Series>` / `<Series.Sequence durationInFrames={N}>`. Each scene except the last is wrapped in `SceneTransition` (8-frame fade in/out via `interpolate`).
3. **Each scene** is a self-contained `.tsx` file. Scenes use `useCurrentFrame()` for timing and `spring()` for organic motion. All colors/fonts come from `theme.ts`.
4. **Last scene (Scene8CTA)** is NOT wrapped in `SceneTransition` -- it holds solid so viewers can read the CTA.

### Adding a New Scene

1. Create `src/scenes/SceneNName.tsx` exporting a React.FC
2. Use `useCurrentFrame()` and `spring()` for animations
3. Import `theme` for colors/fonts
4. Add a `<Series.Sequence durationInFrames={N}>` in `TracklyLaunch.tsx`
5. Wrap in `<SceneTransition>` unless it is the final scene
6. Update total `durationInFrames` in `Root.tsx` (sum of all scene frames)

## Frame Arithmetic

- **30 fps** -- 30 frames = 1 second
- Total: 1090 frames = 36.3 seconds
- Scene durations must sum to Root.tsx `durationInFrames` exactly or you get blank frames / cut-off
- `SceneTransition` uses 8 frames for fade-in and 8 frames for fade-out within each scene's budget
- `TypingText` speed is chars-per-N-frames (speed=2 means 1 char every 2 frames). Plan typing duration: `text.length * speed` frames

## Animation Patterns

- **spring()** for all motion (`damping: 12-20`, `stiffness: 60-100`). No linear tweens.
- **interpolate()** for mapping spring progress to CSS values (opacity, translateY, scale)
- **FadeIn** component: directional spring with configurable delay, direction, distance
- **ScaleIn** component: scale from 0.85 to 1.0 with spring
- **OutputLine** component: appears at a specific frame with slide-left + fade

## Gotchas

- **Chrome Headless Shell download**: First `npm run build` downloads Chrome Headless (~200MB). Runs automatically but takes time on first render.
- **Emojis render as black glyphs** on dark backgrounds and become invisible. Use inline SVGs with explicit `fill` colors from theme instead.
- **Frame sum mismatch**: If scene durations in `TracklyLaunch.tsx` don't match `durationInFrames` in `Root.tsx`, video will have blank frames at the end or scenes get cut off.
- **Static assets**: Use `staticFile("filename.png")` to reference files in `public/`. Direct imports do not work.
- **Tailwind available but rarely used**: Most components use inline `style={}` objects. Both approaches work, but match the existing pattern when editing.
- **No CSS keyframes**: All animation goes through Remotion's `spring()` and `interpolate()`. CSS animations will not sync with Remotion's frame-by-frame rendering.
