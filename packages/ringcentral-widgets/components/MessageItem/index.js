import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import messageTypes from 'ringcentral-integration/enums/messageTypes';
import messageDirection from 'ringcentral-integration/enums/messageDirection';
import {
  messageIsTextMessage,
  messageIsFax
} from 'ringcentral-integration/lib/messageHelper';

import formatDuration from '../../lib/formatDuration';

import ContactDisplay from '../ContactDisplay';
import ActionMenuList from '../ActionMenuList';
import VoicemailPlayer from '../VoicemailPlayer';
import SlideMenu from '../SlideMenu';

import VoicemailIcon from '../../assets/images/VoicemailIcon.svg';
import FaxInboundIcon from '../../assets/images/FaxInbound.svg';
import FaxOutboundIcon from '../../assets/images/FaxOutbound.svg';


import ComposeTextIcon from '../../assets/images/ComposeText.svg';
import GroupConversationIcon from '../../assets/images/GroupConversation.svg';

import styles from './styles.scss';
import i18n from './i18n';

function ConversationIcon({
  group,
  type,
  currentLocale,
  direction,
}) {
  let title;
  let icon;
  switch (type) {
    case messageTypes.voiceMail:
      title = i18n.getString(messageTypes.voiceMail, currentLocale);
      icon = <VoicemailIcon width={23} className={styles.icon} />;
      break;
    case messageTypes.fax:
      title = i18n.getString(messageTypes.fax, currentLocale);
      icon = direction === messageDirection.inbound ?
        <FaxInboundIcon width={21} className={styles.icon} /> :
        <FaxOutboundIcon width={21} className={styles.icon} />;
      break;
    default:
      title = group ?
        i18n.getString('groupConversation', currentLocale) :
        i18n.getString('conversation', currentLocale);
      icon = group ?
        <GroupConversationIcon width={19} className={styles.icon} /> :
        <ComposeTextIcon width={18} className={styles.icon} />;
  }
  return (
    <div className={styles.conversationIcon}>
      <span title={title}>
        {icon}
      </span>
    </div>
  );
}
ConversationIcon.propTypes = {
  group: PropTypes.bool,
  type: PropTypes.string,
  currentLocale: PropTypes.string,
  direction: PropTypes.string,
};
ConversationIcon.defaultProps = {
  group: false,
  type: undefined,
  currentLocale: undefined,
  direction: undefined,
};

