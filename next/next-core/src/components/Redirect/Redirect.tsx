import { FunctionComponent, useLayoutEffect } from 'react';

import { useContainer } from '../../hooks';
import type { UseSyncRouterEventsOptions } from '../../hooks/internal/useRouterLinkEvents';
import { RouterPlugin } from '../../plugins';

export type RedirectProps = UseSyncRouterEventsOptions;

/**
 * not extend react-router-dom link, just return null and replace route though server sync
 */
export const Redirect: FunctionComponent<RedirectProps> = (props) => {
  const router = useContainer<RouterPlugin>('Router');

  useLayoutEffect(() => {
    router.replace(props.to);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.to]);

  return null;
};
