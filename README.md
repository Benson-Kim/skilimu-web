# Skilimu — Marketing Website

> _Where children become architects of tomorrow._

Production-grade Vite + React + Tailwind CSS v4 marketing website with JSON Server as a local REST API backend.

---

## Stack

| Layer        | Technology                                           |
| ------------ | ---------------------------------------------------- |
| Build tool   | Vite 6                                               |
| UI framework | React 18                                             |
| Styling      | **Tailwind CSS v4** (via `@tailwindcss/vite` plugin) |
| API / data   | **JSON Server 1.x** — `db.json` as the database      |
| Dev runner   | Concurrently (runs both servers together)            |
| Fonts        | DM Sans + Space Mono (Google Fonts, loaded in CSS)   |

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run everything at once

```bash
npm run dev:full
```

This starts two processes simultaneously:

- **Vite dev server** → [http://localhost:5173](http://localhost:5173)
- **JSON Server** → [http://localhost:5000](http://localhost:5000)

Vite proxies `/api/*` to JSON Server, so all fetches use `/api/programs`, `/api/testimonials`, etc.

### 3. Alternatively, run them separately

```bash
# Terminal 1 — API server
npm run server

# Terminal 2 — Vite
npm run dev
```

---

## JSON Server API

JSON Server reads from `db.json` and automatically exposes REST endpoints:

| Endpoint                | Method | Description                             |
| ----------------------- | ------ | --------------------------------------- |
| `GET /api/programs`     | GET    | All programs (sorted by `?_sort=order`) |
| `GET /api/testimonials` | GET    | All testimonials                        |
| `GET /api/faqs`         | GET    | All FAQs (sorted by `?_sort=order`)     |
| `GET /api/stats`        | GET    | Hero stats                              |
| `POST /api/enquiries`   | POST   | Save school / enrol enquiry             |
| `GET /api/enquiries`    | GET    | View all submitted enquiries            |

### Viewing submitted enquiries

After someone submits the school contact form or quick enrol form, their data is saved to `db.json` under `"enquiries"`. View it at:

```
http://localhost:5000/enquiries
```

Or with:

```bash
curl http://localhost:5000/enquiries
```

### Adding / editing content

All site content lives in `db.json` — edit it directly and JSON Server will pick up changes automatically (no restart needed in watch mode). For example, to add a new testimonial:

```json
{
  "id": "7",
  "quote": "New testimonial here.",
  "name": "Jane D.",
  "role": "Parent · son, age 10",
  "rating": 5
}
```

api/server.js
Express server for sending emails via Nodemailer.
Runs on port 4001 in dev. In production, deploy this as a Node service
and set the SMTP environment variables.
Required environment variables (create a .env file or set in hosting):
SMTP_HOST — your SMTP host (e.g. smtp.gmail.com)
SMTP_PORT — SMTP port (587 for TLS, 465 for SSL)
SMTP_USER — SMTP username / sender address
SMTP_PASS — SMTP password or app-specific password
NOTIFY_EMAIL — where enquiries are forwarded (e.g. hello@skilimu.com)
For Gmail: enable 2FA, generate an App Password, use it as SMTP_PASS.

---

## Project Structure

```
skilimu/
├── db.json                       # JSON Server database (source of truth for content)
├── index.html
├── vite.config.js                # Vite + Tailwind v4 plugin + proxy config
├── package.json
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx                  # React root
    ├── App.jsx                   # Root layout
    ├── index.css                 # Tailwind v4 @import + @theme tokens + custom CSS
    ├── hooks/
    │   ├── useScrollReveal.js    # IntersectionObserver scroll reveal
    │   └── useFetch.js           # Generic fetch hook + postEnquiry helper
    └── components/
        ├── LogoIcon.jsx
        ├── Nav.jsx               # Fixed nav, mobile menu
        ├── Hero.jsx              # Fetches stats from /api/stats
        ├── Programs.jsx          # Fetches programmes from /api/programs
        ├── LifeUpgrade.jsx       # Static alternating rows + SVG illustrations
        ├── HowItWorks.jsx        # Static 3-step process
        ├── Testimonials.jsx      # Fetches from /api/testimonials
        ├── ForSchools.jsx        # POSTs to /api/enquiries
        ├── Philosophy.jsx        # Static brand philosophy
        ├── FAQ.jsx               # Fetches from /api/faqs, accordion UI
        ├── FinalCTA.jsx          # Quick email capture, POSTs to /api/enquiries
        └── Footer.jsx
```

---

## Tailwind v4 Setup Notes

This project uses **Tailwind CSS v4** with the new `@tailwindcss/vite` plugin — no `tailwind.config.js` required.

Custom design tokens are defined in `src/index.css` using the `@theme` block:

```css
@theme {
  --color-electric: #00e5a0;
  --color-deep-slate: #0e1117;
  --color-slate-mid: #1a2030;
  --color-slate-light: #2c3547;
  --color-stark-white: #f5f6fa;
  --color-white-dim: #b8bed0;
  --font-main: "DM Sans", sans-serif;
  --font-mono: "Space Mono", monospace;
}
```

These tokens are then available as Tailwind utility classes:

- `bg-electric`, `text-electric`, `border-electric`
- `bg-deep-slate`, `text-stark-white`, `text-white-dim`
- `bg-slate-mid`, `border-slate-light`

---

## Build for Production

```bash
npm run build
```

> **Note:** JSON Server is a dev tool. For production, replace the `/api` calls with your real backend (e.g. Firebase, Supabase, or a Node/Express API).

---

## Customising Content

| What            | Where                                          |
| --------------- | ---------------------------------------------- |
| Programs        | `db.json` → `programs` array                   |
| Testimonials    | `db.json` → `testimonials` array               |
| FAQs            | `db.json` → `faqs` array                       |
| Hero stats      | `db.json` → `stats` array                      |
| Contact details | `ForSchools.jsx`, `FinalCTA.jsx`, `Footer.jsx` |
| Brand colours   | `src/index.css` → `@theme` block               |

---

_Brand identity: "The Sophisticated Best Friend." Warm but elite. Direct but never cold._
