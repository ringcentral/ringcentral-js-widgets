import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import classnames from 'classnames';
import rcFont from '../../assets/RcFont/RcFont.scss';
import styles from './styles.scss';

export default function MessageItem(props) {
  const messageIcon = props.type === 'SMS'
    ? <span className={rcFont.uniA5} />
    : <span className={rcFont.uni41} />;
  let className = null;
  if (props.isRead) {
    className = styles.messageItem;
  } else {
    className = classnames(styles.messageItem, styles.unRead);
  }
  return (
    <div className={className}>
      <Link
        to={`/conversations/${props.conversation.id}`}
        className={styles.messageLink}
      >
        <div className={styles.typeIcon}>
          {messageIcon}
        </div>
        <div className={styles.messageContent}>
          <div className={styles.messageFrom}>
            {props.contactList.join(',')}
          </div>
          <div className={styles.messageText}>{props.subject}</div>
          <div className={styles.messageInfo}>
            <div className={styles.messageTime}>{props.formatDateTime(props.creationTime)}</div>
          </div>
        </div>
      </Link>
      <Link
        to={'/messages'}
        className={styles.messageLink}
      >
        <div className={styles.contactInfo}>
          <span className={rcFont.uni2477} />
        </div>
      </Link>
    </div>
  );
}

MessageItem.propTypes = {
  type: PropTypes.string.isRequired,
  isRead: PropTypes.bool,
  conversation: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  subject: PropTypes.string,
  contactList: PropTypes.arrayOf(PropTypes.string).isRequired,
  creationTime: PropTypes.string.isRequired,
  formatDateTime: PropTypes.func.isRequired,
};

MessageItem.defaultProps = {
  isRead: false,
  subject: '',
};
