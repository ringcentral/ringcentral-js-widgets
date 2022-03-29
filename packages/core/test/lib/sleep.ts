/**
 * sleep for ms
 * @param ms what ms to sleep
 */
export const sleep = (time: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, time));
