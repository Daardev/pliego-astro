import { gsap } from "gsap";

type MotionSetup = (mm: gsap.MatchMedia) => void;

export function createMotionContext(setup: MotionSetup): () => void {
  const ctx = gsap.context(() => {
    const mm = gsap.matchMedia();
    setup(mm);
  });
  return () => ctx.revert();
}

export function applyReducedMotionFallback(
  targets: string | Element | Element[],
  from: gsap.TweenVars,
): void {
  gsap.set(targets, { ...from, clearProps: "transform,opacity,filter" });
}
