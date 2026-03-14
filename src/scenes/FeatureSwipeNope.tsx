import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { FadeIn } from "../components/FadeIn";
import { IPhoneFrame } from "../components/iPhoneFrame";
import { FilterChipBar } from "../components/FilterChipBar";
import { iOSJobCard as IOSJobCard } from "../components/iOSJobCard";
import { ToastNotification } from "../components/ToastNotification";
import { theme } from "../theme";

const ThumbsDownIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 22,
  color,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z" />
  </svg>
);

export const FeatureSwipeNope: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phone fade in (frames 0-15)
  const phoneOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Swipe animation for card 1 (starts frame 40)
  const swipeStart = 40;
  const swipeProgress = spring({
    frame: Math.max(0, frame - swipeStart),
    fps,
    config: { damping: 20, stiffness: 50 },
  });
  // Card slides RIGHT (positive translateX)
  const cardSwipeX = interpolate(swipeProgress, [0, 1], [0, 380]);

  // Reveal width grows as card moves right
  const revealWidth = interpolate(swipeProgress, [0, 1], [0, 380], {
    extrapolateRight: "clamp",
  });
  const revealOpacity = interpolate(swipeProgress, [0, 0.2, 1], [0, 1, 1]);

  // Card 1 disappears after swipe completes
  const card1Gone = frame > 65;

  // Card 2 slides up to fill gap (starts frame 70)
  const collapseStart = 70;
  const collapseProgress = spring({
    frame: Math.max(0, frame - collapseStart),
    fps,
    config: { damping: 18, stiffness: 80 },
  });
  const card2SlideUp = card1Gone
    ? interpolate(collapseProgress, [0, 1], [100, 0])
    : 0;

  return (
    <div style={{ opacity: phoneOpacity }}>
      <IPhoneFrame>
        {/* Nav title */}
        <div
          style={{
            padding: "12px 16px 8px",
            fontSize: 24,
            fontWeight: 700,
            color: "#fff",
            fontFamily: theme.font.display,
          }}
        >
          Jobs
        </div>

        {/* Filter chips */}
        <FilterChipBar
          chips={[
            "New",
            "All",
            "Applying",
            "Applied",
            "Check Later",
            "Not Interested",
          ]}
          selectedIndex={0}
        />

        {/* Annotation: "Swipe right to pass" */}
        {frame >= 15 && frame < 90 && (
          <FadeIn delay={0}>
            <div
              style={{
                padding: "6px 16px",
                fontSize: 11,
                color: "#ef4444",
                fontFamily: theme.font.body,
              }}
            >
              Swipe right to pass {"\u2192"}
            </div>
          </FadeIn>
        )}

        {/* Job list */}
        <div style={{ position: "relative", overflow: "hidden", flex: 1 }}>
          {/* Card 0 - Stripe (static) */}
          <IOSJobCard
            company="Stripe"
            logoColor="#635bff"
            title="Product Manager, Payments"
            location="San Francisco, CA"
            timeAgo="2h"
            isNew
            roleBadge={{ text: "Product", color: "#3B82F6" }}
          />

          {/* Card 1 - Uber (swiped RIGHT with red reveal on LEFT) */}
          {!card1Gone && (
            <div style={{ position: "relative" }}>
              {/* Red reveal behind the card (on LEFT side) */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: revealWidth,
                  opacity: revealOpacity,
                  background: "rgba(239,68,68,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  overflow: "hidden",
                }}
              >
                {swipeProgress > 0.3 && (
                  <>
                    <ThumbsDownIcon size={18} color="#ef4444" />
                    <span
                      style={{
                        color: "#ef4444",
                        fontSize: 14,
                        fontWeight: 700,
                        fontFamily: theme.font.display,
                      }}
                    >
                      Nope
                    </span>
                  </>
                )}
              </div>

              {/* The actual card sliding right */}
              <div
                style={{
                  transform: `translateX(${cardSwipeX}px)`,
                  position: "relative",
                  zIndex: 2,
                }}
              >
                <IOSJobCard
                  company="Uber"
                  logoColor="#000000"
                  title="PM, Rider Growth"
                  location="San Francisco, CA"
                  timeAgo="8h"
                  isNew
                  roleBadge={{ text: "Product", color: "#3B82F6" }}
                />
              </div>
            </div>
          )}

          {/* Card 2 - Notion (slides up after collapse) */}
          <div style={{ transform: `translateY(${card2SlideUp}px)` }}>
            <IOSJobCard
              company="Notion"
              logoColor="#000000"
              title="Product Manager, AI"
              location="New York, NY"
              timeAgo="1d"
              isNew
              roleBadge={{ text: "Product", color: "#3B82F6" }}
            />
          </div>
        </div>

        {/* Toast notification */}
        <ToastNotification
          message="Moved to Not Interested"
          iconColor="#ef4444"
          enterFrame={85}
        />
      </IPhoneFrame>
    </div>
  );
};
