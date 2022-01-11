import React from 'react';

import { NavigationButtonProps } from '../TabNavigationButton';

export interface TabPropTypes extends Partial<NavigationButtonProps> {
  path?: string;
  virtualPath?: string;
  isActive?: (path: string, virtualPath: string) => boolean;
  noticeCounts?: number;
  childTabs?: TabPropTypes[];
}

export interface NavigationBarProps {
  className?: string;
  button: React.ElementType;
  childNavigationView: React.ElementType;
  tabs?: TabPropTypes[];
  goTo: (path: string, virtualPath?: string) => any;
  currentPath: string;
  currentVirtualPath?: string;
  tabWidth?: string;
  tabHeight?: string;
  fullSizeInk?: boolean;
  direction?: string;
  tooltipForceHide?: boolean;
}

export interface NavigationBarState {
  currentVirtualPath: string;
}
