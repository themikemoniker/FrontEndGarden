export const hasDuplicateSource = `export function hasDuplicate(nums: number[]): boolean {
  const seen = new Set<number>();

  for (const n of nums) {
    if (seen.has(n)) return true;
    seen.add(n);
  }

  return false;
}

/*
Vitest / Jest-style tests (whiteboard-level)

describe("hasDuplicate", () => {
  it("returns false for empty input", () => {
    expect(hasDuplicate([])).toBe(false);
  });

  it("returns false when all elements are unique", () => {
    expect(hasDuplicate([1, 2, 3, 4])).toBe(false);
  });

  it("returns true when a duplicate exists", () => {
    expect(hasDuplicate([1, 2, 3, 1])).toBe(true);
  });

  it("handles negative numbers", () => {
    expect(hasDuplicate([-1, -2, -3, -1])).toBe(true);
  });
});
*/
`;
