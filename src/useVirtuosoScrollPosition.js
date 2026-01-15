"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useVirtuosoScrollPosition = void 0;
const spring_ui_1 = require("@ringcentral/spring-ui");
const react_1 = require("react");
/**
 * A custom React hook that helps manage scroll position state for react-virtuoso lists
 *
 * This hook provides:
 * - Virtuoso list reference handling via useRef
 * - Debounced scroll position tracking
 * - Automatic scroll position restoration
 *
 * @param setLastPosition - Callback function to save the current scroll position state
 * @param delay - Debounce delay in milliseconds before saving scroll position (default: 300ms)
 *
 * @returns {Object} Returns an object containing:
 *   - virtuosoActionsRef: React ref for the Virtuoso component
 *   - handleScroll: Debounced scroll handler to track position
 *
 * @example
 * ```tsx
 * const { virtuosoActionsRef, handleScroll } = useVirtuosoScrollPosition(
 *   (snapshot) => savePosition(snapshot),
 *   500 // optional custom delay
 * );
 *
 * return (
 *   <Virtuoso
 *     ref={virtuosoActionsRef}
 *     isScrolling={handleScroll}
 *     // ... other props
 *   />
 * );
 * ```
 */
const useVirtuosoScrollPosition = (onScroll, delay = 300) => {
    const virtuosoActionsRef = (0, react_1.useRef)(null);
    const handleScroll = (0, spring_ui_1.useDebounce)(() => {
        var _a;
        (_a = virtuosoActionsRef.current) === null || _a === void 0 ? void 0 : _a.getState((snapshot) => {
            return onScroll(snapshot);
        });
    }, delay, { trailing: true });
    const scrollerRef = (0, react_1.useCallback)((element) => {
        if (element && element instanceof HTMLElement) {
            element.addEventListener('scroll', handleScroll);
            return () => element.removeEventListener('scroll', handleScroll);
        }
    }, [handleScroll]);
    return {
        virtuosoActionsRef,
        handleScroll,
        scrollerRef,
    };
};
exports.useVirtuosoScrollPosition = useVirtuosoScrollPosition;
//# sourceMappingURL=useVirtuosoScrollPosition.js.map