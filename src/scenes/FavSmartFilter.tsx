import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { FadeIn } from "../components/FadeIn";
import { IPhoneFrame } from "../components/iPhoneFrame";
import { iOSJobCard as IOSJobCard } from "../components/iOSJobCard";
import { theme } from "../theme";

const FONT_FAMILY = theme.font.body;

const FILTER_ACTIVATE_FRAME = 60;
const CARDS_SWAP_FRAME = 80;

const allJobs = [
  {
    company: "Google",
    logoColor: "#4285F4",
    title: "Product Manager, Search",
    location: "Mountain View, CA",
    timeAgo: "2h",
    isNew: true,
    isFav: false,
  },
  {
    company: "Stripe",
    logoColor: "#635bff",
    title: "Product Manager, Payments",
    location: "San Francisco, CA",
    timeAgo: "5h",
    isNew: true,
    isFav: true,
  },
  {
    company: "Meta",
    logoColor: "#0668E1",
    title: "PM Intern, Instagram",
    location: "Menlo Park, CA",
    timeAgo: "1d",
    isNew: false,
    isFav: false,
  },
  {
    company: "Amazon",
    logoColor: "#FF9900",
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

const FilterChip: React.FC<FilterChipProps> = ({ label, active, icon }) => {
  return (
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
        background: active
          ? "rgba(168, 85, 247, 0.12)"
          : "rgba(255, 255, 255, 0.06)",
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
};

export const FavSmartFilter: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const favsActive = frame >= FILTER_ACTIVATE_FRAME;
  const showFavsOnly = frame >= CARDS_SWAP_FRAME;

  // Fade out all cards
  const fadeOutProgress = showFavsOnly
    ? spring({
        frame: Math.max(0, frame - CARDS_SWAP_FRAME),
        fps,
        config: { damping: 18, stiffness: 120 },
      })
    : 0;

  const allCardsOpacity = showFavsOnly
    ? interpolate(fadeOutProgress, [0, 1], [1, 0])
    : 1;

  // Fade in fav cards
  const favCardsProgress = showFavsOnly
    ? spring({
        frame: Math.max(0, frame - CARDS_SWAP_FRAME - 5),
        fps,
        config: { damping: 15, stiffness: 80 },
      })
    : 0;

  const favCardsOpacity = showFavsOnly ? favCardsProgress : 0;
  const favCardsTranslateY = showFavsOnly
    ? interpolate(favCardsProgress, [0, 1], [20, 0])
    : 20;

  const displayedJobs = showFavsOnly ? favJobs : allJobs;

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
        position: "relative",
      }}
    >
      <IPhoneFrame screenBackground={theme.colors.bg}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            fontFamily: FONT_FAMILY,
          }}
        >
          {/* Navigation title */}
          <div
            style={{
              paddingLeft: 16,
              paddingRight: 16,
              paddingTop: 8,
              paddingBottom: 4,
            }}
          >
            <span
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: theme.colors.white,
                fontFamily: FONT_FAMILY,
                letterSpacing: -0.5,
              }}
            >
              Jobs
            </span>
          </div>

          {/* Filter chips row */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 8,
              paddingLeft: 16,
              paddingRight: 16,
              paddingTop: 8,
              paddingBottom: 12,
            }}
          >
            <FilterChip label="Internships" active={false} />
            <FilterChip label="US" active={false} />
            <FilterChip
              label="Favs"
              active={favsActive}
              icon={favsActive ? "\u2605" : undefined}
            />
          </div>

          {/* Job cards */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}
          >
            {/* All cards (fade out when filtering) */}
            {!showFavsOnly && (
              <div style={{ opacity: allCardsOpacity }}>
                {allJobs.map((job, i) => (
                  <IOSJobCard
                    key={`all-${i}`}
                    company={job.company}
                    logoColor={job.logoColor}
                    title={job.title}
                    location={job.location}
                    timeAgo={job.timeAgo}
                    isNew={job.isNew}
                  />
                ))}
              </div>
            )}

            {/* Fav cards (fade in) */}
            {showFavsOnly && (
              <div
                style={{
                  opacity: favCardsOpacity,
                  transform: `translateY(${favCardsTranslateY}px)`,
                }}
              >
                {favJobs.map((job, i) => (
                  <IOSJobCard
                    key={`fav-${i}`}
                    company={job.company}
                    logoColor={job.logoColor}
                    title={job.title}
                    location={job.location}
                    timeAgo={job.timeAgo}
                    isNew={job.isNew}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </IPhoneFrame>

      {/* Annotation text below phone */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <FadeIn delay={90} direction="up" distance={15}>
          <span
            style={{
              fontSize: 14,
              color: theme.colors.muted,
              fontFamily: FONT_FAMILY,
              textAlign: "center",
            }}
          >
            Only see jobs from your favorites
          </span>
        </FadeIn>
      </div>
    </div>
  );
};
