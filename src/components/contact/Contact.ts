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

function animateTitle(): void {
  const title = document.querySelector<HTMLElement>("[data-split-title]");
  if (!title) return;

  void document.fonts.ready.then(() => {
    const split = SplitText.create(title, {
      type: "words",
      tag: "span",
      wordsClass: "split-word",
      reduceWhiteSpace: true,
    });
    gsap.from(split.words, {
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.05,
      ease: "power3.out",
      scrollTrigger: { trigger: title, ...SCROLL_TRIGGER },
    });
  });
}

function animateImage(): void {
  gsap.from(".contact__image", {
    x: -40,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: { trigger: ".contact__image", ...SCROLL_TRIGGER },
  });
}

function animateFields(): void {
  gsap.from(".field", {
    y: 20,
    opacity: 0,
    duration: 0.6,
    stagger: 0.08,
    ease: "power2.out",
    scrollTrigger: { trigger: ".contact__form", ...SCROLL_TRIGGER },
  });
}

function applyReducedMotionFallback(): void {
  gsap.set(".contact__image, .field", { opacity: 1, x: 0, y: 0 });
}

function setup(): void {
  createMotionContext((mm) => {
    mm.add(MQ.reducedMotion, () => {
      applyReducedMotionFallback();
      return () => {};
    });

    mm.add(MQ.motionOk, () => {
      animateTitle();
      animateImage();
      animateFields();
      return () => {};
    });
  });
}

setup();
