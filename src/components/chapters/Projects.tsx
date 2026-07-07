"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ChapterHeading from "@/components/ChapterHeading";
import { useReveal } from "@/lib/useReveal";

gsap.registerPlugin(ScrollTrigger);

/* ----------------------------- Spread shell ----------------------------- */

function SpreadHeader({
  index,
  name,
  role,
  stack,
}: {
  index: string;
  name: string;
  role: string;
  stack: string;
}) {
  return (
    <div data-reveal className="flex flex-wrap items-baseline gap-x-6 gap-y-2 border-b border-ink/15 pb-4">
      <span className="font-serif-display italic text-2xl text-champagne">{index}</span>
      <h3 className="font-serif-display text-4xl md:text-6xl font-medium text-ink-deep">{name}</h3>
      <span className="text-xs tracking-[0.3em] uppercase text-warmgray ml-auto">{role}</span>
      <span className="w-full text-sm text-warmgray">{stack}</span>
    </div>
  );
}

/* ------------------------------ EngiVerse ------------------------------- */

function EngiVerse() {
  const boardRef = useRef<SVGSVGElement>(null);

  // The whiteboard architecture sketch draws itself when it scrolls in,
  // and re-draws on hover.
  useEffect(() => {
    const svg = boardRef.current;
    if (!svg) return;
    const strokes = svg.querySelectorAll<SVGPathElement>("[data-stroke]");

    const draw = (delayStep = 0.25) => {
      strokes.forEach((p, i) => {
        const len = p.getTotalLength();
        gsap.fromTo(
          p,
          { strokeDasharray: len, strokeDashoffset: len },
          { strokeDashoffset: 0, duration: 0.9, delay: i * delayStep, ease: "power2.inOut" }
        );
      });
    };

    const st = ScrollTrigger.create({
      trigger: svg,
      start: "top 78%",
      once: true,
      onEnter: () => draw(),
    });

    const onEnter = () => draw(0.12);
    svg.addEventListener("mouseenter", onEnter);
    return () => {
      st.kill();
      svg.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  const stickies = [
    { text: "what if college projects\nhad a real home?", color: "#F4E9C9", r: "-2deg" },
    { text: "students ↔ mentors\n↔ opportunities", color: "#EFD9DF", r: "1.5deg" },
    { text: "ship the MVP.\npolish forever.", color: "#DFE6DA", r: "-1deg" },
  ];

  const commits = [
    "feat: onboarding flow with campus verification",
    "feat: project showcase pages + rich embeds",
    "fix: debounce search, 10× faster results",
    "chore: dark-ivory theme pass on every screen",
  ];

  return (
    <article className="mx-auto max-w-6xl px-6 py-24">
      <SpreadHeader
        index="No. 1"
        name="EngiVerse"
        role="Founder-energy side project"
        stack="Next.js · TypeScript · MongoDB · Node.js"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
        <div>
          <p data-reveal className="font-serif-display text-2xl leading-snug text-ink">
            A universe for engineering students — projects, teammates, and mentorship in one
            place. It began exactly like this page looks: sticky notes on a wall.
          </p>

          <div className="flex flex-wrap gap-5 mt-10">
            {stickies.map((s, i) => (
              <div key={i} data-reveal data-reveal-delay={String(i * 0.1)}>
                <div
                  className="sticky-note w-44 p-4"
                  style={{ background: s.color, transform: `rotate(${s.r})` }}
                >
                  <p className="font-hand text-xl leading-snug whitespace-pre-line text-ink">{s.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div data-reveal className="mt-10 paper-card p-5 rounded-sm">
            <p className="text-[10px] tracking-[0.3em] uppercase text-warmgray mb-3">git log — the honest diary</p>
            <ul className="space-y-2 font-mono text-[13px] text-ink/85">
              {commits.map((c, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-champagne">{String(i + 1).padStart(2, "0")}</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* whiteboard */}
        <div data-reveal data-reveal-delay="0.2" className="relative">
          <div className="paper-card p-6 rotate-1 relative">
            <span className="tape -top-3 left-10 -rotate-6" />
            <span className="tape -top-3 right-10 rotate-6" />
            <p className="font-hand text-2xl text-warmgray mb-2">the architecture, v0 → hover to redraw</p>
            <svg ref={boardRef} viewBox="0 0 420 300" className="w-full h-auto bg-[#fdfcf8] cursor-crosshair">
              <path data-stroke d="M40 40 h110 v54 h-110 z" fill="none" stroke="#232323" strokeWidth="2" />
              <path data-stroke d="M270 40 h110 v54 h-110 z" fill="none" stroke="#232323" strokeWidth="2" />
              <path data-stroke d="M155 150 h110 v54 h-110 z" fill="none" stroke="#232323" strokeWidth="2" />
              <path data-stroke d="M40 236 h110 v40 h-110 z" fill="none" stroke="#232323" strokeWidth="2" />
              <path data-stroke d="M270 236 h110 v40 h-110 z" fill="none" stroke="#232323" strokeWidth="2" />
              <path data-stroke d="M150 67 q 60 -20 120 0" fill="none" stroke="#D9A7B5" strokeWidth="2" />
              <path data-stroke d="M95 94 q 30 40 80 56" fill="none" stroke="#C4A484" strokeWidth="2" />
              <path data-stroke d="M325 94 q -30 40 -80 56" fill="none" stroke="#C4A484" strokeWidth="2" />
              <path data-stroke d="M180 204 q -40 20 -70 32" fill="none" stroke="#A8B6A0" strokeWidth="2" />
              <path data-stroke d="M240 204 q 40 20 70 32" fill="none" stroke="#A8B6A0" strokeWidth="2" />
              <text x="95" y="72" textAnchor="middle" className="font-hand" fontSize="17" fill="#232323">students</text>
              <text x="325" y="72" textAnchor="middle" className="font-hand" fontSize="17" fill="#232323">mentors</text>
              <text x="210" y="182" textAnchor="middle" className="font-hand" fontSize="17" fill="#232323">EngiVerse API</text>
              <text x="95" y="261" textAnchor="middle" className="font-hand" fontSize="15" fill="#232323">MongoDB</text>
              <text x="325" y="261" textAnchor="middle" className="font-hand" fontSize="15" fill="#232323">projects feed</text>
            </svg>
          </div>
          <div className="coffee-stain w-20 h-20 -bottom-8 right-6" />
        </div>
      </div>
    </article>
  );
}

/* --------------------------- Wedding Platform --------------------------- */

function WeddingPlatform() {
  const [rsvp, setRsvp] = useState<null | "joy" | "regret">(null);

  const tables = [
    { name: "Rose", seats: 6, x: "10%", y: "18%" },
    { name: "Jasmine", seats: 8, x: "58%", y: "16%" },
    { name: "Marigold", seats: 6, x: "20%", y: "58%" },
    { name: "Lotus", seats: 8, x: "64%", y: "56%" },
  ];

  return (
    <article className="bg-ivory paper-texture">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SpreadHeader
          index="No. 2"
          name="Wedding Platform"
          role="Full product design & build"
          stack="React · Node.js · MySQL · TailwindCSS"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-14 items-start">
          {/* invitation */}
          <div data-reveal className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm bg-[#fbf8f2] border border-champagne/50 p-10 text-center shadow-[0_24px_60px_-20px_rgba(35,35,35,0.25)] -rotate-1">
              <div className="absolute inset-2 border border-champagne/40 pointer-events-none" />
              <p className="text-[10px] tracking-[0.5em] uppercase text-warmgray">Together with their families</p>
              <h4 className="gold-foil font-serif-display text-5xl mt-6">Every Couple</h4>
              <p className="font-serif-display italic text-xl text-warmgray mt-2">deserves software this considered</p>
              <div className="mx-auto my-6 h-px w-24 bg-champagne/60" />
              <p className="text-sm text-warmgray leading-relaxed">
                Invitations, RSVPs, guest lists, seating — a wedding&apos;s entire paper trail,
                reimagined as one graceful product.
              </p>
              <div className="mt-8 flex justify-center gap-3">
                <button
                  onClick={() => setRsvp("joy")}
                  className={`px-5 py-2 text-xs tracking-[0.2em] uppercase border transition-all duration-500 cursor-pointer ${
                    rsvp === "joy"
                      ? "bg-champagne text-white border-champagne"
                      : "border-champagne text-champagne hover:bg-champagne/10"
                  }`}
                >
                  Joyfully accepts
                </button>
                <button
                  onClick={() => setRsvp("regret")}
                  className={`px-5 py-2 text-xs tracking-[0.2em] uppercase border transition-all duration-500 cursor-pointer ${
                    rsvp === "regret"
                      ? "bg-warmgray text-white border-warmgray"
                      : "border-warmgray/50 text-warmgray hover:bg-warmgray/10"
                  }`}
                >
                  Regretfully declines
                </button>
              </div>
              {rsvp && (
                <p className="font-hand text-2xl text-blush mt-5">
                  {rsvp === "joy" ? "wonderful — a seat awaits ♡" : "you'll be missed. cake will be saved."}
                </p>
              )}
              {/* travel stamp */}
              <div className="absolute -top-5 -right-5 rotate-12 w-20 h-20 rounded-full border-2 border-blush/60 flex items-center justify-center">
                <span className="font-hand text-sm text-blush leading-tight text-center">RSVP&apos;d<br />with love</span>
              </div>
            </div>
          </div>

          {/* seating chart */}
          <div data-reveal data-reveal-delay="0.15" className="lg:col-span-7">
            <p className="font-hand text-2xl text-warmgray mb-4">the seating planner — hover a table</p>
            <div className="relative h-80 paper-card rounded-sm overflow-hidden">
              <div className="absolute inset-x-0 top-0 py-2 text-center text-[10px] tracking-[0.4em] uppercase text-warmgray border-b border-ink/10">
                Reception Hall · Plan A
              </div>
              {tables.map((t) => (
                <div
                  key={t.name}
                  className="group absolute"
                  style={{ left: t.x, top: t.y }}
                >
                  <div className="relative w-28 h-28 rounded-full border-2 border-champagne/60 bg-linen flex items-center justify-center transition-all duration-500 group-hover:border-blush group-hover:scale-105 cursor-pointer">
                    <span className="font-serif-display italic text-lg text-ink">{t.name}</span>
                    {Array.from({ length: t.seats }).map((_, i) => {
                      const a = (i / t.seats) * Math.PI * 2;
                      return (
                        <span
                          key={i}
                          className="absolute w-4 h-4 rounded-full bg-champagne/50 group-hover:bg-blush transition-colors duration-500"
                          style={{
                            left: `calc(50% + ${Math.cos(a) * 66}px - 8px)`,
                            top: `calc(50% + ${Math.sin(a) * 66}px - 8px)`,
                            transitionDelay: `${i * 45}ms`,
                          }}
                        />
                      );
                    })}
                  </div>
                  <p className="text-center text-[11px] text-warmgray mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {t.seats} guests seated
                  </p>
                </div>
              ))}
            </div>
            <p data-reveal className="mt-6 text-warmgray leading-relaxed max-w-lg">
              Drag-and-drop seating, dietary notes, printable place cards. The couple plans the
              day; the software worries about the details.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

/* -------------------------------- HR Tool ------------------------------- */

function HRTool() {
  const stages = [
    { name: "Applied", people: ["A. Verma", "R. Iyer", "S. Khan"] },
    { name: "Screening", people: ["P. Nair", "T. Bose"] },
    { name: "Interview", people: ["M. Shah"] },
    { name: "Offer", people: ["D. Rao"] },
  ] as const;

  const [aiPick, setAiPick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setAiPick((p) => (p + 1) % 3), 3200);
    return () => clearInterval(t);
  }, []);

  const recommendations = [
    "M. Shah's take-home shows unusually clean state management — fast-track to final round.",
    "T. Bose and the design-systems role are a 92% skills match.",
    "Screening queue is ageing: 2 candidates have waited 4+ days.",
  ];

  return (
    <article className="mx-auto max-w-6xl px-6 py-24">
      <SpreadHeader
        index="No. 3"
        name="HR Tool"
        role="AI-assisted recruitment board"
        stack="React · Python · LLMs · MongoDB"
      />

      <p data-reveal className="font-serif-display text-2xl leading-snug text-ink max-w-2xl mt-10">
        Hiring is a hundred small judgement calls. This board keeps the humans deciding —
        and lets the AI do the remembering.
      </p>

      <div data-reveal data-reveal-delay="0.15" className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
        {stages.map((stage, si) => (
          <div key={stage.name} className="paper-card rounded-sm p-4 min-h-56">
            <div className="flex items-baseline justify-between border-b border-ink/10 pb-2">
              <span className="text-[10px] tracking-[0.25em] uppercase text-warmgray">{stage.name}</span>
              <span className="font-serif-display italic text-champagne">{stage.people.length}</span>
            </div>
            <div className="mt-3 space-y-3">
              {stage.people.map((p, i) => (
                <div
                  key={p}
                  className="float-slow bg-[#fdfcf8] border border-ink/8 p-3 shadow-sm"
                  style={{ animationDelay: `${(si * 3 + i) * 0.7}s`, ["--r" as string]: `${(i % 2 ? 1 : -1) * 0.8}deg` }}
                >
                  <p className="text-sm font-medium text-ink">{p}</p>
                  <div className="mt-1.5 h-1 rounded-full bg-linen overflow-hidden">
                    <div
                      className="h-full bg-sage"
                      style={{ width: `${55 + ((si * 17 + i * 23) % 40)}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-warmgray mt-1">resume · notes · fit</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div data-reveal className="mt-8 flex items-start gap-4 max-w-2xl">
        <span className="mt-1 inline-block w-2.5 h-2.5 rounded-full bg-blush animate-pulse" />
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-warmgray">AI suggests · live</p>
          <p key={aiPick} className="font-hand text-2xl text-ink mt-1">
            {recommendations[aiPick]}
          </p>
        </div>
      </div>
    </article>
  );
}

/* ---------------------------- Graph Visualizer --------------------------- */

const NODES = [
  { id: 0, x: 210, y: 50 },
  { id: 1, x: 90, y: 130 },
  { id: 2, x: 330, y: 130 },
  { id: 3, x: 40, y: 240 },
  { id: 4, x: 160, y: 230 },
  { id: 5, x: 280, y: 240 },
  { id: 6, x: 380, y: 240 },
  { id: 7, x: 210, y: 320 },
];
const EDGES: [number, number][] = [
  [0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6], [4, 7], [5, 7],
];
const BFS_ORDER = [0, 1, 2, 3, 4, 5, 6, 7];
const DFS_ORDER = [0, 1, 3, 4, 7, 5, 2, 6];

const NARRATION: Record<"bfs" | "dfs", string[]> = {
  bfs: [
    "Start at the root. Everything else is unknown.",
    "Visit every neighbour first — breadth before depth.",
    "The frontier expands like ripples on paper.",
    "Level by level, no node left behind.",
    "The queue remembers who's next.",
    "Still sweeping the same level…",
    "…before descending to the next.",
    "Done — shortest paths fall out for free.",
  ],
  dfs: [
    "Start at the root, pick a door, and commit.",
    "Go deep before you go wide.",
    "Deeper still — the stack keeps the way home.",
    "Follow one branch to its very end…",
    "…the bottom! Now backtrack.",
    "Unwind, then dive down the next branch.",
    "The other subtree, at last.",
    "Done — every path fully explored.",
  ],
};

function GraphVisualizer() {
  const [mode, setMode] = useState<"bfs" | "dfs" | null>(null);
  const [step, setStep] = useState(-1);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const run = (m: "bfs" | "dfs") => {
    if (timer.current) clearInterval(timer.current);
    setMode(m);
    setStep(0);
    timer.current = setInterval(() => {
      setStep((prev) => {
        if (prev >= NODES.length - 1) {
          if (timer.current) clearInterval(timer.current);
          return prev;
        }
        return prev + 1;
      });
    }, 700);
  };

  useEffect(() => () => { if (timer.current) clearInterval(timer.current); }, []);

  const order = mode ? (mode === "bfs" ? BFS_ORDER : DFS_ORDER) : [];
  const visited = new Set(order.slice(0, step + 1));
  const current = step >= 0 ? order[step] : -1;

  return (
    <article className="graph-paper paper-texture">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SpreadHeader
          index="No. 4"
          name="Graph Visualizer"
          role="Algorithms, drawn by hand"
          stack="Java · DSA · Canvas · SVG"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12 items-center">
          <div>
            <p data-reveal className="font-serif-display text-2xl leading-snug text-ink">
              The notebook turns mathematical. A graph sketched in the margin — until you ask it
              to move. Then the drawing becomes the algorithm.
            </p>
            <div data-reveal className="mt-8 flex gap-4">
              <button
                onClick={() => run("bfs")}
                className={`px-6 py-3 text-xs tracking-[0.25em] uppercase border transition-all duration-500 cursor-pointer ${
                  mode === "bfs" ? "bg-ink text-paper border-ink" : "border-ink/40 text-ink hover:border-ink"
                }`}
              >
                Run BFS
              </button>
              <button
                onClick={() => run("dfs")}
                className={`px-6 py-3 text-xs tracking-[0.25em] uppercase border transition-all duration-500 cursor-pointer ${
                  mode === "dfs" ? "bg-ink text-paper border-ink" : "border-ink/40 text-ink hover:border-ink"
                }`}
              >
                Run DFS
              </button>
            </div>
            <div data-reveal className="mt-8 min-h-16">
              {mode && step >= 0 && (
                <p key={`${mode}-${step}`} className="font-hand text-2xl text-ink">
                  {NARRATION[mode][step]}
                </p>
              )}
              {mode && (
                <p className="text-xs tracking-[0.2em] uppercase text-warmgray mt-2">
                  visit order · {order.slice(0, step + 1).join(" → ")}
                </p>
              )}
            </div>
          </div>

          <div data-reveal data-reveal-delay="0.15">
            <svg viewBox="0 0 420 370" className="w-full h-auto">
              {EDGES.map(([a, b], i) => {
                const na = NODES[a];
                const nb = NODES[b];
                const lit = visited.has(a) && visited.has(b);
                return (
                  <path
                    key={i}
                    d={`M${na.x} ${na.y} Q ${(na.x + nb.x) / 2 + (i % 2 ? 10 : -10)} ${(na.y + nb.y) / 2} ${nb.x} ${nb.y}`}
                    fill="none"
                    stroke={lit ? "#C4A484" : "#6E675F"}
                    strokeWidth={lit ? 3 : 1.6}
                    strokeDasharray={lit ? "none" : "5 5"}
                    style={{ transition: "stroke 0.5s, stroke-width 0.5s" }}
                  />
                );
              })}
              {NODES.map((n) => {
                const isVisited = visited.has(n.id);
                const isCurrent = n.id === current;
                return (
                  <g key={n.id} style={{ transition: "transform 0.5s" }}>
                    <circle
                      cx={n.x}
                      cy={n.y}
                      r={isCurrent ? 24 : 19}
                      fill={isCurrent ? "#D9A7B5" : isVisited ? "#A8B6A0" : "#F4EEE5"}
                      stroke="#232323"
                      strokeWidth="2"
                      style={{ transition: "all 0.5s cubic-bezier(0.22,1,0.36,1)" }}
                    />
                    <text
                      x={n.x}
                      y={n.y + 5}
                      textAnchor="middle"
                      fontSize="15"
                      fill={isVisited || isCurrent ? "#181818" : "#6E675F"}
                      className="font-hand"
                    >
                      {n.id}
                    </text>
                  </g>
                );
              })}
            </svg>
            <p className="font-hand text-xl text-warmgray text-center mt-2">
              fig. 4 — a graph, waking up
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

/* -------------------------------- Chapter -------------------------------- */

export default function Projects() {
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} id="projects" className="relative bg-paper paper-texture">
      <ChapterHeading number="03" title="Projects" note="four spreads, four worlds" />
      <EngiVerse />
      <WeddingPlatform />
      <HRTool />
      <GraphVisualizer />
    </section>
  );
}
