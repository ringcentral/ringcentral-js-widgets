import { useEventListener } from '@ringcentral/spring-ui';
import { useEffect, useState } from 'react';

/**
 * A React hook that tracks whether a page has ever been visible to the user.
 *
 * This hook is particularly useful for work with requestAnimationFrame, because the requestAnimationFrame will not be triggered until the page is visible.
 *
 */
export const useEverVisible = () => {
  const [everVisible, setEverVisible] = useState(
    document.visibilityState === 'visible',
  );

  const { listen, remove } = useEventListener(
    document,
    'visibilitychange',
    () => {
      if (document.visibilityState === 'visible') {
        setEverVisible(true);
        remove();
      }
    },
    {
      startImmediately: false,
    },
  );

  useEffect(() => {
    if (!everVisible) {
      listen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return everVisible;
};
