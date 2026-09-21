import React, { FunctionComponent, useContext, useState } from 'react';
import type { PropsWithChildren } from 'react';

import { AnchorOverlay } from './AnchorOverlay';
import { AppRefsContext } from './AppContext';
import { AppExpandedContent } from './AppExpandedContent';

/**
 * Similar to `AppExpandedContent`, but renders children in an AnchorOverlay that covers the expanded area.
 * Use this when you want content in the expanded layout but not in the main content flow.
 */
export const ExpandedLayoutPopper: FunctionComponent<{
  expanded: boolean;
} & PropsWithChildren<{}>> = ({ children, expanded }) => {
  const [expandedElm, setExpandedElm] = useState<HTMLDivElement | null>(null);
  const { mainContentRef } = useContext(AppRefsContext);

  const anchorEl = () => (expanded ? expandedElm : mainContentRef.current);

  return (
    <>
      <AnchorOverlay anchorEl={anchorEl}>{children}</AnchorOverlay>

      <AppExpandedContent>
        <div
          ref={(elm) => {
            setExpandedElm(elm);
          }}
          // expanded area popper over must be full screen that should not be affected by others elements
          className="size-full absolute top-0 left-0"
        />
      </AppExpandedContent>
    </>
  );
};
