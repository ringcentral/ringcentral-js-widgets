import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Spinner from '../Spinner';
import styles from './styles.scss';
import i18n from './i18n';

const cx = classNames.bind(styles);
function MessageItem({ message, navigateTo, dateTimeFormatter }) {
  const {
    subject, creationTime, readStatus, conversationId
  } = message;
  const isUnread = readStatus !== 'Read';
  const time = dateTimeFormatter({ utcTimestamp: creationTime });
  return (
    <div
      className={cx('messageItem', { localMessageItem: !message.fromRemote })}
      onClick={() => !message.fromRemote && navigateTo(`/conversations/${conversationId}`)}
    >
      <dl className={styles.dl}>
        <dt className={cx('messageSubject', { unread: isUnread })} title={subject}>{subject}</dt>
        <dd className={cx('messageTime', { unread: isUnread })} title={time}>{time}</dd>
      </dl>
    </div>
  );
}

MessageItem.propTypes = {
  message: PropTypes.object.isRequired,
  navigateTo: PropTypes.func.isRequired,
  dateTimeFormatter: PropTypes.func.isRequired
};

export default class RecentActivityMessages extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.currentLocale !== this.props.currentLocale ||
      nextProps.messages !== this.props.messages ||
      nextProps.isMessagesLoaded !== this.props.isMessagesLoaded;
  }

  render() {
    const {
      currentLocale,
      messages,
      isMessagesLoaded,
      navigateTo,
      dateTimeFormatter
    } = this.props;
    let messageListView = null;
    if (!isMessagesLoaded) {
      messageListView = (<Spinner className={styles.spinner} ringWidth={4} />);
    } else if (messages.length > 0) {
      messageListView = messages.map(message => (
        <MessageItem
          key={message.id}
          message={message}
          navigateTo={navigateTo}
          dateTimeFormatter={dateTimeFormatter}
        />
      ));
    } else {
      messageListView = (<p className={styles.noRecords}>{i18n.getString('noRecords', currentLocale)}</p>);
    }
    return (
      <div className={styles.messages}>
        {messageListView}
      </div>
    );
  }
}

RecentActivityMessages.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  messages: PropTypes.array.isRequired,
  isMessagesLoaded: PropTypes.bool.isRequired,
  navigateTo: PropTypes.func.isRequired,
  dateTimeFormatter: PropTypes.func.isRequired
};
