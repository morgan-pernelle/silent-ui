import { Container, Section, Stack, Heading, Text, Label, Divider, Spacer, Image, Grid, Reveal } from "@silent-ui/react";
import { DocsLayout } from "../layout/DocsLayout";
import { CodeBlock } from "../components/CodeBlock";
import { images } from "../constants/images";
import {
  installSnippet,
  installSnippetPnpm,
  installSnippetYarn,
  packageMeta,
} from "../constants/packageMeta";

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
                  Install <code>{packageMeta.name}</code> (v{packageMeta.version}) and
                  its runtime dependencies in your React app.{" "}
                  <a
                    href={packageMeta.npmUrl}
                    className="docs-inline-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on npm
                  </a>
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
                <h2 className="docs-h2">Install in your project</h2>
                <Text tone="muted" leading="relaxed">
                  <code>framer-motion</code> is required for animations. React and
                  React DOM are peer dependencies.
                </Text>
                <Spacer size={4} />
                <Label>npm</Label>
                <Spacer size={2} />
                <CodeBlock language="bash" code={installSnippet} />
                <Spacer size={6} />
                <Label>yarn</Label>
                <Spacer size={2} />
                <CodeBlock language="bash" code={installSnippetYarn} />
                <Spacer size={6} />
                <Label>pnpm</Label>
                <Spacer size={2} />
                <CodeBlock language="bash" code={installSnippetPnpm} />
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
                <h2 className="docs-h2">Run the documentation site locally</h2>
                <Text tone="muted" leading="relaxed">
                  Clone the repository to preview this site on your machine:
                </Text>
                <Spacer size={4} />
                <CodeBlock
                  language="bash"
                  code={`${packageMeta.repoClone}
cd silent-ui
npm install
npm run dev    # http://localhost:5173`}
                />
              </article>

              <article className="docs-article">
                <h2 className="docs-h2">Build from source</h2>
                <Text tone="muted" leading="relaxed">
                  When working from the repository, build the library or the static
                  documentation site:
                </Text>
                <Spacer size={4} />
                <CodeBlock
                  language="bash"
                  code={`npm run build       # library → dist/
npm run build:demo  # documentation site → demo/dist/`}
                />
              </article>
            </Stack>
          </Section>
        </Container>
    </DocsLayout>
  );
}
