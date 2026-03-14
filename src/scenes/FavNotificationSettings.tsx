import React from "react";
import { Audio, Sequence, useCurrentFrame, useVideoConfig, spring, interpolate, staticFile, Img } from "remotion";
import { FadeIn } from "../components/FadeIn";
import { IPhoneFrame } from "../components/iPhoneFrame";
import { TouchIndicator, TapEvent } from "../components/TouchIndicator";
import { TabBar } from "../components/TabBar";
import { PerkLabel } from "../components/PerkLabel";
import { theme } from "../theme";

const FONT_FAMILY = theme.font.body;

// Toggle animation: tap the "Only from Favorites" toggle at frame 80
// Y position: Settings header(38) + Section1 header(22) + preview(46) + toggle(36) + gap(6)
//   + JobType(30) + Location(30) + gap(10) + Section2 header(22) + preview(46) + toggle center(18) ≈ 304
const TOGGLE_TAP_FRAME = 80;
const toggleTaps: TapEvent[] = [{ x: 340, y: 308, frame: TOGGLE_TAP_FRAME }];

// Mini notification preview banner (matches real iOS notification style)
const NotifPreview: React.FC<{
  title: string;
  subtitle: string;
  timestamp: string;
  showStar?: boolean;
  delay: number;
}> = ({ title, subtitle, timestamp, showStar = false, delay }) => {
  return (
    <FadeIn delay={delay} direction="up" distance={10}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 10px",
          borderRadius: 14,
          background: "rgba(255,255,255,0.08)",
          border: "0.5px solid rgba(255,255,255,0.1)",
          marginBottom: 6,
        }}
      >
        {/* Trackly app icon */}
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 6,
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <Img src={staticFile("trackly-appicon.png")} width={28} height={28} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: theme.colors.white,
                fontFamily: FONT_FAMILY,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {title}
              {showStar && " ⭐"}
            </span>
            <span style={{ fontSize: 9, color: theme.colors.muted, fontFamily: FONT_FAMILY, flexShrink: 0, marginLeft: 4 }}>
              {timestamp}
            </span>
          </div>
          <span style={{ fontSize: 10, color: theme.colors.muted, fontFamily: FONT_FAMILY }}>
            {subtitle}
          </span>
        </div>
      </div>
    </FadeIn>
  );
};

// Settings section with header + notification preview + toggle
const SettingsSection: React.FC<{
  icon: string;
  label: string;
  previewTitle: string;
  previewSubtitle: string;
  previewTimestamp: string;
  showStar?: boolean;
  toggleLabel: string;
  toggleSubtitle: string;
  isOn: boolean;
  delay: number;
  accentColor?: string;
}> = ({
  icon,
  label,
  previewTitle,
  previewSubtitle,
  previewTimestamp,
  showStar,
  toggleLabel,
  toggleSubtitle,
  isOn,
  delay,
  accentColor = theme.colors.accent,
}) => {
  return (
    <FadeIn delay={delay} direction="up" distance={12}>
      <div style={{ marginBottom: 10 }}>
        {/* Section header */}
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 6, paddingLeft: 2 }}>
          <span style={{ fontSize: 10, color: theme.colors.muted, fontFamily: FONT_FAMILY }}>{icon}</span>
          <span
            style={{
              fontSize: 10,
              fontWeight: 600,
              color: theme.colors.muted,
              fontFamily: FONT_FAMILY,
              textTransform: "uppercase",
              letterSpacing: 0.8,
            }}
          >
            {label}
          </span>
        </div>

        {/* Notification preview */}
        <NotifPreview
          title={previewTitle}
          subtitle={previewSubtitle}
          timestamp={previewTimestamp}
          showStar={showStar}
          delay={delay + 8}
        />

        {/* Toggle row */}
        <FadeIn delay={delay + 14} direction="none">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "8px 12px",
              borderRadius: 12,
              background: "rgba(255,255,255,0.04)",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: theme.colors.white, fontFamily: FONT_FAMILY }}>
                {toggleLabel}
              </span>
              <span style={{ fontSize: 9, color: theme.colors.muted, fontFamily: FONT_FAMILY }}>
                {toggleSubtitle}
              </span>
            </div>

            {/* iOS-style toggle */}
            <div
              style={{
                width: 38,
                height: 22,
                borderRadius: 11,
                background: isOn ? accentColor : "rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                padding: 2,
                transition: "background 0.3s",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 9,
                  background: "#fff",
                  transform: isOn ? "translateX(16px)" : "translateX(0px)",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                }}
              />
            </div>
          </div>
        </FadeIn>
      </div>
    </FadeIn>
  );
};

