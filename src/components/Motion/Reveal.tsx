import { motion, type HTMLMotionProps } from "framer-motion";
import { useScrollRevealMotion } from "../../motion/reducedMotion";
import {
  revealLeftVariants,
  revealUpVariants,
  lineDrawVariants,
} from "../../motion/variants";

export type RevealDirection = "up" | "left" | "line";

const directionVariants = {
  up: revealUpVariants,
  left: revealLeftVariants,
  line: lineDrawVariants,
};

export interface RevealProps extends HTMLMotionProps<"div"> {
  direction?: RevealDirection;
  delay?: number;
}

export function Reveal({
  direction = "up",
  delay = 0,
  children,
  className,
  ...props
}: RevealProps) {
  const variants = directionVariants[direction];
  const reveal = useScrollRevealMotion();

  if (direction === "line") {
    return (
      <motion.div
        className={className}
        style={{ transformOrigin: "left" }}
        variants={variants}
        initial={reveal.initial}
        whileInView={reveal.whileInView}
        viewport={reveal.viewport ?? { once: true }}
        transition={{ delay }}
        {...props}
      >
        <div
          style={{
            height: 1,
            background: "var(--silent-color-ink)",
            transformOrigin: "left",
          }}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      initial={reveal.initial}
      whileInView={reveal.whileInView}
      viewport={reveal.viewport ?? { once: true, margin: "-40px" }}
      transition={{ delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
