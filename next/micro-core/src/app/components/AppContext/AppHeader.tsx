import React, { FunctionComponent, useContext, useLayoutEffect } from 'react';

import { AppContext } from './AppContext';

/**
 * render content at the header navigation area.
 *
 * by default that is not override the default nav header, will keep the default user avatar and title
 *
 * if you need full customize that header, set the `override` to `true` to override the default nav header.
 */
export const AppHeaderNav: FunctionComponent<{
  children: React.ReactNode;
  override?: boolean;
  title?: React.ReactNode;
  resetImmediately?: boolean;
}> = ({ children, override = false, title, resetImmediately = true }) => {
  // for non spring-ui project, just return the children
  if (process.env.THEME_SYSTEM !== 'spring-ui') {
    return children as any;
  }

  const { setNav, setNavOverrideMode, setTitle, reset, cancelReset } =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useContext(AppContext);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useLayoutEffect(() => {
    cancelReset();
    setNav(children);
    setNavOverrideMode(override);
    setTitle(title);

    return () => reset(resetImmediately);
  }, [
    children,
    title,
    override,
    setNavOverrideMode,
    setNav,
    setTitle,
    cancelReset,
    reset,
    resetImmediately,
  ]);

  return null;
};

export const useAppHeader = ({
  defaultNav,
}: {
  defaultNav: React.ReactNode;
}) => {
  const { nav, navOverrideMode: override, title } = useContext(AppContext);

  return {
    nav: nav || defaultNav,
    override,
    title,
  };
};
