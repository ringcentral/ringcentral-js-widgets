export default async function asyncForEach<T>(
  fn: (item: T) => Promise<void>,
  collection: Iterable<T>,
): Promise<void> {
  for (const item of collection) {
    await fn(item);
  }
}
