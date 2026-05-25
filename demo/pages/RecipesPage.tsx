import {
  Container,
  Section,
  Stack,
  Heading,
  Text,
  Label,
  Spacer,
  Divider,
} from "@silent-ui/react";
import { DocsLayout } from "../layout/DocsLayout";
import { CodeBlock } from "../components/CodeBlock";

const recipes = [
  {
    id: "site-nav-drawer",
    title: "Site navigation drawer",
    description:
      "Use Drawer on the left for mobile menus. The demo site opens a documentation drawer on /docs/* and a simpler link list elsewhere — same component, different content.",
    code: `const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)} aria-label="Open menu">☰</Button>

<Drawer
  open={open}
  onClose={() => setOpen(false)}
  title="Menu"
  side="left"
  width="min(100vw, 280px)"
>
  <nav>
    {links.map((item) => (
      <NavLink key={item.to} to={item.to} onClick={() => setOpen(false)}>
        {item.label}
      </NavLink>
    ))}
  </nav>
</Drawer>`,
  },
  {
    id: "cart-drawer",
    title: "Cart drawer with checkout footer",
    description:
      "Commerce flows pair Drawer with CartItem rows and a sticky CartCheckout footer. Set bodyFlush when the panel body should scroll independently.",
    code: `<Drawer
  open={cartOpen}
  onClose={() => setCartOpen(false)}
  title="Cart"
  side="right"
  footer={
    <CartCheckout
      total={total}
      itemCount={items.length}
      onCheckout={checkout}
    />
  }
>
  {items.map((line) => (
    <CartItem key={line.id} {...line} />
  ))}
</Drawer>`,
  },
  {
    id: "docs-layout",
    title: "Documentation layout",
    description:
      "Combine a fixed sidebar (desktop) with the same Drawer + DocsSidebarNav on small screens. Pass bodyFlush on the drawer variant so long component lists scroll inside the panel.",
    code: `<Drawer
  open={menuOpen}
  onClose={() => setMenuOpen(false)}
  title="Documentation"
  side="left"
  bodyFlush
>
  <DocsSidebarNav variant="drawer" onNavigate={() => setMenuOpen(false)} />
</Drawer>`,
  },
  {
    id: "equal-height-cards",
    title: "Equal-height card grids",
    description:
      "Marketing sections with uneven copy still align when Grid uses equalHeight — cards stretch and footers sit on the same baseline.",
    code: `<Grid cols={3} gap={8} equalHeight>
  {items.map((item) => (
    <Card key={item.id} interactive>
      <CardMedia src={item.image} alt={item.title} />
      <CardBody>
        <Heading level={3}>{item.title}</Heading>
        <Text tone="muted">{item.description}</Text>
      </CardBody>
    </Card>
  ))}
</Grid>`,
  },
];

export function RecipesPage() {
  return (
    <DocsLayout>
      <Container size="narrow">
        <Section>
          <Stack gap={4}>
            <Label>Guides</Label>
            <Heading level={1}>Recipes</Heading>
            <Text variant="lg" tone="muted" leading="relaxed">
              Composed patterns built from Silent UI primitives — copy, adapt, and
              combine them in your own projects.
            </Text>
          </Stack>
          <Spacer size={10} />
          <Divider />
          <Spacer size={10} />

          <Stack gap={16}>
            {recipes.map((recipe) => (
              <section key={recipe.id} id={recipe.id} className="recipe-section">
                <Heading level={2}>{recipe.title}</Heading>
                <Text tone="muted" leading="relaxed" className="recipe-desc">
                  {recipe.description}
                </Text>
                <Spacer size={4} />
                <CodeBlock code={recipe.code} />
              </section>
            ))}
          </Stack>
        </Section>
      </Container>
    </DocsLayout>
  );
}
