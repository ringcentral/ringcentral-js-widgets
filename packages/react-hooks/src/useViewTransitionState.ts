import { useOnReRender, useResultRef } from '@ringcentral/juno';
import { useRef, useState } from 'react';

/**
 * when browser support view transition, this hook will temp input state and call `document.startViewTransition` before the state change.
 *
 */
export const useViewTransitionState = <T = unknown>(
  currentState: T,
  /**
   * This callback will be called before the view transition starts.
   *
   * which is useful when you want to add some animation before the view transition starts.
   */
  onStartViewTransition?: (currentState: T) => void,
) => {
  const { current: hasViewTransition } = useResultRef(
    () =>
      'startViewTransition' in global.document &&
      typeof global.document.startViewTransition === 'function',
  );

  // because the view transition condition is never changed, so we can use useLayoutEffect in the if statement to avoid the not necessary effect binding.
  if (!hasViewTransition) {
    return currentState;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [state, setState] = useState(currentState);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const onStartViewTransitionRef = useRef(onStartViewTransition);
  if (onStartViewTransitionRef.current !== onStartViewTransition) {
    onStartViewTransitionRef.current = onStartViewTransition;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useOnReRender(() => {
    global.document.startViewTransition(() => {
      onStartViewTransitionRef.current?.(currentState);

      setState(currentState);
    });
  }, [currentState]);

  return state;
};
