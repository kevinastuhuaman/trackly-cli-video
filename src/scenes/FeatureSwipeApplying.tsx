import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { FadeIn } from "../components/FadeIn";
import { IPhoneFrame } from "../components/iPhoneFrame";
import { FilterChipBar } from "../components/FilterChipBar";
import { iOSJobCard as IOSJobCard } from "../components/iOSJobCard";
import { ToastNotification } from "../components/ToastNotification";
import { theme } from "../theme";

const SendIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 22,
  color = "#fff",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" fill={color} />
  </svg>
);

export const FeatureSwipeApplying: React.FC = () => {
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
  const cardSwipeX = interpolate(swipeProgress, [0, 1], [0, -380]);

  // Reveal width grows as card moves left
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

        {/* Annotation: "Swipe left to apply" */}
        {frame >= 15 && frame < 90 && (
          <FadeIn delay={0}>
            <div
              style={{
                padding: "6px 16px",
                fontSize: 11,
                color: theme.colors.accent,
                fontFamily: theme.font.body,
              }}
            >
              {"\u2190"} Swipe left to apply
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

          {/* Card 1 - Figma (swiped with reveal behind) */}
          {!card1Gone && (
            <div style={{ position: "relative" }}>
              {/* Purple reveal behind the card */}
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  bottom: 0,
                  width: revealWidth,
                  opacity: revealOpacity,
                  background: "rgba(168,85,247,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  overflow: "hidden",
                }}
              >
                {swipeProgress > 0.3 && (
                  <>
                    <SendIcon size={18} color="#A855F7" />
                    <span
                      style={{
                        color: "#A855F7",
                        fontSize: 14,
                        fontWeight: 700,
                        fontFamily: theme.font.display,
                      }}
                    >
                      Applying
                    </span>
                  </>
                )}
              </div>

              {/* The actual card sliding left */}
              <div
                style={{
                  transform: `translateX(${cardSwipeX}px)`,
                  position: "relative",
                  zIndex: 2,
                }}
              >
                <IOSJobCard
                  company="Figma"
                  logoColor="#1ABCFE"
                  title="Senior PM, Editor Platform"
                  location="San Francisco, CA"
                  timeAgo="5h"
                  isNew
                  roleBadge={{ text: "Design", color: "#EC4899" }}
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
          message="Moved to Applying"
          iconColor="#A855F7"
          enterFrame={85}
        />
      </IPhoneFrame>
    </div>
  );
};
