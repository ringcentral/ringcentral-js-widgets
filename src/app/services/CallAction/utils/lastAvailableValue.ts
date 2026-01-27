/**
 * Returns a function that calls the provided function `fn` and stores its last non-undefined value.
 * When the returned function is called, it will return the new value from `fn` if it is not undefined,
 * otherwise, it will return the last stored value.
 */
export const lastAvailableValue = <T>(fn: () => T) => {
  let value: T;

  return () => {
    const newValue = fn();
    if (newValue !== undefined) {
      value = newValue;
    }

    return newValue || value;
  };
};