export default class MessageItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.getInitialContactIndex(),
      isLogging: false,
      isCreating: false,
      extended: false,
    };

    this.toggleExtended = () => {
      this.setState(preState => ({
        extended: !preState.extended,
      }));
    };
    this._userSelection = false;
    /* [RCINT-4301] onSelection would trigger some state changes that would push new
     * properties before the state has been changed. Which would reset the selected value.
     */
  }
  componentDidMount() {
    this._mounted = true;
  }
  componentWillReceiveProps(nextProps) {
    if (
      !this._userSelection &&
      (
        nextProps.conversation.conversationMatches !==
        this.props.conversation.conversationMatches ||
        nextProps.conversation.correspondentMatches !==
        this.props.conversation.correspondentMatches
      )
    ) {
      this.setState({
        selected: this.getInitialContactIndex(nextProps),
      });
    }
  }
  componentWillUnmount() {
    this._mounted = false;
  }

  preventEventPropogation = (e) => {
    if (e.target !== e.currentTarget) {
      e.stopPropagation();
    }
  }

  onSelectContact = (value, idx) => {
    const selected = this.props.showContactDisplayPlaceholder
      ? parseInt(idx, 10) - 1 : parseInt(idx, 10);
    this._userSelection = true;
    this.setState({
      selected,
    });
    if (
      this.props.conversation.conversationMatches.length > 0 &&
      this.props.autoLog
    ) {
      this.logConversation({ redirect: false, selected, prefill: false });
    }
  }
  getInitialContactIndex(nextProps = this.props) {
    const {
      correspondentMatches,
      lastMatchedCorrespondentEntity,
    } = nextProps.conversation;
    if (lastMatchedCorrespondentEntity) {
      const index = correspondentMatches.findIndex(contact => (
        contact.id === lastMatchedCorrespondentEntity.id
      ));
      if (index > -1) return index;
    }
    return this.props.showContactDisplayPlaceholder ? -1 : 0;
  }
  getSelectedContact = (selected = this.state.selected) => {
    const contactMatches = this.props.conversation.correspondentMatches;
    return (selected > -1 && contactMatches[selected]) ||
      (contactMatches.length === 1 && contactMatches[0]) ||
      null;
  }

  getPhoneNumber() {
    const { correspondents } = this.props.conversation;
    return (correspondents.length === 1 && correspondents[0] &&
      (correspondents[0].phoneNumber || correspondents[0].extensionNumber)) || undefined;
  }
  getGroupPhoneNumbers() {
    const { correspondents } = this.props.conversation;
    const groupNumbers = correspondents.length > 1 ?
      correspondents.map(correspondent =>
        correspondent.extensionNumber || correspondent.phoneNumber || undefined
      )
      : null;
    return groupNumbers;
  }
  getFallbackContactName() {
    const { correspondents } = this.props.conversation;
    return (correspondents.length === 1 &&
      (correspondents[0].name)) || undefined;
  }
  viewSelectedContact = () => {
    if (typeof this.props.onViewContact === 'function') {
      this.props.onViewContact({
        contact: this.getSelectedContact(),
      });
    }
  }
  async createSelectedContact(entityType) {
    // console.log('click createSelectedContact!!', entityType);
    if (typeof this.props.onCreateContact === 'function' &&
      this._mounted &&
      !this.state.isCreating) {
      this.setState({
        isCreating: true,
      });
      // console.log('start to create: isCreating...', this.state.isCreating);
      const phoneNumber = this.getPhoneNumber();
      await this.props.onCreateContact({
        phoneNumber,
        name: this.props.enableContactFallback ? this.getFallbackContactName() : '',
        entityType,
      });

      if (this._mounted) {
        this.setState({
          isCreating: false,
        });
        // console.log('created: isCreating...', this.state.isCreating);
      }
    }
  }
  createSelectedContact = this.createSelectedContact.bind(this);

  async logConversation({ redirect = true, selected, prefill = true } = {}) {
    if (typeof this.props.onLogConversation === 'function' &&
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
  }
  logConversation = this.logConversation.bind(this)

  clickToDial = () => {
    if (this.props.onClickToDial) {
      const contact = this.getSelectedContact() || {};
      const phoneNumber = this.getPhoneNumber();

      if (phoneNumber) {
        this.props.onClickToDial({
          ...contact,
          phoneNumber,
          fromType: this.props.conversation.type
        });
      }
    }
  }
  onClickToSms = () => {
    if (this.props.onClickToSms) {
      const contact = this.getSelectedContact() || {};
      const phoneNumber = this.getPhoneNumber();

      if (phoneNumber) {
        this.props.onClickToSms({
          ...contact,
          phoneNumber,
        });
      }
    }
  }
  onClickItem = (e) => {
    if (
      this.contactDisplay &&
      this.contactDisplay.contains(e.target)
    ) {
      return;
    }

    this.toggleExtended();
  }
  onClickWrapper = (e) => {
    if (
      this.contactDisplay &&
      this.contactDisplay.contains(e.target)
    ) {
      return;
    }
    if (messageIsTextMessage(this.props.conversation)) {
      this.props.showConversationDetail(this.props.conversation.conversationId);
    }
  }

  onPlayVoicemail = () => {
    if (
      this.props.conversation.unreadCounts > 0
    ) {
      this.props.readMessage(this.props.conversation.conversationId);
    }
  }

  onMarkMessage= () => {
    if (
      this.props.conversation.unreadCounts === 0
    ) {
      this.props.markMessage(this.props.conversation.conversationId);
    }
  }

  onUnmarkMessage = () => {
    if (
      this.props.conversation.unreadCounts > 0
    ) {
      this.props.unmarkMessage(this.props.conversation.conversationId);
    }
  }
  onPreviewFax = (uri) => {
    this.props.previewFaxMessages(uri, this.props.conversation.conversationId);
  }
  getDetail() {
    const {
      conversation,
      currentLocale,
    } = this.props;
    if (messageIsTextMessage(conversation)) {
      if (conversation.mmsAttachment && conversation.mmsAttachment.contentType.indexOf('image') > -1) {
        return i18n.getString('imageAttachment', currentLocale);
      }
      return conversation.subject;
    }
    if (conversation.voicemailAttachment) {
      const { duration } = conversation.voicemailAttachment;
      return `${i18n.getString('voiceMessage', currentLocale)} (${formatDuration(duration)})`;
    }
    if (messageIsFax(conversation)) {
      const pageCount = parseInt(conversation.faxPageCount, 10);
      if (conversation.direction === messageDirection.inbound) {
        return `${i18n.getString('faxReceived', currentLocale)}(${pageCount} ${i18n.getString('pages', currentLocale)})`;
      }
      return `${i18n.getString('faxSent', currentLocale)}(${pageCount} ${i18n.getString('pages', currentLocale)})`;
    }
    return '';
  }

  onDeleteMessage = () => {
    this.props.deleteMessage(this.props.conversation.conversationId);
  }

  dateTimeFormatter(creationTime) {
    try {
      return this.props.dateTimeFormatter({ utcTimestamp: creationTime });
    } catch (e) {
      console.error('Format date time error', creationTime);
      return creationTime;
    }
  }

  render() {
    const {
      areaCode,
      brand,
      countryCode,
      currentLocale,
      conversation: {
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
      disableClickToDial,
      onClickToDial,
      onClickToSms,
      onLogConversation,
      onViewContact,
      onCreateContact,
      enableContactFallback,
      showContactDisplayPlaceholder,
      sourceIcons,
      showGroupNumberName,
      renderExtraButton,
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
    const fallbackName = this.getFallbackContactName();
    const detail = this.getDetail();
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
    const extraButton = renderExtraButton ?
      renderExtraButton(
        this.props.conversation,
        {
          logConversation: this.logConversation,
          isLogging: isLogging || this.state.isLogging,
        }
      )
      : null;
    return (
      <div className={styles.root} onClick={this.onClickItem}>
        <div
          className={classnames(
            styles.wrapper,
            unreadCounts && styles.unread
          )}
          onClick={this.onClickWrapper}
        >
          <ConversationIcon
            group={correspondents.length > 1}
            type={type}
            currentLocale={currentLocale}
            direction={direction}
          />
          <div className={classnames(
              styles.infoWrapper,
              !extraButton && styles.embellishInfoWrapper
          )}>
            <ContactDisplay
              reference={(ref) => { this.contactDisplay = ref; }}
              className={classnames(
                styles.contactDisplay,
                unreadCounts && styles.unread
              )}
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
              phoneNumber={phoneNumber}
              groupNumbers={groupNumbers}
              showGroupNumberName={showGroupNumberName}
              currentLocale={currentLocale}
              enableContactFallback={enableContactFallback}
              stopPropagation={false}
              showType={false}
              showPlaceholder={showContactDisplayPlaceholder}
              sourceIcons={sourceIcons}
            />
            <div className={styles.detailsWithTime}>
              <div className={styles.details} title={detail}>
                {detail}
              </div>
              <div className={styles.separatrix}>|</div>
              <div className={styles.creationTime}>
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
          <div className={styles.playContainer} onClick={this.preventEventPropogation}>
            {player}
          </div>
          <ActionMenuList
            className={styles.actionMenuList}
            currentLocale={currentLocale}
            onLog={
              isVoicemail || isFax || extraButton ?
                undefined : (onLogConversation && this.logConversation)
            }
            onViewEntity={onViewContact && this.viewSelectedContact}
            onCreateEntity={onCreateContact && this.createSelectedContact}
            hasEntity={correspondents.length === 1 && !!correspondentMatches.length}
            onClickToDial={!isFax ? (onClickToDial && this.clickToDial) : undefined}
            onClickToSms={isVoicemail ? (onClickToSms && this.onClickToSms) : undefined}
            phoneNumber={phoneNumber}
            disableLinks={disableLinks}
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
            onDelete={isVoicemail ? this.onDeleteMessage : undefined}
            deleteTitle={i18n.getString('delete', currentLocale)}
            marked={unreadCounts > 0}
            onMark={(isVoicemail || (isFax && direction === messageDirection.inbound)) ?
              this.onMarkMessage : undefined}
            onUnmark={(isVoicemail || (isFax && direction === messageDirection.inbound)) ?
              this.onUnmarkMessage : undefined}
            onPreview={isFax ? this.onPreviewFax : undefined}
            markTitle={i18n.getString('mark', currentLocale)}
            unmarkTitle={i18n.getString('unmark', currentLocale)}
            faxAttachment={faxAttachment}
            previewTitle={i18n.getString('preview', currentLocale)}
            downloadTitle={i18n.getString('download', currentLocale)}
          />
        </SlideMenu>
      </div>
    );
  }
}

MessageItem.propTypes = {
  conversation: PropTypes.shape({
    conversationId: PropTypes.string.isRequired,
    isLogging: PropTypes.bool,
    correspondents: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      phoneNumber: PropTypes.string,
      extensionNumber: PropTypes.string,
    })),
    correspondentMatches: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      entityType: PropTypes.string,
    })),
    conversationMatches: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
    })),
    unreadCounts: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    uri: PropTypes.string,
  }).isRequired,
  areaCode: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  currentLocale: PropTypes.string.isRequired,
  onLogConversation: PropTypes.func,
  onViewContact: PropTypes.func,
  onCreateContact: PropTypes.func,
  onClickToDial: PropTypes.func,
  onClickToSms: PropTypes.func,
  disableLinks: PropTypes.bool,
  disableClickToDial: PropTypes.bool,
  dateTimeFormatter: PropTypes.func.isRequired,
  showConversationDetail: PropTypes.func.isRequired,
  readMessage: PropTypes.func.isRequired,
  markMessage: PropTypes.func.isRequired,
  unmarkMessage: PropTypes.func.isRequired,
  autoLog: PropTypes.bool,
  enableContactFallback: PropTypes.bool,
  showContactDisplayPlaceholder: PropTypes.bool,
  sourceIcons: PropTypes.object,
  showGroupNumberName: PropTypes.bool,
  deleteMessage: PropTypes.func,
  previewFaxMessages: PropTypes.func,
  renderExtraButton: PropTypes.func,
};

MessageItem.defaultProps = {
  onLogConversation: undefined,
  onClickToDial: undefined,
  onViewContact: undefined,
  onCreateContact: undefined,
  disableClickToDial: false,
  onClickToSms: undefined,
  disableLinks: false,
  autoLog: false,
  enableContactFallback: undefined,
  showContactDisplayPlaceholder: true,
  sourceIcons: undefined,
  showGroupNumberName: false,
  deleteMessage: () => {},
  previewFaxMessages: undefined,
  renderExtraButton: undefined,
};
