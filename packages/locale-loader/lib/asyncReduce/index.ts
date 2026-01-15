export default async function asyncReduce<T, U>(
  fn: (acc: U, item: T) => Promise<U>,
  acc: U,
  collection: Iterable<T>,
): Promise<U> {
  let result = acc;
  for (const item of collection) {
    result = await fn(result, item);
  }
  return result;
}
