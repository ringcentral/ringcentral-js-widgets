import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles.scss';
import NavigationBar from '../NavigationBar';
import TabNavigationButton from '../TabNavigationButton';
import DropdownNavigationView from '../DropdownNavigationView';
import SpinnerOverlay from '../SpinnerOverlay';

function TabNavigationView(props) {
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
      {navigationPosition === 'bottom' ? navBar : null}
    </div>
  );
}

TabNavigationView.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  currentPath: PropTypes.string.isRequired,
  currentVirtualPath: PropTypes.string,
  goTo: PropTypes.func.isRequired,
  navigationPosition: PropTypes.oneOf(['top', 'bottom', 'left']),
  brandIcon: PropTypes.node,
  tabWidth: PropTypes.string,
  tabHeight: PropTypes.string,
  tabs: NavigationBar.propTypes.tabs,
  holdReady: PropTypes.bool,
  navBarClassName: PropTypes.string,
  tabNavigationViewClassName: PropTypes.string,
  onLoading: PropTypes.bool,
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
