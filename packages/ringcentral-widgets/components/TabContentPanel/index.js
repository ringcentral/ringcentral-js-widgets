import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import NavigationBar from '../../components/NavigationBar';
import MessageTabButton from '../../components/MessageTabButton';
import styles from './styles.scss';

function TabTitle({ label, isActive, ...rest }) {
  return (
    <span
      {...rest}
      className={classnames(styles.tabTitle, isActive() ? styles.active : null)}
    >
      {label}
    </span>
  );
}

TabTitle.propTypes = {
  label: PropTypes.string.isRequired,
  isActive: PropTypes.func.isRequired,
};

function renderChildren({ children, showTabs }) {
  if (typeof children === 'function') {
    return children({ showTabs });
  }
  return children;
}

function TabContentPanel({
  showTabs,
  navClassName,
  tabContentClassName,
  tabs,
  goTo,
  children,
}) {
  if (!showTabs) {
    return renderChildren({ children, showTabs });
  }

  const formattedTabs = tabs.map((tab) => ({
    icon: (
      <TabTitle
        label={tab.label}
        isActive={tab.isActive}
        data-sign={tab.dataSign}
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
          [navClassName]: !!navClassName,
        })}
        currentPath=""
        goTo={goTo}
        tabs={formattedTabs}
        fullSizeInk={false}
      />
      <div
        className={classnames({
          [styles.content]: true,
          [tabContentClassName]: !!tabContentClassName,
        })}
      >
        {renderChildren({ children, showTabs })}
      </div>
    </div>
  );
}

TabContentPanel.propTypes = {
  showTabs: PropTypes.bool,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      isActive: PropTypes.func.isRequired,
    }),
  ).isRequired,
  goTo: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  navClassName: PropTypes.string,
  tabContentClassName: PropTypes.string,
};

TabContentPanel.defaultProps = {
  showTabs: false,
  navClassName: null,
  children: null,
  tabContentClassName: null,
};

export default TabContentPanel;
