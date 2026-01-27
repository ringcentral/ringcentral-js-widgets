import { Popper, PopperActions, useOnReRender } from '@ringcentral/spring-ui';
import React, { FunctionComponent, useContext, useRef, useState } from 'react';

import { useAnnouncementHeight } from './AppAnnouncement';
import { AppContext } from './AppContext';
import { AppExpandedContent } from './AppExpandedContent';

/**
 * similar to the `AppExpandedContent`, but this component will render a Popper component to show the children.
 *
 * in some case, want your element want to render in the expanded layout, but not in the main content, you can use this component.
 */
export const ExpandedLayoutPopper: FunctionComponent<{
  expanded: boolean;
}> = ({ children, expanded }) => {
  const [expandedElm, setExpandedElm] = useState<HTMLDivElement | null>(null);
  const { announcementBottomAnchorRef } = useContext(AppContext);
  const announcementHeight = useAnnouncementHeight();
  const actionsRef = useRef<PopperActions>(null);

  useOnReRender(() => {
    actionsRef.current?.update();
  }, [announcementHeight]);

  const topFullScreenFullElmAnchor = announcementBottomAnchorRef.current;
  return (
    <>
      <Popper
        anchorEl={() => (expanded ? expandedElm : topFullScreenFullElmAnchor)}
        placement="bottom"
        offset={0}
        // in test env not use matchAnchor width for us better debug
        matchAnchorWidth={process.env.NODE_ENV !== 'test'}
        className="z-drawer bg-neutral-base overflow-hidden"
        style={{
          height: `calc(100vh - ${announcementHeight}px)`,
          // in test env use 100% for us better debug
          width: process.env.NODE_ENV === 'test' ? '100%' : undefined,
        }}
        actions={actionsRef}
        onClick={(e) => {
          // TODO: spring-ui issue, click event will trigger the host item click event
          e.stopPropagation();
        }}
      >
        {children}
      </Popper>

      <AppExpandedContent>
        <div
          ref={(elm) => {
            setExpandedElm(elm);
          }}
          className="w-full h-0"
        ></div>
      </AppExpandedContent>
    </>
  );
};
