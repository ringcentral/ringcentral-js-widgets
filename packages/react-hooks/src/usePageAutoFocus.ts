import { useDebounce, useEventListener } from '@ringcentral/spring-ui';
import { useEffect, useLayoutEffect } from 'react';

/**
 * automatically focus on a specified target element when the page is focused.
 *
 * This purpose is to avoid grab user's focus on other elements when they not interact with the page, like load page in iframe.
 *
 * that have debouncing to prevent unwanted focus changes when users interact with other elements.
 * TODO: when one page has multiple focusable elements, we need to add a way to specify which element to focus.
 */
export const usePageAutoFocus = (
  targetRef: React.RefObject<HTMLElement | null>,
  enable = true,
) => {
  useLayoutEffect(() => {
    const targetElm = targetRef.current;
    if (!targetElm) {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.warn(
          '[usePageAutoFocus] target element is not found, please make sure the target element is rendered when you use this hook',
        );
      }

      return;
    }

    if (document.hasFocus()) {
      targetElm.focus();
    }
  }, [targetRef]);

  // use debounce to ensure user not focus on other element when focus into page
  const handlePageFocusCheck = useDebounce(() => {
    const targetElm = targetRef.current;
    // when not focus on any element, focus on input element
    if (targetElm && document.activeElement === document.body) {
      targetElm.focus();
    }
  }, 50);

  const { listen, remove } = useEventListener(
    window,
    'focus',
    handlePageFocusCheck,
    {
      startImmediately: false,
    },
  );

  useEffect(() => {
    if (enable) {
      listen();
    } else {
      remove();
    }

    return remove;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enable]);
};
