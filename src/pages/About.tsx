import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { usePageTransition } from "@/components/PageTransition";
import profileImg from "@/assets/mh_profile.png";
import realProfileImg from "@/assets/profile-photo.png";
import profileBgSvg from "@/assets/profile-bg.svg";
import profileOverlaySvg from "@/assets/profile-overlay.svg";
import creativeColorIcon from "@/assets/creative-color.svg";
import coffeeColorIcon from "@/assets/coffee-color.svg";
import photographyColorIcon from "@/assets/photography-color.svg";
import helloSvg from "@/assets/hello.svg";
import arrowIcon from "@/assets/arrow.svg";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLenis } from "@/hooks/useLenis";
import { useGeolocationGreeting } from "@/hooks/useGeolocationGreeting";
import ExternalLink from "@/components/ExternalLink";

const experience = [
  { company: "BookMeBus",  role: "UX/UI Manager",           period: "Feb 2025 – Present",    location: "Phnom Penh, Cambodia" },
  { company: "BookMeBus",  role: "Senior Creative Designer", period: "Aug 2023 – Feb 2025",   location: "Phnom Penh, Cambodia" },
  { company: "VTENH",      role: "UX/UI Designer",           period: "Nov 2020 – Aug 2023",   location: "Phnom Penh, Cambodia" },
  { company: "BookMeBus",  role: "Junior UX/UI Designer",    period: "Jul 2019 – Nov 2020",   location: "Phnom Penh, Cambodia" },
];

const education = [
  { institution: "Royal University of Phnom Penh", degree: "Bachelor's Degree",    field: "Information Technology", period: "2014 – 2018" },
  { institution: "IT STEP Computer Academy",       degree: "Professional Design",  field: "Graphic Design",         period: "2019 – Mar 2021" },
  { institution: "Web Courses Bangkok",            degree: "Professional Course",  field: "Web Design",             period: "2019" },
];

const services = [
  "Graphic Design", "UI Design", "Branding Design", "Project Management",
  "Product Photography", "User Research", "Vibe Coding", "Motion Graphics", "Product Psychology",
];

