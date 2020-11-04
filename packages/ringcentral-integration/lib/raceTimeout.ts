type ResolveType = (value?: any) => void;

type RaceTimeoutParams = {
  timeout?: number;
  onTimeout?: (resolve: ResolveType, reject: ResolveType) => any;
  finalize?: () => any;
};

export const raceTimeout = async <T>(
  fn: Promise<T>,
  {
    timeout = 30 * 1000,
    onTimeout = (reject) => {
      reject(null);
    },
    finalize = () => {},
  }: RaceTimeoutParams = {},
): Promise<T> => {
  let timeoutId = null;
  let result: any;
  let timeoutResolve: ResolveType;
  let err: any;
  let hasError = false;

  try {
    result = await Promise.race<T>([
      fn,
      new Promise<any>((resolve, reject) => {
        timeoutResolve = resolve;
        // here use resolve for easy to use.
        timeoutId = setTimeout(
          () => resolve(onTimeout(resolve, reject)),
          timeout,
        );
      }),
    ]);
  } catch (error) {
    hasError = true;
    err = error;
  } finally {
    timeoutResolve();
    clearTimeout(timeoutId);
    finalize();
  }

  if (hasError) {
    throw err;
  }
  return result;
};
