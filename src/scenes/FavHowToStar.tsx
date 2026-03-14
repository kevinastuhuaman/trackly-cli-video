import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { IPhoneFrame } from "../components/iPhoneFrame";
import { CompanyCard } from "../components/CompanyCard";
import { TouchIndicator, TapEvent } from "../components/TouchIndicator";
import { TabBar } from "../components/TabBar";
import { theme } from "../theme";

const FONT_FAMILY = theme.font.body;

// Timeline constants
const STAR_STRIPE = 40;
const STAR_AMAZON = 70;
const STAR_NOTION = 100;
const ANNOTATION1_FADEOUT = 120;
const ANNOTATION2_FADEIN = 128;
const TOUCH_FAVS = 131;
const SWITCH_FAVS = 135;
const CARDS_FADEOUT = 150;

// Company data with real favicon URLs
const companies = [
  { name: "Stripe", domain: "stripe.com", jobCount: 12, initial: "S", logoUrl: "https://www.google.com/s2/favicons?domain=www.stripe.com&sz=128", starred: true, starAt: STAR_STRIPE },
  { name: "Google", domain: "google.com", jobCount: 89, initial: "G", logoUrl: "https://www.google.com/s2/favicons?domain=www.google.com&sz=128", starred: false, starAt: undefined },
  { name: "Amazon", domain: "amazon.jobs", jobCount: 47, initial: "A", logoUrl: "https://www.google.com/s2/favicons?domain=www.amazon.com&sz=128", starred: true, starAt: STAR_AMAZON },
  { name: "Meta", domain: "meta.com", jobCount: 34, initial: "M", logoUrl: "https://www.google.com/s2/favicons?domain=www.meta.com&sz=128", starred: false, starAt: undefined },
  { name: "Notion", domain: "notion.so", jobCount: 8, initial: "N", logoUrl: "https://www.google.com/s2/favicons?domain=www.notion.so&sz=128", starred: true, starAt: STAR_NOTION },
];

// Card height: 78px (12+52+12 padding + 2px border) + 8px gap = 86px per slot
const CARD_SLOT = 86;

// Touch indicator positions (in phone content area coordinates)
const starTaps: TapEvent[] = [
  { x: 319, y: 139, frame: STAR_STRIPE - 4 },
  { x: 319, y: 311, frame: STAR_AMAZON - 4 },
  { x: 319, y: 483, frame: STAR_NOTION - 4 },
  { x: 260, y: 63, frame: TOUCH_FAVS },
];

// Sliding segmented control
const SlidingSegmentedControl: React.FC<{ switchProgress: number }> = ({
  switchProgress,
}) => {
  const controlWidth = 348;
  const segmentWidth = (controlWidth - 4) / 2;
  const highlightX = interpolate(switchProgress, [0, 1], [2, segmentWidth + 2]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        borderRadius: 10,
        overflow: "hidden",
        background: "rgba(255, 255, 255, 0.06)",
        padding: 2,
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 2,
          left: highlightX,
          width: segmentWidth,
          height: "calc(100% - 4px)",
          borderRadius: 8,
          background: theme.colors.accent,
          zIndex: 0,
        }}
      />
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 7,
          paddingBottom: 7,
          borderRadius: 8,
          fontFamily: FONT_FAMILY,
          fontSize: 13,
          fontWeight: 600,
          color: switchProgress < 0.5 ? "#FFFFFF" : theme.colors.muted,
          position: "relative",
          zIndex: 1,
        }}
      >
        All
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 7,
          paddingBottom: 7,
          borderRadius: 8,
          fontFamily: FONT_FAMILY,
          fontSize: 13,
          fontWeight: 600,
          color: switchProgress >= 0.5 ? "#FFFFFF" : theme.colors.muted,
          position: "relative",
          zIndex: 1,
        }}
      >
        Favs
      </div>
    </div>
  );
};

