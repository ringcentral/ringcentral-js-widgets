/* eslint-disable @typescript-eslint/no-explicit-any */
import { loggerInstance } from './logger';

type ToBeLogged = [string | symbol, unknown[]][];

const toBeLogged: ToBeLogged = [];

export const getBufferLogItems = () => toBeLogged;

/**
 * when you want to use buffer logger, call this function at entry file to accumulate logs from all modules
 */
export const useBufferLogger = () => {
  loggerInstance.fn = (key: string | symbol) => {
    return (...args: unknown[]) => {
      toBeLogged.push([key, args]);
      (console as any)[key](...args);
    };
  };
};

/**
 * when you want to use external logger, call this function to override default logger
 * @param external external logger
 * @param showDefaultConsole is show default console log when override by external logger
 *
 * ### !!!IMPORTANT!!! should work with `useBufferLogger` at entry file, if you want to catch all logs from all modules and send to external logger
 */

export const overrideBufferLogger = (
  externalLogger: any,
  /**
   * is show default console log when override by external logger
   */
  showDefaultConsole?: () => boolean,
  clearBuffer = true,
) => {
  // exec all log methods after get external logger
  toBeLogged.forEach(([key, args]) => externalLogger[key](...args));
  if (clearBuffer) {
    toBeLogged.length = 0;
  }

  const isShowDefaultConsole = showDefaultConsole?.();

  loggerInstance.fn = (key: string | symbol) => {
    return (...args: unknown[]) => {
      if (isShowDefaultConsole) {
        (console as any)[key]?.(...args);
      }
      externalLogger[key]?.(...args);
    };
  };
};
