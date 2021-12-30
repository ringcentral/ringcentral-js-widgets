import { useContext, useEffect, useRef } from 'react';

import { SelectListContext } from '../contexts';

/**
 * Not using scrollIntoView, that will cause problem in iframe in salesforce classic mode.
 * Use that with `SelectListContext`
 * @param scrollIntoView is that should be scrollIntoView
 */
export function useScrollIntoView(scrollIntoView: boolean = true) {
  const targetElementRef = useRef(null);

  const { scrollElmRef } = useContext(SelectListContext);

  useEffect(() => {
    const targetElm = targetElementRef.current;
    const scrollElm = scrollElmRef?.current;

    if (
      scrollIntoView &&
      targetElm &&
      scrollElm &&
      // if that scrollElm has scroll bar
      scrollElm.scrollHeight > scrollElm.clientHeight &&
      // if that is out of scroll container
      scrollElm.scrollTop + scrollElm.clientHeight <
        targetElm.offsetTop + targetElm.clientHeight
    ) {
      scrollElm.scrollTop = targetElm.offsetTop;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollIntoView]);

  return targetElementRef;
}
