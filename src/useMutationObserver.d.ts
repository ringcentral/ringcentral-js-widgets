import { RefOrElementOrCallback } from '@ringcentral/spring-ui';
export type UseMutationObserverAction = {
    observe: () => void;
    stop: () => void;
};
export type UseMutationObserverConfig = {
    /**
     * start listening when component mounted
     *
     * @default true
     */
    startImmediately?: boolean;
};
/**
 * Watch for changes being made to the DOM tree.
 *
 * @param target - React ref or DOM node
 * @param callback - callback to execute when mutations are observed
 * @param options - Options passed to mutation observer
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver MutationObserver MDN
 * @see https://react-hooks-library.vercel.app/core/useMutationObserver
 */
export declare function useMutationObserver(
/** target element ref */
target: RefOrElementOrCallback, callback: MutationCallback, options?: MutationObserverInit, { startImmediately }?: UseMutationObserverConfig): UseMutationObserverAction;
