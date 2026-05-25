import { useMemo, useRef, useState } from "react";
import { useDocsSidebarRoving } from "../hooks/useDocsSidebarRoving";
import { NavLink } from "react-router-dom";
import { Scrollbar, SearchInput } from "@silent-ui/react";
import { siteCopy } from "../constants/siteCopy";
import { filterDocumentation } from "../utils/docSearch";

export interface DocsSidebarNavProps {
  onNavigate?: () => void;
  className?: string;
  /** drawer = full-height scroll inside mobile panel */
  variant?: "sidebar" | "drawer";
}

export function DocsSidebarNav({
  onNavigate,
  className,
  variant = "sidebar",
}: DocsSidebarNavProps) {
  const [query, setQuery] = useState("");
  const { pages, categories, totalResults } = useMemo(
    () => filterDocumentation(query),
    [query],
  );
  const isSearching = query.trim().length > 0;
  const navRef = useRef<HTMLElement>(null);
  const onNavKeyDown = useDocsSidebarRoving(navRef);

  const rootClass =
    className ??
    `docs-sidebar-inner${variant === "drawer" ? " docs-sidebar-inner--drawer" : ""}`;

  const navContent = (
        <nav
          ref={navRef}
          className="docs-sidebar-nav"
          aria-label="Documentation navigation"
          onKeyDown={onNavKeyDown}
        >
          {pages.length > 0 && (
            <div className="docs-sidebar-group">
              <span className="docs-sidebar-label">Documentation</span>
              {pages.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={"end" in link ? link.end : undefined}
                  className={({ isActive }) =>
                    `docs-sidebar-link${isActive ? " docs-sidebar-link--active" : ""}`
                  }
                  onClick={onNavigate}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          )}

          {categories.length > 0 && (
            <div className="docs-sidebar-group">
              <span className="docs-sidebar-label">Components</span>
              {categories.map((cat) => (
                <div key={cat.name} className="docs-sidebar-category">
                  <span className="docs-sidebar-cat">{cat.name}</span>
                  {cat.items.map((item) => (
                    <a
                      key={item.id}
                      href={`/docs/components#${item.id}`}
                      className="docs-sidebar-anchor"
                      onClick={onNavigate}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          )}

          {isSearching && totalResults === 0 && (
            <p className="docs-sidebar-empty">
              Try another keyword — e.g. button, toast, layout
            </p>
          )}
        </nav>
  );

  return (
    <div className={rootClass}>
      <div className="docs-sidebar-search">
        <SearchInput
          placeholder={siteCopy.docsSearchPlaceholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onClear={() => setQuery("")}
          aria-label="Search documentation"
        />
        {isSearching && (
          <p className="docs-sidebar-results" aria-live="polite">
            {totalResults === 0
              ? "No results"
              : `${totalResults} result${totalResults === 1 ? "" : "s"}`}
          </p>
        )}
      </div>
      {variant === "drawer" ? (
        <div className="docs-sidebar-scroll docs-sidebar-scroll--drawer">
          {navContent}
        </div>
      ) : (
        <Scrollbar
          className="docs-sidebar-scroll"
          orientation="vertical"
          size="thin"
        >
          {navContent}
        </Scrollbar>
      )}
    </div>
  );
}
