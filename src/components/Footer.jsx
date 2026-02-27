import { Link } from "react-router-dom";
import { ContactInfo } from "../data";
import { LogoIcon } from "./LogoIcon";

const SOCIAL = [
  {
    label: "LinkedIn",
    href: ContactInfo.linkedIn,
    path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z",
  },
  {
    label: "Instagram",
    href: ContactInfo.instagram,
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8z M18.406 4.155a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  },
  {
    label: "X",
    href: ContactInfo.twitter,
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    label: "TikTok",
    href: ContactInfo.tiktok,
    path: "M12.5 2c1.3 1.6 3.1 2.6 5.1 2.7v3.2c-1.6-.1-3.1-.6-4.4-1.5v6.8c0 3.4-2.8 6.2-6.2 6.2S.8 16.6.8 13.2 3.6 7 7 7c.3 0 .7 0 1 .1v3.2c-.3-.1-.6-.2-1-.2-1.7 0-3.1 1.4-3.1 3.1S5.3 16.3 7 16.3s3.1-1.4 3.1-3.1V2h2.4z",
  },
];

function FooterCol({ title, links }) {
  return (
    <div>
      <span className="font-mono text-[10px] tracking-[2px] uppercase text-stark-white font-bold block mb-5">
        {title}
      </span>
      {links.map((l, i) =>
        l.external ? (
          <a
            key={i}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-[14px] font-light text-white-dim hover:text-stark-white transition-colors mb-2.5"
          >
            {l.label}
          </a>
        ) : l.to ? (
          <Link
            key={i}
            to={l.to}
            className="block text-[14px] font-light text-white-dim hover:text-stark-white transition-colors mb-2.5"
          >
            {l.label}
          </Link>
        ) : (
          <a
            key={i}
            href={l.href || "#"}
            className="block text-[14px] font-light text-white-dim hover:text-stark-white transition-colors mb-2.5"
          >
            {l.label}
          </a>
        ),
      )}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-slate-mid border-t border-slate-light px-6 md:px-10 pt-16 pb-8">
      <div className="max-w-300 mx-auto">
        {/* Top grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-14 border-b border-slate-light">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-5">
              <LogoIcon />
            </div>
            <p className="text-[13px] font-light text-white-dim leading-[1.75] mb-6">
              Where children become architects of tomorrow.
            </p>
            <div className="flex gap-2.5">
              {SOCIAL.map((icon) => (
                <a
                  key={icon.label}
                  href={icon.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={icon.label}
                  className="w-9 h-9 rounded-full border border-slate-light flex items-center justify-center hover:border-electric transition-colors duration-200"
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="#B8BED0"
                  >
                    <path d={icon.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <FooterCol
            title="Programs"
            links={[
              { label: "Coding", to: "/programs/coding" },
              {
                label: "Artificial Intelligence",
                to: "/programs/artificial-intelligence",
              },
              { label: "Robotics", to: "/programs/robotics" },
              { label: "UI/UX Design", to: "/programs/ui-ux-design" },
              { label: "Cyber Safety", to: "/programs/cyber-safety" },
            ]}
          />

          <FooterCol
            title="Company"
            links={[
              { label: "About", href: "/#about" },
              { label: "For Schools", href: "/#schools" },
              { label: "FAQ", href: "/#faq" },
              { label: "Contact", href: "/#schools" },
            ]}
          />

          <div>
            <span className="font-mono text-[10px] tracking-[2px] uppercase text-stark-white font-bold block mb-5">
              Contact
            </span>
            <a
              href={ContactInfo.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-[14px] font-light text-white-dim hover:text-electric transition-colors mb-2.5 leading-[1.7]"
            >
              {ContactInfo.address}
            </a>
            <a
              href={`mailto:${ContactInfo.email}`}
              className="block text-[14px] text-white-dim hover:text-electric transition-colors mb-2"
            >
              {ContactInfo.email}
            </a>
            <a
              href={`tel:${ContactInfo.phoneLink}`}
              className="block text-[14px] text-white-dim hover:text-stark-white transition-colors"
            >
              {ContactInfo.phoneDisplay}
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-6">
          <span className="font-mono text-[10px] tracking-[1.5px] text-white-dim">
            &copy; {new Date().getFullYear()} Skilimu · All rights reserved
          </span>
          <div className="flex gap-6 flex-wrap justify-center">
            <Link
              to="/privacy-policy"
              className="font-mono text-[10px] tracking-[1.5px] text-white-dim hover:text-stark-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="font-mono text-[10px] tracking-[1.5px] text-white-dim hover:text-stark-white transition-colors"
            >
              Terms of Service
            </Link>
            <span className="font-mono text-[10px] tracking-[2px] text-white-dim">
              NAIROBI · KENYA
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
