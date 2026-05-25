import {
  Container,
  Section,
  Stack,
  Grid,
  Spacer,
  Divider,
  Heading,
  Text,
  Label,
  Button,
  Image,
  Fade,
  Reveal,
} from "@silent-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { images } from "../constants/images";

const pillars = [
  {
    kanji: "間",
    title: "Ma — negative space",
    body: "Whitespace is not empty. It frames content, guides the eye, and gives components room to breathe. Silent UI treats spacing as a first-class design token.",
  },
  {
    kanji: "静",
    title: "Sei — deliberate calm",
    body: "Motion is slow and intentional. Transitions use a single easing curve across the library. When users prefer reduced motion, animations step aside.",
  },
  {
    kanji: "質",
    title: "Shitsu — quiet quality",
    body: "Typography, borders, and focus states stay restrained. Details should feel effortless — never decorative for decoration's sake.",
  },
];

export function AboutPage() {
  return (
    <>
      <Section size="lg">
        <Container size="narrow">
          <Fade>
            <Stack gap={6}>
              <Label>About</Label>
              <Heading level={1}>Silence speaks.</Heading>
              <Text variant="lg" tone="muted" leading="relaxed">
                Silent UI is a minimal React component library inspired by Japanese
                aesthetics and the calm, award-winning sites you find on portfolios
                and editorial brands — not dashboards shouting for attention.
              </Text>
            </Stack>
          </Fade>
        </Container>
      </Section>

      <Divider />

      <Section>
        <Container>
          <Grid cols={2} gap={10} className="about-grid">
            <Reveal direction="left">
              <Image
                src={images.temple}
                alt="Quiet temple architecture"
                aspect="portrait"
                cover
                className="about-hero-image"
              />
            </Reveal>
            <Reveal delay={0.1}>
              <Stack gap={5} justify="center">
                <Label>The idea</Label>
                <Heading level={2}>Less UI, more intent</Heading>
                <Text tone="muted" leading="relaxed">
                  Most libraries ship everything. Silent UI ships what you need for
                  refined marketing sites, documentation, and light commerce — with
                  consistent motion, accessible overlays, and CSS variables you can
                  theme without fighting the defaults.
                </Text>
                <Text tone="muted" leading="relaxed">
                  The demo site you are browsing is built with the same components
                  exported from the package: cards, navigation, drawers, forms, and
                  commerce patterns for carts and product pages.
                </Text>
              </Stack>
            </Reveal>
          </Grid>
        </Container>
      </Section>

      <Divider />

      <Section>
        <Container>
          <Stack gap={4}>
            <Label>Principles</Label>
            <Heading level={2}>Three words that guide every component</Heading>
          </Stack>
          <Spacer size={8} />
          <Grid cols={3} gap={8}>
            {pillars.map((pillar, index) => (
              <Reveal key={pillar.kanji} delay={index * 0.08}>
                <Stack gap={4} className="about-pillar">
                  <span className="about-kanji" aria-hidden>
                    {pillar.kanji}
                  </span>
                  <Heading level={3}>{pillar.title}</Heading>
                  <Text tone="muted" leading="relaxed">
                    {pillar.body}
                  </Text>
                </Stack>
              </Reveal>
            ))}
          </Grid>
        </Container>
      </Section>

      <Divider />

      <Section>
        <Container size="narrow">
          <Stack gap={6} align="center" className="about-cta">
            <Heading level={2}>Explore the library</Heading>
            <Text tone="muted" leading="relaxed" style={{ textAlign: "center" }}>
              Read the installation guide, browse live component previews, or try
              composed patterns in the recipes section.
            </Text>
            <Stack direction="row" gap={6} align="center">
              <RouterLink to="/docs/install">
                <Button variant="primary" icon="→">
                  Install
                </Button>
              </RouterLink>
              <RouterLink to="/docs/components">
                <Button variant="ghost" icon="→">
                  Components
                </Button>
              </RouterLink>
              <RouterLink to="/docs/recipes">
                <Button variant="ghost" icon="→">
                  Recipes
                </Button>
              </RouterLink>
            </Stack>
          </Stack>
        </Container>
      </Section>
    </>
  );
}
