import * as React from "react";
import { CodePanel } from "./components/CodePanel";
import { ProblemPanel } from "./components/ProblemPanel";
import { PROBLEMS, TYPES, type ProblemType, type ProblemDef } from "./problems";

function problemsForType(type: ProblemType): ProblemDef[] {
  return PROBLEMS.filter((p) => p.type === type);
}

function readQuery(): { type?: string; problem?: string } {
  const url = new URL(window.location.href);
  return {
    type: url.searchParams.get("type") ?? undefined,
    problem: url.searchParams.get("problem") ?? undefined,
  };
}

function writeQuery(next: { type: string; problem: string }) {
  const url = new URL(window.location.href);
  url.searchParams.set("type", next.type);
  url.searchParams.set("problem", next.problem);
  window.history.pushState({}, "", url);
}

function isProblemType(x: string | undefined): x is ProblemType {
  return !!x && TYPES.some((t) => t.id === x);
}

export function App() {
  const initial = React.useMemo(() => readQuery(), []);
  const initialType: ProblemType = isProblemType(initial.type) ? initial.type : TYPES[0].id;
  const initialFiltered = problemsForType(initialType);
  const initialProblemId =
    initial.problem && initialFiltered.some((p) => p.id === initial.problem)
      ? initial.problem
      : initialFiltered[0]?.id ?? PROBLEMS[0]?.id ?? "";

  const [type, setType] = React.useState<ProblemType>(initialType);
  const filtered = React.useMemo(() => problemsForType(type), [type]);
  const [problemId, setProblemId] = React.useState<string>(initialProblemId);

  React.useEffect(() => {
    const onPop = () => {
      const q = readQuery();
      if (isProblemType(q.type)) setType(q.type);
      if (q.problem) setProblemId(q.problem);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  React.useEffect(() => {
    if (!filtered.some((p) => p.id === problemId)) {
      setProblemId(filtered[0]?.id ?? "");
    }
  }, [filtered, problemId]);

  const problem = React.useMemo(
    () => PROBLEMS.find((p) => p.id === problemId) ?? null,
    [problemId]
  );

  React.useEffect(() => {
    if (!problem) return;
    writeQuery({ type, problem: problem.id });
  }, [type, problem]);

  const openInNewTabHref = React.useMemo(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("type", type);
    url.searchParams.set("problem", problem?.id ?? "");
    return url.toString();
  }, [type, problem]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div style={{ display: "flex", gap: 12, padding: 12, borderBottom: "1px solid #ddd" }}>
        <label>
          Question type
          <select
            value={type}
            onChange={(e) => setType(e.target.value as ProblemType)}
            style={{ marginLeft: 8 }}
          >
            {TYPES.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          Problem
          <select
            value={problemId}
            onChange={(e) => setProblemId(e.target.value)}
            style={{ marginLeft: 8 }}
          >
            {filtered.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
        </label>

        <a href={openInNewTabHref} target="_blank" rel="noreferrer">
          Open in new tab
        </a>
      </div>

      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        <div style={{ flex: 1, minWidth: 0, borderRight: "1px solid #ddd" }}>
          <CodePanel code={problem?.source ?? ""} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          {problem ? <ProblemPanel problem={problem} /> : null}
        </div>
      </div>
    </div>
  );
}
