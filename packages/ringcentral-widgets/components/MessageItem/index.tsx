import React, { Component } from 'react';

import classnames from 'classnames';
import formatMessage from 'format-message';

import { extensionTypes } from '@ringcentral-integration/commons/enums/extensionTypes';
import messageDirection from '@ringcentral-integration/commons/enums/messageDirection';
import messageTypes from '@ringcentral-integration/commons/enums/messageTypes';
import { Message } from '@ringcentral-integration/commons/interfaces/MessageStore.model';
import {
  messageIsFax,
  messageIsTextMessage,
} from '@ringcentral-integration/commons/lib/messageHelper';
import parseNumber from '@ringcentral-integration/commons/lib/parseNumber';

import { checkShouldHideContactUser } from '../../lib/checkShouldHideContactUser';
import { checkShouldHidePhoneNumber } from '../../lib/checkShouldHidePhoneNumber';
import formatDuration from '../../lib/formatDuration';
import ActionMenuList from '../ActionMenuList';
import ContactDisplay from '../ContactDisplay';
import { ContactDisplayItemProps } from '../ContactDisplay/ContactDisplayItem';
import SlideMenu from '../SlideMenu';
import VoicemailPlayer from '../VoicemailPlayer';
import { ConversationIcon } from './ConversationIcon';
import i18n from './i18n';
import styles from './styles.scss';

type MessageItemProps = {
  conversation: Message;
  areaCode: string;
  brand: string;
  countryCode: string;
  currentLocale: string;
  currentSiteCode?: string;
  isMultipleSiteEnabled?: boolean;
  onLogConversation?: (...args: any[]) => any;
  onViewContact?: (...args: any[]) => any;
  onCreateContact?: (...args: any[]) => any;
  createEntityTypes?: any[];
  onClickToDial?: (...args: any[]) => any;
  onClickToSms?: (...args: any[]) => any;
  disableLinks?: boolean;
  disableCallButton?: boolean;
  disableClickToDial?: boolean;
  dateTimeFormatter: (...args: any[]) => any;
  showConversationDetail: (...args: any[]) => any;
  readMessage: (...args: any[]) => any;
  markMessage: (...args: any[]) => any;
  unmarkMessage: (...args: any[]) => any;
  autoLog?: boolean;
  enableContactFallback?: boolean;
  showContactDisplayPlaceholder?: boolean;
  contactPlaceholder?: string;
  sourceIcons?: ContactDisplayItemProps['sourceIcons'];
  phoneTypeRenderer?: (...args: any[]) => any;
  phoneSourceNameRenderer?: (...args: any[]) => any;
  showGroupNumberName?: boolean;
  deleteMessage?: (...args: any[]) => any;
  previewFaxMessages?: (...args: any[]) => any;
  renderExtraButton?: (...args: any[]) => any;
  internalSmsPermission?: boolean;
  outboundSmsPermission?: boolean;
  updateTypeFilter?: (...args: any[]) => any;
  onFaxDownload?: (...args: any[]) => any;
  showChooseEntityModal?: boolean;
  shouldLogSelectRecord?: boolean;
  onSelectContact?: (...args: any[]) => any;
  renderContactList?: (...args: any[]) => any;
  dropdownClassName?: string;
  enableCDC?: boolean;
};

type MessageItemState = {
  selected: number;
  isLogging: boolean;
  isCreating: boolean;
  extended: boolean;
};

class MessageItem extends Component<MessageItemProps, MessageItemState> {
  _userSelection = false;
  contactDisplay: any;
  private _mounted = false;

  static defaultProps: Partial<MessageItemProps> = {
    currentSiteCode: '',
    isMultipleSiteEnabled: false,
    disableClickToDial: false,
    disableLinks: false,
    disableCallButton: false,
    autoLog: false,
    showContactDisplayPlaceholder: true,
    contactPlaceholder: '',
    showGroupNumberName: false,
    deleteMessage() {},
    internalSmsPermission: true,
    outboundSmsPermission: true,
    showChooseEntityModal: true,
    shouldLogSelectRecord: false,
    dropdownClassName: null,
    enableCDC: false,
  };

  constructor(props: MessageItemProps) {
    super(props);
    this.state = {
      selected: this.getInitialContactIndex(),
      isLogging: false,
      isCreating: false,
      extended: false,
    };

    /* [RCINT-4301] onSelection would trigger some state changes that would push new
     * properties before the state has been changed. Which would reset the selected value.
     */
  }

