jest.mock('lodash/debounce', () => ({
  __esModule: true,
  default: jest.fn((fn) => {
    fn.cancel = jest.fn();
    return fn;
  }),
}));

jest.mock('lodash/throttle', () => ({
  __esModule: true,
  default: jest.fn,
}));

jest.mock('resize-observer-polyfill', () => ({
  __esModule: true,
  default: (cb: any) => {
    return {
      observe: (elm: HTMLElement) => {
        cb([
          {
            contentRect: {
              width: elm.dataset.testWidth || 200,
              height: elm.dataset.testHeight || 200,
            },
          },
        ]);
      },
      disconnect: jest.fn,
    };
  },
}));
