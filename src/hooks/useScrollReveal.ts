import { useEffect } from "react";

export function useScrollReveal() {
  useEffect(() => {
    // Strip any cached .is-visible so animations always replay on load
    document.querySelectorAll(".is-visible").forEach((el) => {
      el.classList.remove("is-visible");
    });

    const targets = document.querySelectorAll("[data-animate], [data-animate-clip]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -32px 0px" }
    );

    // Small delay so the hero entrance plays first before scroll observer kicks in
    const id = setTimeout(() => {
      targets.forEach((el) => observer.observe(el));
    }, 200);

    return () => {
      clearTimeout(id);
      observer.disconnect();
    };
  }, []);
}
