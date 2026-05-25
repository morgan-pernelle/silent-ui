import type { ReactNode } from "react";
import { Label, Text } from "@silent-ui/react";
import { CodeBlock } from "./CodeBlock";
import { PropsTable, type PropDef } from "./PropsTable";

export interface DocSectionProps {
  id: string;
  name: string;
  description: string;
  importLine: string;
  preview?: ReactNode;
  playground?: ReactNode;
  hidePreview?: boolean;
  code: string;
  props: PropDef[];
}

export function DocSection({
  id,
  name,
  description,
  importLine,
  preview,
  playground,
  hidePreview,
  code,
  props,
}: DocSectionProps) {
  const showPreview = !hidePreview && preview != null;
  return (
    <section id={id} className="doc-section">
      <Label>{name}</Label>
      <h2 className="doc-section-title">{name}</h2>
      <Text tone="muted" leading="relaxed" className="doc-section-desc">
        {description}
      </Text>
      <CodeBlock code={importLine} />
      {showPreview && (
        <>
          <h3 className="doc-subtitle">Preview</h3>
          <div className="doc-preview">{preview}</div>
        </>
      )}
      {playground != null && (
        <>
          <h3 className="doc-subtitle">Playground</h3>
          <div className="doc-playground">{playground}</div>
        </>
      )}
      <h3 className="doc-subtitle">Example</h3>
      <CodeBlock code={code} />
      <h3 className="doc-subtitle">Props</h3>
      <PropsTable props={props} />
    </section>
  );
}
