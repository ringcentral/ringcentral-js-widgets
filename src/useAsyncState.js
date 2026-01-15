"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAsyncState = void 0;
const spring_ui_1 = require("@ringcentral/spring-ui");
const react_1 = require("react");
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
const useAsyncState = (inputValue, asyncOnChange) => {
    const [state, _setState] = (0, spring_ui_1.useRefState)(inputValue);
    const debouncingRef = (0, react_1.useRef)(false);
    const debounceSetState = (0, spring_ui_1.useDebounce)(() => {
        setState(inputValue);
    }, 500);
    const setState = (0, spring_ui_1.useEventCallback)((val, rerender) => {
        debouncingRef.current = false;
        debounceSetState.cancel();
        _setState(val, rerender);
    });
    (0, spring_ui_1.useDepsChange)(() => {
        if (state.current === inputValue) {
            debouncingRef.current = false;
            return;
        }
        // when be empty from outside, cancel previous debounce prevent update show again
        if (state.current !== '' && inputValue === '') {
            setState(inputValue, false);
        }
        else if (debouncingRef.current) {
            // use debounce to avoid too many rerender and async cause input cursor jump
            debounceSetState();
        }
        else {
            setState(inputValue, false);
        }
    }, [inputValue]);
    const updateState = (0, spring_ui_1.useEventCallback)((value, 
    /**
     * update in typing mode or not, when `false` will trigger update immediately
     *
     * @default true
     */
    typing = true) => {
        if (typing) {
            debouncingRef.current = value !== '';
            _setState(value);
        }
        else {
            setState(value);
        }
        asyncOnChange === null || asyncOnChange === void 0 ? void 0 : asyncOnChange(value);
    });
    return [state.current, updateState];
};
exports.useAsyncState = useAsyncState;
//# sourceMappingURL=useAsyncState.js.map