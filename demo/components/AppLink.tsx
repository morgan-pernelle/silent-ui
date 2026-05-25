import type { ReactNode } from "react";
import { NavLink, type NavLinkProps } from "react-router-dom";

export interface AppLinkProps extends Omit<NavLinkProps, "className"> {
  children: ReactNode;
  showArrow?: boolean;
  muted?: boolean;
  className?: string;
}

export function AppLink({
  children,
  showArrow = true,
  muted,
  className,
  ...props
}: AppLinkProps) {
  return (
    <NavLink
      {...props}
      className={({ isActive }) =>
        [
          "app-link",
          muted && "app-link--muted",
          isActive && "app-link--active",
          className,
        ]
          .filter(Boolean)
          .join(" ")
      }
    >
      <span className="app-link-label">{children}</span>
      <span className="app-link-line" aria-hidden />
      {showArrow && (
        <span className="app-link-arrow" aria-hidden>
          →
        </span>
      )}
    </NavLink>
  );
}
