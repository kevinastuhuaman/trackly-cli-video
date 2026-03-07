import React from "react";
import { interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { TerminalWindow, TypingText } from "../components/Terminal";
import { FadeIn } from "../components/FadeIn";
import { theme } from "../theme";

const jobs = [
  { title: "Senior PM, AI Platform", company: "Stripe", location: "SF", type: "Full-Time", posted: "2h ago" },
  { title: "Product Manager, Search", company: "Notion", location: "SF", type: "Full-Time", posted: "5h ago" },
  { title: "PM Intern, Growth", company: "Figma", location: "SF", type: "Internship", posted: "1d ago" },
  { title: "PM, Developer Tools", company: "Vercel", location: "NYC", type: "Full-Time", posted: "1d ago" },
  { title: "Product Intern, AI/ML", company: "Scale AI", location: "SF", type: "Internship", posted: "2d ago" },
];

const TableRow: React.FC<{
  job: (typeof jobs)[0];
  index: number;
}> = ({ job, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const delay = 55 + index * 6;
  const adjustedFrame = Math.max(0, frame - delay);
  const progress = spring({ frame: adjustedFrame, fps, config: { damping: 20 } });
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const x = interpolate(progress, [0, 1], [-20, 0]);

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${x}px)`,
        display: "grid",
        gridTemplateColumns: "2.5fr 1fr 0.8fr 0.8fr 0.7fr",
        gap: 8,
        padding: "8px 0",
        borderBottom: `1px solid ${theme.colors.border}`,
        fontSize: 14,
      }}
    >
      <span style={{ color: theme.colors.white }}>{job.title}</span>
      <span style={{ color: theme.colors.accentBright }}>{job.company}</span>
      <span style={{ color: theme.colors.muted }}>{job.location}</span>
      <span style={{ color: job.type === "Internship" ? theme.colors.accentBright : theme.colors.green }}>
        {job.type}
      </span>
      <span style={{ color: theme.colors.dim }}>{job.posted}</span>
    </div>
  );
};

export const Scene3Jobs: React.FC = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: theme.colors.bg,
      }}
    >
      <TerminalWindow title="zsh — trackly jobs">
        <TypingText text="trackly jobs --function product" startFrame={5} speed={1.5} />
        <div style={{ marginTop: 20 }}>
          {/* Header */}
          <FadeIn delay={50}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2.5fr 1fr 0.8fr 0.8fr 0.7fr",
                gap: 8,
                padding: "8px 0",
                borderBottom: `2px solid ${theme.colors.accent}`,
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: 1.5,
                color: theme.colors.accent,
              }}
            >
              <span>Title</span>
              <span>Company</span>
              <span>Location</span>
              <span>Type</span>
              <span>Posted</span>
            </div>
          </FadeIn>
          {jobs.map((job, i) => (
            <TableRow key={i} job={job} index={i} />
          ))}
        </div>
        <FadeIn delay={95}>
          <div style={{ marginTop: 16, color: theme.colors.dim, fontSize: 13 }}>
            Showing 5 of 1,247 jobs · Add --json for machine-readable output
          </div>
        </FadeIn>
      </TerminalWindow>
    </div>
  );
};
