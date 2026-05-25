import { useEffect, useState } from "react";
import {
  NavLink as RouterNavLink,
  Outlet,
  useLocation,
} from "react-router-dom";
import { Button, Drawer, Nav } from "@silent-ui/react";
import { SkipLink } from "../components/SkipLink";
import { SiteFooter } from "../components/SiteFooter";
import { ThemeToggle } from "../components/ThemeToggle";
import { DocsSidebarNav } from "./DocsSidebarNav";

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/docs/install", label: "Install" },
  { to: "/docs/getting-started", label: "Getting Started" },
  { to: "/docs/components", label: "Components" },
];

export function SiteLayout() {
  const { pathname, hash } = useLocation();
  const isDocs = pathname.startsWith("/docs");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname, hash]);

  return (
    <>
      <SkipLink />
      <Nav
        logo="Silent"
        logoHref="/"
        actions={
          <>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="site-nav-menu-btn"
              aria-label={isDocs ? "Open documentation menu" : "Open menu"}
              onClick={() => setMenuOpen(true)}
            >
              <span className="site-nav-menu-icon" aria-hidden>
                ☰
              </span>
            </Button>
            <ThemeToggle />
          </>
        }
      >
        {navItems.map((item) => (
          <RouterNavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `site-nav-link${isActive ? " site-nav-link--active" : ""}`
            }
          >
            {item.label}
          </RouterNavLink>
        ))}
      </Nav>

      {isDocs ? (
        <Drawer
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          title="Documentation"
          side="left"
          width="min(100vw, 320px)"
          bodyFlush
        >
          <DocsSidebarNav
            variant="drawer"
            onNavigate={() => setMenuOpen(false)}
          />
        </Drawer>
      ) : (
        <Drawer
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          title="Menu"
          side="left"
          width="min(100vw, 280px)"
        >
          <nav className="site-drawer-nav">
            {navItems.map((item) => (
              <RouterNavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `site-drawer-link${isActive ? " site-drawer-link--active" : ""}`
                }
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </RouterNavLink>
            ))}
          </nav>
        </Drawer>
      )}

      <div className={isDocs ? "page page--docs" : "page"}>
        <main id="main-content">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
