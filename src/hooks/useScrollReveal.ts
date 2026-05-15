import { useEffect } from "react";
import gsap from "gsap";

export function useScrollReveal() {
  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-animate]")
    );

    // Use opacity only (not autoAlpha) so visibility stays intact
    // and IntersectionObserver can detect elements correctly
    targets.forEach((el) => {
      gsap.set(el, { opacity: 0, y: 52 });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const delay = parseFloat(
            getComputedStyle(el).getPropertyValue("--reveal-delay") || "0"
          );
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: isNaN(delay) ? 0 : delay,
            ease: "power3.out",
          });
          observer.unobserve(el);
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -16px 0px" }
    );

    // Short delay so page-entry animations finish first
    const id = setTimeout(() => {
      targets.forEach((el) => observer.observe(el));
    }, 250);

    return () => {
      clearTimeout(id);
      observer.disconnect();
      targets.forEach((el) => gsap.set(el, { clearProps: "opacity,y,transform" }));
    };
  }, []);
}
