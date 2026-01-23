/* eslint-disable @typescript-eslint/no-explicit-any */

const defaultConsoleLogger = (key: string | symbol) => {
  return (...args: unknown[]) => {
    (console as any)[key](...args);
  };
};

export const loggerInstance = {
  fn: defaultConsoleLogger,
};

/**
 * when you want to use buffer logger, call this function at entry file to accumulate logs from all modules
 */
export const useConsoleLogger = () => {
  loggerInstance.fn = defaultConsoleLogger;
};

export const createLogger = () =>
  new Proxy(
    {},
    {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      get: (target, key, receiver) => {
        return loggerInstance.fn(key);
      },
    },
  ) as Console;

export const logger = createLogger();
