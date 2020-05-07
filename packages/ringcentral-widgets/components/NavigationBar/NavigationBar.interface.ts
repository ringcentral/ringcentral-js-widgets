import React from 'react';

import { NavigationButtonProps } from '../TabNavigationButton';

export interface TabPropTypes extends Partial<NavigationButtonProps> {
  path?: string;
  virtualPath?: string;
  isActive?: (...args: any[]) => any;
  noticeCounts?: number;
  childTabs?: TabPropTypes[];
}

export interface NavigationBarProps {
  className?: string;
  button: React.ReactType;
  childNavigationView: React.ReactType;
  tabs?: TabPropTypes[];
  goTo: (...args: any[]) => any;
  currentPath: string;
  currentVirtualPath?: string;
  tabWidth?: string;
  tabHeight?: string;
  fullSizeInk?: boolean;
  direction?: string;
}

export interface NavigationBarState {
  currentVirtualPath: string;
}
