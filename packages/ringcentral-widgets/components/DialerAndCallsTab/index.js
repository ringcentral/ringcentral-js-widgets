import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import NavigationBar from '../NavigationBar';
import MessageTabButton from '../MessageTabButton';
import routerMap from './routerMap';
import styles from './styles.scss';
import i18n from './i18n';

function TabTitle({
  label,
  active,
}) {
  return (
    <span className={classnames(styles.tabTitle, active ? styles.active : null)}>
      {label}
    </span>
  );
}

TabTitle.propTypes = {
  label: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

TabTitle.defaultProps = {
  active: false,
};

function DialerAndCallsTab({
  currentLocale,
  currentPath,
  goTo,
  children,
}) {
  const tabs = [
    {
      icon: <TabTitle
        label={i18n.getString(routerMap.dialer, currentLocale)}
        active={currentPath === routerMap.dialer}
      />,
      label: i18n.getString(routerMap.dialer, currentLocale),
      path: routerMap.dialer,
      isActive: () => currentPath === routerMap.dialer,
    },
    {
      icon: <TabTitle
        label={i18n.getString(routerMap.allCalls, currentLocale)}
        active={currentPath === routerMap.allCalls}
      />,
      label: i18n.getString(routerMap.allCalls, currentLocale),
      path: routerMap.allCalls,
      isActive: () => currentPath === routerMap.allCalls,
    },
  ];
  return (
    <div className={styles.root}>
      <NavigationBar
        button={MessageTabButton}
        className={styles.tabBar}
        currentPath={currentPath}
        goTo={goTo}
        tabs={tabs}
        fullSizeInk={false}
      />
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}

DialerAndCallsTab.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  currentPath: PropTypes.string.isRequired,
  goTo: PropTypes.func.isRequired,
  children: PropTypes.node,
};

DialerAndCallsTab.defaultProps = {
  children: null,
};

export default DialerAndCallsTab;
