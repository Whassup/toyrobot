const getIndexFromValue = <T>(value: T, arr: T[]) =>
  arr.findIndex((v) => v === value);

export const enumNext = <T, K = keyof T>(value: K, enumerable: T): K => {
  const values = Object.values(enumerable);
  const index = getIndexFromValue(value, values);
  return values[(index + 1) % values.length];
};

export const enumPrevious = <T, K = keyof T>(value: K, enumerable: T): K => {
  const values = Object.values(enumerable);
  const index = getIndexFromValue(value, values);
  return values[(values.length + index - 1) % values.length];
};
