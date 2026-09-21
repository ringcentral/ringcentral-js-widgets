/* eslint-disable @typescript-eslint/no-explicit-any */
import { sleep } from '@ringcentral-integration/utils';

import type { App } from '../..';

export const createMockLock = () => {
  let clockResolve: () => void;
  // mock lock
  (global as any).navigator.locks = {
    request: (
      name: string,
      callback: (lock: { name: string; mode: 'exclusive' }) => Promise<void>,
    ) => {
      return new Promise<void>((resolve, reject) => {
        clockResolve = () => {
          callback({ name, mode: 'exclusive' }).then(resolve, reject);
        };
      });
    },
  };
  return async (app: App<any, any, any>) => {
    clockResolve();
    // ensure lock is took up
    await sleep(0);
    await app.instance.portManager.portDetector.syncFullState();
  };
};
