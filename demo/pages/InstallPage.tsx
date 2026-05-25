import { Container, Section, Stack, Heading, Text, Label, Divider, Spacer, Image, Grid, Reveal } from "@silent-ui/react";
import { DocsLayout } from "../layout/DocsLayout";
import { CodeBlock } from "../components/CodeBlock";
import { images } from "../constants/images";

export function InstallPage() {
  return (
    <DocsLayout>
        <Container size="narrow">
          <Section>
            <Stack gap={6}>
              <div>
                <Label>Documentation</Label>
                <Spacer size={4} />
                <Heading level={1}>Installation</Heading>
                <Spacer size={4} />
                <Text variant="lg" tone="muted" leading="relaxed">
                  Install Silent UI and its peer dependencies in a few commands.
                </Text>
              </div>

              <Reveal>
                <Image
                  src={images.ink}
                  alt="Ink and paper texture"
                  aspect="wide"
                  cover
                  className="docs-hero-image"
                />
              </Reveal>

              <Divider />

              <article className="docs-article">
                <h2 className="docs-h2">Requirements</h2>
                <ul className="docs-list">
                  <li>React 18 or 19</li>
                  <li>Node.js 18+</li>
                  <li>TypeScript recommended</li>
                </ul>
              </article>

              <article className="docs-article">
                <h2 className="docs-h2">npm / yarn / pnpm</h2>
                <CodeBlock
                  language="bash"
                  code={`npm install @silent-ui/react framer-motion

# peer dependencies (if not already installed)
npm install react react-dom`}
                />
              </article>

              <article className="docs-article">
                <h2 className="docs-h2">Global styles</h2>
                <Text tone="muted" leading="relaxed">
                  Import styles once at your app root. Design tokens are available
                  via <code>--silent-*</code> CSS variables.
                </Text>
                <Spacer size={4} />
                <CodeBlock code={`// main.tsx or _app.tsx
import "@silent-ui/react/styles.css";`} />
              </article>

              <article className="docs-article">
                <h2 className="docs-h2">Recommended fonts</h2>
                <Grid cols={2} gap={8}>
                  <Text tone="muted" leading="relaxed">
                    For the full aesthetic, load Instrument Sans and Instrument Serif
                    (or your preferred typefaces) and map them to the font tokens if needed.
                  </Text>
                  <Image
                    src={images.stone}
                    alt="Stone texture"
                    aspect="square"
                    cover
                  />
                </Grid>
                <Spacer size={4} />
                <CodeBlock
                  language="html"
                  code={`<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans&family=Instrument+Serif&display=swap" rel="stylesheet" />`}
                />
              </article>

              <article className="docs-article">
                <h2 className="docs-h2">Local development</h2>
                <Text tone="muted" leading="relaxed">
                  Clone the repository and run the interactive docs site:
                </Text>
                <Spacer size={4} />
                <CodeBlock
                  language="bash"
                  code={`git clone <repo-url> silent-ui
cd silent-ui
npm install
npm run dev    # http://localhost:5173`}
                />
              </article>

              <article className="docs-article">
                <h2 className="docs-h2">Production build</h2>
                <CodeBlock
                  language="bash"
                  code={`npm run build       # library → dist/
npm run build:demo  # static docs build`}
                />
              </article>
            </Stack>
          </Section>
        </Container>
    </DocsLayout>
  );
}
