/** Code snippets shown in docs — kept in sync with demo/previews. */
export const componentCode: Record<string, string> = {
  "silent-provider": `import { SilentProvider } from "@silent-ui/react";

<SilentProvider defaultTheme="light">
  <App />
</SilentProvider>`,

  button: `import { Button, Stack } from "@silent-ui/react";

<Stack direction="row" gap={4} align="center">
  <Button variant="ghost" icon="→">Explore</Button>
  <Button variant="primary">Get started</Button>
  <Button variant="outline">Docs</Button>
</Stack>`,

  link: `import { Link } from "@silent-ui/react";

<Link href="/docs/components">Browse components →</Link>`,

  "icon-button": `import { IconButton, Stack } from "@silent-ui/react";

<Stack direction="row" gap={3}>
  <IconButton icon="↑" aria-label="Scroll to top" variant="outline" />
  <IconButton icon="×" aria-label="Close" />
</Stack>`,

  text: `import { Heading, Text, Label, Stack } from "@silent-ui/react";

<Stack gap={3}>
  <Heading level={3}>Silence speaks</Heading>
  <Text tone="muted">Minimal components with deliberate motion.</Text>
  <Label>Design system</Label>
</Stack>`,

  layout: `import { Stack, Grid, Divider } from "@silent-ui/react";

<Stack gap={4}>
  <Grid cols={3} gap={4}>
    <div className="preview-box">Layout</div>
    <div className="preview-box">Grid</div>
    <div className="preview-box">Stack</div>
  </Grid>
  <Divider />
</Stack>`,

  card: `import { Card, CardMedia, CardBody, Grid, Stack, Heading, Text } from "@silent-ui/react";

<Grid cols={2} gap={6} equalHeight style={{ maxWidth: "40rem" }}>
  <Card interactive>
    <CardMedia src="/ma.jpg" alt="間 — Ma" />
    <CardBody>
      <Stack gap={3}>
        <Heading level={4}>間 — Ma</Heading>
        <Text variant="sm" tone="muted">Negative space as an active element.</Text>
      </Stack>
    </CardBody>
  </Card>
  <Card interactive>
    <CardMedia src="/sei.jpg" alt="静 — Sei" />
    <CardBody>
      <Stack gap={3}>
        <Heading level={4}>静 — Sei</Heading>
        <Text variant="sm" tone="muted">
          Slow, deliberate transitions across the library.
        </Text>
      </Stack>
    </CardBody>
  </Card>
</Grid>`,

  input: `import { Input, Textarea, Stack } from "@silent-ui/react";

<Stack gap={4} style={{ maxWidth: 320 }}>
  <Input label="Email" type="email" placeholder="hello@studio.example" />
  <Textarea label="Message" placeholder="Tell us about your project…" rows={2} />
</Stack>`,

  "search-input": `import { useState } from "react";
import { SearchInput } from "@silent-ui/react";

const [query, setQuery] = useState("");

<SearchInput
  placeholder="Search components…"
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  onClear={() => setQuery("")}
/>`,

  "date-input": `import { useState } from "react";
import { DateInput } from "@silent-ui/react";

const [date, setDate] = useState("");

<DateInput
  label="Ship date"
  value={date}
  onValueChange={setDate}
  min="2024-01-01"
  hint="Select a delivery date"
/>`,

  "time-input": `import { useState } from "react";
import { TimeInput } from "@silent-ui/react";

const [time, setTime] = useState("");

<TimeInput
  label="Pickup time"
  value={time}
  onValueChange={setTime}
  min="09:00"
  max="18:00"
  hint="Studio hours 9:00–18:00"
/>`,

  select: `import { useState } from "react";
import { Select } from "@silent-ui/react";

const [value, setValue] = useState("light");

<Select
  label="Theme"
  value={value}
  onValueChange={setValue}
  options={[
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
    { value: "system", label: "System" },
  ]}
/>`,

  switch: `import { useState } from "react";
import { Switch } from "@silent-ui/react";

const [on, setOn] = useState(false);

<Switch
  label="Reduced motion"
  checked={on}
  onChange={(e) => setOn(e.target.checked)}
/>`,

  checkbox: `import { Checkbox } from "@silent-ui/react";

<Checkbox label="Respect prefers-reduced-motion" defaultChecked />`,

  radio: `import { useState } from "react";
import { Radio, RadioGroup } from "@silent-ui/react";

const [value, setValue] = useState("light");

<RadioGroup name="theme" value={value} onValueChange={setValue} label="Default theme">
  <Radio value="light" label="Light" />
  <Radio value="dark" label="Dark" />
</RadioGroup>`,

  badge: `import { Badge, Stack } from "@silent-ui/react";

<Stack direction="row" gap={3}>
  <Badge dot>New</Badge>
  <Badge variant="solid">Sale</Badge>
  <Badge variant="outline">Limited</Badge>
</Stack>`,

  avatar: `import { Avatar, AvatarGroup } from "@silent-ui/react";

<AvatarGroup>
  <Avatar name="Yuki Tanaka" />
  <Avatar name="Mina Sato" />
  <Avatar src="/portrait.jpg" alt="Contributor portrait" />
</AvatarGroup>`,

  alert: `import { Alert } from "@silent-ui/react";

<Alert title="Theme applied" variant="info">
  Light mode is active. Toggle in the site header.
</Alert>`,

  progress: `import { Progress } from "@silent-ui/react";

<Progress value={65} label="Documentation" showValue />`,

  skeleton: `import { Skeleton, Stack } from "@silent-ui/react";

<Stack gap={3} style={{ maxWidth: 280 }}>
  <Skeleton variant="title" />
  <Skeleton variant="text" />
  <Skeleton variant="text" style={{ width: "70%" }} />
</Stack>`,

  spinner: `import { Spinner } from "@silent-ui/react";

<Spinner size="md" />`,

  toast: `import { ToastProvider, useToast, Button } from "@silent-ui/react";

<ToastProvider>
  <App />
</ToastProvider>

const { toast } = useToast();

<Button
  variant="outline"
  onClick={() =>
    toast({
      title: "Saved",
      description: "Your theme preference was updated.",
    })
  }
>
  Show toast
</Button>`,

  tabs: `import { Tabs, TabsList, Tab, TabPanel, Text } from "@silent-ui/react";

<Tabs defaultValue="overview">
  <TabsList>
    <Tab value="overview">Overview</Tab>
    <Tab value="props">Props</Tab>
    <Tab value="recipes">Recipes</Tab>
  </TabsList>
  <TabPanel value="overview">
    <Text variant="sm" tone="muted">Live previews mirror the code blocks below.</Text>
  </TabPanel>
  <TabPanel value="props">
    <Text variant="sm" tone="muted">TypeScript-friendly prop tables for each component.</Text>
  </TabPanel>
  <TabPanel value="recipes">
    <Text variant="sm" tone="muted">Composed patterns on the Recipes page.</Text>
  </TabPanel>
</Tabs>`,

  accordion: `import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@silent-ui/react";

<Accordion type="single" defaultValue="motion">
  <AccordionItem value="motion">
    <AccordionTrigger value="motion">Motion tokens</AccordionTrigger>
    <AccordionContent value="motion">
      Export easing curves and variants, or use Fade, Reveal, and Stagger.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="theming">
    <AccordionTrigger value="theming">Theming</AccordionTrigger>
    <AccordionContent value="theming">
      Override --silent-* variables on :root or [data-silent-theme="dark"].
    </AccordionContent>
  </AccordionItem>
</Accordion>`,

  breadcrumb: `import { Breadcrumb } from "@silent-ui/react";

<Breadcrumb
  items={[
    { label: "Home", href: "/" },
    { label: "Components", href: "/docs/components" },
    { label: "Button" },
  ]}
/>`,

  scrollbar: `import { Scrollbar } from "@silent-ui/react";

<Scrollbar orientation="vertical" size="thin" style={{ height: 320 }}>
  <nav>
    <p>Installation guide</p>
    <p>Getting started</p>
    <p>Component reference</p>
  </nav>
</Scrollbar>`,

  nav: `import { Nav } from "@silent-ui/react";

<Nav logo="Silent" logoHref="/" actions={<ThemeToggle />}>
  <a href="/docs/install">Install</a>
  <a href="/docs/components">Components</a>
</Nav>`,

  tooltip: `import { Tooltip, Button } from "@silent-ui/react";

<Tooltip content="Calibrated easing: cubic-bezier(0.16, 1, 0.3, 1)">
  <Button variant="outline">Hover me</Button>
</Tooltip>`,

  modal: `import { useState } from "react";
import { Modal, Button, Text, Spacer } from "@silent-ui/react";

const [open, setOpen] = useState(false);

<>
  <Button variant="primary" onClick={() => setOpen(true)}>
    Open dialog
  </Button>
  <Modal open={open} onClose={() => setOpen(false)} title="Confirm action">
    <Text tone="muted">Focus is trapped until you close or press Escape.</Text>
    <Spacer size={4} />
    <Button variant="ghost" onClick={() => setOpen(false)}>
      Cancel
    </Button>
  </Modal>
</>`,

  image: `import { Image } from "@silent-ui/react";

<Image
  src="/garden.jpg"
  alt="Japanese garden path"
  aspect="square"
  style={{ maxWidth: 240 }}
/>`,

  fade: `import { Fade, Text } from "@silent-ui/react";

<Fade>
  <Text>Content reveals on scroll with a single easing curve.</Text>
</Fade>`,

  reveal: `import { Reveal, Heading } from "@silent-ui/react";

<Reveal>
  <Heading level={4}>Silence speaks</Heading>
</Reveal>`,

  stagger: `import { Stagger, StaggerItem, Stack } from "@silent-ui/react";

<Stagger>
  <Stack gap={2}>
    {["Fade", "Reveal", "Stagger"].map((label) => (
      <StaggerItem key={label}>
        <div className="preview-box">{label}</div>
      </StaggerItem>
    ))}
  </Stack>
</Stagger>`,

  "hover-lift": `import { HoverLift } from "@silent-ui/react";

<HoverLift>
  <div className="preview-box">Hover to lift</div>
</HoverLift>`,

  "product-gallery": `import { ProductGallery } from "@silent-ui/react";

const images = [
  { src: "/coat.jpg", alt: "Linen coat" },
  { src: "/vase.jpg", alt: "Stone vase" },
  { src: "/garden.jpg", alt: "Garden path" },
];

<ProductGallery images={images} layout="main-thumbs" lightbox />`,

  "product-card": `import { ProductCard, Grid } from "@silent-ui/react";

<Grid cols={2} gap={6}>
  <ProductCard
    title="Linen coat"
    price="¥24,000"
    compareAtPrice="¥32,000"
    badge="New"
    rating={4}
    imageSrc="/coat.jpg"
    onAddToCart={() => {}}
  />
  <ProductCard
    title="Stone vase"
    price="¥12,500"
    badge="Limited"
    imageSrc="/vase.jpg"
    href="/products/vase"
  />
</Grid>`,

  "cart-item": `import { useState } from "react";
import { CartItem } from "@silent-ui/react";

const [qty, setQty] = useState(1);

<CartItem
  imageSrc="/coat.jpg"
  title="Linen coat"
  unitPrice={24000}
  quantity={qty}
  onQuantityChange={setQty}
  onRemove={() => setQty(0)}
/>`,

  "cart-checkout": `import { CartCheckout } from "@silent-ui/react";

<CartCheckout total={36500} itemCount={2} onCheckout={() => {}} />`,

  drawer: `import { useState } from "react";
import {
  Drawer,
  CartItem,
  CartCheckout,
  Button,
  Stack,
} from "@silent-ui/react";

const [open, setOpen] = useState(false);

<>
  <Button variant="outline" onClick={() => setOpen(true)}>
    Open cart
  </Button>
  <Drawer
    open={open}
    onClose={() => setOpen(false)}
    title="Cart (2)"
    footer={<CartCheckout total={60500} itemCount={2} onCheckout={() => setOpen(false)} />}
  >
    <Stack gap={5}>
      <CartItem
        imageSrc="/coat.jpg"
        title="Linen coat"
        unitPrice={24000}
        quantity={2}
        onQuantityChange={setCoatQty}
      />
      <CartItem
        imageSrc="/vase.jpg"
        title="Stone vase"
        unitPrice={12500}
        quantity={1}
        onQuantityChange={setVaseQty}
      />
    </Stack>
  </Drawer>
</>`,

  "quantity-input": `import { useState } from "react";
import { QuantityInput } from "@silent-ui/react";

const [qty, setQty] = useState(1);

<QuantityInput label="Quantity" value={qty} onValueChange={setQty} max={9} />`,

  pagination: `import { useState } from "react";
import { Pagination } from "@silent-ui/react";

const [page, setPage] = useState(1);

<Pagination page={page} totalPages={8} onPageChange={setPage} />`,

  dropdown: `import { useState } from "react";
import { Dropdown, Button } from "@silent-ui/react";

const [sort, setSort] = useState("featured");

<Dropdown
  trigger={<Button variant="outline">Sort: {sort}</Button>}
  selectedId={sort}
  items={[
    { id: "featured", label: "Featured" },
    { id: "price", label: "Price" },
    { id: "newest", label: "Newest" },
  ]}
  onSelect={setSort}
/>`,

  rating: `import { useState } from "react";
import { Rating } from "@silent-ui/react";

const [rating, setRating] = useState(4);

<Rating value={rating} onValueChange={setRating} label={\`\${rating}.0\`} />`,

  chip: `import { useState } from "react";
import { Chip, Stack } from "@silent-ui/react";

const [filters, setFilters] = useState(["Linen", "Stone"]);

<Stack direction="row" gap={2} style={{ flexWrap: "wrap" }}>
  {filters.map((label) => (
    <Chip
      key={label}
      label={label}
      onRemove={() => setFilters((prev) => prev.filter((x) => x !== label))}
    />
  ))}
</Stack>`,

  carousel: `import { Carousel, Image } from "@silent-ui/react";

<Carousel style={{ maxWidth: 280 }}>
  <Image src="/coat.jpg" alt="Linen coat" aspect="square" reveal={false} />
  <Image src="/vase.jpg" alt="Stone vase" aspect="square" reveal={false} />
  <Image src="/garden.jpg" alt="Garden path" aspect="square" reveal={false} />
</Carousel>`,

  table: `import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@silent-ui/react";

<Table compact>
  <TableHead>
    <TableRow>
      <TableCell header>Order</TableCell>
      <TableCell header>Date</TableCell>
      <TableCell header numeric>Total</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell>#1042</TableCell>
      <TableCell>2025-03-12</TableCell>
      <TableCell numeric>¥18,400</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>#1041</TableCell>
      <TableCell>2025-02-28</TableCell>
      <TableCell numeric>¥9,200</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
};
