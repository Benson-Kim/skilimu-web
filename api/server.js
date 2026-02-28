import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const {
  RESEND_API_KEY,
  NOTIFY_EMAIL = "hello@skilimu.com",
  MAIL_FROM = "Skilimu <onboarding@resend.dev>",
  PORT = 4001,
} = process.env;

const app = express();
app.use(cors());
app.use(express.json());

// ── Load db.json at startup
const dbPath = resolve(__dirname, "../db.json");
const db = JSON.parse(readFileSync(dbPath, "utf8"));
const enquiries = [];

// ── JSON data routes (/api/*)
app.get("/api/programs", (_, res) => res.json(db.programs));
app.get("/api/testimonials", (_, res) => res.json(db.testimonials));
app.get("/api/faqs", (_, res) => res.json(db.faqs));
app.get("/api/stats", (_, res) => res.json(db.stats));

app.post("/api/enquiries", (req, res) => {
  const entry = { id: Date.now().toString(), ...req.body };
  enquiries.push(entry);
  console.log(" Enquiry saved:", entry.name, "|", entry.school || entry.email);
  res.status(201).json(entry);
});

// ── Nodemailer transport
function getTransport() {
  if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
    return nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number.parseInt(SMTP_PORT || "587", 10),
      secure: SMTP_PORT === "465",
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
  }
  return null;
}

// ── Resend HTTP
async function sendViaResend({ to, from, replyTo, subject, html }) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({ from, to, reply_to: replyTo, subject, html }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Resend ${res.status}: ${err}`);
  }
  return res.json();
}

// ── Email templates
function buildNotificationEmail({
  name,
  school,
  email,
  role,
  students,
  programme,
  message,
  type,
}) {
  const subject = school
    ? `School Enquiry — ${school}`
    : `Quick Enquiry — ${name}`;

  const rows = [
    school && ["School", school],
    name && ["Contact", name],
    role && ["Role", role],
    email && [
      "Email",
      `<a href="mailto:${email}" style="color:#00e5a0">${email}</a>`,
    ],
    students && ["Students", students],
    programme && ["Programme", programme],
    message && ["Message", message],
    [
      "Time (EAT)",
      new Date().toLocaleString("en-KE", { timeZone: "Africa/Nairobi" }),
    ],
  ].filter(Boolean);

  const rowsHtml = rows
    .map(
      ([label, value]) => `
    <tr>
      <td style="padding:8px 0;color:#b8bed0;font-size:13px;width:120px;vertical-align:top">${label}</td>
      <td style="padding:8px 0;color:#f5f6fa;font-size:14px">${value}</td>
    </tr>`,
    )
    .join("");

  const html = `
  <div style="font-family:'DM Sans',sans-serif;max-width:580px;margin:0 auto;background:#0e1117;color:#f5f6fa;padding:36px;border-radius:12px;border:1px solid #2c3547">
    <div style="border-bottom:2px solid #00e5a0;padding-bottom:14px;margin-bottom:24px">
      <p style="font-family:monospace;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#00e5a0;margin:0 0 8px">
        SCHOOL ENQUIRY · SKILIMU
      </p>
      <h2 style="margin:0;font-size:22px;font-weight:700;color:#f5f6fa;letter-spacing:-0.5px">
        ${school || name}
      </h2>
    </div>
    <table style="width:100%;border-collapse:collapse">${rowsHtml}</table>
    <div style="margin-top:24px;padding:14px 16px;background:#1a2030;border-radius:8px;border:1px solid #2c3547">
      <p style="margin:0;font-size:12px;color:#b8bed0">
        Reply to: <a href="mailto:${email}" style="color:#00e5a0">${email}</a>
      </p>
    </div>
    <p style="margin:28px 0 0;font-size:11px;color:#2c3547;text-align:center">
      Skilimu · RXHC+XGQ, Eastern Bypass, Ruiru, Nairobi
    </p>
  </div>`;

  return { subject, html };
}

function buildAutoReply({ name, email }) {
  const firstName = name.split(" ")[0];
  const html = `
  <div style="font-family:'DM Sans',sans-serif;max-width:580px;margin:0 auto;background:#0e1117;color:#f5f6fa;padding:36px;border-radius:12px;border:1px solid #2c3547">
    <div style="border-bottom:2px solid #00e5a0;padding-bottom:14px;margin-bottom:24px">
      <p style="font-family:monospace;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#00e5a0;margin:0 0 8px">RECEIVED · SKILIMU</p>
      <h2 style="margin:0;font-size:22px;font-weight:700;color:#f5f6fa;letter-spacing:-0.5px">
        Thank you, ${firstName}.
      </h2>
    </div>
    <p style="font-size:15px;font-weight:300;line-height:1.8;color:#b8bed0;margin-bottom:16px">
      We've received your enquiry and will be in touch within one business day with a clear proposal for your school.
    </p>
    <div style="padding:16px 20px;background:#1a2030;border-radius:8px;border:1px solid #2c3547;margin-bottom:28px">
      <p style="margin:0 0 8px;font-size:13px;color:#b8bed0">
        📞 <a href="tel:+254702566209" style="color:#00e5a0;text-decoration:none">+254 702 566 209</a>
      </p>
      <p style="margin:0;font-size:13px;color:#b8bed0">
        ✉️ <a href="mailto:hello@skilimu.com" style="color:#00e5a0;text-decoration:none">hello@skilimu.com</a>
      </p>
    </div>
    <p style="font-size:14px;font-weight:300;color:#b8bed0;margin-bottom:4px">— The Skilimu Team</p>
    <p style="font-size:11px;color:#2c3547;margin:28px 0 0;text-align:center">
      Where children become architects of tomorrow · Nairobi, Kenya
    </p>
  </div>`;

  return { subject: "We received your enquiry — Skilimu", html };
}

// ── Mail routes (/mail/*)
app.post("/mail/send-enquiry", async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "name and email are required" });
  }

  const { subject, html: notifHtml } = buildNotificationEmail(req.body);
  const { subject: autoSubject, html: autoHtml } = buildAutoReply({
    name,
    email,
  });

  try {
    await sendViaResend({
      from: MAIL_FROM,
      to: NOTIFY_EMAIL,
      replyTo: email,
      subject,
      html: notifHtml,
    });
    await sendViaResend({
      from: MAIL_FROM,
      to: email,
      subject: autoSubject,
      html: autoHtml,
    });
    console.log("Email sent:", subject);
    res.json({ success: true, mode: "live" });
  } catch (err) {
    console.error("Email failed:", err.message);
    res
      .status(500)
      .json({ error: "Email delivery failed. Enquiry was saved." });
  }
});

app.get("/mail/health", (_, res) =>
  res.json({ status: "ok", smtp: !!SMTP_HOST }),
);

// ── Start
app.listen(PORT, () => {
  console.log(` Skilimu server → http://localhost:${PORT}`);
  console.log(`   Data API:  /api/* (programs, testimonials, faqs, stats)`);
  console.log(`   Mail:      /mail/send-enquiry`);
});
