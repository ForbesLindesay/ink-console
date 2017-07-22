import getDepth from '../getDepth';

test('{}', () => {
  expect(getDepth({})).toBe(0);
  expect(getDepth({value: {}})).toBe(1);
  expect(getDepth({value: {value: {}}})).toBe(2);
});
test('[]', () => {
  expect(getDepth([])).toBe(0);
  expect(getDepth([[]])).toBe(1);
  expect(getDepth([[], [[]]])).toBe(2);
});
test('42', () => {
  expect(getDepth(42)).toBe(0);
});
