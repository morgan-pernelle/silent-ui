/** Custom easing curves — slow in, graceful out (Japanese web aesthetic) */
export const easing = {
  out: [0.16, 1, 0.3, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
  spring: [0.34, 1.56, 0.64, 1] as const,
} as const;

export const duration = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.7,
  slower: 1.2,
} as const;

export const transition = {
  default: {
    duration: duration.normal,
    ease: easing.out,
  },
  slow: {
    duration: duration.slow,
    ease: easing.out,
  },
  spring: {
    type: "spring" as const,
    stiffness: 120,
    damping: 20,
  },
} as const;
