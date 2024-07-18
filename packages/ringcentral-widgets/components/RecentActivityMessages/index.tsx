import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Spinner from '../Spinner';

import i18n from './i18n';
import styles from './styles.scss';

const MessageItem = ({ message, navigateTo, dateTimeFormatter }: any) => {
  const { subject, creationTime, readStatus, conversationId } = message;
  const isUnread = readStatus !== 'Read';
  const time = dateTimeFormatter({ utcTimestamp: creationTime });
  return (
    <div
      className={clsx(styles.messageItem, {
        [styles.localMessageItem]: !message.fromRemote,
      })}
      onClick={() =>
        !message.fromRemote && navigateTo(`/conversations/${conversationId}`)
      }
    >
      <dl className={styles.dl} data-sign="RecentMessage">
        <dt
          className={clsx(styles.messageSubject, { [styles.unread]: isUnread })}
          title={subject}
        >
          {subject}
        </dt>
        <dd
          className={clsx(styles.messageTime, { [styles.unread]: isUnread })}
          title={time}
        >
          {time}
        </dd>
      </dl>
    </div>
  );
};

MessageItem.propTypes = {
  message: PropTypes.object.isRequired,
  navigateTo: PropTypes.func.isRequired,
  dateTimeFormatter: PropTypes.func.isRequired,
};

class RecentActivityMessages extends Component {
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  shouldComponentUpdate(nextProps: any) {
    return (
      // @ts-expect-error TS(2339): Property 'currentLocale' does not exist on type 'R... Remove this comment to see the full error message
      nextProps.currentLocale !== this.props.currentLocale ||
      // @ts-expect-error TS(2339): Property 'messages' does not exist on type 'Readon... Remove this comment to see the full error message
      nextProps.messages !== this.props.messages ||
      // @ts-expect-error TS(2339): Property 'isMessagesLoaded' does not exist on type... Remove this comment to see the full error message
      nextProps.isMessagesLoaded !== this.props.isMessagesLoaded
    );
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  render() {
    const {
      // @ts-expect-error TS(2339): Property 'currentLocale' does not exist on type 'R... Remove this comment to see the full error message
      currentLocale,
      // @ts-expect-error TS(2339): Property 'messages' does not exist on type 'Readon... Remove this comment to see the full error message
      messages,
      // @ts-expect-error TS(2339): Property 'isMessagesLoaded' does not exist on type... Remove this comment to see the full error message
      isMessagesLoaded,
      // @ts-expect-error TS(2339): Property 'navigateTo' does not exist on type 'Read... Remove this comment to see the full error message
      navigateTo,
      // @ts-expect-error TS(2339): Property 'dateTimeFormatter' does not exist on typ... Remove this comment to see the full error message
      dateTimeFormatter,
    } = this.props;
    let messageListView = null;
    if (!isMessagesLoaded) {
      messageListView = <Spinner className={styles.spinner} ringWidth={4} />;
    } else if (messages.length > 0) {
      messageListView = messages.map((message: any) => (
        <MessageItem
          key={message.id}
          message={message}
          navigateTo={navigateTo}
          dateTimeFormatter={dateTimeFormatter}
        />
      ));
    } else {
      messageListView = (
        <p className={styles.noRecords}>
          {i18n.getString('noRecords', currentLocale)}
        </p>
      );
    }
    return <div className={styles.messages}>{messageListView}</div>;
  }
}

// @ts-expect-error TS(2339): Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
RecentActivityMessages.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  messages: PropTypes.array.isRequired,
  isMessagesLoaded: PropTypes.bool.isRequired,
  navigateTo: PropTypes.func.isRequired,
  dateTimeFormatter: PropTypes.func.isRequired,
};

export default RecentActivityMessages;
