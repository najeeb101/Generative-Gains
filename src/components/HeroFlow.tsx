"use client";

import { useEffect, useRef } from "react";

// Work flows from existing systems (left) into the GenOps hub on the slash from
// the logo, pauses there, then leaves as a finished task (right). Particles only
// ever travel along the drawn routes.

const W = 720;
const H = 520;
const LEFT_X = 126;
const RIGHT_X = 560;
const SLASH = { x1: 452, y1: 24, x2: 268, y2: 496 };
const HUB = { x: (SLASH.x1 + SLASH.x2) / 2, y: (SLASH.y1 + SLASH.y2) / 2 };
const PARTICLES = 7;

const rowY = (i: number, n: number) => 70 + i * ((H - 140) / (n - 1));

type Pt = { x: number; y: number };
type Curve = [Pt, Pt, Pt, Pt];

const inCurve = (y: number): Curve => [
  { x: LEFT_X, y },
  { x: LEFT_X + 130, y },
  { x: HUB.x - 120, y: HUB.y },
  HUB,
];
const outCurve = (y: number): Curve => [
  HUB,
  { x: HUB.x + 120, y: HUB.y },
  { x: RIGHT_X - 130, y },
  { x: RIGHT_X, y },
];

const curvePath = ([a, b, c, d]: Curve) => `M${a.x},${a.y} C${b.x},${b.y} ${c.x},${c.y} ${d.x},${d.y}`;

function at([a, b, c, d]: Curve, t: number): Pt {
  const u = 1 - t;
  const k0 = u * u * u, k1 = 3 * u * u * t, k2 = 3 * u * t * t, k3 = t * t * t;
  return { x: k0 * a.x + k1 * b.x + k2 * c.x + k3 * d.x, y: k0 * a.y + k1 * b.y + k2 * c.y + k3 * d.y };
}

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

type Particle = { from: number; to: number; t: number; dur: number; wait: number; hubbed: boolean };

