import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';

import styles from './styles.scss';

function MessageItem(props) {
  const messageClassName = classnames(
    styles.messageBody,
    props.direction === 'Outbound' ? styles.outbound : styles.inbound,
    props.subject && props.subject.length > 500 ? styles.big : null,
  );
  const fromName = props.senderName && props.direction === 'Inbound' ?
    (
      <div className={styles.messageFrom}>
        {props.senderName}
      </div>
    ) :
    null;
  const messageCreationTime = props.showDate ?
    (
      <div className={styles.messsageTime}>
        {props.creationTime}
      </div>
    ) :
    null;
  return (
    <div className={styles.messageItem}>
      {messageCreationTime}
      {fromName}
      <div className={messageClassName}>
        {props.subject}
      </div>
      <div className={styles.clear} />
    </div>
  );
}

MessageItem.propTypes = {
  direction: PropTypes.string.isRequired,
  subject: PropTypes.string,
  creationTime: PropTypes.string.isRequired,
  showDate: PropTypes.bool.isRequired,
  senderName: PropTypes.string,
};

MessageItem.defaultProps = {
  subject: '',
  senderName: null,
};

class ConversationMessageList extends Component {
  constructor(props) {
    super(props);
    let lastMessagesLength = 0;
    this.scrollToLastMessage = () => {
      const conversationBody = this.conversationBody;
      if (!conversationBody) {
        return;
      }
      if (this.props.messages.length === lastMessagesLength) {
        return;
      }
      lastMessagesLength = props.messages.length;
      conversationBody.scrollTop = conversationBody.scrollHeight;
    };
  }

  componentDidMount() {
    this.scrollToLastMessage();
  }

  componentDidUpdate() {
    this.scrollToLastMessage();
  }

  render() {
    const dateTimeFormatter = this.props.dateTimeFormatter;
    const messages = this.props.messages;
    let lastFormatedTime = null;
    const messageList = messages.map((message) => {
      const formatedTime = this.context.formatDateTime(message.creationTime);
      let showDate = true;
      if (lastFormatedTime === formatedTime) {
        showDate = false;
      }
      lastFormatedTime = formatedTime;
      let senderName = null;
      if (this.props.showSender && message.from) {
        if (message.from.name) {
          senderName = message.from.name;
        } else {
          const phoneNumber = message.from.extensionNumber || message.from.phoneNumber;
          senderName = this.context.formatPhone(phoneNumber);
        }
      }
      return (
        <MessageItem
          key={message.id}
          direction={message.direction}
          subject={message.subject}
          creationTime={formatedTime}
          showDate={showDate}
          senderName={senderName}
        />
      );
    });
    return (
      <div
        className={classnames(styles.root, this.props.className)}
        ref={(body) => { this.conversationBody = body; }}
      >
        {messageList}
      </div>
    );
  }
}

ConversationMessageList.propTypes = {
  messages: React.PropTypes.arrayOf(PropTypes.shape({
    creationTime: PropTypes.string,
    id: PropTypes.number,
    direction: PropTypes.string,
    subject: PropTypes.string,
  })).isRequired,
  className: PropTypes.string,
  showSender: PropTypes.bool,
};

ConversationMessageList.defaultProps = {
  className: null,
  showSender: false,
};

ConversationMessageList.contextTypes = {
  formatDateTime: PropTypes.func.isRequired,
  formatPhone: PropTypes.func.isRequired,
};

export default ConversationMessageList;
