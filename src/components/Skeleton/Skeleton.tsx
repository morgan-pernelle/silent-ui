import { type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import styles from "./Skeleton.module.css";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "title" | "avatar" | "card" | "rect";
  width?: string | number;
  height?: string | number;
}

export function Skeleton({
  variant = "text",
  width,
  height,
  className,
  style,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(styles.skeleton, variant !== "rect" && styles[variant], className)}
      style={{
        width: width ?? (variant === "rect" ? "100%" : undefined),
        height: height ?? (variant === "rect" ? "1rem" : undefined),
        ...style,
      }}
      aria-hidden
      {...props}
    />
  );
}
