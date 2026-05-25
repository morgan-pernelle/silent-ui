import { type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import styles from "./Badge.module.css";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "solid" | "outline";
  dot?: boolean;
}

export function Badge({
  variant = "default",
  dot,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(styles.badge, variant !== "default" && styles[variant], className)}
      {...props}
    >
      {dot && <span className={styles.dot} aria-hidden />}
      {children}
    </span>
  );
}
