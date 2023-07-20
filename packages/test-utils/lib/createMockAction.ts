import { Subject, tap } from 'rxjs';

export const createMockAction = () => {
  const action$ = new Subject<[key: string, value: unknown]>();

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
