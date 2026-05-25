import { Container, Section, Stack, Heading, Text, Label, Spacer, Divider, Image, Reveal } from "@silent-ui/react";
import { DocsLayout } from "../layout/DocsLayout";
import { DocSection } from "../components/DocSection";
import { componentCategories, componentDocs } from "../data/componentDocs";
import { previews } from "../previews";
import { playgrounds } from "../previews/playgrounds";
import { images } from "../constants/images";
import { siteCopy } from "../constants/siteCopy";

export function ComponentsPage() {
  return (
    <DocsLayout>
        <Container size="narrow">
          <Section>
            <Stack gap={4}>
              <Label>Reference</Label>
              <Heading level={1}>Components</Heading>
              <Text variant="lg" tone="muted" leading="relaxed">
                {componentDocs.length} documented components with live previews, code
                examples, and prop tables.
              </Text>
            </Stack>
            <Spacer size={6} />
            <Reveal>
              <Image
                src={images.garden}
                alt={siteCopy.docsHeroGardenAlt}
                aspect="wide"
                cover
                className="docs-hero-image"
              />
            </Reveal>
            <Spacer size={10} />
            <Divider />
            <Spacer size={10} />

            <Stack gap={20}>
              {componentCategories.map((category) => {
                const categorySlug = category.name
                  .toLowerCase()
                  .replace(/\s+/g, "-");
                return (
                <section
                  key={category.name}
                  className="docs-category"
                  aria-labelledby={`category-${categorySlug}`}
                >
                  <h2
                    id={`category-${categorySlug}`}
                    className="docs-category-title"
                  >
                    {category.name}
                  </h2>
                  <Stack gap={20}>
                    {category.items.map((doc) => {
                      const Preview = previews[doc.id];
                      const Playground = playgrounds[doc.id];
                      return (
                        <DocSection
                          key={doc.id}
                          id={doc.id}
                          name={doc.name}
                          description={doc.description}
                          importLine={doc.importLine}
                          preview={Preview ? <Preview /> : null}
                          playground={Playground ? <Playground /> : undefined}
                          hidePreview={doc.hidePreview}
                          code={doc.code}
                          props={doc.props}
                        />
                      );
                    })}
                  </Stack>
                </section>
              );
              })}
            </Stack>
          </Section>
        </Container>
    </DocsLayout>
  );
}
