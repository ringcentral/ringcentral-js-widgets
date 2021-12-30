import React, { Component } from 'react';

import classnames from 'classnames';

import FromField from '../FromField';
import MessageInput from '../MessageInput';
import RecipientsInput from '../RecipientsInput';
import { SpinnerOverlay } from '../SpinnerOverlay';
import NoSenderAlert from './NoSenderAlert';
import styles from './styles.scss';

export interface ComposeTextPanelProps {
  brand?: string;
  className?: string;
  send: (...args: any[]) => any;
  senderNumbers: {
    phoneNumber: string;
  }[];
  sendButtonDisabled: boolean;
  formatPhone: (...args: any[]) => any;
  formatContactPhone: (...args: any[]) => any;
  detectPhoneNumbers: (...args: any[]) => any;
  searchContact: (...args: any[]) => any;
  searchContactList: {
    name: string;
    entityType: string;
    phoneType: string;
    phoneNumber: string;
  }[];
  currentLocale: string;
  updateSenderNumber: (...args: any[]) => any;
  updateTypingToNumber: (...args: any[]) => any;
  cleanTypingToNumber: (...args: any[]) => any;
  addToNumber: (...args: any[]) => any;
  removeToNumber: (...args: any[]) => any;
  updateMessageText: (...args: any[]) => any;
  messageText?: string;
  typingToNumber?: string;
  senderNumber?: string;
  toNumbers: {
    phoneNumber: string;
    name?: string;
  }[];
  outboundSMS?: boolean;
  showSpinner?: boolean;
  phoneTypeRenderer?: (...args: any[]) => any;
  phoneSourceNameRenderer?: (...args: any[]) => any;
  recipientsContactInfoRenderer?: (...args: any[]) => any;
  recipientsContactPhoneRenderer?: (...args: any[]) => any;
  autoFocus?: boolean;
  inputExpandable?: boolean;
  supportAttachment?: boolean;
  attachments?: {
    name: string;
    size: number;
  }[];
  addAttachment?: (...args: any[]) => any;
  removeAttachment?: (...args: any[]) => any;
}
type ComposeTextPanelState = {
  messageText: any;
};
class ComposeTextPanel extends Component<
  ComposeTextPanelProps,
  ComposeTextPanelState
> {
  constructor(props) {
    super(props);
    this.state = {
      messageText: props.messageText,
    };
    this.onSenderChange = (value) => {
      this.props.updateSenderNumber(value);
    };
    this.cleanReceiverValue = () => {
      this.props.cleanTypingToNumber();
    };
    this.addToRecipients = async (receiver, shouldClean = true) => {
      const isAdded = await this.props.addToNumber(receiver);
      if (isAdded && shouldClean) {
        this.props.cleanTypingToNumber();
      }
    };
    this.removeFromRecipients = (phoneNumber) => {
      this.props.removeToNumber({ phoneNumber });
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.messageText !== this.state.messageText) {
      this.setState({
        messageText: nextProps.messageText,
      });
    }
  }
  hasSenderNumbers() {
    return this.props.senderNumbers.length > 0;
  }
  hasPersonalRecipient() {
    return this.props.toNumbers.some((x) => x && x.type !== 'company');
  }
  showAlert() {
    return (
      !this.hasSenderNumbers() &&
      this.props.outboundSMS &&
      this.hasPersonalRecipient()
    );
  }
  render() {
    return (
      <div className={classnames(styles.root, this.props.className)}>
        {this.props.showSpinner ? <SpinnerOverlay /> : null}
        <NoSenderAlert
          currentLocale={this.props.currentLocale}
          showAlert={this.showAlert()}
          brand={this.props.brand}
        />
        <RecipientsInput
          value={this.props.typingToNumber}
          recipientsClassName={styles.recipients}
          onChange={this.props.updateTypingToNumber}
          onClean={this.cleanReceiverValue}
          recipients={this.props.toNumbers}
          addToRecipients={this.addToRecipients}
          removeFromRecipients={this.removeFromRecipients}
          searchContact={this.props.searchContact}
          searchContactList={this.props.searchContactList}
          formatContactPhone={this.props.formatContactPhone}
          detectPhoneNumbers={this.props.detectPhoneNumbers}
          currentLocale={this.props.currentLocale}
          phoneTypeRenderer={this.props.phoneTypeRenderer}
          phoneSourceNameRenderer={this.props.phoneSourceNameRenderer}
          contactInfoRenderer={this.props.recipientsContactInfoRenderer}
          contactPhoneRenderer={this.props.recipientsContactPhoneRenderer}
          titleEnabled
          autoFocus={this.props.autoFocus}
          multiple
        />
        <div className={styles.senderField}>
          <FromField
            currentLocale={this.props.currentLocale}
            fromNumber={this.props.senderNumber}
            fromNumbers={this.props.senderNumbers}
            formatPhone={this.props.formatPhone}
            onChange={this.onSenderChange}
            hidden={!this.hasSenderNumbers()}
            showAnonymous={false}
          />
        </div>
        <MessageInput
          value={this.props.messageText}
          onChange={this.props.updateMessageText}
          sendButtonDisabled={this.props.sendButtonDisabled}
          currentLocale={this.props.currentLocale}
          onSend={this.props.send}
          inputExpandable={this.props.inputExpandable}
          attachments={this.props.attachments}
          supportAttachment={this.props.supportAttachment}
          addAttachment={this.props.addAttachment}
          removeAttachment={this.props.removeAttachment}
        />
      </div>
    );
  }
}
ComposeTextPanel.defaultProps = {
  brand: 'RingCentral',
  className: null,
  messageText: '',
  typingToNumber: '',
  senderNumber: '',
  outboundSMS: false,
  showSpinner: false,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  recipientsContactInfoRenderer: undefined,
  recipientsContactPhoneRenderer: undefined,
  autoFocus: false,
  inputExpandable: undefined,
  supportAttachment: false,
  attachments: undefined,
  addAttachment: undefined,
  removeAttachment: undefined,
};
export default ComposeTextPanel;
