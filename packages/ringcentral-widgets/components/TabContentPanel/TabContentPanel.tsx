import clsx from 'clsx';
import React from 'react';

import { MessageTabButton } from '../MessageTabButton';
import { NavigationBar } from '../NavigationBar';

import { TabTitle } from './TabTitle';
import styles from './styles.scss';

type TabContentPanelProps = {
  showTabs?: boolean;
  tabs: {
    path: string;
    label: string;
    isActive: (...args: any[]) => any;
    dataSign: string;
  }[];
  goTo: (...args: any[]) => any;
  navClassName?: string;
  tabContentClassName?: string;
  tooltipForceHide?: boolean;
};

const TabContentPanel: React.FC<TabContentPanelProps> = ({
  showTabs,
  navClassName,
  tabContentClassName,
  tabs,
  goTo,
  tooltipForceHide,
  children,
}) => {
  const renderChildren = () => {
    if (typeof children === 'function') {
      return children({ showTabs });
    }
    return children;
  };

  if (!showTabs) {
    return renderChildren();
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
        className={clsx(styles.tabBar, navClassName)}
        currentPath=""
        goTo={goTo}
        tabs={formattedTabs}
        fullSizeInk={false}
        tooltipForceHide={tooltipForceHide}
      />
      <div className={clsx(styles.content, tabContentClassName)}>
        {renderChildren()}
      </div>
    </div>
  );
};

TabContentPanel.defaultProps = {
  showTabs: false,
};

export default TabContentPanel;
