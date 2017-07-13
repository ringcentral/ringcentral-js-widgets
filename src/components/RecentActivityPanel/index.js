import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import classNames from 'classnames/bind';
import Header from '../Header';
import styles from './styles.scss';
import expandable from './expandable';
import NavigationBar from '../NavigationBar';
import SpinnerOverlay from '../SpinnerOverlay';
import RecentActivityNavigationButton from '../RecentActivityNavigationButton';
import RecentActivityMessages from '../RecentActivityMessages';
import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';

const cx = classNames.bind(styles);
const ToggleIcon = ({ expanded }) => (
  <i className={classnames(dynamicsFont.arrow, cx('arrowIcon', { foldArrowIcon: !expanded }))} />
);

ToggleIcon.propTypes = {
  expanded: PropTypes.bool.isRequired
};

/**
 * RecentActivityPanel component provides a animated slide-out panel.
 */
class RecentActivityPanel extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 'recentMessages'
    };
  }

  componentWillUnmount() {
    this.props.cleanUpMessages();
  }

  onPanelToggled = (event) => {
    if (!this.props.expanded) {
      this.onTabChanged();
    }
    this.props.onToggle(event);
  }

  onTabChanged = (tabName = 'recentMessages') => {
    if (tabName === 'recentMessages') {
      this.props.getRecentMessages();
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
      currentLocale,
      isMessagesLoaded
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
    }
    return null;
  }

  render() {
    const { showSpinner, title, expanded, tabs } = this.props;
    if (showSpinner) return <SpinnerOverlay />;
    const toggleButton = {
      label: <ToggleIcon expanded={expanded} />,
      onClick: this.onPanelToggled,
      placement: 'right'
    };
    const props = {
      currentPath: this.state.currentTab,
      goTo: this.onTabChanged,
      tabs
    };
    const tabView = expanded ? this.getCurrentTabPanel() : null;
    return (
      <div className={styles.container}>
        <div className={styles.header} onClick={this.onPanelToggled}>
          <Header buttons={[toggleButton]} className={styles.header}>{title}</Header>
        </div>
        <NavigationBar
          button={RecentActivityNavigationButton}
          className={styles.navigationBar}
          {...props}
        />
        {tabView}
      </div>
    );
  }
}

RecentActivityPanel.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  showSpinner: PropTypes.bool.isRequired,
  isMessagesLoaded: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  tabs: PropTypes.array.isRequired,
  onToggle: PropTypes.func.isRequired,
  expanded: PropTypes.bool.isRequired,
  navigateTo: PropTypes.func.isRequired,
  dateTimeFormatter: PropTypes.func.isRequired,
  messages: PropTypes.array.isRequired,
  getRecentMessages: PropTypes.func.isRequired,
  cleanUpMessages: PropTypes.func.isRequired
};

export default expandable({
  height: '50%',
  offset: '40px'
})(RecentActivityPanel);
