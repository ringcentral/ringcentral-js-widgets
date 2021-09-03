import { RcAlert } from '@ringcentral/juno';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import { checkShouldHidePhoneNumber } from '../../lib/checkShouldHidePhoneNumber';
import ContactDisplay from '../ContactDisplay';
import ConversationMessageList from '../ConversationMessageList';
import LogButton from '../LogButton';
import MessageInput from '../MessageInput';
import { SpinnerOverlay } from '../SpinnerOverlay';
import i18n from './i18n';
import styles from './styles.scss';

class ConversationPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.getInitialContactIndex(),
      isLogging: false,
      inputHeight: 63,
      loaded: false,
      alertHeight: 46,
    };
    this._userSelection = false;
  }

  componentDidMount() {
    if (!this.props.showSpinner) {
      this.loadConversation();
    }
    this._mounted = true;
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      !this._userSelection &&
      this.props.conversation &&
      nextProps.conversation &&
      (nextProps.conversation.conversationMatches !==
        this.props.conversation.conversationMatches ||
        nextProps.conversation.correspondentMatches !==
          this.props.conversation.correspondentMatches)
    ) {
      this.setState({
        selected: this.getInitialContactIndex(nextProps),
      });
    }
    if (!nextProps.showSpinner && this.props.showSpinner) {
      this.loadConversation();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.messages !== this.props.messages) {
      this.props.readMessages(this.props.conversationId);
    }
    if (prevState.loaded === false && this.state.loaded === true) {
      if (this.props.messages.length < this.props.perPage) {
        this.props.loadPreviousMessages();
      }
      this.getDncAlertHeight();
    }
  }

  componentWillUnmount() {
    this._mounted = false;
    this.props.unloadConversation();
  }

  onSend = (text, attachments) => {
    const selectedContact = this.getSelectedContact();
    this.props.replyToReceivers(text, attachments, selectedContact);
  };

  onInputHeightChange = (value) => {
    this.setState({
      inputHeight: value,
    });
  };

  onSelectContact = (value, idx) => {
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

  getMessageListHeight() {
    const headerHeight = 41;
    const alertMargin = 12;
    if (this.props.restrictSendMessage?.(this.getSelectedContact())) {
      return `calc(100% - ${
        this.state.alertHeight + alertMargin + headerHeight
      }px)`;
    }
    return `calc(100% - ${this.state.inputHeight + headerHeight}px)`;
  }

  getDncAlertHeight() {
    if (this.dncAlert) {
      this.setState({
        alertHeight: this.dncAlert.clientHeight,
      });
    }
  }

  getSelectedContact = (selected = this.state.selected) => {
    if (!this.props.conversation) {
      return null;
    }
    const contactMatches = this.props.conversation.correspondentMatches;
    return (
      (selected > -1 && contactMatches[selected]) ||
      (contactMatches.length === 1 && contactMatches[0]) ||
      null
    );
  };

  getInitialContactIndex(nextProps = this.props) {
    const {
      correspondentMatches,
      lastMatchedCorrespondentEntity,
      conversationMatches,
    } = nextProps.conversation;
    let index = null;
    const correspondentMatchId =
      (lastMatchedCorrespondentEntity && lastMatchedCorrespondentEntity.id) ||
      (conversationMatches[0] && conversationMatches[0].id);
    if (correspondentMatchId) {
      index = correspondentMatches.findIndex(
        (contact) => contact.id === correspondentMatchId,
      );
      if (index > -1) return index;
    }
    return -1;
  }

  getPhoneNumber() {
    const { conversation: { correspondents = [] } = {} } = this.props;
    return (
      (correspondents.length === 1 &&
        (correspondents[0].phoneNumber || correspondents[0].extensionNumber)) ||
      undefined
    );
  }

  getGroupPhoneNumbers() {
    const { conversation: { correspondents = [] } = {} } = this.props;
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
    const { conversation: { correspondents = [] } = {} } = this.props;
    return (correspondents.length === 1 && correspondents[0].name) || undefined;
  }

  loadConversation() {
    this.props.loadConversation(this.props.conversationId);
    this.setState({ loaded: true });
  }

  async logConversation({ redirect = true, selected, prefill = true } = {}) {
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
  }

  logConversation = this.logConversation.bind(this);

  render() {
    if (!this.state.loaded) {
      return (
        <div className={styles.root}>
          <SpinnerOverlay />
        </div>
      );
    }
    let conversationBody = null;
    const loading = this.props.showSpinner;
    const { recipients, messageSubjectRenderer } = this.props;
    if (!loading) {
      conversationBody = (
        <ConversationMessageList
          currentLocale={this.props.currentLocale}
          height={this.getMessageListHeight()}
          messages={this.props.messages}
          className={styles.conversationBody}
          dateTimeFormatter={this.props.dateTimeFormatter}
          showSender={recipients && recipients.length > 1}
          messageSubjectRenderer={messageSubjectRenderer}
          formatPhone={this.props.formatPhone}
          loadingNextPage={this.props.loadingNextPage}
          loadPreviousMessages={this.props.loadPreviousMessages}
          onAttachmentDownload={this.props.onAttachmentDownload}
        />
      );
    }
    const {
      isLogging,
      conversationMatches,
      correspondentMatches,
    } = this.props.conversation;
    const groupNumbers = this.getGroupPhoneNumbers();
    const phoneNumber = this.getPhoneNumber();
    // TODO: Confirm on group messages similar to MessageItem
    const shouldHideNumber =
      this.props.enableCDC &&
      checkShouldHidePhoneNumber(phoneNumber, correspondentMatches);
    const fallbackName = this.getFallbackContactName();
    const extraButton = this.props.renderExtraButton
      ? this.props.renderExtraButton(this.props.conversation, {
          logConversation: this.logConversation,
          isLogging: isLogging || this.state.isLogging,
        })
      : null;
    const logButton =
      this.props.onLogConversation && !this.props.renderExtraButton ? (
        <LogButton
          className={styles.logButton}
          onLog={this.logConversation}
          disableLinks={this.props.disableLinks}
          isLogged={conversationMatches.length > 0}
          isLogging={isLogging || this.state.isLogging}
          currentLocale={this.props.currentLocale}
        />
      ) : null;
    return (
      <div className={styles.root}>
        <div data-sign="conversationPanel" className={styles.header}>
          <ContactDisplay
            brand={this.props.brand}
            className={styles.contactDisplay}
            selectClassName={styles.contactDisplaySelect}
            contactMatches={correspondentMatches || []}
            selected={this.state.selected}
            onSelectContact={this.onSelectContact}
            disabled={this.props.disableLinks}
            isLogging={isLogging || this.state.isLogging}
            fallBackName={fallbackName}
            areaCode={this.props.areaCode}
            countryCode={this.props.countryCode}
            phoneNumber={shouldHideNumber ? null : phoneNumber}
            groupNumbers={groupNumbers}
            showType={false}
            currentLocale={this.props.currentLocale}
            enableContactFallback={this.props.enableContactFallback}
            placeholder={this.props.contactPlaceholder}
            showPlaceholder={this.props.showContactDisplayPlaceholder}
            sourceIcons={this.props.sourceIcons}
            phoneTypeRenderer={this.props.phoneTypeRenderer}
            phoneSourceNameRenderer={this.props.phoneSourceNameRenderer}
            showGroupNumberName={this.props.showGroupNumberName}
            dropdownRenderFunction={this.props.renderContactList}
            dropdownClassName={this.props.dropdownClassName}
          />
          <a
            onClick={() => this.props.goBack()}
            data-sign="backButton"
            className={styles.backButton}
          >
            <span className={dynamicsFont.arrow} />
          </a>
          {extraButton && <div className={styles.logButton}>{extraButton}</div>}
          {logButton}
        </div>
        {conversationBody}
        {this.props.restrictSendMessage?.(this.getSelectedContact()) ? (
          <RcAlert
            ref={(target) => {
              this.dncAlert = target;
            }}
            severity="error"
            size="small"
            className={styles.alert}
            data-sign="dncAlert"
          >
            {i18n.getString('dncAlert', this.props.currentLocale)}
          </RcAlert>
        ) : (
          <MessageInput
            value={this.props.messageText}
            onChange={this.props.updateMessageText}
            disabled={shouldHideNumber}
            sendButtonDisabled={this.props.sendButtonDisabled}
            currentLocale={this.props.currentLocale}
            onSend={this.onSend}
            onHeightChange={this.onInputHeightChange}
            inputExpandable={this.props.inputExpandable}
            attachments={this.props.attachments}
            supportAttachment={this.props.supportAttachment}
            addAttachment={this.props.addAttachment}
            removeAttachment={this.props.removeAttachment}
          />
        )}
      </div>
    );
  }
}

