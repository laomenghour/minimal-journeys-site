import { useEffect, useRef } from "react";
import gsap from "gsap";
import PixelCursor from "@/components/PixelCursor";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageTransition } from "@/components/PageTransition";
import Index from "./pages/Index";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const MASK_COLORS = ["#ea5959", "#3883ce", "#f5be47"];
export function randomMaskColor() {
  return MASK_COLORS[Math.floor(Math.random() * MASK_COLORS.length)];
}

/**
 * Returns { cx, cy, diameter } for a circle centred on [data-nav-profile]
 * that is large enough to cover the entire viewport from that origin.
 */
export function getMaskCircle() {
  const el = document.querySelector("[data-nav-profile]");
  const rect = el?.getBoundingClientRect();
  const cx = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
  const cy = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;

  // Radius = distance to the farthest viewport corner
  const radius = Math.max(
    Math.hypot(cx, cy),
    Math.hypot(window.innerWidth - cx, cy),
    Math.hypot(cx, window.innerHeight - cy),
    Math.hypot(window.innerWidth - cx, window.innerHeight - cy)
  );

  return { cx, cy, diameter: radius * 2 * 1.05 }; // 5 % safety margin
}

const App = () => {
  const introRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const circle = introRef.current;
    if (!circle) return;

    const { cx, cy, diameter } = getMaskCircle();
    const half = diameter / 2;

    // Size + centre the circle on the profile avatar
    gsap.set(circle, {
      width: diameter,
      height: diameter,
      x: cx - half,
      y: cy - half,
      scale: 1,           // starts fully covering the screen
    });

    // Shrink to zero — GPU-composited, butter smooth
    gsap.to(circle, {
      scale: 0,
      duration: 0.85,
      ease: "power4.inOut",
      delay: 0.05,
      onComplete: () => { circle.style.display = "none"; },
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <PixelCursor />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <PageTransition>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageTransition>
        </BrowserRouter>

        {/*
          Intro circle — covers the page on first load, then shrinks toward
          the profile avatar via transform: scale() (GPU compositor layer).
        */}
        <div
          ref={introRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            borderRadius: "50%",
            background: randomMaskColor(),
            zIndex: 10000,
            pointerEvents: "none",
            willChange: "transform",
          }}
        />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
