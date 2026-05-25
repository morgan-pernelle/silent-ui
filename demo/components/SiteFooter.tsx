import { Link as RouterLink } from "react-router-dom";
import { Container, Divider, Stack, Grid, Text, Label } from "@silent-ui/react";
import { componentDocs } from "../data/componentDocs";
import { socialLinks } from "../constants/siteLinks";

const footerLinks = [
  { to: "/about", label: "About" },
  { to: "/docs/install", label: "Installation" },
  { to: "/docs/getting-started", label: "Getting Started" },
  { to: "/docs/components", label: "Components" },
  { to: "/docs/recipes", label: "Recipes" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <Divider />
      <Container>
        <div className="site-footer-inner">
          <Grid cols={3} gap={10} className="site-footer-grid">
            <Stack gap={4}>
              <RouterLink to="/" className="site-footer-logo">
                Silent
              </RouterLink>
              <Text variant="sm" tone="muted" leading="relaxed">
                A minimal React UI library inspired by Japanese design — quiet
                typography, deliberate motion, nothing superfluous.
              </Text>
            </Stack>

            <Stack gap={4}>
              <Label>Documentation</Label>
              <nav className="site-footer-nav" aria-label="Documentation">
                {footerLinks.map((item) => (
                  <RouterLink
                    key={item.to}
                    to={item.to}
                    className="site-footer-link"
                  >
                    {item.label}
                  </RouterLink>
                ))}
              </nav>
              <Text variant="xs" tone="faint">
                {componentDocs.length} documented components
              </Text>
            </Stack>

            <Stack gap={4}>
              <Label>Connect</Label>
              <nav className="site-footer-nav" aria-label="Social">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="site-footer-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </Stack>
          </Grid>

          <div className="site-footer-bottom">
            <Text variant="xs" tone="faint" as="span">
              © {year} Silent UI
            </Text>
            <Text variant="xs" tone="faint" as="span" className="site-footer-tagline">
              静 — silence speaks
            </Text>
          </div>
        </div>
      </Container>
    </footer>
  );
}
