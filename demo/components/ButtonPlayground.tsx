import { useState } from "react";
import { Button, Stack, Label, Text } from "@silent-ui/react";

const variants = ["primary", "ghost", "outline"] as const;
const sizes = ["sm", "md", "lg"] as const;

export function ButtonPlayground() {
  const [variant, setVariant] =
    useState<(typeof variants)[number]>("primary");
  const [size, setSize] = useState<(typeof sizes)[number]>("md");
  const [disabled, setDisabled] = useState(false);

  return (
    <Stack gap={6} className="playground">
      <div className="playground-preview">
        <Button variant={variant} size={size} disabled={disabled} icon="→">
          Live preview
        </Button>
      </div>
      <Stack gap={4}>
        <div className="playground-controls">
          <Label>Variant</Label>
          <div className="playground-options" role="group" aria-label="Variant">
            {variants.map((v) => (
              <button
                key={v}
                type="button"
                className={`playground-option${variant === v ? " playground-option--active" : ""}`}
                aria-pressed={variant === v}
                onClick={() => setVariant(v)}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
        <div className="playground-controls">
          <Label>Size</Label>
          <div className="playground-options" role="group" aria-label="Size">
            {sizes.map((s) => (
              <button
                key={s}
                type="button"
                className={`playground-option${size === s ? " playground-option--active" : ""}`}
                aria-pressed={size === s}
                onClick={() => setSize(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <label className="playground-toggle">
          <input
            type="checkbox"
            checked={disabled}
            onChange={(e) => setDisabled(e.target.checked)}
          />
          <Text variant="sm" as="span">
            Disabled
          </Text>
        </label>
      </Stack>
    </Stack>
  );
}
