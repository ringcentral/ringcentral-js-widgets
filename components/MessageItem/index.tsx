import { extensionTypes } from '@ringcentral-integration/commons/enums/extensionTypes';
import messageDirection from '@ringcentral-integration/commons/enums/messageDirection';
import messageTypes from '@ringcentral-integration/commons/enums/messageTypes';
import type { Message } from '@ringcentral-integration/commons/interfaces/MessageStore.model';
import { formatDuration } from '@ringcentral-integration/commons/lib/formatDuration';
import {
  messageIsFax,
  messageIsTextMessage,
} from '@ringcentral-integration/commons/lib/messageHelper';
import parseNumber from '@ringcentral-integration/commons/lib/parseNumber';
import { format } from '@ringcentral-integration/utils';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import React, { Component } from 'react';

import { checkShouldHideContactUser } from '../../lib/checkShouldHideContactUser';
import { checkShouldHidePhoneNumber } from '../../lib/checkShouldHidePhoneNumber';
import ActionMenuList from '../ActionMenuList';
import ContactDisplay from '../ContactDisplay';
import type { ContactDisplayItemProps } from '../ContactDisplay/ContactDisplayItem';
import SlideMenu from '../SlideMenu';
import VoicemailPlayer from '../VoicemailPlayer';

import { ConversationIcon } from './ConversationIcon';
import i18n from './i18n';
import styles from './styles.scss';

