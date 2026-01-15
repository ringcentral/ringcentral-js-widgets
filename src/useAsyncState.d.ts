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
export declare const useAsyncState: <T = string>(inputValue: T, asyncOnChange?: (value: T) => void) => readonly [T, (value: T, typing?: boolean) => void];
