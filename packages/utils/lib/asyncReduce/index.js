export default async function asyncReduce(fn, acc, collection) {
  let result = acc;
  for (const item of collection) {
    result = await fn(result, item);
  }
  return result;
}

