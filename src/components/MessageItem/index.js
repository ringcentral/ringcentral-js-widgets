import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import messageTypes from 'ringcentral-integration/enums/messageTypes';
import {
  messageIsTextMessage,
  messageIsVoicemail,
} from 'ringcentral-integration/lib/messageHelper';

import ContactDisplay from '../ContactDisplay';
import ActionMenu from '../ActionMenu';
import styles from './styles.scss';
import i18n from './i18n';
import VoicemailIcon from '../../assets/images/VoicemailIcon.svg';
import ComposeTextIcon from '../../assets/images/ComposeText.svg';
import GroupConversationIcon from '../../assets/images/GroupConversation.svg';

function ConversationIcon({
  group,
  type,
  currentLocale,
}) {
  let title;
  let icon;
  switch (type) {
    case messageTypes.voiceMail:
      title = i18n.getString(messageTypes.voiceMail, currentLocale);
      icon = <VoicemailIcon width={23} className={styles.icon} />;
      break;
    default:
      title = group ?
        i18n.getString(messageTypes.groupConversation, currentLocale) :
        i18n.getString(messageTypes.conversation, currentLocale);
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
};
ConversationIcon.defaultProps = {
  group: false,
  type: undefined,
  currentLocale: undefined,
};

function formatVoiceMailDuration(duration) {
  const mins = Math.round(duration / 60);
  const secs = Math.round(duration % 60);
  return `${mins < 10 ? `0${mins}` : mins}:${secs < 10 ? `0${secs}` : secs}`;
}

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
    const correspondents = this.props.conversation.correspondents;
    return (correspondents.length === 1 &&
      (correspondents[0].phoneNumber || correspondents[0].extensionNumber)) || undefined;
  }
  getGroupPhoneNumbers() {
    const correspondents = this.props.conversation.correspondents;
    const groupNumbers = correspondents.length > 1 ?
      correspondents.map(correspondent =>
        correspondent.extensionNumber || correspondent.phoneNumber || undefined
      )
      : null;
    return groupNumbers;
  }
  getFallbackContactName() {
    const correspondents = this.props.conversation.correspondents;
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

  async logConversation({ redirect = true, selected, prefill = true }) {
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
      this.props.onClickToDial(this.getPhoneNumber());
    }
  }
  onClickItem = (e) => {
    if ((
      this.contactDisplay &&
      this.contactDisplay.contains(e.target))
    ) {
      return;
    }
    if (messageIsTextMessage(this.props.conversation)) {
      this.props.showConversationDetail(this.props.conversation.conversationId);
      return;
    }
    if (
      messageIsVoicemail(this.props.conversation) &&
      this.props.conversation.unreadCounts > 0
    ) {
      this.props.readVoicemail(this.props.conversation.conversationId);
    }
    this.toggleExtended();
  }

  getDetail() {
    const {
      conversation,
      currentLocale,
    } = this.props;
    if (messageIsTextMessage(conversation)) {
      return conversation.subject;
    }
    if (messageIsVoicemail(conversation)) {
      const attachment = conversation.attachments && conversation.attachments[0];
      const duration = (attachment && attachment.vmDuration) || 0;
      return `${i18n.getString('voiceMessage', currentLocale)} (${formatVoiceMailDuration(duration)})`;
    }
    return '';
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
      },
      disableLinks,
      disableClickToDial,
      onClickToDial,
      onLogConversation,
      onViewContact,
      onCreateContact,
      dateTimeFormatter,
      enableContactFallback,
      showContactDisplayPlaceholder,
      sourceIcons,
      showGroupNumberName,
    } = this.props;

    const groupNumbers = this.getGroupPhoneNumbers();
    const phoneNumber = this.getPhoneNumber();
    const fallbackName = this.getFallbackContactName();
    const detail = this.getDetail();
    return (
      <div className={styles.root} onClick={this.onClickItem}>
        <div
          className={classnames(
            styles.wrapper,
            unreadCounts && styles.unread
          )}
        >
          <ConversationIcon
            group={correspondents.length > 1}
            type={type}
            currentLocale={currentLocale}
          />
          <ContactDisplay
            reference={(ref) => { this.contactDisplay = ref; }}
            className={classnames(
              styles.contactDisplay,
              unreadCounts && styles.unread
            )}
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
          <div className={styles.details}>
            {detail}
          </div>
          <div className={styles.creationTime}>
            {dateTimeFormatter({ utcTimestamp: creationTime })}
          </div>
        </div>
        <ActionMenu
          extended={this.state.extended}
          onToggle={this.toggleExtended}
          extendIconClassName={styles.extendIcon}
          currentLocale={currentLocale}
          onLog={onLogConversation && this.logConversation}
          onViewEntity={onViewContact && this.viewSelectedContact}
          onCreateEntity={onCreateContact && this.createSelectedContact}
          hasEntity={correspondents.length === 1 && !!correspondentMatches.length}
          onClickToDial={onClickToDial && this.clickToDial}
          phoneNumber={phoneNumber}
          disableLinks={disableLinks}
          disableClickToDial={disableClickToDial}
          isLogging={isLogging || this.state.isLogging}
          isLogged={conversationMatches.length > 0}
          isCreating={this.state.isCreating}
          addLogTitle={i18n.getString('addLog', currentLocale)}
          editLogTitle={i18n.getString('editLog', currentLocale)}
          callTitle={i18n.getString('call', currentLocale)}
          createEntityTitle={i18n.getString('addEntity', currentLocale)}
          viewEntityTitle={i18n.getString('viewDetails', currentLocale)}
          stopPropagation={false}
        />
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
  }).isRequired,
  areaCode: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  currentLocale: PropTypes.string.isRequired,
  onLogConversation: PropTypes.func,
  onViewContact: PropTypes.func,
  onCreateContact: PropTypes.func,
  onClickToDial: PropTypes.func,
  disableLinks: PropTypes.bool,
  disableClickToDial: PropTypes.bool,
  dateTimeFormatter: PropTypes.func.isRequired,
  showConversationDetail: PropTypes.func.isRequired,
  readVoicemail: PropTypes.func.isRequired,
  autoLog: PropTypes.bool,
  enableContactFallback: PropTypes.bool,
  showContactDisplayPlaceholder: PropTypes.bool,
  sourceIcons: PropTypes.object,
  showGroupNumberName: PropTypes.bool,
};

MessageItem.defaultProps = {
  onLogConversation: undefined,
  onClickToDial: undefined,
  onViewContact: undefined,
  onCreateContact: undefined,
  disableClickToDial: false,
  disableLinks: false,
  autoLog: false,
  enableContactFallback: undefined,
  showContactDisplayPlaceholder: true,
  sourceIcons: undefined,
  showGroupNumberName: false,
};
