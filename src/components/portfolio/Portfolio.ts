import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { createMotionContext } from "../../lib/animations";
import { MQ } from "../../lib/breakpoints";

gsap.registerPlugin(ScrollTrigger);

const SCROLL_TRIGGER = {
  start: "top 88%",
  once: true,
  fastScrollEnd: true,
} as const;

function animateProjects(): void {
  const projects = gsap.utils.toArray<HTMLElement>("[data-project]");
  projects.forEach((project, index) => {
    gsap.from(project, {
      y: 60,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: { trigger: project, ...SCROLL_TRIGGER },
      delay: (index % 2) * 0.1,
    });
  });
}

function applyReducedMotionFallback(): void {
  gsap.set("[data-project]", { opacity: 1, y: 0 });
}

function setup(): void {
  createMotionContext((mm) => {
    mm.add(MQ.reducedMotion, () => {
      applyReducedMotionFallback();
      return () => {};
    });

    mm.add(MQ.motionOk, () => {
      animateProjects();
      return () => {};
    });
  });
}

setup();
