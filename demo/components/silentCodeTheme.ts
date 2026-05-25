import type { PrismTheme } from "prism-react-renderer";

/**
 * Always-dark syntax theme for documentation code blocks.
 * WCAG-friendly contrast on #121110 background (≥ 7:1 for base text).
 */
export const silentCodeTheme: PrismTheme = {
  plain: {
    color: "#eeede8",
    backgroundColor: "#121110",
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: { color: "#8a8680", fontStyle: "italic" },
    },
    {
      types: ["namespace"],
      style: { opacity: 0.8 },
    },
    {
      types: ["string", "char", "attr-value", "regex"],
      style: { color: "#9ece9a" },
    },
    {
      types: ["punctuation"],
      style: { color: "#9c9890" },
    },
    {
      types: ["operator", "entity"],
      style: { color: "#c4c0b8" },
    },
    {
      types: [
        "number",
        "boolean",
        "constant",
        "symbol",
        "property",
        "inserted",
      ],
      style: { color: "#d4b896" },
    },
    {
      types: [
        "atrule",
        "keyword",
        "attr-name",
        "selector",
        "important",
        "tag",
      ],
      style: { color: "#f5f3ee", fontWeight: "500" },
    },
    {
      types: ["function", "class-name", "maybe-class-name"],
      style: { color: "#8ec8e8" },
    },
    {
      types: ["variable", "parameter", "deleted"],
      style: { color: "#e2dfd6" },
    },
    {
      types: ["builtin", "changed", "interpolation"],
      style: { color: "#c4b0e8" },
    },
  ],
};
