import { useResizeObserver } from '@ringcentral/spring-ui';
import React, { FunctionComponent, useContext, useRef } from 'react';

import { AppContext } from './AppContext';

/**
 * ToastPositionAdjustor is a component that can adjust the toast position according to the footer height.
 *
 * normally you should use `AppFooter` for that, but if you use `ExpandedLayoutPopper`, because that render not in the App main context, that render at another portal, so you will need use this component to adjust the toast position.
 */
export const ToastPositionAdjustor: FunctionComponent<{
  additionalFooterHeight?: number;
  children: React.ReactElement;
}> = ({ children, additionalFooterHeight }) => {
  const { setFooterHeight, additionalFooterHeightRef } = useContext(AppContext);
  const footerRef = useRef<HTMLDivElement>(null);

  const updateHeight = () => {
    setFooterHeight(
      (footerRef.current?.clientHeight || 0) +
        additionalFooterHeightRef.current +
        (additionalFooterHeight || 0),
    );
  };

  useResizeObserver(footerRef, updateHeight);

  return React.cloneElement(children, { ref: footerRef });
};
