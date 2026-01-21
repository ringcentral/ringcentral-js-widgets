import { Portal, useForceUpdate } from '@ringcentral/spring-ui';
import React, { FunctionComponent, useLayoutEffect } from 'react';

/**
 * for the case that the container is not ready when the children is ready, this component will check the container again to ensure the children can be rendered.
 */
export const PortalWithCheckAgain: FunctionComponent<{
  container: React.RefObject<HTMLElement>;
}> = ({ container, children }) => {
  const forceUpdate = useForceUpdate();
  const node = container.current;

  useLayoutEffect(() => {
    if (children && !node) {
      forceUpdate();
    }
  }, [children, forceUpdate, node]);

  return children && node ? <Portal container={node}>{children}</Portal> : null;
};
