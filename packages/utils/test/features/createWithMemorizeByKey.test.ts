import {
  createWithMemorizeByKey,
  createWithLocalCache,
} from '../../src/utils/createWithMemorizeByKey';

describe('createWithMemorizeByKey', () => {
  it('should memoize the result based on cache key', async () => {
    const withMemorizeByKey = createWithMemorizeByKey<string>();

    const fetchData = jest.fn(async () => 'data');
    const cacheKey = 'uniqueKey';

    const result1 = await withMemorizeByKey(fetchData, cacheKey);
    // although that call with different method, but the result is memoized by key so still be "data"
    const result2 = await withMemorizeByKey(async () => '123', cacheKey);

    expect(fetchData).toHaveBeenCalledTimes(1);
    expect(result1).toBe('data');
    expect(result2).toBe('data');
  });
});

describe('createWithLocalCache', () => {
  it('should cache the result of a promise and retrieve it synchronously', async () => {
    const withLocalCache = createWithLocalCache<string>();

    const fetchData = async () => 'data';
    const cacheKey = 'uniqueKey';

    const result = await withLocalCache(fetchData(), cacheKey);
    expect(result).toBe('data');

    const cachedData = withLocalCache.get(cacheKey);
    expect(cachedData).toBe('data');
  });

  it('should clear the cache', async () => {
    const withLocalCache = createWithLocalCache<string>();

    const fetchData = async () => 'data';
    const cacheKey = 'uniqueKey';

    await withLocalCache(fetchData(), cacheKey);
    withLocalCache.clear();

    const clearedData = withLocalCache.get(cacheKey);
    expect(clearedData).toBeUndefined();
  });
});
