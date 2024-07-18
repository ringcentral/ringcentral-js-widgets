import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import NavigationBar from '../NavigationBar';
import RecentActivityNavigationButton from '../RecentActivityNavigationButton';
import { SpinnerOverlay } from '../SpinnerOverlay';

import styles from './styles.scss';

class RecentActivityView extends PureComponent {
  constructor(props: any) {
    super(props);
    this.state = {
      currentTab: props.defaultTab,
    };
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  componentDidMount() {
    // Switch to default tab and load all data
    this.onTabChanged();
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  componentDidUpdate(prevProps: any) {
    // @ts-expect-error TS(2339): Property 'currentContact' does not exist on type '... Remove this comment to see the full error message
    if (prevProps.currentContact.id !== this.props.currentContact.id) {
      // @ts-expect-error TS(2339): Property 'currentTab' does not exist on type 'Read... Remove this comment to see the full error message
      this.onTabChanged(this.state.currentTab);
    }
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  componentWillUnmount() {
    // @ts-expect-error TS(2339): Property 'tabs' does not exist on type 'Readonly<{... Remove this comment to see the full error message
    for (const tab of this.props.tabs) {
      tab.cleanUp();
    }
  }

  // @ts-expect-error TS(2339): Property 'defaultTab' does not exist on type 'Read... Remove this comment to see the full error message
  onTabChanged = (tabName = this.props.defaultTab) => {
    const currentTab = this.getCurrentTab(tabName);
    if (currentTab) currentTab.getData();
    this.setState({
      currentTab: tabName,
    });
  };

  getCurrentTabPanel() {
    // @ts-expect-error TS(2339): Property 'currentTab' does not exist on type 'Read... Remove this comment to see the full error message
    const currentTabPath = this.state.currentTab;
    const currentTab = this.getCurrentTab(currentTabPath);
    return currentTab ? currentTab.view : null;
  }

  getCurrentTab(currentTabPath: any) {
    // @ts-expect-error TS(2339): Property 'tabs' does not exist on type 'Readonly<{... Remove this comment to see the full error message
    const tabs = this.props.tabs;
    return tabs.find((tab: any) => tab.path === currentTabPath);
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  render() {
    // @ts-expect-error TS(2339): Property 'showSpinner' does not exist on type 'Rea... Remove this comment to see the full error message
    const { showSpinner } = this.props;
    if (showSpinner) return <SpinnerOverlay />;
    const props = {
      // @ts-expect-error TS(2339): Property 'currentTab' does not exist on type 'Read... Remove this comment to see the full error message
      currentPath: this.state.currentTab,
      goTo: (tabName: any) => {
        // @ts-expect-error TS(2339): Property 'trackClickTab' does not exist on type 'R... Remove this comment to see the full error message
        this.props.trackClickTab?.(tabName);
        this.onTabChanged(tabName);
      },
      // @ts-expect-error TS(2339): Property 'tabs' does not exist on type 'Readonly<{... Remove this comment to see the full error message
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

// @ts-expect-error TS(2339): Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
RecentActivityView.propTypes = {
  showSpinner: PropTypes.bool.isRequired,
  currentContact: PropTypes.object.isRequired,
  tabs: PropTypes.array.isRequired,
  defaultTab: PropTypes.string.isRequired,
  trackClickTab: PropTypes.func,
};

// @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
RecentActivityView.defaultProps = {
  trackClickTab: undefined,
};

export default RecentActivityView;
