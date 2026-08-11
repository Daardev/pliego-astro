import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

import { createMotionContext } from "../../lib/animations";
import { MQ } from "../../lib/breakpoints";

gsap.registerPlugin(SplitText);

interface LayerConfig {
  from: gsap.TweenVars;
  to: gsap.TweenVars;
  duration: number;
}

const LAYER_CONFIG: Record<
  "background" | "middle" | "foreground",
  LayerConfig
> = {
  background: {
    from: {
      scale: 1.5,
      opacity: 0,
      filter: "grayscale(1) contrast(1.05) blur(14px)",
    },
    to: {
      scale: 1,
      opacity: 0.4,
      filter: "grayscale(1) contrast(1.05) blur(0px)",
    },
    duration: 1.8,
  },
  middle: {
    from: {
      scale: 0.65,
      opacity: 0,
      y: 100,
      filter: "grayscale(1) contrast(1.05) blur(12px)",
    },
    to: {
      scale: 1,
      opacity: 0.85,
      y: 0,
      filter: "grayscale(1) contrast(1.05) blur(0px)",
    },
    duration: 1.4,
  },
  foreground: {
    from: {
      scale: 0.4,
      opacity: 0,
      y: 200,
      filter: "grayscale(1) contrast(1.05) blur(8px)",
    },
    to: {
      scale: 1,
      opacity: 1,
      y: 0,
      filter: "grayscale(1) contrast(1.05) blur(0px)",
    },
    duration: 1.2,
  },
};

const LAYER_START_TIMES: Record<
  "background" | "middle" | "foreground",
  number
> = {
  background: 0,
  middle: 0.6,
  foreground: 1.0,
};

const ENTRY_SELECTORS = [
  ".hero__eyebrow",
  ".hero__tags .hero-tag",
  ".hero__card",
  ".hero__cta",
  ".hero__scroll",
];

function selectLayer(
  name: "background" | "middle" | "foreground",
): HTMLElement | null {
  return document.querySelector<HTMLElement>(`[data-hero-layer="${name}"]`);
}

function animateLayers(tl: gsap.core.Timeline): void {
  (Object.keys(LAYER_CONFIG) as Array<keyof typeof LAYER_CONFIG>).forEach(
    (name) => {
      const layer = selectLayer(name);
      if (!layer) return;
      const config = LAYER_CONFIG[name];
      tl.fromTo(layer, config.from, config.to, LAYER_START_TIMES[name]);
    },
  );
}

async function animateHeadline(tl: gsap.core.Timeline): Promise<void> {
  const headline = document.querySelector<HTMLElement>("[data-split-headline]");
  if (!headline) return;

  await document.fonts.ready;
  const split = SplitText.create(headline, {
    type: "words",
    tag: "span",
    wordsClass: "split-word",
    reduceWhiteSpace: true,
  });
  tl.from(
    split.words,
    { y: 80, opacity: 0, duration: 0.7, stagger: 0.06, ease: "power3.out" },
    1.4,
  );
}

function animateEntry(tl: gsap.core.Timeline): void {
  tl.fromTo(
    ENTRY_SELECTORS,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
    1.8,
  );
}

function animateAccent(): void {
  const accents = document.querySelectorAll<HTMLElement>("[data-hero-accent]");
  if (!accents.length) return;
  gsap.to(accents, {
    y: "+=10",
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });
}

function applyReducedMotionFallback(): void {
  const layers = document.querySelectorAll<HTMLElement>("[data-hero-layer]");
  gsap.set(layers, {
    opacity: (_i, el) => {
      const name = (el as HTMLElement).dataset.heroLayer;
      if (name === "background") return 0.4;
      if (name === "middle") return 0.85;
      return 1;
    },
    scale: 1,
    clearProps: "filter,transform",
  });
  gsap.set(".hero-tag, .hero__card, .hero__cta, .hero__scroll", {
    opacity: 1,
    y: 0,
  });
  const headline = document.querySelector<HTMLElement>("[data-split-headline]");
  if (headline) headline.textContent = headline.textContent ?? "";
}

function setup(): void {
  createMotionContext((mm) => {
    mm.add(MQ.reducedMotion, () => {
      applyReducedMotionFallback();
      return () => {};
    });

    mm.add(MQ.motionOk, () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      animateLayers(tl);
      void animateHeadline(tl);
      animateEntry(tl);
      animateAccent();
      return () => {};
    });
  });
}

setup();
