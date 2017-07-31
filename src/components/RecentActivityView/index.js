import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import NavigationBar from '../NavigationBar';
import SpinnerOverlay from '../SpinnerOverlay';
import RecentActivityNavigationButton from '../RecentActivityNavigationButton';
import RecentActivityMessages from '../RecentActivityMessages';
import RecentActivityCalls from '../RecentActivityCalls';
import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import GmailIcon from '../../assets/images/Gmail.svg';
import VoicemailIcon from '../../assets/images/VoicemailIcon.svg';
import FaxIcon from '../../assets/images/Fax.svg';
import i18n from './i18n';

function getTabs({ locale, unreadMessageCounts }) {
  const currentLocale = locale.currentLocale;
  return [
    {
      icon: <span><GmailIcon width={20} height={20} className={styles.gmail} /></span>,
      label: i18n.getString('gmail', currentLocale),
      path: 'gmail',
      isActive: path => path === 'gmail'
    },
    {
      icon: <VoicemailIcon width={23} height={23} />,
      label: i18n.getString('voicemail', currentLocale),
      path: 'voicemails',
      isActive: path => path === 'voicemails'
    },
    {
      icon: <span className={dynamicsFont.composeText} />,
      label: i18n.getString('text', currentLocale),
      path: 'recentMessages',
      noticeCounts: unreadMessageCounts,
      isActive: path => path === 'recentMessages'
    },
    {
      icon: <FaxIcon width={23} height={23} />,
      label: i18n.getString('fax', currentLocale),
      path: 'faxes',
      isActive: path => path === 'faxes'
    },
    {
      icon: <span className={dynamicsFont.active} />,
      label: i18n.getString('call', currentLocale),
      path: 'recentCalls',
      isActive: path => path === 'recentCalls'
    },
  ];
}

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

  onTabChanged = (tabName = 'recentCalls', currentContact = this.props.currentContact) => {
    if (tabName === 'recentMessages') {
      this.props.getRecentMessages(currentContact);
    } else if (tabName === 'recentCalls') {
      this.props.getRecentCalls(currentContact);
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
    const { showSpinner, locale, unreadMessageCounts } = this.props;
    if (showSpinner) return <SpinnerOverlay />;
    const props = {
      currentPath: this.state.currentTab,
      goTo: this.onTabChanged,
      tabs: getTabs({ locale, unreadMessageCounts })
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
  locale: PropTypes.object.isRequired,
  unreadMessageCounts: PropTypes.number.isRequired,
  navigateTo: PropTypes.func.isRequired,
  dateTimeFormatter: PropTypes.func.isRequired,
  messages: PropTypes.array.isRequired,
  calls: PropTypes.array.isRequired,
  getRecentMessages: PropTypes.func.isRequired,
  getRecentCalls: PropTypes.func.isRequired,
  cleanUpMessages: PropTypes.func.isRequired,
  cleanUpCalls: PropTypes.func.isRequired
};
