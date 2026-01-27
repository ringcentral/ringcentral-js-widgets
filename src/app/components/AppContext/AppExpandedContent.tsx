import React, { FunctionComponent, useContext } from 'react';

import { AppContext } from './AppContext';
import { PortalWithCheckAgain } from './PortalWithCheckAgain';

/**
 * render content at the expanded content area.
 *
 * usually, the children be absolute position
 */
export const AppExpandedContent: FunctionComponent<{}> = ({ children }) => {
  const { expandedContentRef } = useContext(AppContext);

  return (
    <PortalWithCheckAgain container={expandedContentRef}>
      {children}
    </PortalWithCheckAgain>
  );
};
