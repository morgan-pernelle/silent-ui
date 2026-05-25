import { AnimatePresence, motion } from "framer-motion";
import { useState, type ReactNode } from "react";
import { usePopMotion } from "../../motion/reducedMotion";
import { cn } from "../../utils/cn";
import styles from "./Tooltip.module.css";

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export function Tooltip({
  content,
  children,
  side = "top",
  className,
}: TooltipProps) {
  const [open, setOpen] = useState(false);
  const pop = usePopMotion({ opacity: 0, scale: 0.96 }, 0.2);

  return (
    <span
      className={cn(styles.wrapper, className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      <AnimatePresence>
        {open && (
          <motion.span
            role="tooltip"
            className={cn(styles.tooltip, styles[side])}
            initial={pop.initial}
            animate={pop.animate}
            exit={pop.exit}
            transition={pop.transition}
          >
            {content}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
