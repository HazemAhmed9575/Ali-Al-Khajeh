"use client";
import { useEffect, useState } from "react";
export default function DoubleFrame({
  children,

  outerColor = "#85754E",
  innerColor = "#EEF1FF",
  whiteColor = "#FFFFFF",

  padding = 56,
  innerInset = 34,

  innerOutRight = 60,
  innerOutBottom = 60,

  showWhite = true,
  whiteInset = 16,

  isRtl = false,
  closeOnMobile = true,
}) {
  const gapTop = 60;
  const borderWidth = 16;

  const [isStack, setIsStack] = useState(false);
  const [dynamicGapHeight, setDynamicGapHeight] = useState(200);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;

      // ✅ close on mobile
      setIsStack(w < 1024);

      // ✅ 1024 -> 1279
      if (w >= 1024 && w < 1280) {
        setDynamicGapHeight(380);
      } else {
        setDynamicGapHeight(200);
      }
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // ✅ close only when stacked (and user wants)
  const closed = closeOnMobile && isStack;

  const Frame = ({ left, top, right, bottom, color }) => {
    // ✅ gap side depends on RTL
    const gapSide = isRtl ? "left" : "right";

    return (
      <div
        className="pointer-events-none absolute"
        style={{ left, top, right, bottom }}>
        {/* TOP */}
        <div
          className="absolute left-0 top-0 w-full"
          style={{ height: borderWidth, background: color }}
        />

        {/* LEFT */}
        <div
          className="absolute top-0 h-full"
          style={{
            [gapSide === "right" ? "left" : "right"]: 0,
            width: borderWidth,
            background: color,
          }}
        />
        {/* BOTTOM */}
        <div
          className="absolute left-0 bottom-0 w-full"
          style={{ height: borderWidth, background: color }}
        />

        {/* RIGHT or LEFT border */}
        {!closed ? (
          <>
            {/* gap side = split */}
            <div
              className="absolute top-0"
              style={{
                [gapSide]: 0,
                width: borderWidth,
                height: gapTop,
                background: color,
              }}
            />

            <div
              className="absolute"
              style={{
                [gapSide]: 0,
                width: borderWidth,
                height: dynamicGapHeight,
                top: gapTop,
                background: "transparent",
              }}
            />

            <div
              className="absolute"
              style={{
                [gapSide]: 0,
                width: borderWidth,
                top: gapTop + dynamicGapHeight,
                height: `calc(100% - ${gapTop + dynamicGapHeight}px)`,
                background: color,
              }}
            />

            {/* other side = full line */}
            <div
              className="absolute top-0 h-full"
              style={{
                [gapSide === "right" ? "left" : "right"]: 0,
                width: borderWidth,
                background: color,
              }}
            />
          </>
        ) : (
          <>
            {/* ✅ CLOSED: full right */}
            <div
              className="absolute right-0 top-0 h-full"
              style={{ width: borderWidth, background: color }}
            />
            {/* ✅ CLOSED: full left */}
            <div
              className="absolute left-0 top-0 h-full"
              style={{ width: borderWidth, background: color }}
            />
          </>
        )}
      </div>
    );
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 z-0">
        <Frame
          left={isRtl ? innerInset - innerOutRight : innerInset}
          top={innerInset}
          right={isRtl ? innerInset : innerInset - innerOutRight}
          bottom={innerInset - innerOutBottom}
          color={innerColor}
        />

        {showWhite && (
          <Frame
            left={
              isRtl
                ? innerInset - innerOutRight + whiteInset
                : innerInset + whiteInset
            }
            top={innerInset + whiteInset}
            right={
              isRtl
                ? innerInset + whiteInset
                : innerInset - innerOutRight + whiteInset
            }
            bottom={innerInset - innerOutBottom + whiteInset}
            color={whiteColor}
          />
        )}
      </div>

      <div className="absolute inset-0 z-20">
        <Frame left={0} top={0} right={0} bottom={0} color={outerColor} />
      </div>

      <div className="relative z-50" style={{ padding }}>
        {children}
      </div>
    </div>
  );
}
