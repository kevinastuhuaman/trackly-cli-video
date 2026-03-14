import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { FadeIn } from "../components/FadeIn";
import { IPhoneFrame } from "../components/iPhoneFrame";
import { FilterChipBar } from "../components/FilterChipBar";
import { iOSJobCard as IOSJobCard } from "../components/iOSJobCard";
import { theme } from "../theme";

/* ---------- Filter chips ---------- */

const chips = ["New", "All", "Applying", "Applied", "Check Later", "Not Interested"];

/* ---------- Card data per tab ---------- */

interface CardData {
  company: string;
  logoColor: string;
  title: string;
  location: string;
  timeAgo: string;
  isNew?: boolean;
  roleBadge?: { text: string; color: string };
  statusBadge?: { text: string; color: string };
}

const newCards: CardData[] = [
  { company: "Stripe", logoColor: "#635bff", title: "Product Manager, Payments", location: "San Francisco, CA", timeAgo: "2h", isNew: true, roleBadge: { text: "Product", color: "#3B82F6" } },
  { company: "Figma", logoColor: "#1ABCFE", title: "Senior PM, Editor Platform", location: "San Francisco, CA", timeAgo: "5h", isNew: true, roleBadge: { text: "Design", color: "#EC4899" } },
  { company: "Notion", logoColor: "#000000", title: "Product Manager, AI", location: "New York, NY", timeAgo: "1d", isNew: true, roleBadge: { text: "Product", color: "#3B82F6" } },
];

const allCards: CardData[] = [
  { company: "Stripe", logoColor: "#635bff", title: "Product Manager, Payments", location: "San Francisco, CA", timeAgo: "2h", roleBadge: { text: "Product", color: "#3B82F6" }, statusBadge: { text: "Applying", color: "#A855F7" } },
  { company: "Airbnb", logoColor: "#FF5A5F", title: "PM, Host Experience", location: "San Francisco, CA", timeAgo: "3d", roleBadge: { text: "Product", color: "#3B82F6" }, statusBadge: { text: "Applied", color: "#22C55E" } },
  { company: "Notion", logoColor: "#000000", title: "Product Manager, AI", location: "New York, NY", timeAgo: "1d", roleBadge: { text: "Product", color: "#3B82F6" } },
];

const applyingCards: CardData[] = [
  { company: "Stripe", logoColor: "#635bff", title: "Product Manager, Payments", location: "San Francisco, CA", timeAgo: "2h", roleBadge: { text: "Product", color: "#3B82F6" }, statusBadge: { text: "Applying", color: "#A855F7" } },
  { company: "Meta", logoColor: "#0668E1", title: "Product Lead, Reels", location: "Menlo Park, CA", timeAgo: "1d", roleBadge: { text: "Product", color: "#3B82F6" }, statusBadge: { text: "Applying", color: "#A855F7" } },
];

const checkLaterCards: CardData[] = [
  { company: "Google", logoColor: "#4285F4", title: "PM, Chrome Extensions", location: "Mountain View, CA", timeAgo: "5d", roleBadge: { text: "Product", color: "#3B82F6" }, statusBadge: { text: "Check Later", color: "#71767B" } },
  { company: "Amazon", logoColor: "#FF9500", title: "Sr. PM, Alexa AI", location: "Seattle, WA", timeAgo: "3d", roleBadge: { text: "Product", color: "#3B82F6" }, statusBadge: { text: "Check Later", color: "#71767B" } },
];

/* ---------- Timeline helpers ---------- */

interface TabState {
  selectedIndex: number;
  cards: CardData[];
  highlightIndex?: number;
  showAnnotation: boolean;
}

