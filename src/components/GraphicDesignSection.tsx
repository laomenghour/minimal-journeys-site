import { useRef, useEffect, useState } from "react";

// ── Drop your 9 images into src/assets/graphic-design/ then uncomment ──
// import img1 from "@/assets/graphic-design/01.jpg";
// import img2 from "@/assets/graphic-design/02.jpg";
// import img3 from "@/assets/graphic-design/03.jpg";
// import img4 from "@/assets/graphic-design/04.jpg";
// import img5 from "@/assets/graphic-design/05.jpg";
// import img6 from "@/assets/graphic-design/06.jpg";
// import img7 from "@/assets/graphic-design/07.jpg";
// import img8 from "@/assets/graphic-design/08.jpg";
// import img9 from "@/assets/graphic-design/09.jpg";

// Replace `bg` with `src: imgX` once files are in place
const photos = [
  { bg: "linear-gradient(135deg,#0f4c75,#1b6ca8,#fb923c)", rotate: -6, z: 3 },
  { bg: "linear-gradient(135deg,#1e3a8a,#2563eb,#fb923c)", rotate: 4,  z: 5 },
  { bg: "linear-gradient(135deg,#0d9488,#14b8a6,#fb923c)", rotate: -3, z: 4 },
  { bg: "linear-gradient(135deg,#166534,#16a34a,#fb923c)", rotate: 7,  z: 6 },
  { bg: "linear-gradient(135deg,#0369a1,#0ea5e9,#fb923c)", rotate: -5, z: 2 },
  { bg: "linear-gradient(135deg,#0e7490,#22d3ee,#fb923c)", rotate: 3,  z: 4 },
  { bg: "linear-gradient(135deg,#155e75,#06b6d4,#fb923c)", rotate: -7, z: 7 },
  { bg: "linear-gradient(135deg,#14532d,#4ade80,#fb923c)", rotate: 5,  z: 3 },
  { bg: "linear-gradient(135deg,#1e40af,#7c3aed,#dc2626)", rotate: -2, z: 5 },
];

const graphicDesignClients = [
  { name: "BookMeBus" },
  { name: "VET Airbus" },
  { name: "GTVC Speedboat" },
];

// Pre-calculated scattered positions (row-1: 5 photos, row-2: 4 photos)
const photoPositions = [
  { top: 20,  leftVw: 0,  },
  { top: 5,   leftVw: 15 },
  { top: 28,  leftVw: 29 },
  { top: 6,   leftVw: 43 },
  { top: 20,  leftVw: 57 },
  { top: 235, leftVw: 7  },
  { top: 218, leftVw: 22 },
  { top: 240, leftVw: 37 },
  { top: 225, leftVw: 52 },
];

