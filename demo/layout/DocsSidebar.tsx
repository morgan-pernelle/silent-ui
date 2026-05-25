import { DocsSidebarNav } from "./DocsSidebarNav";

/** @deprecated Use DocsLayout */
export function DocsSidebar() {
  return (
    <aside className="docs-sidebar" aria-label="Documentation">
      <DocsSidebarNav />
    </aside>
  );
}
