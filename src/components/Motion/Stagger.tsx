import { motion, type HTMLMotionProps } from "framer-motion";
import { useScrollRevealMotion } from "../../motion/reducedMotion";
import { staggerItem } from "../../motion/variants";

export interface StaggerProps extends HTMLMotionProps<"div"> {
  stagger?: number;
  delayChildren?: number;
}

export function Stagger({
  stagger = 0.08,
  delayChildren = 0.1,
  children,
  ...props
}: StaggerProps) {
  const reveal = useScrollRevealMotion();
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: reveal.whileInView
            ? { staggerChildren: stagger, delayChildren }
            : { duration: 0 },
        },
      }}
      initial={reveal.initial}
      whileInView={reveal.whileInView}
      viewport={reveal.viewport ?? { once: true, margin: "-40px" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export interface StaggerItemProps extends HTMLMotionProps<"div"> {}

export function StaggerItem({ children, ...props }: StaggerItemProps) {
  return (
    <motion.div variants={staggerItem} {...props}>
      {children}
    </motion.div>
  );
}
