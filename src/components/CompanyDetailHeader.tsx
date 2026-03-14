import React from "react";
import { Img } from "remotion";
import { theme } from "../theme";
import { StarIcon } from "./StarIcon";

interface CompanyDetailHeaderProps {
  name: string;
  domain: string;
  jobCount: number;
  isFavorite: boolean;
  logoInitial?: string;
  logoUrl?: string;
}

export const CompanyDetailHeader: React.FC<CompanyDetailHeaderProps> = ({
  name,
  domain,
  jobCount,
  isFavorite,
  logoInitial,
  logoUrl,
}) => {
  const initial = logoInitial || name.charAt(0).toUpperCase();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        fontFamily: theme.font.body,
      }}
    >
      {/* Navigation bar */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
          paddingLeft: 16,
          paddingRight: 16,
          paddingTop: 8,
          paddingBottom: 12,
        }}
      >
        {/* Back chevron */}
        <svg
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 18l-6-6 6-6"
            stroke={theme.colors.accent}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span
          style={{
            fontSize: 16,
            color: theme.colors.accent,
            lineHeight: 1.3,
            fontFamily: theme.font.body,
          }}
        >
          Companies
        </span>
      </div>

      {/* Company info row */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
          paddingLeft: 16,
          paddingRight: 16,
          paddingTop: 8,
          paddingBottom: 16,
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

        {/* Name + domain */}
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
              fontSize: 18,
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
              fontSize: 14,
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

        {/* Favorite pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 6,
            paddingBottom: 6,
            borderRadius: 999,
            background: isFavorite
              ? "rgba(251, 191, 36, 0.15)"
              : "rgba(161, 161, 170, 0.1)",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: isFavorite ? "#FBBF24" : theme.colors.muted,
              lineHeight: 1.2,
              fontFamily: theme.font.body,
            }}
          >
            Fav
          </span>
          <StarIcon filled={isFavorite} size={16} />
        </div>

        {/* Job count */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: theme.colors.white,
              lineHeight: 1.1,
              fontFamily: theme.font.body,
            }}
          >
            {jobCount}
          </span>
          <span
            style={{
              fontSize: 12,
              color: theme.colors.muted,
              lineHeight: 1.2,
              fontFamily: theme.font.body,
            }}
          >
            active jobs
          </span>
        </div>
      </div>
    </div>
  );
};
