import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { useScrollReveal } from "./hooks/useScrollReveal";

import { Nav } from "./components/Nav";
import Home from "./pages//Home";
import { NotFound } from "./pages/NotFound";
import ProgramDetail from "./pages/ProgramDetail";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsofService } from "./pages/TermsofService";
import { Footer } from "./components/Footer";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  useScrollReveal();

  return (
    <div className="bg-deep-slate text-stark-white min-h-screen">
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/programs/:slug" element={<ProgramDetail />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsofService />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}
