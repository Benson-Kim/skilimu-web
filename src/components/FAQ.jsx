import { useState } from "react";
import { useFetch } from "../hooks/useFetch";

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-slate-light last:border-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full py-5 flex items-center justify-between gap-4 text-left cursor-pointer bg-transparent border-none"
      >
        <span className="text-[16px] md:text-[17px] font-medium text-stark-white leading-[1.4]">
          {question}
        </span>
        <div
          className={[
            "w-7 h-7 shrink-0 rounded-full border flex items-center justify-center",
            "transition-[border-color,transform] duration-300",
            open ? "border-electric rotate-45" : "border-slate-light rotate-0",
          ].join(" ")}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke={open ? "#00E5A0" : "#B8BED0"}
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <line x1="6" y1="1" x2="6" y2="11" />
            <line x1="1" y1="6" x2="11" y2="6" />
          </svg>
        </div>
      </button>

      <div
        className="overflow-hidden transition-[max-height] duration-400"
        style={{ maxHeight: open ? "300px" : "0" }}
      >
        <p className="text-base font-light leading-[1.85] text-white-dim pb-5">
          {answer}
        </p>
      </div>
    </div>
  );
}

function FAQSkeleton() {
  return (
    <div className="border-b border-slate-light py-5 animate-pulse">
      <div className="h-5 bg-slate-light rounded w-3/4" />
    </div>
  );
}

export function FAQ() {
  const { data: faqs, loading, error } = useFetch("faqs?_sort=order");

  return (
    <section id="faq" className="bg-slate-mid border-t border-slate-light">
      <div className="max-w-200 mx-auto px-6 md:px-10 py-24">
        <div className="fade-up text-center mb-14">
          <span className="font-mono text-[11px] tracking-[3px] uppercase text-electric mb-4 block">
            QUESTIONS
          </span>
          <h2 className="text-[clamp(30px,4vw,54px)] font-bold leading-[1.08] tracking-[-2px] text-stark-white mb-4">
            Everything you need to know.
          </h2>
          <p className="text-base font-light leading-[1.85] text-white-dim max-w-110 mx-auto">
            Clear answers for principals, directors and adminstrators making the
            decision.
          </p>
        </div>

        {error && (
          <div className="mb-8 px-5 py-4 bg-[rgba(0, 229, 160, 0.06)] border border-[rgba(0, 229, 160, 0.15)] rounded-lg">
            <p className="text-white-dim text-sm py-8">
              Could not load faqs. Make sure JSON Server is running on port
              5000.
            </p>
          </div>
        )}

        <div className="fade-up bg-slate-mid border border-slate-light rounded-2xl px-6 md:px-8">
          {loading
            ? Array.from({ length: 5 }).map((_, i) => <FAQSkeleton key={i} />)
            : faqs?.map((faq) => (
                <FAQItem
                  key={faq.id}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
        </div>
      </div>
    </section>
  );
}
