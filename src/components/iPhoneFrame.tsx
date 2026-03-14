import React from "react";

interface iPhoneFrameProps {
  children: React.ReactNode;
  showStatusBar?: boolean;
  screenBackground?: string;
}

const PHONE_WIDTH = 393;
const PHONE_HEIGHT = 852;
const SCREEN_WIDTH = 380;
const SCREEN_HEIGHT = 823;
const CANVAS_SIZE = 1080;
const TARGET_HEIGHT = 860;
const SCALE = TARGET_HEIGHT / PHONE_HEIGHT;

export const IPhoneFrame: React.FC<iPhoneFrameProps> = ({
  children,
  showStatusBar = true,
  screenBackground = "#000000",
}) => {
  return (
    <div
      style={{
        width: CANVAS_SIZE,
        height: CANVAS_SIZE,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: PHONE_WIDTH,
          height: PHONE_HEIGHT,
          transform: `scale(${SCALE})`,
          transformOrigin: "center center",
        }}
      >
        {/* Phone body */}
        <div
          style={{
            width: PHONE_WIDTH,
            height: PHONE_HEIGHT,
            background: "#1a1a1a",
            border: "3px solid #3a3a3e",
            borderRadius: 50,
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Screen */}
          <div
            style={{
              width: SCREEN_WIDTH,
              height: SCREEN_HEIGHT,
              background: screenBackground,
              borderRadius: 44,
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* Dynamic Island */}
            <div
              style={{
                position: "absolute",
                top: 12,
                left: "50%",
                transform: "translateX(-50%)",
                width: 90,
                height: 28,
                borderRadius: 14,
                background: "#000000",
                zIndex: 10,
              }}
            />

            {/* Status bar */}
            {showStatusBar && (
              <div
                style={{
                  position: "absolute",
                  top: 14,
                  left: 24,
                  right: 24,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  zIndex: 5,
                  fontSize: 14,
                  fontWeight: 600,
                  fontFamily:
                    '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
                  color: "#999",
                }}
              >
                <span>9:41</span>
                <span style={{ fontSize: 12, letterSpacing: 2 }}>
                  {"●●●●"}
                  {"  "}
                  {"▐█▌"}
                </span>
              </div>
            )}

            {/* Content area */}
            <div
              style={{
                position: "absolute",
                top: 50,
                left: 0,
                right: 0,
                bottom: 20,
                overflow: "hidden",
              }}
            >
              {children}
            </div>

            {/* Home indicator */}
            <div
              style={{
                position: "absolute",
                bottom: 8,
                left: "50%",
                transform: "translateX(-50%)",
                width: 120,
                height: 5,
                borderRadius: 2.5,
                background: "rgba(255, 255, 255, 0.3)",
                zIndex: 10,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
