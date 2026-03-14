import React from "react";
import { theme } from "../theme";

interface FilterChipBarProps {
  chips: string[];
  selectedIndex: number;
  highlightIndex?: number;
  style?: React.CSSProperties;
}

export const FilterChipBar: React.FC<FilterChipBarProps> = ({
  chips,
  selectedIndex,
  highlightIndex,
  style,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 8,
        paddingLeft: 16,
        paddingRight: 16,
        ...style,
      }}
    >
      {chips.map((label, index) => {
        const isSelected = index === selectedIndex;
        const isHighlighted = index === highlightIndex;

        return (
          <div
            key={index}
            style={{
              paddingLeft: 10,
              paddingRight: 10,
              paddingTop: 6,
              paddingBottom: 6,
              borderRadius: 999,
              background: isSelected ? theme.colors.accent : "#18181B",
              border: isSelected ? "1px solid transparent" : "1px solid #2F3336",
              boxShadow: isHighlighted
                ? "0 0 12px rgba(168, 85, 247, 0.3), 0 0 24px rgba(168, 85, 247, 0.15)"
                : "none",
              whiteSpace: "nowrap" as const,
            }}
          >
            <span
              style={{
                fontFamily: theme.font.body,
                fontSize: 13,
                fontWeight: isSelected ? 600 : 500,
                color: theme.colors.white,
                lineHeight: 1,
              }}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
};
