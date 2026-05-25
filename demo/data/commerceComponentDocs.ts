import type { ComponentDocMeta } from "./docTypes";

/** Commerce docs — order matches componentOrder.ts (browse → cart → checkout). */
export const commerceComponentDocs: ComponentDocMeta[] = [
  {
    id: "product-card",
    name: "ProductCard",
    category: "Commerce",
    description:
      "Catalog product tile with image, title, price, optional sale badge, rating, and add-to-cart action.",
    importLine: `import { ProductCard } from "@silent-ui/react";`,
    code: `<ProductCard
  title="Linen coat"
  price="¥24,000"
  compareAtPrice="¥32,000"
  badge="Sale"
  rating={4}
  imageSrc="/coat.jpg"
  href="/products/linen-coat"
  onAddToCart={() => addToCart("linen-coat")}
/>`,
    props: [
      { name: "title / price", type: "string", description: "Product name and display price." },
      { name: "imageSrc", type: "string", description: "Product image URL." },
      { name: "href", type: "string", description: "Link to product detail page." },
      { name: "compareAtPrice", type: "string", description: "Strikethrough original price." },
      { name: "badge", type: "string", description: "Label overlay on image (e.g. Sale, New)." },
      { name: "rating", type: "number", description: "Read-only star rating (1–5)." },
      { name: "onAddToCart", type: "() => void", description: "Shows Add button when set." },
    ],
  },
  {
    id: "product-gallery",
    name: "ProductGallery",
    category: "Commerce",
    description:
      "Product image gallery with grid, 2×2, main+thumbnails, or carousel layouts. Optional fullscreen lightbox with keyboard navigation.",
    importLine: `import { ProductGallery } from "@silent-ui/react";`,
    code: `const photos = [
  { src: "/coat-1.jpg", alt: "Front" },
  { src: "/coat-2.jpg", alt: "Detail" },
];

<ProductGallery images={photos} layout="main-thumbs" lightbox />
<ProductGallery images={photos} layout="grid-2x2" lightbox />`,
    props: [
      { name: "images", type: "ProductGalleryImage[]", description: "{ src, alt? }[]" },
      { name: "layout", type: '"grid-2x2" | "grid" | "main-thumbs" | "carousel"', default: '"main-thumbs"', description: "Gallery layout." },
      { name: "lightbox", type: "boolean", description: "Fullscreen viewer on main/grid click." },
      { name: "selectedIndex", type: "number", description: "Controlled active image (main-thumbs)." },
      { name: "onSelect", type: "(index: number) => void", description: "Selection change handler." },
      { name: "thumbCols", type: "2 | 3 | 4", default: "4", description: "Thumbnail columns for main-thumbs." },
    ],
  },
  {
    id: "rating",
    name: "Rating",
    category: "Commerce",
    description: "Star rating for reviews — interactive or read-only.",
    importLine: `import { Rating } from "@silent-ui/react";`,
    code: `<Rating value={4} onValueChange={setRating} label="4.0" />`,
    props: [
      { name: "value", type: "number", description: "Current rating." },
      { name: "onValueChange", type: "(value: number) => void", description: "Change handler (omit for read-only)." },
      { name: "max", type: "number", default: "5", description: "Star count." },
    ],
  },
  {
    id: "carousel",
    name: "Carousel",
    category: "Commerce",
    description: "Product gallery with slide track, arrows, and dot indicators.",
    importLine: `import { Carousel } from "@silent-ui/react";`,
    code: `<Carousel>
  <Image src="/1.jpg" aspect="square" />
  <Image src="/2.jpg" aspect="square" />
</Carousel>`,
    props: [
      { name: "arrows", type: "boolean", default: "true", description: "Prev/next controls." },
      { name: "dots", type: "boolean", default: "true", description: "Dot indicators." },
    ],
  },
  {
    id: "chip",
    name: "Chip",
    category: "Commerce",
    description: "Removable filter tag for active facets (size, color, etc.).",
    importLine: `import { Chip } from "@silent-ui/react";`,
    code: `<Chip label="Size M" onRemove={() => removeFilter("size")} />`,
    props: [
      { name: "label", type: "string", description: "Chip text." },
      { name: "onRemove", type: "() => void", description: "Shows remove button when set." },
      { name: "variant", type: '"soft" | "outline"', default: '"soft"', description: "Visual style." },
    ],
  },
  {
    id: "dropdown",
    name: "Dropdown",
    category: "Commerce",
    description: "Action menu anchored to a custom trigger — sort, account, filters.",
    importLine: `import { Dropdown } from "@silent-ui/react";`,
    code: `<Dropdown
  trigger={<Button variant="outline">Sort</Button>}
  items={[{ id: "new", label: "Newest" }]}
  onSelect={(id) => setSort(id)}
/>`,
    props: [
      { name: "trigger", type: "ReactNode", description: "Click target." },
      { name: "items", type: "DropdownItem[]", description: "Menu entries." },
      { name: "onSelect", type: "(id: string) => void", description: "Selection handler." },
    ],
  },
  {
    id: "pagination",
    name: "Pagination",
    category: "Commerce",
    description: "Page navigation with ellipsis for long product lists.",
    importLine: `import { Pagination } from "@silent-ui/react";`,
    code: `<Pagination page={page} totalPages={12} onPageChange={setPage} />`,
    props: [
      { name: "page", type: "number", description: "Current page (1-based)." },
      { name: "totalPages", type: "number", description: "Total page count." },
      { name: "onPageChange", type: "(page: number) => void", description: "Page change handler." },
    ],
  },
  {
    id: "quantity-input",
    name: "QuantityInput",
    category: "Commerce",
    description: "Stepper control for product quantity with min/max bounds.",
    importLine: `import { QuantityInput } from "@silent-ui/react";`,
    code: `<QuantityInput label="Qty" value={qty} onValueChange={setQty} min={1} max={10} />`,
    props: [
      { name: "value", type: "number", description: "Current quantity." },
      { name: "onValueChange", type: "(value: number) => void", description: "Change handler." },
      { name: "min / max / step", type: "number", description: "Bounds and increment." },
    ],
  },
  {
    id: "cart-item",
    name: "CartItem",
    category: "Commerce",
    description:
      "Cart line with product thumbnail, title, price, quantity stepper, and optional remove action.",
    importLine: `import { CartItem } from "@silent-ui/react";`,
    code: `<CartItem
  imageSrc="/coat.jpg"
  title="Linen coat"
  unitPrice={24000}
  quantity={qty}
  onQuantityChange={setQty}
  onRemove={() => removeLine(id)}
/>`,
    props: [
      { name: "imageSrc", type: "string", description: "Product thumbnail URL." },
      { name: "title", type: "string", description: "Product name." },
      { name: "unitPrice", type: "number", description: "Unit price. Shows line total when quantity > 1." },
      { name: "formatPrice", type: "(amount: number) => string", description: "Optional price formatter (default ¥)." },
      { name: "quantity", type: "number", description: "Current quantity." },
      { name: "onQuantityChange", type: "(n: number) => void", description: "Quantity handler." },
      { name: "onRemove", type: "() => void", description: "Shows remove control when set." },
    ],
  },
  {
    id: "cart-checkout",
    name: "CartCheckout",
    category: "Commerce",
    description:
      "Drawer footer block with a primary checkout button labeled Checkout — {total}. Optional item count in the label.",
    importLine: `import { CartCheckout } from "@silent-ui/react";`,
    code: `<Drawer
  footer={
    <CartCheckout
      total={cartTotal}
      itemCount={lineCount}
      onCheckout={() => router.push("/checkout")}
    />
  }
>
  ...
</Drawer>`,
    props: [
      { name: "total", type: "number", description: "Cart total amount." },
      { name: "onCheckout", type: "() => void", description: "Checkout click handler." },
      { name: "itemCount", type: "number", description: 'Optional: "Checkout (2) — ¥…"' },
      { name: "showSubtotal", type: "boolean", description: "Show subtotal line above the button." },
      { name: "formatPrice", type: "(amount: number) => string", description: "Custom price formatter." },
    ],
  },
  {
    id: "drawer",
    name: "Drawer",
    category: "Overlays",
    description:
      "Slide-in panel from the left or right — mobile menus, documentation sidebars, filters, or cart flows. Pair with CartItem for commerce; use bodyFlush when the panel body scrolls independently (see Recipes). Focus is trapped while open.",
    importLine: `import { Drawer, CartItem, CartCheckout } from "@silent-ui/react";`,
    code: `<Drawer
  open={open}
  onClose={close}
  title="Cart"
  footer={<CartCheckout total={cartTotal} onCheckout={goToCheckout} />}
>
  <CartItem imageSrc="/coat.jpg" title="Linen coat" unitPrice={24000} quantity={qty} onQuantityChange={setQty} />
</Drawer>`,
    props: [
      { name: "open", type: "boolean", description: "Panel visibility." },
      { name: "onClose", type: "() => void", description: "Close handler." },
      { name: "side", type: '"left" | "right"', default: '"right"', description: "Slide direction." },
      { name: "footer", type: "ReactNode", description: "Sticky footer slot (e.g. subtotal + checkout)." },
      { name: "bodyFlush", type: "boolean", description: "Let the body scroll inside the panel (long nav lists)." },
      { name: "width", type: "string", description: "Panel width (CSS value)." },
    ],
  },
  {
    id: "table",
    name: "Table",
    category: "Commerce",
    description: "Minimal data table for order history and account pages.",
    importLine: `import { Table, TableHead, TableBody, TableRow, TableCell } from "@silent-ui/react";`,
    code: `<Table>
  <TableHead>
    <TableRow>
      <TableCell header>Order</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>...</TableBody>
</Table>`,
    props: [
      { name: "compact", type: "boolean", description: "Reduced cell padding." },
      { name: "header / numeric", type: "boolean", description: "TableCell column modifiers." },
    ],
  },
];
