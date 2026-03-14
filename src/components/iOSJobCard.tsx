import React from "react";
import { Img } from "remotion";

const FONT_FAMILY =
  '-apple-system, BlinkMacSystemFont, "Inter", system-ui, sans-serif';

const ROLE_COLORS: Record<string, string> = {
  Product: "#3B82F6",
  Engineering: "#6366F1",
  Design: "#EC4899",
  Data: "#A855F7",
  Marketing: "#F97316",
};

interface iOSJobCardProps {
  company: string;
  logoColor: string;
  logoUrl?: string;
  title: string;
  location: string;
  timeAgo: string;
  isNew?: boolean;
  roleBadge?: { text: string; color: string };
  statusBadge?: { text: string; color: string };
  style?: React.CSSProperties;
}

export const iOSJobCard: React.FC<iOSJobCardProps> = ({
  company,
  logoColor,
  logoUrl,
  title,
  location,
  timeAgo,
  isNew = false,
  roleBadge,
  statusBadge,
  style,
}) => {
  const initial = company.charAt(0).toUpperCase();

  const resolvedRoleColor = roleBadge
    ? ROLE_COLORS[roleBadge.text] ?? roleBadge.color
    : undefined;

  return (
    <div
      style={{
        width: "100%",
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 12,
        paddingBottom: 12,
        borderBottom: "1px solid #2F3336",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 12,
        fontFamily: FONT_FAMILY,
        boxSizing: "border-box",
        ...style,
      }}
    >
      {/* Company logo circle */}
      <div
        style={{
          width: 44,
          height: 44,
          minWidth: 44,
          borderRadius: "50%",
          background: logoColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
          overflow: "hidden",
        }}
      >
        {logoUrl ? (
          <Img src={logoUrl} width={44} height={44} style={{ objectFit: "cover" }} />
        ) : (
          <span
            style={{
              color: "#FFFFFF",
              fontSize: 18,
              fontWeight: 700,
              lineHeight: 1,
              fontFamily: FONT_FAMILY,
            }}
          >
            {initial}
          </span>
        )}
      </div>

      {/* Content stack */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          flex: 1,
          minWidth: 0,
        }}
      >
        {/* Row 1: Company name + NEW badge + time ago */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "#FFFFFF",
              lineHeight: 1.3,
              fontFamily: FONT_FAMILY,
            }}
          >
            {company}
          </span>

          {isNew && (
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: "#FFFFFF",
                background: "#EF4444",
                borderRadius: 999,
                paddingLeft: 6,
                paddingRight: 6,
                paddingTop: 2,
                paddingBottom: 2,
                lineHeight: 1.2,
                fontFamily: FONT_FAMILY,
                whiteSpace: "nowrap",
              }}
            >
              NEW
            </span>
          )}

          <span
            style={{
              fontSize: 13,
              color: "#71767B",
              marginLeft: "auto",
              whiteSpace: "nowrap",
              lineHeight: 1.3,
              fontFamily: FONT_FAMILY,
            }}
          >
            {timeAgo}
          </span>
        </div>

        {/* Row 2: Job title */}
        <span
          style={{
            fontSize: 15,
            fontWeight: 400,
            color: "#FFFFFF",
            lineHeight: 1.4,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontFamily: FONT_FAMILY,
          }}
        >
          {title}
        </span>

        {/* Row 3: Location */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
          }}
        >
          <span style={{ fontSize: 13, lineHeight: 1 }}>
            {"\uD83D\uDCCD"}
          </span>
          <span
            style={{
              fontSize: 13,
              color: "#71767B",
              lineHeight: 1.3,
              fontFamily: FONT_FAMILY,
            }}
          >
            {location}
          </span>
        </div>

        {/* Row 4: Badges */}
        {(roleBadge || statusBadge) && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              flexWrap: "wrap",
            }}
          >
            {roleBadge && resolvedRoleColor && (
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: resolvedRoleColor,
                  background: hexToRgba(resolvedRoleColor, 0.1),
                  borderRadius: 999,
                  paddingLeft: 8,
                  paddingRight: 8,
                  paddingTop: 3,
                  paddingBottom: 3,
                  lineHeight: 1.3,
                  fontFamily: FONT_FAMILY,
                  whiteSpace: "nowrap",
                }}
              >
                {roleBadge.text}
              </span>
            )}

            {statusBadge && (
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: statusBadge.color,
                  background: hexToRgba(statusBadge.color, 0.12),
                  borderRadius: 999,
                  paddingLeft: 8,
                  paddingRight: 8,
                  paddingTop: 3,
                  paddingBottom: 3,
                  lineHeight: 1.3,
                  fontFamily: FONT_FAMILY,
                  whiteSpace: "nowrap",
                }}
              >
                {statusBadge.text}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

/** Convert a hex color to rgba with the given alpha. */
function hexToRgba(hex: string, alpha: number): string {
  const cleaned = hex.replace("#", "");
  const r = parseInt(cleaned.substring(0, 2), 16);
  const g = parseInt(cleaned.substring(2, 4), 16);
  const b = parseInt(cleaned.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}
