import { useDebounce } from '@ringcentral/spring-ui';
import { act, renderHook } from '@testing-library/react';

import { useDebouncedFieldState } from '../../src/useDebouncedFieldState';

jest.mock('@ringcentral/spring-ui', () => ({
  ...jest.requireActual('@ringcentral/spring-ui'),
  useDebounce: jest.fn(),
}));

describe('useDebouncedFieldState', () => {
  beforeEach(() => {
    const instance = (fn: () => void) => {
      let token = 0;
      const debounceMock = jest.fn(() => {
        const currentToken = ++token;
        return Promise.resolve().then(() => {
          if (currentToken === token) {
            fn();
          }
        });
      });
      (debounceMock as any).cancel = jest.fn(() => {
        token += 1;
      });
      return debounceMock;
    };

    jest.mocked(useDebounce).mockImplementation(instance as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize state with value', () => {
    const { result } = renderHook(() =>
      useDebouncedFieldState({ value: 'initial' }),
    );

    expect(result.current.inputValue).toBe('initial');
  });

  it('should update parent immediately by default', async () => {
    const onChange = jest.fn();
    const { result } = renderHook(() =>
      useDebouncedFieldState({ value: 'initial', onChange }),
    );

    act(() => {
      result.current.setInputValue('updated');
    });

    expect(result.current.inputValue).toBe('updated');
    expect(onChange).toHaveBeenCalledWith('updated');
  });

  it('should allow parent sync after immediate default update', async () => {
    const onChange = jest.fn();
    const { result, rerender } = renderHook(
      ({ value }) => useDebouncedFieldState({ value, onChange }),
      { initialProps: { value: 'initial' } },
    );

    act(() => {
      result.current.setInputValue('local');
    });

    rerender({ value: 'parent' });

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.inputValue).toBe('parent');
  });

  it('should debounce parent change when enabled', async () => {
    const onChange = jest.fn();
    const { result } = renderHook(() =>
      useDebouncedFieldState({
        value: 'initial',
        onChange,
        shouldDebounceOnChange: true,
      }),
    );

    act(() => {
      result.current.setInputValue('updated');
    });

    expect(result.current.inputValue).toBe('updated');
    expect(onChange).not.toHaveBeenCalled();

    await act(async () => {
      await Promise.resolve();
    });

    expect(onChange).toHaveBeenCalledWith('updated');
  });

  it('should flush pending local change on blur', async () => {
    const onChange = jest.fn();
    const { result } = renderHook(() =>
      useDebouncedFieldState({
        value: 'initial',
        onChange,
        shouldDebounceOnChange: true,
      }),
    );

    act(() => {
      result.current.focusInput();
      result.current.setInputValue('updated');
      result.current.blurInput();
    });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('updated');

    await act(async () => {
      await Promise.resolve();
    });

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('should sync parent value when input is not protected', async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebouncedFieldState({ value }),
      { initialProps: { value: 'initial' } },
    );

    rerender({ value: 'parent' });

    expect(result.current.inputValue).toBe('initial');

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.inputValue).toBe('parent');
  });

  it('should not overwrite local value while input is focused and dirty', async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebouncedFieldState({ value }),
      { initialProps: { value: 'initial' } },
    );

    act(() => {
      result.current.focusInput();
      result.current.setInputValue('local');
    });

    rerender({ value: 'parent' });

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.inputValue).toBe('local');
  });

  it('should keep local edit as winner after parent update during focus', () => {
    const onChange = jest.fn();
    const { result, rerender } = renderHook(
      ({ value }) =>
        useDebouncedFieldState({
          value,
          onChange,
          shouldDebounceOnChange: true,
        }),
      { initialProps: { value: 'initial' } },
    );

    act(() => {
      result.current.focusInput();
      result.current.setInputValue('local');
    });

    rerender({ value: 'parent' });

    act(() => {
      result.current.blurInput();
    });

    expect(result.current.inputValue).toBe('local');
    expect(onChange).toHaveBeenLastCalledWith('local');
  });

  it('should commit immediately when flush is true', async () => {
    const onChange = jest.fn();
    const { result } = renderHook(() =>
      useDebouncedFieldState({ value: 'initial', onChange }),
    );

    act(() => {
      result.current.setInputValue('selected', { flush: true });
    });

    expect(result.current.inputValue).toBe('selected');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('selected');

    await act(async () => {
      await Promise.resolve();
    });

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('should allow parent sync after unfocused flush', async () => {
    const onChange = jest.fn();
    const { result, rerender } = renderHook(
      ({ value }) => useDebouncedFieldState({ value, onChange }),
      { initialProps: { value: 'initial' } },
    );

    act(() => {
      result.current.setInputValue('selected', { flush: true });
    });

    rerender({ value: 'parent' });

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.inputValue).toBe('parent');
  });

  it('should clear from external empty value when input is not protected', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebouncedFieldState({ value }),
      { initialProps: { value: 'initial' } },
    );

    rerender({ value: '' });

    expect(result.current.inputValue).toBe('');
  });

  it('should sync parent value while focused when input is not dirty', async () => {
    const onChange = jest.fn();
    const { result, rerender } = renderHook(
      ({ value }) =>
        useDebouncedFieldState({
          value,
          onChange,
          shouldDebounceOnChange: true,
        }),
      { initialProps: { value: 'initial' } },
    );

    act(() => {
      result.current.focusInput();
    });

    rerender({ value: 'parent' });

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.inputValue).toBe('parent');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('should sync parent value on blur after focus-only interaction', async () => {
    const onChange = jest.fn();
    const { result, rerender } = renderHook(
      ({ value }) =>
        useDebouncedFieldState({
          value,
          onChange,
          shouldDebounceOnChange: true,
        }),
      { initialProps: { value: 'initial' } },
    );

    act(() => {
      result.current.focusInput();
    });

    rerender({ value: 'parent' });

    act(() => {
      result.current.blurInput();
    });

    expect(result.current.inputValue).toBe('parent');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('should not mark input dirty when value is unchanged', async () => {
    const onChange = jest.fn();
    const { result, rerender } = renderHook(
      ({ value }) =>
        useDebouncedFieldState({
          value,
          onChange,
          shouldDebounceOnChange: true,
        }),
      { initialProps: { value: 'initial' } },
    );

    act(() => {
      result.current.focusInput();
      result.current.setInputValue('initial');
      result.current.blurInput();
    });

    await act(async () => {
      await Promise.resolve();
    });

    expect(onChange).not.toHaveBeenCalled();

    rerender({ value: 'parent' });

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.inputValue).toBe('parent');
  });

  it('should keep synced parent value as clean baseline', async () => {
    const onChange = jest.fn();
    const { result, rerender } = renderHook(
      ({ value }) =>
        useDebouncedFieldState({
          value,
          onChange,
          shouldDebounceOnChange: true,
        }),
      { initialProps: { value: 'initial' } },
    );

    act(() => {
      result.current.focusInput();
    });

    rerender({ value: 'parent' });

    await act(async () => {
      await Promise.resolve();
    });

    act(() => {
      result.current.setInputValue('parent');
      result.current.blurInput();
    });

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.inputValue).toBe('parent');
    expect(onChange).not.toHaveBeenCalled();
  });
});
