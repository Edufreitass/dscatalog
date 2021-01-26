import { generateList } from "../list";

test('should generate a list', () => {
  // ARRANGE
  const amount = 5;
  const expected = [0, 1, 2, 3, 4];

  // ACT
  const result = generateList(amount);

  // ASSERT
  expect(result).toEqual(expected);
})

test('should generate an empty list when amount is zero', () => {
  // ARRANGE
  const amount = 0;

  // ACT
  const result = generateList(amount);

  // ASSERT
  expect(result).toEqual([]);
})