export const FavHowToStar: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const switchProgress =
    frame >= SWITCH_FAVS
      ? spring({
          frame: Math.max(0, frame - SWITCH_FAVS),
          fps,
          config: { damping: 15, stiffness: 120 },
        })
      : 0;

  const cardsFading = frame >= CARDS_FADEOUT;
  const fadeProgress = cardsFading
    ? Math.min(
        1,
        spring({
          frame: Math.max(0, frame - CARDS_FADEOUT),
          fps,
          config: { damping: 20, stiffness: 80 },
        })
      )
    : 0;

  // Annotation 1 opacity
  const ann1Visible = frame >= 25;
  const ann1Progress = ann1Visible
    ? spring({ frame: Math.max(0, frame - 25), fps, config: { damping: 18, stiffness: 80 } })
    : 0;
  const ann1Opacity =
    frame >= ANNOTATION1_FADEOUT
      ? interpolate(frame, [ANNOTATION1_FADEOUT, ANNOTATION1_FADEOUT + 8], [1, 0], {
          extrapolateRight: "clamp",
        })
      : ann1Progress;
  const ann1TranslateY = interpolate(ann1Progress, [0, 1], [15, 0]);

  // Annotation 2 opacity
  const ann2Opacity =
    frame >= ANNOTATION2_FADEIN
      ? interpolate(frame, [ANNOTATION2_FADEIN, ANNOTATION2_FADEIN + 8], [0, 1], {
          extrapolateRight: "clamp",
        })
      : 0;

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
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: theme.colors.white,
                  fontFamily: FONT_FAMILY,
                  letterSpacing: -0.5,
                }}
              >
                Companies
              </span>
            </div>

            {/* Segmented control */}
            <div style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 12 }}>
              <SlidingSegmentedControl switchProgress={switchProgress} />
            </div>

            {/* Company cards — use absolute positioning to control layout precisely */}
            <div
              style={{
                position: "relative",
                paddingLeft: 12,
                paddingRight: 12,
              }}
            >
              {companies.map((company, i) => {
                const isUnfav = !company.starred;

                // Unfav cards: fade out and collapse height
                const cardOpacity = isUnfav ? interpolate(fadeProgress, [0, 1], [1, 0]) : 1;
                // Collapse: unfav cards shrink to 0 height, closing the gap naturally
                const cardHeight = isUnfav
                  ? interpolate(fadeProgress, [0, 1], [78, 0])
                  : 78;
                const cardMarginBottom = isUnfav
                  ? interpolate(fadeProgress, [0, 1], [8, 0])
                  : 8;

                return (
                  <div
                    key={company.name}
                    style={{
                      opacity: cardOpacity,
                      height: cardHeight,
                      marginBottom: cardMarginBottom,
                      overflow: "hidden",
                    }}
                  >
                    <CompanyCard
                      name={company.name}
                      domain={company.domain}
                      jobCount={company.jobCount}
                      isFavorite={false}
                      logoInitial={company.initial}
                      logoUrl={company.logoUrl}
                      onStarAnimateAt={company.starAt}
                    />
                  </div>
                );
              })}
            </div>

            {/* Touch indicators */}
            <TouchIndicator taps={starTaps} zIndex={50} />

            {/* Tab bar */}
            <TabBar activeTab="companies" />
          </div>
        </IPhoneFrame>
      </div>

      {/* Annotation text on the right side */}
      <div
        style={{
          position: "absolute",
          right: 50,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          maxWidth: 240,
        }}
      >
        {/* Annotation 1 */}
        <div
          style={{
            opacity: ann1Opacity,
            transform: `translateY(${ann1TranslateY}px)`,
          }}
        >
          <span
            style={{
              fontSize: 24,
              fontWeight: 600,
              color: theme.colors.white,
              fontFamily: FONT_FAMILY,
              lineHeight: 1.4,
            }}
          >
            Star the companies you care about
          </span>
        </div>

        {/* Annotation 2 */}
        <div style={{ opacity: ann2Opacity, position: "absolute", top: 0 }}>
          <span
            style={{
              fontSize: 24,
              fontWeight: 600,
              color: theme.colors.white,
              fontFamily: FONT_FAMILY,
              lineHeight: 1.4,
            }}
          >
            Switch to Favs
          </span>
        </div>
      </div>
    </div>
  );
};