export function GraphicDesignSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const [inView,          setInView]          = useState(false);
  const [projectsVisible, setProjectsVisible] = useState(false);
  const [hovered,         setHovered]         = useState<string | null>(null);
  const [hoveredPhoto,    setHoveredPhoto]    = useState<number | null>(null);

  // Black → white bg transition (same as UX/UI section)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Project names clip reveal — fires once
  useEffect(() => {
    const el = projectsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setProjectsVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const borderColor = inView ? "#e5e7eb" : "#1a1a1a";

  return (
    <section
      ref={sectionRef}
      className="flex flex-col px-6 py-6 md:px-14 lg:px-[104px]"
      style={{
        backgroundColor: inView ? "#ffffff" : "#111111",
        color:           inView ? "#000000" : "#ffffff",
        transition: "background-color 0.8s ease, color 0.8s ease",
        paddingTop: 56,
        paddingBottom: 80,
      }}
    >
      {/* ── Label — identical to UX/UI Design ── */}
      <p
        data-animate
        className="font-inter mb-14"
        style={{
          fontSize: 26,
          fontWeight: 500,
          color: inView ? "#111111" : "#4b5563",
          transition: "color 0.8s ease",
        }}
      >
        Graphic Design
      </p>

      {/* ── Project name list — same clip-reveal + hover arrow ── */}
      <div ref={projectsRef} className="flex flex-col" onMouseLeave={() => setHovered(null)}>
        {graphicDesignClients.map(({ name }, i) => (
          <div
            key={name}
            onMouseEnter={() => setHovered(name)}
            style={{
              borderTop: `1px solid ${borderColor}`,
              transition: "border-color 0.8s ease",
              cursor: "default",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                transform: projectsVisible ? "translateY(0)" : "translateY(112%)",
                transition: "transform 0.85s cubic-bezier(0.16, 1, 0.3, 1)",
                transitionDelay: `${i * 0.09}s`,
              }}
            >
              <span
                className="font-anton"
                style={{
                  fontSize: "clamp(40px, 6.5vw, 86px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.033em",
                  paddingTop: 12,
                  paddingBottom: 12,
                  display: "flex",
                  alignItems: "baseline",
                  gap: 16,
                  position: "relative",
                  opacity: hovered && hovered !== name ? 0.25 : 1,
                  transition: "opacity 0.3s ease",
                }}
              >
                <span style={{
                  position: "absolute",
                  left: "-0.9em",
                  fontSize: "0.6em",
                  opacity: hovered === name ? 1 : 0,
                  transform: hovered === name ? "translateX(0)" : "translateX(-8px)",
                  transition: "opacity 0.25s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                }}>→</span>
                {name}
              </span>
            </div>
          </div>
        ))}
        {/* Closing border */}
        <div style={{ borderTop: `1px solid ${borderColor}`, transition: "border-color 0.8s ease" }} />
      </div>

      {/* ── Scattered photo gallery ── */}
      <div
        style={{
          position: "relative",
          height: 520,
          marginTop: 80,
          opacity: inView ? 1 : 0,
          transition: "opacity 0.8s ease 0.3s",
        }}
      >
        {photos.map((photo, i) => {
          const pos = photoPositions[i];
          const isHov = hoveredPhoto === i;
          return (
            <div
              key={i}
              onMouseEnter={() => setHoveredPhoto(i)}
              onMouseLeave={() => setHoveredPhoto(null)}
              style={{
                position: "absolute",
                top: pos.top,
                left: `${pos.leftVw}vw`,
                width: "clamp(120px, 16vw, 230px)",
                zIndex: isHov ? 20 : photo.z,
                transform: isHov
                  ? "rotate(0deg) scale(1.06)"
                  : `rotate(${photo.rotate}deg)`,
                transition: "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), z-index 0s",
                cursor: "default",
              }}
            >
              {/* Polaroid frame */}
              <div
                style={{
                  background: "#ffffff",
                  padding: "10px 10px 36px",
                  boxShadow: isHov
                    ? "0 24px 60px rgba(0,0,0,0.22), 0 4px 12px rgba(0,0,0,0.12)"
                    : "0 8px 24px rgba(0,0,0,0.15), 0 2px 6px rgba(0,0,0,0.08)",
                  transition: "box-shadow 0.4s ease",
                }}
              >
                {/*
                  ── REPLACE with real image once files are added ──
                  <img
                    src={imgX}
                    alt="Graphic design work"
                    style={{ width:"100%", aspectRatio:"1/1", objectFit:"cover", display:"block" }}
                  />
                */}
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "1 / 1",
                    background: photo.bg,
                    display: "block",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* ── See more ── */}
      <div
        style={{
          marginTop: 56,
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s",
        }}
      >
        <a
          href="https://www.behance.net/laomenghou8e62"
          target="_blank"
          rel="noopener noreferrer"
          className="font-inter"
          style={{
            color: inView ? "#111111" : "#ffffff",
            fontSize: 14,
            fontWeight: 500,
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            borderBottom: `1px solid ${inView ? "#111111" : "rgba(255,255,255,0.3)"}`,
            paddingBottom: 4,
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.4")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          See more on Behance →
        </a>
      </div>
    </section>
  );
}
