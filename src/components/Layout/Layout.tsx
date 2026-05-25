import {
  useLayoutEffect,
  useRef,
  type CSSProperties,
  type HTMLAttributes,
} from "react";
import { cn } from "../../utils/cn";
import styles from "./Layout.module.css";

const spaceMap = {
  1: "var(--silent-space-1)",
  2: "var(--silent-space-2)",
  3: "var(--silent-space-3)",
  4: "var(--silent-space-4)",
  5: "var(--silent-space-5)",
  6: "var(--silent-space-6)",
  8: "var(--silent-space-8)",
  10: "var(--silent-space-10)",
  12: "var(--silent-space-12)",
  16: "var(--silent-space-16)",
  20: "var(--silent-space-20)",
} as const;

type Space = keyof typeof spaceMap;

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "default" | "narrow" | "wide";
}

export function Container({
  size = "default",
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        styles.container,
        size === "narrow" && styles.narrow,
        size === "wide" && styles.wide,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  size?: "sm" | "md" | "lg";
}

export function Section({
  size = "md",
  className,
  children,
  ...props
}: SectionProps) {
  const sizeClass =
    size === "sm"
      ? styles.sectionSm
      : size === "lg"
        ? styles.sectionLg
        : styles.section;

  return (
    <section className={cn(sizeClass, className)} {...props}>
      {children}
    </section>
  );
}

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  gap?: Space;
  align?: "start" | "center" | "end";
  justify?: "between" | "center";
  direction?: "column" | "row";
}

export function Stack({
  gap = 4,
  align,
  justify,
  direction = "column",
  className,
  style,
  children,
  ...props
}: StackProps) {
  return (
    <div
      className={cn(
        direction === "row" ? styles.row : styles.stack,
        align === "start" && styles.alignStart,
        align === "center" && styles.alignCenter,
        align === "end" && styles.alignEnd,
        justify === "between" && styles.justifyBetween,
        justify === "center" && styles.justifyCenter,
        className,
      )}
      style={{ gap: spaceMap[gap], ...style }}
      {...props}
    >
      {children}
    </div>
  );
}

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  cols?: 2 | 3 | 4;
  gap?: Space;
  /** Match every card height in the grid to the tallest (all rows). */
  equalHeight?: boolean;
}

function syncEqualHeightCards(container: HTMLElement | null) {
  if (!container) return;
  const cards = container.querySelectorAll<HTMLElement>("[data-silent-card]");
  if (cards.length === 0) return;

  cards.forEach((card) => {
    card.style.minHeight = "";
  });

  let maxHeight = 0;
  cards.forEach((card) => {
    maxHeight = Math.max(maxHeight, card.offsetHeight);
  });

  if (maxHeight > 0) {
    cards.forEach((card) => {
      card.style.minHeight = `${maxHeight}px`;
    });
  }
}

export function Grid({
  cols = 2,
  gap = 6,
  equalHeight,
  className,
  style,
  children,
  ...props
}: GridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!equalHeight) return;
    const container = gridRef.current;
    if (!container) return;

    const run = () => syncEqualHeightCards(container);

    run();

    const observer = new ResizeObserver(run);
    observer.observe(container);
    container.querySelectorAll("[data-silent-card]").forEach((card) => {
      observer.observe(card);
    });

    const onWindowResize = () => run();
    window.addEventListener("resize", onWindowResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", onWindowResize);
      container.querySelectorAll<HTMLElement>("[data-silent-card]").forEach((card) => {
        card.style.minHeight = "";
      });
    };
  }, [equalHeight, children]);

  return (
    <div
      ref={gridRef}
      className={cn(
        styles.grid,
        styles[`cols${cols}`],
        equalHeight && styles.equalHeight,
        className,
      )}
      style={{ gap: spaceMap[gap], ...style }}
      {...props}
    >
      {children}
    </div>
  );
}

export function Divider({
  vertical,
  className,
  ...props
}: HTMLAttributes<HTMLHRElement> & { vertical?: boolean }) {
  return (
    <hr
      className={cn(
        vertical ? styles.dividerVertical : styles.divider,
        className,
      )}
      {...props}
    />
  );
}

export function Spacer({ size = 8 }: { size?: Space }) {
  return (
    <div
      className={styles.spacer}
      style={{ height: spaceMap[size] } as CSSProperties}
      aria-hidden
    />
  );
}
