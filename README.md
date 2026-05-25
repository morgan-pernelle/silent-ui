# Silent UI

A minimal React UI library with smooth animations, inspired by Japanese design and award-winning web experiences.

> *Silence speaks.* — Less noise, more intent.

## Principles

- **間 (Ma)** — Negative space as an active design element
- **静 (Sei)** — Slow, deliberate motion; respects `prefers-reduced-motion`
- **質 (Shitsu)** — Refined typography and subtle details

## Install

```bash
npm install @silent-ui/react framer-motion
```

**Peer dependencies:** `react` and `react-dom` (^18 or ^19).

```tsx
import { SilentProvider, Button, Heading, Fade } from "@silent-ui/react";
import "@silent-ui/react/styles.css";

function App() {
  return (
    <SilentProvider defaultTheme="light">
      <Fade>
        <Heading level={1}>Silence speaks.</Heading>
        <Button variant="ghost" icon="→">Explore</Button>
      </Fade>
    </SilentProvider>
  );
}
```

### Fonts

The default theme uses system UI fonts. For the full aesthetic, load a serif + sans pair (see `demo/index.html`) — for example [Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif) and [DM Sans](https://fonts.google.com/specimen/DM+Sans), then set:

```css
:root {
  --silent-font-serif: "Instrument Serif", Georgia, serif;
  --silent-font-sans: "DM Sans", system-ui, sans-serif;
}
```

## Package exports

| Import | Description |
|--------|-------------|
| `@silent-ui/react` | All components, hooks, motion tokens |
| `@silent-ui/react/styles.css` | Design tokens + component styles |

## Component overview

| Category | Examples |
|----------|----------|
| **Foundation** | `SilentProvider`, `useSilentTheme` |
| **Layout** | `Container`, `Section`, `Stack`, `Grid`, `Divider`, `Spacer` |
| **Typography** | `Text`, `Heading`, `Label` |
| **Actions** | `Button`, `Link`, `NavLink`, `IconButton` |
| **Surfaces** | `Card`, `Image` |
| **Forms** | `Input`, `Textarea`, `SearchInput`, `Select`, `DateInput`, `TimeInput`, `Checkbox`, `Radio`, `Switch` |
| **Data display** | `Badge`, `Avatar`, `Table` |
| **Feedback** | `Alert`, `Progress`, `Skeleton`, `Spinner`, `Toast` |
| **Navigation** | `Nav`, `Tabs`, `Accordion`, `Breadcrumb`, `Scrollbar` |
| **Overlays** | `Drawer`, `Modal`, `Tooltip` |
| **Motion** | `Fade`, `Reveal`, `Stagger`, `HoverLift` |
| **Commerce** | `ProductCard`, `CartItem`, `CartCheckout`, `Pagination`, … |

Full documentation with live previews, prop tables, and playgrounds ships with this repository (`demo/`). Run `npm run dev` to open it locally.

## Motion

Animation tokens are exported for custom components:

```tsx
import { easing, duration, fadeVariants } from "@silent-ui/react";
import { motion } from "framer-motion";

<motion.div variants={fadeVariants} initial="hidden" animate="visible" />;
```

Built-in primitives (`Fade`, `Reveal`, `Card`, overlays) honor **`prefers-reduced-motion`** via Framer Motion.

## Accessibility

- **Modal** and **Drawer** trap focus while open and restore focus on close
- **Select** uses `combobox` / `listbox` / `option` roles
- Demo site includes a **skip to content** link and keyboard-friendly sidebar search

## Development

```bash
git clone https://github.com/morgan-pernelle/silent-ui.git
cd silent-ui
npm install
npm run dev        # http://localhost:5173 — documentation site
npm run build      # library → dist/
npm run test
npm run typecheck
```

| Route | Content |
|-------|---------|
| `/` | Homepage — design principles |
| `/about` | Project concept and philosophy |
| `/docs/install` | npm, peers, fonts, CSS |
| `/docs/getting-started` | Provider, theme, toasts |
| `/docs/components` | Full reference + playground |
| `/docs/recipes` | Composed patterns (nav drawer, cart, docs layout) |

## Project structure

```
src/           Library (components, theme, motion, styles)
demo/          Vite demo app (pages, previews, documentation data)
dist/          Published build (after npm run build)
CHANGELOG.md   Version history (semver)
```

## Changelog

See [CHANGELOG.md](./CHANGELOG.md).

## CI

GitHub Actions runs on every push and PR: `typecheck`, `test`, `build`, and `build:demo` (see [.github/workflows/ci.yml](.github/workflows/ci.yml)).

## License

MIT
