import { createElement, type ElementType, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import styles from "./Text.module.css";

type TextVariant =
  | "xs"
  | "sm"
  | "base"
  | "lg"
  | "xl"
  | "display"
  | "hero"
  | "mono";

type TextTone = "default" | "muted" | "faint";

export interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  variant?: TextVariant;
  tone?: TextTone;
  leading?: "tight" | "normal" | "relaxed";
  tracking?: "normal" | "wide" | "wider";
}

export function Text({
  as: Component = "p",
  variant = "base",
  tone = "default",
  leading = "normal",
  tracking,
  className,
  children,
  ...props
}: TextProps) {
  return createElement(
    Component,
    {
      className: cn(
        styles.text,
        styles[variant],
        tone !== "default" && styles[tone],
        styles[leading],
        tracking && styles[tracking],
        className,
      ),
      ...props,
    },
    children,
  );
}

export function Heading({
  level = 1,
  ...props
}: Omit<TextProps, "as" | "variant"> & { level?: 1 | 2 | 3 | 4 }) {
  const tag = `h${level}` as const;
  const variant = level <= 1 ? "hero" : level === 2 ? "display" : "xl";
  return <Text as={tag} variant={variant} {...props} />;
}

export function Label(props: TextProps) {
  return (
    <Text
      as="span"
      variant="xs"
      tracking="wider"
      tone="faint"
      {...props}
    />
  );
}
