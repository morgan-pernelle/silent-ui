import { Container, Section, Stack, Heading, Text, Label, Divider, Spacer, Button, Image, Reveal } from "@silent-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { DocsLayout } from "../layout/DocsLayout";
import { CodeBlock } from "../components/CodeBlock";
import { images } from "../constants/images";
import { installSnippet, packageMeta } from "../constants/packageMeta";

export function GettingStartedPage() {
  return (
    <DocsLayout>
        <Container size="narrow">
          <Section>
            <Stack gap={6}>
              <div>
                <Label>Documentation</Label>
                <Spacer size={4} />
                <Heading level={1}>Getting Started</Heading>
                <Spacer size={4} />
                <Text variant="lg" tone="muted" leading="relaxed">
                  Install <code>{packageMeta.name}</code> from npm, wrap your app, and
                  compose your first screen in a few minutes.
                </Text>
              </div>

              <Reveal>
                <Image
                  src={images.temple}
                  alt="Japanese temple in mist"
                  aspect="wide"
                  cover
                  className="docs-hero-image"
                />
              </Reveal>

              <Divider />

              <article className="docs-article">
                <h2 className="docs-h2">1. Install the package</h2>
                <Text tone="muted" leading="relaxed">
                  Published on npm — see{" "}
                  <RouterLink to="/docs/install" className="docs-inline-link">
                    Installation
                  </RouterLink>{" "}
                  for yarn, pnpm, fonts, and peer dependency details.
                </Text>
                <Spacer size={4} />
                <CodeBlock language="bash" code={installSnippet} />
              </article>

              <article className="docs-article">
                <h2 className="docs-h2">2. Wrap your application</h2>
                <Text tone="muted" leading="relaxed">
                  <code>SilentProvider</code> applies the theme, loads global styles, and
                  exposes context for <code>useSilentTheme</code>.
                </Text>
                <Spacer size={4} />
                <CodeBlock code={`import { SilentProvider } from "@silent-ui/react";
import "@silent-ui/react/styles.css";

export default function App() {
  return (
    <SilentProvider defaultTheme="light">
      <YourApp />
    </SilentProvider>
  );
}`} />
              </article>

              <article className="docs-article">
                <h2 className="docs-h2">3. Use your first components</h2>
                <CodeBlock code={`import { Heading, Text, Button, Fade, Stack } from "@silent-ui/react";

export function Hero() {
  return (
    <Fade>
      <Stack gap={6}>
        <Heading level={1}>Silence speaks.</Heading>
        <Text variant="lg" tone="muted">
          Minimal. Intentional. Fluid.
        </Text>
        <Button variant="primary" icon="→">
          Get started
        </Button>
      </Stack>
    </Fade>
  );
}`} />
              </article>

              <article className="docs-article">
                <h2 className="docs-h2">4. Light / dark theme</h2>
                <CodeBlock code={`import { useSilentTheme } from "@silent-ui/react";

function ThemeToggle() {
  const { theme, setTheme } = useSilentTheme();
  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      {theme === "light" ? "Dark" : "Light"}
    </button>
  );
}`} />
              </article>

              <article className="docs-article">
                <h2 className="docs-h2">5. Scroll animations</h2>
                <Text tone="muted" leading="relaxed">
                  Motion components use Framer Motion with calibrated easing curves.
                  <code>prefers-reduced-motion</code> is respected automatically.
                </Text>
                <Spacer size={4} />
                <CodeBlock code={`import { Reveal, Stagger, StaggerItem } from "@silent-ui/react";

<Stagger>
  {projects.map((p) => (
    <StaggerItem key={p.id}>
      <Reveal direction="up">
        <ProjectCard {...p} />
      </Reveal>
    </StaggerItem>
  ))}
</Stagger>`} />
              </article>

              <article className="docs-article">
                <h2 className="docs-h2">6. Toasts & feedback</h2>
                <CodeBlock code={`import { ToastProvider, useToast } from "@silent-ui/react";

// Root
<ToastProvider>
  <App />
</ToastProvider>

// Child component
const { toast } = useToast();
toast({ title: "Saved", description: "Project created." });`} />
              </article>

              <article className="docs-article">
                <h2 className="docs-h2">7. Customize tokens</h2>
                <Text tone="muted" leading="relaxed">
                  Override CSS variables on <code>:root</code> or{" "}
                  <code>[data-silent-theme="dark"]</code> to match your brand without
                  forking the library.
                </Text>
                <Spacer size={4} />
                <CodeBlock
                  language="css"
                  code={`:root {
  --silent-color-paper: #faf9f6;
  --silent-color-ink: #111111;
  --silent-font-sans: "Your Font", sans-serif;
}`}
                />
              </article>

              <Stack direction="row" gap={4}>
                <RouterLink to="/docs/components">
                  <Button variant="primary" icon="→">
                    Browse components
                  </Button>
                </RouterLink>
                <RouterLink to="/docs/install">
                  <Button variant="ghost">Installation</Button>
                </RouterLink>
              </Stack>
            </Stack>
          </Section>
        </Container>
    </DocsLayout>
  );
}
