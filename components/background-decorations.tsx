"use client";

import {
  Bird,
  Cloud,
  Flower2,
  Heart,
  Rabbit,
  Star,
  Sun,
  type LucideIcon,
} from "lucide-react";

type Decoration = {
  icon: LucideIcon;
  top: string;
  left: string;
  size: number;
  rotate?: number;
  className: string;
};

const decorations: Decoration[] = [
  // =========================
  // TOP AREA
  // =========================

  {
    icon: Sun,
    top: "6%",
    left: "12%",
    size: 110,
    rotate: 0,
    className:
      "text-amber-300/70 animate-[spin_40s_linear_infinite]",
  },

  {
    icon: Cloud,
    top: "3%",
    left: "31%",
    size: 140,
    rotate: 0,
    className: "text-white/50",
  },

  {
    icon: Cloud,
    top: "5%",
    left: "84%",
    size: 120,
    rotate: 0,
    className: "text-pink-200/50",
  },

  {
    icon: Star,
    top: "4%",
    left: "4%",
    size: 30,
    rotate: 20,
    className: "text-pink-300/70",
  },

  {
    icon: Star,
    top: "7%",
    left: "50%",
    size: 34,
    rotate: 15,
    className: "text-purple-300/60",
  },

  {
    icon: Star,
    top: "12%",
    left: "21%",
    size: 24,
    rotate: -15,
    className: "text-amber-300/70",
  },

  // =========================
  // BUTTERFLIES
  // =========================

  {
    icon: Flower2,
    top: "6%",
    left: "58%",
    size: 38,
    rotate: 10,
    className: "text-pink-300/70",
  },

  {
    icon: Flower2,
    top: "17%",
    left: "72%",
    size: 26,
    rotate: -20,
    className: "text-purple-300/70",
  },

  {
    icon: Flower2,
    top: "32%",
    left: "9%",
    size: 34,
    rotate: 20,
    className: "text-fuchsia-300/60",
  },

  {
    icon: Flower2,
    top: "44%",
    left: "76%",
    size: 30,
    rotate: -20,
    className: "text-pink-300/70",
  },

  // =========================
  // HEARTS
  // =========================

  {
    icon: Heart,
    top: "35%",
    left: "14%",
    size: 32,
    rotate: -10,
    className: "text-pink-400/70",
  },

  {
    icon: Heart,
    top: "45%",
    left: "71%",
    size: 28,
    rotate: 15,
    className: "text-fuchsia-300/70",
  },

  {
    icon: Heart,
    top: "72%",
    left: "58%",
    size: 34,
    rotate: -15,
    className: "text-rose-300/70",
  },

  {
    icon: Heart,
    top: "78%",
    left: "19%",
    size: 26,
    rotate: 15,
    className: "text-pink-300/70",
  },

  // =========================
  // BIRDS
  // =========================

  {
    icon: Bird,
    top: "48%",
    left: "79%",
    size: 56,
    rotate: 8,
    className: "text-indigo-300/70",
  },

  {
    icon: Bird,
    top: "83%",
    left: "52%",
    size: 42,
    rotate: -8,
    className: "text-amber-300/70",
  },

  {
    icon: Bird,
    top: "72%",
    left: "12%",
    size: 38,
    rotate: -15,
    className: "text-orange-300/60",
  },

  // =========================
  // FLOWERS - SIDE
  // =========================

  {
    icon: Flower2,
    top: "38%",
    left: "3%",
    size: 42,
    rotate: 15,
    className: "text-pink-300/70",
  },

  {
    icon: Flower2,
    top: "53%",
    left: "5%",
    size: 34,
    rotate: -20,
    className: "text-purple-300/70",
  },

  {
    icon: Flower2,
    top: "65%",
    left: "8%",
    size: 48,
    rotate: 10,
    className: "text-fuchsia-300/60",
  },

  {
    icon: Flower2,
    top: "36%",
    left: "94%",
    size: 46,
    rotate: 20,
    className: "text-purple-300/60",
  },

  {
    icon: Flower2,
    top: "57%",
    left: "90%",
    size: 40,
    rotate: -10,
    className: "text-pink-300/70",
  },

  // =========================
  // STARS / SMALL DETAILS
  // =========================

  {
    icon: Star,
    top: "23%",
    left: "25%",
    size: 20,
    rotate: 20,
    className: "text-amber-300/60",
  },

  {
    icon: Star,
    top: "29%",
    left: "68%",
    size: 24,
    rotate: -15,
    className: "text-purple-300/60",
  },

  {
    icon: Star,
    top: "40%",
    left: "65%",
    size: 18,
    rotate: 10,
    className: "text-yellow-200/70",
  },

  {
    icon: Star,
    top: "62%",
    left: "23%",
    size: 22,
    rotate: -10,
    className: "text-amber-300/60",
  },

  {
    icon: Star,
    top: "70%",
    left: "72%",
    size: 20,
    rotate: 30,
    className: "text-purple-300/70",
  },

  // =========================
  // EXTRA CLOUDS
  // =========================

  {
    icon: Cloud,
    top: "22%",
    left: "1%",
    size: 100,
    className: "text-purple-200/40",
  },

  {
    icon: Cloud,
    top: "28%",
    left: "83%",
    size: 150,
    className: "text-blue-200/40",
  },

  {
    icon: Cloud,
    top: "80%",
    left: "28%",
    size: 120,
    className: "text-purple-200/30",
  },

  {
    icon: Cloud,
    top: "76%",
    left: "70%",
    size: 140,
    className: "text-pink-200/30",
  },
];

