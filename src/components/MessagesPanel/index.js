import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import messageTypes from 'ringcentral-integration/enums/messageTypes';
import Header from '../../components/Header';
import SpinnerOverlay from '../../components/SpinnerOverlay';
import MessageList from '../../components/MessageList';
import MessageTabButton from '../../components/MessageTabButton';
import NavigationBar from '../../components/NavigationBar';
import ComposeText from '../../assets/images/ComposeText.svg';
import styles from './styles.scss';
import i18n from './i18n';

function TabTitle({
  type,
  currentLocale,
}) {
  return (
    <span className={styles.tabTitle}>
      {i18n.getString(type, currentLocale)}
    </span>
  );
}

TabTitle.propTypes = {
  type: PropTypes.string.isRequired,
  currentLocale: PropTypes.string.isRequired,
};

export default class MessagesPanel extends Component {
  constructor(props) {
    super(props);
    this.onTabChanged = (type) => {
      if (typeof this.props.updateTypeFilter === 'function') {
        this.props.updateTypeFilter(type);
      }
    };
  }

  renderTabs() {
    const tabs = [
      {
        icon: <TabTitle type={messageTypes.all} currentLocale={this.props.currentLocale} />,
        label: i18n.getString(messageTypes.all, this.props.currentLocale),
        path: messageTypes.all,
        isActive: path => path === messageTypes.all,
      },
      {
        icon: <TabTitle type={messageTypes.voiceMail} currentLocale={this.props.currentLocale} />,
        label: i18n.getString(messageTypes.voiceMail, this.props.currentLocale),
        path: messageTypes.voiceMail,
        isActive: path => path === messageTypes.voiceMail,
        noticeCounts: this.props.voiceUnreadCounts,
      },
      {
        icon: <TabTitle type={messageTypes.text} currentLocale={this.props.currentLocale} />,
        label: i18n.getString(messageTypes.text, this.props.currentLocale),
        path: messageTypes.text,
        isActive: path => path === messageTypes.text,
        noticeCounts: this.props.textUnreadCounts,
      },
    ];
    return (
      <NavigationBar
        button={MessageTabButton}
        className={styles.tabBar}
        currentPath={this.props.typeFilter}
        goTo={this.onTabChanged}
        tabs={tabs}
      />
    );
  }

  render() {
    const {
      currentLocale,
      showSpinner,
      showTitle,
      showComposeText,
      composeText,
      ...props,
    } = this.props;
    const buttons = [];
    if (showComposeText) {
      buttons.push({
        label: <ComposeText className={styles.composeText} />,
        onClick: composeText,
        placement: 'right',
      });
    }
    const header = showTitle ?
      (<Header buttons={buttons}>
        {i18n.getString('title', currentLocale)}
      </Header>) :
      null;
    const tabsHeader = this.renderTabs();
    const content = showSpinner ?
      <SpinnerOverlay /> :
      (
        <MessageList
          className={classnames(
            styles.content,
            showTitle && styles.contentWithHeader
          )}
          {...props}
          currentLocale={currentLocale}
        />
      );
    return (
      <div className={styles.root}>
        {header}
        {tabsHeader}
        {content}
      </div>
    );
  }
}

MessagesPanel.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  showSpinner: PropTypes.bool,
  showTitle: PropTypes.bool,
  showContactDisplayPlaceholder: PropTypes.bool,
  sourceIcons: PropTypes.object,
  showComposeText: PropTypes.bool,
  composeText: PropTypes.func.isRequired,
  typeFilter: PropTypes.string,
  updateTypeFilter: PropTypes.func,
  readVoicemail: PropTypes.func.isRequired,
  showConversationDetail: PropTypes.func.isRequired,
  textUnreadCounts: PropTypes.number.isRequired,
  voiceUnreadCounts: PropTypes.number.isRequired,
  showGroupNumberName: PropTypes.bool,
};

MessagesPanel.defaultProps = {
  showSpinner: false,
  showTitle: false,
  showContactDisplayPlaceholder: true,
  sourceIcons: undefined,
  showComposeText: false,
  typeFilter: messageTypes.all,
  updateTypeFilter: undefined,
  showGroupNumberName: false,
};
