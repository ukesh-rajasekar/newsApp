export const debouncer = <Args extends any[]>(
  fn: (...args: Args) => void,
  delay = 100,
) => {
  let timer: NodeJS.Timeout | undefined;

  return (...args: Args) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
