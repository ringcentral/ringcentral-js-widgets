import React, { ReactNode } from 'react';

export interface TabPropTypes {
  icon?: (...args: any[]) => any | ReactNode;
  activeIcon?: (...args: any[]) => any | ReactNode;
  label?: string;
  path?: string;
  virtualPath?: string;
  isActive?: (...args: any[]) => any;
  noticeCounts?: number;
  childTabs?: TabPropTypes[];
}

export interface NavigationBarProps {
  className?: string;
  button: (...args: any[]) => any | React.Component;
  childNavigationView: React.Component;
  tabs?: TabPropTypes[];
  goTo: (...args: any[]) => any;
  currentPath: string;
  currentVirtualPath?: string;
  tabWidth?: string;
  tabHeight?: string;
  fullSizeInk?: boolean;
  direction?: string;
}
