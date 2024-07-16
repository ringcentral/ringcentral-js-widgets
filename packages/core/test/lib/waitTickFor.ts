import { promisify } from 'util';

const nextTick = promisify(process.nextTick);

/**
 * Waits for the next tick and executes the provided callback function until it returns a result or the maximum number of attempts is reached.
 * @param cb The callback function to execute on each tick.
 * @param max The maximum number of attempts to execute the callback function. Defaults to 10.
 * @returns The result returned by the callback function.
 * @throws If the callback function throws an error on the last attempt.
 */
export const waitTickFor = async <T = unknown>(
  cb: (i: number) => T,
  max = 10,
) => {
  let i = 0;

  while (i <= max) {
    i++;
    try {
      await nextTick();
      const result = await cb(i);
      return result;
    } catch (e) {
      if (i === max) {
        throw e;
      }
    }
  }
};
