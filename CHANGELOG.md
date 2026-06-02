# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.3] - 2026-06-02

### Fixed

- **Toast SSR** — toast portal mounts only after hydration (`useSyncExternalStore`), preventing Next.js hydration mismatches.

## [0.1.2] - 2026-06-01

### Fixed

- **Styles export** — the library build now emits `dist/silent-ui.css`, matching the `@silent-ui/react/styles.css` package export. Previously Vite named the bundle `react.css`, so `import "@silent-ui/react/styles.css"` failed in Next.js and other bundlers.

### Changed

- Dev dependencies updated to React 19 for local development and tests (peer dependencies remain `react` / `react-dom` ^18 || ^19).

## [0.1.1] - 2026-05-25

### Changed

- README and documentation site focused on installing and using `@silent-ui/react`
- Install and Getting Started pages: npm, yarn, pnpm, and published package metadata

## [0.1.0] - 2026-05-25

### Added

- React component library: layout, typography, forms, feedback, navigation, overlays, motion, and commerce
- `SilentProvider` theme system and CSS design tokens (`--silent-*`)
- Framer Motion variants and easing exports
- Interactive documentation demo (`demo/`) with live previews, prop tables, and playgrounds
- Pages: About, Recipes, Install, Getting Started, and component reference
- Accessibility: focus trap on `Modal` and `Drawer`, skip link, keyboard-friendly docs search
- `prefers-reduced-motion` support across motion primitives and key UI surfaces
- Vitest tests for `Drawer`, `Modal`, `Select`, and `DateInput`

### Changed

- Dark theme: improved contrast for labels and sidebar metadata
- Demo copy uses on-brand text instead of placeholder lorem ipsum

[Unreleased]: https://github.com/morgan-pernelle/silent-ui/compare/v0.1.3...HEAD
[0.1.3]: https://github.com/morgan-pernelle/silent-ui/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/morgan-pernelle/silent-ui/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/morgan-pernelle/silent-ui/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/morgan-pernelle/silent-ui/releases/tag/v0.1.0
