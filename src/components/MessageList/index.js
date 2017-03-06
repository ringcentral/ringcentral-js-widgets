import React, { Component, PropTypes } from 'react';

import MessageItem from '../MessageItem';

import styles from './styles.scss';
import i18n from './i18n';

function NoMessages(props) {
  return (
    <p className={styles.NoMessages}>{props.placeholder}</p>
  );
}

NoMessages.propTypes = {
  placeholder: PropTypes.string.isRequired,
};

export default class MessageList extends Component {
  constructor(props) {
    super(props);
    let lastScrollHeight = 0;
    let currentScrollHeight = 0;

    this.onScroll = () => {
      const totalScrollHeight = this.messagesListBody.scrollHeight;
      const clientHeight = this.messagesListBody.clientHeight;
      currentScrollHeight = this.messagesListBody.scrollTop;
      if (
        (totalScrollHeight - lastScrollHeight) > (clientHeight + 10) &&
        (totalScrollHeight - currentScrollHeight) <= (clientHeight + 10)
      ) {
        this.props.loadNextPageMessages();
      }
      lastScrollHeight = currentScrollHeight;
    };
  }

  render() {
    const messages = this.props.messages;
    return (
      <div
        className={styles.messageList}
        onScroll={this.onScroll}
        ref={(list) => { this.messagesListBody = list; }}
      >
        {messages && messages.length
          ? messages.map(
              message =>
                <MessageItem
                  type={message.type}
                  unreadCounts={message.unreadCounts}
                  conversationId={message.conversationId}
                  subject={message.subject}
                  contactList={this.props.getMessageRecipientNames(message)}
                  creationTime={message.creationTime}
                  formatDateTime={this.props.formatDateTime}
                  key={message.id} />
            )
          : <NoMessages placeholder={this.props.placeholder} />
        }
        <div className={styles.loading}>{this.props.loading && i18n.getString('Loading')}</div>
      </div>
    );
  }
}

MessageList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
    unreadCounts: PropTypes.number,
    conversationId: PropTypes.string.isRequired,
    subject: PropTypes.string,
    creationTime: PropTypes.string,
    to: PropTypes.array,
    from: PropTypes.object,
  })).isRequired,
  loadNextPageMessages: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  placeholder: PropTypes.string.isRequired,
  formatDateTime: PropTypes.func.isRequired,
  getMessageRecipientNames: PropTypes.func.isRequired,
};

MessageList.defaultProps = {
  loading: false,
};
