import type { RcClassesProps } from '@ringcentral/juno';
import { combineClasses, styled } from '@ringcentral/juno';
import clsx from 'clsx';
import type { ComponentType } from 'react';
import React, {
  cloneElement,
  forwardRef,
  isValidElement,
  useMemo,
} from 'react';

import type { NavButtonProps } from './NavButton';
import { NavBarStyle } from './styles';
import { getTabSize, NavBarClasses } from './utils';

export type NavBarProps = {
  tabs: NavButtonProps[];
  NavItemComponent: ComponentType<NavButtonProps>;
  NavItemProps?: Partial<NavButtonProps>;
  /**
   * addition tabs follow above at the end of nav
   */
  moreTab?: React.ReactNode;
  // fullSizeInk?: boolean;
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
} & RcClassesProps<'root'>;

const _NavBar = forwardRef<any, NavBarProps>((props, ref) => {
  const {
    moreTab,
    tabs = [],
    direction = 'horizontal',
    className,
    NavItemComponent: ButtonComponent,
    NavItemProps,
    currentPath,
    onChange,
    classes: classesProp,
    ...rest
  } = props;

  const isVertical = direction === 'vertical';

  const { width: tabWidth, height: tabHeight } = NavItemProps || {};

  const sizeResult = getTabSize({
    isVertical,
    tabHeight,
    tabWidth,
    tabLength: tabs.length + (moreTab ? 1 : 0),
  });
  const { width, height } = sizeResult;

  const classes = useMemo(
    () => combineClasses(NavBarClasses, classesProp),
    [classesProp],
  );

  return (
    <nav ref={ref} className={clsx(className, classes.root)} {...rest}>
      {tabs.map((tab, index) => {
        const { to, active, onClick, ...rest } = tab;

        return (
          <ButtonComponent
            {...tab}
            active={active ?? currentPath === to}
            key={index}
            onClick={(...args) => {
              onChange?.(to);
              onClick?.(...args);
            }}
            width={width}
            height={height}
            {...NavItemProps}
          />
        );
      })}
      {isValidElement(moreTab) && cloneElement(moreTab, sizeResult)}
    </nav>
  );
});

export const NavBar = styled(_NavBar)`
  ${NavBarStyle}
`;

NavBar.displayName = 'NavBar';
