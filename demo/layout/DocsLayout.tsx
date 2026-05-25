import type { ReactNode } from "react";
import { DocsSidebarNav } from "./DocsSidebarNav";

export interface DocsLayoutProps {
  children: ReactNode;
}

/** Desktop sidebar + main content. Mobile nav drawer lives in SiteLayout. */
export function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="docs-layout">
      <aside className="docs-sidebar" aria-label="Documentation">
        <DocsSidebarNav />
      </aside>
      <div className="docs-content">{children}</div>
    </div>
  );
}
