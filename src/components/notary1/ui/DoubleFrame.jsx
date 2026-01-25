"use client";

export default function DoubleFrame({
  children,

  outerColor = "#85754E",
  innerColor = "#EEF1FF",

  padding = 56,
  innerInset = 34,

  innerOutRight = 60,
  innerOutBottom = 60,

  isRtl = false,
}) {
  const borderWidth = 16;

  const Frame = ({ left, top, right, bottom, color }) => {
    return (
      <div
        className="pointer-events-none absolute"
        style={{ left, top, right, bottom }}
      >
        {/* TOP */}
        <div
          className="absolute left-0 top-0 w-full"
          style={{ height: borderWidth, background: color }}
        />

        {/* BOTTOM */}
        <div
          className="absolute left-0 bottom-0 w-full"
          style={{ height: borderWidth, background: color }}
        />

        {/* LEFT */}
        <div
          className="absolute left-0 top-0 h-full"
          style={{ width: borderWidth, background: color }}
        />

        {/* RIGHT */}
        <div
          className="absolute right-0 top-0 h-full"
          style={{ width: borderWidth, background: color }}
        />
      </div>
    );
  };

  return (
    <div className="relative">
      {/* ✅ Inner Frame */}
      <div className="absolute inset-0 z-0">
        <Frame
          left={isRtl ? innerInset - innerOutRight : innerInset}
          top={innerInset}
          right={isRtl ? innerInset : innerInset - innerOutRight}
          bottom={innerInset - innerOutBottom}
          color={innerColor}
        />
      </div>

      {/* ✅ Outer Frame */}
      <div className="absolute inset-0 z-20">
        <Frame left={0} top={0} right={0} bottom={0} color={outerColor} />
      </div>

      {/* content */}
      <div className="relative z-50" style={{ padding }}>
        {children}
      </div>
    </div>
  );
}
