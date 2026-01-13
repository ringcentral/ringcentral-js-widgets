import memoize from 'lodash/memoize';

/**
 * use lodash memoize to cache the result of cb exec result
 * and shared the promise with the same `cache key`
 */
export const createWithMemorizeByKey = <T = string | null>() => {
  const withMemorizeByKey = memoize(
    (cb: () => Promise<T>, _cacheKey: string) => cb(),
    (_, cacheKey) => cacheKey,
  );

  const toWithMemorizeByKey = withMemorizeByKey as typeof withMemorizeByKey & {
    /**
     *
     * @returns clear cached state and promise
     */
    clear: (
      cb?: (
        /**
         * cached data callback before clear
         */
        data: T,
      ) => void,
    ) => void;
    /**
     * get the full cached map data
     */
    get value(): Record<string, T>;
  };

  Object.defineProperty(withMemorizeByKey, 'value', {
    get: () => (withMemorizeByKey.cache as any)?.__data__?.string?.__data__,
  });

  Object.defineProperty(withMemorizeByKey, 'clear', {
    writable: false,
    value: async (
      cb: (
        /**
         * cached data callback before clear
         */
        data: T,
      ) => void,
    ) => {
      const cachedMap = toWithMemorizeByKey.value;

      for (const cache of Object.values(cachedMap)) {
        const value = await cache;

        cb?.(value);
      }

      withMemorizeByKey.cache.clear?.();
    },
  });

  return toWithMemorizeByKey;
};

/**
 * save the result of promise to local cache by cacheKey, and can get the result by cacheKey in sync way
 *
 * ```ts
 * const withLocalCache = createWithLocalCache<string>();
 *
 * const fetchData = async () => {
 *   // Simulate an async operation
 *   return new Promise<string>((resolve) => {
 *     setTimeout(() => resolve('data'), 1000);
 *   });
 * };
 *
 * const withLocalCache = createWithLocalCache<string>();
 *   const cacheKey = 'uniqueKey';
 *
 *   // Fetch data and cache it
 *   const data = await withLocalCache(fetchData(), cacheKey);
 *   console.log(data); // Output: 'data'
 *
 *   // Retrieve cached data synchronously
 *   const cachedData = withLocalCache.get(cacheKey);
 *   console.log(cachedData); // Output: 'data'
 *
 *   // Clear the cache
 *   withLocalCache.clear();
 *   const clearedData = withLocalCache.get(cacheKey);
 *   console.log(clearedData); // Output: undefined
 * ```
 */
export const createWithLocalCache = <T = string | null>() => {
  const localCache = new Map<string, T>();

  const withLocalCache = async (promise: Promise<T>, _cacheKey: string) => {
    const result = await promise;
    localCache.set(_cacheKey, result);
    return result;
  };

  Object.defineProperty(withLocalCache, 'clear', {
    writable: false,
    value: () => localCache.clear(),
  });

  Object.defineProperty(withLocalCache, 'get', {
    writable: false,
    value: (cacheKey: string) => localCache.get(cacheKey),
  });

  Object.defineProperty(withLocalCache, 'value', {
    get: () => localCache,
  });

  return withLocalCache as typeof withLocalCache & {
    /**
     *
     * @returns clear local cached state
     */
    clear: () => void;
    /**
     * get the cached result by cacheKey in sync way
     * @param cacheKey
     */
    get: (cacheKey: string) => T | undefined;
    /**
     * get the full cached map data
     */
    get value(): Map<string, T>;
  };
};
