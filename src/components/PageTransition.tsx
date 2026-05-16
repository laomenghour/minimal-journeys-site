import { createContext, useContext, useRef, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { getMaskCircle, randomMaskColor } from "@/App";

type NavigateFn = (path: string) => void;

const TransitionContext = createContext<NavigateFn>(() => {});

export function usePageTransition(): NavigateFn {
  return useContext(TransitionContext);
}

export function PageTransition({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const circleRef = useRef<HTMLDivElement>(null);

  const navigateTo: NavigateFn = (path) => {
    const circle = circleRef.current;
    if (!circle) { navigate(path); return; }

    // Measure live position of the avatar at the moment of the click
    const { cx, cy, diameter } = getMaskCircle();
    const half = diameter / 2;

    gsap.timeline()
      // Pinpoint at the avatar, hidden
      .set(circle, {
        display: "block",
        background: randomMaskColor(),
        width: diameter,
        height: diameter,
        x: cx - half,
        y: cy - half,
        scale: 0,
      })
      // Expand to cover the whole screen — GPU scale, butter smooth
      .to(circle, {
        scale: 1,
        duration: 0.42,
        ease: "power4.inOut",
      })
      // Swap the route while the circle covers everything
      .add(() => {
        navigate(path, { state: { fromTransition: true } });
        window.scrollTo(0, 0);
      })
      // Contract back toward the avatar, revealing the new page
      .to(circle, {
        scale: 0,
        duration: 0.52,
        ease: "power4.inOut",
        delay: 0.04,
      })
      .set(circle, { display: "none" });
  };

  return (
    <TransitionContext.Provider value={navigateTo}>
      {children}
      {/*
        Circle uses transform: scale() — GPU compositor, zero repaint.
        Sized and positioned dynamically at navigate time.
      */}
      <div
        ref={circleRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          borderRadius: "50%",
          background: "transparent",
          zIndex: 9999,
          display: "none",
          pointerEvents: "none",
          willChange: "transform",
        }}
      />
    </TransitionContext.Provider>
  );
}
