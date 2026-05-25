import { useState } from "react";
import {
  Card,
  CardMedia,
  CardBody,
  Heading,
  Text,
  Stack,
} from "@silent-ui/react";
import { images } from "../constants/images";

export function CardPlayground() {
  const [interactive, setInteractive] = useState(true);

  return (
    <Stack gap={6} className="playground">
      <div className="playground-preview playground-preview--card">
        <Card interactive={interactive} style={{ maxWidth: "280px" }}>
          <CardMedia src={images.garden} alt="Japanese garden" />
          <CardBody>
            <Stack gap={3}>
              <Heading level={4}>間 — Ma</Heading>
              <Text variant="sm" tone="muted">
                Negative space as an active design element.
              </Text>
            </Stack>
          </CardBody>
        </Card>
      </div>
      <label className="playground-toggle">
        <input
          type="checkbox"
          checked={interactive}
          onChange={(e) => setInteractive(e.target.checked)}
        />
        <Text variant="sm" as="span">
          Interactive (hover lift)
        </Text>
      </label>
    </Stack>
  );
}
