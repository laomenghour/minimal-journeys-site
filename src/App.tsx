import { useEffect } from "react";
import PixelCursor from "@/components/PixelCursor";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Body background is white (Tailwind bg-background). During the circle-reveal
    // clip we need the html (#111111) to show through, so make body transparent
    // for the duration of the animation then restore it.
    document.body.style.backgroundColor = "transparent";
    const t = setTimeout(() => {
      document.body.style.backgroundColor = "";
    }, 3400); // after circle (1.6s) + hero animations (~1.8s) complete
    return () => clearTimeout(t);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <PixelCursor />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="page-reveal">
            <Routes>
              <Route path="/" element={<Index />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