function NavLinkButton({
  label, onClick, active, style: extraStyle,
}: {
  label: string; onClick: () => void; active?: boolean; style?: React.CSSProperties;
}) {
  const path1Ref = useRef<SVGPathElement>(null);
  const svgRef   = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !path1Ref.current) return;
    if (active) {
      gsap.set(svgRef.current, { opacity: 1 });
      gsap.set(path1Ref.current, { strokeDashoffset: 0 });
    } else {
      gsap.set(svgRef.current, { opacity: 0 });
      gsap.set(path1Ref.current, { strokeDashoffset: 157.42 });
    }
  }, [active]);

  const handleEnter = () => {
    if (active) return;
    gsap.killTweensOf([path1Ref.current, svgRef.current]);
    gsap.set(svgRef.current, { opacity: 1 });
    gsap.fromTo(path1Ref.current,
      { strokeDashoffset: 157.42 },
      { strokeDashoffset: 0, duration: 0.45, ease: "power2.out" }
    );
  };

  const handleLeave = () => {
    if (active) return;
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

const About = () => {
  const navigateTo = usePageTransition();

  const helloRef        = useRef<HTMLImageElement>(null);
  const photographyRef  = useRef<HTMLImageElement>(null);
  const creativeRef     = useRef<HTMLImageElement>(null);
  const coffeeRef       = useRef<HTMLImageElement>(null);
  const profilePhotoRef = useRef<HTMLImageElement>(null);
  const overlayRef      = useRef<HTMLImageElement>(null);
  const profileBgRef    = useRef<HTMLImageElement>(null);
  const navRef          = useRef<HTMLElement>(null);
  const eyebrowRef      = useRef<HTMLParagraphElement>(null);
  const headlineRef     = useRef<HTMLHeadingElement>(null);
  const subtextRef      = useRef<HTMLParagraphElement>(null);
  const bioRef          = useRef<HTMLParagraphElement>(null);
  const profileColRef   = useRef<HTMLDivElement>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const geo = useGeolocationGreeting();

  // ── Hero GSAP timeline ──
  useEffect(() => {
    if (!helloRef.current) return;
    gsap.set(helloRef.current, { opacity: 0, x: -8, scale: 0.88, transformOrigin: "left center" });

    gsap.set(photographyRef.current, { rotation: -15, transformOrigin: "center center" });
    gsap.set(creativeRef.current,    { rotation: 0,   transformOrigin: "center center" });
    gsap.set(coffeeRef.current,      { rotation: -20, transformOrigin: "center center" });
    gsap.set(overlayRef.current,     { rotation: -6,  transformOrigin: "center center" });
    gsap.set(profilePhotoRef.current,{ scale: 1,      transformOrigin: "center center" });
    gsap.set(profileBgRef.current,   { rotation: -8,  transformOrigin: "center center" });

    // Set hidden initial state
    gsap.set(navRef.current, { autoAlpha: 0 });
    gsap.set([eyebrowRef.current, headlineRef.current, subtextRef.current, bioRef.current], {
      y: "110%", clipPath: "inset(0 0 100% 0)",
    });
    gsap.set(profileColRef.current, { autoAlpha: 0, y: 40 });

    const tl = gsap.timeline({ delay: 0.05 });

    tl.to(navRef.current, { autoAlpha: 1, duration: 0.5, ease: "power2.out" }, 0);

    tl.to(eyebrowRef.current, {
      y: "0%", clipPath: "inset(0 0 0% 0)", duration: 0.85, ease: "power3.out",
    }, 0.08);
    tl.to(headlineRef.current, {
      y: "0%", clipPath: "inset(0 0 0% 0)", duration: 0.95, ease: "power3.out",
    }, 0.20);
    tl.to(subtextRef.current, {
      y: "0%", clipPath: "inset(0 0 0% 0)", duration: 0.85, ease: "power3.out",
    }, 0.34);
    tl.to(bioRef.current, {
      y: "0%", clipPath: "inset(0 0 0% 0)", duration: 0.85, ease: "power3.out",
    }, 0.46);
    tl.to(profileColRef.current, {
      autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out",
    }, 0.25);

    // Start idle rock after the profile column has faded in
    tl.add(() => {
      gsap.to(profileBgRef.current, {
        rotation: -4,
        duration: 3.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        transformOrigin: "center center",
      });
    }, 0.25 + 0.9);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useScrollReveal();
  useLenis();

  const navItems = [
    { label: "Work",     active: false, onClick: () => navigateTo("/") },
    { label: "About Me", active: true,  onClick: () => {} },
  ];

  return (
    <div style={{ background: "#111111", color: "#ffffff" }}>

      {/* ── Nav ── */}
      <div className="px-6 py-6 md:px-14 lg:px-[104px]" style={{ background: "#111111" }}>
        <nav
          ref={navRef}
          className="relative flex items-center justify-between py-3 md:py-4"
          style={{ visibility: "hidden" }}
          aria-label="Main navigation"
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
            <img
              src={profileImg}
              alt="Menghour"
              className="w-10 h-10 md:w-12 md:h-12"
              style={{ borderRadius: 0, cursor: "pointer" }}
              onClick={() => navigateTo("/")}
            />
            <img
              ref={helloRef}
              src={helloSvg}
              alt="hello"
              style={{
                position: "absolute", top: "10%", left: "calc(100% + 12px)",
                transform: "translateY(-50%)", width: 210, pointerEvents: "none",
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
            {navItems.map(({ label, onClick, active }) => (
              <NavLinkButton key={label} label={label} onClick={onClick} active={active} />
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

        {/* Mobile dropdown */}
        <div
          className={`md:hidden ${menuOpen ? "mobile-menu-enter" : ""}`}
          style={{ display: menuOpen ? "flex" : "none", flexDirection: "column", borderTop: "1px solid #1a1a1a", marginBottom: 8 }}
        >
          {navItems.map(({ label, onClick, active }) => (
            <NavLinkButton
              key={label}
              label={label}
              onClick={() => { setMenuOpen(false); onClick(); }}
              active={active}
              style={{ borderBottom: "1px solid #1a1a1a", fontSize: 15, padding: "14px 0", textAlign: "left", width: "100%" }}
            />
          ))}
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="px-6 md:px-14 lg:px-[104px]" style={{ paddingTop: 48, paddingBottom: 80 }}>
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: "clamp(40px, 6vw, 96px)", alignItems: "center" }}
        >
          {/* Left — text */}
          <div>
            <div className="hero-mask" style={{ marginBottom: 12 }}>
              <p ref={eyebrowRef} className="font-dm-mono" style={{ fontSize: 14, fontWeight: 500, color: "#6b7280" }}>
                Product Designer · Cambodia
              </p>
            </div>

            <div className="hero-mask" style={{ marginBottom: 24 }}>
              <h1
                ref={headlineRef}
                className="font-anton"
                style={{ fontSize: "clamp(52px, 8vw, 120px)", lineHeight: 0.92, letterSpacing: "-0.04em", color: "#ffffff" }}
              >
                Menghour<br />Lao
              </h1>
            </div>

            <div className="hero-mask" style={{ marginBottom: 32 }}>
              <p ref={subtextRef} className="font-dm-mono" style={{ fontSize: "clamp(15px, 2vw, 20px)", fontWeight: 500, color: "#6b7280" }}>
                UX/UI Manager · BookMeBus
              </p>
            </div>

            <div className="hero-mask">
              <p
                ref={bioRef}
                className="font-dm-mono"
                style={{ fontSize: 15, color: "#d1d5db", lineHeight: 1.8, maxWidth: 420 }}
              >
                7 years building digital products across Southeast Asia — from zero-to-one mobile apps to design systems serving hundreds of thousands of users. Based in Phnom Penh, Cambodia.
              </p>
            </div>
          </div>

          {/* Right — profile composition */}
          <div
            ref={profileColRef}
            style={{ display: "flex", justifyContent: "center", visibility: "hidden" }}
          >
            <div style={{ position: "relative", width: "95%", maxWidth: 440 }}>
              <img
                ref={profileBgRef}
                src={profileBgSvg}
                alt=""
                style={{ width: "100%", display: "block" }}
                onMouseEnter={() => gsap.to(profileBgRef.current, { rotation: -12, scale: 1.03, duration: 0.7, ease: "back.out(1.4)" })}
                onMouseLeave={() => gsap.to(profileBgRef.current, { rotation: -8,  scale: 1,    duration: 0.7, ease: "power3.out" })}
              />
              <img
                ref={profilePhotoRef}
                src={realProfileImg}
                alt="Menghour Lao"
                style={{
                  position: "absolute", top: "13%", left: "15%", width: "72%",
                  aspectRatio: "1/1", objectFit: "cover", objectPosition: "center top", cursor: "pointer",
                }}
                onMouseEnter={() => gsap.to(profilePhotoRef.current, { scale: 1.04, rotation: 1.5, duration: 0.6, ease: "back.out(1.4)" })}
                onMouseLeave={() => gsap.to(profilePhotoRef.current, { scale: 1,    rotation: 0,   duration: 0.6, ease: "power3.out" })}
              />
              <img
                ref={overlayRef}
                src={profileOverlaySvg}
                alt="Hello"
                style={{ position: "absolute", bottom: "3%", left: "41%", width: "44%", cursor: "pointer" }}
                onMouseEnter={() => gsap.to(overlayRef.current, { rotation: -10, scale: 1.08, duration: 0.5, ease: "back.out(1.7)" })}
                onMouseLeave={() => gsap.to(overlayRef.current, { rotation: -6,  scale: 1,    duration: 0.5, ease: "power3.out" })}
              />
              <img
                ref={photographyRef}
                src={photographyColorIcon}
                alt=""
                style={{ position: "absolute", top: "10%", left: "-4%", width: "26%", cursor: "pointer" }}
                onMouseEnter={() => gsap.to(photographyRef.current, { rotation: -28, scale: 1.15, duration: 0.5, ease: "back.out(1.7)" })}
                onMouseLeave={() => gsap.to(photographyRef.current, { rotation: -15, scale: 1,    duration: 0.5, ease: "power3.out" })}
              />
              <img
                ref={creativeRef}
                src={creativeColorIcon}
                alt=""
                style={{ position: "absolute", top: "38%", right: "-12%", width: "26%", cursor: "pointer" }}
                onMouseEnter={() => gsap.to(creativeRef.current, { rotation: 12,  scale: 1.15, duration: 0.5, ease: "back.out(1.7)" })}
                onMouseLeave={() => gsap.to(creativeRef.current, { rotation: 0,   scale: 1,    duration: 0.5, ease: "power3.out" })}
              />
              <img
                ref={coffeeRef}
                src={coffeeColorIcon}
                alt=""
                style={{ position: "absolute", bottom: "2%", left: "2%", width: "20%", cursor: "pointer" }}
                onMouseEnter={() => gsap.to(coffeeRef.current, { rotation: -34, scale: 1.15, duration: 0.5, ease: "back.out(1.7)" })}
                onMouseLeave={() => gsap.to(coffeeRef.current, { rotation: -20, scale: 1,    duration: 0.5, ease: "power3.out" })}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Experience ── */}
      <section className="px-6 md:px-14 lg:px-[104px]" style={{ paddingBottom: 72 }}>
        <p
          data-animate
          className="font-dm-mono mb-10"
          style={{ fontSize: 11, fontWeight: 700, color: "#4b5563", letterSpacing: "0.14em", textTransform: "uppercase" }}
        >
          Experience
        </p>

        <div>
          {experience.map(({ company, role, period, location }, i) => (
            <div
              key={`${company}-${role}`}
              data-animate
              style={{ "--reveal-delay": `${i * 0.07}s` } as React.CSSProperties}
            >
              <div
                style={{
                  borderTop: "1px solid #1a1a1a",
                  paddingTop: "clamp(16px, 2vw, 24px)",
                  paddingBottom: "clamp(16px, 2vw, 24px)",
                }}
              >
                <div className="flex flex-col md:flex-row md:items-baseline" style={{ gap: "6px 20px" }}>
                  <span
                    className="font-anton"
                    style={{ fontSize: "clamp(24px, 4.5vw, 64px)", lineHeight: 1.02, letterSpacing: "-0.033em", flex: 1 }}
                  >
                    {company}
                  </span>
                  <div className="font-dm-mono" style={{ fontSize: 13, color: "#6b7280", flexShrink: 0, lineHeight: 1.6 }}>
                    <span style={{ color: "#d1d5db" }}>{role}</span>
                    <span style={{ margin: "0 8px", opacity: 0.35 }}>·</span>
                    <span>{period}</span>
                    <span style={{ margin: "0 8px", opacity: 0.35 }}>·</span>
                    <span>{location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div style={{ borderTop: "1px solid #1a1a1a" }} />
        </div>
      </section>

      {/* ── Education ── */}
      <section className="px-6 md:px-14 lg:px-[104px]" style={{ paddingBottom: 72 }}>
        <p
          data-animate
          className="font-dm-mono mb-10"
          style={{ fontSize: 11, fontWeight: 700, color: "#4b5563", letterSpacing: "0.14em", textTransform: "uppercase" }}
        >
          Education
        </p>

        <div>
          {education.map(({ institution, degree, field, period }, i) => (
            <div
              key={institution}
              data-animate
              style={{ "--reveal-delay": `${i * 0.07}s` } as React.CSSProperties}
            >
              <div
                style={{
                  borderTop: "1px solid #1a1a1a",
                  paddingTop: "clamp(16px, 2vw, 24px)",
                  paddingBottom: "clamp(16px, 2vw, 24px)",
                }}
              >
                <div className="flex flex-col md:flex-row md:items-baseline" style={{ gap: "6px 20px" }}>
                  <span
                    className="font-anton"
                    style={{ fontSize: "clamp(20px, 3.5vw, 52px)", lineHeight: 1.02, letterSpacing: "-0.03em", flex: 1 }}
                  >
                    {institution}
                  </span>
                  <div className="font-dm-mono" style={{ fontSize: 13, color: "#6b7280", flexShrink: 0, lineHeight: 1.6 }}>
                    <span style={{ color: "#d1d5db" }}>{degree}</span>
                    <span style={{ margin: "0 8px", opacity: 0.35 }}>·</span>
                    <span>{field}</span>
                    <span style={{ margin: "0 8px", opacity: 0.35 }}>·</span>
                    <span>{period}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div style={{ borderTop: "1px solid #1a1a1a" }} />
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer-dark" style={{ background: "#111111" }}>

        <div
          className="grid grid-cols-1 md:grid-cols-3 px-6 md:px-14 lg:px-[104px]"
          style={{ paddingTop: 48, paddingBottom: 48, gap: 40 }}
        >
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

          <div data-animate style={{ "--reveal-delay": "0.2s" } as React.CSSProperties}>
            <div style={{ borderTop: "1px solid #2b2b2b", paddingTop: 20, marginBottom: 20 }}>
              <h2 className="font-dm-mono" style={{ fontSize: 11, fontWeight: 700, color: "#4b5563", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                Bio
              </h2>
            </div>
            <div className="font-dm-mono" style={{ display: "flex", flexDirection: "column", gap: 14, fontSize: 14, color: "#d1d5db", lineHeight: 1.75 }}>
              <p>I'm a product designer and creative director from Phnom Penh, Cambodia. I work with startups and growth-stage companies to build digital products that are both beautiful and scalable.</p>
              <p>Over 7 years, I've shipped products across Southeast Asia — from zero-to-one mobile apps to design systems serving hundreds of thousands of users.</p>
            </div>
          </div>
        </div>

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

export default About;