function Butterfly({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 220 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Left upper wing */}
      <path
        d="M108 84C85 22 38 17 25 48C13 77 53 103 104 96"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Left lower wing */}
      <path
        d="M106 96C60 99 33 128 48 150C65 173 100 132 111 104"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Right upper wing */}
      <path
        d="M112 84C135 22 182 17 195 48C207 77 167 103 116 96"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Right lower wing */}
      <path
        d="M114 96C160 99 187 128 172 150C155 173 120 132 109 104"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Body */}
      <path
        d="M110 76C105 92 105 109 110 126"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* Antennas */}
      <path
        d="M109 77C102 65 94 60 88 59"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />

      <path
        d="M111 77C118 65 126 60 132 59"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />

      <circle cx="87" cy="58" r="3" fill="currentColor" />
      <circle cx="133" cy="58" r="3" fill="currentColor" />
    </svg>
  );
}

function Rainbow() {
  return (
    <div
      className="
        absolute
        -right-[220px]
        top-[38%]
        h-[420px]
        w-[620px]
        rotate-[12deg]
        overflow-hidden
      "
    >
      <div
        className="
          absolute
          inset-0
          rounded-full
          border-[35px]
          border-pink-300/40
        "
      />

      <div
        className="
          absolute
          inset-[35px]
          rounded-full
          border-[35px]
          border-orange-200/50
        "
      />

      <div
        className="
          absolute
          inset-[70px]
          rounded-full
          border-[35px]
          border-amber-200/50
        "
      />

      <div
        className="
          absolute
          inset-[105px]
          rounded-full
          border-[35px]
          border-blue-300/40
        "
      />

      <div
        className="
          absolute
          inset-[140px]
          rounded-full
          border-[35px]
          border-purple-300/40
        "
      />
    </div>
  );
}

