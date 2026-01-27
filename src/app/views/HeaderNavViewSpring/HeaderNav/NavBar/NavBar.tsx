import clsx from 'clsx';
import React, { ComponentType, forwardRef } from 'react';

import type {
  HeaderNavPanelProps,
  NavButtonProps,
} from '../../HeaderNav.view.interface';

type NavBarProps = HeaderNavPanelProps & {
  NavItemComponent: ComponentType<NavButtonProps>;
};

export const NavBar = forwardRef<any, NavBarProps>((props, ref) => {
  const {
    tabs = [],
    // direction = 'horizontal',
    className,
    NavItemComponent: ButtonComponent,
    NavItemProps,
    currentPath,
    onChange,
    ...rest
  } = props;

  // const isVertical = direction === 'vertical';

  return (
    <nav
      ref={ref}
      className={clsx(
        'bg-neutral-b5/50 border-t border-neutral-b0-t20 grid auto-fit-0 flex-none h-[52px]',
        className,
      )}
      data-sign="nav-bar"
      {...rest}
    >
      {tabs.map((tab, index) => {
        const { to, active, onClick } = tab;

        return (
          <ButtonComponent
            {...tab}
            BadgeProps={{
              size: 'small',
              ...(tab.BadgeProps ?? {}),
            }}
            active={active ?? currentPath === to}
            key={index}
            onClick={(...args) => {
              onChange?.(to);
              onClick?.(...args);
            }}
            {...NavItemProps}
          />
        );
      })}
    </nav>
  );
});

NavBar.displayName = 'NavBar';
