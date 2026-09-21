import React, { FunctionComponent, useContext } from 'react';
import type { PropsWithChildren } from 'react';

import { AppRefsContext } from './AppContext';
import { PortalWithCheckAgain } from './PortalWithCheckAgain';

/**
 * render content at the main content area.
 *
 * usually, the children be absolute position
 */
export const AppMainContent: FunctionComponent<PropsWithChildren<{}>> = ({
  children,
}) => {
  const { mainContentRef } = useContext(AppRefsContext);

  return (
    <PortalWithCheckAgain container={mainContentRef}>
      {children}
    </PortalWithCheckAgain>
  );
};
