import {
  useDebounce,
  useEventCallback,
  useRefState,
  useDepsChange,
} from '@ringcentral/spring-ui';
import { useRef } from 'react';

/**
 * Custom hook for managing async control state to avoid too many rerender and async cause input cursor jump.
 *
 * use for update value in sync way when using `updateState` method,
 * in typing mode, input value will not update the value immediately, that will wait user not typing for 500ms then update the control value.
 *
 * `updateState(value, false)` will trigger update immediately, which will cancel the debounce 500ms delay.
 *
 * @param inputValue - The value for the control state.
 * @param asyncOnChange - The async function to handle the value change.
 */
export const useAsyncState = <T = string>(
  inputValue: T,
  asyncOnChange?: (value: T) => void,
) => {
  const [state, _setState] = useRefState<T>(inputValue);

  const debouncingRef = useRef(false);
  const debounceSetState = useDebounce(() => {
    setState(inputValue);
  }, 500);

  const setState = useEventCallback((val: T, rerender?: false | undefined) => {
    debouncingRef.current = false;
    debounceSetState.cancel();
    _setState(val, rerender);
  });

  useDepsChange(() => {
    if (state.current === inputValue) {
      debouncingRef.current = false;

      return;
    }

    // when be empty from outside, cancel previous debounce prevent update show again
    if (state.current !== '' && inputValue === '') {
      setState(inputValue, false);
    } else if (debouncingRef.current) {
      // use debounce to avoid too many rerender and async cause input cursor jump
      debounceSetState();
    } else {
      setState(inputValue, false);
    }
  }, [inputValue]);

  const updateState = useEventCallback(
    (
      value: T,
      /**
       * update in typing mode or not, when `false` will trigger update immediately
       *
       * @default true
       */
      typing: boolean = true,
    ) => {
      if (typing) {
        debouncingRef.current = value !== '';
        _setState(value);
      } else {
        setState(value);
      }

      asyncOnChange?.(value);
    },
  );

  return [state.current, updateState] as const;
};
