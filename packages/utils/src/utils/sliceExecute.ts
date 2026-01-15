import { sleep } from './sleep';

export interface SliceExecuteOptions<T> {
  /** Array items to be sliced */
  items: T[];
  /** The size of each slice */
  sliceSize: number;
  /** The delay in milliseconds between each slice execution */
  delay?: number;
  /** The handler function to execute each slice, return false to stop the execution */
  handler: (slicedItems: T[]) => void | boolean | Promise<void | boolean>;
}

/**
 * Slices an array into smaller chunks and execute with handler
 */
export async function sliceExecute<T>({
  items,
  sliceSize,
  delay = 0,
  handler,
}: SliceExecuteOptions<T>) {
  const loop = async (start: number) => {
    const end = start + sliceSize;
    const slicedItems = items.slice(start, end);
    if (slicedItems.length) {
      if (delay > 0 && start > 0) {
        await sleep(delay);
      }
      const result = await handler(slicedItems);
      if (result !== false) {
        await loop(end);
      }
    }
  };
  await loop(0);
}
