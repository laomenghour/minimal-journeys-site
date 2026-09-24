import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

/** Words stagger by this much, until the cap below kicks in */
const WORD_STAGGER = 0.04;
/** Longest a single element's cascade may run — keeps paragraphs from crawling */
const MAX_CASCADE = 0.6;
/** Head start between elements inside a [data-reveal-group] */
const GROUP_OFFSET = 0.12;

/**
 * Scroll-triggered word reveal.
 *
 * Each line is masked; its words slide up from below the mask one after
 * another as the element enters view.
 *
 *   [data-reveal]        an element that reveals on its own trigger
 *   [data-reveal-group]  a container whose [data-reveal] children share one
 *                        trigger and cascade in DOM order, so the stagger
 *                        reads across the whole section rather than
 *                        restarting for every element
 */
export function useTextReveal() {
  useEffect(() => {
    // Skip entirely for people who asked for less motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const groups = gsap.utils.toArray<HTMLElement>("[data-reveal-group]");

      groups.forEach((group) => {
        const members = gsap.utils.toArray<HTMLElement>("[data-reveal]", group);
        members.forEach((el, i) => {
          // Trigger off the group, not the element, so all members react to
          // one scroll position and only their delays separate them
          split(el, { trigger: group, delay: i * GROUP_OFFSET });
        });
      });

      // Anything not inside a group keeps its own trigger
      gsap.utils
        .toArray<HTMLElement>("[data-reveal]")
        .filter((el) => !el.closest("[data-reveal-group]"))
        .forEach((el) => split(el, { trigger: el, delay: 0 }));
    });

    return () => ctx.revert();
  }, []);
}

function split(el: HTMLElement, { trigger, delay }: { trigger: Element; delay: number }) {
  SplitText.create(el, {
    type: "lines,words",
    // mask:"lines" wraps every line in its own overflow:hidden element, so a
    // word translating up is clipped by the line above it
    mask: "lines",
    linesClass: "reveal-line",
    wordsClass: "reveal-word",
    // Re-split on resize and once webfonts land — otherwise line breaks are
    // measured against fallback metrics and land in the wrong places
    autoSplit: true,
    onSplit: (self) =>
      gsap.from(self.words, {
        yPercent: 100,
        duration: 0.9,
        ease: "expo.out",
        delay,
        // 0.04 per word, but a 40-word paragraph would take 1.6s to finish
        // at that rate — cap the total so long copy still lands promptly
        stagger: Math.min(WORD_STAGGER, MAX_CASCADE / self.words.length),
        scrollTrigger: {
          trigger,
          start: "top 85%",
          once: true,
        },
      }),
  });
}
