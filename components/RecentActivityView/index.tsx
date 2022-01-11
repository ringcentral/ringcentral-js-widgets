import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

import NavigationBar from '../NavigationBar';
import RecentActivityNavigationButton from '../RecentActivityNavigationButton';
import { SpinnerOverlay } from '../SpinnerOverlay';
import styles from './styles.scss';

class RecentActivityView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: props.defaultTab,
    };
  }

  componentDidMount() {
    // Switch to default tab and load all data
    this.onTabChanged();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentContact.id !== this.props.currentContact.id) {
      this.onTabChanged(this.state.currentTab);
    }
  }

  componentWillUnmount() {
    for (const tab of this.props.tabs) {
      tab.cleanUp();
    }
  }

  onTabChanged = (tabName = this.props.defaultTab) => {
    const currentTab = this.getCurrentTab(tabName);
    if (currentTab) currentTab.getData();
    this.setState({
      currentTab: tabName,
    });
  };

  getCurrentTabPanel() {
    const currentTabPath = this.state.currentTab;
    const currentTab = this.getCurrentTab(currentTabPath);
    return currentTab ? currentTab.view : null;
  }

  getCurrentTab(currentTabPath) {
    const tabs = this.props.tabs;
    return tabs.find((tab) => tab.path === currentTabPath);
  }

  render() {
    const { showSpinner } = this.props;
    if (showSpinner) return <SpinnerOverlay />;
    const props = {
      currentPath: this.state.currentTab,
      goTo: (tabName) => {
        this.props.trackClickTab?.(tabName);
        this.onTabChanged(tabName);
      },
      tabs: this.props.tabs,
    };
    return (
      <div className={styles.recentActivityView} data-sign="recentActivityView">
        <NavigationBar
          button={RecentActivityNavigationButton}
          className={styles.navigationBar}
          {...props}
        />
        <div className={styles.listView}>{this.getCurrentTabPanel()}</div>
      </div>
    );
  }
}

RecentActivityView.propTypes = {
  showSpinner: PropTypes.bool.isRequired,
  currentContact: PropTypes.object.isRequired,
  tabs: PropTypes.array.isRequired,
  defaultTab: PropTypes.string.isRequired,
  trackClickTab: PropTypes.func,
};

RecentActivityView.defaultProps = {
  trackClickTab: undefined,
};

export default RecentActivityView;
