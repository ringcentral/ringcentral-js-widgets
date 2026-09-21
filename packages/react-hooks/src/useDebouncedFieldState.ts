import {
  useDebounce,
  useDepsChange,
  useEventCallback,
  useRefState,
} from '@ringcentral/spring-ui';
import { useRef } from 'react';

const DEFAULT_DEBOUNCE_MS = 500;

type SetInputValueOptions = {
  flush?: boolean;
};

type UseDebouncedFieldStateOptions<T> = {
  value: T;
  onChange?: (value: T) => void;
  debounceMs?: number;
  shouldDebounceOnChange?: boolean;
};

type UseDebouncedFieldStateResult<T> = {
  inputValue: T;
  setInputValue: (nextValue: T, options?: SetInputValueOptions) => void;
  focusInput: () => void;
  blurInput: () => void;
  flushInputValue: (nextValue?: T) => void;
};

export const useDebouncedFieldState = <T = string>({
  value,
  onChange,
  debounceMs = DEFAULT_DEBOUNCE_MS,
  shouldDebounceOnChange = false,
}: UseDebouncedFieldStateOptions<T>): UseDebouncedFieldStateResult<T> => {
  const [inputValue, setInputValueState] = useRefState<T>(value);
  // Focus and dirty refs decide whether parent updates can overwrite the input.
  const isFocusedRef = useRef(false);
  const isDirtyRef = useRef(false);
  // Keep the latest parent value and local change for delayed callbacks.
  const parentValueRef = useRef(value);
  const changeValueRef = useRef(value);
  const onChangeRef = useRef(onChange);

  // Debounced callbacks should always call the latest onChange prop.
  onChangeRef.current = onChange;

  const debounceNotifyChange = useDebounce(() => {
    // Push the latest local value to the parent after the debounce delay.
    onChangeRef.current?.(changeValueRef.current);
  }, debounceMs);

  const debounceSyncParentValue = useDebounce(() => {
    // Pull the latest parent value into the input when the input is safe to sync.
    changeValueRef.current = parentValueRef.current;
    setInputValueState(parentValueRef.current);
  }, debounceMs);

  const isInputProtected = useEventCallback(() => {
    // A dirty input means the user has local edits that should not be overwritten.
    return isDirtyRef.current;
  });

  const syncInputValue = useEventCallback(
    (nextValue: T, rerender?: false | undefined) => {
      // Local sync cancels any pending parent sync because this value wins now.
      changeValueRef.current = nextValue;
      debounceSyncParentValue.cancel();
      setInputValueState(nextValue, rerender);
    },
  );

  const flushInputValue = useEventCallback(
    (nextValue: T = inputValue.current) => {
      const flushValue = nextValue;
      changeValueRef.current = flushValue;
      // Commit immediately and prevent a later debounced commit from firing again.
      debounceNotifyChange.cancel();
      onChangeRef.current?.(flushValue);
    },
  );

  useDepsChange(() => {
    parentValueRef.current = value;
    if (inputValue.current === value) {
      // Already in sync with parent, so any pending parent sync is stale.
      debounceSyncParentValue.cancel();
      return;
    }
    if (isInputProtected()) {
      // User edits are in progress; keep the local value as the visible value.
      debounceSyncParentValue.cancel();
      return;
    }
    if (inputValue.current !== '' && value === '') {
      // External clear should be reflected immediately without forcing a render.
      syncInputValue(value, false);
      return;
    }
    // Clean input can follow parent changes, but debounce to avoid flicker.
    debounceSyncParentValue();
  }, [value]);

  const setInputValue = useEventCallback(
    (nextValue: T, options: SetInputValueOptions = {}) => {
      if (!isDirtyRef.current && nextValue === changeValueRef.current) {
        // Ignore same-value updates so focus/blur does not create dirty state.
        return;
      }
      if (nextValue !== changeValueRef.current) {
        // Mark dirty only when the user actually changes the current local value.
        isDirtyRef.current = true;
      }
      changeValueRef.current = nextValue;
      // Local input edits should cancel delayed parent-to-input syncing.
      debounceSyncParentValue.cancel();
      setInputValueState(nextValue);
      if (options.flush) {
        // Used for selections or actions that must notify the parent right away.
        flushInputValue(nextValue);
        if (!isFocusedRef.current) {
          isDirtyRef.current = false;
        }
        return;
      }
      if (!shouldDebounceOnChange) {
        // Default behavior: notify parent immediately on every local change.
        flushInputValue(nextValue);
        if (!isFocusedRef.current) {
          isDirtyRef.current = false;
        }
        return;
      }
      // Debounced mode: update UI now, notify parent later or on blur.
      debounceNotifyChange();
    },
  );

  const focusInput = useEventCallback(() => {
    isFocusedRef.current = true;
    // Avoid applying a pending parent sync while the user starts editing.
    debounceSyncParentValue.cancel();
  });

  const blurInput = useEventCallback(() => {
    if (isDirtyRef.current) {
      // Commit the user's last local value before leaving the field.
      flushInputValue();
    } else if (inputValue.current !== parentValueRef.current) {
      // If nothing was edited, reconcile display with the latest parent value.
      syncInputValue(parentValueRef.current);
    }
    isFocusedRef.current = false;
    isDirtyRef.current = false;
  });

  return {
    inputValue: inputValue.current,
    setInputValue,
    focusInput,
    blurInput,
    flushInputValue,
  } as const;
};
