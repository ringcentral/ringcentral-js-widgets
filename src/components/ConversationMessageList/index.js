import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './styles.scss';

export function Message({
  subject,
  time,
  direction,
  sender,
  subjectRenderer: SubjectRenderer,
}) {
  return (
    <div className={styles.message}>
      {
        time ?
          (
            <div className={styles.time}>
              {time}
            </div>
          ) :
          null
      }
      {
        (sender && direction === 'Inbound') ?
          (
            <div className={styles.sender}>
              {sender}
            </div>
          ) :
          null
      }
      <div
        className={classnames(
          styles.messageBody,
          direction === 'Outbound' ? styles.outbound : styles.inbound,
          (subject && subject.length > 500) && styles.big,
        )}>
        {
          SubjectRenderer ? <SubjectRenderer subject={subject} /> : subject
        }
      </div>
      <div className={styles.clear} />
    </div>
  );
}

Message.propTypes = {
  direction: PropTypes.string.isRequired,
  subject: PropTypes.string,
  time: PropTypes.string,
  sender: PropTypes.string,
  subjectRenderer: PropTypes.func,
};

Message.defaultProps = {
  subject: '',
  sender: undefined,
  time: undefined,
  subjectRenderer: undefined,
};

class ConversationMessageList extends Component {
  componentDidMount() {
    this.scrollToLastMessage();
  }

  componentDidUpdate(previousProps) {
    if (previousProps.messages.length !== this.props.messages.length) {
      this.scrollToLastMessage();
    }
  }
  scrollToLastMessage = () => {
    if (this.conversationBody) {
      this.conversationBody.scrollTop = this.conversationBody.scrollHeight;
    }
  }
  render() {
    const {
      className,
      dateTimeFormatter,
      messages,
      showSender,
      height,
      messageSubjectRenderer,
    } = this.props;

    let lastDate = 0;
    const messageList = messages.map((message) => {
      const sender = showSender ?
        (
          message.from.name ||
          this.context.formatPhone(message.from.extensionNumber || message.from.phoneNumber)
        ) :
        null;
      const date = new Date(message.creationTime);
      const time = (date - lastDate < 60 * 60 * 1000 && date.getHours() === lastDate.getHours()) ?
        null :
        dateTimeFormatter({ utcTimestamp: message.creationTime, type: 'long' });
      lastDate = date;
      return (
        <Message
          key={message.id}
          sender={sender}
          time={time}
          direction={message.direction}
          subject={message.subject}
          subjectRenderer={messageSubjectRenderer}
        />
      );
    });
    return (
      <div
        className={classnames(styles.root, className)}
        style={{ height }}
        ref={(body) => { this.conversationBody = body; }}
      >
        {messageList}
      </div>
    );
  }
}

ConversationMessageList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    creationTime: PropTypes.string,
    id: PropTypes.number,
    direction: PropTypes.string,
    subject: PropTypes.string,
  })).isRequired,
  className: PropTypes.string,
  showSender: PropTypes.bool,
  dateTimeFormatter: PropTypes.func.isRequired,
  messageSubjectRenderer: PropTypes.func,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

ConversationMessageList.defaultProps = {
  className: null,
  showSender: false,
  messageSubjectRenderer: undefined,
  height: '100%',
};

ConversationMessageList.contextTypes = {
  formatPhone: PropTypes.func.isRequired,
};

export default ConversationMessageList;
