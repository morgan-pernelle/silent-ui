import type { ComponentDocMeta } from "./docTypes";
import { componentCode } from "./componentCode";
import { commerceComponentDocs } from "./commerceComponentDocs";
import { buildComponentCategories, sortComponentDocs } from "./componentOrder";

function applyComponentCode(docs: ComponentDocMeta[]): ComponentDocMeta[] {
  return docs.map((doc) => ({
    ...doc,
    code: componentCode[doc.id] ?? doc.code,
  }));
}

export type { ComponentDocMeta } from "./docTypes";

const rawComponentDocs: ComponentDocMeta[] = [
  {
    id: "silent-provider",
    name: "SilentProvider",
    category: "Foundation",
    description:
      "Root provider that applies the theme (light/dark), loads global styles, and exposes context via useSilentTheme.",
    importLine: `import { SilentProvider } from "@silent-ui/react";`,
    code: `<SilentProvider defaultTheme="light">
  <App />
</SilentProvider>`,
    props: [
      {
        name: "defaultTheme",
        type: '"light" | "dark"',
        default: '"light"',
        description: "Initial theme when uncontrolled.",
      },
      {
        name: "theme",
        type: '"light" | "dark"',
        description: "Controlled theme (optional).",
      },
      {
        name: "className",
        type: "string",
        description: "Class on the root container.",
      },
    ],
  },
  {
    id: "button",
    name: "Button",
    category: "Actions",
    description:
      "Minimal button with ghost (animated underline), primary, and outline variants. Supports a trailing icon.",
    importLine: `import { Button } from "@silent-ui/react";`,
    code: `<Button variant="ghost" icon="→">Explore</Button>
<Button variant="primary">Get started</Button>`,
    props: [
      {
        name: "variant",
        type: '"ghost" | "primary" | "outline"',
        default: '"ghost"',
        description: "Visual style of the button.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        description: "Padding size.",
      },
      {
        name: "icon",
        type: "ReactNode",
        description: "Icon shown on the right with animation.",
      },
      {
        name: "fullWidth",
        type: "boolean",
        default: "false",
        description: "Takes full width.",
      },
    ],
  },
  {
    id: "link",
    name: "Link",
    category: "Actions",
    description:
      "Link with animated underline on hover and optional arrow — a hallmark of award-winning portfolios.",
    importLine: `import { Link, NavLink } from "@silent-ui/react";`,
    code: `<Link href="/docs">Documentation</Link>
<NavLink href="/about" active>About</NavLink>`,
    props: [
      {
        name: "showArrow",
        type: "boolean",
        default: "true",
        description: "Shows the → arrow on hover.",
      },
      {
        name: "muted",
        type: "boolean",
        default: "false",
        description: "Muted color.",
      },
      {
        name: "external",
        type: "boolean",
        default: "false",
        description: "Opens in a new tab.",
      },
    ],
  },
  {
    id: "icon-button",
    name: "IconButton",
    category: "Actions",
    description:
      "Accessible icon-only button for toolbars and secondary actions.",
    importLine: `import { IconButton } from "@silent-ui/react";`,
    code: `<IconButton icon="×" aria-label="Close" variant="outline" />`,
    props: [
      {
        name: "icon",
        type: "ReactNode",
        description: "Icon content (required).",
      },
      {
        name: "aria-label",
        type: "string",
        description: "Accessible label (required).",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        description: "Button dimensions.",
      },
      {
        name: "variant",
        type: '"ghost" | "outline"',
        default: '"ghost"',
        description: "Visual style.",
      },
    ],
  },
  {
    id: "text",
    name: "Text / Heading / Label",
    category: "Typography",
    description:
      "Typography system with hero, display, mono variants and muted/faint tones.",
    importLine: `import { Text, Heading, Label } from "@silent-ui/react";`,
    code: `<Heading level={1}>Silence speaks.</Heading>
<Text variant="lg" tone="muted">Subtle subtitle.</Text>
<Label>Section</Label>`,
    props: [
      {
        name: "variant",
        type: "TextVariant",
        default: '"base"',
        description: "xs | sm | base | lg | xl | display | hero | mono",
      },
      {
        name: "tone",
        type: '"default" | "muted" | "faint"',
        default: '"default"',
        description: "Text color.",
      },
      {
        name: "as",
        type: "ElementType",
        description: "Rendered HTML element.",
      },
      {
        name: "level",
        type: "1 | 2 | 3 | 4",
        default: "1",
        description: "Heading level only.",
      },
    ],
  },
  {
    id: "layout",
    name: "Layout",
    category: "Layout",
    description:
      "Container, Section, Stack, Grid, Divider, and Spacer for airy layouts.",
    importLine: `import { Container, Section, Stack, Grid, Divider, Spacer } from "@silent-ui/react";`,
    code: `<Container size="narrow">
  <Stack gap={6}>
    <Grid cols={3} gap={8}>...</Grid>
    <Divider />
  </Stack>
</Container>`,
    props: [
      {
        name: "gap",
        type: "Space (1-20)",
        default: "4",
        description: "Stack/Grid spacing.",
      },
      {
        name: "cols",
        type: "2 | 3 | 4",
        default: "2",
        description: "Grid columns.",
      },
      {
        name: "size",
        type: '"default" | "narrow" | "wide"',
        description: "Container width.",
      },
    ],
  },
  {
    id: "card",
    name: "Card",
    category: "Surfaces",
    description:
      "Card with scroll reveal, optional hover lift, and Media/Body/Footer subcomponents. Use Grid with equalHeight so every card in a section matches the tallest body.",
    importLine: `import { Card, CardMedia, CardBody, Grid } from "@silent-ui/react";`,
    code: `<Grid cols={2} gap={6} equalHeight>
  <Card interactive>
    <CardMedia src="/img-a.jpg" alt="Ma" />
    <CardBody>
      <Heading level={3}>Ma</Heading>
      <Text tone="muted">One line of copy.</Text>
    </CardBody>
  </Card>
  <Card interactive>
    <CardMedia src="/img-b.jpg" alt="Silence" />
    <CardBody>
      <Heading level={3}>Silence</Heading>
      <Text tone="muted">Several lines of copy so this card sets the height for the whole grid.</Text>
    </CardBody>
  </Card>
</Grid>`,
    props: [
      {
        name: "interactive",
        type: "boolean",
        default: "false",
        description: "Enables hover lift and image zoom.",
      },
      {
        name: "compact",
        type: "boolean",
        default: "false",
        description: "Reduced padding.",
      },
      {
        name: "radius",
        type: '"none" | "sm" | "md" | "lg" | "full"',
        description: "Optional corner radius override.",
      },
      {
        name: "Grid equalHeight",
        type: "boolean",
        description:
          "On Grid: equal card heights across all rows in the section.",
      },
    ],
  },
  {
    id: "input",
    name: "Input / Textarea",
    category: "Forms",
    description:
      "Clean form fields with uppercase labels and animated bottom border.",
    importLine: `import { Input, Textarea } from "@silent-ui/react";`,
    code: `<Input label="Email" type="email" placeholder="vous@exemple.com" />
<Textarea label="Message" rows={4} />`,
    props: [
      { name: "label", type: "string", description: "Field label." },
      {
        name: "hint",
        type: "string",
        description: "Helper text below the field.",
      },
      { name: "error", type: "string", description: "Error message." },
    ],
  },
  {
    id: "search-input",
    name: "SearchInput",
    category: "Forms",
    description:
      "Search field with icon and optional clear button. Used in the documentation sidebar.",
    importLine: `import { SearchInput } from "@silent-ui/react";`,
    code: `<SearchInput
  placeholder="Search docs..."
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  onClear={() => setQuery("")}
/>`,
    props: [
      {
        name: "placeholder",
        type: "string",
        default: '"Search..."',
        description: "Placeholder text.",
      },
      {
        name: "onClear",
        type: "() => void",
        description: "Shows clear button when set and field has value.",
      },
      { name: "label", type: "string", description: "Optional field label." },
    ],
  },
  {
    id: "date-input",
    name: "DateInput",
    category: "Forms",
    description:
      "Custom calendar popover (opens on focus, positioned below). Segmented DD/MM/YYYY input with validation, range limits, and smart backspace across segments.",
    importLine: `import { DateInput } from "@silent-ui/react";`,
    code: `<DateInput
  label="Start date"
  value={date}
  onValueChange={setDate}
  min="2024-01-01"
  max="2026-12-31"
/>`,
    props: [
      { name: "label", type: "string", description: "Field label." },
      { name: "value", type: "string", description: "ISO date (YYYY-MM-DD)." },
      {
        name: "onValueChange",
        type: "(value: string) => void",
        description: "Change handler.",
      },
      {
        name: "min / max",
        type: "string",
        description: "Selectable date range.",
      },
    ],
  },
  {
    id: "time-input",
    name: "TimeInput",
    category: "Forms",
    description:
      "Custom time picker popover (opens on focus, positioned below). Segmented HH:mm input with validation, range limits, and scrollable hour/minute columns (minutes in 5-minute steps).",
    importLine: `import { TimeInput } from "@silent-ui/react";`,
    code: `<TimeInput
  label="Meeting time"
  value={time}
  onValueChange={setTime}
  min="09:00"
  max="18:00"
/>`,
    props: [
      { name: "label", type: "string", description: "Field label." },
      {
        name: "value",
        type: "string",
        description: "Time string (HH:mm, 24h).",
      },
      {
        name: "onValueChange",
        type: "(value: string) => void",
        description: "Change handler.",
      },
      {
        name: "min / max",
        type: "string",
        description: "Selectable time range.",
      },
    ],
  },
  {
    id: "select",
    name: "Select",
    category: "Forms",
    description:
      "Custom dropdown menu (opens below the field). Full-width clickable trigger, keyboard navigation, and styling aligned with DateInput/TimeInput pickers.",
    importLine: `import { Select } from "@silent-ui/react";`,
    code: `<Select
  label="Language"
  value={lang}
  onValueChange={setLang}
  options={[
    { value: "en", label: "English" },
    { value: "ja", label: "Japanese" },
  ]}
/>`,
    props: [
      {
        name: "options",
        type: "SelectOption[]",
        description: "List of { value, label, disabled? }.",
      },
      { name: "label", type: "string", description: "Select label." },
      { name: "value", type: "string", description: "Selected option value." },
      {
        name: "onValueChange",
        type: "(value: string) => void",
        description: "Change handler.",
      },
      {
        name: "placeholder",
        type: "string",
        description: "Text when nothing is selected.",
      },
    ],
  },
  {
    id: "switch",
    name: "Switch",
    category: "Forms",
    description: "On/off switch with smooth thumb transition.",
    importLine: `import { Switch } from "@silent-ui/react";`,
    code: `<Switch label="Notifications" checked={on} onChange={...} />`,
    props: [
      {
        name: "label",
        type: "string",
        description: "Label beside the switch.",
      },
      { name: "checked", type: "boolean", description: "Controlled state." },
    ],
  },
  {
    id: "checkbox",
    name: "Checkbox",
    category: "Forms",
    description: "Minimal checkbox with animated check.",
    importLine: `import { Checkbox } from "@silent-ui/react";`,
    code: `<Checkbox label="Se souvenir de moi" defaultChecked />`,
    props: [{ name: "label", type: "string", description: "Checkbox label." }],
  },
  {
    id: "radio",
    name: "Radio / RadioGroup",
    category: "Forms",
    description: "Controlled radio group with internal context.",
    importLine: `import { Radio, RadioGroup } from "@silent-ui/react";`,
    code: `<RadioGroup name="plan" value={v} onValueChange={setV}>
  <Radio value="free" label="Gratuit" />
  <Radio value="pro" label="Pro" />
</RadioGroup>`,
    props: [
      {
        name: "value",
        type: "string",
        description: "Selected value (RadioGroup).",
      },
      {
        name: "onValueChange",
        type: "(v: string) => void",
        description: "Change callback.",
      },
      { name: "name", type: "string", description: "HTML name attribute." },
    ],
  },
  {
    id: "badge",
    name: "Badge",
    category: "Data Display",
    description: "Compact label for status, versions, or categories.",
    importLine: `import { Badge } from "@silent-ui/react";`,
    code: `<Badge dot>Nouveau</Badge>
<Badge variant="solid">v0.1</Badge>`,
    props: [
      {
        name: "variant",
        type: '"default" | "solid" | "outline"',
        default: '"default"',
        description: "Style du badge.",
      },
      {
        name: "dot",
        type: "boolean",
        default: "false",
        description: "Point indicateur.",
      },
    ],
  },
  {
    id: "avatar",
    name: "Avatar",
    category: "Data Display",
    description: "Image or initials avatar with stacked group.",
    importLine: `import { Avatar, AvatarGroup } from "@silent-ui/react";`,
    code: `<AvatarGroup>
  <Avatar name="Yuki Tanaka" />
  <Avatar src="/photo.jpg" alt="Portrait" />
</AvatarGroup>`,
    props: [
      {
        name: "size",
        type: '"sm" | "md" | "lg" | "xl"',
        default: '"md"',
        description: "Avatar size.",
      },
      {
        name: "name",
        type: "string",
        description: "Generates initials when no src.",
      },
      {
        name: "fallback",
        type: "string",
        description: "Custom fallback text.",
      },
    ],
  },
  {
    id: "alert",
    name: "Alert",
    category: "Feedback",
    description: "Informative message with colored side border per variant.",
    importLine: `import { Alert } from "@silent-ui/react";`,
    code: `<Alert variant="success" title="Success" onClose={...}>
  Operation completed.
</Alert>`,
    props: [
      {
        name: "variant",
        type: '"info" | "success" | "warning" | "error"',
        default: '"info"',
        description: "Alert type.",
      },
      { name: "title", type: "string", description: "Optional title." },
      {
        name: "onClose",
        type: "() => void",
        description: "Shows close button.",
      },
    ],
  },
  {
    id: "progress",
    name: "Progress",
    category: "Feedback",
    description: "Animated progress bar or indeterminate mode.",
    importLine: `import { Progress } from "@silent-ui/react";`,
    code: `<Progress value={65} max={100} label="Upload" showValue />`,
    props: [
      {
        name: "value",
        type: "number",
        default: "0",
        description: "Current value.",
      },
      {
        name: "max",
        type: "number",
        default: "100",
        description: "Maximum value.",
      },
      {
        name: "indeterminate",
        type: "boolean",
        default: "false",
        description: "Infinite animation.",
      },
      {
        name: "showValue",
        type: "boolean",
        default: "false",
        description: "Shows percentage.",
      },
    ],
  },
  {
    id: "skeleton",
    name: "Skeleton",
    category: "Feedback",
    description: "Shimmer placeholder while content loads.",
    importLine: `import { Skeleton } from "@silent-ui/react";`,
    code: `<Skeleton variant="title" />
<Skeleton variant="text" />
<Skeleton variant="card" />`,
    props: [
      {
        name: "variant",
        type: '"text" | "title" | "avatar" | "card" | "rect"',
        default: '"text"',
        description: "Preset shape.",
      },
      {
        name: "width / height",
        type: "string | number",
        description: "Custom dimensions (rect variant).",
      },
    ],
  },
  {
    id: "spinner",
    name: "Spinner",
    category: "Feedback",
    description: "Minimal circular loading indicator.",
    importLine: `import { Spinner } from "@silent-ui/react";`,
    code: `<Spinner size="md" label="Loading..." />`,
    props: [
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        description: "Taille du spinner.",
      },
      {
        name: "label",
        type: "string",
        default: '"Loading"',
        description: "Accessible aria-label.",
      },
    ],
  },
  {
    id: "toast",
    name: "Toast",
    category: "Feedback",
    description:
      "Ephemeral notifications via ToastProvider and useToast hook. Maximum 5 toasts visible at once.",
    importLine: `import { ToastProvider, useToast } from "@silent-ui/react";`,
    code: `// Envelopper l'app
<ToastProvider>
  <App />
</ToastProvider>

// Dans un composant
const { toast } = useToast();
toast({ title: "Saved", description: "..." });`,
    props: [
      { name: "title", type: "string", description: "Toast title (required)." },
      {
        name: "description",
        type: "string",
        description: "Optional subtitle.",
      },
      {
        name: "duration",
        type: "number",
        default: "4000",
        description: "Duration in ms (0 = persistent).",
      },
    ],
  },
  {
    id: "tabs",
    name: "Tabs",
    category: "Navigation",
    description: "Tabs with animated indicator (Framer Motion layoutId).",
    importLine: `import { Tabs, TabsList, Tab, TabPanel } from "@silent-ui/react";`,
    code: `<Tabs defaultValue="a">
  <TabsList>
    <Tab value="a">Tab A</Tab>
    <Tab value="b">Tab B</Tab>
  </TabsList>
  <TabPanel value="a">Content A</TabPanel>
</Tabs>`,
    props: [
      {
        name: "defaultValue",
        type: "string",
        description: "Initially active tab.",
      },
      {
        name: "value / onValueChange",
        type: "string / fn",
        description: "Controlled mode.",
      },
    ],
  },
  {
    id: "accordion",
    name: "Accordion",
    category: "Navigation",
    description:
      "Collapsible panels with height animation, single or multiple mode.",
    importLine: `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@silent-ui/react";`,
    code: `<Accordion type="single" defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger value="item-1">Titre</AccordionTrigger>
    <AccordionContent value="item-1">Contenu</AccordionContent>
  </AccordionItem>
</Accordion>`,
    props: [
      {
        name: "type",
        type: '"single" | "multiple"',
        default: '"single"',
        description: "One or many open at a time.",
      },
      {
        name: "defaultValue",
        type: "string | string[]",
        description: "Initially open items.",
      },
    ],
  },
  {
    id: "breadcrumb",
    name: "Breadcrumb",
    category: "Navigation",
    description: "Accessible breadcrumb for hierarchical navigation.",
    importLine: `import { Breadcrumb } from "@silent-ui/react";`,
    code: `<Breadcrumb items={[
  { label: "Home", href: "/" },
  { label: "Docs" },
]} />`,
    props: [
      {
        name: "items",
        type: "BreadcrumbItem[]",
        description: "{ label, href? }[]",
      },
      {
        name: "separator",
        type: "ReactNode",
        default: '"/"',
        description: "Custom separator.",
      },
    ],
  },
  {
    id: "scrollbar",
    name: "Scrollbar",
    category: "Navigation",
    hidePreview: true,
    description:
      "Themed scroll container with subtle thumb styling for WebKit and Firefox. Adapts to light and dark mode via design tokens. See the documentation sidebar for a live example.",
    importLine: `import { Scrollbar } from "@silent-ui/react";`,
    code: `<Scrollbar orientation="vertical" size="thin" style={{ height: 320 }}>
  <nav>{/* long sidebar content */}</nav>
</Scrollbar>`,
    props: [
      {
        name: "orientation",
        type: '"vertical" | "horizontal" | "both"',
        default: '"vertical"',
        description: "Scroll direction.",
      },
      {
        name: "size",
        type: '"thin" | "default" | "wide"',
        default: '"default"',
        description: "Scrollbar thickness.",
      },
    ],
  },
  {
    id: "nav",
    name: "Nav",
    category: "Navigation",
    description:
      "Fixed nav bar with blur, scroll border, and logo/links/actions slots.",
    importLine: `import { Nav } from "@silent-ui/react";`,
    code: `<Nav logo="Silent" logoHref="/" actions={<ThemeToggle />}>
  <NavLink href="/docs">Docs</NavLink>
</Nav>`,
    props: [
      {
        name: "logo",
        type: "ReactNode",
        default: '"Silent"',
        description: "Logo content.",
      },
      {
        name: "logoHref",
        type: "string",
        default: '"#"',
        description: "Logo link.",
      },
      {
        name: "actions",
        type: "ReactNode",
        description: "Right slot (e.g. theme toggle).",
      },
    ],
  },
  {
    id: "tooltip",
    name: "Tooltip",
    category: "Overlays",
    description: "Tooltip on hover/focus with scale animation.",
    importLine: `import { Tooltip } from "@silent-ui/react";`,
    code: `<Tooltip content="Helpful hint" side="top">
  <Button variant="outline">?</Button>
</Tooltip>`,
    props: [
      { name: "content", type: "ReactNode", description: "Tooltip text." },
      {
        name: "side",
        type: '"top" | "bottom" | "left" | "right"',
        default: '"top"',
        description: "Position.",
      },
    ],
  },
  {
    id: "modal",
    name: "Modal",
    category: "Overlays",
    description:
      "Modal dialog with blurred backdrop and fade + scale animations.",
    importLine: `import { Modal } from "@silent-ui/react";`,
    code: `<Modal open={open} onClose={() => setOpen(false)} title="Title">
  Content
</Modal>`,
    props: [
      { name: "open", type: "boolean", description: "Modal visibility." },
      {
        name: "onClose",
        type: "() => void",
        description: "Close handler (Escape, backdrop, button).",
      },
      { name: "title", type: "string", description: "Header title." },
    ],
  },
  {
    id: "image",
    name: "Image",
    category: "Media",
    description:
      "Lazy image with scale reveal, preset aspect ratios, and fill/crop inside the frame (no letterboxing).",
    importLine: `import { Image } from "@silent-ui/react";`,
    code: `<Image
  src="/photo.jpg"
  alt="Description"
  aspect="square"
  radius="lg"
/>`,
    props: [
      {
        name: "aspect",
        type: '"wide" | "square" | "portrait"',
        description: "Aspect ratio frame (16:9, 1:1, 3:4).",
      },
      {
        name: "cover",
        type: "boolean",
        description: "object-fit: cover; defaults to true when aspect is set.",
      },
      {
        name: "radius",
        type: '"none" | "sm" | "md" | "lg" | "full"',
        description: "Optional corner radius.",
      },
      {
        name: "reveal",
        type: "boolean",
        default: "true",
        description: "Animation on load.",
      },
    ],
  },
  {
    id: "fade",
    name: "Fade",
    category: "Motion",
    description: "Scroll fade (whileInView) with viewport once.",
    importLine: `import { Fade } from "@silent-ui/react";`,
    code: `<Fade delay={0.1}>
  <p>Animated content</p>
</Fade>`,
    props: [
      {
        name: "delay",
        type: "number",
        default: "0",
        description: "Delay before animation.",
      },
      {
        name: "variants",
        type: "Variants",
        description: "Custom Framer Motion variants.",
      },
    ],
  },
  {
    id: "reveal",
    name: "Reveal",
    category: "Motion",
    description: "Directional reveal (up, left) or horizontal line.",
    importLine: `import { Reveal } from "@silent-ui/react";`,
    code: `<Reveal direction="up" delay={0.2}>
  <Heading level={2}>Titre</Heading>
</Reveal>`,
    props: [
      {
        name: "direction",
        type: '"up" | "left" | "line"',
        default: '"up"',
        description: "Animation direction.",
      },
      {
        name: "delay",
        type: "number",
        default: "0",
        description: "Delay in seconds.",
      },
    ],
  },
  {
    id: "stagger",
    name: "Stagger / StaggerItem",
    category: "Motion",
    description: "Staggered child animation on scroll.",
    importLine: `import { Stagger, StaggerItem } from "@silent-ui/react";`,
    code: `<Stagger>
  {items.map(i => (
    <StaggerItem key={i.id}>{i.content}</StaggerItem>
  ))}
</Stagger>`,
    props: [
      {
        name: "stagger",
        type: "number",
        default: "0.08",
        description: "Delay between children (s).",
      },
      {
        name: "delayChildren",
        type: "number",
        default: "0.1",
        description: "Delay before first child.",
      },
    ],
  },
  {
    id: "hover-lift",
    name: "HoverLift",
    category: "Motion",
    description: "Wrapper that slightly lifts the child on hover.",
    importLine: `import { HoverLift } from "@silent-ui/react";`,
    code: `<HoverLift lift={6}>
  <Card>...</Card>
</HoverLift>`,
    props: [
      {
        name: "lift",
        type: "number",
        default: "4",
        description: "Y translation in pixels.",
      },
    ],
  },
  ...commerceComponentDocs,
];

export const componentDocs = sortComponentDocs(
  applyComponentCode(rawComponentDocs),
);

export const componentCategories = buildComponentCategories(componentDocs);
