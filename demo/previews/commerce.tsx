import { useState, type ReactElement } from "react";
import {
  Button,
  CartCheckout,
  CartItem,
  Carousel,
  Chip,
  Drawer,
  Dropdown,
  Grid,
  Image,
  Pagination,
  ProductCard,
  ProductGallery,
  type ProductGalleryLayout,
  QuantityInput,
  Rating,
  Stack,
  Tab,
  TabPanel,
  Tabs,
  TabsList,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Text,
  useToast,
} from "@silent-ui/react";
import { copy } from "../constants/previewCopy";
import { images } from "../constants/images";

const galleryImages = [
  { src: images.stone, alt: "Stone texture" },
  { src: images.temple, alt: "Temple in mist" },
  { src: images.garden, alt: "Garden path" },
  { src: images.workspace, alt: "Calm workspace" },
];

export function ProductGalleryPreview(): ReactElement {
  const [layout, setLayout] = useState<ProductGalleryLayout>("main-thumbs");

  return (
    <div className="product-gallery-preview">
      <Tabs
        value={layout}
        onValueChange={(v) => setLayout(v as ProductGalleryLayout)}
        defaultValue="main-thumbs"
      >
        <TabsList>
          <Tab value="main-thumbs">{copy.gallery.mainThumbs}</Tab>
          <Tab value="grid-2x2">{copy.gallery.grid2x2}</Tab>
          <Tab value="grid">{copy.gallery.grid}</Tab>
          <Tab value="carousel">{copy.gallery.carousel}</Tab>
        </TabsList>
        <TabPanel value="main-thumbs">
          <Stack gap={3}>
            <Text variant="sm" tone="muted">{copy.gallery.captions.mainThumbs}</Text>
            <ProductGallery
              images={galleryImages}
              layout="main-thumbs"
              lightbox
            />
          </Stack>
        </TabPanel>
        <TabPanel value="grid-2x2">
          <Stack gap={3}>
            <Text variant="sm" tone="muted">{copy.gallery.captions.grid}</Text>
            <ProductGallery
              images={galleryImages}
              layout="grid-2x2"
              lightbox
            />
          </Stack>
        </TabPanel>
        <TabPanel value="grid">
          <Stack gap={3}>
            <Text variant="sm" tone="muted">{copy.gallery.captions.grid}</Text>
            <ProductGallery images={galleryImages} layout="grid" lightbox />
          </Stack>
        </TabPanel>
        <TabPanel value="carousel">
          <Stack gap={3}>
            <Text variant="sm" tone="muted">{copy.gallery.carousel} layout with lightbox.</Text>
            <ProductGallery
              images={galleryImages}
              layout="carousel"
              lightbox
            />
          </Stack>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export function ProductCardPreview(): ReactElement {
  const { toast } = useToast();
  return (
    <div className="product-card-preview">
      <Grid cols={2} gap={6}>
        <ProductCard
          title={copy.products.linenCoat.title}
          price="¥24,000"
          compareAtPrice="¥32,000"
          badge={copy.products.linenCoat.badge}
          rating={4}
          imageSrc={images.architecture}
          imageAlt={copy.products.linenCoat.alt}
          onAddToCart={() =>
            toast({
              title: copy.cart.checkoutToast,
              description: `${copy.products.linenCoat.title} — ¥24,000`,
            })
          }
        />
        <ProductCard
          title={copy.products.stoneVase.title}
          price="¥12,500"
          badge={copy.products.stoneVase.badge}
          imageSrc={images.stone}
          imageAlt={copy.products.stoneVase.alt}
          href="/products/vase"
        />
      </Grid>
    </div>
  );
}

export function DrawerPreview(): ReactElement {
  const [open, setOpen] = useState(false);
  const [coatQty, setCoatQty] = useState(2);
  const [vaseQty, setVaseQty] = useState(1);

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        {copy.cart.open}
      </Button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title={copy.cart.title}
        footer={
          <CartCheckout
            total={24000 * coatQty + 12500 * vaseQty}
            itemCount={(coatQty > 0 ? 1 : 0) + (vaseQty > 0 ? 1 : 0)}
            onCheckout={() => setOpen(false)}
          />
        }
      >
        <Stack gap={5}>
          <CartItem
            imageSrc={images.architecture}
            imageAlt={copy.products.linenCoat.alt}
            title={copy.products.linenCoat.title}
            unitPrice={24000}
            quantity={coatQty}
            onQuantityChange={setCoatQty}
            onRemove={() => setCoatQty(0)}
          />
          <CartItem
            imageSrc={images.stone}
            imageAlt={copy.products.stoneVase.alt}
            title={copy.products.stoneVase.title}
            unitPrice={12500}
            quantity={vaseQty}
            onQuantityChange={setVaseQty}
            onRemove={() => setVaseQty(0)}
          />
        </Stack>
      </Drawer>
    </>
  );
}

export function QuantityInputPreview(): ReactElement {
  const [qty, setQty] = useState(1);
  return (
    <QuantityInput label="Quantity" value={qty} onValueChange={setQty} max={9} />
  );
}

export function PaginationPreview(): ReactElement {
  const [page, setPage] = useState(1);
  return <Pagination page={page} totalPages={8} onPageChange={setPage} />;
}

export function DropdownPreview(): ReactElement {
  const [sort, setSort] = useState("featured");
  return (
    <Dropdown
      trigger={<Button variant="outline">Sort: {sort}</Button>}
      selectedId={sort}
      items={[
        { id: "featured", label: copy.sort.featured },
        { id: "price", label: copy.sort.price },
        { id: "newest", label: copy.sort.newest },
      ]}
      onSelect={setSort}
    />
  );
}

export function RatingPreview(): ReactElement {
  const [rating, setRating] = useState(4);
  return (
    <Rating value={rating} onValueChange={setRating} label={`${rating}.0`} />
  );
}

export function ChipPreview(): ReactElement {
  const [filters, setFilters] = useState([...copy.filters]);
  return (
    <Stack direction="row" gap={2} style={{ flexWrap: "wrap" }}>
      {filters.map((label) => (
        <Chip
          key={label}
          label={label}
          onRemove={() => setFilters((prev) => prev.filter((x) => x !== label))}
        />
      ))}
    </Stack>
  );
}

export function CarouselPreview(): ReactElement {
  return (
    <Carousel style={{ maxWidth: 280 }}>
      <Image src={images.stone} alt="Linen coat" aspect="square" reveal={false} />
      <Image src={images.temple} alt="Stone vase" aspect="square" reveal={false} />
      <Image src={images.garden} alt="Garden path" aspect="square" reveal={false} />
    </Carousel>
  );
}

export function TablePreview(): ReactElement {
  return (
    <Table compact style={{ maxWidth: 420 }}>
      <TableHead>
        <TableRow>
          <TableCell header>{copy.table.order}</TableCell>
          <TableCell header>{copy.table.date}</TableCell>
          <TableCell header numeric>{copy.table.total}</TableCell>
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
    </Table>
  );
}

export function CartCheckoutPreview(): ReactElement {
  return (
    <CartCheckout total={36500} itemCount={2} onCheckout={() => {}} />
  );
}

export function CartItemPreview(): ReactElement {
  const [qty, setQty] = useState(1);
  return (
    <div style={{ maxWidth: 360 }}>
      <CartItem
        imageSrc={images.architecture}
        title={copy.products.linenCoat.title}
        unitPrice={24000}
        quantity={qty}
        onQuantityChange={setQty}
        onRemove={() => setQty(0)}
      />
    </div>
  );
}

export const commercePreviews = {
  "product-gallery": ProductGalleryPreview,
  "product-card": ProductCardPreview,
  "cart-item": CartItemPreview,
  "cart-checkout": CartCheckoutPreview,
  drawer: DrawerPreview,
  "quantity-input": QuantityInputPreview,
  pagination: PaginationPreview,
  dropdown: DropdownPreview,
  rating: RatingPreview,
  chip: ChipPreview,
  carousel: CarouselPreview,
  table: TablePreview,
} as const;
