import { Link as RouterLink } from "react-router-dom";
import { AppLink } from "../components/AppLink";
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
  Card,
  CardMedia,
  CardBody,
  Image,
  Fade,
  Reveal,
  Stagger,
  StaggerItem,
  HoverLift,
} from "@silent-ui/react";
import { images } from "../constants/images";
import { componentDocs } from "../data/componentDocs";

/** Homepage principle cards — site content aligned with previewCopy. */
const principles = [
  {
    id: "ma",
    title: "間 — Ma",
    desc: "Negative space as an active design element.",
    image: images.hero,
  },
  {
    id: "silence",
    title: "静 — Silence",
    desc: "Slow animations, deliberate transitions, nothing superfluous.",
    image: images.temple,
  },
  {
    id: "quality",
    title: "質 — Quality",
    desc: "Refined typography and details that feel effortless.",
    image: images.garden,
  },
];

export function HomePage() {
  return (
    <>
      <Section size="lg" className="hero-section">
        <div className="hero-gradient" aria-hidden />
        <Container>
          <Grid cols={2} gap={10} className="hero-grid">
            <Fade>
              <Stack gap={6}>
                <Label>Design System</Label>
                <Heading level={1}>
                  Silence
                  <br />
                  speaks.
                </Heading>
                <Text
                  variant="lg"
                  tone="muted"
                  leading="relaxed"
                  style={{ maxWidth: "36rem" }}
                >
                  A minimal React UI library inspired by Japanese design and
                  award-winning web experiences.
                </Text>
                <Stack direction="row" gap={6} align="center">
                  <RouterLink to="/docs/getting-started">
                    <Button variant="primary" icon="→">
                      Get started
                    </Button>
                  </RouterLink>
                  <AppLink to="/docs/components">Components</AppLink>
                </Stack>
              </Stack>
            </Fade>
            <Reveal delay={0.1}>
              <Image
                src={images.architecture}
                alt="Minimal architecture"
                aspect="portrait"
                cover
                className="hero-image"
              />
            </Reveal>
          </Grid>
        </Container>
      </Section>

      <Divider />

      <Section>
        <Container>
          <Reveal>
            <Stack gap={4}>
              <Label>Selected work</Label>
              <Heading level={2}>Principles</Heading>
            </Stack>
          </Reveal>
          <Spacer size={10} />
          <Stagger>
            <Grid cols={3} gap={8} equalHeight>
              {principles.map((work) => (
                <StaggerItem key={work.id}>
                  <HoverLift>
                    <Card interactive>
                      <CardMedia src={work.image} alt={work.title} />
                      <CardBody>
                        <Stack gap={3}>
                          <Heading level={3}>{work.title}</Heading>
                          <Text tone="muted">{work.desc}</Text>
                        </Stack>
                      </CardBody>
                    </Card>
                  </HoverLift>
                </StaggerItem>
              ))}
            </Grid>
          </Stagger>
        </Container>
      </Section>

      <Divider />

      <Section>
        <Container>
          <Grid cols={2} gap={10}>
            <Reveal direction="left">
              <Image
                src={images.workspace}
                alt="Calm workspace"
                aspect="wide"
                cover
              />
            </Reveal>
            <Reveal delay={0.15}>
              <Stack gap={5} justify="center" style={{ height: "100%" }}>
                <Label>Documentation</Label>
                <Heading level={2}>
                  {componentDocs.length} components. One language.
                </Heading>
                <Text tone="muted" leading="relaxed">
                  From SilentProvider to HoverLift — everything is documented
                  with live previews, code snippets, and prop tables.
                </Text>
                <RouterLink to="/docs/install">
                  <Button variant="ghost" icon="→">
                    Read the docs
                  </Button>
                </RouterLink>
              </Stack>
            </Reveal>
          </Grid>
        </Container>
      </Section>
    </>
  );
}
