// import { useEffect } from "react";

// export function useScrollReveal() {
//   useEffect(() => {
//     const els = document.querySelectorAll(".fade-up:not(.visible)");
//     if (!els.length) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((e) => {
//           if (e.isIntersecting) {
//             e.target.classList.add("visible");
//             observer.unobserve(e.target);
//           }
//         });
//       },
//       { threshold: 0.1, rootMargin: "0px 0px -30px 0px" },
//     );
//     els.forEach((el) => observer.observe(el));
//     return () => observer.disconnect();
//   }, [location.pathname]);
// }

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useScrollReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    const els = document.querySelectorAll(".fade-up:not(.visible)");
    // if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });
}
