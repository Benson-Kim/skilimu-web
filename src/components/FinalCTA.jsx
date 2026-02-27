import { useRef, useState } from "react";
import { postEnquiry } from "../hooks/useFetch";
import { ContactInfo } from "../data";

export function FinalCTA() {
  const sectionRef = useRef(null);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !name) return;
    setStatus("submitting");
    try {
      await postEnquiry({ name, email, type: "quick-enquiry" });
      setStatus("success");
      sectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      setEmail("");
      setName("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="enroll"
      className="relative overflow-hidden"
      style={{ background: "#00E5A0" }}
    >
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(14,17,23,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14,17,23,0.06) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div
        ref={sectionRef}
        className="fade-up relative z-10 max-w-205 mx-auto px-6 md:px-10 py-24 text-center"
      >
        <span className="font-mono text-[11px] tracking-[3px] uppercase text-[rgba(14,17,23,0.5)] block mb-6">
          THE MOMENT IS NOW
        </span>

        <h2 className="text-[clamp(34px,5.5vw,68px)] font-bold leading-[1.02] tracking-[-2.5px] text-deep-slate mb-6">
          The schools that invest in technology tosay produces the leaders of
          tomorrow.
        </h2>

        <p className="text-lg font-light text-deep-slate/75 mb-12">
          Make sure yours is one of the schools running Skilimu programs.
        </p>

        {/* Quick enrol form */}
        {status === "success" ? (
          <div className="inline-flex items-center gap-3 bg-[rgba(14,17,23,0.12)] border border-[rgba(14,17,23,0.2)] rounded-xl px-6 py-4 mb-8">
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
            <span className="text-[15px] font-semibold text-deep-slate">
              We'll be in touch within 24 hours.
            </span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-130 mx-auto mb-8"
          >
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="flex-1 px-4 py-3.5 bg-[rgba(14,17,23,0.12)] border border-[rgba(14,17,23,0.2)] rounded-lg text-deep-slate placeholder-deep-slate/50 text-sm focus:outline-none focus:border-[rgba(14,17,23,0.5)] transition-colors"
            />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 px-4 py-3.5 bg-[rgba(14,17,23,0.12)] border border-[rgba(14,17,23,0.2)] rounded-lg text-deep-slate placeholder-deep-slate/50 text-sm focus:outline-none focus:border-[rgba(14,17,23,0.5)] transition-colors"
            />
            <button
              type="submit"
              disabled={status === "submitting"}
              className="px-6 py-2.5 bg-deep-slate text-stark-white font-semibold rounded-lg cursor-pointer hover:opacity-90 hover:translate-y-0.5 transition-all duration-200 whitespace-nowrap disabled:opacity-60"
            >
              {status === "submitting" ? "Sending…" : "Get in touch →"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="text-sm text-deep-slate/70 mb-6">
            Something went wrong. Please email us directly.
          </p>
        )}

        <p className="font-mono text-[10px] tracking-[1.5px] uppercase text-[rgba(14,17,23,0.4)] mt-10">
          <a
            href={ContactInfo.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {ContactInfo.address}
          </a>
          {" · "}
          <a href={`mailto:${ContactInfo.email}`}>{ContactInfo.email}</a>
          {" · "}
          <a href={`tel:${ContactInfo.phoneLink}`}>
            {ContactInfo.phoneDisplay}
          </a>
        </p>
      </div>
    </section>
  );
}
