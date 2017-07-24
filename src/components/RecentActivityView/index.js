import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import NavigationBar from '../NavigationBar';
import SpinnerOverlay from '../SpinnerOverlay';
import RecentActivityNavigationButton from '../RecentActivityNavigationButton';
import RecentActivityMessages from '../RecentActivityMessages';
import RecentActivityCalls from '../RecentActivityCalls';

export default class RecentActivityView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 'recentCalls'
    };
  }

  componentDidMount() {
    this.onTabChanged();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentContact !== this.props.currentContact) {
      this.onTabChanged(this.state.currentTab, nextProps.currentContact);
    }
  }

  componentWillUnmount() {
    this.props.cleanUpMessages();
    this.props.cleanUpCalls();
  }

  onTabChanged = (tabName = 'recentMessages', currentContact = this.props.currentContact) => {
    if (tabName === 'recentMessages') {
      this.props.getRecentMessages(currentContact);
    } else if (tabName === 'recentCalls') {
      this.props.getRecentCalls();
    }
    this.setState({
      currentTab: tabName
    });
  }

  getCurrentTabPanel() {
    const {
      navigateTo,
      dateTimeFormatter,
      messages,
      calls,
      currentLocale,
      isMessagesLoaded,
      isCallsLoaded
    } = this.props;
    const currentTab = this.state.currentTab;
    if (currentTab === 'recentMessages') {
      return (
        <RecentActivityMessages
          messages={messages}
          navigateTo={navigateTo}
          dateTimeFormatter={dateTimeFormatter}
          currentLocale={currentLocale}
          isMessagesLoaded={isMessagesLoaded}
        />
      );
    } else if (currentTab === 'recentCalls') {
      return (
        <RecentActivityCalls
          calls={calls}
          dateTimeFormatter={dateTimeFormatter}
          currentLocale={currentLocale}
          isCallsLoaded={isCallsLoaded}
        />
      );
    }
    return null;
  }

  render() {
    const { showSpinner, tabs } = this.props;
    if (showSpinner) return <SpinnerOverlay />;
    const props = {
      currentPath: this.state.currentTab,
      goTo: this.onTabChanged,
      tabs
    };
    return (
      <div className={styles.recentActivityView}>
        <NavigationBar
          button={RecentActivityNavigationButton}
          className={styles.navigationBar}
          {...props}
        />
        <div className={styles.listView}>
          {this.getCurrentTabPanel()}
        </div>
      </div>
    );
  }
}

RecentActivityView.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  showSpinner: PropTypes.bool.isRequired,
  isMessagesLoaded: PropTypes.bool.isRequired,
  currentContact: PropTypes.object.isRequired,
  isCallsLoaded: PropTypes.bool.isRequired,
  tabs: PropTypes.array.isRequired,
  navigateTo: PropTypes.func.isRequired,
  dateTimeFormatter: PropTypes.func.isRequired,
  messages: PropTypes.array.isRequired,
  calls: PropTypes.array.isRequired,
  getRecentMessages: PropTypes.func.isRequired,
  getRecentCalls: PropTypes.func.isRequired,
  cleanUpMessages: PropTypes.func.isRequired,
  cleanUpCalls: PropTypes.func.isRequired
};