export type MessageItemProps = {
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
  shouldHideEntityButton?: (...args: any[]) => boolean;
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
  maxExtensionNumberLength?: number;
  renderContactName?: (...args: any[]) => JSX.Element;
  externalViewEntity?: (conversation: Message) => any;
  externalHasEntity?: (conversation: Message) => boolean;
  formatPhone: (phoneNumber: string) => string | undefined;
  renderActionMenuExtraButton: (conversation: Message) => ReactNode;
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
    // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
    dropdownClassName: null,
    enableCDC: false,
    maxExtensionNumberLength: 6,
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

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  componentDidMount() {
    this._mounted = true;
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
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

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
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
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
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
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      (selected > -1 && contactMatches[selected]) ||
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
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
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      (correspondents.length === 1 &&
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        correspondents[0] &&
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        (correspondents[0].phoneNumber || correspondents[0].extensionNumber)) ||
      undefined
    );
  }

  getGroupPhoneNumbers() {
    const { correspondents } = this.props.conversation;
    const groupNumbers =
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      correspondents.length > 1
        ? // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          correspondents.map(
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
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
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
        // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
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
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
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
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    if (this.props.conversation.unreadCounts > 0) {
      this.props.unmarkMessage(this.props.conversation.conversationId);
    }
  };

  onPreviewFax = (uri: string) => {
    // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.previewFaxMessages(uri, this.props.conversation.conversationId);
  };

  getDetail() {
    const { conversation, currentLocale } = this.props;
    if (messageIsTextMessage(conversation)) {
      if (
        conversation.mmsAttachments &&
        conversation.mmsAttachments.length > 0
      ) {
        const count = conversation.mmsAttachments.length;
        if (count === 1) {
          return format(i18n.getString('mmsWithOneAttachment', currentLocale));
        }
        return format(i18n.getString('mmsWithAttachments', currentLocale), {
          count,
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
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
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
    // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.deleteMessage(this.props.conversation.conversationId);
  };

  externalViewEntity = () => {
    const { externalViewEntity, conversation } = this.props;
    return externalViewEntity?.(conversation);
  };

  dateTimeFormatter(creationTime?: number) {
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
      maxExtensionNumberLength,
    } = this.props;
    const phoneNumber = this.getPhoneNumber();
    let disableClickToSms = false;
    if (phoneNumber) {
      const parsedInfo = parseNumber({
        phoneNumber,
        // @ts-expect-error TS(2322): Type 'string' is not assignable to type 'CountryCo... Remove this comment to see the full error message
        countryCode,
        areaCode,
        maxExtensionLength: maxExtensionNumberLength,
      });
      const isExtension =
        !parsedInfo.hasPlus &&
        parsedInfo.number &&
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        parsedInfo.number.length <= maxExtensionNumberLength;
      disableClickToSms = !(
        onClickToSms &&
        (isExtension ? internalSmsPermission : outboundSmsPermission)
      );
    }
    return disableClickToSms;
  };

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
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
      shouldHideEntityButton,
      createEntityTypes,
      enableContactFallback,
      contactPlaceholder,
      showContactDisplayPlaceholder,
      sourceIcons,
      phoneTypeRenderer,
      phoneSourceNameRenderer,
      showGroupNumberName,
      renderExtraButton,
      renderActionMenuExtraButton,
      onFaxDownload,
      showChooseEntityModal,
      renderContactList,
      dropdownClassName,
      enableCDC,
      renderContactName,
      externalHasEntity,
      externalViewEntity,
      formatPhone,
      conversation,
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
      // @ts-expect-error TS(2345): Argument of type 'any[] | undefined' is not assign... Remove this comment to see the full error message
      checkShouldHidePhoneNumber(phoneNumber, correspondentMatches);
    const isContactMatchesHidden =
      // @ts-expect-error TS(2345): Argument of type 'any[] | undefined' is not assign... Remove this comment to see the full error message
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
      ? renderExtraButton(conversation, {
          logConversation: this.logConversation,
          isLogging: isLogging || this.state.isLogging,
        })
      : null;
    const msgItem = `${type}MessageItem`;

    const defaultContactDisplay = (
      <ContactDisplay
        formatPhone={formatPhone}
        reference={(ref) => {
          this.contactDisplay = ref;
        }}
        className={clsx(styles.contactDisplay, unreadCounts && styles.unread)}
        unread={!!unreadCounts}
        selectedClassName={styles.selectedValue}
        selectClassName={styles.dropdownSelect}
        brand={brand}
        // @ts-expect-error TS(2322): Type 'any[] | undefined' is not assignable to type... Remove this comment to see the full error message
        contactMatches={correspondentMatches}
        selected={this.state.selected}
        onSelectContact={this.onSelectContact}
        disabled={disableLinks}
        isLogging={isLogging || this.state.isLogging}
        fallBackName={fallbackName}
        areaCode={areaCode}
        countryCode={countryCode}
        phoneNumber={shouldHideNumber ? null : phoneNumber}
        // @ts-expect-error TS(2322): Type 'any[] | null' is not assignable to type 'str... Remove this comment to see the full error message
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
    );

    return (
      <div
        data-sign={msgItem}
        data-id={conversationId}
        className={styles.root}
        onClick={this.onClickItem}
      >
        <div
          data-sign="unread"
          className={clsx(styles.wrapper, unreadCounts && styles.unread)}
          onClick={this.onClickWrapper}
        >
          <ConversationIcon
            group={correspondents && correspondents.length > 1}
            type={type}
            currentLocale={currentLocale}
            direction={direction}
          />
          <div
            className={clsx(
              styles.infoWrapper,
              !extraButton && styles.embellishInfoWrapper,
            )}
          >
            {renderContactName
              ? renderContactName({
                  conversation,
                  phoneNumber,
                  unread: !!unreadCounts,
                  defaultContactDisplay,
                })
              : defaultContactDisplay}
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
          // @ts-expect-error TS(2322): Type '{ children: Element[]; extended: boolean; on... Remove this comment to see the full error message
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
            // @ts-expect-error TS(2322): Type '{ shouldHideEntityButton: boolean | undefine... Remove this comment to see the full error message
            shouldHideEntityButton={() => {
              if (shouldHideEntityButton) {
                return shouldHideEntityButton(conversation);
              }
              return isContactMatchesHidden;
            }}
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
              // @ts-expect-error TS(2532): Object is possibly 'undefined'.
              correspondents.length === 1 &&
              // @ts-expect-error TS(2532): Object is possibly 'undefined'.
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
            // @ts-expect-error TS(2532): Object is possibly 'undefined'.
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
            // @ts-expect-error TS(2532): Object is possibly 'undefined'.
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
            externalViewEntity={externalViewEntity && this.externalViewEntity}
            externalHasEntity={externalHasEntity?.(conversation)}
            extraButton={renderActionMenuExtraButton?.(conversation)}
          />
        </SlideMenu>
      </div>
    );
  }
}

export default MessageItem;
