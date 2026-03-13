import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { FadeIn } from "../components/FadeIn";
import { IPhoneFrame } from "../components/iPhoneFrame";
import { NotificationBanner } from "../components/NotificationBanner";
import { CompanyDetailHeader } from "../components/CompanyDetailHeader";
import { iOSJobCard as IOSJobCard } from "../components/iOSJobCard";
import { theme } from "../theme";

const FONT_FAMILY = theme.font.body;

const PHASE2_START = 90;
const TAP_FRAME = 70;

export const FavSmartNotifications: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isPhase1 = frame < PHASE2_START;

  // Tap animation on notification banner
  const isTapping = frame >= TAP_FRAME && frame < TAP_FRAME + 8;
  const tapScale = isTapping
    ? interpolate(frame, [TAP_FRAME, TAP_FRAME + 3, TAP_FRAME + 8], [1, 0.96, 1], {
        extrapolateRight: "clamp",
      })
    : 1;

  // Crossfade between phases
  const crossfadeProgress =
    frame >= PHASE2_START
      ? spring({
          frame: Math.max(0, frame - PHASE2_START),
          fps,
          config: { damping: 18, stiffness: 80 },
        })
      : 0;

  const phase1Opacity = frame >= PHASE2_START
    ? interpolate(crossfadeProgress, [0, 1], [1, 0])
    : 1;

  const phase2Opacity = crossfadeProgress;

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
      {/* Phase 1: Lock screen with notification */}
      {isPhase1 && (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingTop: 180,
            opacity: phase1Opacity,
            position: "absolute",
            top: 0,
            left: 0,
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
                marginBottom: 80,
              }}
            >
              <span
                style={{
                  fontSize: 72,
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
                  fontSize: 18,
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
          <div
            style={{
              transform: `scale(${tapScale})`,
              width: 400,
            }}
          >
            <NotificationBanner
              appName="Trackly"
              title="Stripe posted 3 new roles today"
              body="Tap to see the latest roles"
              enterFrame={20}
            />
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
              }}
            >
              <CompanyDetailHeader
                name="Stripe"
                domain="stripe.com"
                jobCount={3}
                isFavorite={true}
                logoInitial="S"
              />

              {/* Job cards */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <FadeIn delay={10} direction="up" distance={15}>
                  <IOSJobCard
                    company="Stripe"
                    logoColor="#635bff"
                    title="Product Manager, Payments"
                    location="SF, CA"
                    timeAgo="2h"
                    isNew={true}
                  />
                </FadeIn>
                <FadeIn delay={18} direction="up" distance={15}>
                  <IOSJobCard
                    company="Stripe"
                    logoColor="#635bff"
                    title="PM Intern, Connect"
                    location="SF, CA"
                    timeAgo="3h"
                    isNew={true}
                  />
                </FadeIn>
                <FadeIn delay={26} direction="up" distance={15}>
                  <IOSJobCard
                    company="Stripe"
                    logoColor="#635bff"
                    title="Technical PM, Billing"
                    location="Remote"
                    timeAgo="5h"
                    isNew={true}
                  />
                </FadeIn>
              </div>
            </div>
          </IPhoneFrame>
        </div>
      )}
    </div>
  );
};
