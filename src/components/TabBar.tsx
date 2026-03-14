import React from "react";
import { theme } from "../theme";

const FONT_FAMILY = theme.font.body;

interface TabBarProps {
  activeTab: "jobs" | "companies" | "settings";
}

// Jobs icon (briefcase)
const JobsIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <path
      d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Companies icon (grid/building)
const CompaniesIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <rect x={3} y={3} width={7} height={7} rx={1.5} stroke={color} strokeWidth={1.5} />
    <rect x={14} y={3} width={7} height={7} rx={1.5} stroke={color} strokeWidth={1.5} />
    <rect x={3} y={14} width={7} height={7} rx={1.5} stroke={color} strokeWidth={1.5} />
    <rect x={14} y={14} width={7} height={7} rx={1.5} stroke={color} strokeWidth={1.5} />
  </svg>
);

// Settings icon (gear)
const SettingsIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <circle cx={12} cy={12} r={3} stroke={color} strokeWidth={1.5} />
    <path
      d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const TabBar: React.FC<TabBarProps> = ({ activeTab }) => {
  const tabs = [
    { key: "jobs" as const, label: "Jobs", Icon: JobsIcon },
    { key: "companies" as const, label: "Companies", Icon: CompaniesIcon },
    { key: "settings" as const, label: "Settings", Icon: SettingsIcon },
  ];

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        paddingTop: 8,
        paddingBottom: 4,
        background: "rgba(10, 10, 15, 0.95)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        zIndex: 20,
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        const color = isActive ? theme.colors.accent : theme.colors.dim;

        return (
          <div
            key={tab.key}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              flex: 1,
            }}
          >
            <tab.Icon color={color} />
            <span
              style={{
                fontSize: 10,
                fontWeight: 500,
                color,
                fontFamily: FONT_FAMILY,
                lineHeight: 1.2,
              }}
            >
              {tab.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};
