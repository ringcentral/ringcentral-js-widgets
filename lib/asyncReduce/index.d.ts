export default function asyncReduce<T, U>(fn: (acc: U, item: T) => Promise<U>, acc: U, collection: Iterable<T>): Promise<U>;
