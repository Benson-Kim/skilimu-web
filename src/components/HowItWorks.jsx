const steps = [
  {
    n: "01",
    title: "Apply",
    body: "Tell us about your child. We'll match them to the right program and tell you exactly what they'll build in their first session.",
  },
  {
    n: "02",
    title: "Build",
    body: "Hands-on, project-first learning that feels like play and lands like rigorous training. Live classes with expert practitioners.",
  },
  {
    n: "03",
    title: "Graduate",
    body: "They leave with a certified portfolio, a peer network, and a new identity — someone who builds things, not just uses them.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-slate-mid border-y border-slate-light">
      <div className="max-w-275 mx-auto px-6 md:px-10 py-24">
        {/* Header */}
        <div className="fade-up text-center mb-16">
          <span className="font-mono text-[11px] tracking-[3px] uppercase text-electric mb-4 block">
            THE PROCESS
          </span>
          <h2 className="text-[clamp(30px,4vw,54px)] font-bold leading-[1.08] tracking-[-2px] text-stark-white mb-4">
            Three steps.
            <br />
            One upgraded child.
          </h2>
          <p className="text-base font-light text-white-dim max-w-110 mx-auto leading-[1.85]">
            Simple from the outside. Transformative on the inside.
          </p>
        </div>

        {/* Steps */}
        <div className="relative flex flex-col md:flex-row gap-8 md:gap-0">
          {/* Connector line — desktop only */}
          <div className="hidden md:block absolute top-7 left-[15%] right-[15%] h-px bg-slate-light" />

          {steps.map((step, i) => (
            <div
              key={i}
              className={`fade-up flex-1 text-center px-6 md:px-8`}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div className="relative inline-flex">
                <div className="w-14 h-14 rounded-full border-2 border-electric bg-deep-slate flex items-center justify-center mx-auto mb-6 relative z-10 shadow-[0_0_24px_rgba(0,229,160,0.2)]">
                  <span className="font-mono text-[13px] font-bold text-electric">
                    {step.n}
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-bold tracking-[-0.6px] text-stark-white mb-3">
                {step.title}
              </h3>
              <p className="text-[15px] font-light leading-[1.85] text-white-dim">
                {step.body}
              </p>
            </div>
          ))}
        </div>

        {/* Certificate callout */}
        <div className="fade-up flex flex-wrap items-center gap-5 mt-16 px-6 py-5 bg-[rgba(0,229,160,0.08)] border border-[rgba(0,229,160,0.2)] rounded-xl">
          <div className="w-10 h-10 shrink-0 bg-electric rounded-full flex items-center justify-center">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0E1117"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <polyline points="20,6 9,17 4,12" />
            </svg>
          </div>
          <div>
            <p className="text-[15px] font-medium text-stark-white mb-0.5">
              Every child graduates with a verified certificate.
            </p>
            <p className="text-[13px] font-light text-white-dim">
              Recognised credentials that boost school applications and
              demonstrate real capability — not just attendance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
