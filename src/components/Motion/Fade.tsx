import {
  motion,
  type HTMLMotionProps,
  type Variants,
} from "framer-motion";
import { useScrollRevealMotion } from "../../motion/reducedMotion";
import { fadeVariants } from "../../motion/variants";

export interface FadeProps extends HTMLMotionProps<"div"> {
  variants?: Variants;
  delay?: number;
}

export function Fade({ variants = fadeVariants, delay = 0, children, ...props }: FadeProps) {
  const reveal = useScrollRevealMotion();
  return (
    <motion.div
      variants={variants}
      initial={reveal.initial}
      whileInView={reveal.whileInView}
      viewport={reveal.viewport}
      transition={{ delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
