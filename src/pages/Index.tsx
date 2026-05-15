import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { usePageTransition } from "@/components/PageTransition";
import ExternalLink from "@/components/ExternalLink";
import profileImg from "@/assets/mh_profile.png";
import helloSvg from "@/assets/hello.svg";
import coffeeDesign from "@/assets/coffee-design.svg";
import coffeeWriting from "@/assets/coffee-writing.svg";
import photographyIcon from "@/assets/photography.svg";
import creativeColor from "@/assets/creative-color.svg";
import coffeeColor from "@/assets/coffee-color.svg";
import arrowIcon from "@/assets/arrow.svg";
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

const iconItems = [
  { outline: coffeeDesign,    color: creativeColor,    label: "Design",      size: 96,  mobileSize: 68, offset: 20,  mobileOffset: 14, tip: "Creativity Keeps Me Going", tipColor: "#ea5959" },
  { outline: photographyIcon, color: photographyColor, label: "Photography", size: 115, mobileSize: 80, offset: -8,  mobileOffset: -6, tip: "Capturing Moments I Love",   tipColor: "#3883ce" },
  { outline: coffeeWriting,   color: coffeeColor,      label: "Writing",     size: 96,  mobileSize: 68, offset: 10,  mobileOffset: 8,  tip: "Coffee Before Everything",  tipColor: "#f5be47" },
];

function NavLinkButton({ label, onClick, style: extraStyle }: { label: string; onClick: () => void; style?: React.CSSProperties }) {
  const path1Ref = useRef<SVGPathElement>(null);
  const svgRef   = useRef<SVGSVGElement>(null);

  const handleEnter = () => {
    gsap.killTweensOf([path1Ref.current, svgRef.current]);
    gsap.set(svgRef.current, { opacity: 1 });
    gsap.fromTo(path1Ref.current,
      { strokeDashoffset: 157.42 },
      { strokeDashoffset: 0, duration: 0.45, ease: "power2.out" }
    );
  };

  const handleLeave = () => {
    gsap.killTweensOf([path1Ref.current, svgRef.current]);
    gsap.to(path1Ref.current, { strokeDashoffset: 157.42, duration: 0.3, ease: "power2.in" });
    gsap.to(svgRef.current, { opacity: 0, duration: 0.1, delay: 0.3 });
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="font-dm-mono"
      style={{
        background: "none", border: "none", color: "#ffffff", fontSize: 14,
        fontWeight: 500, cursor: "pointer", padding: 0, letterSpacing: "normal",
        position: "relative", lineHeight: 1, ...extraStyle,
      }}
    >
      {label}
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 159 17"
        fill="none"
        style={{
          position: "absolute", left: "50%", top: "calc(100% + 2px)",
          transform: "translateX(-50%)", width: "120%", color: "#ffffff",
          pointerEvents: "none", opacity: 0,
        }}
      >
        <path
          ref={path1Ref}
          d="M1 12.1515C53.0771 5.7187 105.529 2.30552 158 1.93652"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round"
          strokeLinejoin="round" strokeDasharray="157.42 157.42" strokeDashoffset="157.42"
        />
      </svg>
    </button>
  );
}

