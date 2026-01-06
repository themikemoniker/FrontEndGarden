import type React from "react";
import { DebounceInputDemo } from "./ui/debounce-input";
import { debounceInputSource } from "./ui/debounce-input.source";

import { NoUi } from "./leetcode/NoUi";
import { hasDuplicateSource } from "./leetcode/has-duplicate.source";
import { formatExpressionSource } from "./real/format-expression.source";

export type ProblemType = "ui" | "leetcode" | "real-interview";

export type ProblemDef = {
  id: string;
  title: string;
  type: ProblemType;
  description: string;
  source: string;
  Component: React.ComponentType;
};

export const TYPES: { id: ProblemType; label: string }[] = [
  { id: "ui", label: "UI" },
  { id: "leetcode", label: "LeetCode" },
  { id: "real-interview", label: "Real Interview Questions" },
];

export const PROBLEMS: ProblemDef[] = [
  {
    id: "debounce-input",
    title: "Debounced Input",
    type: "ui",
    description:
      "Build an input that commits its value after the user stops typing for 300ms.",
    source: debounceInputSource,
    Component: DebounceInputDemo,
  },
  {
    id: "leetcode-has-duplicate",
    title: "Contains Duplicate",
    type: "leetcode",
    description: `Given an integer array nums, return true if any value appears at least twice.

Approach:
- Track seen values using a Set.
- Early exit on duplicate.
- Time: O(n)
- Space: O(n)`,
    source: hasDuplicateSource,
    Component: NoUi,
  },
  {
    id: "real-format-expression",
    title: "Format Comparison Expression",
    type: "real-interview",
    description: `Convert a nested expression array into a readable English statement.

Input rules:
- Literals can be numbers or strings.
- Expressions are arrays where the first entry is an operator ("=", ">", "<", "between", "and").
- Operators operate on subsequent entries, which may themselves be nested expressions.

Return a single descriptive sentence for the expression, throwing on invalid input.`,
    source: formatExpressionSource,
    Component: NoUi,
  },
];
