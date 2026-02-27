import { useFetch } from "../hooks/useFetch";

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5 mb-5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#00E5A0">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialSkeleton() {
  return (
    <div className="bg-slate-mid border border-slate-light rounded-[12px] p-8 animate-pulse">
      <div className="flex gap-1 mb-5">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="w-3 h-3 bg-slate-light rounded-sm" />
        ))}
      </div>
      <div className="space-y-2 mb-6">
        <div className="h-4 bg-slate-light rounded w-full" />
        <div className="h-4 bg-slate-light rounded w-full" />
        <div className="h-4 bg-slate-light rounded w-3/4" />
      </div>
      <div className="border-t border-slate-light pt-4">
        <div className="h-4 w-24 bg-slate-light rounded mb-2" />
        <div className="h-3 w-36 bg-slate-light rounded" />
      </div>
    </div>
  );
}

export function Testimonials() {
  const { data: testimonials, loading, error } = useFetch("testimonials");

  return (
    <section className="py-24 px-6 md:px-10">
      <div className="max-w-300 mx-auto">
        {/* Header row */}
        <div className="fade-up flex flex-wrap items-end justify-between gap-6 mb-14">
          <div>
            <span className="font-mono text-[11px] tracking-[3px] uppercase text-electric mb-4 block">
              WHAT THEY SAY
            </span>
            <h2 className="text-[clamp(30px,4vw,54px)] font-bold leading-[1.08] tracking-[-2px] text-stark-white">
              Heard from the
              <br />
              people who matter.
            </h2>
          </div>
          <div className="bg-slate-mid border border-slate-light rounded-xl px-6 py-4 text-right">
            <div className="stat-shimmer text-[28px] font-bold leading-none tracking-[-1px]">
              4.9 / 5
            </div>
            <div className="font-mono text-[9px] tracking-[1.5px] uppercase text-white-dim mt-1.5">
              School Rating
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-8 px-5 py-4 bg-[rgba(0, 229, 160, 0.06)] border border-[rgba(0, 229, 160, 0.15)] rounded-lg">
            <p className="text-white-dim text-sm py-8">
              Could not load testimonails. Make sure JSON Server is running on
              port 5000.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <TestimonialSkeleton key={i} />
              ))
            : (testimonials || []).map((t, i) => (
                <div
                  key={t.id}
                  className={`fade-up delay-${(i % 3) + 1} group bg-slate-mid border border-slate-light rounded-[12px] p-8 flex flex-col hover:border-[rgba(0,229,160,0.3)] hover:-translate-y-1 transition-all duration-300`}
                >
                  <Stars count={t.rating} />
                  <p className="text-base italic font-light leading-[1.75] text-stark-white flex-1 mb-6">
                    {t.quote}
                  </p>
                  <div className="border-t border-slate-light pt-4">
                    <div className="text-[14px] font-semibold text-stark-white">
                      {t.name}
                    </div>
                    <div className="font-mono text-[9px] tracking-[1.5px] uppercase text-white-dim mt-1">
                      {t.role}
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
