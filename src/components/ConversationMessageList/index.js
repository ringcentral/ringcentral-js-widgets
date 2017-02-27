import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';

import styles from './styles.scss';

function MessageItem(props) {
  let messageClassName = null;
  if (props.direction === 'Outbound') {
    messageClassName = classnames(styles.messageBody, styles.outbound);
  } else {
    messageClassName = styles.messageBody;
  }
  if (!props.showDate) {
    return (
      <div className={styles.messageItem}>
        <div className={messageClassName}>
          {props.subject}
        </div>
        <div className={styles.clear} />
      </div>
    );
  }
  return (
    <div className={styles.messageItem}>
      <div className={styles.messsageTime}>
        {props.creationTime}
      </div>
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
};

MessageItem.defaultProps = {
  subject: '',
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
    const messages = this.props.messages;
    let lastFormatedTime = null;
    const messageList = messages.map((message) => {
      const formatedTime = this.context.formatDateTime(message.creationTime);
      let showDate = true;
      if (lastFormatedTime === formatedTime) {
        showDate = false;
      }
      lastFormatedTime = formatedTime;
      return (
        <MessageItem
          key={message.id}
          direction={message.direction}
          subject={message.subject}
          creationTime={formatedTime}
          showDate={showDate}
        />
      );
    });
    return (
      <div
        className={styles.root}
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
};

ConversationMessageList.contextTypes = {
  formatDateTime: PropTypes.func.isRequired,
};

export default ConversationMessageList;
