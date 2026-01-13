import { useDebounce } from '@ringcentral/spring-ui';
import { renderHook, act } from '@testing-library/react-hooks';
import { useState } from 'react';

import { useAsyncState } from '../../src/useAsyncState';

jest.mock('@ringcentral/spring-ui', () => ({
  ...jest.requireActual('@ringcentral/spring-ui'),
  useDebounce: jest.fn(),
}));

describe('useAsyncState', () => {
  let debounceMock: jest.Mock;
  let cancelMock: jest.Mock;

  beforeEach(() => {
    cancelMock = jest.fn();

    const instance = (fn: any) => {
      debounceMock = jest.fn(() => Promise.resolve().then(fn));
      (debounceMock as any).cancel = cancelMock;
      return debounceMock;
    };

    jest.mocked(useDebounce).mockImplementation(instance as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize state with inputValue', () => {
    const { result } = renderHook(() => useAsyncState('initial'));

    expect(result.current[0]).toBe('initial');
  });

  it('same value update, not trigger debounce, but different value should', () => {
    const { result, rerender } = renderHook(
      ({ inputValue }) => useAsyncState(inputValue),
      { initialProps: { inputValue: 'initial' } },
    );

    const [, updateState] = result.current;

    act(() => {
      updateState('updated', false);
    });
    expect(result.current[0]).toBe('updated');

    rerender({ inputValue: 'updated' });

    expect(debounceMock).not.toHaveBeenCalled();

    act(() => {
      updateState('updated2');
    });

    rerender({ inputValue: 'updated3' });

    expect(debounceMock).toHaveBeenCalled();
  });

  it('should debounce state update when updateState is called with typing=true', async () => {
    const { result } = renderHook(() => {
      const [state, setState] = useState('initial');

      const asyncUpdate = (value: string) => setState(value + 'example');

      return useAsyncState(state, asyncUpdate);
    });
    const [, updateState] = result.current;

    act(() => {
      updateState('updated', true);
    });

    expect(result.current[0]).toBe('updated');

    expect(debounceMock).toHaveBeenCalled();
  });

  it('should call asyncOnChange when updateState is called', () => {
    const asyncOnChange = jest.fn();
    const { result } = renderHook(() =>
      useAsyncState('initial', asyncOnChange),
    );
    const [, updateState] = result.current;

    act(() => {
      updateState('updated', true);
    });

    expect(asyncOnChange).toHaveBeenCalledWith('updated');
  });

  it('should cancel debounce when inputValue changes to empty', () => {
    const { result, rerender } = renderHook(
      ({ inputValue }) => useAsyncState(inputValue),
      { initialProps: { inputValue: 'initial' } },
    );

    rerender({ inputValue: '' });

    expect(cancelMock).toHaveBeenCalled();
  });

  it('should debounce state update when typing value, and receive new re-render value change', async () => {
    const { result, rerender } = renderHook(
      ({ inputValue }) => useAsyncState(inputValue),
      { initialProps: { inputValue: 'initial' } },
    );
    const [, updateState] = result.current;

    act(() => {
      updateState('updated2');
    });
    expect(result.current[0]).toBe('updated2');

    rerender({ inputValue: 'updated' });

    expect(debounceMock).toHaveBeenCalled();

    await Promise.resolve();

    expect(result.current[0]).toBe('updated');
  });
});
