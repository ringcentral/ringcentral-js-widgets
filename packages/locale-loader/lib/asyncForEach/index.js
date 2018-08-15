
export default async function asyncForEach(fn, collection) {
  for (const item of collection) {
    await fn(item);
  }
}
