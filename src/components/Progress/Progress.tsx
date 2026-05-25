import { motion } from "framer-motion";
import { useMotionTransition } from "../../motion/reducedMotion";
import { cn } from "../../utils/cn";
import styles from "./Progress.module.css";

export interface ProgressProps {
  value?: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  indeterminate?: boolean;
  className?: string;
}

export function Progress({
  value = 0,
  max = 100,
  label,
  showValue,
  indeterminate,
  className,
}: ProgressProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));
  const barTransition = useMotionTransition({
    duration: 0.7,
    ease: [0.16, 1, 0.3, 1],
  });

  return (
    <div
      className={cn(styles.progress, indeterminate && styles.indeterminate, className)}
      role="progressbar"
      aria-valuenow={indeterminate ? undefined : value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={label}
    >
      {(label || showValue) && (
        <div className={styles.label}>
          {label && <span>{label}</span>}
          {showValue && !indeterminate && <span>{Math.round(percent)}%</span>}
        </div>
      )}
      <div className={styles.track}>
        <motion.div
          className={styles.bar}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: indeterminate ? 1 : percent / 100 }}
          transition={barTransition}
          style={{ width: indeterminate ? undefined : "100%" }}
        />
      </div>
    </div>
  );
}
