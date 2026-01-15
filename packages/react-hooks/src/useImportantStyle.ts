import { type CSSProperties, useLayoutEffect } from 'react';

/**
 * set style with react, important is not able to set in react, so must need to use this hook to set style
 *
 * https://github.com/facebook/react/issues/1881#issuecomment-262257503
 */
export const useImportantStyle = (
  ref: React.MutableRefObject<HTMLElement | null>,
  style: CSSProperties,
) => {
  useLayoutEffect(() => {
    const container = ref.current;
    if (!container) return;

    Object.entries(style).forEach(([key, value]) => {
      container.style.setProperty(key, value, 'important');
    });
  }, [ref, style]);
};
