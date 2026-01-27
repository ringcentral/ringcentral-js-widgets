import { useContainer } from '@ringcentral-integration/next-core';
import { useEffect, useRef } from 'react';

import { PerfTracker } from '../services';

export const useWillMountTracker = (key: string) => {
  const perfTracker = useContainer<PerfTracker>('PerfTracker');
  const willMount = useRef(true);
  if (willMount.current && perfTracker) {
    perfTracker.markOnce(key);
    willMount.current = false;
  }
};

export const useDidMountTracker = (startKey: string, key: string) => {
  const perfTracker = useContainer<PerfTracker>('PerfTracker');
  useEffect(() => {
    perfTracker?.measureOnce({ name: key, startMark: startKey });
  }, []);
};

type UseReadyTracker = {
  (startKey: string, key: string, prop: boolean): void;
  (startKey: string, key: string, prop: any, activate?: boolean): void;
};
export const useReadyTracker: UseReadyTracker = (
  startKey: string,
  key: string,
  prop: any,
  activate?: boolean,
) => {
  const perfTracker = useContainer<PerfTracker>('PerfTracker');
  useEffect(() => {
    if ((activate || !!prop) && perfTracker) {
      // leave a mark then measure
      perfTracker.markOnce(key);
      perfTracker.measureOnce({ name: key, startMark: startKey, endMark: key });
    }
  }, [prop]);
};
