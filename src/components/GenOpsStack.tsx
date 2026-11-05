"use client";

import { useState } from "react";

type Layer = { name: string; short: string; body: string };

const PW = 150; // half width of a plate
const PH = 78; // half height (isometric)
const DEPTH = 9;
const GAP = 52;
const CX = 180;
const TOP = 96;

function Plate({ i, active, lift, onSelect }: { i: number; active: boolean; lift: boolean; onSelect: () => void }) {
  const cy = TOP + i * GAP;
  const top = `${CX},${cy - PH} ${CX + PW},${cy} ${CX},${cy + PH} ${CX - PW},${cy}`;
  const left = `${CX - PW},${cy} ${CX},${cy + PH} ${CX},${cy + PH + DEPTH} ${CX - PW},${cy + DEPTH}`;
  const right = `${CX},${cy + PH} ${CX + PW},${cy} ${CX + PW},${cy + DEPTH} ${CX},${cy + PH + DEPTH}`;
  return (
    <g
      className="plate"
      data-active={active || undefined}
      style={{ transform: `translateY(${lift ? -30 : 0}px)` }}
      onClick={onSelect}
    >
      <polygon points={left} className="plate-side-l" />
      <polygon points={right} className="plate-side-r" />
      <polygon points={top} className="plate-top" />
      {/* inner grid lines hint at the layer's structure */}
      <polyline
        points={`${CX - PW / 2},${cy - PH / 2} ${CX + PW / 2},${cy + PH / 2}`}
        className="plate-grid"
      />
      <polyline
        points={`${CX + PW / 2},${cy - PH / 2} ${CX - PW / 2},${cy + PH / 2}`}
        className="plate-grid"
      />
    </g>
  );
}

export default function GenOpsStack({ layers, hint }: { layers: Layer[]; hint: string }) {
  const [active, setActive] = useState(0);
  const current = layers[active];

  return (
    <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <div>
        <p className="mb-5 text-sm text-mist">{hint}</p>
        <ul className="border-t border-line" role="list">
          {layers.map((layer, i) => (
            <li key={layer.name} className="border-b border-line">
              <button
                type="button"
                aria-pressed={i === active}
                onClick={() => setActive(i)}
                className={`group flex w-full items-baseline justify-between gap-6 py-4 text-left transition-colors ${
                  i === active ? "text-frost" : "text-mist hover:text-frost"
                }`}
              >
                <span className="text-lg">{layer.name}</span>
                <span className={`text-sm ${i === active ? "text-sand" : ""}`}>{layer.short}</span>
              </button>
            </li>
          ))}
        </ul>
        <div aria-live="polite" className="mt-8 min-h-32">
          <h3 className="font-display text-2xl text-frost">{current.name}</h3>
          <p className="mt-3 max-w-prose leading-relaxed text-mist">{current.body}</p>
        </div>
      </div>

      <svg
        viewBox="0 0 360 470"
        className="genops-stack order-first mx-auto h-auto w-full max-w-72 sm:max-w-md lg:order-none"
        aria-hidden="true"
      >
        {/* draw bottom plate first so upper plates overlap it */}
        {layers
          .map((_, i) => i)
          .reverse()
          .map((i) => (
            <Plate key={i} i={i} active={i === active} lift={i < active} onSelect={() => setActive(i)} />
          ))}
      </svg>
    </div>
  );
}