function getTabState(frame: number): TabState {
  if (frame < 65) {
    return { selectedIndex: 0, cards: newCards, showAnnotation: false };
  }
  if (frame < 110) {
    return { selectedIndex: 1, cards: allCards, highlightIndex: 1, showAnnotation: true };
  }
  if (frame < 130) {
    return { selectedIndex: 2, cards: applyingCards, showAnnotation: false };
  }
  // Check Later is index 4
  return { selectedIndex: 4, cards: checkLaterCards, showAnnotation: false };
}

/** Frame at which the current tab's cards started appearing. */
function getCardEntryFrame(frame: number): number {
  if (frame < 65) return 30;
  if (frame < 110) return 70;
  if (frame < 130) return 115;
  return 135;
}

/** Frame at which the outgoing cards begin fading out. */
function getTransitionFrame(frame: number): number | null {
  if (frame >= 62 && frame < 70) return 62;
  if (frame >= 108 && frame < 115) return 108;
  if (frame >= 128 && frame < 135) return 128;
  return null;
}

/* ---------- Component ---------- */

export const FeatureFilterChips: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* Phone fade in: frames 0-20 */
  const phoneOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  /* Current tab state */
  const { selectedIndex, cards, highlightIndex, showAnnotation } = getTabState(frame);

  /* Card entry timing */
  const cardEntryStart = getCardEntryFrame(frame);

  /* Crossfade: during transition windows the outgoing cards fade out */
  const transitionStart = getTransitionFrame(frame);
  const isTransitioning = transitionStart !== null;

  const transitionOutOpacity = isTransitioning
    ? interpolate(frame, [transitionStart!, transitionStart! + 8], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 1;

  /* Annotation opacity: visible roughly frames 65-110, fade in and out */
  const annotationOpacity = interpolate(
    frame,
    [65, 72, 100, 110],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  /* Bottom label: "Jobs move between inboxes" frames 180-210 */
  const bottomLabelOpacity = interpolate(
    frame,
    [180, 190],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

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
      <div style={{ opacity: phoneOpacity }}>
        <IPhoneFrame>
          {/* Nav title */}
          <div
            style={{
              padding: "12px 16px 8px",
              fontSize: 28,
              fontWeight: 700,
              color: "#fff",
              fontFamily: theme.font.display,
            }}
          >
            Jobs
          </div>

          {/* Filter chip bar */}
          <FilterChipBar
            chips={chips}
            selectedIndex={selectedIndex}
            highlightIndex={highlightIndex}
          />

          {/* Annotation: "Now always visible" below chip bar */}
          {showAnnotation && (
            <div
              style={{
                opacity: annotationOpacity,
                padding: "6px 16px 0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* Small upward arrow */}
              <svg
                width={12}
                height={8}
                viewBox="0 0 12 8"
                style={{ marginBottom: 2 }}
              >
                <polygon points="6,0 12,8 0,8" fill={theme.colors.accent} />
              </svg>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: theme.colors.accent,
                  fontFamily: theme.font.body,
                }}
              >
                Now always visible
              </span>
            </div>
          )}

          {/* Card list */}
          <div
            style={{
              flex: 1,
              overflow: "hidden",
              marginTop: 4,
            }}
          >
            {!isTransitioning &&
              cards.map((card, i) => {
                const cardDelay = cardEntryStart + i * 5;
                return (
                  <FadeIn key={`${selectedIndex}-${card.company}-${card.title}`} delay={cardDelay} direction="up" distance={20}>
                    <IOSJobCard {...card} />
                  </FadeIn>
                );
              })}

            {isTransitioning &&
              cards.map((card, i) => (
                <div
                  key={`out-${selectedIndex}-${card.company}-${card.title}`}
                  style={{ opacity: transitionOutOpacity }}
                >
                  <IOSJobCard {...card} />
                </div>
              ))}
          </div>
        </IPhoneFrame>
      </div>

      {/* Bottom label */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: bottomLabelOpacity,
        }}
      >
        <span
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: theme.colors.muted,
            fontFamily: theme.font.body,
          }}
        >
          Jobs move between inboxes
        </span>
      </div>
    </div>
  );
};
