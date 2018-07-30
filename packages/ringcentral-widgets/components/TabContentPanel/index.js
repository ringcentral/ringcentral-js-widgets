import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import NavigationBar from '../../components/NavigationBar';
import MessageTabButton from '../../components/MessageTabButton';
import styles from './styles.scss';

function TabTitle({
  label,
  isActive,
}) {
  return (
    <span className={classnames(styles.tabTitle, isActive() ? styles.active : null)}>
      {label}
    </span>
  );
}

TabTitle.propTypes = {
  label: PropTypes.string.isRequired,
  isActive: PropTypes.func.isRequired,
};

function TabContentPanel({
  applicable,
  navClassName,
  tabContentClassName,
  tabs,
  goTo,
  children,
}) {
  if (!applicable) {
    return children;
  }

  const formattedTabs = tabs.map(tab => ({
    icon: (
      <TabTitle
        label={tab.label}
        isActive={tab.isActive}
      />
    ),
    label: tab.label,
    path: tab.path,
    isActive: tab.isActive,
  }));

  return (
    <div className={styles.root}>
      <NavigationBar
        button={MessageTabButton}
        className={classnames({
          [styles.tabBar]: true,
          [navClassName]: !!navClassName
        })}
        currentPath=""
        goTo={goTo}
        tabs={formattedTabs}
        fullSizeInk={false}
      />
      <div className={classnames({
        [styles.content]: true,
        [tabContentClassName]: !!tabContentClassName,
      })}>
        {children}
      </div>
    </div>
  );
}

TabContentPanel.propTypes = {
  applicable: PropTypes.bool.isRequired,
  tabs: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    isActive: PropTypes.func.isRequired,
  })).isRequired,
  goTo: PropTypes.func.isRequired,
  children: PropTypes.node,
  navClassName: PropTypes.string,
  tabContentClassName: PropTypes.string,
};

TabContentPanel.defaultProps = {
  children: null,
  navClassName: null,
  tabContentClassName: null,
};

export default TabContentPanel;
