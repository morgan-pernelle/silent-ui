import { useReducedMotion } from "framer-motion";

export { useReducedMotion };

export const INSTANT_TRANSITION = { duration: 0 } as const;

/** Viewport-driven motion: skip entrance animation when reduced motion is preferred. */
export function useScrollRevealMotion() {
  const reduced = useReducedMotion();
  return {
    initial: reduced ? false : ("hidden" as const),
    whileInView: reduced ? undefined : ("visible" as const),
    viewport: reduced ? undefined : { once: true, margin: "-60px" as const },
  };
}

/** Fade overlay (Modal/Drawer backdrop). */
export function useFadeOverlayMotion() {
  const reduced = useReducedMotion();
  return {
    initial: reduced ? false : ("hidden" as const),
    animate: reduced ? undefined : ("visible" as const),
    exit: reduced ? undefined : ("exit" as const),
    transition: reduced ? INSTANT_TRANSITION : undefined,
  };
}

/** Scale panel (Modal content). */
export function useScalePanelMotion() {
  const reduced = useReducedMotion();
  return {
    initial: reduced ? false : ("hidden" as const),
    animate: reduced ? undefined : ("visible" as const),
    exit: reduced ? undefined : ("exit" as const),
    transition: reduced ? INSTANT_TRANSITION : undefined,
  };
}

/** Slide panel (Drawer). */
export function useSlidePanelMotion(
  transition = { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
) {
  const reduced = useReducedMotion();
  return {
    transition: reduced ? INSTANT_TRANSITION : transition,
  };
}

type PopState = { opacity: number; y?: number; x?: number; scale?: number };

/** Dropdowns, menus, calendars, tooltips. */
export function usePopMotion(
  hidden: PopState = { opacity: 0, y: -8, scale: 0.98 },
  duration = 0.25,
) {
  const reduced = useReducedMotion();
  const visible = { opacity: 1, y: 0, x: 0, scale: 1 };
  if (reduced) {
    return {
      initial: false as const,
      animate: undefined,
      exit: undefined,
      transition: INSTANT_TRANSITION,
    };
  }
  return {
    initial: hidden,
    animate: visible,
    exit: hidden,
    transition: { duration, ease: [0.16, 1, 0.3, 1] as const },
  };
}

/** Accordion height expand/collapse. */
export function useHeightMotion(duration = 0.4) {
  const reduced = useReducedMotion();
  if (reduced) {
    return {
      initial: false as const,
      animate: undefined,
      exit: undefined,
      transition: INSTANT_TRANSITION,
    };
  }
  return {
    initial: { height: 0, opacity: 0 },
    animate: { height: "auto", opacity: 1 },
    exit: { height: 0, opacity: 0 },
    transition: { duration, ease: [0.16, 1, 0.3, 1] as const },
  };
}

/** Tap / hover micro-interactions. */
export function useTapScale(scale = 0.98) {
  const reduced = useReducedMotion();
  return reduced ? undefined : { scale };
}

export function useMotionTransition<T extends object>(transition: T) {
  const reduced = useReducedMotion();
  return reduced ? INSTANT_TRANSITION : transition;
}
