import sum from "../sum";

test("function should add properly", () => {
  expect(sum(1,2)).toBe(3);
})

test("function not equal something else", () => {
  expect(sum(2,3)).not.toBe(6);
})