import { useRef, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { usePageTransition } from "@/components/PageTransition";
import profileImg from "@/assets/mh_profile.png";
import arrowIcon from "@/assets/arrow.svg";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useTextReveal } from "@/hooks/useTextReveal";
import { useLenis } from "@/hooks/useLenis";

/* ─────────────────────────────────────────────────────────────
   CASE STUDY CONTENT

   Everything on this page reads from the objects below, so the
   copy can be edited without touching the layout.

   The role titles, dates and location are taken from the
   Experience list on the About page. The narrative copy is a
   DRAFT written from what the site already says — rewrite it in
   your own words before this goes public.

   Deliberately left blank for you to fill in, because inventing
   them would put false claims on your portfolio:
     · `metrics` below — real numbers, or delete the section
     · the gallery frames — swap each <Frame> for a real <img>
   ───────────────────────────────────────────────────────────── */

const project = {
  name: "BookMeBus",
  // The large line in the right column of the hero
  statement: "Every seat in Cambodia, one booking away.",
  intro:
    "A travel booking platform for Cambodia, covering bus, ferry and private taxi routes across the country. I have worked on the product since 2019, moving from designing individual screens to owning the design function.",
};

// Two label/value tables sitting side by side at the foot of the hero
const metaTables = [
  [
    { label: "Client",   value: "BookMeBus" },
    { label: "Year",     value: "2019 — Present" },
    { label: "Industry", value: "Travel / Ticketing" },
  ],
  [
    { label: "Role",     value: "UX/UI Manager" },
    { label: "Platform", value: "iOS, Android, Web" },
  ],
];

const sections = [
  {
    heading: "The problem",
    body: [
      "Booking intercity travel in Cambodia has traditionally meant calling an operator, messaging on Telegram, or turning up at the station and hoping for a seat. Schedules live with the operators, not with the traveller.",
      "The product had to work for two very different groups at once: travellers who wanted a seat in under a minute, and bus operators who needed to manage routes, pricing and seat inventory day to day.",
    ],
  },
  {
    heading: "What I did",
    body: [
      "Owned the end-to-end booking flow across iOS, Android and web — search, seat selection, passenger details, payment and ticket.",
      "Built and maintained the design system so the same components, type scale and spacing hold across every surface and every release.",
      "Worked directly with engineering on handoff, states and edge cases, rather than throwing static screens over the wall.",
      "Grew the design function from a single designer executing screens into a team with a shared process.",
    ],
  },
  {
    heading: "How I approached it",
    body: [
      "Start from the real constraint. Most travellers are on mid-range Android phones on mobile data, often booking the day before travel. Every decision about image weight, step count and form length came back to that.",
      "Design the unhappy path first. A sold-out bus, a failed payment, a cancelled route — these are the moments that lose trust, so they get designed properly rather than left as an afterthought.",
    ],
  },
];

/* Real numbers only. Fill these in or delete the section — see the
   note at the top of this file. */
const metrics: { value: string; label: string }[] = [];

// Frames sit two per row, so each pair shares a ratio — mixing a landscape
// with a portrait leaves one of them floating in a half-empty row.
const gallery = [
  { tone: "#3883ce", ratio: "4 / 3",  caption: "Booking flow — search to ticket" },
  { tone: "#ea5959", ratio: "4 / 3",  caption: "Seat selection" },
  { tone: "#f5be47", ratio: "16 / 9", caption: "Operator dashboard" },
  { tone: "#1a1a1a", ratio: "16 / 9", caption: "Design system components" },
];

