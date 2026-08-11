import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

import { createMotionContext } from "../../lib/animations";
import { MQ } from "../../lib/breakpoints";

gsap.registerPlugin(ScrollTrigger, SplitText);

const SCROLL_TRIGGER = {
  start: "top 88%",
  once: true,
  fastScrollEnd: true,
} as const;

function readStatValue(el: HTMLElement): { target: number; suffix: string } {
  return {
    target: Number(el.dataset.target ?? "0"),
    suffix: el.dataset.suffix ?? "",
  };
}

function formatStatValue(
  value: number,
  target: number,
  suffix: string,
): string {
  const isFloat = target % 1 !== 0;
  return isFloat
    ? `${value.toFixed(1)}${suffix}`
    : `${Math.round(value)}${suffix}`;
}

function applyReducedMotionFallback(): void {
  const statValues =
    document.querySelectorAll<HTMLElement>("[data-stat-value]");
  statValues.forEach((el) => {
    const { target, suffix } = readStatValue(el);
    el.textContent = `${target}${suffix}`;
  });
  gsap.set(".about__portrait, .stat, .about__signature", { opacity: 1, y: 0 });
}

function animateStatement(): void {
  const statement = document.querySelector<HTMLElement>(
    "[data-split-statement]",
  );
  if (!statement) return;

  void document.fonts.ready.then(() => {
    const split = SplitText.create(statement, {
      type: "words",
      tag: "span",
      wordsClass: "split-word",
      reduceWhiteSpace: true,
    });
    gsap.from(split.words, {
      y: 30,
      opacity: 0,
      duration: 0.5,
      stagger: 0.018,
      ease: "power2.out",
      scrollTrigger: { trigger: statement, ...SCROLL_TRIGGER },
    });
  });
}

function animatePortrait(): void {
  gsap.from(".about__portrait", {
    y: 60,
    opacity: 0,
    duration: 1.1,
    ease: "power3.out",
    scrollTrigger: { trigger: ".about__portrait", ...SCROLL_TRIGGER },
  });
}

function animateStats(): void {
  const statValues =
    document.querySelectorAll<HTMLElement>("[data-stat-value]");
  statValues.forEach((el) => {
    const { target, suffix } = readStatValue(el);
    const counter = { val: 0 };
    gsap.to(counter, {
      val: target,
      duration: 1.6,
      ease: "power2.out",
      scrollTrigger: { trigger: el, ...SCROLL_TRIGGER, start: "top 92%" },
      onUpdate: () => {
        el.textContent = formatStatValue(counter.val, target, suffix);
      },
    });
  });
}

function animateSignature(): void {
  gsap.from(".about__signature", {
    opacity: 0,
    y: 20,
    duration: 0.8,
    delay: 0.3,
    scrollTrigger: { trigger: ".about__signature", ...SCROLL_TRIGGER },
  });
}

function setup(): void {
  createMotionContext((mm) => {
    mm.add(MQ.reducedMotion, () => {
      applyReducedMotionFallback();
      return () => {};
    });

    mm.add(MQ.motionOk, () => {
      animateStatement();
      animatePortrait();
      animateStats();
      animateSignature();
      return () => {};
    });
  });
}

setup();
