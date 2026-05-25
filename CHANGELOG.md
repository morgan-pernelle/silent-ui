# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- GitHub Actions CI (typecheck, test, library + demo build)
- GitHub Actions publish workflow on release (`NPM_TOKEN` required)
- [PUBLISHING.md](./PUBLISHING.md) — npm publish guide
- `previewCopy.ts` — real Silent UI copy for previews and code examples (replaces Lorem ipsum)

### Changed

- **npm package renamed** to `@silent-ui/react` (unscoped `silent-ui` is taken on the registry)
- All imports and docs updated to `@silent-ui/react`
- All component previews and `componentCode.ts` snippets use on-brand copy (products, themes, docs navigation)
- `package.json` repository, homepage, bugs, and `prepublishOnly` script

### Removed

- `demo/constants/lorem.ts`

### Added (previous)

- Docs sidebar keyboard navigation (arrow keys, Home, End)
- Playgrounds for Button, Select, and Card on the components reference
- `useFocusTrap` hook for `Modal` and `Drawer` focus management
- `prefers-reduced-motion` support via Framer Motion `useReducedMotion` on motion primitives and `Card`
- Demo pages: **About** (`/about`), **Recipes** (`/docs/recipes`)
- `AppLink` and skip-to-content link for accessible routing
- Live **Button playground** on the components reference
- Vitest setup with component tests (`Drawer`, `Modal`, `Select`, `DateInput`)
- `DateInput` calendar toggle: `aria-expanded` and `aria-controls`
- `CHANGELOG.md` and expanded `README`

### Changed

- Dark theme: improved faint text contrast for labels and sidebar metadata
- `prefers-reduced-motion` extended to overlays, menus, toasts, tabs, accordion, progress, and commerce components
- Footer social link: generic X URL replaced with GitHub Issues
- `Drawer` documentation category moved to **Overlays** (still usable for commerce and site nav)
- Demo `siteLinks` point to GitHub and npm package URLs
- README documents peers, fonts, demo structure, and all component categories

## [0.1.0] - 2026-05-25

### Added

- Initial release: layout, typography, forms, feedback, navigation, overlays, motion, and commerce components
- `SilentProvider` theme system and CSS design tokens
- Framer Motion variants and easing exports
- Interactive documentation demo site

[Unreleased]: https://github.com/morgan-pernelle/silent-ui/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/morgan-pernelle/silent-ui/releases/tag/v0.1.0
