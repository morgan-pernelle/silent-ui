import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils/cn";
import styles from "./IconButton.module.css";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "ghost" | "outline";
  "aria-label": string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    { icon, size = "md", variant = "ghost", className, ...props },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(styles.button, styles[size], styles[variant], className)}
        {...props}
      >
        {icon}
      </button>
    );
  },
);
