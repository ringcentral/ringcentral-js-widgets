import type { ComponentType } from 'react';
import type React from 'react';

import type { NavigationButtonProps } from '../TabNavigationButton';

import type { NavigationBarMoreMenuProps } from './NavigationBarMoreMenu';

export interface TabPropTypes extends Partial<NavigationButtonProps> {
  path: string;
  virtualPath?: string;
  isActive?: (path: string, virtualPath?: string) => boolean;
  noticeCounts?: number;
  childTabs?: TabPropTypes[];
}

export interface NavigationBarProps {
  className?: string;
  button: React.ElementType;
  childNavigationView?: ComponentType<
    Omit<NavigationBarMoreMenuProps, 'childNavigationView'>
  >;
  tabs: TabPropTypes[];
  goTo?: (path: string, virtualPath?: string) => any;
  currentPath: string;
  currentVirtualPath?: string;
  tabWidth?: string;
  tabHeight?: string;
  fullSizeInk?: boolean;
  /**
   * @default 'horizontal'
   */
  direction?: 'horizontal' | 'vertical';
  tooltipForceHide?: boolean;
}

export interface NavigationBarState {
  currentVirtualPath: string;
}
