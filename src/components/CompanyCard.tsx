import React from "react";
import { Img } from "remotion";
import { theme } from "../theme";
import { StarIcon } from "./StarIcon";

interface CompanyCardProps {
  name: string;
  domain: string;
  jobCount: number;
  isFavorite: boolean;
  logoInitial?: string;
  logoUrl?: string;
  style?: React.CSSProperties;
  onStarAnimateAt?: number;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({
  name,
  domain,
  jobCount,
  isFavorite,
  logoInitial,
  logoUrl,
  style,
  onStarAnimateAt,
}) => {
  const initial = logoInitial || name.charAt(0).toUpperCase();
  const accentColor = theme.colors.accent;

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        paddingLeft: 14,
        paddingRight: 14,
        paddingTop: 12,
        paddingBottom: 12,
        background: theme.colors.surface,
        borderRadius: 16,
        border: "1px solid #2F3336",
        fontFamily: theme.font.body,
        boxSizing: "border-box",
        ...style,
      }}
    >
      {/* Logo circle */}
      <div
        style={{
          width: 52,
          height: 52,
          minWidth: 52,
          borderRadius: "50%",
          background: "#18181B",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {logoUrl ? (
          <Img src={logoUrl} width={52} height={52} style={{ objectFit: "cover" }} />
        ) : (
          <span
            style={{
              color: "#FFFFFF",
              fontSize: 20,
              fontWeight: 700,
              lineHeight: 1,
              fontFamily: theme.font.body,
            }}
          >
            {initial}
          </span>
        )}
      </div>

      {/* Name + domain stack */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          flex: 1,
          minWidth: 0,
        }}
      >
        <span
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: theme.colors.white,
            lineHeight: 1.3,
            fontFamily: theme.font.body,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {name}
        </span>
        <span
          style={{
            fontSize: 13,
            color: theme.colors.muted,
            lineHeight: 1.3,
            fontFamily: theme.font.body,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {domain}
        </span>
      </div>

      {/* Metric pill */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 5,
          paddingBottom: 5,
          borderRadius: 999,
          background: hexToRgba(accentColor, 0.15),
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: accentColor,
            lineHeight: 1.2,
            fontFamily: theme.font.body,
          }}
        >
          {jobCount}
        </span>
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: accentColor,
            lineHeight: 1.2,
            fontFamily: theme.font.body,
          }}
        >
          Jobs
        </span>
      </div>

      {/* Star icon */}
      <StarIcon
        filled={isFavorite}
        size={22}
        animateAt={onStarAnimateAt}
      />

      {/* Chevron right */}
      <svg
        width={12}
        height={12}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        <path
          d="M9 18l6-6-6-6"
          stroke={theme.colors.muted}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

function hexToRgba(hex: string, alpha: number): string {
  const cleaned = hex.replace("#", "");
  const r = parseInt(cleaned.substring(0, 2), 16);
  const g = parseInt(cleaned.substring(2, 4), 16);
  const b = parseInt(cleaned.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}
