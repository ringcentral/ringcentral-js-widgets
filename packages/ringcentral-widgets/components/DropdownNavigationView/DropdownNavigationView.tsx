import type { FunctionComponent } from 'react';
import React, { useRef } from 'react';

import { useGlobalListener } from '@ringcentral/juno';

import DropdownNavigationItem from '../DropdownNavigationItem';
import type { TabPropTypes } from '../NavigationBar';
import styles from './styles.scss';

export interface DropdownNavigationViewProps {
  tabs: TabPropTypes[];
  goTo: (tab: Partial<TabPropTypes>) => void;
  currentPath: string;
  currentVirtualPath?: string;
}

const DropdownNavigation: FunctionComponent<DropdownNavigationViewProps> = ({
  tabs,
  goTo,
  currentPath,
  currentVirtualPath,
}) => {
  const childNavigationElementRef = useRef<HTMLDivElement>(null);
  const windowClickCountRef = useRef(0);

  // TODO: should switch to Juno menu
  useGlobalListener('click', (ev) => {
    const menuElm = childNavigationElementRef.current;

    // ignore first time click, cause that first click will also trigger window click
    if (windowClickCountRef.current === 0) {
      windowClickCountRef.current = 1;

      return;
    }

    if (
      !menuElm ||
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      (ev.target &&
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        (menuElm === ev.target || menuElm.contains(ev.target as Node)))
    ) {
      return;
    }

    goTo({ virtualPath: '' });
  });

  return (
    <div className={styles.root} ref={childNavigationElementRef}>
      {tabs.map((tab, index) => {
        const Icon = tab.icon;
        const ActiveIcon = tab.activeIcon;
        const active = !!(
          (tab.isActive && tab.isActive(currentPath, currentVirtualPath)) ||
          (tab.path && tab.path === currentPath) ||
          (tab.virtualPath && tab.virtualPath === currentVirtualPath)
        );
        const isReverseFillIcon = tab.path === '/contacts' && !active;
        return (
          <DropdownNavigationItem
            {...tab}
            key={index}
            onClick={() => {
              goTo(tab);
            }}
            active={active}
            icon={typeof Icon === 'function' ? <Icon /> : Icon}
            isReverseFillIcon={isReverseFillIcon}
            activeIcon={
              typeof ActiveIcon === 'function' ? <ActiveIcon /> : ActiveIcon
            }
          />
        );
      })}
    </div>
  );
};

// TODO: that check should move to outside
export const DropdownNavigationView: FunctionComponent<DropdownNavigationViewProps> =
  (props) => {
    const { tabs } = props;
    return tabs.length ? <DropdownNavigation {...props} /> : null;
  };

export default DropdownNavigationView;