  toggleExtended = () => {
    this.setState((preState) => ({
      extended: !preState.extended,
    }));
  };

  componentDidMount() {
    this._mounted = true;
  }

  UNSAFE_componentWillReceiveProps(nextProps: MessageItemProps) {
    if (
      !this._userSelection &&
      (nextProps.conversation.conversationMatches !==
        this.props.conversation.conversationMatches ||
        nextProps.conversation.correspondentMatches !==
          this.props.conversation.correspondentMatches)
    ) {
      this.setState({
        selected: this.getInitialContactIndex(nextProps),
      });
    }
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  preventEventPropagating: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target !== e.currentTarget) {
      e.stopPropagation();
    }
  };

  onSelectContact = (value: any, idx: string) => {
    const {
      showContactDisplayPlaceholder,
      autoLog,
      conversation,
      shouldLogSelectRecord,
      onSelectContact,
    } = this.props;
    const selected = showContactDisplayPlaceholder
      ? parseInt(idx, 10) - 1
      : parseInt(idx, 10);
    this._userSelection = true;
    this.setState({
      selected,
    });
    if (autoLog) {
      this.logConversation({ redirect: false, selected, prefill: false });
    }
    if (shouldLogSelectRecord && typeof onSelectContact === 'function') {
      onSelectContact({
        correspondentEntity: this.getSelectedContact(selected),
        conversation,
      });
    }
  };

  getInitialContactIndex(nextProps = this.props) {
    const { correspondentMatches, lastMatchedCorrespondentEntity } =
      nextProps.conversation;
    if (lastMatchedCorrespondentEntity) {
      const index = correspondentMatches.findIndex(
        (contact) => contact.id === lastMatchedCorrespondentEntity.id,
      );
      if (index > -1) return index;
    }
    return this.props.showContactDisplayPlaceholder ? -1 : 0;
  }

  getSelectedContact = (selected = this.state.selected) => {
    const contactMatches = this.props.conversation.correspondentMatches;
    return (
      (selected > -1 && contactMatches[selected]) ||
      (contactMatches.length === 1 && contactMatches[0]) ||
      null
    );
  };

  getMatchEntities() {
    return this.props.conversation.correspondentMatches || [];
  }

  getMatchEntitiesIds() {
    const contactMatches = this.props.conversation.correspondentMatches || [];
    return contactMatches.map((item) => item.id);
  }

  getPhoneNumber() {
    const { correspondents } = this.props.conversation;
    return (
      (correspondents.length === 1 &&
        correspondents[0] &&
        (correspondents[0].phoneNumber || correspondents[0].extensionNumber)) ||
      undefined
    );
  }

  getGroupPhoneNumbers() {
    const { correspondents } = this.props.conversation;
    const groupNumbers =
      correspondents.length > 1
        ? correspondents.map(
            (correspondent) =>
              correspondent.extensionNumber ||
              correspondent.phoneNumber ||
              undefined,
          )
        : null;
    return groupNumbers;
  }

  getFallbackContactName() {
    const { correspondents } = this.props.conversation;
    return (correspondents.length === 1 && correspondents[0].name) || undefined;
  }

  viewSelectedContact = () => {
    if (typeof this.props.onViewContact === 'function') {
      this.props.onViewContact({
        contact: this.getSelectedContact(),
        contactMatches: this.getMatchEntities(),
        phoneNumber: this.getPhoneNumber(),
        matchEntitiesIds: this.getMatchEntitiesIds(),
      });
    }
  };

  createSelectedContact = async (entityType: unknown) => {
    // console.log('click createSelectedContact!!', entityType);
    if (
      typeof this.props.onCreateContact === 'function' &&
      this._mounted &&
      !this.state.isCreating
    ) {
      this.setState({
        isCreating: true,
      });
      // console.log('start to create: isCreating...', this.state.isCreating);
      const phoneNumber = this.getPhoneNumber();
      await this.props.onCreateContact({
        phoneNumber,
        name: this.props.enableContactFallback
          ? this.getFallbackContactName()
          : '',
        entityType,
      });

      if (this._mounted) {
        this.setState({
          isCreating: false,
        });
        // console.log('created: isCreating...', this.state.isCreating);
      }
    }
  };

  logConversation = async ({
    redirect = true,
    selected,
    prefill = true,
  }: {
    redirect?: boolean;
    selected?: number;
    prefill?: boolean;
  } = {}) => {
    if (
      typeof this.props.onLogConversation === 'function' &&
      this._mounted &&
      !this.state.isLogging
    ) {
      this.setState({
        isLogging: true,
      });
      await this.props.onLogConversation({
        correspondentEntity: this.getSelectedContact(selected),
        conversationId: this.props.conversation.conversationId,
        redirect,
        prefill,
      });
      if (this._mounted) {
        this.setState({
          isLogging: false,
        });
      }
    }
  };

  clickToDial = () => {
    if (this.props.onClickToDial) {
      const contact = this.getSelectedContact() || {};
      const phoneNumber = this.getPhoneNumber();

      if (phoneNumber) {
        this.props.onClickToDial({
          ...contact,
          phoneNumber,
          fromType: this.props.conversation.type,
        });
      }
    }
  };

  onClickToSms = () => {
    if (this.props.onClickToSms) {
      const contact = this.getSelectedContact() || {};
      const phoneNumber = this.getPhoneNumber();

      if (phoneNumber) {
        this.props.updateTypeFilter(messageTypes.text);
        this.props.onClickToSms({
          ...contact,
          phoneNumber,
        });
      }
    }
  };

  onClickItem: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (this.contactDisplay && this.contactDisplay.contains(e.target)) {
      return;
    }

    this.toggleExtended();
  };

  onClickWrapper: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (this.contactDisplay && this.contactDisplay.contains(e.target)) {
      return;
    }
    if (messageIsTextMessage(this.props.conversation)) {
      this.props.showConversationDetail(this.props.conversation.conversationId);
    }
  };

  onPlayVoicemail = () => {
    if (this.props.conversation.unreadCounts > 0) {
      this.props.readMessage(this.props.conversation.conversationId);
    }
  };

  onMarkMessage = () => {
    if (this.props.conversation.unreadCounts === 0) {
      this.props.markMessage(this.props.conversation.conversationId);
    }
  };

  onUnmarkMessage = () => {
    if (this.props.conversation.unreadCounts > 0) {
      this.props.unmarkMessage(this.props.conversation.conversationId);
    }
  };

  onPreviewFax = (uri: string) => {
    this.props.previewFaxMessages(uri, this.props.conversation.conversationId);
  };

  getDetail() {
    const { conversation, currentLocale } = this.props;
    if (messageIsTextMessage(conversation)) {
      if (
        conversation.mmsAttachments &&
        conversation.mmsAttachments.length > 0
      ) {
        const imageCount = conversation.mmsAttachments.filter(
          (m) => m.contentType.indexOf('image') > -1,
        ).length;
        if (imageCount > 0) {
          return formatMessage(
            i18n.getString('imageAttachment', currentLocale),
            {
              count: imageCount,
            },
          );
        }
        return formatMessage(i18n.getString('fileAttachment', currentLocale), {
          count: conversation.mmsAttachments.length,
        });
      }
      return conversation.subject;
    }
    if (conversation.voicemailAttachment) {
      const { duration } = conversation.voicemailAttachment;
      return `${i18n.getString(
        'voiceMessage',
        currentLocale,
      )} (${formatDuration(duration)})`;
    }
    if (messageIsFax(conversation)) {
      const pageCount = +conversation.faxPageCount;
      const nameKey = pageCount === 1 ? 'page' : 'pages';
      if (conversation.direction === messageDirection.inbound) {
        return `${i18n.getString(
          'faxReceived',
          currentLocale,
        )}(${pageCount} ${i18n.getString(nameKey, currentLocale)})`;
      }
      return `${i18n.getString(
        'faxSent',
        currentLocale,
      )}(${pageCount} ${i18n.getString(nameKey, currentLocale)})`;
    }
    return '';
  }

  onDeleteMessage = () => {
    this.props.deleteMessage(this.props.conversation.conversationId);
  };

  dateTimeFormatter(creationTime: number) {
    try {
      return this.props.dateTimeFormatter({ utcTimestamp: creationTime });
    } catch (e) {
      console.error('Format date time error', creationTime);
      return creationTime;
    }
  }

  getDisableClickToSms = () => {
    const {
      areaCode,
      countryCode,
      onClickToSms,
      internalSmsPermission,
      outboundSmsPermission,
    } = this.props;
    const phoneNumber = this.getPhoneNumber();
    let disableClickToSms = false;
    if (phoneNumber) {
      const parsedInfo = parseNumber({
        phoneNumber,
        countryCode,
        areaCode,
      });
      const isExtension =
        !parsedInfo.hasPlus &&
        parsedInfo.number &&
        parsedInfo.number.length <= 6;
      disableClickToSms = !(
        onClickToSms &&
        (isExtension ? internalSmsPermission : outboundSmsPermission)
      );
    }
    return disableClickToSms;
  };

  render() {
    const {
      areaCode,
      brand,
      countryCode,
      currentLocale,
      currentSiteCode,
      isMultipleSiteEnabled,
      conversation: {
        conversationId,
        unreadCounts,
        correspondents,
        correspondentMatches,
        creationTime,
        isLogging,
        conversationMatches,
        type,
        direction,
        voicemailAttachment,
        faxAttachment,
      },
      disableLinks: parentDisableLinks,
      disableCallButton,
      disableClickToDial,
      onClickToDial,
      onClickToSms,
      onLogConversation,
      onViewContact,
      onCreateContact,
      createEntityTypes,
      enableContactFallback,
      contactPlaceholder,
      showContactDisplayPlaceholder,
      sourceIcons,
      phoneTypeRenderer,
      phoneSourceNameRenderer,
      showGroupNumberName,
      renderExtraButton,
      onFaxDownload,
      showChooseEntityModal,
      renderContactList,
      dropdownClassName,
      enableCDC,
    } = this.props;
    let disableLinks = parentDisableLinks;
    const isVoicemail = type === messageTypes.voiceMail;
    const isFax = type === messageTypes.fax;
    if (isVoicemail && !voicemailAttachment) {
      disableLinks = true;
    }
    if (isFax && !faxAttachment) {
      disableLinks = true;
    }
    const groupNumbers = this.getGroupPhoneNumbers();
    const phoneNumber = this.getPhoneNumber();
    /**
     * TODO:
     * * Group message is supported for internal paging:
     * * What is the requirement when a hidden contact is part of a group conversation?
     * * Is it possible to ignore this edge case initially as group conversations are rare, especially when most people use glip now for internal conversations?
     */
    const shouldHideNumber =
      enableCDC &&
      checkShouldHidePhoneNumber(phoneNumber, correspondentMatches);
    const isContactMatchesHidden =
      enableCDC && checkShouldHideContactUser(correspondentMatches);
    const fallbackName = this.getFallbackContactName();
    const detail = this.getDetail();
    const disableClickToSms = this.getDisableClickToSms();
    let player;
    let slideMenuHeight = 60;
    if (isVoicemail) {
      player = (
        <VoicemailPlayer
          className={styles.player}
          uri={voicemailAttachment.uri}
          duration={voicemailAttachment.duration}
          onPlay={this.onPlayVoicemail}
          disabled={disableLinks}
          currentLocale={currentLocale}
        />
      );
      slideMenuHeight = 88;
    }
    const extraButton = renderExtraButton
      ? renderExtraButton(this.props.conversation, {
          logConversation: this.logConversation,
          isLogging: isLogging || this.state.isLogging,
        })
      : null;
    const msgItem = `${type}MessageItem`;

    return (
      <div
        data-sign={msgItem}
        data-id={conversationId}
        className={styles.root}
        onClick={this.onClickItem}
      >
        <div
          data-sign="unread"
          className={classnames(styles.wrapper, unreadCounts && styles.unread)}
          onClick={this.onClickWrapper}
        >
          <ConversationIcon
            group={correspondents.length > 1}
            type={type}
            currentLocale={currentLocale}
            direction={direction}
          />
          <div
            className={classnames(
              styles.infoWrapper,
              !extraButton && styles.embellishInfoWrapper,
            )}
          >
            <ContactDisplay
              reference={(ref) => {
                this.contactDisplay = ref;
              }}
              className={classnames(
                styles.contactDisplay,
                unreadCounts && styles.unread,
              )}
              unread={!!unreadCounts}
              selectedClassName={styles.selectedValue}
              selectClassName={styles.dropdownSelect}
              brand={brand}
              contactMatches={correspondentMatches}
              selected={this.state.selected}
              onSelectContact={this.onSelectContact}
              disabled={disableLinks}
              isLogging={isLogging || this.state.isLogging}
              fallBackName={fallbackName}
              areaCode={areaCode}
              countryCode={countryCode}
              phoneNumber={shouldHideNumber ? null : phoneNumber}
              groupNumbers={groupNumbers}
              showGroupNumberName={showGroupNumberName}
              currentLocale={currentLocale}
              currentSiteCode={currentSiteCode}
              isMultipleSiteEnabled={isMultipleSiteEnabled}
              enableContactFallback={enableContactFallback}
              stopPropagation={false}
              showType={false}
              showPlaceholder={showContactDisplayPlaceholder}
              placeholder={contactPlaceholder}
              sourceIcons={sourceIcons}
              phoneTypeRenderer={phoneTypeRenderer}
              phoneSourceNameRenderer={phoneSourceNameRenderer}
              dropdownRenderFunction={renderContactList}
              dropdownClassName={dropdownClassName}
            />
            <div className={styles.detailsWithTime}>
              <div
                data-sign="msgDetail"
                className={styles.details}
                title={detail}
              >
                {detail}
              </div>
              <div className={styles.separatrix}>|</div>
              <div data-sign="msgCreateTime" className={styles.creationTime}>
                {this.dateTimeFormatter(creationTime)}
              </div>
            </div>
          </div>
          {extraButton}
        </div>
        <SlideMenu
          extended={this.state.extended}
          onToggle={this.toggleExtended}
          extendIconClassName={styles.extendIcon}
          className={styles.slideMenu}
          minHeight={0}
          maxHeight={slideMenuHeight}
        >
          <div
            className={styles.playContainer}
            onClick={this.preventEventPropagating}
          >
            {player}
          </div>
          <ActionMenuList
            shouldHideEntityButton={isContactMatchesHidden}
            className={styles.actionMenuList}
            type={type}
            currentLocale={currentLocale}
            onLog={
              isVoicemail || isFax || renderExtraButton
                ? undefined
                : onLogConversation && this.logConversation
            }
            onViewEntity={onViewContact && this.viewSelectedContact}
            onCreateEntity={onCreateContact && this.createSelectedContact}
            createEntityTypes={createEntityTypes}
            hasEntity={
              correspondents.length === 1 &&
              !!correspondentMatches.length &&
              (this.getSelectedContact()?.type ?? '') !== extensionTypes.ivrMenu
            }
            onClickToDial={
              !isFax ? onClickToDial && this.clickToDial : undefined
            }
            onClickToSms={
              isVoicemail ? onClickToSms && this.onClickToSms : undefined
            }
            disableClickToSms={disableClickToSms}
            phoneNumber={phoneNumber}
            disableLinks={disableLinks}
            disableCallButton={disableCallButton}
            disableClickToDial={disableClickToDial}
            isLogging={isLogging || this.state.isLogging}
            isLogged={conversationMatches.length > 0}
            isCreating={this.state.isCreating}
            addLogTitle={i18n.getString('addLog', currentLocale)}
            editLogTitle={i18n.getString('editLog', currentLocale)}
            callTitle={i18n.getString('call', currentLocale)}
            textTitle={i18n.getString('text', currentLocale)}
            createEntityTitle={i18n.getString('addEntity', currentLocale)}
            viewEntityTitle={i18n.getString('viewDetails', currentLocale)}
            stopPropagation={false}
            onDelete={isVoicemail || isFax ? this.onDeleteMessage : undefined}
            deleteTitle={i18n.getString('delete', currentLocale)}
            marked={unreadCounts > 0}
            onMark={
              isVoicemail || (isFax && direction === messageDirection.inbound)
                ? this.onMarkMessage
                : undefined
            }
            onUnmark={
              isVoicemail || (isFax && direction === messageDirection.inbound)
                ? this.onUnmarkMessage
                : undefined
            }
            onPreview={isFax ? this.onPreviewFax : undefined}
            markTitle={i18n.getString('mark', currentLocale)}
            unmarkTitle={i18n.getString('unmark', currentLocale)}
            faxAttachment={faxAttachment}
            previewTitle={i18n.getString('preview', currentLocale)}
            downloadTitle={i18n.getString('download', currentLocale)}
            onFaxDownload={onFaxDownload}
            showChooseEntityModal={showChooseEntityModal}
          />
        </SlideMenu>
      </div>
    );
  }
}

export default MessageItem;
