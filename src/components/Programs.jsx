import { useFetch } from "../hooks/useFetch";
import { Link } from "react-router-dom";

function ProgramSkeleton() {
  return (
    <div className="bg-slate-mid border border-slate-light rounded-[12px] p-8 animate-pulse">
      <div className="w-12 h-12 bg-slate-light rounded-[10px] mb-5" />
      <div className="h-3 w-20 bg-slate-light rounded mb-4" />
      <div className="h-6 w-40 bg-slate-light rounded mb-3" />
      <div className="h-4 w-full bg-slate-light rounded mb-2" />
      <div className="h-4 w-3/4 bg-slate-light rounded mb-6" />
      <div className="flex gap-2">
        <div className="h-6 w-20 bg-slate-light rounded" />
        <div className="h-6 w-24 bg-slate-light rounded" />
      </div>
    </div>
  );
}

export function Programs() {
  const { data: programs, loading, error } = useFetch("programs?_sort=order");

  return (
    <section id="programs" className="py-24 px-6 md:px-10">
      <div className="max-w-300 mx-auto">
        {/* Header */}
        <div className="fade-up max-w-160 mb-14">
          <span className="font-mono text-[11px] tracking-[3px] uppercase text-electric mb-4 block">
            WHAT WE TEACH
          </span>
          <h2 className="text-[clamp(30px,4vw,54px)] font-bold leading-[1.08] tracking-[-2px] text-stark-white mb-4">
            Five disciplines.
            <br />
            One transformation.
          </h2>
          <p className="text-base font-light leading-[1.85] text-white-dim">
            Each program is built for school delivery - structured, sequenced,
            and designed to run alongside your curriculum without friction.
            Click any program to see the full curriculum
          </p>
        </div>

        {/* Grid */}
        {error && (
          <div className="mb-8 px-5 py-4 bg-[rgba(0, 229, 160, 0.06)] border border-[rgba(0, 229, 160, 0.15)] rounded-lg">
            <p className="text-white-dim text-sm py-8">
              Could not load programs. Make sure JSON Server is running on port
              5000.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <ProgramSkeleton key={i} />
              ))
            : programs?.map((prog, i) => (
                <Link
                  key={prog.id}
                  to={`/programs/${prog.slug}`}
                  className={[
                    "program-card card bg-slate-mid cursor-pointer border border-slate-light rounded-[12px] p-8",
                    "flex flex-col hover:border-[rgba(0,229,160,0.35)] hover:bg-[rgba(26,32,48,0.95)]",
                    "transition-[border-color,background] duration-300 group",
                    "fade-up",
                    // 5th card spans full on sm, normal on lg
                    i === 4 ? "sm:col-span-2 lg:col-span-1" : "",
                  ].join(" ")}
                  style={{ transitionDelay: `${i * 0.06}s` }}
                >
                  {/* Icon */}
                  <div className="w-12 h-12 bg-[rgba(0,229,160,0.1)] border border-[rgba(0,229,160,0.2)] rounded-[10px] flex items-center justify-center mb-5 font-mono text-sm font-bold text-electric shrink-0">
                    {prog.icon}
                  </div>

                  <span className="font-mono text-[11px] tracking-[3px] uppercase text-electric mb-2 block">
                    PROGRAM {String(prog.order || prog.id).padStart(2, "0")}
                  </span>

                  <h3 className="text-[22px] font-bold tracking-[-0.6px] text-stark-white mb-3 group-hover:text-electric transition-colors duration-200">
                    {prog.name}
                  </h3>

                  <p className="text-[14px] font-light leading-[1.85] text-white-dim flex-1 mb-5">
                    {prog.line}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex gap-2 flex-wrap mt-auto">
                      <span className="font-mono text-[9px] tracking-[1.5px] uppercase text-electric bg-[rgba(0,229,160,0.08)] border border-[rgba(0,229,160,0.15)] px-2.5 py-1.5 rounded">
                        {prog.tag}
                      </span>
                      <span className="font-mono text-[9px] tracking-[1.5px] uppercase text-white-dim bg-slate-light px-2.5 py-1.5 rounded">
                        {prog.duration}
                      </span>
                    </div>
                    <span className="text-electric text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      →
                    </span>
                  </div>
                </Link>
              ))}
        </div>

        {/* Bottom CTA strip */}
        <div className="fade-up flex flex-wrap items-center justify-between gap-5 mt-10 px-6 md:px-8 py-6 bg-slate-mid border border-slate-light rounded-xl">
          <div>
            <p className="text-[15px] font-medium text-stark-white">
              Not sure where to start for your school?
            </p>
            <p className="text-[13px] font-light text-white-dim mt-1">
              We'll recommend the right programs based on your students' ages
              and your school's goals.
            </p>
          </div>
          <a href="#schools">
            <button className="btn-primary whitespace-nowrap">
              Talk to us →
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
