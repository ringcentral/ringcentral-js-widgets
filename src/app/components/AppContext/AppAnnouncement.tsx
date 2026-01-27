import { useResizeObserver } from '@ringcentral/spring-ui';
import React, { FunctionComponent, useContext, useState } from 'react';

import { AppContext } from './AppContext';
import { PortalWithCheckAgain } from './PortalWithCheckAgain';

export const AppAnnouncementRender: FunctionComponent<{}> = ({ children }) => {
  const { announcementRef, announcementBottomAnchorRef } =
    useContext(AppContext);

  return (
    <>
      <div ref={announcementRef}>{children}</div>
      <div ref={announcementBottomAnchorRef} className="w-full h-0"></div>
    </>
  );
};

/**
 * render content at the announcement content area.
 */
export const AppAnnouncement: FunctionComponent<{}> = ({ children }) => {
  const { announcementRef } = useContext(AppContext);

  return (
    <PortalWithCheckAgain container={announcementRef}>
      {children}
    </PortalWithCheckAgain>
  );
};

export const useAnnouncementHeight = () => {
  const { announcementRef } = useContext(AppContext);
  const [height, setHeight] = useState(
    announcementRef.current?.clientHeight || 0,
  );

  useResizeObserver(
    announcementRef,
    () => {
      setHeight(announcementRef.current?.clientHeight || 0);
    },
    {
      mode: 'none',
    },
  );

  return height;
};
