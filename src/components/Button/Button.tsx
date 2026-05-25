import { motion } from "framer-motion";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { useTapScale } from "../../motion/reducedMotion";
import { cn } from "../../utils/cn";
import styles from "./Button.module.css";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "ghost" | "primary" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "ghost",
      size = "md",
      icon,
      fullWidth,
      className,
      children,
      ...props
    },
    ref,
  ) {
    const isGhost = variant === "ghost";
    const tapScale = useTapScale(0.98);

    return (
      <motion.button
        ref={ref}
        className={cn(
          styles.button,
          styles[variant],
          styles[size],
          fullWidth && styles.fullWidth,
          className,
        )}
        whileTap={
          variant === "primary" ? tapScale : undefined
        }
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        {...(props as object)}
      >
        {isGhost ? (
          <span className={styles.underlineWrap}>
            {children}
            <span className={styles.underline} aria-hidden />
          </span>
        ) : (
          children
        )}
        {icon && <span className={styles.icon}>{icon}</span>}
      </motion.button>
    );
  },
);
