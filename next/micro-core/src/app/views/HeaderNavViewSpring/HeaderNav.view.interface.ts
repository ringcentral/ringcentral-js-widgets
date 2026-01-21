import { type BadgeProps, type TooltipProps } from '@ringcentral/spring-ui';
import type { ComponentProps, ComponentType } from 'react';

import type { HeaderNav } from './HeaderNav';

export interface HeaderNavViewSpringOptions {
  component?: typeof HeaderNav;
  /**
   * enables video tab in navigation
   */
  enableVideoTab?: boolean;
}

export type NavButtonProps = {
  /**
   * emit path when button click
   */
  to: string;
  /**
   * title
   */
  title: string;
  /**
   * tooltip
   */
  tooltip?: React.ReactNode;
  /**
   * display icon component
   */
  symbol?: ComponentType<any>;
  /**
   * active icon component
   */
  activeSymbol?: ComponentType<any>;
  /**
   * event with click button, follow up with current `path`
   */
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    path: string,
  ) => void;
  /**
   * active state
   */
  active?: boolean;
  /**
   * props pass to tooltip
   */
  TooltipProps?: TooltipProps;
  /**
   * props pass to badge
   */
  BadgeProps?: Partial<BadgeProps>;
  width?: string;
  height?: string;
  dataSign?: string;
} & Omit<ComponentProps<'button'>, 'onClick' | 'ref'>;

export type HeaderNavPanelProps = {
  tabs: NavButtonProps[];
  NavItemProps?: Partial<NavButtonProps>;
  /**
   * @default 'horizontal'
   */
  direction?: 'horizontal' | 'vertical';
  tooltipForceHide?: boolean;
  /**
   * current active tab to path,
   */
  currentPath?: string;
  /**
   * on children tab click
   */
  onChange?: (path: string) => void;
  className?: string;
};
