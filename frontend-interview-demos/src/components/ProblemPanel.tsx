import * as React from "react";
import type { ProblemDef } from "../problems";

export function ProblemPanel({ problem }: { problem: ProblemDef }) {
  const [mountKey, setMountKey] = React.useState(0);
  const Cmp = problem.Component;

  return (
    <div style={{ padding: 12, overflow: "auto", height: "100%" }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <h2 style={{ margin: 0, flex: 1 }}>{problem.title}</h2>
        <button onClick={() => setMountKey((k) => k + 1)}>Remount</button>
      </div>

      <p style={{ whiteSpace: "pre-wrap" }}>{problem.description}</p>

      <div style={{ border: "1px solid #ddd", padding: 12 }}>
        <Cmp key={mountKey} />
      </div>
    </div>
  );
}