const Index = () => {
  const designRef    = useRef<HTMLElement>(null);
  const projectsRef  = useRef<HTMLDivElement>(null);
  const footerRef    = useRef<HTMLElement>(null);
  const helloRef     = useRef<HTMLImageElement>(null);
  const navRef       = useRef<HTMLElement>(null);
  const eyebrowRef   = useRef<HTMLParagraphElement>(null);
  const headlineRef  = useRef<HTMLHeadingElement>(null);
  const subtextRef   = useRef<HTMLParagraphElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null); // wraps the whole hero to query all icons

  const [inView, setInView]                   = useState(false);
  const [projectsVisible, setProjectsVisible] = useState(false);
  const [hovered, setHovered]                 = useState<string | null>(null);
  const [menuOpen, setMenuOpen]               = useState(false);
  const geo = useGeolocationGreeting();
  const navigateTo = usePageTransition();

  // ── Hero GSAP timeline (fires after circle-reveal) ──
  useEffect(() => {
    const CIRCLE_END = 0.15 + 1.4; // delay + duration from App.tsx

    // Set initial hidden states
    gsap.set(navRef.current, { autoAlpha: 0 });
    gsap.set([eyebrowRef.current, headlineRef.current, subtextRef.current], {
      y: "110%",
      clipPath: "inset(0 0 100% 0)",
    });
    if (helloRef.current) {
      gsap.set(helloRef.current, { opacity: 0, x: -8, scale: 0.88, transformOrigin: "left center" });
    }

    const tl = gsap.timeline({ delay: CIRCLE_END });

    // Nav fades in
    tl.to(navRef.current, { autoAlpha: 1, duration: 0.55, ease: "power2.out" }, 0);

    // Hero text clips up — staggered
    tl.to(eyebrowRef.current, {
      y: "0%", clipPath: "inset(0 0 0% 0)", duration: 0.9, ease: "power3.out",
    }, 0.05);
    tl.to(headlineRef.current, {
      y: "0%", clipPath: "inset(0 0 0% 0)", duration: 1.0, ease: "power3.out",
    }, 0.18);
    tl.to(subtextRef.current, {
      y: "0%", clipPath: "inset(0 0 0% 0)", duration: 0.9, ease: "power3.out",
    }, 0.36);

    // Icons fade in — targets both mobile and desktop icon-animate divs
    const allIcons = heroSectionRef.current
      ? heroSectionRef.current.querySelectorAll(".icon-animate")
      : [];
    gsap.set(allIcons, { opacity: 0 });
    tl.to(allIcons, {
      opacity: 1, duration: 0.65, stagger: 0.12, ease: "power2.out",
    }, 0.5);
  }, []);

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

  // Project list reveal
  useEffect(() => {
    const el = projectsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setProjectsVisible(true); obs.disconnect(); }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useScrollReveal();
  useLenis();

  const links = [
    { label: "Work",     ref: designRef as React.RefObject<HTMLElement | null>, path: undefined as string | undefined },
    { label: "About Me", ref: undefined  as React.RefObject<HTMLElement | null> | undefined, path: "/about" },
  ];

  return (
    <div className="flex flex-col" style={{ borderRadius: 0 }}>

      {/* ── Hero — Ink Black ── */}
      <div
        ref={heroSectionRef}
        className="min-h-screen flex flex-col px-6 py-6 md:px-14 md:py-6 lg:px-[104px]"
        style={{ background: "#111111", color: "#ffffff", position: "relative" }}
      >

        {/* ── Nav ── */}
        <nav
          ref={navRef}
          className="hero-nav relative flex items-center justify-between py-3 md:py-4"
          aria-label="Main navigation"
          style={{ visibility: "hidden" }}
        >
          {/* Left — logo */}
          <div
            className="relative"
            style={{ width: "fit-content" }}
            onMouseEnter={() => {
              gsap.killTweensOf(helloRef.current);
              gsap.to(helloRef.current, { opacity: 1, x: 0, scale: 1, duration: 0.35, ease: "back.out(1.6)" });
            }}
            onMouseLeave={() => {
              gsap.killTweensOf(helloRef.current);
              gsap.to(helloRef.current, { opacity: 0, x: -8, scale: 0.88, duration: 0.22, ease: "power2.in" });
            }}
          >
            <img src={profileImg} alt="Menghour" className="w-10 h-10 md:w-12 md:h-12" style={{ borderRadius: 0 }} />
            <img
              ref={helloRef}
              src={helloSvg}
              alt="hello"
              style={{
                position: "absolute", top: "10%", left: "calc(100% + 12px)",
                transform: "translateY(-50%)", width: 210, pointerEvents: "none", opacity: 0,
              }}
            />
          </div>

          {/* Mobile centre — greeting */}
          <p
            className="md:hidden absolute left-1/2 -translate-x-1/2 font-dm-mono"
            style={{
              fontSize: 12, fontWeight: 500, color: "#ffffff", whiteSpace: "nowrap",
              maxWidth: "58vw", overflow: "hidden", textOverflow: "ellipsis",
              opacity: geo.loading ? 0 : 1, transition: "opacity 0.4s ease",
            }}
          >
            <span className="font-google-sans">{geo.greeting}</span>, Welcome to my portfolio
          </p>

          {/* Desktop centre — nav links */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center" style={{ gap: 28 }}>
            {links.map(({ label, ref, path }) => (
              <NavLinkButton
                key={label}
                label={label}
                onClick={() => {
                  if (path) { navigateTo(path); return; }
                  const top = (ref?.current?.getBoundingClientRect().top ?? 0) + window.scrollY;
                  window.scrollTo({ top, behavior: "smooth" });
                }}
              />
            ))}
          </div>

          {/* Mobile right — hamburger */}
          <button
            className="md:hidden flex items-center justify-center"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            style={{ background: "none", border: "none", color: "#ffffff", padding: 4, cursor: "pointer" }}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              {menuOpen ? (
                <>
                  <line x1="5" y1="5" x2="17" y2="17" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="17" y1="5" x2="5" y2="17" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6"  x2="19" y2="6"  stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="3" y1="11" x2="19" y2="11" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="3" y1="16" x2="19" y2="16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>

          {/* Desktop right — greeting */}
          <p
            className="hidden md:block font-dm-mono"
            style={{
              fontSize: 14, fontWeight: 500, color: "#ffffff",
              opacity: geo.loading ? 0 : 1, transition: "opacity 0.4s ease",
            }}
          >
            <span className="font-google-sans">{geo.greeting}</span>, Welcome to my portfolio
          </p>
        </nav>

        {/* ── Mobile dropdown menu ── */}
        <div
          className={`md:hidden ${menuOpen ? "mobile-menu-enter" : ""}`}
          style={{ display: menuOpen ? "flex" : "none", flexDirection: "column", borderTop: "1px solid #1a1a1a", marginBottom: 8 }}
        >
          {links.map(({ label, ref, path }) => (
            <NavLinkButton
              key={label}
              label={label}
              onClick={() => {
                setMenuOpen(false);
                if (path) { setTimeout(() => navigateTo(path), 80); return; }
                setTimeout(() => {
                  const top = (ref?.current?.getBoundingClientRect().top ?? 0) + window.scrollY;
                  window.scrollTo({ top, behavior: "smooth" });
                }, 80);
              }}
              style={{ borderBottom: "1px solid #1a1a1a", fontSize: 15, padding: "14px 0", textAlign: "left", width: "100%" }}
            />
          ))}
        </div>

        {/* ── Hero main content ── */}
        <main className="flex flex-1 flex-col justify-center py-8 md:py-14">
          {/* Eyebrow */}
          <div className="hero-mask" style={{ marginBottom: 16 }}>
            <p ref={eyebrowRef} className="font-dm-mono" style={{ fontSize: 15, fontWeight: 500, color: "#6b7280" }}>
              Product Designer · Cambodia
            </p>
          </div>

          {/* Headline */}
          <div className="hero-mask">
            <h1
              ref={headlineRef}
              className="font-anton"
              style={{ fontSize: "clamp(54px, 10.5vw, 180px)", lineHeight: 0.95, letterSpacing: "-0.04em", color: "#ffffff" }}
            >
              7 Years of Turning Ideas into Startup Products
            </h1>
          </div>

          {/* Subtext */}
          <div className="hero-mask" style={{ marginTop: 18 }}>
            <p ref={subtextRef} className="font-dm-mono" style={{ fontSize: "clamp(18px, 3.5vw, 26px)", fontWeight: 500, color: "#6b7280", lineHeight: 1.15 }}>
              From Cambodia to the world.
            </p>
          </div>

          {/* Mobile icons */}
          <div className="flex md:hidden items-end" style={{ gap: 16, marginTop: 32 }}>
            {iconItems.map(({ outline, color, label, mobileSize: size, mobileOffset: offset, tip, tipColor }) => (
              <div key={`m-${label}`} className="icon-animate" style={{ transform: `translateY(${offset}px)` }}>
                <div className="icon-wrap" style={{ position: "relative", width: size, height: size }}>
                  <img src={outline} alt={label} style={{ width: size, height: size, objectFit: "contain", position: "absolute", inset: 0 }} className="icon-outline" />
                  <img src={color} alt="" style={{ width: size, height: size, objectFit: "contain", position: "absolute", inset: 0, opacity: 0 }} className="icon-color" />
                  <span className="icon-tip" style={{ background: tipColor, color: "#ffffff" }}>{tip}</span>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Desktop icon badges */}
        <div className="hero-icons" style={{ animationDelay: "0s" }}>
          {iconItems.map(({ outline, color, label, size, offset, tip, tipColor }) => (
            <div key={label} className="icon-animate" style={{ transform: `translateY(${offset}px)` }}>
              <div className="icon-wrap" style={{ position: "relative", width: size, height: size }}>
                <img src={outline} alt={label} style={{ width: size, height: size, objectFit: "contain", position: "absolute", inset: 0 }} className="icon-outline" />
                <img src={color} alt="" style={{ width: size, height: size, objectFit: "contain", position: "absolute", inset: 0, opacity: 0 }} className="icon-color" />
                <span className="icon-tip" style={{ background: tipColor, color: "#ffffff" }}>{tip}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── UX/UI Design — Canvas White ── */}
      <section
        ref={designRef}
        className="lg:min-h-screen flex flex-col px-6 md:px-14 lg:px-[104px]"
        style={{
          backgroundColor: inView ? "#ffffff" : "#111111",
          color: inView ? "#000000" : "#ffffff",
          transition: "background-color 0.8s ease, color 0.8s ease",
          paddingTop: 48,
          paddingBottom: 48,
        }}
      >
        <p
          data-animate
          className="font-dm-mono mb-8 md:mb-14"
          style={{ fontSize: "clamp(15px, 3.5vw, 26px)", fontWeight: 500, color: inView ? "#111111" : "#4b5563", transition: "color 0.8s ease" }}
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
                    fontSize: "clamp(28px, 6.5vw, 86px)", lineHeight: 1.05,
                    letterSpacing: "-0.033em", paddingTop: 10, paddingBottom: 10,
                    display: "flex", alignItems: "baseline", gap: 12,
                    position: "relative",
                    opacity: hovered && hovered !== name ? 0.25 : 1,
                    transition: "opacity 0.3s ease",
                  }}
                >
                  <span style={{
                    position: "absolute", left: "-0.9em", fontSize: "0.6em",
                    opacity: hovered === name ? 1 : 0,
                    transform: hovered === name ? "translateX(0)" : "translateX(-8px)",
                    transition: "opacity 0.25s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}>
                    →
                  </span>
                  {name}
                  {tag && (
                    <span className="font-dm-mono" style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase", color: inView ? "#6b7280" : "#4b5563", transition: "color 0.8s ease" }}>
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

      {/* ── Footer ── */}
      <footer ref={footerRef} className="footer-dark" style={{ background: "#111111" }}>

        <div
          className="grid grid-cols-1 md:grid-cols-3 px-6 md:px-14 lg:px-[104px]"
          style={{ paddingTop: 48, paddingBottom: 48, gap: 40 }}
        >
          {/* Skills */}
          <div data-animate style={{ "--reveal-delay": "0s" } as React.CSSProperties}>
            <div style={{ borderTop: "1px solid #2b2b2b", paddingTop: 20, marginBottom: 20 }}>
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
            <div style={{ borderTop: "1px solid #2b2b2b", paddingTop: 20, marginBottom: 20 }}>
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
            <div style={{ borderTop: "1px solid #2b2b2b", paddingTop: 20, marginBottom: 20 }}>
              <h2 className="font-dm-mono" style={{ fontSize: 11, fontWeight: 700, color: "#4b5563", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                Bio
              </h2>
            </div>
            <div className="font-dm-mono" style={{ display: "flex", flexDirection: "column", gap: 14, fontSize: 14, color: "#d1d5db", lineHeight: 1.75 }}>
              <p>I'm a product designer and creative director from Phnom Penh, Cambodia. I work with startups and growth-stage companies to build digital products that are both beautiful and scalable.</p>
              <p>Over 7 years, I've shipped products across Southeast Asia — from zero-to-one mobile apps to design systems serving hundreds of thousands of users. My work spans UI/UX, branding, and creative direction.</p>
              <p>Outside of design, I'm a street photographer documenting life on the streets of Phnom Penh, and a writer exploring visual storytelling on Medium.</p>
            </div>
          </div>
        </div>

        {/* Large email CTA */}
        <div
          data-animate
          className="px-6 md:px-14 lg:px-[104px]"
          style={{ paddingBottom: 40, "--reveal-delay": "0.15s" } as React.CSSProperties}
        >
          <a
            href="mailto:laomenghour@gmail.com"
            className="font-anton"
            style={{
              fontSize: "clamp(28px, 6.5vw, 110px)", lineHeight: 1, letterSpacing: "-0.03em",
              color: "#ffffff", textDecoration: "none", display: "flex",
              alignItems: "flex-end", gap: "0.2em", transition: "opacity 0.25s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.5")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <span style={{ wordBreak: "break-all" }}>laomenghour@gmail.com</span>
            <img src={arrowIcon} alt="" style={{ height: "0.72em", width: "auto", flexShrink: 0, marginBottom: "0.05em" }} />
          </a>
        </div>

        {/* Bottom bar */}
        <div
          className="px-6 md:px-14 lg:px-[104px] font-dm-mono"
          style={{
            borderTop: "1px solid #1a1a1a", paddingTop: 20, paddingBottom: 20,
            display: "flex", justifyContent: "space-between", alignItems: "center",
            fontSize: 13, color: "#6b7280", flexWrap: "wrap", gap: 12,
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
