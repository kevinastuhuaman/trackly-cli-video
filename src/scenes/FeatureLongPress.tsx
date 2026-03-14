import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { FadeIn } from "../components/FadeIn";
import { IPhoneFrame } from "../components/iPhoneFrame";
import { FilterChipBar } from "../components/FilterChipBar";
import { iOSJobCard as IOSJobCard } from "../components/iOSJobCard";
import { ToastNotification } from "../components/ToastNotification";
import { theme } from "../theme";

/* ---------- SVG Icons ---------- */

const SendIcon: React.FC<{ size?: number; color?: string }> = ({ size = 18, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" fill={color} />
  </svg>
);

const ClockIcon: React.FC<{ size?: number; color?: string }> = ({ size = 18, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const ThumbsDownIcon: React.FC<{ size?: number; color?: string }> = ({ size = 18, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z" />
  </svg>
);

const ExternalLinkIcon: React.FC<{ size?: number; color?: string }> = ({ size = 18, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

/* ---------- Context menu actions ---------- */

const actions = [
  { label: "Applying", icon: SendIcon, color: "#A855F7" },
  { label: "Check Later", icon: ClockIcon, color: "#fbbf24" },
  { label: "Not Interested", icon: ThumbsDownIcon, color: "#ef4444" },
  { label: "Open in Browser", icon: ExternalLinkIcon, color: "#c084fc" },
];

/* ---------- Component ---------- */

export const FeatureLongPress: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* Phone fade in: frames 0-15 */
  const phoneOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  /* ---------- Card 1 (Google) press animation ---------- */
  const pressStart = 25;
  const releaseStart = 100;

  // Scale down during press
  const pressProgress = interpolate(frame, [pressStart, pressStart + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pressScale = interpolate(pressProgress, [0, 1], [1, 0.96]);

  // Release back to 1.0
  const releaseProgress = spring({
    frame: Math.max(0, frame - releaseStart),
    fps,
    config: { damping: 15, stiffness: 100 },
  });
  const card1Scale = frame > releaseStart
    ? interpolate(releaseProgress, [0, 1], [0.96, 1])
    : pressScale;

  /* ---------- Background overlay ---------- */
  const overlayStart = 45;
  const overlayOpacity = interpolate(frame, [overlayStart, overlayStart + 8], [0, 0.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const overlayFade = frame > releaseStart
    ? interpolate(frame, [releaseStart, releaseStart + 8], [0.4, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : overlayOpacity;

  /* ---------- Context menu appear ---------- */
  const menuStart = 48;
  const menuProgress = spring({
    frame: Math.max(0, frame - menuStart),
    fps,
    config: { damping: 15, stiffness: 100 },
  });
  const menuScale = interpolate(menuProgress, [0, 1], [0.9, 1]);
  const menuOpacity = interpolate(menuProgress, [0, 1], [0, 1]);

  // Menu disappear
  const menuFadeStart = 100;
  const menuFadeProgress = frame > menuFadeStart
    ? interpolate(frame, [menuFadeStart, menuFadeStart + 8], [1, 0], {
        extrapolateRight: "clamp",
      })
    : 1;

  /* ---------- "Check Later" row highlight at frame 90 ---------- */
  const highlightStart = 90;
  const highlightProgress = interpolate(frame, [highlightStart, highlightStart + 6, highlightStart + 12], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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
            chips={["New", "All", "Applying", "Applied", "Check Later", "Not Interested"]}
            selectedIndex={0}
          />

          {/* Annotation: "Press & hold for more options" */}
          {frame >= 15 && (
            <FadeIn delay={0}>
              <div
                style={{
                  padding: "6px 16px",
                  fontSize: 11,
                  color: theme.colors.muted,
                  fontFamily: theme.font.body,
                }}
              >
                Press & hold for more options
              </div>
            </FadeIn>
          )}

          {/* Job list + overlay + context menu container */}
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

            {/* Card 1 - Google (long-pressed) */}
            <div
              style={{
                transform: `scale(${card1Scale})`,
                transformOrigin: "center center",
                position: "relative",
                zIndex: frame >= overlayStart && menuFadeProgress > 0 ? 20 : 1,
              }}
            >
              <IOSJobCard
                company="Google"
                logoColor="#4285F4"
                title="PM, Chrome Extensions"
                location="Mountain View, CA"
                timeAgo="3d"
                isNew
                roleBadge={{ text: "Product", color: "#3B82F6" }}
              />
            </div>

            {/* Card 2 - Notion (static) */}
            <IOSJobCard
              company="Notion"
              logoColor="#000000"
              title="Product Manager, AI"
              location="New York, NY"
              timeAgo="1d"
              isNew
              roleBadge={{ text: "Product", color: "#3B82F6" }}
            />

            {/* Background overlay dims entire content area */}
            {overlayFade > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `rgba(0,0,0,${overlayFade})`,
                  zIndex: 10,
                  pointerEvents: "none",
                }}
              />
            )}

            {/* Context menu (positioned above card 1 area) */}
            {frame >= menuStart && menuFadeProgress > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  left: "50%",
                  transform: `translateX(-50%) scale(${menuScale})`,
                  opacity: menuOpacity * menuFadeProgress,
                  zIndex: 30,
                  transformOrigin: "center bottom",
                }}
              >
                <div
                  style={{
                    width: 240,
                    background: "#2C2C2E",
                    border: "1px solid #3a3a3e",
                    borderRadius: 14,
                    overflow: "hidden",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
                  }}
                >
                  {actions.map((action, i) => {
                    // Staggered entry: 5 frames apart
                    const rowDelay = menuStart + i * 5;
                    const rowProgress = spring({
                      frame: Math.max(0, frame - rowDelay),
                      fps,
                      config: { damping: 15, stiffness: 100 },
                    });
                    const rowOpacity = interpolate(rowProgress, [0, 1], [0, 1]);
                    const rowY = interpolate(rowProgress, [0, 1], [8, 0]);
                    const IconComponent = action.icon;

                    // Highlight "Check Later" (index 1) at frame 90
                    const isHighlighted = i === 1;
                    const rowBg = isHighlighted
                      ? `rgba(251,191,36,${0.1 * highlightProgress})`
                      : "transparent";

                    return (
                      <div
                        key={action.label}
                        style={{
                          opacity: rowOpacity * menuFadeProgress,
                          transform: `translateY(${rowY}px)`,
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          padding: "12px 16px",
                          background: rowBg,
                          borderBottom: i < actions.length - 1 ? "1px solid #3a3a3e" : "none",
                        }}
                      >
                        <IconComponent size={18} color={action.color} />
                        <span
                          style={{
                            color: "#fff",
                            fontSize: 15,
                            fontWeight: 500,
                            fontFamily: theme.font.body,
                          }}
                        >
                          {action.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Toast notification */}
          <ToastNotification
            message="Moved to Check Later"
            iconColor="#fbbf24"
            enterFrame={110}
          />
        </IPhoneFrame>
      </div>
    </div>
  );
};
