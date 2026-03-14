import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { FadeIn } from "../components/FadeIn";
import { IPhoneFrame } from "../components/iPhoneFrame";
import { NotificationBanner } from "../components/NotificationBanner";
import { CompanyDetailHeader } from "../components/CompanyDetailHeader";
import { iOSJobCard as IOSJobCard } from "../components/iOSJobCard";
import { TouchIndicator } from "../components/TouchIndicator";
import { TabBar } from "../components/TabBar";
import { PerkLabel } from "../components/PerkLabel";
import { theme } from "../theme";

const FONT_FAMILY = theme.font.body;

const PHASE2_START = 90;
const TAP_FRAME = 70;

const STRIPE_LOGO = "https://www.google.com/s2/favicons?domain=www.stripe.com&sz=128";

// Touch indicator inside phone content area
// Clock: paddingTop(60) + clockHeight(70) + marginBottom(40) = 170px to banner top
// Banner: position absolute top 16, centered, ~80px tall → center Y ≈ 210
const bannerTaps = [{ x: 190, y: 210, frame: TAP_FRAME - 4 }];

export const FavSmartNotifications: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isPhase1 = frame < PHASE2_START;

  const isTapping = frame >= TAP_FRAME && frame < TAP_FRAME + 8;
  const tapScale = isTapping
    ? interpolate(frame, [TAP_FRAME, TAP_FRAME + 3, TAP_FRAME + 8], [1, 0.96, 1], { extrapolateRight: "clamp" })
    : 1;

  const crossfadeProgress =
    frame >= PHASE2_START
      ? spring({ frame: Math.max(0, frame - PHASE2_START), fps, config: { damping: 18, stiffness: 80 } })
      : 0;

  const phase1Opacity = frame >= PHASE2_START ? interpolate(crossfadeProgress, [0, 1], [1, 0]) : 1;
  const phase2Opacity = crossfadeProgress;

  // Annotation for Phase 1
  const annProgress = spring({ frame: Math.max(0, frame - 35), fps, config: { damping: 18, stiffness: 80 } });
  const annOpacity = isPhase1 ? interpolate(annProgress, [0, 1], [0, 1]) : 0;
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
      {/* Perk label — centered top */}
      <PerkLabel text="Focused Alerts" />

      {/* Phase 1: Phone with lock screen notification */}
      {isPhase1 && (
        <div
          style={{
            opacity: phase1Opacity,
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
          {/* Phone — same marginRight as FavHowToStar */}
          <div style={{ marginRight: 40 }}>
            <IPhoneFrame screenBackground="#000000">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                  position: "relative",
                }}
              >
                {/* Lock screen time */}
                <FadeIn delay={0} direction="none">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 4,
                      paddingTop: 60,
                      marginBottom: 40,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 56,
                        fontWeight: 700,
                        color: theme.colors.white,
                        fontFamily: FONT_FAMILY,
                        letterSpacing: -2,
                        lineHeight: 1,
                      }}
                    >
                      9:05
                    </span>
                    <span
                      style={{
                        fontSize: 14,
                        color: theme.colors.muted,
                        fontFamily: FONT_FAMILY,
                        fontWeight: 400,
                      }}
                    >
                      Thursday, March 13
                    </span>
                  </div>
                </FadeIn>

                {/* Notification banner */}
                <div style={{ transform: `scale(${tapScale})`, width: "100%" }}>
                  <NotificationBanner
                    appName="Trackly"
                    title="Stripe posted 3 new roles today"
                    body="Tap to see the latest roles"
                    enterFrame={20}
                  />
                </div>

                <TouchIndicator taps={bannerTaps} zIndex={250} />
              </div>
            </IPhoneFrame>
          </div>

          {/* Annotation text on right — same position as FavHowToStar */}
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
                Get alerts when favorites post new jobs
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Phase 2: Company detail in phone frame */}
      {!isPhase1 && (
        <div
          style={{
            opacity: phase2Opacity,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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
                position: "relative",
              }}
            >
              <CompanyDetailHeader
                name="Stripe"
                domain="stripe.com"
                jobCount={3}
                isFavorite={true}
                logoInitial="S"
                logoUrl={STRIPE_LOGO}
              />

              <div style={{ display: "flex", flexDirection: "column" }}>
                <FadeIn delay={10} direction="up" distance={15}>
                  <IOSJobCard company="Stripe" logoColor="#635bff" logoUrl={STRIPE_LOGO} title="Product Manager, Payments" location="SF, CA" timeAgo="2h" isNew={true} />
                </FadeIn>
                <FadeIn delay={18} direction="up" distance={15}>
                  <IOSJobCard company="Stripe" logoColor="#635bff" logoUrl={STRIPE_LOGO} title="PM Intern, Connect" location="SF, CA" timeAgo="3h" isNew={true} />
                </FadeIn>
                <FadeIn delay={26} direction="up" distance={15}>
                  <IOSJobCard company="Stripe" logoColor="#635bff" logoUrl={STRIPE_LOGO} title="Technical PM, Billing" location="Remote" timeAgo="5h" isNew={true} />
                </FadeIn>
              </div>

              {/* Tab bar */}
              <TabBar activeTab="companies" />
            </div>
          </IPhoneFrame>
        </div>
      )}
    </div>
  );
};
