import React, { FunctionComponent, useContext } from 'react';

import { AppContext } from './AppContext';
import { PortalWithCheckAgain } from './PortalWithCheckAgain';

/**
 * render content at the main content area.
 *
 * usually, the children be absolute position
 */
export const AppMainContent: FunctionComponent<{}> = ({ children }) => {
  const { mainContentRef } = useContext(AppContext);

  return (
    <PortalWithCheckAgain container={mainContentRef}>
      {children}
    </PortalWithCheckAgain>
  );
};
