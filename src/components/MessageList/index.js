import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import MessageItem from '../MessageItem';
import styles from './styles.scss';

function NoMessages(props) {
  return (
    <p className={styles.noMessages}>{props.placeholder}</p>
  );
}

NoMessages.propTypes = {
  placeholder: PropTypes.string.isRequired,
};

export default class MessageList extends Component {
  constructor(props) {
    super(props);
    this._scrollTop = 0;
    this.state = {
      page: 0,
    };
  }
  onScroll = () => {
    const totalScrollHeight = this.messagesListBody.scrollHeight;
    const clientHeight = this.messagesListBody.clientHeight;
    const currentScrollTop = this.messagesListBody.scrollTop;
    // load next page if scroll near buttom
    if (
      (totalScrollHeight - this._scrollTop) > (clientHeight + 10) &&
      (totalScrollHeight - currentScrollTop) <= (clientHeight + 10)
    ) {
      this.setState({
        page: this.state.page + 1,
      });
    }
    this._scrollTop = currentScrollTop;
  }

  render() {
    const {
      className,
      currentLocale,
      conversations,
      perPage,
      disableLinks,
      placeholder,
      ...childProps,
    } = this.props;

    const lastIndex = ((this.state.page + 1) * perPage) - 1;

    const content = (conversations && conversations.length) ?
      conversations.slice(0, lastIndex).map(item => (
        <MessageItem
          {...childProps}
          conversation={item}
          currentLocale={currentLocale}
          key={item.id}
          disableLinks={disableLinks}
        />
      ))
      : <NoMessages placeholder={placeholder} />;
    return (
      <div
        className={classnames(styles.root, className)}
        onScroll={this.onScroll}
        ref={(list) => { this.messagesListBody = list; }}
        >
        {content}
      </div>
    );
  }
}

MessageList.propTypes = {
  brand: PropTypes.string.isRequired,
  currentLocale: PropTypes.string.isRequired,
  conversations: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    conversationId: PropTypes.string.isRequired,
    subject: PropTypes.string,
  })).isRequired,
  disableLinks: PropTypes.bool,
  perPage: PropTypes.number,
  className: PropTypes.string,
  showConversationDetail: PropTypes.func.isRequired,
  readVoicemail: PropTypes.func.isRequired,
  markVoicemail: PropTypes.func.isRequired,
  dateTimeFormatter: PropTypes.func,
  showContactDisplayPlaceholder: PropTypes.bool,
  sourceIcons: PropTypes.object,
  showGroupNumberName: PropTypes.bool,
  placeholder: PropTypes.string,
};
MessageList.defaultProps = {
  perPage: 20,
  className: undefined,
  disableLinks: false,
  dateTimeFormatter: undefined,
  showContactDisplayPlaceholder: true,
  sourceIcons: undefined,
  showGroupNumberName: false,
  placeholder: undefined,
};
