import React, { Component } from 'react';

import classnames from 'classnames';

import messageTypes from '@ringcentral-integration/commons/enums/messageTypes';

import ComposeText from '../../assets/images/ComposeText.svg';
import ConversationList from '../ConversationList';
import { ButtonDefinition, Header } from '../Header';
import { MessageTabButton } from '../MessageTabButton';
import NavigationBar, { TabPropTypes } from '../NavigationBar';
import { SpinnerOverlay } from '../SpinnerOverlay';
import i18n from './i18n';
import styles from './styles.scss';
import { TabTitle } from './TabTitle';
import NoMessage from './widgets/NoMessage';
import Search from './widgets/Search';

type ConversationsPanelProps = {
  currentSiteCode?: string;
  isMultipleSiteEnabled?: boolean;
  currentLocale: string;
  showSpinner?: boolean;
  showTitle?: boolean;
  contactPlaceholder?: string;
  showContactDisplayPlaceholder?: boolean;
  sourceIcons?: object;
  phoneTypeRenderer?: (...args: any[]) => any;
  phoneSourceNameRenderer?: (...args: any[]) => any;
  showComposeText?: boolean;
  goToComposeText: (...args: any[]) => any;
  typeFilter?: string;
  updateTypeFilter?: (...args: any[]) => any;
  showConversationDetail: (...args: any[]) => any;
  textUnreadCounts: number;
  voiceUnreadCounts: number;
  faxUnreadCounts: number;
  showGroupNumberName?: boolean;
  onClickToDial?: (...args: any[]) => any;
  onClickToSms?: (...args: any[]) => any;
  markMessage: (...args: any[]) => any;
  readMessage: (...args: any[]) => any;
  readTextPermission?: boolean;
  outboundSmsPermission?: boolean;
  internalSmsPermission?: boolean;
  readVoicemailPermission?: boolean;
  readFaxPermission?: boolean;
  onSearchInputChange?: (...args: any[]) => any;
  searchInput?: string;
  perPage?: number;
  disableLinks?: boolean;
  disableCallButton?: boolean;
  conversations: any[];
  brand: string;
  dateTimeFormatter?: (...args: any[]) => any;
  areaCode: string;
  countryCode: string;
  onLogConversation?: (...args: any[]) => any;
  onViewContact?: (...args: any[]) => any;
  onCreateContact?: (...args: any[]) => any;
  createEntityTypes?: any[];
  disableClickToDial?: boolean;
  unmarkMessage: (...args: any[]) => any;
  autoLog?: boolean;
  enableContactFallback?: boolean;
  deleteMessage?: (...args: any[]) => any;
  composeTextPermission?: boolean;
  previewFaxMessages?: (...args: any[]) => any;
  loadNextPage: (...args: any[]) => any;
  loadingNextPage?: boolean;
  onUnmount?: (...args: any[]) => any;
  renderExtraButton?: (...args: any[]) => any;
  renderSearchTip?: (...args: any[]) => any;
  renderNoMessage?: (...args: any[]) => any;
  onFaxDownload?: (...args: any[]) => any;
  showChooseEntityModal?: boolean;
  shouldLogSelectRecord?: boolean;
  onSelectContact?: (...args: any[]) => any;
  renderContactList?: (...args: any[]) => any;
  dropdownClassName?: string;
  enableCDC?: boolean;
};

export default class ConversationsPanel extends Component<
  ConversationsPanelProps,
  {}
