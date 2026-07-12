"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import ChapterHeading from "@/components/ChapterHeading";
import { useReveal } from "@/lib/useReveal";

gsap.registerPlugin(ScrollTrigger);

/* ----------------------------- Spread shell ----------------------------- */

function SpreadHeader({
  index,
  name,
  role,
  stack,
  repo,
}: {
  index: string;
  name: string;
  role: string;
  stack: string;
  repo?: string;
}) {
  return (
    <div data-reveal className="flex flex-wrap items-baseline gap-x-6 gap-y-2 border-b border-ink/15 pb-4">
      <span className="font-serif-display italic text-2xl text-champagne">{index}</span>
      <h3 className="font-serif-display text-4xl md:text-6xl font-medium text-ink-deep">{name}</h3>
      <span className="text-xs tracking-[0.3em] uppercase text-warmgray ml-auto">{role}</span>
      <span className="text-sm text-warmgray">{stack}</span>
      {repo && (
        <a
          href={repo}
          target="_blank"
          rel="noreferrer"
          className="ml-auto text-xs tracking-[0.25em] uppercase text-champagne underline-offset-4 hover:underline"
        >
          git repository ↗
        </a>
      )}
    </div>
  );
}

/* ------------------------------ EngiVerse ------------------------------- */

// TODO: replace with the real repository URLs.
const ENGIVERSE_REPO = "https://github.com/";
const WEDDING_REPO = "https://github.com/";

