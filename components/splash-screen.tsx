"use client";

import { useEffect, useState } from "react";

interface Props {
  onComplete: () => void;
}

/**
 * Splash screen — "Hanabel" written with an elegant SVG clip-reveal animation
 * that precisely mimics handwriting: the text appears progressively from left
 * to right as if a pen is drawing it. Uses the Dancing Script Google Font
 * (loaded via @font-face from the Next.js variable) for authentic cursive style.
 *
 * Technique: a moving "ink tip" + clip-path reveal of the actual font text.
 * This gives FAR more realistic results than trying to trace SVG paths.
 */
export function SplashScreen({ onComplete }: Props) {
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in");

  useEffect(() => {
    // Writing ends at ≈2.8s → hold 0.5s → fade 0.7s → unmount
    const t1 = setTimeout(() => setPhase("hold"), 3000);
    const t2 = setTimeout(() => setPhase("out"),  3600);
    const t3 = setTimeout(() => onComplete(),      4400);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div
      aria-label="Memuat Hanabel…"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 36,
        background:
          "radial-gradient(ellipse 65% 55% at 6% 0%, rgba(237,224,255,0.80),transparent)," +
          "radial-gradient(ellipse 55% 45% at 94% 10%,rgba(255,218,240,0.65),transparent)," +
          "radial-gradient(ellipse 50% 50% at 88% 92%,rgba(220,229,255,0.50),transparent)," +
          "#f5f3fc",
        opacity: phase === "out" ? 0 : 1,
        transition: phase === "out" ? "opacity 0.75s cubic-bezier(.4,0,.2,1)" : "opacity 0.3s ease",
        pointerEvents: phase === "out" ? "none" : "auto",
      }}
    >
      {/* Background blobs */}
      <div className="sp-blob sp-blob-tl" />
      <div className="sp-blob sp-blob-br" />
      <div className="sp-blob sp-blob-mid" />

      {/* Top dots */}
      <div className="sp-dots">
        {(["#c084fc","#e879f9","#f472b6"] as const).map((c,i) => (
          <span key={i} className="sp-dot" style={{ background: c, animationDelay: `${i*0.2}s` }} />
        ))}
      </div>

      {/* ─── Handwriting section ─── */}
      <div className="sp-body">

        {/* SVG with gradient text + left-to-right reveal animation */}
        <div className="sp-text-wrap">
          <svg
            viewBox="0 0 480 130"
            className="sp-svg"
            aria-hidden="true"
          >
            <defs>
              {/* Text fill gradient: deep purple → fuchsia → coral */}
              <linearGradient id="sp-fill" x1="0%" y1="0%" x2="100%" y2="10%">
                <stop offset="0%"   stopColor="#6d28d9" />
                <stop offset="38%"  stopColor="#9333ea" />
                <stop offset="72%"  stopColor="#db2777" />
                <stop offset="100%" stopColor="#ea580c" />
              </linearGradient>

              {/* Clip rect that expands left→right */}
              <clipPath id="sp-reveal">
                <rect x="0" y="0" width="480" height="130" className="sp-reveal-rect" />
              </clipPath>

              {/* Underline gradient */}
              <linearGradient id="sp-ul" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#a855f7" />
                <stop offset="100%" stopColor="#f472b6" />
              </linearGradient>
            </defs>

            {/* Ghost text (very faint) — gives sense of where letters will appear */}
            <text
              x="240" y="92"
              textAnchor="middle"
              fontFamily="var(--font-script, 'Dancing Script', cursive)"
              fontSize="96"
              fontWeight="700"
              fill="rgba(147,51,234,0.05)"
            >
              Hanabel
            </text>

            {/* Revealed (clipped) gradient text */}
            <text
              x="240" y="92"
              textAnchor="middle"
              fontFamily="var(--font-script, 'Dancing Script', cursive)"
              fontSize="96"
              fontWeight="700"
              fill="url(#sp-fill)"
              clipPath="url(#sp-reveal)"
            >
              Hanabel
            </text>

            {/* Animated ink-tip cursor */}
            <circle className="sp-cursor" r="4" fill="#9333ea" />

            {/* Underline — appears after writing */}
            <line
              x1="40" y1="108" x2="440" y2="108"
              stroke="url(#sp-ul)"
              strokeWidth="3.5"
              strokeLinecap="round"
              className="sp-underline"
            />
          </svg>
        </div>

        {/* Tagline */}
        <p
          className="sp-tagline"
          style={{
            opacity: phase !== "in" ? 1 : 0,
            transform: phase !== "in" ? "translateY(0)" : "translateY(5px)",
          }}
        >
          Kurasi produk terbaik pilihan Hana ✨
        </p>
      </div>

      {/* Bottom dots */}
      <div className="sp-dots">
        {(["#e879f9","#c084fc","#a78bfa"] as const).map((c,i) => (
          <span key={i} className="sp-dot" style={{ background: c, animationDelay: `${0.15 + i*0.2}s` }} />
        ))}
      </div>

      <style>{`
        /* ── Blobs ── */
        .sp-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          pointer-events: none;
          animation: spBlobFloat 7s ease-in-out infinite alternate;
        }
        .sp-blob-tl  { top:-70px; left:-70px;   width:310px; height:310px; background:radial-gradient(circle,rgba(192,132,252,.40),transparent 68%); }
        .sp-blob-br  { bottom:-90px; right:-90px; width:380px; height:380px; background:radial-gradient(circle,rgba(244,114,182,.33),transparent 68%); animation-direction:alternate-reverse; animation-duration:8s; }
        .sp-blob-mid { top:32%; left:60%;        width:220px; height:220px; background:radial-gradient(circle,rgba(165,180,252,.28),transparent 70%); animation-delay:1s; animation-duration:9s; }
        @keyframes spBlobFloat { from{transform:translate(0,0) scale(1)} to{transform:translate(16px,22px) scale(1.08)} }

        /* ── Dots ── */
        .sp-dots { display:flex; gap:8px; align-items:center; }
        .sp-dot   { display:inline-block; width:7px; height:7px; border-radius:50%; animation:spDotPulse 1.4s ease-in-out infinite; }
        @keyframes spDotPulse { 0%,100%{transform:scale(1);opacity:.5} 50%{transform:scale(1.5);opacity:1} }

        /* ── Main body ── */
        .sp-body { display:flex; flex-direction:column; align-items:center; gap:12px; }

        /* ── SVG text ── */
        .sp-text-wrap { position:relative; }
        .sp-svg       { width:min(340px, 84vw); height:auto; overflow:visible; }

        /* Reveal rect: animates width 0→480 over 2.8s with slight ease */
        .sp-reveal-rect {
          animation: spReveal 2.8s cubic-bezier(.25,.1,.2,1) 0.15s both;
        }
        @keyframes spReveal {
          from { width:0; }
          to   { width:480; }
        }

        /* Ink cursor: follows the tip of the writing, moves x 40→440, y oscillates slightly */
        .sp-cursor {
          animation:
            spCursorX 2.8s cubic-bezier(.25,.1,.2,1) 0.15s both,
            spCursorY 0.18s ease-in-out 0.15s infinite alternate,
            spCursorFade 0.4s ease 2.9s forwards;
          opacity: 0;
        }
        @keyframes spCursorX {
          from { transform: translate(40px, 92px); opacity:1; }
          to   { transform: translate(440px, 88px); opacity:1; }
        }
        @keyframes spCursorY {
          from { cy: 88; }
          to   { cy: 96; }
        }
        @keyframes spCursorFade {
          to { opacity: 0; }
        }

        /* Underline: stroke-dashoffset reveal */
        .sp-underline {
          stroke-dasharray: 420;
          stroke-dashoffset: 420;
          animation: spUnderline 0.55s cubic-bezier(.4,0,.2,1) 2.85s forwards;
        }
        @keyframes spUnderline {
          to { stroke-dashoffset: 0; }
        }

        /* Tagline */
        .sp-tagline {
          font-family: var(--font-sans), sans-serif;
          font-size: 0.72rem;
          font-weight: 500;
          color: #9e8faa;
          letter-spacing: 0.025em;
          transition: opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s;
        }
      `}</style>
    </div>
  );
}
