import classnames from 'classnames';
import React, { ReactNode } from 'react';

import DropdownNavigationView from '../DropdownNavigationView';
import NavigationBar, { NavigationBarProps } from '../NavigationBar';
import { SpinnerOverlay } from '../SpinnerOverlay';
import TabNavigationButton from '../TabNavigationButton';
import styles from './styles.scss';

interface TabNavigationViewProps {
  children?: ReactNode;
  className?: string;
  currentPath: string;
  currentVirtualPath?: string;
  goTo: (...args: any[]) => any;
  navigationPosition?: 'top' | 'bottom' | 'left';
  brandIcon?: ReactNode;
  tabWidth?: string;
  tabHeight?: string;
  tabs?: NavigationBarProps['tabs'];
  holdReady?: boolean;
  navBarClassName?: string;
  tabNavigationViewClassName?: string;
  onLoading?: boolean;
}

const TabNavigationView: React.FunctionComponent<TabNavigationViewProps> = ({
  navigationPosition,
  navBarClassName,
  onLoading,
  brandIcon,
  holdReady,
  className,
  tabs,
  goTo,
  tabWidth,
  tabHeight,
  currentPath,
  currentVirtualPath,
  tabNavigationViewClassName,
  children,
}) => {
  if (onLoading) {
    return <SpinnerOverlay />;
  }

  const isVertical = navigationPosition === 'left';
  const navBar = (
    <NavigationBar
      button={TabNavigationButton}
      childNavigationView={DropdownNavigationView}
      tabs={tabs}
      goTo={goTo}
      tabWidth={tabWidth}
      tabHeight={tabHeight}
      currentPath={currentPath}
      direction={isVertical ? 'vertical' : undefined}
      currentVirtualPath={currentVirtualPath}
      className={navBarClassName}
    />
  );
  if (holdReady) return null;
  return (
    <div
      className={classnames(
        styles.root,
        className,
        navigationPosition === 'left' && styles.vertical,
      )}
    >
      <div className={styles.tabContainer}>
        {navigationPosition === 'top' || navigationPosition === 'left' ? (
          <>
            {navBar}
            {navigationPosition === 'left' ? brandIcon : null}
          </>
        ) : null}
      </div>
      <div
        data-sign="tabNavigationView"
        className={classnames(
          styles.main,
          tabNavigationViewClassName,
          !isVertical && styles.hasMaxHeight,
        )}
      >
        {' '}
        {children}
      </div>
      {navigationPosition === 'bottom' ? <>{navBar}</> : null}
    </div>
  );
};

TabNavigationView.defaultProps = {
  children: null,
  className: null,
  navigationPosition: 'top',
  brandIcon: null,
  tabs: null,
  holdReady: false,
  onLoading: false,
};

export default TabNavigationView;