export default function BackgroundDecorations() {
  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        fixed
        inset-0
        -z-[1]
        h-screen
        w-screen
        overflow-hidden
        bg-gradient-to-br
        from-[#d8c8f5]
        via-[#f5d4ea]
        to-[#f7d9c4]
      "
    >
      {/* =========================
          SOFT ATMOSPHERE
      ========================= */}

      <div
        className="
          absolute
          left-[5%]
          top-[20%]
          h-[350px]
          w-[350px]
          rounded-full
          bg-purple-300/20
          blur-3xl
        "
      />

      <div
        className="
          absolute
          right-[8%]
          top-[15%]
          h-[400px]
          w-[400px]
          rounded-full
          bg-blue-300/20
          blur-3xl
        "
      />

      <div
        className="
          absolute
          bottom-[-100px]
          left-[25%]
          h-[450px]
          w-[450px]
          rounded-full
          bg-pink-300/20
          blur-3xl
        "
      />

      {/* =========================
          RAINBOW
      ========================= */}

      <Rainbow />

      {/* =========================
          LARGE BUTTERFLIES
      ========================= */}

      <div
        className="
          absolute
          left-[23%]
          top-[12%]
          w-[120px]
          rotate-[15deg]
          text-fuchsia-300/70
          md:w-[180px]
        "
      >
        <Butterfly />
      </div>

      <div
        className="
          absolute
          right-[20%]
          top-[10%]
          w-[90px]
          -rotate-[20deg]
          text-purple-400/70
          md:w-[130px]
        "
      >
        <Butterfly />
      </div>

      <div
        className="
          absolute
          bottom-[18%]
          left-[35%]
          w-[100px]
          rotate-[10deg]
          text-purple-300/60
          md:w-[150px]
        "
      >
        <Butterfly />
      </div>

      {/* =========================
          BIG RABBITS
      ========================= */}

      <Rabbit
        className="
          absolute
          bottom-[8%]
          left-[4%]
          h-[190px]
          w-[190px]
          rotate-[-8deg]
          text-white/50
          stroke-[1.2]
          md:h-[250px]
          md:w-[250px]
        "
      />

      <Rabbit
        className="
          absolute
          bottom-[4%]
          right-[8%]
          h-[170px]
          w-[170px]
          rotate-[8deg]
          text-purple-200/50
          stroke-[1.2]
          md:h-[240px]
          md:w-[240px]
        "
      />

      <Rabbit
        className="
          absolute
          top-[12%]
          right-[10%]
          h-[120px]
          w-[120px]
          rotate-[8deg]
          text-pink-200/50
          stroke-[1.4]
          md:h-[160px]
          md:w-[160px]
        "
      />

      {/* =========================
          FLOWER GARDEN
      ========================= */}

      <div
        className="
          absolute
          bottom-[-100px]
          left-[-5%]
          h-[280px]
          w-[110%]
          rounded-[50%]
          bg-purple-300/20
          blur-xl
        "
      />

      {/* Bottom flowers */}

      <div className="absolute bottom-[2%] left-[2%] flex gap-5">
        <Flower2
          size={100}
          className="text-pink-300/80"
        />
        <Flower2
          size={70}
          className="translate-y-8 text-purple-300/80"
        />
        <Flower2
          size={90}
          className="-translate-y-2 text-orange-200/80"
        />
      </div>

      <div className="absolute bottom-[3%] left-[22%] flex gap-6">
        <Flower2
          size={85}
          className="text-fuchsia-300/70"
        />
        <Flower2
          size={55}
          className="translate-y-6 text-amber-200/80"
        />
        <Flower2
          size={100}
          className="text-purple-300/70"
        />
      </div>

      <div className="absolute bottom-[2%] right-[20%] flex gap-6">
        <Flower2
          size={90}
          className="text-pink-300/80"
        />
        <Flower2
          size={65}
          className="translate-y-8 text-purple-300/70"
        />
        <Flower2
          size={110}
          className="-translate-y-3 text-fuchsia-300/70"
        />
      </div>

      <div className="absolute bottom-[1%] right-[1%] flex gap-5">
        <Flower2
          size={90}
          className="text-pink-300/80"
        />
        <Flower2
          size={70}
          className="translate-y-5 text-purple-300/70"
        />
      </div>

      {/* =========================
          RANDOM DECORATIONS
      ========================= */}

      {decorations.map((item, index) => {
        const Icon = item.icon;

        return (
          <Icon
            key={index}
            size={item.size}
            strokeWidth={1.5}
            className={`absolute ${item.className}`}
            style={{
              top: item.top,
              left: item.left,
              transform: `rotate(${item.rotate ?? 0}deg)`,
            }}
          />
        );
      })}

      {/* =========================
          EXTRA SMALL FLOWERS
      ========================= */}

      {[
        ["82%", "4%", "text-pink-200/80"],
        ["90%", "15%", "text-purple-200/80"],
        ["85%", "27%", "text-orange-200/80"],
        ["92%", "40%", "text-pink-200/80"],
        ["87%", "53%", "text-fuchsia-200/80"],
        ["93%", "64%", "text-purple-200/80"],
        ["84%", "75%", "text-pink-200/80"],
        ["91%", "88%", "text-purple-200/80"],
      ].map(([top, left, color], index) => (
        <Flower2
          key={`small-flower-${index}`}
          size={36 + (index % 3) * 10}
          strokeWidth={1.4}
          className={`absolute ${color}`}
          style={{
            top,
            left,
            transform: `rotate(${index * 35}deg)`,
          }}
        />
      ))}
    </div>
  );
}
