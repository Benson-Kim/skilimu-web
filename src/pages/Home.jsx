import { Hero } from "../components/Hero";
import { Programs } from "../components/Programs";
import { LifeUpgrade } from "../components/LifeUpgrade";
import { HowItWorks } from "../components/HowItWorks";
import { Testimonials } from "../components/Testimonials";
import { ForSchools } from "../components/ForSchools";
import { Philosophy } from "../components/Philosophy";
import { FAQ as Faq } from "../components/FAQ";
import { FinalCTA } from "../components/FinalCTA";

export default function Home() {
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
