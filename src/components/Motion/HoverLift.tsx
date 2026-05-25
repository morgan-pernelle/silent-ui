import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { useReducedMotion } from "../../motion/reducedMotion";

export interface HoverLiftProps extends HTMLMotionProps<"div"> {
  lift?: number;
  children: ReactNode;
}

/** Subtle lift on hover — common in award-winning portfolio sites */
export function HoverLift({ lift = 4, children, ...props }: HoverLiftProps) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      whileHover={reducedMotion ? undefined : { y: -lift }}
      transition={
        reducedMotion
          ? { duration: 0 }
          : { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
      }
      {...props}
    >
      {children}
    </motion.div>
  );
}
