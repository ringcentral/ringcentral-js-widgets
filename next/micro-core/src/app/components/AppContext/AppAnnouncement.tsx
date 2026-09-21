import { useResizeObserver } from '@ringcentral/spring-ui';
import React, { FunctionComponent, useContext, useState } from 'react';
import type { PropsWithChildren } from 'react';

import { AppRefsContext } from './AppContext';
import { PortalWithCheckAgain } from './PortalWithCheckAgain';

export const AppAnnouncementRender: FunctionComponent<PropsWithChildren<{}>> = ({
  children,
}) => {
  const { announcementRef, announcementBottomAnchorRef } =
    useContext(AppRefsContext);

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
export const AppAnnouncement: FunctionComponent<PropsWithChildren<{}>> = ({
  children,
}) => {
  const { announcementRef } = useContext(AppRefsContext);

  return (
    <PortalWithCheckAgain container={announcementRef}>
      {children}
    </PortalWithCheckAgain>
  );
};

export const useAnnouncementHeight = () => {
  const { announcementRef } = useContext(AppRefsContext);
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
