// Static illustrations. The hero holds the motion; these stay still.
import Image from "next/image";

export type ServiceIcon =
  | "models"
  | "agents"
  | "knowledge"
  | "integration"
  | "governance"
  | "hosting"
  | "managed";

const iconPaths: Record<ServiceIcon, React.ReactNode> = {
  // three stacked model blocks of different sizes
  models: (
    <>
      <rect x="6" y="20" width="24" height="8" rx="2" />
      <rect x="9" y="12" width="18" height="8" rx="2" />
      <rect x="12" y="4" width="12" height="8" rx="2" className="accent" />
    </>
  ),
  // one agent handing work to two others
  agents: (
    <>
      <circle cx="10" cy="18" r="4" className="accent" />
      <circle cx="27" cy="9" r="3.5" />
      <circle cx="27" cy="27" r="3.5" />
      <path d="M14 16.5 L23.5 10.5 M14 19.5 L23.5 25.5" />
    </>
  ),
  // documents feeding a memory node
  knowledge: (
    <>
      <rect x="4" y="6" width="12" height="16" rx="1.5" />
      <path d="M7 11h6M7 15h6" />
      <path d="M16 14 C21 14 21 22 25 22" />
      <circle cx="28" cy="22" r="4" className="accent" />
    </>
  ),
  // two systems joined by a connector
  integration: (
    <>
      <rect x="3" y="11" width="10" height="14" rx="2" />
      <rect x="23" y="11" width="10" height="14" rx="2" />
      <path d="M13 18h10" />
      <circle cx="18" cy="18" r="2.5" className="accent" />
    </>
  ),
  // shield with a check
  governance: (
    <>
      <path d="M18 4 L29 8 V17 C29 24 24 29 18 32 C12 29 7 24 7 17 V8 Z" />
      <path d="M13 18 L17 22 L24 14" className="accent" />
    </>
  ),
  // server inside a closed boundary
  hosting: (
    <>
      <rect x="3" y="3" width="30" height="30" rx="6" strokeDasharray="3 3" />
      <rect x="11" y="11" width="14" height="6" rx="1.5" />
      <rect x="11" y="19" width="14" height="6" rx="1.5" />
      <circle cx="14" cy="14" r="0.8" className="accent" />
      <circle cx="14" cy="22" r="0.8" className="accent" />
    </>
  ),
  // monitoring pulse
  managed: (
    <>
      <rect x="3" y="6" width="30" height="22" rx="3" />
      <path d="M7 19 H13 L16 12 L20 24 L23 17 H29" className="accent" />
    </>
  ),
};

export function ServiceGlyph({ name }: { name: ServiceIcon }) {
  return (
    <svg viewBox="0 0 36 36" className="glyph h-9 w-9 shrink-0" aria-hidden="true">
      {iconPaths[name]}
    </svg>
  );
}

// Adoption phases: departments on their own, then linked, then supervised.
const DEPTS = [40, 100, 160, 220];

// 0: each department has its own copilot. 1: one agent layer coordinates them.
// 2: a person oversees the agent layer.
export function PhaseArt({ phase }: { phase: 0 | 1 | 2 }) {
  const deptY = 104;
  return (
    <svg viewBox="0 0 260 150" className="phase-art h-auto w-full" aria-hidden="true">
      {phase === 0 &&
        DEPTS.map((x) => (
          <g key={x}>
            <path d={`M${x} 70 V${deptY - 14}`} className="link" />
            <circle cx={x} cy="64" r="6" className="copilot" />
          </g>
        ))}

      {phase >= 1 && (
        <>
          {DEPTS.map((x) => (
            <path key={x} d={`M130 62 C130 80 ${x} 74 ${x} ${deptY - 14}`} className="link" />
          ))}
          <path d={`M${DEPTS[0] + 14} ${deptY} H${DEPTS[3] - 14}`} className="link dashed" />
          <circle cx="130" cy="56" r="8" className="agent" />
        </>
      )}

      {phase === 2 && (
        <>
          <path d="M130 30 V48" className="oversight" />
          <circle cx="130" cy="12" r="5.5" className="person" />
          <path d="M121 28 C121 20 139 20 139 28" className="person" />
        </>
      )}

      {DEPTS.map((x) => (
        <rect key={x} x={x - 14} y={deptY - 14} width="28" height="28" rx="6" className="dept" />
      ))}
    </svg>
  );
}

// Data and models inside the customer's boundary; the public cloud stays outside.
export function SovereignArt() {
  return (
    <svg viewBox="0 0 520 300" className="sovereign-art h-auto w-full" aria-hidden="true">
      <rect x="10" y="20" width="330" height="260" rx="28" className="boundary" />
      <text x="34" y="52" className="label">Your environment</text>

      {/* server rack */}
      <g transform="translate(52 92)">
        {[0, 34, 68].map((y) => (
          <g key={y}>
            <rect x="0" y={y} width="86" height="26" rx="4" className="box" />
            <circle cx="14" cy={y + 13} r="2.5" className="dotted" />
            <path d={`M30 ${y + 13} H72`} className="thin" />
          </g>
        ))}
        <text x="0" y="122" className="label">Models</text>
      </g>

      {/* data store */}
      <g transform="translate(200 92)">
        <ellipse cx="44" cy="10" rx="44" ry="10" className="box" />
        <path d="M0 10 V82 C0 96 88 96 88 82 V10" className="box" />
        <path d="M0 34 C0 46 88 46 88 34 M0 58 C0 70 88 70 88 58" className="thin" />
        <text x="0" y="122" className="label">Your data</text>
      </g>

      <path d="M138 130 H200" className="flow" />

      {/* public cloud, kept out */}
      <g transform="translate(392 104)">
        <path
          d="M20 62 C2 62 0 38 18 36 C18 14 48 8 58 26 C66 12 92 16 92 38 C108 38 110 62 92 62 Z"
          className="cloud"
        />
        <text x="12" y="92" className="label">Public cloud</text>
      </g>
      <path d="M340 140 H392" className="blocked" />
      <path d="M359 131 L373 149 M373 131 L359 149" className="cross" />
    </svg>
  );
}

// Browser chrome around a product screenshot.
export function BrowserFrame({ src, alt, url }: { src: string; alt: string; url: string }) {
  const host = url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return (
    <div className="overflow-hidden rounded-2xl border border-line/80 bg-ink">
      <div className="flex items-center gap-2 border-b border-line/80 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="ml-3 truncate rounded-full bg-deep px-3 py-0.5 text-xs text-mist">{host}</span>
      </div>
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={750}
        sizes="(min-width: 768px) 560px, 100vw"
        className="block h-auto w-full transition-transform duration-700 group-hover:scale-[1.02]"
      />
    </div>
  );
}
