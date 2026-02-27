/**
 * api/mailer.js
 * Lightweight Express mail server (Dev + Production ready)
 */
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();
app.use(cors());
app.use(express.json());

const {
  SMTP_HOST,
  SMTP_PORT = "587",
  SMTP_USER,
  SMTP_PASS,
  NOTIFY_EMAIL = "hello@skilimu.com",
  MAIL_PORT = 6000,
} = process.env;

const CONTACT = {
  phoneDisplay: "+254 702 566 209",
  phoneLink: "+254702566209",
  email: "hello@skilimu.com",
  address: "RXHC+XGQ, Eastern Bypass, Ruiru, Nairobi",
};

function createTransport() {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number.parseInt(SMTP_PORT),
    secure: SMTP_PORT === "465",
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

const eatTime = () =>
  new Date().toLocaleString("en-KE", { timeZone: "Africa/Nairobi" }) + " EAT";

function buildTableRows(fields) {
  return fields
    .filter(([, value]) => value)
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:8px 0;color:#B8BED0;font-size:13px;width:140px;vertical-align:top">
          ${label}
        </td>
        <td style="padding:8px 0;color:#F5F6FA;font-size:14px">
          ${value}
        </td>
      </tr>`,
    )
    .join("");
}

function layout({ eyebrow, title, body }) {
  return `
  <div style="font-family:'DM Sans',sans-serif;max-width:600px;margin:0 auto;background:#0E1117;color:#F5F6FA;padding:36px;border-radius:12px;border:1px solid #2C3547">
    <div style="border-bottom:2px solid #00E5A0;padding-bottom:16px;margin-bottom:24px">
      <p style="font-family:monospace;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#00E5A0;margin:0 0 6px">
        ${eyebrow}
      </p>
      <h2 style="margin:0;font-size:22px;font-weight:700;color:#F5F6FA">
        ${title}
      </h2>
    </div>
    ${body}
    <p style="margin-top:28px;font-size:11px;color:#2C3547;text-align:center">
      Skilimu · ${CONTACT.address}
    </p>
  </div>`;
}

function buildNotification(data) {
  const isSchool = data.type === "school";

  const rows = buildTableRows([
    ["School", data.school],
    ["Contact", data.name],
    [
      "Email",
      `<a href="mailto:${data.email}" style="color:#00E5A0">${data.email}</a>`,
    ],
    ["Students", data.students],
    ["Program", data.program],
    ["Message", data.message],
    ["Received", eatTime()],
  ]);

  return {
    subject: isSchool
      ? `New School Enquiry — ${data.school || "Unknown School"}`
      : `New Enrolment Interest — ${data.name}`,
    html: layout({
      eyebrow: isSchool ? "SCHOOL PARTNERSHIP ENQUIRY" : "ENROLMENT INTEREST",
      title: isSchool ? data.school || "School Name Not Provided" : data.name,
      body: `<table style="width:100%;border-collapse:collapse">${rows}</table>`,
    }),
  };
}

function buildAutoReply(data) {
  const firstName = data.name.split(" ")[0];
  const isSchool = data.type === "school";

  return {
    subject: "We received your enquiry — Skilimu",
    html: layout({
      eyebrow: "MESSAGE RECEIVED",
      title: `Thank you, ${firstName}.`,
      body: `
        <p style="font-size:15px;line-height:1.8;color:#B8BED0;margin-bottom:16px">
          We've received your ${
            isSchool ? "school partnership enquiry" : "interest in our programs"
          } and will respond within one business day.
        </p>
        <div style="padding:18px;background:#1A2030;border-radius:8px;border:1px solid #2C3547">
          <p style="margin:0 0 8px;font-size:13px;color:#B8BED0">
            📞 <a href="tel:${CONTACT.phoneLink}" style="color:#00E5A0;text-decoration:none">
              ${CONTACT.phoneDisplay}
            </a>
          </p>
          <p style="margin:0;font-size:13px;color:#B8BED0">
            ✉️ <a href="mailto:${CONTACT.email}" style="color:#00E5A0;text-decoration:none">
              ${CONTACT.email}
            </a>
          </p>
        </div>
        <p style="margin-top:24px;font-size:13px;color:#B8BED0">
          — The Skilimu Team
        </p>
      `,
    }),
  };
}

app.post("/send-enquiry", async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required." });
  }

  const transport = createTransport();
  const notification = buildNotification(req.body);
  const autoReply = buildAutoReply(req.body);

  try {
    if (transport) {
      await transport.sendMail({
        from: `"Skilimu Website" <${SMTP_USER}>`,
        to: NOTIFY_EMAIL,
        replyTo: email,
        subject: notification.subject,
        html: notification.html,
      });

      await transport.sendMail({
        from: `"Skilimu" <${SMTP_USER}>`,
        to: email,
        subject: autoReply.subject,
        html: autoReply.html,
      });

      console.log(`  Sent → ${notification.subject}`);
      return res.json({ success: true, mode: "live" });
    }

    // Dev mode
    console.log("\n━━ EMAIL (dev mode — SMTP not configured) ━━");
    console.log(notification.subject);
    console.log("From:", `${name} <${email}>`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

    res.json({ success: true, mode: "dev" });
  } catch (err) {
    console.error("Email failed:", err.message);
    res.status(500).json({ error: "Email delivery failed." });
  }
});

app.get("/health", (_, res) => res.json({ status: "ok", smtp: !!SMTP_HOST }));

app.listen(MAIL_PORT, "0.0.0.0", () => {
  console.log(` Mail server → http://localhost:${MAIL_PORT}`);
  console.log(
    `SMTP: ${SMTP_HOST ? `${SMTP_HOST} (live)` : "not configured (dev mode)"}`,
  );
});
