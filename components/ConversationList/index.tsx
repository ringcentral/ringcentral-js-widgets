import React, { Component } from 'react';

import classnames from 'classnames';

import MessageItem from '../MessageItem';
import i18n from './i18n';
import styles from './styles.scss';

type ConversationListProps = {
  brand: string;
  currentLocale: string;
  currentSiteCode?: string;
  isMultipleSiteEnabled?: boolean;
  conversations: {
    id?: number;
    conversationId: string;
    subject?: string;
  }[];
  disableLinks?: boolean;
  disableCallButton?: boolean;
  perPage?: number;
  className?: string;
  showConversationDetail: (...args: any[]) => any;
  readMessage: (...args: any[]) => any;
  markMessage: (...args: any[]) => any;
  unmarkMessage: (...args: any[]) => any;
  dateTimeFormatter?: (...args: any[]) => any;
  showContactDisplayPlaceholder?: boolean;
  sourceIcons?: object;
  phoneTypeRenderer?: (...args: any[]) => any;
  phoneSourceNameRenderer?: (...args: any[]) => any;
  showGroupNumberName?: boolean;
  placeholder?: string;
  typeFilter?: string;
  loadNextPage?: (...args: any[]) => any;
  loadingNextPage?: boolean;
  renderExtraButton?: (...args: any[]) => any;
  enableCDC?: boolean;
};
class ConversationList extends Component<ConversationListProps, {}> {
  constructor(props) {
    super(props);
    this._scrollTop = 0;
  }
  componentDidUpdate(prevProps) {
    if (this.props.typeFilter === prevProps.typeFilter) {
      return;
    }
    if (this.messagesListBody) {
      this.messagesListBody.scrollTop = 0;
    }
  }
  onScroll = () => {
    const totalScrollHeight = this.messagesListBody.scrollHeight;
    const { clientHeight } = this.messagesListBody;
    const currentScrollTop = this.messagesListBody.scrollTop;
    // load next page if scroll near buttom
    if (
      totalScrollHeight - this._scrollTop > clientHeight + 10 &&
      totalScrollHeight - currentScrollTop <= clientHeight + 10
    ) {
      if (typeof this.props.loadNextPage === 'function') {
        this.props.loadNextPage();
      }
    }
    this._scrollTop = currentScrollTop;
  };
  render() {
    const {
      className,
      currentLocale,
      currentSiteCode,
      isMultipleSiteEnabled,
      conversations,
      perPage,
      disableLinks,
      disableCallButton,
      placeholder,
      loadingNextPage,
      ...childProps
    } = this.props;
    let content;
    if (conversations && conversations.length) {
      content = conversations.map((item) => (
        <MessageItem
          {...childProps}
          conversation={item}
          currentLocale={currentLocale}
          currentSiteCode={currentSiteCode}
          isMultipleSiteEnabled={isMultipleSiteEnabled}
          key={item.id}
          disableLinks={disableLinks}
          disableCallButton={disableCallButton}
        />
      ));
    }
    const loading = loadingNextPage ? (
      <div className={styles.loading}>
        {i18n.getString('loading', currentLocale)}
      </div>
    ) : null;
    return (
      <div
        className={classnames(styles.root, className)}
        onScroll={this.onScroll}
        ref={(list) => {
          this.messagesListBody = list;
        }}
      >
        {content}
        {loading}
      </div>
    );
  }
}
ConversationList.defaultProps = {
  currentSiteCode: '',
  isMultipleSiteEnabled: false,
  perPage: 20,
  className: undefined,
  disableLinks: false,
  disableCallButton: false,
  dateTimeFormatter: undefined,
  showContactDisplayPlaceholder: true,
  sourceIcons: undefined,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  showGroupNumberName: false,
  placeholder: undefined,
  loadNextPage: undefined,
  loadingNextPage: false,
  typeFilter: undefined,
  renderExtraButton: undefined,
  enableCDC: false,
};
export default ConversationList;