export const FavNotificationSettings: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Toggle animates ON at TOGGLE_TAP_FRAME
  const toggleIsOn = frame >= TOGGLE_TAP_FRAME + 6;

  // Annotation text
  const annProgress = spring({ frame: Math.max(0, frame - 40), fps, config: { damping: 18, stiffness: 80 } });
  const annOpacity = interpolate(annProgress, [0, 1], [0, 1]);
  const annTranslateY = interpolate(annProgress, [0, 1], [15, 0]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: theme.colors.bg,
        position: "relative",
      }}
    >
      {/* Perk label */}
      <PerkLabel text="Smart Alerts" />

      {/* Phone + Annotation layout */}
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        {/* Phone */}
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
              {/* Settings header */}
              <FadeIn delay={0} direction="none">
                <div
                  style={{
                    padding: "12px 16px 8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: theme.colors.white,
                      fontFamily: FONT_FAMILY,
                    }}
                  >
                    Settings
                  </span>
                </div>
              </FadeIn>

              {/* Scrollable settings content */}
              <div style={{ padding: "4px 14px", display: "flex", flexDirection: "column" }}>
                {/* Section 1: Real-time Job Alerts */}
                <SettingsSection
                  icon="🔔"
                  label="Real-time Job Alerts"
                  previewTitle="New: Senior PM at Stripe"
                  previewSubtitle="Stripe · San Francisco"
                  previewTimestamp="2m ago"
                  toggleLabel="Job Functions"
                  toggleSubtitle="Product, Engineering +2 more"
                  isOn={true}
                  delay={10}
                />
                {/* Extra filter rows for Real-time section */}
                <FadeIn delay={22} direction="none">
                  <div style={{ marginTop: -6, marginBottom: 10 }}>
                    {/* Job Type row */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "7px 12px",
                        borderRadius: 10,
                        background: "rgba(255,255,255,0.04)",
                        marginBottom: 2,
                      }}
                    >
                      <span style={{ fontSize: 12, fontWeight: 500, color: theme.colors.white, fontFamily: FONT_FAMILY }}>Job Type</span>
                      <span style={{ fontSize: 11, color: theme.colors.muted, fontFamily: FONT_FAMILY }}>All ›</span>
                    </div>
                    {/* Location row */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "7px 12px",
                        borderRadius: 10,
                        background: "rgba(255,255,255,0.04)",
                      }}
                    >
                      <span style={{ fontSize: 12, fontWeight: 500, color: theme.colors.white, fontFamily: FONT_FAMILY }}>Location</span>
                      <span style={{ fontSize: 11, color: theme.colors.muted, fontFamily: FONT_FAMILY }}>US ›</span>
                    </div>
                  </div>
                </FadeIn>

                {/* Section 2: Favorites Only */}
                <SettingsSection
                  icon="⭐"
                  label="Favorites Only"
                  previewTitle="New: ML Engineer at Anthropic"
                  previewSubtitle="Anthropic · San Francisco"
                  previewTimestamp="5m ago"
                  showStar={true}
                  toggleLabel="Only from Favorites"
                  toggleSubtitle="Limit to starred companies"
                  isOn={toggleIsOn}
                  delay={35}
                  accentColor={theme.colors.accent}
                />

                {/* Section 3: Daily Digest */}
                <SettingsSection
                  icon="✉️"
                  label="Daily Digest"
                  previewTitle="3 new jobs from favorites"
                  previewSubtitle="Anthropic posted new roles"
                  previewTimestamp="8:00 AM"
                  toggleLabel="Daily Favorites Digest"
                  toggleSubtitle="Morning summary"
                  isOn={true}
                  delay={60}
                />
              </div>

              {/* Tab bar */}
              <TabBar activeTab="settings" />

              {/* Touch indicator for the favorites toggle */}
              <TouchIndicator taps={toggleTaps} zIndex={250} />
            </div>
          </IPhoneFrame>
        </div>

        {/* Annotation text on right */}
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
                display: "block",
              }}
            >
              Hyper-customize which alerts you receive
            </span>
            <span
              style={{
                fontSize: 18,
                fontWeight: 500,
                color: theme.colors.accentBright,
                fontFamily: FONT_FAMILY,
                lineHeight: 1.5,
                display: "block",
                marginTop: 12,
              }}
            >
              Only get alerts from your favorite companies (optional)
            </span>
          </div>
        </div>

        {/* Sound effect */}
        <Sequence from={TOGGLE_TAP_FRAME} durationInFrames={9} layout="none">
          <Audio src={staticFile("sfx/tap.wav")} volume={0.35} />
        </Sequence>
      </div>
    </div>
  );
};
