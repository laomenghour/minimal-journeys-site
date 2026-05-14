import { useRef, useEffect, useState } from "react";
import ExternalLink from "@/components/ExternalLink";
import profileImg from "@/assets/mh_profile.png";
import coffeeDesign from "@/assets/coffee-design.svg";
import coffeeWriting from "@/assets/coffee-writing.svg";
import photographyIcon from "@/assets/photography.svg";
import creativeColor from "@/assets/creative-color.svg";
import coffeeColor from "@/assets/coffee-color.svg";
import photographyColor from "@/assets/photography-color.svg";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLenis } from "@/hooks/useLenis";
import { useGeolocationGreeting } from "@/hooks/useGeolocationGreeting";

const designProjects = [
  { name: "BookMe+", tag: "Present" },
  { name: "Hang Meas Mobile" },
  { name: "VET Airbus" },
  { name: "VDEUK" },
  { name: "VTENH" },
  { name: "GTVC Speedboat" },
  { name: "BookMeBus" },
];

const services = [
  "Graphic Design",
  "UI Design",
  "Branding Design",
  "Project Management",
  "Product Photography",
  "User Research",
  "Vibe Coding",
  "Motion Graphics",
  "Product Psychology",
];

const Index = () => {
  const designRef    = useRef<HTMLElement>(null);
  const projectsRef  = useRef<HTMLDivElement>(null);
  const footerRef    = useRef<HTMLElement>(null);
  const [inView, setInView]               = useState(false);
  const [projectsVisible, setProjectsVisible] = useState(false);
  const [hovered, setHovered]             = useState<string | null>(null);
  const geo = useGeolocationGreeting();

  // Background colour transition (black → white)
  useEffect(() => {
    const el = designRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Project list reveal — fires once, never resets
  useEffect(() => {
    const el = projectsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setProjectsVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useScrollReveal();
  useLenis();

  return (
    <div className="flex flex-col" style={{ borderRadius: 0 }}>

      {/* ── Hero — Ink Black ── */}
      <div
        className="min-h-screen flex flex-col px-6 py-6 md:px-14 md:py-6 lg:px-[104px]"
        style={{ background: "#111111", color: "#ffffff", position: "relative" }}
      >
        <nav className="hero-nav flex items-center py-4" aria-label="Main navigation" style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center" }}>
          {/* Left — logo */}
          <img src={profileImg} alt="Menghour" className="w-12 h-12" style={{ borderRadius: 0 }} />

          {/* Centre — nav links */}
          <div style={{ display: "flex", gap: 32 }}>
            {[
              { label: "Work",     ref: designRef },
              { label: "About Me", ref: footerRef },
            ].map(({ label, ref }) => (
              <button
                key={label}
                onClick={() => {
                  const top = (ref.current?.getBoundingClientRect().top ?? 0) + window.scrollY;
                  window.scrollTo({ top, behavior: "smooth" });
                }}
                className="font-dm-mono link-underline"
                style={{
                  background: "none",
                  border: "none",
                  color: "#ffffff",
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: "pointer",
                  padding: 0,
                  letterSpacing: "normal",
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Right — geolocation greeting */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <p
              className="font-dm-mono"
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: "#ffffff",
                opacity: geo.loading ? 0 : 1,
                transition: "opacity 0.4s ease",
              }}
            >
              {geo.greeting}, Welcome to my portfolio
            </p>
          </div>
        </nav>

        <main className="flex flex-1 flex-col justify-center" style={{ paddingTop: 56, paddingBottom: 56 }}>
          {/* Eyebrow — clips up */}
          <div className="hero-mask" style={{ marginBottom: 24 }}>
            <p className="hero-item delay-1 font-dm-mono" style={{ fontSize: 16, fontWeight: 500, color: "#6b7280" }}>
              Product Designer · Cambodia
            </p>
          </div>

          {/* Headline — clips up */}
          <div className="hero-mask">
            <h1
              className="hero-item delay-2 font-anton"
              style={{ fontSize: "clamp(64px, 10.5vw, 180px)", lineHeight: 0.95, letterSpacing: "-0.04em", color: "#ffffff" }}
            >
              7 Years of Turning Ideas into Startup Products
            </h1>
          </div>

          {/* Subtext — clips up */}
          <div className="hero-mask" style={{ marginTop: 24 }}>
            <p className="hero-item delay-3 font-dm-mono" style={{ fontSize: 26, fontWeight: 500, color: "#6b7280", lineHeight: 1.15 }}>
              From Cambodia to the world.
            </p>
          </div>
        </main>

        {/* Icon badges — absolute bottom-right, matching reference */}
        <div
          className="hero-item delay-4"
          style={{ position: "absolute", bottom: 48, right: 104, display: "flex", gap: 28 }}
        >
          {[
            { outline: coffeeDesign,    color: creativeColor,    label: "Design",      size: 96,  offset: 20, tip: "Creativity Keeps Me Going"  },
            { outline: photographyIcon, color: photographyColor, label: "Photography", size: 115, offset: -8, tip: "Capturing Moments I Love"    },
            { outline: coffeeWriting,   color: coffeeColor,      label: "Writing",     size: 96,  offset: 10, tip: "Coffee Before Everything"    },
          ].map(({ outline, color, label, size, offset, tip }) => (
            <div key={label} style={{ transform: `translateY(${offset}px)` }}>
            <div className="icon-wrap" style={{ position: "relative", width: size, height: size }}>
              <img
                src={outline}
                alt={label}
                style={{
                  width: size, height: size, objectFit: "contain",
                  position: "absolute", inset: 0,
                  transition: "opacity 0.25s ease",
                }}
                className="icon-outline"
              />
              <img
                src={color}
                alt=""
                style={{
                  width: size, height: size, objectFit: "contain",
                  position: "absolute", inset: 0,
                  opacity: 0,
                  transition: "opacity 0.25s ease",
                }}
                className="icon-color"
              />
              <span className="icon-tip">{tip}</span>
            </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── UX/UI Design — Canvas White (scroll reveal) ── */}
      <section
        ref={designRef}
        className="min-h-screen flex flex-col px-6 py-6 md:px-14 lg:px-[104px]"
        style={{
          backgroundColor: inView ? "#ffffff" : "#111111",
          color: inView ? "#000000" : "#ffffff",
          transition: "background-color 0.8s ease, color 0.8s ease",
          paddingTop: 56,
          paddingBottom: 56,
        }}
      >
        <p
          data-animate
          className="font-dm-mono mb-14"
          style={{ fontSize: 26, fontWeight: 500, color: inView ? "#111111" : "#4b5563", transition: "color 0.8s ease" }}
        >
          UX/UI Design
        </p>

        <div ref={projectsRef} className="flex flex-col" onMouseLeave={() => setHovered(null)}>
          {designProjects.map(({ name, tag }, i) => (
            <div
              key={name}
              onMouseEnter={() => setHovered(name)}
              style={{
                borderTop: `1px solid ${inView ? "#e5e7eb" : "#1a1a1a"}`,
                transition: "border-color 0.8s ease",
                cursor: "default",
                overflow: "hidden",        // clip mask lives here
              }}
            >
              {/* This div is what clips up — transform moves it, parent clips it */}
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
                  }}>
                    →
                  </span>
                  {name}
                  {tag && (
                    <span className="font-dm-mono" style={{ fontSize: 14, fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase", color: inView ? "#6b7280" : "#4b5563", transition: "color 0.8s ease" }}>
                      {tag}
                    </span>
                  )}
                </span>
              </div>
            </div>
          ))}
          <div style={{ borderTop: `1px solid ${inView ? "#e5e7eb" : "#1a1a1a"}`, transition: "border-color 0.8s ease" }} />
        </div>
      </section>

{/* ── Footer — Enhanced ── */}
      <footer ref={footerRef} className="footer-dark" style={{ background: "#111111", borderTop: "1px solid #1a1a1a" }}>

        {/* 3-column grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 px-6 md:px-14 lg:px-[104px]"
          style={{ paddingTop: 56, paddingBottom: 56, gap: 48 }}
        >
          {/* Services */}
          <div data-animate style={{ "--reveal-delay": "0s" } as React.CSSProperties}>
            <div style={{ borderTop: "1px solid #2b2b2b", paddingTop: 20, marginBottom: 24 }}>
              <h2 className="font-dm-mono" style={{ fontSize: 11, fontWeight: 700, color: "#4b5563", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                Skills
              </h2>
            </div>
            <ul className="font-dm-mono" style={{ display: "flex", flexDirection: "column", gap: 7, fontSize: 14, color: "#d1d5db", listStyle: "none", padding: 0, margin: 0, lineHeight: 1.5 }}>
              {services.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </div>

          {/* Social Media */}
          <div data-animate style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}>
            <div style={{ borderTop: "1px solid #2b2b2b", paddingTop: 20, marginBottom: 24 }}>
              <h2 className="font-dm-mono" style={{ fontSize: 11, fontWeight: 700, color: "#4b5563", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                Social Media
              </h2>
            </div>
            <ul className="font-dm-mono" style={{ display: "flex", flexDirection: "column", gap: 7, fontSize: 14, listStyle: "none", padding: 0, margin: 0, lineHeight: 1.5 }}>
              <li><ExternalLink href="https://www.instagram.com/photo.bymenghour/">Instagram</ExternalLink></li>
              <li><ExternalLink href="https://www.linkedin.com/in/menghour-lao/">LinkedIn</ExternalLink></li>
              <li><ExternalLink href="https://medium.com/@menghour_lao">Medium</ExternalLink></li>
              <li><ExternalLink href="https://www.behance.net/laomenghou8e62">Behance</ExternalLink></li>
            </ul>
          </div>

          {/* Bio */}
          <div data-animate style={{ "--reveal-delay": "0.2s" } as React.CSSProperties}>
            <div style={{ borderTop: "1px solid #2b2b2b", paddingTop: 20, marginBottom: 24 }}>
              <h2 className="font-dm-mono" style={{ fontSize: 11, fontWeight: 700, color: "#4b5563", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                Bio
              </h2>
            </div>
            <div className="font-dm-mono" style={{ display: "flex", flexDirection: "column", gap: 16, fontSize: 14, color: "#d1d5db", lineHeight: 1.75 }}>
              <p>I'm a product designer from Cambodia delivering best-in-class digital experiences for startups and growth-stage companies.</p>
              <p>Over 7 years, I've helped companies across Southeast Asia turn ambitious ideas into elegant, considered digital products — from zero-to-one apps to scaled design systems.</p>
              <p>When I'm not designing, I'm out capturing streets with my camera or writing stories. I love the craft of visual storytelling in all its forms.</p>
            </div>
          </div>
        </div>

        {/* Large email CTA */}
        <div
          data-animate
          className="px-6 md:px-14 lg:px-[104px]"
          style={{ paddingBottom: 48, "--reveal-delay": "0.15s" } as React.CSSProperties}
        >
          <a
            href="mailto:laomenghour@gmail.com"
            className="font-anton"
            style={{
              fontSize: "clamp(32px, 6.5vw, 110px)",
              lineHeight: 1,
              letterSpacing: "-0.03em",
              color: "#ffffff",
              textDecoration: "none",
              display: "block",
              transition: "opacity 0.25s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.5")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            laomenghour@gmail.com
          </a>
        </div>

        {/* Bottom bar */}
        <div
          className="px-6 md:px-14 lg:px-[104px] font-dm-mono"
          style={{
            borderTop: "1px solid #1a1a1a",
            paddingTop: 20,
            paddingBottom: 20,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 13,
            color: "#6b7280",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span>Working from Phnom Penh, Cambodia</span>
          <span>© 2026</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
