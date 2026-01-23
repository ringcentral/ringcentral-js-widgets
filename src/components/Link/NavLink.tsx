import type { ComponentProps, FunctionComponent } from 'react';
import React, { forwardRef } from 'react';
import { NavLink as BaseNavLink } from 'react-router-dom';

import type { UseSyncRouterEventsOptions } from '../../hooks/internal/useRouterLinkEvents';
import { useRouterLinkEvents } from '../../hooks/internal/useRouterLinkEvents';

export type NavLinkProps = UseSyncRouterEventsOptions &
  Omit<ComponentProps<typeof BaseNavLink>, 'to'>;

/**
 * extend react-router-dom link, using that can make route go through our `Router` module and make app route sync in each browser tab
 */
export const NavLink: FunctionComponent<NavLinkProps> = forwardRef(
  (props, ref) => {
    const events = useRouterLinkEvents(props);
    return <BaseNavLink ref={ref} {...props} {...events} />;
  },
);
