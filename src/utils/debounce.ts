export const debounce = <T extends (...args: never[]) => void>(
  callback: T,
  delayMs: number,
): ((...args: Parameters<T>) => void) => {
  let timeoutId: number | undefined;

  return (...args: Parameters<T>) => {
    if (timeoutId !== undefined) {
      window.clearTimeout(timeoutId);
    }

    timeoutId = window.setTimeout(() => {
      timeoutId = undefined;
      callback(...args);
    }, delayMs);
  };
};
