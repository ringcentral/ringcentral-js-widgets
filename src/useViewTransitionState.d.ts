/**
 * when browser support view transition, this hook will temp input state and call `document.startViewTransition` before the state change.
 *
 */
export declare const useViewTransitionState: <T = unknown>(currentState: T, 
/**
 * This callback will be called before the view transition starts.
 *
 * which is useful when you want to add some animation before the view transition starts.
 */
onStartViewTransition?: (currentState: T) => void) => T;
