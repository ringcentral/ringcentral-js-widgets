import React, { FunctionComponent, useContext } from 'react';
import type { PropsWithChildren } from 'react';

import { AppRefsContext } from './AppContext';
import { PortalWithCheckAgain } from './PortalWithCheckAgain';

/**
 * render content at the expanded content area.
 *
 * usually, the children be absolute position
 */
export const AppExpandedContent: FunctionComponent<PropsWithChildren<{}>> = ({
  children,
}) => {
  const { expandedContentRef } = useContext(AppRefsContext);

  return (
    <PortalWithCheckAgain container={expandedContentRef}>
      {children}
    </PortalWithCheckAgain>
  );
};
