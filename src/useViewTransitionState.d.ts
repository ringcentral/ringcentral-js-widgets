/**
 * when browser support view transition, this hook will temp input state and call `document.startViewTransition` before the state change.
 *
 */
export declare const useViewTransitionState: <T = unknown>(currentState: T, onStartViewTransition?: (currentState: T) => void) => T;
