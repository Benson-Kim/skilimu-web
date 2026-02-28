import { useParams, Link } from "react-router-dom";
import { PROGRAM_DETAILS, ContactInfo } from "../data";
import { useRef, useState } from "react";
import { postEnquiry } from "../hooks/useFetch";

function NotFoundProgram() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <span className="font-mono text-[11px] tracking-[3px] uppercase text-electric block mb-4">
          PROGRAM NOT FOUND
        </span>
        <h1 className="text-4xl font-bold text-stark-white mb-6 tracking-[-1.5px]">
          This program doesn't exist.
        </h1>
        <Link
          to="/#programs"
          className="inline-flex items-center gap-2 text-electric hover:gap-3 transition-all font-medium"
        >
          ← Back to all programs
        </Link>
      </div>
    </main>
  );
}

function TrackCard({ track }) {
  return (
    <div className="bg-deep-slate border border-slate-light rounded-xl p-6 hover:border-[rgba(0,229,160,0.3)] transition-colors duration-300">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <div>
          <h3 className="text-[18px] font-bold text-stark-white tracking-[-0.5px]">
            {track.level}
          </h3>
          <span className="font-mono text-[10px] tracking-[1.5px] uppercase text-electric mt-1 block">
            {track.ages}
          </span>
        </div>
        <span className="font-mono text-[10px] tracking-[1.5px] uppercase text-white-dim bg-slate-light px-2.5 py-1.5 rounded">
          {track.tools}
        </span>
      </div>
      <p className="text-[14px] font-light leading-[1.85] text-white-dim mb-5">
        {track.description}
      </p>
      <div>
        <span className="font-mono text-[9px] tracking-[2px] uppercase text-electric mb-3 block">
          EXAMPLE PROJECTS
        </span>
        <ul className="flex flex-col gap-1.5">
          {track.projects.map((p, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-[13px] text-white-dim"
            >
              <span className="text-electric mt-0.5 shrink-0">→</span>
              {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function EnquiryForm({ programName }) {
  const sectionRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    school: "",
    email: "",
    role: "",
    message: "",
  });

  const [status, setStatus] = useState("idle");
  const set = (f) => (e) => setForm((p) => ({ ...p, [f]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      await postEnquiry({
        ...form,
        type: "program-enquiry",
        program: programName,
      });
      setStatus("success");
      sectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        ref={sectionRef}
        className="bg-[rgba(0,229,160,0.06)] border border-[rgba(0,229,160,0.2)] rounded-xl p-10 text-center flex flex-col items-center gap-4"
      >
        <div className="w-12 h-12 bg-electric rounded-full flex items-center justify-center">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0E1117"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <polyline points="20,6 9,17 4,12" />
          </svg>
        </div>
        <h3 className="text-[20px] font-bold text-electric tracking-[-0.5px]">
          Enquiry received.
        </h3>
        <p className="text-[14px] font-light text-white-dim leading-[1.8] max-w-xs">
          We'll contact you within one business day with a proposal for your
          school.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        className="field"
        placeholder="Your name"
        value={form.name}
        onChange={set("name")}
        required
      />
      <input
        className="field"
        placeholder="School name"
        value={form.school}
        onChange={set("school")}
        required
      />
      <input
        className="field"
        type="email"
        placeholder="Email address"
        value={form.email}
        onChange={set("email")}
        required
      />
      <input
        className="field"
        placeholder="Your role (e.g. Director, Principal)"
        value={form.role}
        onChange={set("role")}
      />
      <textarea
        className="field"
        style={{ resize: "vertical" }}
        placeholder="Any questions or context? (optional)"
        value={form.message}
        onChange={set("message")}
        rows={3}
      />
      {status === "error" && (
        <p className="text-red-400 text-sm">
          Something went wrong. Email{" "}
          <a href={`mailto:${ContactInfo.email}`} className="text-electric">
            {ContactInfo.email}
          </a>
        </p>
      )}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="py-3.5 text-[15px] font-semibold bg-electric text-deep-slate rounded-lg hover:shadow-[0_0_40px_rgba(0,229,160,0.4)] hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60"
      >
        {status === "submitting"
          ? "Sending…"
          : `Enquire about ${programName} →`}
      </button>
    </form>
  );
}

export default function ProgramDetail() {
  const { slug } = useParams();
  const prog = PROGRAM_DETAILS[slug];

  if (!prog) return <NotFoundProgram />;

  return (
    <main className="pt-18">
      {/* Hero  */}
      <section className="relative overflow-hidden py-20 px-6 md:px-10">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(0,229,160,0.06), transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(44,53,71,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(44,53,71,0.4) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 80%)",
            maskImage:
              "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 80%)",
          }}
        />

        <div className="relative max-w-300 mx-auto">
          <Link
            to="/#programs"
            className="inline-flex items-center gap-2 text-white-dim hover:text-electric transition-colors text-[13px] font-mono tracking-[1px] uppercase mb-10 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">
              ←
            </span>{" "}
            All Programs
          </Link>

          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="flex-1">
              <div className="w-14 h-14 bg-[rgba(0,229,160,0.08)] border border-[rgba(0,229,160,0.18)] rounded-[12px] flex items-center justify-center mb-6 font-mono text-xl font-bold text-electric">
                {prog.icon}
              </div>
              <span className="font-mono text-[11px] tracking-[3px] uppercase text-electric mb-3 block">
                Skilimu Program
              </span>
              <h1 className="text-[clamp(36px,5vw,72px)] font-bold tracking-[-2.5px] leading-none text-stark-white mb-6">
                {prog.name}
              </h1>
              <p className="text-[clamp(17px,2vw,21px)] font-light leading-[1.7] text-white-dim mb-8 max-w-140">
                {prog.heroLine}
              </p>
              <div className="flex gap-3 flex-wrap">
                <span className="font-mono text-[10px] tracking-[1.5px] uppercase text-electric bg-[rgba(0,229,160,0.08)] border border-[rgba(0,229,160,0.15)] px-3 py-2 rounded-lg">
                  {prog.tag}
                </span>
                <span className="font-mono text-[10px] tracking-[1.5px] uppercase text-white-dim bg-slate-mid border border-slate-light px-3 py-2 rounded-lg">
                  {prog.duration}
                </span>
              </div>
            </div>

            {/* Quick stats */}
            <div className="w-full lg:w-80 bg-slate-mid border border-slate-light rounded-xl p-8 flex flex-col gap-6">
              <div className="text-center pb-6 border-b border-slate-light">
                <div className="font-mono text-[10px] tracking-[2px] uppercase text-white-dim mb-2">
                  Program
                </div>
                <div className="text-2xl font-bold text-stark-white tracking-[-0.8px]">
                  {prog.name}
                </div>
              </div>
              {[
                { label: "Age Range", value: prog.tag },
                { label: "Duration", value: prog.duration },
                { label: "Tracks", value: `${prog.tracks.length} levels` },
                { label: "Delivery", value: "At your school" },
                { label: "Outcome", value: "Certificate + Portfolio" },
              ].map((r) => (
                <div
                  key={r.label}
                  className="flex justify-between items-center"
                >
                  <span className="font-mono text-[10px] tracking-[1.5px] uppercase text-white-dim">
                    {r.label}
                  </span>
                  <span className="text-[14px] font-medium text-stark-white">
                    {r.value}
                  </span>
                </div>
              ))}
              <a href="#program-enquiry">
                <button className="w-full py-3 text-sm font-semibold bg-electric text-deep-slate rounded-lg hover:shadow-[0_0_32px_rgba(0,229,160,0.4)] hover:-translate-y-0.5 transition-all duration-200 mt-2">
                  Enquire about this program →
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px bg-slate-light" />

      {/* Overview  */}
      <section className="py-20 px-6 md:px-10">
        <div className="max-w-300 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="fade-up">
            <span className="font-mono text-[11px] tracking-[3px] uppercase text-electric mb-4 block">
              OVERVIEW
            </span>
            <h2 className="text-[clamp(26px,3vw,40px)] font-bold tracking-[-1.5px] leading-[1.1] text-stark-white mb-5">
              What this program builds in your students.
            </h2>
            <p className="text-base font-light leading-[1.9] text-white-dim">
              {prog.overview}
            </p>
          </div>
          <div className="fade-up delay-2">
            <span className="font-mono text-[11px] tracking-[3px] uppercase text-electric mb-4 block">
              FOR YOUR SCHOOL
            </span>
            <h2 className="text-[clamp(26px,3vw,40px)] font-bold tracking-[-1.5px] leading-[1.1] text-stark-white mb-5">
              Why schools choose this program.
            </h2>
            <p className="text-base font-light leading-[1.9] text-white-dim">
              {prog.schoolBenefit}
            </p>
          </div>
        </div>
      </section>

      <div className="h-px bg-slate-light" />

      {/* Tracks */}
      <section className="bg-slate-mid border-y border-slate-light py-20 px-6 md:px-10">
        <div className="max-w-300 mx-auto">
          <div className="fade-up mb-12">
            <span className="font-mono text-[11px] tracking-[3px] uppercase text-electric mb-4 block">
              CURRICULUM TRACKS
            </span>
            <h2 className="text-[clamp(28px,3.5vw,48px)] font-bold tracking-[-1.5px] leading-[1.08] text-stark-white mb-4">
              Every student at the right level.
            </h2>
            <p className="text-base font-light leading-[1.85] text-white-dim max-w-140">
              Students are assessed and placed in the appropriate track from day
              one. No one is left behind. No one is held back.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {prog.tracks.map((track, i) => (
              <div
                key={i}
                className="fade-up"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <TrackCard track={track} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What students gain */}
      <section className="py-20 px-6 md:px-10">
        <div className="max-w-300 mx-auto">
          <div className="fade-up mb-10">
            <span className="font-mono text-[11px] tracking-[3px] uppercase text-electric mb-4 block">
              OUTCOMES
            </span>
            <h2 className="text-[clamp(28px,3.5vw,48px)] font-bold tracking-[-1.5px] leading-[1.08] text-stark-white">
              What students leave with.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prog.whatStudentsGain.map((item, i) => (
              <div
                key={i}
                className="fade-up flex gap-4 items-start bg-slate-mid border border-slate-light rounded-xl p-5 hover:border-[rgba(0,229,160,0.25)] transition-colors duration-300"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className="w-8 h-8 shrink-0 rounded-full bg-[rgba(0,229,160,0.1)] border border-[rgba(0,229,160,0.2)] flex items-center justify-center mt-0.5">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#00E5A0"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <polyline points="20,6 9,17 4,12" />
                  </svg>
                </div>
                <p className="text-[14px] font-light leading-[1.8] text-white-dim">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For schools detail */}
      <section className="bg-slate-mid border-y border-slate-light py-20 px-6 md:px-10">
        <div className="max-w-225 mx-auto text-center">
          <div className="fade-up">
            <span className="font-mono text-[11px] tracking-[3px] uppercase text-electric mb-4 block">
              SCHOOL DELIVERY
            </span>
            <h2 className="text-[clamp(26px,3vw,42px)] font-bold tracking-[-1.5px] leading-[1.1] text-stark-white mb-6">
              How we run this program at your school.
            </h2>
            <p className="text-base font-light leading-[1.9] text-white-dim mb-8 max-w-170 mx-auto">
              {prog.forSchoolsDetail}
            </p>
            <a href="#program-enquiry">
              <button className="px-8 py-4 text-base font-semibold bg-electric text-deep-slate rounded-lg hover:shadow-[0_0_48px_rgba(0,229,160,0.4)] hover:-translate-y-0.5 transition-all duration-200">
                Request a proposal for your school →
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Enquiry form */}
      <section id="program-enquiry" className="py-20 px-6 md:px-10">
        <div className="max-w-140 mx-auto">
          <div className="fade-up text-center mb-10">
            <span className="font-mono text-[11px] tracking-[3px] uppercase text-electric mb-4 block">
              GET STARTED
            </span>
            <h2 className="text-[clamp(26px,3vw,42px)] font-bold tracking-[-1.5px] leading-[1.1] text-stark-white mb-4">
              Bring {prog.name} to your school.
            </h2>
            <p className="text-base font-light text-white-dim leading-[1.8]">
              Fill in the form below. We'll respond within one business day with
              a clear, tailored proposal.
            </p>
          </div>
          <div className="fade-up delay-2 bg-slate-mid border border-slate-light rounded-xl p-8">
            <EnquiryForm programName={prog.name} />
          </div>
        </div>
      </section>
    </main>
  );
}
