import { useResizeObserver } from '@ringcentral/spring-ui';
import React, { FunctionComponent, useContext, useRef } from 'react';

import { AppContext, AppRefsContext } from './AppContext';

/**
 * ToastPositionAdjustor is a component that can adjust the toast position according to the footer height.
 *
 * normally you should use `AppFooter` for that, but if you use `ExpandedLayoutPopper`, because that render not in the App main context, that render at another portal, so you will need use this component to adjust the toast position.
 */
export const ToastPositionAdjustor: FunctionComponent<{
  additionalFooterHeight?: number;
  children: React.ReactElement;
}> = ({ children, additionalFooterHeight }) => {
  const { setFooterHeight } = useContext(AppContext);
  const { additionalFooterHeightRef } = useContext(AppRefsContext);
  const footerRef = useRef<HTMLDivElement>(null);

  const updateHeight = () => {
    const footer = footerRef.current;
    if (!footer) {
      // when footer element is not mounted, use the existing footer height from the context, skip set
      return;
    }
    const height =
      footer.clientHeight +
      additionalFooterHeightRef.current +
      (additionalFooterHeight || 0);

    setFooterHeight(height);
  };

  useResizeObserver(footerRef, updateHeight);

  return React.cloneElement(children, { ref: footerRef });
};
