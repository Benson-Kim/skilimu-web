import { Hero } from "../components/Hero";
import { Programs } from "../components/Programs";
import { LifeUpgrade } from "../components/LifeUpgrade";
import { HowItWorks } from "../components/HowItWorks";
import { Testimonials } from "../components/Testimonials";
import { ForSchools } from "../components/ForSchools";
import { Philosophy } from "../components/Philosophy";
import { FAQ as Faq } from "../components/FAQ";
import { FinalCTA } from "../components/FinalCTA";

import { schemaFAQ, schemaOrg, schemaWebsite, useSEO } from "../hooks/useSEO";
import { useFetch } from "../hooks/useFetch";

export default function Home() {
  const { data: faqs } = useFetch("faqs");

  useSEO({
    title: "Technology Education for Schools in Kenya",
    description:
      "Skilimu partners with Kenya schools to deliver Coding, AI, Robotics, UI/UX Design and Cyber Safety programs for ages 6–18. 500+ students. 25+ school partners. Enquire today.",
    path: "/",
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [schemaOrg, schemaWebsite, ...(faqs ? [schemaFAQ(faqs)] : [])],
    },
  });

  return (
    <main>
      <Hero />
      <div className="h-px bg-slate-light" />
      <Programs />
      <LifeUpgrade />
      <HowItWorks />
      <div className="h-px bg-slate-light" />
      <Testimonials />
      <ForSchools />
      <Philosophy />
      <Faq />
      <FinalCTA />
    </main>
  );
}
