import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export function CodePanel({ code }: { code: string }) {
  return (
    <div style={{ height: "100%", overflow: "auto", background: "#1e1e1e" }}>
      <SyntaxHighlighter
        language="tsx"
        style={vscDarkPlus}
        showLineNumbers={false}
        customStyle={{
          margin: 0,
          padding: 12,
          background: "transparent",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
