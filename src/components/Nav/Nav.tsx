import { useEffect, useState, type ReactNode } from "react";
import { cn } from "../../utils/cn";
import styles from "./Nav.module.css";

export interface NavProps {
  logo?: ReactNode;
  logoHref?: string;
  children?: ReactNode;
  actions?: ReactNode;
}

export function Nav({ logo = "Silent", logoHref = "#", children, actions }: NavProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cn(styles.nav, scrolled && styles.scrolled)}>
      <div className={styles.inner}>
        <a href={logoHref} className={styles.logo}>
          {logo}
        </a>
        {children && <nav className={styles.links}>{children}</nav>}
        {actions ? <div className={styles.actions}>{actions}</div> : null}
      </div>
    </header>
  );
}
