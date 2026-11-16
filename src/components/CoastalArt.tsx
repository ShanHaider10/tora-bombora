import React from 'react';

export function ToraLogo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="inline-flex items-center gap-2 select-none">
      <div className="relative flex flex-col items-start leading-none">
        <div className="flex items-center gap-1">
          <span
            className={`font-display tracking-wide text-white drop-shadow-sm ${
              compact ? 'text-xl' : 'text-2xl sm:text-[26px]'
            }`}
          >
            TORA
          </span>
          {/* Cresting ocean wave flourish */}
          <svg
            viewBox="0 0 44 26"
            className={`${compact ? 'w-6 h-4' : 'w-8 h-5'} text-[#23B8C8] -mt-1`}
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3 20C9 10 18 4 28 6C34 7 37 12 33 15C30 17 26 15 27 12C28 10 31 10 31 10C25 8 17 12 12 20H3Z"
              fill="currentColor"
            />
            <path
              d="M15 21C20 14 28 11 38 14C40 15 41 17 39 19C34 17 25 18 19 22L15 21Z"
              fill="#7BE3EC"
              opacity="0.85"
            />
          </svg>
        </div>
        <span
          className={`font-display tracking-wider text-white -mt-1.5 drop-shadow-sm ${
            compact ? 'text-lg' : 'text-xl sm:text-[23px]'
          }`}
        >
          BOMBORA
        </span>
      </div>
    </div>
  );
}

export function HeroWaveCrest() {
  return (
    <svg
      viewBox="0 0 110 44"
      className="w-20 sm:w-28 h-auto text-[#25C2D1] drop-shadow-md"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 34C20 14 44 4 68 8C83 10 92 20 82 28C75 33 65 29 67 22C69 17 76 17 77 18C65 13 43 18 28 36L6 34Z"
        fill="currentColor"
      />
      <path
        d="M34 37C48 22 68 17 90 23C97 25 101 30 96 34C83 29 62 30 46 39L34 37Z"
        fill="#9BF0F7"
        opacity="0.85"
      />
      <path
        d="M92 14C96 12 101 13 103 16M85 8C89 5 94 6 96 9"
        stroke="#9BF0F7"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function HeroWaveDivider() {
  return (
    <div className="relative w-full overflow-hidden leading-none pointer-events-none select-none -mt-12 sm:-mt-20 z-20">
      <svg
        viewBox="0 0 1440 120"
        className="w-full h-16 sm:h-24 md:h-28 block"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,44 C180,92 340,12 520,48 C700,84 860,18 1060,52 C1230,80 1350,30 1440,56 L1440,120 L0,120 Z"
          fill="#0F7C8E"
          opacity="0.85"
        />
        <path
          d="M0,64 C210,18 410,96 630,60 C830,26 1020,94 1240,50 C1340,30 1400,45 1440,62 L1440,120 L0,120 Z"
          fill="#1EA6B5"
          opacity="0.65"
        />
        <path
          d="M0,84 C240,114 480,54 740,84 C980,112 1210,58 1440,86 L1440,120 L0,120 Z"
          fill="#F5F0E3"
        />
      </svg>
    </div>
  );
}

export function PalmLeftSilhouette() {
  return (
    <svg
      viewBox="0 0 260 360"
      className="w-40 sm:w-56 md:w-72 h-auto text-[#04232E] opacity-85 pointer-events-none select-none"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18 355C30 260 44 175 68 112L54 106C28 175 14 258 0 355H18Z" />
      <path d="M62 114C32 88 10 82 -12 94C12 96 36 106 55 122Z" />
      <path d="M65 112C54 72 34 46 8 36C32 54 48 80 56 114Z" />
      <path d="M66 112C82 68 112 44 146 38C115 54 90 80 74 116Z" />
      <path d="M68 114C104 92 142 94 174 114C140 108 105 108 72 122Z" />
      <path d="M65 118C92 122 122 140 144 170C115 150 90 134 62 126Z" />
      <path d="M58 118C32 126 12 146 -4 174C16 156 36 138 60 128Z" />
    </svg>
  );
}

export function CoastalWaveIllustration() {
  return (
    <svg
      viewBox="0 0 340 240"
      className="w-64 sm:w-80 lg:w-96 h-auto pointer-events-none select-none"
      fill="none"
      aria-hidden="true"
    >
      {/* Palm fronds top right */}
      <g fill="#127C8C" opacity="0.88">
        <path d="M292 42C242 26 196 34 158 58C198 48 242 46 286 58Z" />
        <path d="M294 46C258 6 218 -4 180 6C218 14 252 30 284 56Z" />
        <path d="M300 48C320 14 340 0 358 -4C334 16 318 34 306 58Z" />
        <path d="M296 52C258 66 226 92 204 126C232 100 260 80 294 64Z" />
        <path d="M306 52C300 112 296 174 306 232H286C276 172 280 112 292 54Z" />
      </g>
      {/* Crashing curl wave */}
      <path
        d="M30 218C88 182 124 116 184 102C222 93 248 118 232 148C220 170 192 166 194 146C196 132 210 130 214 134C194 118 148 134 112 218H30Z"
        fill="#0D6E7E"
      />
      <path
        d="M84 222C134 186 176 154 242 152C282 151 312 172 332 202L332 226L84 222Z"
        fill="#1DA7B8"
        opacity="0.85"
      />
      <path
        d="M150 116C164 104 182 99 200 101M174 96C192 88 214 90 228 100"
        stroke="#6CD7E2"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BrushDividerHeading({
  title,
  subtitle,
  light = false,
}: {
  title: string;
  subtitle?: string;
  light?: boolean;
}) {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-4 sm:gap-6">
        <span
          className={`hidden sm:block h-[2.5px] w-24 md:w-44 rounded-full ${
            light
              ? 'bg-gradient-to-r from-transparent to-[#3EC5D3]'
              : 'bg-gradient-to-r from-transparent to-[#1B8D9E]'
          }`}
          aria-hidden="true"
        />
        <h2
          className={`font-display text-3xl sm:text-4xl md:text-[42px] leading-tight tracking-tight ${
            light ? 'text-white' : 'text-[#083B4A]'
          }`}
          style={{ textWrap: 'balance' }}
        >
          {title}
        </h2>
        <span
          className={`hidden sm:block h-[2.5px] w-24 md:w-44 rounded-full ${
            light
              ? 'bg-gradient-to-l from-transparent to-[#3EC5D3]'
              : 'bg-gradient-to-l from-transparent to-[#1B8D9E]'
          }`}
          aria-hidden="true"
        />
      </div>
      {subtitle && (
        <p
          className={`mt-1.5 text-sm sm:text-base font-medium ${
            light ? 'text-[#CBE8EC]' : 'text-[#285966]'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function FooterTopWave() {
  return (
    <div className="relative w-full overflow-hidden leading-none pointer-events-none select-none -mb-px">
      <svg
        viewBox="0 0 1440 100"
        className="w-full h-14 sm:h-20 block"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,48 C220,92 420,12 680,46 C940,80 1160,18 1440,56 L1440,100 L0,100 Z"
          fill="#10788A"
          opacity="0.55"
        />
        <path
          d="M0,62 C260,16 510,88 780,54 C1040,22 1260,82 1440,46 L1440,100 L0,100 Z"
          fill="#074B5E"
        />
        <path
          d="M0,74 C310,100 620,46 950,76 C1180,96 1330,66 1440,78 L1440,100 L0,100 Z"
          fill="#032C38"
        />
      </svg>
    </div>
  );
}
