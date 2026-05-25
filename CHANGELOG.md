# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

[Unreleased]: https://github.com/morgan-pernelle/silent-ui/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/morgan-pernelle/silent-ui/releases/tag/v0.1.0
