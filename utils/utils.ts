export const range = (n: number) =>
  Array(n)
    .fill(0)
    .map((i, j) => i + j);
