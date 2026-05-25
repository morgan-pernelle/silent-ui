import { type ReactNode } from "react";
import { cn } from "../../utils/cn";
import styles from "./Breadcrumb.module.css";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  className?: string;
}

export function Breadcrumb({
  items,
  separator = "/",
  className,
}: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className={cn(styles.breadcrumb, className)}>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.label} className={styles.item}>
              {i > 0 && (
                <span className={styles.sep} aria-hidden>
                  {separator}
                </span>
              )}
              {isLast || !item.href ? (
                <span
                  className={isLast ? styles.current : undefined}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <a href={item.href} className={styles.link}>
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
