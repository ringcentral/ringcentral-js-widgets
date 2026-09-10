export default function asyncForEach<T>(fn: (item: T) => Promise<void>, collection: Iterable<T>): Promise<void>;
