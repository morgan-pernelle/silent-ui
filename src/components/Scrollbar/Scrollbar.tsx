import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils/cn";
import styles from "./Scrollbar.module.css";

export interface ScrollbarProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  orientation?: "vertical" | "horizontal" | "both";
  size?: "thin" | "default" | "wide";
}

export const Scrollbar = forwardRef<HTMLDivElement, ScrollbarProps>(
  function Scrollbar(
    {
      children,
      orientation = "vertical",
      size = "default",
      className,
      ...props
    },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className={cn(
          styles.root,
          styles[orientation],
          size !== "default" && styles[size],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
