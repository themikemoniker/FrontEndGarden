import type React from "react";
import { DebounceInputDemo } from "./ui/debounce-input";
import { debounceInputSource } from "./ui/debounce-input.source";

import { NoUi } from "./leetcode/NoUi";
import { hasDuplicateSource } from "./leetcode/has-duplicate.source";

export type ProblemType = "ui" | "leetcode";

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
];
