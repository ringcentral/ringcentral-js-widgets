import { useCallback } from 'react';
import useMountedState from './useMountedState';

export type UsePromise = () => <T>(promise: Promise<T>) => Promise<T>;

const usePromise: UsePromise = () => {
  const isMounted = useMountedState();
  return useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (promise: Promise<any>) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      new Promise<any>((resolve, reject) => {
        const onValue = (value: unknown) => {
          isMounted() && resolve(value);
        };
        const onError = (error: unknown) => {
          isMounted() && reject(error);
        };
        promise.then(onValue, onError);
      }),
    [],
  );
};

export default usePromise;
