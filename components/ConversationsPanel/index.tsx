import type { FC } from 'react';
import React, { useEffect, useMemo } from 'react';

import classnames from 'classnames';

import messageTypes from '@ringcentral-integration/commons/enums/messageTypes';

import ComposeText from '../../assets/images/ComposeText.svg';
import type { ConversationListProps } from '../ConversationList';
import ConversationList from '../ConversationList';
import type { ButtonDefinition } from '../Header';
import { Header } from '../Header';
import { MessageTabButton } from '../MessageTabButton';
import { NavigationBar } from '../NavigationBar';
import { SpinnerOverlay } from '../SpinnerOverlay';
import i18n from './i18n';
import styles from './styles.scss';
import { useConversationTabData } from './useConversationTabData';
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
  maxExtensionNumberLength: number;
  renderContactName?: (...args: any[]) => any;
  externalHasEntity: (...args: any[]) => boolean;
  externalViewEntity: (...args: any[]) => void;
} & Omit<ConversationListProps, 'conversation'>;

export const ConversationsPanel: FC<ConversationsPanelProps & {}> = (props) => {
  const {
    currentSiteCode = '',
    isMultipleSiteEnabled = false,
    showSpinner = false,
    showTitle = false,
    contactPlaceholder = '',
    showContactDisplayPlaceholder = true,
    showComposeText = false,
    typeFilter = messageTypes.all,
    showGroupNumberName = false,
    readTextPermission = true,
    outboundSmsPermission = true,
    internalSmsPermission = true,
    readVoicemailPermission = true,
    readFaxPermission = true,
    searchInput = '',
    perPage = 20,
    disableLinks = false,
    disableCallButton = false,
    disableClickToDial = false,
    autoLog = false,
    composeTextPermission = true,
    loadingNextPage = false,
    showChooseEntityModal = true,
    shouldLogSelectRecord = false,
    dropdownClassName,
    enableCDC = false,
    onSearchInputChange,
    currentLocale,
    conversations,
    brand,
    showConversationDetail,
    readMessage,
    markMessage,
    dateTimeFormatter,
    sourceIcons,
    phoneTypeRenderer,
    phoneSourceNameRenderer,
    areaCode,
    countryCode,
    onLogConversation,
    onViewContact,
    onCreateContact,
    createEntityTypes,
    onClickToDial,
    onClickToSms,
    unmarkMessage,
    enableContactFallback,
    deleteMessage,
    goToComposeText,
    previewFaxMessages,
    loadNextPage,
    renderExtraButton,
    updateTypeFilter,
    renderSearchTip,
    renderNoMessage,
    onFaxDownload,
    onSelectContact,
    renderContactList,
    maxExtensionNumberLength,
    renderContactName,
    externalHasEntity,
    externalViewEntity,
    formatPhone,
    renderActionMenuExtraButton,
    onUnmount,
    faxUnreadCounts,
    textUnreadCounts,
    voiceUnreadCounts,
  } = props;

  useEffect(() => {
    return onUnmount;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tabs = useConversationTabData({
    currentLocale,
    readVoicemailPermission,
    voiceUnreadCounts,
    readFaxPermission,
    faxUnreadCounts,
    readTextPermission,
    textUnreadCounts,
  });

  const placeholder =
    onSearchInputChange && searchInput.length > 0
      ? i18n.getString('noSearchResults', currentLocale)
      : i18n.getString('noMessages', currentLocale);

  const buttons = useMemo(() => {
    const buttons: ButtonDefinition[] = [];

    if (showComposeText) {
      buttons.push({
        label: <ComposeText className={styles.composeText} />,
        onClick: goToComposeText,
        placement: 'right',
      });
    }

    return buttons;
  }, [goToComposeText, showComposeText]);

  return (
    <div data-sign="ConversationsPanel" className={styles.root}>
      {showTitle ? (
        <Header buttons={buttons}>
          {i18n.getString('title', currentLocale)}
        </Header>
      ) : null}
      <NavigationBar
        button={MessageTabButton}
        className={styles.tabBar}
        currentPath={typeFilter}
        goTo={updateTypeFilter}
        tabs={tabs}
      />
      {showSpinner ? (
        <SpinnerOverlay />
      ) : (
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
              formatPhone={formatPhone}
              className={
                onSearchInputChange ? styles.contentWithSearch : undefined
              }
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
              maxExtensionNumberLength={maxExtensionNumberLength}
              renderContactName={renderContactName}
              externalHasEntity={externalHasEntity}
              externalViewEntity={externalViewEntity}
              renderActionMenuExtraButton={renderActionMenuExtraButton}
            />
          ) : (
            !loadingNextPage &&
            (renderNoMessage?.() ?? <NoMessage placeholder={placeholder} />)
          )}
        </div>
      )}
    </div>
  );
};
