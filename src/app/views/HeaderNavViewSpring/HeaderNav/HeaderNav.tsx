import { combineProps } from '@ringcentral/juno';
import type { FunctionComponent } from 'react';
import React, { useMemo } from 'react';

import type { HeaderNavPanelProps } from '../HeaderNav.view.interface';

import { NavBar } from './NavBar';
import { NavButton } from './NavButton';

export const HeaderNav: FunctionComponent<HeaderNavPanelProps> = (props) => {
  const {
    tabs,
    NavItemProps: NavItemPropsProp,
    onChange,
    currentPath,
    ...rest
  } = props;

  const NavItemProps = useMemo(
    () =>
      combineProps(
        {
          onClick: (e, path) => onChange?.(path),
        },
        NavItemPropsProp,
      ),
    [NavItemPropsProp, onChange],
  );

  return (
    <NavBar
      {...rest}
      currentPath={currentPath}
      NavItemComponent={NavButton}
      NavItemProps={NavItemProps}
      tabs={tabs}
    />
  );
};
