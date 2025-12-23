import * as React from "react";

export function DebounceInputDemo() {
  const [text, setText] = React.useState("");
  const [committedQuery, setCommittedQuery] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    const handle = window.setTimeout(() => {
      setCommittedQuery(text);
      setLoading(false);
    }, 300);

    return () => window.clearTimeout(handle);
  }, [text]);

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <label style={{ display: "grid", gap: 4 }}>
        Search
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type…"
          style={{ padding: 8, border: "1px solid #ddd", borderRadius: 6 }}
        />
      </label>

      <div>
        {loading ? "Loading…" : "Idle"} | Last query:{" "}
        <span style={{ fontFamily: "monospace" }}>{committedQuery}</span>
      </div>
    </div>
  );
}
