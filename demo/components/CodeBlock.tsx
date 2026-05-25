import { Highlight } from "prism-react-renderer";
import { silentCodeTheme } from "./silentCodeTheme";

export type CodeLanguage =
  | "tsx"
  | "typescript"
  | "jsx"
  | "bash"
  | "css"
  | "json"
  | "html";

export interface CodeBlockProps {
  code: string;
  language?: CodeLanguage;
  className?: string;
}

export function CodeBlock({ code, language = "tsx", className }: CodeBlockProps) {
  const trimmed = code.trim();

  return (
    <div className="code-block-wrap">
      <Highlight theme={silentCodeTheme} code={trimmed} language={language}>
        {({ className: prismClass, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`code-block ${prismClass} ${className ?? ""}`.trim()}
            style={{
              ...style,
              background: "transparent",
              margin: 0,
            }}
            data-code-theme="dark"
          >
            <code className="code-block-inner">
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })} className="code-line">
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </code>
          </pre>
        )}
      </Highlight>
    </div>
  );
}