export default function HeroFlow({ inputs, outcomes }: { inputs: string[]; outcomes: string[] }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const dotRefs = useRef<(SVGGElement | null)[]>([]);
  const inRefs = useRef<(SVGGElement | null)[]>([]);
  const outRefs = useRef<(SVGGElement | null)[]>([]);
  const hubRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const nIn = inputs.length;
    const nOut = outcomes.length;
    const inCurves = inputs.map((_, i) => inCurve(rowY(i, nIn)));
    const outCurves = outcomes.map((_, i) => outCurve(rowY(i, nOut)));
    const rand = (n: number) => Math.floor(Math.random() * n);
    const spawn = (wait: number): Particle => ({
      from: rand(nIn),
      to: rand(nOut),
      t: 0,
      dur: 3400 + Math.random() * 1000,
      wait,
      hubbed: false,
    });

    const particles = Array.from({ length: PARTICLES }, (_, i) => spawn(i * 600));
    const timers: number[] = [];

    const flash = (el: Element | null, ms = 900) => {
      if (!el) return;
      el.classList.add("is-hit");
      timers.push(window.setTimeout(() => el.classList.remove("is-hit"), ms));
    };

    // First half of t travels into the hub, second half out to the outcome.
    // Each half eases in and out, so work slows down at GenOps before leaving.
    const position = (p: Particle) => {
      if (p.t < 0.5) return { pos: at(inCurves[p.from], easeInOut(p.t / 0.5)), done: false };
      return { pos: at(outCurves[p.to], easeInOut((p.t - 0.5) / 0.5)), done: true };
    };

    const draw = (i: number, p: Particle) => {
      const g = dotRefs.current[i];
      if (!g) return;
      const { pos, done } = position(p);
      const visible = p.wait <= 0 && p.t > 0 && p.t < 1;
      g.setAttribute("transform", `translate(${pos.x.toFixed(1)} ${pos.y.toFixed(1)})`);
      g.style.opacity = visible ? "1" : "0";
      g.classList.toggle("is-crossed", done);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      particles.forEach((p, i) => {
        p.wait = 0;
        p.t = 0.12 + (i / PARTICLES) * 0.76;
        draw(i, p);
      });
      return;
    }

    let raf = 0;
    let last = 0;
    let running = false;

    const tick = (now: number) => {
      const dt = last ? Math.min(64, Math.max(0, now - last)) : 16;
      last = now;
      particles.forEach((p, i) => {
        if (p.wait > 0) {
          p.wait -= dt;
          if (p.wait <= 0) flash(inRefs.current[p.from]);
        } else {
          p.t += dt / p.dur;
          if (!p.hubbed && p.t >= 0.5) {
            p.hubbed = true;
            flash(hubRef.current, 500);
          }
          if (p.t >= 1) {
            flash(outRefs.current[p.to]);
            particles[i] = spawn(300 + Math.random() * 1200);
          }
        }
        draw(i, particles[i]);
      });
      if (running) raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    if (svgRef.current) io.observe(svgRef.current);

    return () => {
      stop();
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [inputs, outcomes]);

  const angle = (Math.atan2(SLASH.y1 - SLASH.y2, SLASH.x1 - SLASH.x2) * 180) / Math.PI;

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${W} ${H}`}
      className="hero-flow mx-auto h-auto w-full max-w-xl lg:max-w-none"
      role="img"
      aria-label="Work from systems like ERP, CRM and ticketing passes through GenOps and comes out as finished tasks such as matched invoices and resolved tickets."
    >
      <defs>
        <linearGradient id="slash" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--frost)" stopOpacity="0" />
          <stop offset="0.25" stopColor="var(--frost)" stopOpacity="0.7" />
          <stop offset="0.75" stopColor="var(--frost)" stopOpacity="0.7" />
          <stop offset="1" stopColor="var(--frost)" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="glow">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.45" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Routes: every system into the hub, the hub out to every outcome */}
      {inputs.map((_, i) => (
        <path key={`in${i}`} d={curvePath(inCurve(rowY(i, inputs.length)))} className="flow-route" />
      ))}
      {outcomes.map((_, i) => (
        <path key={`out${i}`} d={curvePath(outCurve(rowY(i, outcomes.length)))} className="flow-route" />
      ))}

      {/* The GenOps line, label up and away from the busy hub */}
      <line {...SLASH} stroke="url(#slash)" strokeWidth="1.25" />
      <text
        transform={`translate(${HUB.x} ${HUB.y}) rotate(${angle}) translate(70 -12)`}
        className="fill-sand font-display"
        fontSize="16"
        letterSpacing="4"
      >
        GenOps
      </text>

      <circle cx={HUB.x} cy={HUB.y} r="18" className="flow-hub-ring" ref={hubRef} />
      <circle cx={HUB.x} cy={HUB.y} r="3" className="flow-hub" />

      {inputs.map((label, i) => (
        <g key={label} ref={(el) => { inRefs.current[i] = el; }} className="flow-node">
          <text x={LEFT_X - 16} y={rowY(i, inputs.length) + 5} textAnchor="end" fontSize="16">
            {label}
          </text>
          <circle cx={LEFT_X} cy={rowY(i, inputs.length)} r="4" />
        </g>
      ))}

      {outcomes.map((label, i) => (
        <g key={label} ref={(el) => { outRefs.current[i] = el; }} className="flow-node flow-out">
          <circle cx={RIGHT_X} cy={rowY(i, outcomes.length)} r="4" />
          <text x={RIGHT_X + 16} y={rowY(i, outcomes.length) + 5} fontSize="16">
            {label}
          </text>
        </g>
      ))}

      {Array.from({ length: PARTICLES }, (_, i) => (
        <g key={i} ref={(el) => { dotRefs.current[i] = el; }} className="flow-dot" style={{ opacity: 0 }}>
          <circle r="12" fill="url(#glow)" />
          <circle r="3" fill="currentColor" />
        </g>
      ))}
    </svg>
  );
}
