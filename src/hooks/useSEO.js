/**
 * useSEO.js
 * Sets <title>, <meta> tags, canonical URL, Open Graph, Twitter Card,
 * and injects JSON-LD structured data for every page.
 *
 * Usage:
 *   useSEO({ title, description, path, type, jsonLd })
 */

import { useEffect } from "react";

const SITE_NAME = "Skilimu";
const SITE_URL = "https://skilimu.com";
const SITE_IMAGE = `${SITE_URL}/og-image.png`; // 1200×630 OG image in /public

export function useSEO({
  title,
  description,
  path = "/",
  type = "website",
  jsonLd = null,
}) {
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} — Where children become architects of tomorrow`;
  const canonical = `${SITE_URL}${path}`;

  useEffect(() => {
    // ── Title
    document.title = fullTitle;

    // ── Helper to upsert a <meta> tag
    function setMeta(selector, attr, value) {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        const [attrName, attrValue] = selector
          .match(/\[(.+?)="(.+?)"\]/)
          .slice(1);
        el.setAttribute(attrName, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    }

    // ── Helper to upsert a <link> tag
    function setLink(rel, href) {
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", rel);
        document.head.appendChild(el);
      }
      el.setAttribute("href", href);
    }

    // ── Core meta
    setMeta('[name="description"]', "content", description);
    setMeta('[name="robots"]', "content", "index, follow");
    setMeta('[name="author"]', "content", "Skilimu");

    // ── Canonical
    setLink("canonical", canonical);

    // ── Open Graph
    setMeta('[property="og:title"]', "content", fullTitle);
    setMeta('[property="og:description"]', "content", description);
    setMeta('[property="og:url"]', "content", canonical);
    setMeta('[property="og:type"]', "content", type);
    setMeta('[property="og:image"]', "content", SITE_IMAGE);
    setMeta('[property="og:image:width"]', "content", "1200");
    setMeta('[property="og:image:height"]', "content", "630");
    setMeta('[property="og:site_name"]', "content", SITE_NAME);
    setMeta('[property="og:locale"]', "content", "en_KE");

    // ── Twitter Card
    setMeta('[name="twitter:card"]', "content", "summary_large_image");
    setMeta('[name="twitter:title"]', "content", fullTitle);
    setMeta('[name="twitter:description"]', "content", description);
    setMeta('[name="twitter:image"]', "content", SITE_IMAGE);

    // ── JSON-LD structured data
    const existingScript = document.querySelector('script[data-seo="jsonld"]');
    if (existingScript) existingScript.remove();

    if (jsonLd) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo", "jsonld");
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [fullTitle, description, canonical, type, jsonLd]);
}

// ── Pre-built JSON-LD schemas ─────────────────────────────────────────────────

export const schemaOrg = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Skilimu",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  description: "Technology education for children ages 6–18 in Nairobi, Kenya.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "RXHC+XGQ, Eastern Bypass",
    addressLocality: "Ruiru",
    addressRegion: "Nairobi",
    addressCountry: "KE",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+254702566209",
    contactType: "customer service",
    email: "hello@skilimu.com",
  },
  sameAs: [],
};

export const schemaWebsite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Skilimu",
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/programs/{search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export function schemaCourse({ name, description, slug, ageRange, duration }) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `${name} for Schools — Skilimu`,
    description,
    url: `${SITE_URL}/programs/${slug}`,
    provider: {
      "@type": "Organization",
      name: "Skilimu",
      url: SITE_URL,
    },
    educationalLevel: ageRange,
    timeRequired: duration,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "onsite",
      location: {
        "@type": "Place",
        name: "At your school",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Nairobi",
          addressCountry: "KE",
        },
      },
    },
  };
}

export function schemaFAQ(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export function schemaBreadcrumb(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
