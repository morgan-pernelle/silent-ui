/** Shared copy for component previews and documentation code examples. */
export const copy = {
  short: "Minimal components with deliberate motion.",
  medium:
    "Silent UI pairs Japanese-inspired spacing with Framer Motion transitions that respect prefers-reduced-motion.",
  long: "Build portfolio and commerce experiences with quiet typography, accessible overlays, and CSS tokens you can theme without forking the library.",
  label: "Design system",
  heading: "Silence speaks",
  email: "hello@studio.example",
  search: "Search components…",
  message: "Tell us about your project…",
  nav: {
    home: "Home",
    docs: "Docs",
    about: "About",
  },
  principles: {
    ma: { title: "間 — Ma", desc: "Negative space as an active element." },
    sei: { title: "静 — Sei", desc: "Slow, deliberate transitions." },
    shitsu: { title: "質 — Shitsu", desc: "Refined typography and detail." },
  },
  products: {
    linenCoat: {
      title: "Linen coat",
      badge: "New",
      alt: "Linen coat on hanger",
    },
    stoneVase: {
      title: "Stone vase",
      badge: "Limited",
      alt: "Hand-thrown stone vase",
    },
  },
  gallery: {
    mainThumbs: "Hero with thumbnails",
    grid2x2: "2×2 grid",
    grid: "Masonry grid",
    carousel: "Carousel",
    captions: {
      mainThumbs: "Large image with a strip of thumbnails — ideal for product pages.",
      grid: "Even grid for lookbooks and editorial galleries.",
    },
  },
  cart: {
    title: "Cart (2)",
    open: "Open cart",
    checkoutToast: "Added to cart",
  },
  table: {
    order: "Order",
    date: "Date",
    total: "Total",
  },
  theme: {
    label: "Theme",
    light: "Light",
    dark: "Dark",
    system: "System",
  },
  sort: {
    label: "Sort",
    featured: "Featured",
    price: "Price",
    newest: "Newest",
  },
  filters: ["Linen", "Stone", "Essentials"] as const,
  layoutBoxes: ["Layout", "Grid", "Stack"] as const,
  staggerBoxes: ["Fade", "Reveal", "Stagger"] as const,
  accordion: {
    motion: "Motion tokens",
    theming: "Theming",
    motionBody:
      "Export easing curves and variants, or use Fade, Reveal, and Stagger primitives.",
    themingBody:
      "Override --silent-* CSS variables on :root or [data-silent-theme=\"dark\"].",
  },
  tabs: {
    overview: "Overview",
    props: "Props",
    recipes: "Recipes",
    overviewText: "Live previews mirror the code blocks below.",
    propsText: "Each component documents props with TypeScript-friendly tables.",
    recipesText: "See the Recipes page for composed patterns.",
  },
  breadcrumb: ["Home", "Components", "Button"] as const,
  scrollbarLines: [
    "Installation guide",
    "Getting started",
    "Component reference",
    "Recipes and patterns",
  ],
  toast: {
    title: "Saved",
    description: "Your theme preference was updated.",
  },
  modal: {
    title: "Confirm action",
    body: "This dialog traps focus and closes on Escape — same behavior as Drawer.",
    cancel: "Cancel",
  },
  tooltip: "Calibrated easing: cubic-bezier(0.16, 1, 0.3, 1)",
  progress: "Documentation",
  switch: "Reduced motion",
  checkbox: "Respect prefers-reduced-motion in previews",
  radio: {
    label: "Default theme",
    light: "Light",
    dark: "Dark",
  },
  badges: ["New", "Sale", "Limited"] as const,
  avatars: ["Yuki Tanaka", "Mina Sato"] as const,
  alert: {
    title: "Theme applied",
    body: "Light mode is active. Toggle in the site header.",
  },
  aria: {
    scrollTop: "Scroll to top",
    close: "Close",
  },
} as const;
