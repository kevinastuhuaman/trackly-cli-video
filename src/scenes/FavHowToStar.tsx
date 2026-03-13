import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { FadeIn } from "../components/FadeIn";
import { IPhoneFrame } from "../components/iPhoneFrame";
import { CompanyCard } from "../components/CompanyCard";
import { theme } from "../theme";

const FONT_FAMILY = theme.font.body;

const SegmentedControl: React.FC<{ selected: "all" | "favs" }> = ({
  selected,
}) => {
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
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 7,
          paddingBottom: 7,
          borderRadius: 8,
          background:
            selected === "all" ? theme.colors.accent : "transparent",
          fontFamily: FONT_FAMILY,
          fontSize: 13,
          fontWeight: 600,
          color:
            selected === "all" ? "#FFFFFF" : theme.colors.muted,
          transition: "all 0.3s ease",
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
          background:
            selected === "favs" ? theme.colors.accent : "transparent",
          fontFamily: FONT_FAMILY,
          fontSize: 13,
          fontWeight: 600,
          color:
            selected === "favs" ? "#FFFFFF" : theme.colors.muted,
          transition: "all 0.3s ease",
        }}
      >
        Favs
      </div>
    </div>
  );
};

export const FavHowToStar: React.FC = () => {
  const frame = useCurrentFrame();

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
              Companies
            </span>
          </div>

          {/* Segmented control */}
          <div
            style={{
              paddingLeft: 16,
              paddingRight: 16,
              paddingTop: 8,
              paddingBottom: 12,
            }}
          >
            <SegmentedControl selected="all" />
          </div>

          {/* Company cards */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              paddingLeft: 12,
              paddingRight: 12,
            }}
          >
            <CompanyCard
              name="Stripe"
              domain="stripe.com"
              jobCount={12}
              isFavorite={false}
              logoInitial="S"
              onStarAnimateAt={40}
            />
            <CompanyCard
              name="Amazon"
              domain="amazon.jobs"
              jobCount={47}
              isFavorite={false}
              logoInitial="A"
              onStarAnimateAt={70}
            />
            <CompanyCard
              name="Notion"
              domain="notion.so"
              jobCount={8}
              isFavorite={false}
              logoInitial="N"
              onStarAnimateAt={100}
            />
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
        <FadeIn delay={30} direction="up" distance={15}>
          <span
            style={{
              fontSize: 14,
              color: theme.colors.muted,
              fontFamily: FONT_FAMILY,
              textAlign: "center",
            }}
          >
            Star the companies you care about
          </span>
        </FadeIn>
      </div>
    </div>
  );
};
