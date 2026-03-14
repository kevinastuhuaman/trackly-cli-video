import React from "react";
import { Img } from "remotion";
import { theme } from "../theme";
import { FundingBadge } from "./FundingBadge";

interface StartupCompanyRowProps {
  name: string;
  domain: string;
  valuation: string;
  jobCount: number;
  style?: React.CSSProperties;
}

function hexToRgba(hex: string, alpha: number): string {
  const cleaned = hex.replace("#", "");
  const r = parseInt(cleaned.substring(0, 2), 16);
  const g = parseInt(cleaned.substring(2, 4), 16);
  const b = parseInt(cleaned.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export const StartupCompanyRow: React.FC<StartupCompanyRowProps> = ({
  name,
  domain,
  valuation,
  jobCount,
  style,
}) => {
  const logoUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingLeft: 14,
        paddingRight: 14,
        paddingTop: 11,
        paddingBottom: 11,
        background: theme.colors.surface,
        borderRadius: 16,
        border: "1px solid #2F3336",
        fontFamily: theme.font.body,
        boxSizing: "border-box",
        ...style,
      }}
    >
      {/* Logo */}
      <div
        style={{
          width: 44,
          height: 44,
          minWidth: 44,
          borderRadius: "50%",
          background: "#18181B",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <Img src={logoUrl} width={44} height={44} style={{ objectFit: "cover" }} />
      </div>

      {/* Name stack */}
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
            fontSize: 15,
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
            fontSize: 12,
            color: theme.colors.muted,
            lineHeight: 1.3,
            fontFamily: theme.font.body,
          }}
        >
          {domain}
        </span>
      </div>

      {/* Funding badge */}
      <FundingBadge valuation={valuation} />

      {/* Job count pill */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 3,
          paddingLeft: 8,
          paddingRight: 8,
          paddingTop: 4,
          paddingBottom: 4,
          borderRadius: 999,
          background: hexToRgba(theme.colors.accent, 0.15),
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: theme.colors.accent,
            lineHeight: 1.2,
            fontFamily: theme.font.body,
          }}
        >
          {jobCount} Jobs
        </span>
      </div>
    </div>
  );
};
