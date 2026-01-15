import { Subject, tap } from 'rxjs';

/**
 * create mock action like `window.addEventListener` which have key at listener
 */
export const createMockAction = () => {
  const action$ = new Subject<[key: any, value: unknown]>();

  // eslint-disable-next-line @typescript-eslint/ban-types
  const listeners: Record<string, Function[]> = {};

  const subscription = action$
    .pipe(
      tap(([key, value]) => {
        const fns = listeners[key];

        fns.forEach((fn) => fn(value));
      }),
    )
    .subscribe();

  return {
    addListener: jest.fn((key, cb: any) => {
      if (!listeners[key]) listeners[key] = [];
      listeners[key].push(cb);
    }),
    removeListener: jest.fn((key, cb: any) => {
      const fns = listeners[key];
      const index = fns.indexOf(cb);

      if (index !== -1) fns.splice(index, 1);
    }),
    action$,
    destroy() {
      subscription.unsubscribe();
    },
  };
};

/**
 * create non key mock action like `chrome.runtime.onMessage` which not have key at listener
 */
export const createNonKeyMockAction = () => {
  const action$ = new Subject<unknown[]>();

  // eslint-disable-next-line @typescript-eslint/ban-types
  const listeners: Function[] = [];

  const subscription = action$
    .pipe(
      tap((value) => {
        listeners.forEach((fn) => fn(...value));
      }),
    )
    .subscribe();

  return {
    addListener: jest.fn((cb) => {
      listeners.push(cb);
    }),
    removeListener: jest.fn((cb: any) => {
      const index = listeners.indexOf(cb);

      if (index !== -1) listeners.splice(index, 1);
    }),
    action$,
    destroy() {
      subscription.unsubscribe();
    },
  };
};