> {
  static defaultProps: Partial<ConversationsPanelProps> = {
    currentSiteCode: '',
    isMultipleSiteEnabled: false,
    showSpinner: false,
    showTitle: false,
    contactPlaceholder: '',
    showContactDisplayPlaceholder: true,
    showComposeText: false,
    typeFilter: messageTypes.all,
    showGroupNumberName: false,
    readTextPermission: true,
    outboundSmsPermission: true,
    internalSmsPermission: true,
    readVoicemailPermission: true,
    readFaxPermission: true,
    searchInput: '',
    perPage: 20,
    disableLinks: false,
    disableCallButton: false,
    disableClickToDial: false,
    autoLog: false,
    composeTextPermission: true,
    loadingNextPage: false,
    showChooseEntityModal: true,
    shouldLogSelectRecord: false,
    dropdownClassName: null,
    enableCDC: false,
  };

  onTabChanged = (type: string) => {
    if (typeof this.props.updateTypeFilter === 'function') {
      this.props.updateTypeFilter(type);
    }
  };

  componentWillUnmount() {
    this.props?.onUnmount();
  }

  renderTabs() {
    const tabs: TabPropTypes[] = [
      {
        icon: (
          <TabTitle
            type={messageTypes.all}
            currentLocale={this.props.currentLocale}
          />
        ),
        label: i18n.getString(messageTypes.all, this.props.currentLocale),
        path: messageTypes.all,
        isActive: (path) => path === messageTypes.all,
      },
      this.props.readVoicemailPermission && {
        icon: (
          <TabTitle
            type={messageTypes.voiceMail}
            currentLocale={this.props.currentLocale}
          />
        ),
        label: i18n.getString(messageTypes.voiceMail, this.props.currentLocale),
        path: messageTypes.voiceMail,
        isActive: (path) => path === messageTypes.voiceMail,
        noticeCounts: this.props.voiceUnreadCounts,
      },
      this.props.readFaxPermission && {
        icon: (
          <TabTitle
            type={messageTypes.fax}
            currentLocale={this.props.currentLocale}
          />
        ),
        label: i18n.getString(messageTypes.fax, this.props.currentLocale),
        path: messageTypes.fax,
        isActive: (path) => path === messageTypes.fax,
        noticeCounts: this.props.faxUnreadCounts,
      },
      this.props.readTextPermission && {
        icon: (
          <TabTitle
            type={messageTypes.text}
            currentLocale={this.props.currentLocale}
          />
        ),
        label: i18n.getString(messageTypes.text, this.props.currentLocale),
        path: messageTypes.text,
        isActive: (path: string) => path === messageTypes.text,
        noticeCounts: this.props.textUnreadCounts,
      },
    ];
    return (
      <NavigationBar
        button={MessageTabButton}
        className={styles.tabBar}
        currentPath={this.props.typeFilter}
        goTo={this.onTabChanged}
        tabs={tabs.filter((x) => !!x)}
      />
    );
  }
  renderContent() {
    const {
      showSpinner,
      showTitle,
      searchInput,
      onSearchInputChange,
      currentLocale,
      perPage,
      disableLinks,
      disableCallButton,
      conversations,
      brand,
      showConversationDetail,
      readMessage,
      markMessage,
      dateTimeFormatter,
      showContactDisplayPlaceholder,
      contactPlaceholder,
      sourceIcons,
      phoneTypeRenderer,
      phoneSourceNameRenderer,
      showGroupNumberName,
      areaCode,
      countryCode,
      onLogConversation,
      onViewContact,
      onCreateContact,
      createEntityTypes,
      onClickToDial,
      onClickToSms,
      disableClickToDial,
      unmarkMessage,
      autoLog,
      enableContactFallback,
      deleteMessage,
      typeFilter,
      goToComposeText,
      composeTextPermission,
      previewFaxMessages,
      loadNextPage,
      loadingNextPage,
      renderExtraButton,
      outboundSmsPermission,
      internalSmsPermission,
      updateTypeFilter,
      renderSearchTip,
      renderNoMessage,
      onFaxDownload,
      currentSiteCode,
      isMultipleSiteEnabled,
      showChooseEntityModal,
      shouldLogSelectRecord,
      onSelectContact,
      renderContactList,
      dropdownClassName,
      enableCDC,
    } = this.props;
    if (showSpinner) {
      return <SpinnerOverlay />;
    }
    const placeholder =
      onSearchInputChange && searchInput.length > 0
        ? i18n.getString('noSearchResults', currentLocale)
        : i18n.getString('noMessages', currentLocale);
    return (
      <div
        data-sign="messageList"
        className={classnames(
          styles.content,
          showTitle && styles.contentWithHeader,
        )}
      >
        <Search
          composeTextPermission={composeTextPermission}
          typeFilter={typeFilter}
          onSearchInputChange={onSearchInputChange}
          searchInput={searchInput}
          currentLocale={currentLocale}
          disableLinks={disableLinks}
          goToComposeText={goToComposeText}
          renderSearchTip={renderSearchTip}
        />
        {conversations.length ? (
          <ConversationList
            className={onSearchInputChange ? styles.contentWithSearch : null}
            currentLocale={currentLocale}
            currentSiteCode={currentSiteCode}
            isMultipleSiteEnabled={isMultipleSiteEnabled}
            perPage={perPage}
            disableLinks={disableLinks}
            disableCallButton={disableCallButton}
            conversations={conversations}
            brand={brand}
            showConversationDetail={showConversationDetail}
            readMessage={readMessage}
            markMessage={markMessage}
            dateTimeFormatter={dateTimeFormatter}
            contactPlaceholder={contactPlaceholder}
            showContactDisplayPlaceholder={showContactDisplayPlaceholder}
            sourceIcons={sourceIcons}
            phoneTypeRenderer={phoneTypeRenderer}
            phoneSourceNameRenderer={phoneSourceNameRenderer}
            showGroupNumberName={showGroupNumberName}
            placeholder={placeholder}
            areaCode={areaCode}
            countryCode={countryCode}
            onLogConversation={onLogConversation}
            onViewContact={onViewContact}
            onCreateContact={onCreateContact}
            createEntityTypes={createEntityTypes}
            onClickToDial={onClickToDial}
            onClickToSms={onClickToSms}
            disableClickToDial={disableClickToDial}
            unmarkMessage={unmarkMessage}
            autoLog={autoLog}
            enableContactFallback={enableContactFallback}
            deleteMessage={deleteMessage}
            previewFaxMessages={previewFaxMessages}
            loadNextPage={loadNextPage}
            loadingNextPage={loadingNextPage}
            typeFilter={typeFilter}
            renderExtraButton={renderExtraButton}
            outboundSmsPermission={outboundSmsPermission}
            internalSmsPermission={internalSmsPermission}
            updateTypeFilter={updateTypeFilter}
            onFaxDownload={onFaxDownload}
            showChooseEntityModal={showChooseEntityModal}
            shouldLogSelectRecord={shouldLogSelectRecord}
            onSelectContact={onSelectContact}
            renderContactList={renderContactList}
            dropdownClassName={dropdownClassName}
            enableCDC={enableCDC}
          />
        ) : (
          !loadingNextPage &&
          ((renderNoMessage && renderNoMessage()) || (
            <NoMessage placeholder={placeholder} />
          ))
        )}
      </div>
    );
  }

  render() {
    const { currentLocale, showTitle, showComposeText, goToComposeText } =
      this.props;
    const buttons: ButtonDefinition[] = [];

    if (showComposeText) {
      buttons.push({
        label: <ComposeText className={styles.composeText} />,
        onClick: goToComposeText,
        placement: 'right',
      });
    }

    const header = showTitle ? (
      <Header buttons={buttons}>
        {i18n.getString('title', currentLocale)}
      </Header>
    ) : null;
    const tabsHeader = this.renderTabs();
    const content = this.renderContent();

    return (
      <div data-sign="ConversationsPanel" className={styles.root}>
        {header}
        {tabsHeader}
        {content}
      </div>
    );
  }
}