function EngiVerse() {
  const boardRef = useRef<SVGSVGElement>(null);

  // The pipeline sketch draws itself when it scrolls in, and re-draws on hover.
  useEffect(() => {
    const svg = boardRef.current;
    if (!svg) return;
    const strokes = svg.querySelectorAll<SVGPathElement>("[data-stroke]");

    const draw = (delayStep = 0.22) => {
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

    const onEnter = () => draw(0.1);
    svg.addEventListener("mouseenter", onEnter);
    return () => {
      st.kill();
      svg.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  const stickies = [
    { text: "nobody scores repos:\ncompliance · viability ·\nfinancial fit", color: "#F4E9C9", r: "-2deg" },
    { text: "static analysis + LLM\njudgment — hybrid,\nnot either/or", color: "#EFD9DF", r: "1.5deg" },
    { text: "agents that carry\ncontext, step → step", color: "#DFE6DA", r: "-1deg" },
  ];

  const commits = [
    "feat: MCP multi-agent orchestration for repo audits",
    "feat: hybrid pipeline — semgrep + eslint/tsc + bandit",
    "feat: LLM-as-judge scoring (compliance · viability)",
    "fix: cross-file reasoning catches dead code & intent gaps",
  ];

  return (
    <article className="mx-auto max-w-6xl px-6 py-24">
      <SpreadHeader
        index="No. 1"
        name="EngiVerse"
        role="Agentic repo intelligence"
        stack="Next.js · TypeScript · MCP · LLMs · Semgrep"
        repo={ENGIVERSE_REPO}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
        <div>
          <p data-reveal className="font-serif-display text-2xl leading-snug text-ink">
            An agentic pipeline that reads a git repository the way a senior engineer would —
            finding bugs, errors, dead code, and future improvements, then helping you fix them.
          </p>
          <p data-reveal className="mt-5 text-warmgray leading-relaxed max-w-lg">
            Existing research stops at code explanation. EngiVerse chains autonomous agents —
            static analysis, build-log judgment, and an LLM judge — into one repo-intelligence
            and risk-scoring workflow that no single tool covers.
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

        {/* whiteboard: the agent pipeline */}
        <div data-reveal data-reveal-delay="0.2" className="relative">
          <div className="paper-card p-6 rotate-1 relative">
            <span className="tape -top-3 left-10 -rotate-6" />
            <span className="tape -top-3 right-10 rotate-6" />
            <p className="font-hand text-2xl text-warmgray mb-2">the agent pipeline → hover to redraw</p>
            <svg ref={boardRef} viewBox="0 0 420 320" className="w-full h-auto bg-[#fdfcf8] cursor-crosshair">
              {/* repo */}
              <path data-stroke d="M155 20 h110 v44 h-110 z" fill="none" stroke="#232323" strokeWidth="2" />
              {/* static analysis */}
              <path data-stroke d="M30 118 h150 v50 h-150 z" fill="none" stroke="#232323" strokeWidth="2" />
              {/* llm judge */}
              <path data-stroke d="M240 118 h150 v50 h-150 z" fill="none" stroke="#232323" strokeWidth="2" />
              {/* risk score */}
              <path data-stroke d="M60 232 h120 v46 h-120 z" fill="none" stroke="#232323" strokeWidth="2" />
              {/* fixes */}
              <path data-stroke d="M240 232 h120 v46 h-120 z" fill="none" stroke="#232323" strokeWidth="2" />
              {/* arrows */}
              <path data-stroke d="M175 64 q -60 20 -70 52" fill="none" stroke="#C4A484" strokeWidth="2" />
              <path data-stroke d="M245 64 q 60 20 70 52" fill="none" stroke="#C4A484" strokeWidth="2" />
              <path data-stroke d="M180 143 q 30 0 60 0" fill="none" stroke="#D9A7B5" strokeWidth="2" strokeDasharray="6 5" />
              <path data-stroke d="M108 168 q 4 34 12 62" fill="none" stroke="#A8B6A0" strokeWidth="2" />
              <path data-stroke d="M312 168 q -4 34 -12 62" fill="none" stroke="#A8B6A0" strokeWidth="2" />
              <path data-stroke d="M180 258 q 30 -6 60 0" fill="none" stroke="#D9A7B5" strokeWidth="2" />
              <text x="210" y="47" textAnchor="middle" className="font-hand" fontSize="17" fill="#232323">git repo in</text>
              <text x="105" y="138" textAnchor="middle" className="font-hand" fontSize="15" fill="#232323">static analysis</text>
              <text x="105" y="157" textAnchor="middle" className="font-hand" fontSize="12" fill="#6E675F">semgrep · eslint · bandit</text>
              <text x="315" y="138" textAnchor="middle" className="font-hand" fontSize="15" fill="#232323">LLM as judge</text>
              <text x="315" y="157" textAnchor="middle" className="font-hand" fontSize="12" fill="#6E675F">intent vs implementation</text>
              <text x="120" y="252" textAnchor="middle" className="font-hand" fontSize="15" fill="#232323">risk score</text>
              <text x="120" y="270" textAnchor="middle" className="font-hand" fontSize="12" fill="#6E675F">bugs · dead code · trust</text>
              <text x="300" y="252" textAnchor="middle" className="font-hand" fontSize="15" fill="#232323">fixes, suggested</text>
              <text x="300" y="270" textAnchor="middle" className="font-hand" fontSize="12" fill="#6E675F">and helped through</text>
            </svg>
          </div>
          <div className="coffee-stain w-20 h-20 -bottom-8 right-6" />
        </div>
      </div>
    </article>
  );
}

/* --------------------------- Save the Date --------------------------- */

const INTERESTS = [
  {
    id: "food",
    label: "Home food & thalis",
    hosts: [
      { name: "Meera aunty", city: "Jaipur", offer: "Rajasthani thali on the rooftop" },
      { name: "The D'Souzas", city: "Goa", offer: "Sunday vindaloo, family recipe" },
      { name: "Lakshmi ji", city: "Madurai", offer: "banana-leaf breakfast, 7 am sharp" },
    ],
  },
  {
    id: "festivals",
    label: "Festivals & garba",
    hosts: [
      { name: "The Patels", city: "Ahmedabad", offer: "Navratri garba, dandiya provided" },
      { name: "Rohan & fam", city: "Kolkata", offer: "Durga Puja pandal-hopping" },
      { name: "Nair household", city: "Kochi", offer: "Onam sadhya & pookalam" },
    ],
  },
  {
    id: "heritage",
    label: "Heritage walks",
    hosts: [
      { name: "Prof. Iyer", city: "Varanasi", offer: "sunrise ghat walk, chai included" },
      { name: "Zoya", city: "Delhi", offer: "Old Delhi lanes & Mughlai lunch" },
      { name: "The Ranawats", city: "Udaipur", offer: "palace stories from a real haveli" },
    ],
  },
] as const;

function SaveTheDate() {
  const [rsvp, setRsvp] = useState<null | "joy" | "regret">(null);
  const [interest, setInterest] = useState<(typeof INTERESTS)[number]>(INTERESTS[0]);

  return (
    <article className="bg-ivory paper-texture">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SpreadHeader
          index="No. 2"
          name="Save the Date"
          role="The wedding platform, Indianized"
          stack="React · Node.js · MySQL · TailwindCSS"
          repo={WEDDING_REPO}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-14 items-start">
          {/* invitation — kept as is */}
          <div data-reveal className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm bg-[#fbf8f2] border border-champagne/50 p-10 text-center shadow-[0_24px_60px_-20px_rgba(35,35,35,0.25)] -rotate-1">
              <div className="absolute inset-2 border border-champagne/40 pointer-events-none" />
              <p className="text-[10px] tracking-[0.5em] uppercase text-warmgray">Together with their families</p>
              <h4 className="gold-foil font-serif-display text-5xl mt-6">Every Couple</h4>
              <p className="font-serif-display italic text-xl text-warmgray mt-2">deserves software this considered</p>
              <div className="mx-auto my-6 h-px w-24 bg-champagne/60" />
              <p className="text-sm text-warmgray leading-relaxed">
                Invitations, RSVPs, guest lists, hosting — a wedding&apos;s entire paper trail,
                reimagined as one graceful product. Built for Indian weddings, not adapted to them.
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
                  {rsvp === "joy" ? "wonderful — a seat awaits ♡" : "you'll be missed. mithai will be saved."}
                </p>
              )}
              <div className="absolute -top-5 -right-5 rotate-12 w-20 h-20 rounded-full border-2 border-blush/60 flex items-center justify-center">
                <span className="font-hand text-sm text-blush leading-tight text-center">RSVP&apos;d<br />with love</span>
              </div>
            </div>
          </div>

          {/* find your host */}
          <div data-reveal data-reveal-delay="0.15" className="lg:col-span-7">
            <p className="font-hand text-2xl text-warmgray mb-1">find your host — pick an interest</p>
            <p className="text-sm text-warmgray/80 mb-5 max-w-md">
              Guests travelling for the wedding get matched with Indian hosts anywhere in India,
              by interest. And Indian guests? They get to host.
            </p>

            <div className="flex flex-wrap gap-3 mb-6">
              {INTERESTS.map((it) => (
                <button
                  key={it.id}
                  onClick={() => setInterest(it)}
                  className={`px-5 py-2.5 text-xs tracking-[0.2em] uppercase border transition-all duration-500 cursor-pointer ${
                    interest.id === it.id
                      ? "bg-ink text-paper border-ink"
                      : "border-ink/30 text-warmgray hover:border-ink/70"
                  }`}
                >
                  {it.label}
                </button>
              ))}
            </div>

            <div className="relative min-h-56">
              <AnimatePresence mode="wait">
                <motion.div
                  key={interest.id}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                >
                  {interest.hosts.map((h, i) => (
                    <div
                      key={h.name}
                      className="paper-card p-5 relative"
                      style={{ transform: `rotate(${(i - 1) * 1.2}deg)` }}
                    >
                      <span className="pin" style={{ left: "50%", top: -6, marginLeft: -7, background: i % 2 ? "#C4A484" : "#D9A7B5" }} />
                      <p className="text-[10px] tracking-[0.3em] uppercase text-champagne">{h.city}</p>
                      <p className="font-serif-display text-xl text-ink mt-1">{h.name}</p>
                      <p className="font-hand text-lg text-warmgray mt-2 leading-snug">{h.offer}</p>
                      <p className="text-[10px] tracking-[0.2em] uppercase text-sage mt-3">✓ verified host</p>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* -------------------------------- HR Tool ------------------------------- */

const JOB_TERMS = ["React", "TypeScript", "REST APIs", "Testing", "SQL"];

const CANDIDATES = [
  { name: "A. Verma", role: "Frontend Engineer", has: ["React", "TypeScript", "REST APIs", "Testing", "SQL"] },
  { name: "T. Bose", role: "Full-stack Developer", has: ["React", "REST APIs", "SQL"] },
  { name: "P. Nair", role: "UI Engineer", has: ["React", "TypeScript", "Testing"] },
  { name: "M. Shah", role: "Software Engineer", has: ["React", "TypeScript", "REST APIs", "Testing"] },
  { name: "R. Iyer", role: "Backend Developer", has: ["REST APIs", "SQL"] },
];

function HRTool() {
  const [index, setIndex] = useState(0);
  const [decision, setDecision] = useState<"accept" | "reject" | null>(null);
  const [shortlist, setShortlist] = useState<string[]>([]);
  const [rejected, setRejected] = useState<string[]>([]);

  const candidate = CANDIDATES[index % CANDIDATES.length];
  const matched = JOB_TERMS.filter((t) => candidate.has.includes(t));
  const missing = JOB_TERMS.filter((t) => !candidate.has.includes(t));
  const pct = Math.round((matched.length / JOB_TERMS.length) * 100);

  const decide = (d: "accept" | "reject") => {
    if (decision) return;
    setDecision(d);
    if (d === "accept") setShortlist((s) => [...s, candidate.name]);
    else setRejected((r) => [...r, candidate.name]);
    setTimeout(() => {
      setIndex((i) => i + 1);
      setDecision(null);
    }, 550);
  };

  return (
    <article className="mx-auto max-w-6xl px-6 py-24">
      <SpreadHeader
        index="No. 3"
        name="HR Tool"
        role="AI application sifting"
        stack="React · Python · LLMs · MongoDB"
      />

      <p data-reveal className="font-serif-display text-2xl leading-snug text-ink max-w-2xl mt-10">
        Built for HRs drowning in applications. Job posting, resume uploads, candidate
        shortlisting — the AI reads every resume against the job description, flags the missing
        terms, and gives hours back.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-12 items-start">
        {/* job description */}
        <div data-reveal className="lg:col-span-4">
          <div className="paper-card p-6 -rotate-1 relative">
            <span className="tape -top-3 left-8 -rotate-3" />
            <p className="text-[10px] tracking-[0.3em] uppercase text-warmgray">job description</p>
            <p className="font-serif-display text-2xl text-ink mt-2">Frontend Engineer</p>
            <p className="text-sm text-warmgray mt-1 mb-4">must-have terms, parsed by the AI:</p>
            <div className="flex flex-wrap gap-2">
              {JOB_TERMS.map((t) => (
                <span key={t} className="px-3 py-1.5 text-sm border border-champagne/60 bg-linen/60 text-ink">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-6 flex gap-8">
            <div>
              <p className="font-serif-display text-4xl text-sage">{shortlist.length}</p>
              <p className="text-[10px] tracking-[0.25em] uppercase text-warmgray">shortlisted</p>
            </div>
            <div>
              <p className="font-serif-display text-4xl text-blush">{rejected.length}</p>
              <p className="text-[10px] tracking-[0.25em] uppercase text-warmgray">passed on</p>
            </div>
          </div>
          {shortlist.length > 0 && (
            <p className="font-hand text-xl text-sage mt-3">shortlist: {shortlist.join(", ")}</p>
          )}
        </div>

        {/* candidate stack — try it */}
        <div data-reveal data-reveal-delay="0.15" className="lg:col-span-8">
          <p className="font-hand text-2xl text-warmgray mb-4">the sifting desk — you be the HR</p>
          <div className="relative h-80 max-w-xl">
            {/* shadow cards behind */}
            <div className="absolute inset-x-6 top-3 h-full paper-card opacity-40 rotate-1" />
            <div className="absolute inset-x-3 top-1.5 h-full paper-card opacity-70 -rotate-1" />
            <AnimatePresence mode="popLayout">
              <motion.div
                key={`${candidate.name}-${index}`}
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1, x: 0, rotate: 0 }}
                exit={
                  decision === "accept"
                    ? { x: 340, rotate: 8, opacity: 0 }
                    : { x: -340, rotate: -8, opacity: 0 }
                }
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0 paper-card p-7 bg-[#fdfcf8]"
              >
                <div className="flex items-baseline justify-between">
                  <div>
                    <p className="font-serif-display text-3xl text-ink">{candidate.name}</p>
                    <p className="text-sm text-warmgray">{candidate.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-serif-display text-3xl" style={{ color: pct >= 80 ? "#A8B6A0" : pct >= 60 ? "#C4A484" : "#D9A7B5" }}>
                      {pct}%
                    </p>
                    <p className="text-[10px] tracking-[0.25em] uppercase text-warmgray">JD match</p>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-sage w-16">has</span>
                    {matched.map((t) => (
                      <span key={t} className="px-3 py-1 text-sm border border-sage/60 bg-sage/10 text-ink">✓ {t}</span>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-blush w-16">missing</span>
                    {missing.length ? (
                      missing.map((t) => (
                        <span key={t} className="px-3 py-1 text-sm border border-blush/60 bg-blush/10 text-warmgray line-through">{t}</span>
                      ))
                    ) : (
                      <span className="font-hand text-lg text-sage">nothing. hire her yesterday.</span>
                    )}
                  </div>
                </div>

                <div className="absolute bottom-6 inset-x-7 flex gap-4">
                  <button
                    onClick={() => decide("reject")}
                    className="flex-1 py-3 text-xs tracking-[0.25em] uppercase border border-blush/70 text-blush hover:bg-blush/10 transition-colors cursor-pointer"
                  >
                    ✗ Pass
                  </button>
                  <button
                    onClick={() => decide("accept")}
                    className="flex-1 py-3 text-xs tracking-[0.25em] uppercase bg-ink text-paper hover:bg-ink-deep transition-colors cursor-pointer"
                  >
                    ✓ Shortlist
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <p className="text-xs text-warmgray mt-8">
            In the real tool the AI pre-sorts this stack — flagging resumes missing must-have terms
            so HR only hand-reviews the maybes.
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
      <ChapterHeading number="04" title="Projects" note="four spreads, four worlds" />
      <EngiVerse />
      <SaveTheDate />
      <HRTool />
      <GraphVisualizer />
    </section>
  );
}
