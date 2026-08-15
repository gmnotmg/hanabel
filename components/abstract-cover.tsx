/**
 * AbstractCover — Hanabel hero background
 * Palette: Lilac dominant (#9b6dd6 / #c084f5) + soft rose (#f9b8d4) + butter (#fff3c0)
 * Elements: fluid waves, cute butterflies, tiny flowers, sparkle stars, floating dots
 */

/* ─── Butterfly (detailed, cute) ─── */
function Butterfly({
  x, y, scale, r,
  wingTop, wingBot, body,
}: {
  x: number; y: number; scale: number; r?: number;
  wingTop: string; wingBot: string; body: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale}) rotate(${r ?? 0})`} opacity="0.92">
      {/* Left top wing */}
      <ellipse cx="-10" cy="-7" rx="11" ry="14" fill={wingTop} opacity="0.88" transform="rotate(-32 -10 -7)" />
      {/* Right top wing */}
      <ellipse cx="10" cy="-7" rx="11" ry="14" fill={wingTop} opacity="0.88" transform="rotate(32 10 -7)" />
      {/* Left bottom wing */}
      <ellipse cx="-8" cy="8" rx="8.5" ry="10" fill={wingBot} opacity="0.75" transform="rotate(-20 -8 8)" />
      {/* Right bottom wing */}
      <ellipse cx="8" cy="8" rx="8.5" ry="10" fill={wingBot} opacity="0.75" transform="rotate(20 8 8)" />
      {/* Wing pattern dots */}
      <circle cx="-10" cy="-5" r="2" fill="white" opacity="0.5" />
      <circle cx="10" cy="-5" r="2" fill="white" opacity="0.5" />
      {/* Body */}
      <ellipse cx="0" cy="2" rx="2.4" ry="11" fill={body} opacity="0.88" />
      {/* Antennae */}
      <path d="M-1-8 C-5-17 -9-18 -10-16" fill="none" stroke={body} strokeWidth="1.3" strokeLinecap="round" opacity="0.8" />
      <path d="M1-8 C5-17 9-18 10-16" fill="none" stroke={body} strokeWidth="1.3" strokeLinecap="round" opacity="0.8" />
      <circle cx="-10" cy="-16" r="1.4" fill={body} opacity="0.9" />
      <circle cx="10" cy="-16" r="1.4" fill={body} opacity="0.9" />
    </g>
  );
}

/* ─── Small flower ─── */
function Flower({ x, y, scale, color, center }: { x: number; y: number; scale: number; color: string; center: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} opacity="0.80">
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <ellipse
          key={deg}
          cx={Math.cos((deg * Math.PI) / 180) * 6}
          cy={Math.sin((deg * Math.PI) / 180) * 6}
          rx="4" ry="5.5"
          fill={color}
          transform={`rotate(${deg} ${Math.cos((deg * Math.PI) / 180) * 6} ${Math.sin((deg * Math.PI) / 180) * 6})`}
        />
      ))}
      <circle cx="0" cy="0" r="3.5" fill={center} />
    </g>
  );
}

/* ─── 4-point sparkle star ─── */
function Star({ x, y, s, fill }: { x: number; y: number; s: number; fill: string }) {
  return (
    <path
      d={`M${x} ${y - s} l${s * 0.38} ${s * 0.62} L${x + s} ${y} l${-s * 0.62} ${s * 0.38} L${x} ${y + s} l${-s * 0.38}${-s * 0.62} L${x - s} ${y} l${s * 0.62}${-s * 0.38}Z`}
      fill={fill}
      opacity="0.78"
    />
  );
}

export function AbstractCover() {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      focusable="false"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 640 280"
    >
      <defs>
        {/* Main lilac gradient base */}
        <linearGradient id="hc-base" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#b57be6" />
          <stop offset="42%" stopColor="#c895f0" />
          <stop offset="78%" stopColor="#dba8f5" />
          <stop offset="100%" stopColor="#c084f5" />
        </linearGradient>

        {/* Top-left deep purple blob */}
        <radialGradient id="hc-blob1" cx="0%" cy="0%" r="100%">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#9333ea" stopOpacity="0" />
        </radialGradient>

        {/* Right rose blob */}
        <radialGradient id="hc-blob2" cx="100%" cy="50%" r="100%">
          <stop offset="0%" stopColor="#f9a8d4" stopOpacity="0.60" />
          <stop offset="100%" stopColor="#f0abfc" stopOpacity="0" />
        </radialGradient>

        {/* Bottom center mint accent */}
        <radialGradient id="hc-blob3" cx="50%" cy="100%" r="80%">
          <stop offset="0%" stopColor="#a5b4fc" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#c4b5fd" stopOpacity="0" />
        </radialGradient>

        <filter id="hc-blur" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="24" />
        </filter>

        {/* Subtle speckle texture */}
        <pattern id="hc-speck" width="52" height="52" patternUnits="userSpaceOnUse">
          <circle cx="8"  cy="12" r="0.9" fill="#7c3aed" opacity="0.10" />
          <circle cx="34" cy="30" r="0.8" fill="#ffffff"  opacity="0.20" />
          <circle cx="48" cy="6"  r="0.7" fill="#7c3aed" opacity="0.08" />
        </pattern>
      </defs>

      {/* ── Base ── */}
      <rect width="640" height="280" fill="url(#hc-base)" />

      {/* ── Soft blobs ── */}
      <ellipse cx="80"  cy="0"   rx="220" ry="120" fill="url(#hc-blob1)" filter="url(#hc-blur)" />
      <ellipse cx="580" cy="130" rx="210" ry="130" fill="url(#hc-blob2)" filter="url(#hc-blur)" />
      <ellipse cx="320" cy="280" rx="270" ry="80"  fill="url(#hc-blob3)" filter="url(#hc-blur)" />

      {/* ── Fluid wave ribbons ── */}
      {/* Creamy butter wave */}
      <path
        d="M-30 100 C70 50 160 130 270 95 C380 60 450 130 560 90 C610 72 635 78 660 80 L660 115 C635 113 610 107 560 125 C450 165 380 95 270 130 C160 165 70 85 -30 135Z"
        fill="#fff3c0"
        opacity="0.40"
      />
      {/* White highlight wave top */}
      <path
        d="M-30 58 C80 10 155 72 255 44 C355 16 440 80 540 46 C590 30 625 34 660 36"
        fill="none"
        stroke="white"
        strokeWidth="14"
        strokeLinecap="round"
        opacity="0.30"
      />
      {/* Rose wave bottom */}
      <path
        d="M-30 195 C80 155 160 225 272 190 C385 155 455 220 570 188 C615 174 640 178 660 180"
        fill="none"
        stroke="#f9b8d4"
        strokeWidth="10"
        strokeLinecap="round"
        opacity="0.48"
      />
      {/* Thin purple accent line */}
      <path
        d="M-30 135 C90 98 168 158 278 122 C388 86 460 155 570 120 C620 103 645 108 660 110"
        fill="none"
        stroke="#7c3aed"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.35"
      />

      {/* ── Speckle texture overlay ── */}
      <rect width="640" height="280" fill="url(#hc-speck)" />

      {/* ── Butterflies — 4 placed at corners/mid, varied sizes ── */}
      <Butterfly x={72}  y={62}  scale={0.88} wingTop="#fff3c0" wingBot="#f9b8d4" body="#7c3aed" r={-12} />
      <Butterfly x={530} y={52}  scale={0.72} wingTop="#f9b8d4" wingBot="#e9d5ff" body="#6d28d9" r={14}  />
      <Butterfly x={190} y={228} scale={0.55} wingTop="#e9d5ff" wingBot="#fff3c0" body="#7c3aed" r={8}   />
      <Butterfly x={450} y={210} scale={0.64} wingTop="#fff3c0" wingBot="#f9b8d4" body="#5b21b6" r={-6}  />

      {/* ── Tiny flowers ── */}
      <Flower x={148} y={52}  scale={1.1} color="#fde68a" center="#f59e0b" />
      <Flower x={502} y={168} scale={0.9} color="#f9a8d4" center="#ec4899" />
      <Flower x={310} y={240} scale={0.7} color="#ddd6fe" center="#7c3aed" />
      <Flower x={40}  y={210} scale={0.8} color="#bbf7d0" center="#22c55e" />

      {/* ── Sparkle stars ── */}
      <Star x={260} y={38}  s={7}   fill="#fff3c0" />
      <Star x={412} y={76}  s={5.5} fill="#ffffff"  />
      <Star x={116} y={168} s={4.5} fill="#fde68a"  />
      <Star x={568} y={232} s={6}   fill="#fff3c0"  />
      <Star x={352} y={186} s={4}   fill="#ffffff"  />

      {/* ── Floating dots ── */}
      {[
        { cx: 52,  cy: 88,  r: 6.5, fill: "#fff3c0", op: 0.55 },
        { cx: 180, cy: 44,  r: 4,   fill: "#ffffff",  op: 0.50 },
        { cx: 310, cy: 62,  r: 5.5, fill: "#f9b8d4",  op: 0.52 },
        { cx: 498, cy: 56,  r: 7.5, fill: "#fff3c0",  op: 0.46 },
        { cx: 590, cy: 122, r: 4.5, fill: "#ffffff",  op: 0.46 },
        { cx: 90,  cy: 230, r: 5,   fill: "#ddd6fe",  op: 0.42 },
        { cx: 450, cy: 242, r: 6.5, fill: "#f9b8d4",  op: 0.40 },
      ].map(({ cx, cy, r, fill, op }) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={fill} opacity={op} />
      ))}
    </svg>
  );
}
