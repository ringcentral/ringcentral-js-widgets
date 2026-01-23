import type { MouseEventHandler } from 'react';

import { RouterPlugin } from '../../plugins/Router.plugin';
import { useContainer } from '../useContainer';

export type UseSyncRouterEventsOptions = {
  /**
   * target link
   */
  to: string;
};

/**
 * prevent default router click event and handle that by `Router` module to navigate to target link with tab sync
 */
export const useRouterLinkEvents = ({ to }: UseSyncRouterEventsOptions) => {
  const router = useContainer<RouterPlugin>('Router');

  const onClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();

    if (router.currentPath !== to) {
      router.push(to);
    }
  };

  return {
    onClick,
  };
};
