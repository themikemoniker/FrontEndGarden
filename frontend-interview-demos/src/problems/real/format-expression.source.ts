export const formatExpressionSource = `export function formatExpression(expression: unknown): string {
  if (typeof expression === "number" || typeof expression === "string") {
    return String(expression);
  }

  if (!Array.isArray(expression) || expression.length === 0) {
    throw new Error(\`Invalid expression: \${JSON.stringify(expression)}\`);
  }

  const operator = expression[0];

  switch (operator) {
    case "=":
      return \`\${formatExpression(expression[1])} is equal to \${formatExpression(expression[2])}\`;
    case ">":
      return \`\${formatExpression(expression[1])} is greater than \${formatExpression(expression[2])}\`;
    case "<":
      return \`\${formatExpression(expression[1])} is less than \${formatExpression(expression[2])}\`;
    case "between":
      return \`\${formatExpression(expression[1])} is between \${formatExpression(expression[2])} and \${formatExpression(expression[3])}\`;
    case "and":
      return expression.slice(1).map(formatExpression).join(" and ");
    default:
      throw new Error(\`Unknown operator: \${operator}\`);
  }
}

/*
Vitest / Jest-style tests (whiteboard-level)

describe("formatExpression", () => {
  it("formats comparison expressions", () => {
    expect(formatExpression(["=", "a", "b"])).toBe("a is equal to b");
    expect(formatExpression([">", 10, 5])).toBe("10 is greater than 5");
    expect(formatExpression(["<", 1, 2])).toBe("1 is less than 2");
  });

  it("handles nested operators", () => {
    expect(
      formatExpression(["and", ["=", "a", "b"], ["between", "x", 1, 5]])
    ).toBe("a is equal to b and x is between 1 and 5");
  });

  it("throws on invalid expressions", () => {
    expect(() => formatExpression(null as any)).toThrow();
    expect(() => formatExpression([] as any)).toThrow();
  });
});
*/
`;
