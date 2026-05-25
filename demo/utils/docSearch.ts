import { componentCategories, componentDocs } from "../data/componentDocs";
import type { ComponentDocMeta } from "../data/docTypes";

export const docPages = [
  {
    to: "/docs/install",
    label: "Installation",
    keywords: [
      "install",
      "npm",
      "@silent-ui/react",
      "framer-motion",
      "setup",
      "requirements",
      "fonts",
      "build",
      "yarn",
      "pnpm",
    ],
  },
  {
    to: "/docs/getting-started",
    label: "Getting Started",
    keywords: [
      "start",
      "quickstart",
      "provider",
      "theme",
      "toast",
      "motion",
      "@silent-ui/react",
      "npm install",
    ],
  },
  {
    to: "/docs/components",
    label: "Components",
    end: true,
    keywords: ["components", "reference", "api", "props", "preview", "commerce", "cart", "drawer"],
  },
  {
    to: "/docs/recipes",
    label: "Recipes",
    keywords: ["recipes", "patterns", "compose", "drawer", "cart", "layout", "grid"],
  },
  {
    to: "/about",
    label: "About",
    keywords: ["about", "project", "concept", "ma", "japanese", "design", "principles"],
  },
] as const;

function matchesQuery(text: string, query: string) {
  return text.toLowerCase().includes(query);
}

function componentMatches(doc: ComponentDocMeta, query: string) {
  return (
    matchesQuery(doc.name, query) ||
    matchesQuery(doc.id, query) ||
    matchesQuery(doc.category, query) ||
    matchesQuery(doc.description, query)
  );
}

export function filterDocumentation(query: string) {
  const q = query.trim().toLowerCase();

  if (!q) {
    return {
      pages: [...docPages],
      categories: componentCategories,
      totalResults: docPages.length + componentDocs.length,
    };
  }

  const pages = docPages.filter(
    (page) =>
      matchesQuery(page.label, q) ||
      page.keywords.some((kw) => matchesQuery(kw, q)),
  );

  const categories = componentCategories
    .map((cat) => ({
      ...cat,
      items: cat.items.filter((doc) => componentMatches(doc, q)),
    }))
    .filter((cat) => cat.items.length > 0);

  const totalResults =
    pages.length + categories.reduce((n, c) => n + c.items.length, 0);

  return { pages, categories, totalResults };
}
