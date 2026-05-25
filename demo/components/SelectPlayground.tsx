import { useState } from "react";
import { Select, Stack, Label } from "@silent-ui/react";

const options = [
  { value: "light", label: "Light theme" },
  { value: "dark", label: "Dark theme" },
  { value: "system", label: "System" },
];

export function SelectPlayground() {
  const [value, setValue] = useState("light");

  return (
    <Stack gap={6} className="playground">
      <div className="playground-preview">
        <Select
          label="Theme"
          options={options}
          value={value}
          onValueChange={setValue}
        />
      </div>
      <Stack gap={2}>
        <Label>Selected</Label>
        <code className="playground-value">{value}</code>
      </Stack>
    </Stack>
  );
}