/** Stand-in for a screenshot. Swap the whole component for an <img>. */
function Frame({ tone, ratio, caption }: { tone: string; ratio: string; caption: string }) {
  return (
    <figure data-animate style={{ margin: 0 }}>
      <div
        style={{
          width: "100%",
          aspectRatio: ratio,
          background: tone,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          className="font-dm-mono"
          style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)" }}
        >
          Add image
        </span>
      </div>
      <figcaption
        className="font-dm-mono"
        style={{ fontSize: 12, color: "#6b7280", marginTop: 12 }}
      >
        {caption}
      </figcaption>
    </figure>
  );
}

const BookMeBus = () => {
  const navigateTo = usePageTransition();
  const navRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // A fresh route mounts at whatever scroll offset the last page had.
  // Runs before useLenis' effect, so Lenis initialises at the top.
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ── Entry animation — mirrors the hero timing on the other pages ──
  useEffect(() => {
    gsap.set(navRef.current, { autoAlpha: 0 });
    gsap.set(titleRef.current, { y: "110%", clipPath: "inset(0 0 100% 0)" });

    const tl = gsap.timeline({ delay: 0.58 });
    tl.to(navRef.current, { autoAlpha: 1, duration: 0.55, ease: "power2.out" }, 0);
    tl.to(titleRef.current, {
      y: "0%", clipPath: "inset(0 0 0% 0)", duration: 0.9, ease: "power3.out",
    }, 0.05);

    return () => { tl.kill(); };
  }, []);

  useScrollReveal();
  useTextReveal();
  useLenis();

  return (
    <div style={{ background: "#111111", color: "#ffffff" }}>

      {/* ── Nav — logo out, one way back ── */}
      <nav
        ref={navRef}
        className="px-6 py-6 md:px-14 lg:px-24 flex items-center justify-between"
        aria-label="Main navigation"
        style={{ visibility: "hidden" }}
      >
        <a href="/" aria-label="Home" onClick={(e) => { e.preventDefault(); navigateTo("/"); }}>
          <img
            src={profileImg}
            alt="Menghour"
            data-nav-profile
            className="w-10 h-10 md:w-12 md:h-12"
            style={{ borderRadius: 0, display: "block", cursor: "pointer" }}
          />
        </a>
        <a
          href="/"
          onClick={(e) => { e.preventDefault(); navigateTo("/"); }}
          className="font-dm-mono link-underline"
          style={{ color: "#ffffff", textDecoration: "none" }}
        >
          ← Back to work
        </a>
      </nav>

      {/* ── Hero — sized to its content, not to the viewport ── */}
      <header
        className="px-6 md:px-14 lg:px-24"
        style={{
          paddingTop: "clamp(32px, 5vw, 72px)",
          paddingBottom: "clamp(56px, 7vw, 96px)",
        }}
      >
        {/* Four cells in DOM order: title, statement, meta, summary. Auto-
            placement lays them out as a 2×2 — title/statement across the top,
            meta/summary across the bottom. Both rows are auto-height, so the
            gap between the statement and the summary below it is exactly the
            rowGap; an earlier 1fr top row stretched the hero to fill the
            screen and dumped all that slack between them. Stacked on a phone
            the same order reads title → statement → meta → summary. */}
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ columnGap: "clamp(40px, 6vw, 96px)", rowGap: "clamp(40px, 5vw, 64px)" }}
        >
          {/* 1 · Title */}
          <div>
            <p className="font-dm-mono" style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 20 }}>
              Case study
            </p>
            <div className="hero-mask">
              <h1
                ref={titleRef}
                className="font-anton"
                style={{ fontSize: "clamp(48px, 8vw, 128px)", lineHeight: 0.95, letterSpacing: "-0.04em" }}
              >
                {project.name}
              </h1>
            </div>
          </div>

          {/* 2 · Statement. The vw term is capped at 4.1 so "Every seat in
                 Cambodia," still fits on one line at 1024px — the tightest
                 point, where the lg gutter jumps 56→96px and narrows this
                 column to 385px while the type is still scaling. A third line
                 there would also break the baseline match below. */}
          <p
            data-animate
            className="font-anton"
            /* end, so its last line sits on the title's baseline rather than
               starting level with the eyebrow above the title */
            style={{ fontSize: "clamp(32px, 4.1vw, 64px)", lineHeight: 1.06, letterSpacing: "-0.03em", maxWidth: 620, alignSelf: "end" }}
          >
            {project.statement}
          </p>

          {/* 3 · Meta tables — under the title */}
          <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "clamp(20px, 3vw, 40px)", alignSelf: "start" }}>
            {metaTables.map((rows, i) => (
              <dl key={i} style={{ margin: 0 }}>
                {rows.map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex"
                    style={{ borderTop: "1px solid #2b2b2b", paddingTop: 10, paddingBottom: 10, gap: 16 }}
                  >
                    <dt className="font-dm-mono" style={{ fontSize: 13, color: "#6b7280", flex: "0 0 84px" }}>
                      {label}
                    </dt>
                    <dd className="font-dm-mono" style={{ fontSize: 13, color: "#ffffff", margin: 0, flex: 1, lineHeight: 1.5 }}>
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            ))}
          </div>

          {/* 4 · Product summary — under the statement */}
          <p
            data-animate
            className="font-dm-mono"
            style={{ fontSize: 14, lineHeight: 1.75, color: "#d1d5db", maxWidth: 460, alignSelf: "start" }}
          >
            {project.intro}
          </p>

        </div>
      </header>

      {/* ── Lead image ── */}
      <section className="px-6 md:px-14 lg:px-24" style={{ paddingTop: "clamp(64px, 9vw, 120px)", paddingBottom: "clamp(72px, 10vw, 136px)" }}>
        <Frame tone="#3883ce" ratio="16 / 9" caption="Add a hero shot of the product" />
      </section>

      {/* ── Narrative sections ── */}
      {sections.map(({ heading, body }, i) => (
        <section
          key={heading}
          data-reveal-group
          className="px-6 md:px-14 lg:px-24"
          style={{ paddingTop: "clamp(72px, 10vw, 136px)", paddingBottom: "clamp(72px, 10vw, 136px)" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr]" style={{ gap: "clamp(32px, 5vw, 80px)" }}>
            <h2 data-reveal className="font-anton" style={{ fontSize: "clamp(28px, 4vw, 56px)", lineHeight: 1.05, letterSpacing: "-0.03em" }}>
              {heading}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {body.map((para, j) => (
                <p key={j} data-reveal className="font-dm-mono" style={{ fontSize: "clamp(15px, 1.6vw, 19px)", lineHeight: 1.8, color: "#d1d5db" }}>
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* Break the wall of text with the gallery, two frames at a time */}
          {gallery[i * 2] && (
            <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "clamp(20px, 3vw, 40px)", marginTop: "clamp(48px, 6vw, 88px)" }}>
              <Frame {...gallery[i * 2]} />
              {gallery[i * 2 + 1] && <Frame {...gallery[i * 2 + 1]} />}
            </div>
          )}
        </section>
      ))}

      {/* ── Outcome — only renders once there are real numbers to show ── */}
      {metrics.length > 0 && (
        <section
          data-reveal-group
          className="px-6 md:px-14 lg:px-24"
          style={{ background: "#3883ce", color: "#111111", paddingTop: "clamp(80px, 11vw, 152px)", paddingBottom: "clamp(80px, 11vw, 152px)" }}
        >
          <h2 data-reveal className="font-anton" style={{ fontSize: "clamp(28px, 4vw, 56px)", lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: "clamp(40px, 6vw, 80px)" }}>
            Outcome
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "clamp(32px, 5vw, 64px)" }}>
            {metrics.map(({ value, label }) => (
              <div key={label} style={{ borderTop: "1px solid rgba(0,0,0,0.25)", paddingTop: 20 }}>
                <p data-reveal className="font-anton" style={{ fontSize: "clamp(44px, 6vw, 88px)", lineHeight: 1, letterSpacing: "-0.04em" }}>
                  {value}
                </p>
                <p className="font-dm-mono" style={{ fontSize: 13, color: "rgba(0,0,0,0.6)", marginTop: 12 }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Footer — email CTA and the way back ── */}
      <footer className="footer-dark" style={{ background: "#111111" }}>
        <div
          data-animate
          className="px-6 md:px-14 lg:px-24"
          style={{ paddingTop: "clamp(64px, 9vw, 120px)", paddingBottom: 40 }}
        >
          <p className="font-dm-mono" style={{ fontSize: 11, fontWeight: 700, color: "#4b5563", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 28 }}>
            Start a project
          </p>
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
          className="px-6 md:px-14 lg:px-24 font-dm-mono"
          style={{
            borderTop: "1px solid #1a1a1a", paddingTop: 20, paddingBottom: 20,
            display: "flex", justifyContent: "space-between", alignItems: "center",
            fontSize: 13, color: "#6b7280", flexWrap: "wrap", gap: 12,
          }}
        >
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); navigateTo("/"); }}
            className="link-underline"
            style={{ textDecoration: "none" }}
          >
            ← All work
          </a>
          <span>© 2026</span>
        </div>
      </footer>
    </div>
  );
};

export default BookMeBus;
