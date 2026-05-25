import { type AnchorHTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import styles from "./Link.module.css";

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  showArrow?: boolean;
  muted?: boolean;
  external?: boolean;
}

export function Link({
  showArrow = true,
  muted,
  external,
  className,
  children,
  href,
  ...props
}: LinkProps) {
  return (
    <a
      href={href}
      className={cn(styles.link, muted && styles.muted, className)}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      {...props}
    >
      <span className={styles.label}>
        {children}
        <span className={styles.line} aria-hidden />
      </span>
      {showArrow && (
        <span className={styles.arrow} aria-hidden>
          →
        </span>
      )}
    </a>
  );
}

export interface NavLinkProps extends LinkProps {
  active?: boolean;
}

export function NavLink({ active, className, ...props }: NavLinkProps) {
  return (
    <Link
      className={cn(active && styles.muted, className)}
      showArrow={false}
      {...props}
    />
  );
}
