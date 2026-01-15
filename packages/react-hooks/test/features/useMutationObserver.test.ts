import { renderHook } from '@testing-library/react-hooks';

import {
  useMutationObserver,
  UseMutationObserverConfig,
} from '../../src/useMutationObserver';

describe('useMutationObserver', () => {
  let target: HTMLElement;
  let callback: jest.Mock;
  let options: MutationObserverInit;
  let mutationObserverObserve: jest.Mock<any, any, any>;
  let mutationObserverDisconnect: jest.Mock<any, any, any>;
  let pageMutationCallback: (...any: any[]) => void;

  beforeEach(() => {
    target = document.createElement('div');
    callback = jest.fn();
    options = { attributes: true };
    document.body.appendChild(target);

    mutationObserverObserve = jest.fn();
    mutationObserverDisconnect = jest.fn();
    // Mock MutationObserver
    global.MutationObserver = class {
      observe = mutationObserverObserve;
      disconnect = mutationObserverDisconnect;

      constructor(callback: MutationCallback) {
        pageMutationCallback = callback;

        callback([], this as any);
      }
    } as any;
  });

  afterEach(() => {
    document.body.removeChild(target);
  });

  it('should start observing immediately by default', () => {
    const { result } = renderHook(() =>
      useMutationObserver(target, callback, options),
    );

    expect(result.current.observe).toBeDefined();
    expect(result.current.stop).toBeDefined();
    expect(mutationObserverObserve).toHaveBeenCalled();
    expect(callback).toHaveBeenCalled();
  });

  it('should not start observing immediately when startImmediately is false', () => {
    const config: UseMutationObserverConfig = { startImmediately: false };
    const { result } = renderHook(() =>
      useMutationObserver(target, callback, options, config),
    );

    expect(mutationObserverObserve).not.toHaveBeenCalled();
    expect(result.current.observe).toBeDefined();
    expect(result.current.stop).toBeDefined();
  });

  it('should observe mutations when observe is called', () => {
    const config: UseMutationObserverConfig = { startImmediately: false };
    const { result } = renderHook(() =>
      useMutationObserver(target, callback, options, config),
    );

    expect(mutationObserverObserve).toHaveBeenCalledTimes(0);
    result.current.observe();

    expect(mutationObserverObserve).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalled();
  });

  it('should stop observing mutations when stop is called', () => {
    const { result } = renderHook(() =>
      useMutationObserver(target, callback, options),
    );

    result.current.stop();
    target.setAttribute('data-test', 'value');

    expect(mutationObserverDisconnect).toHaveBeenCalled();
  });
});
