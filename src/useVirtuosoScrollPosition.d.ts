import type { StateSnapshot, VirtuosoHandle } from 'react-virtuoso';
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
export declare const useVirtuosoScrollPosition: (onScroll: (snapshot: StateSnapshot) => void, delay?: number) => {
    virtuosoActionsRef: React.RefObject<VirtuosoHandle>;
    handleScroll: () => void;
    scrollerRef: (element: HTMLElement | Window | null) => void;
};
