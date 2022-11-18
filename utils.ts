export const randomItem = (array: any[]) => {
  return array[Math.floor(Math.random() * array.length)];
};

// Call a function n times
export const times = (n: number, fn: Function) => {
  // @ts-ignore
  return Array.from({ length: n }, fn);
};

export const randomNumberBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
