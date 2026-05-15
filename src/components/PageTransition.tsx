import { createContext, useContext, useRef, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

type NavigateFn = (path: string) => void;

const TransitionContext = createContext<NavigateFn>(() => {});

export function usePageTransition(): NavigateFn {
  return useContext(TransitionContext);
}

export function PageTransition({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const overlayRef = useRef<HTMLDivElement>(null);

  const navigateTo: NavigateFn = (path) => {
    const overlay = overlayRef.current;
    if (!overlay) { navigate(path); return; }

    gsap.timeline()
      .set(overlay, { display: "block", clipPath: "circle(0% at 50% 50%)" })
      .to(overlay, {
        clipPath: "circle(150% at 50% 50%)",
        duration: 0.6,
        ease: "power2.in",
      })
      .add(() => {
        navigate(path);
        window.scrollTo(0, 0);
      })
      .to(overlay, {
        clipPath: "circle(0% at 50% 50%)",
        duration: 0.7,
        ease: "power2.out",
        delay: 0.08,
      })
      .set(overlay, { display: "none" });
  };

  return (
    <TransitionContext.Provider value={navigateTo}>
      {children}
      <div
        ref={overlayRef}
        style={{
          position: "fixed",
          inset: 0,
          background: "#111111",
          zIndex: 9999,
          display: "none",
          pointerEvents: "none",
        }}
      />
    </TransitionContext.Provider>
  );
}
