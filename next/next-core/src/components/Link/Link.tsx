import type { ComponentProps, FunctionComponent } from 'react';
import React, { forwardRef } from 'react';
import { Link as BaseLink } from 'reactant-web';

import type { UseSyncRouterEventsOptions } from '../../hooks/internal/useRouterLinkEvents';
import { useRouterLinkEvents } from '../../hooks/internal/useRouterLinkEvents';

export type LinkProps = UseSyncRouterEventsOptions &
  Omit<ComponentProps<typeof BaseLink>, 'to'>;
/**
 * extend react-router-dom link, using that can make route go through our `Router` module and make app route sync in each browser tab
 */
export const Link: FunctionComponent<LinkProps> = forwardRef((props, ref) => {
  const events = useRouterLinkEvents(props);

  return <BaseLink ref={ref} {...props} {...events} />;
});