ConversationPanel.propTypes = {
  brand: PropTypes.string.isRequired,
  replyToReceivers: PropTypes.func.isRequired,
  messages: ConversationMessageList.propTypes.messages,
  updateMessageText: PropTypes.func,
  messageText: PropTypes.string,
  recipients: PropTypes.arrayOf(
    PropTypes.shape({
      phoneNumber: PropTypes.string,
      extensionNumber: PropTypes.string,
      name: PropTypes.string,
    }),
  ).isRequired,
  sendButtonDisabled: PropTypes.bool.isRequired,
  currentLocale: PropTypes.string.isRequired,
  showSpinner: PropTypes.bool.isRequired,
  disableLinks: PropTypes.bool,
  conversation: PropTypes.object.isRequired,
  onLogConversation: PropTypes.func,
  areaCode: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  autoLog: PropTypes.bool,
  enableContactFallback: PropTypes.bool,
  dateTimeFormatter: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  showContactDisplayPlaceholder: PropTypes.bool,
  contactPlaceholder: PropTypes.string,
  sourceIcons: PropTypes.object,
  phoneTypeRenderer: PropTypes.func,
  phoneSourceNameRenderer: PropTypes.func,
  showGroupNumberName: PropTypes.bool,
  messageSubjectRenderer: PropTypes.func,
  formatPhone: PropTypes.func.isRequired,
  readMessages: PropTypes.func.isRequired,
  loadPreviousMessages: PropTypes.func.isRequired,
  unloadConversation: PropTypes.func.isRequired,
  perPage: PropTypes.number,
  conversationId: PropTypes.string.isRequired,
  loadConversation: PropTypes.func,
  renderExtraButton: PropTypes.func,
  loadingNextPage: PropTypes.bool,
  inputExpandable: PropTypes.bool,
  attachments: PropTypes.arrayOf(
    PropTypes.shape({
      size: PropTypes.number,
      name: PropTypes.string,
    }),
  ),
  supportAttachment: PropTypes.bool,
  addAttachment: PropTypes.func,
  removeAttachment: PropTypes.func,
  onAttachmentDownload: PropTypes.func,
  restrictSendMessage: PropTypes.func,
  shouldLogSelectRecord: PropTypes.bool,
  onSelectContact: PropTypes.func,
  renderContactList: PropTypes.func,
  dropdownClassName: PropTypes.string,
  enableCDC: PropTypes.bool,
};
ConversationPanel.defaultProps = {
  disableLinks: false,
  onLogConversation: undefined,
  autoLog: false,
  enableContactFallback: undefined,
  showContactDisplayPlaceholder: true,
  contactPlaceholder: '',
  sourceIcons: undefined,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  showGroupNumberName: false,
  messageText: '',
  updateMessageText: () => null,
  messageSubjectRenderer: undefined,
  perPage: undefined,
  loadConversation: () => null,
  renderExtraButton: undefined,
  loadingNextPage: false,
  inputExpandable: undefined,
  attachments: [],
  supportAttachment: false,
  addAttachment: () => null,
  removeAttachment: () => null,
  onAttachmentDownload: undefined,
  restrictSendMessage: undefined,
  shouldLogSelectRecord: false,
  onSelectContact: undefined,
  renderContactList: undefined,
  dropdownClassName: null,
  enableCDC: false,
};

export default ConversationPanel;
