import React from "react";
import { Audio, Sequence, useCurrentFrame, useVideoConfig, spring, interpolate, staticFile } from "remotion";
import { FadeIn } from "../components/FadeIn";
import { IPhoneFrame } from "../components/iPhoneFrame";
import { iOSJobCard as IOSJobCard } from "../components/iOSJobCard";
import { TouchIndicator } from "../components/TouchIndicator";
import { TabBar } from "../components/TabBar";
import { PerkLabel } from "../components/PerkLabel";
import { theme } from "../theme";

const FONT_FAMILY = theme.font.body;

const FILTER_ACTIVATE_FRAME = 60;
const CARDS_SWAP_FRAME = 80;

const allJobs = [
  {
    company: "Google",
    logoColor: "#4285F4",
    logoUrl: "https://www.google.com/s2/favicons?domain=www.google.com&sz=128",
    title: "Product Manager, Search",
    location: "Mountain View, CA",
    timeAgo: "2h",
    isNew: true,
    isFav: false,
  },
  {
    company: "Stripe",
    logoColor: "#635bff",
    logoUrl: "https://www.google.com/s2/favicons?domain=www.stripe.com&sz=128",
    title: "Product Manager, Payments",
    location: "San Francisco, CA",
    timeAgo: "5h",
    isNew: true,
    isFav: true,
  },
  {
    company: "Meta",
    logoColor: "#0668E1",
    logoUrl: "https://www.google.com/s2/favicons?domain=www.meta.com&sz=128",
    title: "PM Intern, Instagram",
    location: "Menlo Park, CA",
    timeAgo: "1d",
    isNew: false,
    isFav: false,
  },
  {
    company: "Amazon",
    logoColor: "#FF9900",
    logoUrl: "https://www.google.com/s2/favicons?domain=www.amazon.com&sz=128",
    title: "Sr. PM, AWS",
    location: "Seattle, WA",
    timeAgo: "1d",
    isNew: false,
    isFav: true,
  },
];

const favJobs = allJobs.filter((j) => j.isFav);

interface FilterChipProps {
  label: string;
  active: boolean;
  icon?: string;
}

const FilterChip: React.FC<FilterChipProps> = ({ label, active, icon }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      paddingLeft: 12,
      paddingRight: 12,
      paddingTop: 6,
      paddingBottom: 6,
      borderRadius: 999,
      background: active ? "rgba(168, 85, 247, 0.12)" : "rgba(255, 255, 255, 0.06)",
      fontFamily: FONT_FAMILY,
      fontSize: 13,
      fontWeight: 600,
      color: active ? "#A855F7" : theme.colors.muted,
    }}
  >
    {icon && <span style={{ fontSize: 11 }}>{icon}</span>}
    {label}
  </div>
);

const chipTaps = [{ x: 203, y: 68, frame: FILTER_ACTIVATE_FRAME - 4 }];

export const FavSmartFilter: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const favsActive = frame >= FILTER_ACTIVATE_FRAME;
  const showFavsOnly = frame >= CARDS_SWAP_FRAME;

  const fadeOutProgress = showFavsOnly
    ? spring({ frame: Math.max(0, frame - CARDS_SWAP_FRAME), fps, config: { damping: 18, stiffness: 120 } })
    : 0;

  const allCardsOpacity = showFavsOnly ? interpolate(fadeOutProgress, [0, 1], [1, 0]) : 1;

  const favCardsProgress = showFavsOnly
    ? spring({ frame: Math.max(0, frame - CARDS_SWAP_FRAME - 5), fps, config: { damping: 15, stiffness: 80 } })
    : 0;

  const favCardsOpacity = showFavsOnly ? favCardsProgress : 0;
  const favCardsTranslateY = showFavsOnly ? interpolate(favCardsProgress, [0, 1], [20, 0]) : 20;

  // Annotation
  const annProgress = spring({ frame: Math.max(0, frame - 90), fps, config: { damping: 18, stiffness: 80 } });
  const annOpacity = interpolate(annProgress, [0, 1], [0, 1]);
  const annTranslateY = interpolate(annProgress, [0, 1], [15, 0]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        background: theme.colors.bg,
        position: "relative",
      }}
    >
      {/* Perk label — centered top */}
      <PerkLabel text="Smart Filter" />

      {/* Phone on left-center */}
      <div style={{ marginRight: 40 }}>
        <IPhoneFrame screenBackground={theme.colors.bg}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: "100%",
              fontFamily: FONT_FAMILY,
              position: "relative",
            }}
          >
            {/* Navigation title */}
            <div style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 4 }}>
              <span
                style={{ fontSize: 28, fontWeight: 800, color: theme.colors.white, fontFamily: FONT_FAMILY, letterSpacing: -0.5 }}
              >
                Jobs
              </span>
            </div>

            {/* Filter chips */}
            <div style={{ display: "flex", flexDirection: "row", gap: 8, paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 12 }}>
              <FilterChip label="Internships" active={false} />
              <FilterChip label="US" active={false} />
              <FilterChip label="Favs" active={favsActive} icon={favsActive ? "\u2605" : undefined} />
            </div>

            {/* Job cards */}
            <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
              {!showFavsOnly && (
                <div style={{ opacity: allCardsOpacity }}>
                  {allJobs.map((job, i) => (
                    <IOSJobCard key={`all-${i}`} company={job.company} logoColor={job.logoColor} logoUrl={job.logoUrl} title={job.title} location={job.location} timeAgo={job.timeAgo} isNew={job.isNew} />
                  ))}
                </div>
              )}
              {showFavsOnly && (
                <div style={{ opacity: favCardsOpacity, transform: `translateY(${favCardsTranslateY}px)` }}>
                  {favJobs.map((job, i) => (
                    <IOSJobCard key={`fav-${i}`} company={job.company} logoColor={job.logoColor} logoUrl={job.logoUrl} title={job.title} location={job.location} timeAgo={job.timeAgo} isNew={job.isNew} />
                  ))}
                </div>
              )}
            </div>

            {/* Touch indicator */}
            <TouchIndicator taps={chipTaps} zIndex={50} />

            {/* Tab bar */}
            <TabBar activeTab="jobs" />
          </div>
        </IPhoneFrame>
      </div>

      {/* Annotation text on right side — matching FavHowToStar style */}
      <div
        style={{
          position: "absolute",
          right: 50,
          top: "50%",
          transform: "translateY(-50%)",
          maxWidth: 240,
          opacity: annOpacity,
        }}
      >
        <div style={{ transform: `translateY(${annTranslateY}px)` }}>
          <span
            style={{
              fontSize: 24,
              fontWeight: 600,
              color: theme.colors.white,
              fontFamily: FONT_FAMILY,
              lineHeight: 1.4,
            }}
          >
            Only see jobs from your favorites
          </span>
        </div>
      </div>

      {/* Sound effects */}
      <Sequence from={FILTER_ACTIVATE_FRAME - 4} durationInFrames={9} layout="none">
        <Audio src={staticFile("sfx/tap.wav")} volume={0.35} />
      </Sequence>
      <Sequence from={CARDS_SWAP_FRAME} durationInFrames={15} layout="none">
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.20} />
      </Sequence>
    </div>
  );
};
