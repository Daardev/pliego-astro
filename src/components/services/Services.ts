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

interface ServiceRefs {
  root: HTMLElement;
  toggle: HTMLButtonElement;
  body: HTMLElement;
  iconV: HTMLElement;
  preview: HTMLElement | null;
}

function readServiceRefs(service: HTMLElement): ServiceRefs | null {
  const toggle = service.querySelector<HTMLButtonElement>(".service__toggle");
  const body = service.querySelector<HTMLElement>(".service__body");
  const iconV = service.querySelector<HTMLElement>(".service__icon-v");
  const preview = service.querySelector<HTMLElement>(".service__preview");
  if (!toggle || !body || !iconV) return null;
  return { root: service, toggle, body, iconV, preview };
}

function closeService(refs: ServiceRefs): void {
  refs.root.dataset.open = "false";
  refs.toggle.setAttribute("aria-expanded", "false");
  refs.body.setAttribute("aria-hidden", "true");
  gsap.to(refs.body, { height: 0, duration: 0.3, ease: "power2.inOut" });
  gsap.to(refs.iconV, { rotation: 0, duration: 0.25, ease: "power2.out" });
}

function openService(refs: ServiceRefs): void {
  refs.root.dataset.open = "true";
  refs.toggle.setAttribute("aria-expanded", "true");
  refs.body.setAttribute("aria-hidden", "false");
  gsap.set(refs.body, { height: "auto" });
  const targetHeight = refs.body.offsetHeight;
  gsap.fromTo(
    refs.body,
    { height: 0 },
    {
      height: targetHeight,
      duration: 0.4,
      ease: "power3.out",
      onComplete: () => {
        gsap.set(refs.body, { height: "auto" });
      },
    },
  );
  gsap.to(refs.iconV, { rotation: 45, duration: 0.3, ease: "power2.out" });
}

function toggleService(refs: ServiceRefs, all: ServiceRefs[]): void {
  const isOpen = refs.root.dataset.open === "true";
  all.filter((other) => other.root !== refs.root).forEach(closeService);
  if (isOpen) {
    closeService(refs);
  } else {
    openService(refs);
  }
}

function setupAccordion(services: ServiceRefs[]): void {
  services.forEach((refs) => {
    refs.toggle.addEventListener("click", () => toggleService(refs, services));
  });
}

function applyReducedMotionFallback(services: ServiceRefs[]): void {
  services.forEach((refs) => {
    refs.body.style.height = "0px";
    refs.body.style.overflow = "hidden";
  });
}

function animateEntry(): void {
  gsap.from(".service", {
    y: 30,
    opacity: 0,
    duration: 0.7,
    stagger: 0.08,
    ease: "power2.out",
    scrollTrigger: { trigger: ".services__list", ...SCROLL_TRIGGER },
  });
}

function setupPreviewHover(services: ServiceRefs[]): () => void {
  const cleanups: Array<() => void> = [];

  services.forEach((refs) => {
    if (!refs.preview) return;
    const preview = refs.preview;

    gsap.set(preview, { opacity: 0 });

    const onEnter = () => {
      services
        .filter((other) => other.root !== refs.root && other.preview)
        .forEach((other) => {
          gsap.killTweensOf(other.preview);
          gsap.to(other.preview, {
            opacity: 0,
            duration: 0.2,
            ease: "power2.in",
          });
        });
      gsap.killTweensOf(preview);
      gsap.to(preview, { opacity: 1, duration: 0.4, ease: "power2.out" });
    };

    const onLeave = () => {
      gsap.killTweensOf(preview);
      gsap.to(preview, { opacity: 0, duration: 0.3, ease: "power2.in" });
    };

    refs.root.addEventListener("mouseenter", onEnter);
    refs.root.addEventListener("mouseleave", onLeave);

    cleanups.push(() => {
      refs.root.removeEventListener("mouseenter", onEnter);
      refs.root.removeEventListener("mouseleave", onLeave);
    });
  });

  return () => cleanups.forEach((fn) => fn());
}

function setup(): void {
  const serviceElements =
    document.querySelectorAll<HTMLElement>("[data-service]");
  const services = Array.from(serviceElements)
    .map(readServiceRefs)
    .filter((refs): refs is ServiceRefs => refs !== null);

  setupAccordion(services);

  createMotionContext((mm) => {
    mm.add(MQ.reducedMotion, () => {
      applyReducedMotionFallback(services);
      return () => {};
    });

    mm.add(MQ.motionOk, () => {
      animateEntry();
      if (window.matchMedia(MQ.pointerCoarse).matches) return () => {};
      const cleanup = setupPreviewHover(services);
      return cleanup;
    });
  });
}

setup();
