export const MQ = {
  reducedMotion: "(prefers-reduced-motion: reduce)",
  motionOk: "(prefers-reduced-motion: no-preference)",
  mobile: "(max-width: 640px)",
  tablet: "(max-width: 1024px)",
  pointerCoarse: "(pointer: coarse)",
} as const;

export type MQKey = keyof typeof MQ;
