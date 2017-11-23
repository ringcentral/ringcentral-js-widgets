import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import SearchInput from '../SearchInput';
import MessageItem from '../MessageItem';
import styles from './styles.scss';
import i18n from './i18n';

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
      searchInput,
      onSearchInputChange,
      perPage,
      disableLinks,
      ...childProps,
    } = this.props;

    const search = onSearchInputChange ?
      (
        <SearchInput
          className={styles.searchInput}
          value={searchInput}
          onChange={onSearchInputChange}
          placeholder={i18n.getString('search', currentLocale)}
          disabled={disableLinks}
        />
      ) :
      null;
    const placeholder = onSearchInputChange && searchInput.length > 0 ?
      i18n.getString('noSearchResults', currentLocale) :
      i18n.getString('noMessages', currentLocale);

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
      <div className={classnames(styles.root, className)}>
        {search}
        <div
          className={classnames(styles.content, styles.contentWithSearch)}
          onScroll={this.onScroll}
          ref={(list) => { this.messagesListBody = list; }}
          >
          {content}
        </div>
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
  onSearchInputChange: PropTypes.func,
  searchInput: PropTypes.string,
  perPage: PropTypes.number,
  className: PropTypes.string,
  showConversationDetail: PropTypes.func.isRequired,
  readVoicemail: PropTypes.func.isRequired,
  dateTimeFormatter: PropTypes.func,
  showContactDisplayPlaceholder: PropTypes.bool,
  sourceIcons: PropTypes.object,
};
MessageList.defaultProps = {
  onSearchInputChange: undefined,
  searchInput: '',
  perPage: 20,
  className: undefined,
  disableLinks: false,
  dateTimeFormatter: undefined,
  showContactDisplayPlaceholder: true,
  sourceIcons: undefined,
};
