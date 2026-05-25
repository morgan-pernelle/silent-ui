import type { ComponentDocMeta } from "./docTypes";

/** Sidebar & docs page category order (foundation → commerce). */
export const DOC_CATEGORY_ORDER = [
  "Foundation",
  "Typography",
  "Layout",
  "Surfaces",
  "Actions",
  "Forms",
  "Data Display",
  "Feedback",
  "Navigation",
  "Overlays",
  "Media",
  "Motion",
  "Commerce",
] as const;

/** Stable order within each category (ids). */
export const COMPONENT_ORDER: Record<string, readonly string[]> = {
  Foundation: ["silent-provider"],
  Typography: ["text"],
  Layout: ["layout"],
  Surfaces: ["card"],
  Actions: ["button", "link", "icon-button"],
  Forms: [
    "input",
    "search-input",
    "select",
    "date-input",
    "time-input",
    "checkbox",
    "radio",
    "switch",
  ],
  "Data Display": ["badge", "avatar"],
  Feedback: ["alert", "progress", "skeleton", "spinner", "toast"],
  Navigation: ["nav", "tabs", "breadcrumb", "accordion", "scrollbar"],
  Overlays: ["drawer", "modal", "tooltip"],
  Media: ["image"],
  Motion: ["fade", "reveal", "stagger", "hover-lift"],
  Commerce: [
    "product-card",
    "product-gallery",
    "rating",
    "carousel",
    "chip",
    "dropdown",
    "pagination",
    "quantity-input",
    "cart-item",
    "cart-checkout",
    "table",
  ],
};

function buildSortIndex(): Map<string, number> {
  const index = new Map<string, number>();
  DOC_CATEGORY_ORDER.forEach((category, catIndex) => {
    const ids = COMPONENT_ORDER[category] ?? [];
    ids.forEach((id, itemIndex) => {
      index.set(id, catIndex * 1000 + itemIndex);
    });
  });
  return index;
}

const sortIndex = buildSortIndex();

export function sortComponentDocs(docs: ComponentDocMeta[]): ComponentDocMeta[] {
  return [...docs].sort((a, b) => {
    const orderA = sortIndex.get(a.id) ?? 99_999;
    const orderB = sortIndex.get(b.id) ?? 99_999;
    if (orderA !== orderB) return orderA - orderB;
    return a.name.localeCompare(b.name);
  });
}

export function buildComponentCategories(docs: ComponentDocMeta[]) {
  const sorted = sortComponentDocs(docs);
  return DOC_CATEGORY_ORDER.map((name) => ({
    name,
    items: sorted.filter((d) => d.category === name),
  })).filter((cat) => cat.items.length > 0);
}
