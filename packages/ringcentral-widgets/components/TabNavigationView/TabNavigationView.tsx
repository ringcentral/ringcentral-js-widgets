import React, { ReactNode } from 'react';
import classnames from 'classnames';
import styles from './styles.scss';

import NavigationBar, { NavigationBarProps } from '../NavigationBar';
import TabNavigationButton from '../TabNavigationButton';
import DropdownNavigationView from '../DropdownNavigationView';
import SpinnerOverlay from '../SpinnerOverlay';

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

const TabNavigationView: React.FunctionComponent<TabNavigationViewProps> = (
  props,
) => {
  const { navigationPosition, navBarClassName, onLoading, brandIcon } = props;

  if (onLoading) {
    return <SpinnerOverlay />;
  }

  const isVertical = navigationPosition === 'left';
  const navBar = (
    <NavigationBar
      button={TabNavigationButton}
      childNavigationView={DropdownNavigationView}
      tabs={props.tabs}
      goTo={props.goTo}
      tabWidth={props.tabWidth}
      tabHeight={props.tabHeight}
      currentPath={props.currentPath}
      direction={isVertical ? 'vertical' : undefined}
      currentVirtualPath={props.currentVirtualPath}
      className={navBarClassName}
    />
  );
  if (props.holdReady) return null;
  return (
    <div
      className={classnames(
        styles.root,
        props.className,
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
          props.tabNavigationViewClassName,
          !isVertical && styles.hasMaxHeight,
        )}
      >
        {' '}
        {props.children}
      </div>
      {navigationPosition === 'bottom' ? <>{navBar}</> : null}
    </div>
  );
};

TabNavigationView.defaultProps = {
  children: null,
  className: null,
  currentVirtualPath: undefined,
  navigationPosition: 'top',
  brandIcon: null,
  tabWidth: undefined,
  tabHeight: undefined,
  tabs: null,
  holdReady: false,
  navBarClassName: undefined,
  tabNavigationViewClassName: undefined,
  onLoading: false,
};

export default TabNavigationView;
