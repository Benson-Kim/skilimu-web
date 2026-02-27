// Static content — no server dependency needed here

const upgrades = [
  {
    label: "THE UPGRADE",
    headline: "Your child doesn't just use the future.",
    accent: "They write it.",
    body: "Every project at Skilimu is a real thing built by real hands. Your child leaves each session with something they made — and the growing certainty that they can make anything.",
  },
  {
    label: "THE CONFIDENCE",
    headline: "Skills that compound.",
    accent: "Confidence that never expires.",
    body: "Technical ability is only part of what we build. The deeper transformation is in how your child sees themselves — as someone who figures things out, not someone who waits for help.",
  },
  {
    label: "THE NETWORK",
    headline: "The peers they meet here will build",
    accent: "the companies they join.",
    body: "Skilimu children learn alongside others who think at the same level. The relationships formed here outlast any curriculum.",
  },
];

function NodeGraph() {
  const nodes = [
    { cx: 80, cy: 60 },
    { cx: 200, cy: 30 },
    { cx: 310, cy: 85 },
    { cx: 155, cy: 150 },
    { cx: 265, cy: 165 },
    { cx: 340, cy: 50 },
  ];
  const edges = [
    [0, 1],
    [1, 2],
    [2, 5],
    [1, 3],
    [3, 4],
    [2, 4],
    [0, 3],
    [5, 4],
    [1, 5],
  ];
  return (
    <svg width="100%" height="200" viewBox="0 0 400 200" fill="none">
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].cx}
          y1={nodes[a].cy}
          x2={nodes[b].cx}
          y2={nodes[b].cy}
          stroke="#00E5A0"
          strokeWidth="1"
          opacity="0.22"
          strokeDasharray="4 4"
        />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle
            cx={n.cx}
            cy={n.cy}
            r={i === 0 ? 12 : 7}
            fill="none"
            stroke="#00E5A0"
            strokeWidth="1.5"
            opacity={i === 0 ? 1 : 0.5}
          />
          <circle
            cx={n.cx}
            cy={n.cy}
            r={i === 0 ? 5 : 3}
            fill="#00E5A0"
            opacity={i === 0 ? 1 : 0.35}
          />
        </g>
      ))}
      <circle
        cx={nodes[0].cx}
        cy={nodes[0].cy}
        r="20"
        fill="none"
        stroke="#00E5A0"
        strokeWidth="1"
        opacity="0.12"
      />
    </svg>
  );
}

function BarChart() {
  const bars = [30, 55, 80, 105, 135, 165];
  return (
    <svg width="100%" height="200" viewBox="0 0 400 200" fill="none">
      <line
        x1="30"
        y1="185"
        x2="380"
        y2="185"
        stroke="#2C3547"
        strokeWidth="1"
      />
      {bars.map((h, i) => (
        <g key={i}>
          <rect
            x={36 + i * 54}
            y={185 - h}
            width="38"
            height={h}
            fill={`rgba(0,229,160,${0.18 + i * 0.12})`}
            rx="4"
          />
          <rect
            x={36 + i * 54}
            y={185 - h}
            width="38"
            height="3"
            fill="#00E5A0"
            rx="2"
            opacity={0.4 + i * 0.1}
          />
        </g>
      ))}
      <path
        d="M355 22 L370 10 L385 22"
        stroke="#00E5A0"
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
      />
      <line
        x1="370"
        y1="10"
        x2="370"
        y2="42"
        stroke="#00E5A0"
        strokeWidth="1.5"
        opacity="0.6"
      />
    </svg>
  );
}

function Network() {
  const cs = [
    { cx: 160, cy: 110, r: 88 },
    { cx: 215, cy: 88, r: 68 },
    { cx: 198, cy: 148, r: 55 },
    { cx: 145, cy: 142, r: 46 },
    { cx: 252, cy: 128, r: 42 },
  ];
  return (
    <svg width="100%" height="200" viewBox="0 0 400 200" fill="none">
      {cs.map((c, i) => (
        <circle
          key={i}
          cx={c.cx}
          cy={c.cy}
          r={c.r}
          stroke="#00E5A0"
          strokeWidth="1"
          opacity={0.1 + i * 0.055}
          fill="none"
          strokeDasharray={i % 2 ? "4 6" : undefined}
        />
      ))}
      {cs.map((c, i) => (
        <circle
          key={i}
          cx={c.cx + c.r * Math.cos(-1.2)}
          cy={c.cy + c.r * Math.sin(-1.2)}
          r="3.5"
          fill="#00E5A0"
          opacity={0.5 + i * 0.1}
        />
      ))}
      <circle cx="160" cy="110" r="5" fill="#00E5A0" />
      <circle
        cx="160"
        cy="110"
        r="10"
        fill="none"
        stroke="#00E5A0"
        strokeWidth="1"
        opacity="0.3"
      />
    </svg>
  );
}

const Illustrations = [NodeGraph, BarChart, Network];

export function LifeUpgrade() {
  return (
    <section id="about" className="py-10">
      {upgrades.map((item, i) => {
        const Illustration = Illustrations[i];
        const isReverse = i % 2 === 1;
        return (
          <div key={i} className="border-t border-slate-light">
            <div
              className={`max-w-300 mx-auto px-6 md:px-10 py-20 flex flex-col md:flex-row items-center gap-12 md:gap-20 ${isReverse ? "md:flex-row-reverse" : ""}`}
            >
              {/* Text */}
              <div className="fade-up flex-1 min-w-0">
                <span className="font-mono text-[11px] tracking-[3px] uppercase text-electric mb-4 block">
                  {item.label}
                </span>
                <h2 className="text-[clamp(30px,4vw,54px)] font-bold leading-[1.08] tracking-[-2px] text-stark-white mb-1.5">
                  {item.headline}
                </h2>
                <h2 className="text-[clamp(30px,4vw,54px)] font-bold leading-[1.08] tracking-[-2px] text-electric mb-6">
                  {item.accent}
                </h2>
                <p className="text-base font-light leading-[1.85] text-white-dim">
                  {item.body}
                </p>
              </div>

              {/* Illustration */}
              <div
                className={`fade-up delay-2 flex-1 flex items-center justify-center bg-slate-mid border border-slate-light rounded-2xl p-8 min-h-50 w-full`}
              >
                <Illustration />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
