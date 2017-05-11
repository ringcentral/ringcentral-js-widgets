import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';

import Spinner from '../Spinner';
import RecipientsHeader from '../RecipientsHeader';
import ConversationMessageList from '../ConversationMessageList';
import LogButton from '../LogButton';
import ContactDisplay from '../ContactDisplay';

import styles from './styles.scss';
import i18n from './i18n';

class ConversationPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textValue: '',
      selected: this.getInitialContactIndex(),
      userSelection: false,
      isLogging: false,

    };
    this.onTextChange = (e) => {
      this.setState({
        textValue: e.currentTarget.value,
      });
    };
    this.handleSubmit = (e) => {
      this.props.replyToReceivers(this.state.textValue);
      this.setState({
        textValue: '',
      });
      e.preventDefault();
    };
    this.onTextAreaKeyDown = (e) => {
      if (e.key === 'Enter') {
        this.props.replyToReceivers(this.state.textValue);
        this.setState({
          textValue: '',
        });
        e.preventDefault();
      }
    };
  }
  componentDidMount() {
    this._mounted = true;
  }
  componentWillReceiveProps(nextProps) {
    if (
      !this.state.userSelection &&
      nextProps.conversation.conversationMatches !== this.props.conversation.conversationMatches
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
    const selected = parseInt(idx, 10) - 1;
    this.setState({
      selected,
      userSelection: true,
    });
    if (this.props.conversation.conversationMatches.length > 0) {
      this.logConversation({ redirect: false, selected });
    }
  }
  getSelectedContact = (selected = this.state.selected) => {
    const contactMatches = this.props.conversation.correspondentMatches;
    return (selected > -1 && contactMatches[selected]) ||
      (contactMatches.length === 1 && contactMatches[0]) ||
      null;
  }
  getInitialContactIndex(nextProps = this.props) {
    const {
      correspondentMatches,
      conversationMatches,
    } = nextProps.conversation;
    for (const conversation of conversationMatches) {
      const index = correspondentMatches.findIndex(contact => (
        this.props.isLoggedContact(nextProps.conversation, conversation, contact)
      ));
      if (index > -1) return index;
    }
    return -1;
  }

  logConversation = async ({ redirect = true, selected }) => {
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
      });
      if (this._mounted) {
        this.setState({
          isLogging: false,
        });
      }
    }
  }
  getPhoneNumber() {
    const correspondents = this.props.conversation.correspondents;
    return (correspondents.length === 1 &&
      (correspondents[0].phoneNumber || correspondents[0].extensionNumber)) || undefined;
  }
  getFallbackContactName() {
    const correspondents = this.props.conversation.correspondents;
    return (correspondents.length === 1 &&
      (correspondents[0].name)) || undefined;
  }

  render() {
    let conversationBody = null;
    const loading = this.props.showSpinner;
    const recipients = this.props.recipients;
    if (loading) {
      conversationBody = (
        <div className={styles.spinerContainer}>
          <Spinner />
        </div>
      );
    } else {
      conversationBody = (
        <ConversationMessageList
          messages={this.props.messages}
          className={styles.conversationBody}
          showFrom={recipients && recipients.length > 1}
        />
      );
    }
    const {
      isLogging,
      correspondents,
      conversationMatches,
      correspondentMatches,
    } = this.props.conversation;
    const groupNumbers = correspondents.length > 1 ? correspondents : null;
    const phoneNumber = this.getPhoneNumber();
    const fallbackName = this.getFallbackContactName();

    const logButton = this.props.onLogConversation ?
      (
        <LogButton
          className={styles.logButton}
          onLog={this.logConversation}
          disableLinks={this.props.disableLinks}
          isLogged={conversationMatches.length > 0}
          isLogging={isLogging || this.state.isLogging}
          currentLocale={this.props.currentLocale}
        />
      ) :
      null;
    return (
      <div className={styles.root}>
        <div className={styles.header}>
          <ContactDisplay
            className={styles.contactDisplay}
            contactMatches={correspondentMatches}
            selected={this.state.selected}
            onSelectContact={this.onSelectContact}
            disabled={this.props.disableLinks}
            isLogging={isLogging || this.state.isLogging}
            fallBackName={fallbackName}
            areaCode={this.props.areaCode}
            countryCode={this.props.countryCode}
            phoneNumber={phoneNumber}
            groupNumbers={groupNumbers}
            currentLocale={this.props.currentLocale}
          />
          <Link
            to={'/messages'}
            className={styles.backButton}
          >
            <span className={dynamicsFont.arrow} />
          </Link>
          {logButton}
        </div>
        {conversationBody}
        <div className={styles.messageForm}>
          <form onSubmit={this.handleSubmit}>
            <div className={styles.textField}>
              <textarea
                placeholder={i18n.getString('typeMessage', this.props.currentLocale)}
                value={this.state.textValue}
                maxLength="1000"
                onChange={this.onTextChange}
                onKeyDown={this.onTextAreaKeyDown}
              />
            </div>
            <div className={styles.submitField}>
              <input
                type="submit"
                value={i18n.getString('send', this.props.currentLocale)}
                className={styles.submitButton}
                disabled={
                  this.props.sendButtonDisabled ||
                  loading ||
                  this.state.textValue.length === 0
                }
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

ConversationPanel.propTypes = {
  replyToReceivers: PropTypes.func.isRequired,
  messages: ConversationMessageList.propTypes.messages,
  recipients: RecipientsHeader.propTypes.recipients,
  sendButtonDisabled: PropTypes.bool.isRequired,
  currentLocale: PropTypes.string.isRequired,
  showSpinner: PropTypes.bool.isRequired,
};

export default ConversationPanel;
