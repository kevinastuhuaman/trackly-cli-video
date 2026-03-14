import React from "react";
import { theme } from "../theme";

interface FundingBadgeProps {
  valuation: string; // e.g. "$23B", "$2.5B", "$150M"
  style?: React.CSSProperties;
}

export const FundingBadge: React.FC<FundingBadgeProps> = ({ valuation, style }) => {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 4,
        paddingBottom: 4,
        borderRadius: 999,
        background: "rgba(34, 197, 94, 0.15)",
        border: "1px solid rgba(34, 197, 94, 0.3)",
        flexShrink: 0,
        ...style,
      }}
    >
      <span
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: theme.colors.green,
          lineHeight: 1.2,
          fontFamily: theme.font.body,
        }}
      >
        {valuation}
      </span>
    </div>
  );
};
