import { useFetch } from "../hooks/useFetch";

export function Hero() {
  const { data: stats } = useFetch("stats");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-18">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 65% at 50% 40%, rgba(0,229,160,0.07), transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 40% 40% at 15% 85%, rgba(0,229,160,0.04), transparent 65%)",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(44,53,71,0.45) 1px, transparent 1px),
            linear-gradient(90deg, rgba(44,53,71,0.45) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 85% at 50% 50%, black 30%, transparent 80%)",
          maskImage:
            "radial-gradient(ellipse 85% 85% at 50% 50%, black 30%, transparent 80%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center gap-7 max-w-230 px-6 md:px-10 py-20">
        {/* Eyebrow pill */}
        <div className="hero-el inline-flex items-center gap-2.5 px-4 py-1.5 bg-[rgba(0,229,160,0.1)] border border-[rgba(0,229,160,0.2)] rounded-full">
          <span className="font-mono text-[10px] tracking-[2.5px] uppercase text-electric">
            NAIROBI · KENYA · EST. 2024
          </span>
        </div>

        {/* Headline */}
        <h1 className="hero-el text-[clamp(46px,8vw,96px)] font-bold leading-[0.98] tracking-[-3.5px] text-stark-white">
          The future belongs
          <br />
          to those who <span className="text-electric">build it.</span>
        </h1>

        {/* Sub */}
        <p className="hero-el text-[clamp(16px,2vw,19px)] font-light leading-relaxed text-white-dim max-w-145">
          Skilimu partners with schools across Nairobi to deliver coding, AI,
          robotics, UI/UX design, and cyber safety -s tructured programs that
          run alongside your curriculum and produce measurably different.
        </p>

        {/* CTAs */}
        <div className="hero-el flex flex-wrap gap-3.5 justify-center items-center">
          <a href="#enroll">
            <button className="btn-primary">Enrol your child →</button>
          </a>
          <a href="#programs">
            <button className="btn-ghost">See our programs</button>
          </a>
        </div>

        {/* Social proof */}
        <p className="hero-el font-mono text-[10px] tracking-[1.5px] uppercase text-white-dim/70">
          Rated 4.9 / 5 by over 500 Nairobi families
        </p>

        {/* Stats — fetched from JSON Server */}
        <div className="hero-el w-full max-w-160 border-t border-slate-light pt-6 mt-2">
          {stats ? (
            <div className="flex flex-wrap justify-center gap-8 md:gap-14">
              {stats.map((stat) => (
                <div key={stat.id} className="text-center">
                  <div className="stat-shimmer font-bold text-[clamp(26px,3vw,38px)] leading-none tracking-[-1.5px]">
                    {stat.value}
                  </div>
                  <div className="font-mono text-[9px] tracking-[2px] uppercase text-white-dim mt-1.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center gap-14">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="text-center animate-pulse">
                  <div className="h-9 w-16 bg-slate-light rounded mx-auto mb-2" />
                  <div className="h-2 w-20 bg-slate-light rounded mx-auto" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
