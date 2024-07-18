import type { FunctionComponent } from 'react';
import React from 'react';

import type {
  NavigationBarProps,
  TabPropTypes,
} from './NavigationBar.interface';

export type NavigationBarMoreMenuProps = Pick<
  NavigationBarProps,
  'tabs' | 'currentPath' | 'currentVirtualPath' | 'childNavigationView'
> & {
  goTo: (tab: TabPropTypes) => void;
};
export const NavigationBarMoreMenu: FunctionComponent<
  NavigationBarMoreMenuProps
> = ({
  tabs,
  currentPath,
  currentVirtualPath,
  childNavigationView: ChildNavigationView,
  goTo,
}) => {
  const dropdownMenuTab = tabs.find(
    (tab) =>
      tab.childTabs &&
      tab.isActive &&
      tab.isActive(currentPath, currentVirtualPath),
  );

  const dropdownMenu = dropdownMenuTab?.childTabs || [];

  return dropdownMenu.length > 0 && ChildNavigationView ? (
    <ChildNavigationView
      tabs={dropdownMenu}
      goTo={goTo}
      currentPath={currentPath}
      currentVirtualPath={currentVirtualPath}
    />
  ) : null;
};
