const VALUES = [
  "Practitioners, not professors",
  "Projects over theory",
  "Identity before credentials",
  "Every child, no exceptions",
];

export function Philosophy() {
  return (
    <section className="py-24 px-6 md:px-10">
      <div className="max-w-[1100px] mx-auto">
        <div className="flex flex-col md:flex-row gap-16 md:gap-20 items-center">
          {/* Left — pull quote */}
          <div className="fade-up flex-1">
            <blockquote className="text-[clamp(26px,3.2vw,42px)] font-bold tracking-[-1.5px] leading-[1.2] text-stark-white max-w-[480px] border-l-[3px] border-electric pl-6">
              "We believe every child is{" "}
              <span className="text-electric">already</span> a technologist."
            </blockquote>
            <p className="font-mono text-[10px] tracking-[2px] uppercase text-white-dim mt-6 pl-6">
              — Skilimu Program Founder
            </p>
          </div>

          {/* Right — prose + values */}
          <div className="fade-up delay-2 flex-1">
            <span className="font-mono text-[11px] tracking-[3px] uppercase text-electric mb-4 block">
              OUR PHILOSOPHY
            </span>
            <p className="text-base font-light leading-[1.85] text-white-dim mb-5">
              Skilimu was built on a single conviction: that the gap between a
              curious child and a capable builder is shorter than anyone thinks.
            </p>
            <p className="text-base font-light leading-[1.85] text-white-dim mb-5">
              We don't sort children into those who "get it" and those who
              don't. We create the conditions where every child discovers they
              do. Our instructors are practitioners — people who build things
              for a living, and teach because they believe the next generation
              should lead with those same skills.
            </p>
            <p className="text-base font-light leading-[1.85] text-white-dim mb-8">
              We measure our success one way: in the confidence a child carries
              out of their last session.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {VALUES.map((v, i) => (
                <div
                  key={i}
                  className="flex gap-2.5 items-start bg-slate-mid border border-slate-light rounded-lg px-4 py-3.5"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-electric shrink-0 mt-[7px]" />
                  <span className="text-[13px] font-medium text-stark-white leading-[1.5]">
                    {v}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
