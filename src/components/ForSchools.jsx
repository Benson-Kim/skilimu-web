import { useRef, useState } from "react";
import { postEnquiry } from "../hooks/useFetch";
import { ContactInfo } from "../data";

const BENEFITS = [
  {
    title: "Student Engagement",
    body: "Hands-on coding, AI, robotics, and cyber safety programs that make learning exciting and immediately applicable.",
  },
  {
    title: "Seamless Integration",
    body: "We work alongside your existing curriculum. Our team handles equipment, instructors, and progress reporting with minimal disruption.",
  },
  {
    title: "Dedicated Support",
    body: "From initial setup to ongoing delivery, our education specialists stay with you to ensure the program exceeds expectations.",
  },
];

function CheckIcon() {
  return (
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
  );
}

export function ForSchools() {
  const sectionRef = useRef(null);

  const [form, setForm] = useState({
    school: "",
    name: "",
    email: "",
    students: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const update = (field) => (e) =>
    setForm((p) => ({ ...p, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");
    try {
      await postEnquiry({ ...form, type: "school" });
      setStatus("success");
      sectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    } catch (err) {
      setErrorMsg(
        "Could not send your message. Please email us directly at" +
          ContactInfo.email +
          ".",
      );
      setStatus("error");
      console.error(err);
    }
  };

  return (
    <section id="schools" className="bg-slate-mid border-y border-slate-light">
      <div className="max-w-275 mx-auto px-6 md:px-10 py-24">
        <div className="flex flex-col md:flex-row gap-16 md:gap-20 items-start">
          {/* Left */}
          <div className="fade-up flex-1">
            <span className="font-mono text-[11px] tracking-[3px] uppercase text-electric mb-4 block">
              FOR SCHOOLS
            </span>
            <h2 className="text-[clamp(30px,4vw,54px)] font-bold leading-[1.08] tracking-[-2px] text-stark-white mb-5">
              Bring Skilimu
              <br />
              into your school.
            </h2>
            <p className="text-base font-light leading-[1.85] text-white-dim mb-8">
              We partner with schools across the country to run structured
              technology programs that sit alongside your existing curriculum.
              No disruption — just transformation.
            </p>

            <div className="flex flex-col gap-6">
              {BENEFITS.map((b, i) => (
                <div key={i} className="flex gap-4">
                  <CheckIcon />
                  <div>
                    <div className="text-[15px] font-semibold text-stark-white mb-1">
                      {b.title}
                    </div>
                    <p className="text-[14px] font-light leading-[1.8] text-white-dim">
                      {b.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact info */}
            <div className="mt-10 pt-8 border-t border-slate-light flex flex-col gap-2.5">
              {[
                {
                  label: "PHONE",
                  value: ContactInfo.phoneDisplay,
                  href: `tel:${ContactInfo.phoneLink}`,
                },
                {
                  label: "EMAIL",
                  value: ContactInfo.email,
                  href: `mailto:${ContactInfo.email}`,
                },
                {
                  label: "LOCATION",
                  value: ContactInfo.address,
                  href: ContactInfo.mapsLink,
                },
              ].map((row) => (
                <div key={row.label} className="flex items-center gap-3">
                  <span className="font-mono text-[9px] tracking-[1.5px] uppercase text-white-dim w-16 shrink-0">
                    {row.label}
                  </span>

                  <a
                    href={row.href}
                    target={row.label === "LOCATION" ? "_blank" : undefined}
                    rel={
                      row.label === "LOCATION"
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="text-[14px] text-white hover:text-electric transition-colors"
                  >
                    {row.value}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div ref={sectionRef} className="fade-up delay-2 flex-1 w-full">
            {status === "success" ? (
              <div className="bg-slate-mid border border-slate-light rounded-[12px] p-14 flex flex-col items-center text-center gap-4">
                <div className="w-14 h-14 bg-electric rounded-full flex items-center justify-center mb-2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#0E1117"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <polyline points="20,6 9,17 4,12" />
                  </svg>
                </div>
                <h3 className="text-[22px] font-bold text-electric tracking-[-0.5px]">
                  Enquiry received.
                </h3>
                <p className="text-base font-light text-white-dim leading-[1.8]">
                  We'll be in touch within one business day. We look forward to
                  building something great with your school.
                </p>
                <p className="font-mono text-[10px] tracking-[1.5px] uppercase text-white-dim/50 mt-2">
                  ✓ Email sent to {ContactInfo.email}
                </p>
              </div>
            ) : (
              <div className="bg-slate-mid border border-slate-light rounded-[12px] p-8">
                <h3 className="text-[18px] font-semibold text-stark-white mb-1.5 tracking-[-0.4px]">
                  Start the conversation
                </h3>
                <p className="text-[13px] font-light text-white-dim mb-7 leading-[1.8]">
                  Tell us a little about your school and we'll come back to you
                  with exactly how we can help.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <input
                    className="field"
                    placeholder="School name"
                    value={form.school}
                    onChange={update("school")}
                    required
                  />
                  <input
                    className="field"
                    placeholder="Your name"
                    value={form.name}
                    onChange={update("name")}
                    required
                  />
                  <input
                    className="field"
                    placeholder="Email address"
                    value={form.email}
                    onChange={update("email")}
                    type="email"
                    required
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <select
                      className="field appearance-none"
                      value={form.students}
                      onChange={update("students")}
                      required
                      style={{ color: form.students ? undefined : "#B8BED0" }}
                    >
                      <option value="" disabled>
                        Number of students
                      </option>
                      <option>Under 100</option>
                      <option>100-300</option>
                      <option>300-600</option>
                      <option>600+</option>
                    </select>
                    <select
                      className="field appearance-none"
                      value={form.programs}
                      onChange={update("programs")}
                      required
                      style={{ color: form.programs ? undefined : "#B8BED0" }}
                    >
                      <option value="" disabled>
                        Programs interested in
                      </option>
                      <option>Multiple / Not Sure</option>
                      <option>Coding</option>
                      <option>Artificial Intelligence (AI)</option>
                      <option>Robotics</option>
                      <option>UI/UX Design</option>
                      <option>Cyber Safety</option>
                    </select>
                  </div>

                  <textarea
                    className="field resize-y"
                    placeholder="Anything else we should know? (optional)"
                    value={form.message}
                    onChange={update("message")}
                    rows={3}
                  />

                  {status === "error" && (
                    <p className="text-[13px] text-red-400">{errorMsg}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="mt-2 py-3.5 text-sm font-semibold bg-electric text-deep-slate rounded-lg hover:shadow-[0_0_40px_rgba(0,229,160,0.4)] hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                  >
                    {status === "submitting" ? "Sending…" : "Send enquiry →"}
                  </button>
                  <p className="text-center text-[11px] text-white-dim/50 font-mono tracking-wide">
                    Or call us directly{" "}
                    <a
                      href={`tel:${ContactInfo.phoneLink}`}
                      className="text-electric hover:underline"
                    >
                      {ContactInfo.phoneDisplay}
                    </a>
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
