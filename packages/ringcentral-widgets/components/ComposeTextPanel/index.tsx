import type { ToNumber } from '@ringcentral-integration/commons/modules/ComposeText';
import clsx from 'clsx';
import React, { Component } from 'react';

import FromField from '../FromField';
import MessageInput from '../MessageInput';
import RecipientsInput from '../RecipientsInput';
import { RecipientsInputV2 } from '../RecipientsInputV2';
import { SpinnerOverlay } from '../SpinnerOverlay';

import NoSenderAlert from './NoSenderAlert';
import styles from './styles.scss';

export interface ComposeTextPanelProps {
  triggerEventTracking: (eventName: string, contactType: string) => any;
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
  messageText: string;
  typingToNumber: string;
  senderNumber: string;
  toNumbers: ToNumber[];
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
  useRecipientsInputV2?: boolean;
}
type ComposeTextPanelState = {
  messageText: any;
};
class ComposeTextPanel extends Component<
  ComposeTextPanelProps,
  ComposeTextPanelState
> {
  addToRecipients: (item: ToNumber) => void;
  removeFromRecipients: (phoneNumber: string) => void;
  cleanReceiverValue: () => void;
  onSenderChange: any;
  static defaultProps: {
    brand: 'RingCentral';
    className: null;
    messageText: '';
    typingToNumber: '';
    senderNumber: '';
    outboundSMS: false;
    showSpinner: false;
    autoFocus: false;
    supportAttachment: false;
  };
  constructor(props: ComposeTextPanelProps | Readonly<ComposeTextPanelProps>) {
    super(props);
    this.state = {
      messageText: props.messageText,
    };
    const {
      updateSenderNumber,
      cleanTypingToNumber,
      addToNumber,
      removeToNumber,
    } = this.props;
    this.onSenderChange = (value: any) => {
      updateSenderNumber(value);
    };
    this.cleanReceiverValue = () => {
      cleanTypingToNumber();
    };
    this.addToRecipients = async (receiver, shouldClean = true) => {
      const isAdded = await addToNumber(receiver);
      if (isAdded && shouldClean) {
        cleanTypingToNumber();
      }
    };
    this.removeFromRecipients = (phoneNumber) => {
      removeToNumber({ phoneNumber });
    };
  }

  override UNSAFE_componentWillReceiveProps(nextProps: { messageText: any }) {
    const { messageText } = this.state;
    if (nextProps.messageText !== messageText) {
      this.setState({
        messageText: nextProps.messageText,
      });
    }
  }
  hasSenderNumbers() {
    const { senderNumbers } = this.props;
    return senderNumbers.length > 0;
  }
  hasPersonalRecipient() {
    const { toNumbers } = this.props;
    return toNumbers.some((x) => x && x.type !== 'company');
  }

  showAlert() {
    const { outboundSMS } = this.props;
    return !!(
      !this.hasSenderNumbers() &&
      outboundSMS &&
      this.hasPersonalRecipient()
    );
  }

  onInputChange = (searchString: string) => {
    const { updateTypingToNumber, searchContact } = this.props;
    updateTypingToNumber(searchString);
    searchContact(searchString);
  };

  override render() {
    const {
      send,
      brand,
      autoFocus,
      className,
      toNumbers,
      attachments,
      formatPhone,
      messageText,
      showSpinner,
      senderNumber,
      addAttachment,
      currentLocale,
      searchContact,
      senderNumbers,
      typingToNumber,
      inputExpandable,
      removeAttachment,
      phoneTypeRenderer,
      searchContactList,
      supportAttachment,
      updateMessageText,
      detectPhoneNumbers,
      formatContactPhone,
      sendButtonDisabled,
      updateTypingToNumber,
      // TODO: temporary solution, wait for new component ready
      useRecipientsInputV2,
      phoneSourceNameRenderer,
      recipientsContactInfoRenderer,
      recipientsContactPhoneRenderer,
    } = this.props;
    const filteredSearchContactList =
      useRecipientsInputV2 && typingToNumber.length >= 3
        ? searchContactList
        : [];
    return (
      <div className={clsx(styles.root, className)}>
        {showSpinner ? <SpinnerOverlay /> : null}
        <NoSenderAlert
          currentLocale={currentLocale}
          showAlert={this.showAlert()}
          brand={brand}
        />
        {useRecipientsInputV2 ? (
          <RecipientsInputV2
            value={typingToNumber}
            recipientsClassName={styles.recipients}
            onInputChange={this.onInputChange}
            onInputClear={this.cleanReceiverValue}
            recipients={toNumbers}
            addToRecipients={this.addToRecipients}
            removeFromRecipients={this.removeFromRecipients}
            searchContactList={filteredSearchContactList}
            formatContactPhone={formatContactPhone}
            currentLocale={currentLocale}
            phoneTypeRenderer={phoneTypeRenderer}
            phoneSourceNameRenderer={phoneSourceNameRenderer}
            contactInfoRenderer={recipientsContactInfoRenderer}
            contactPhoneRenderer={recipientsContactPhoneRenderer}
            enableTitle
            multiple
          />
        ) : (
          <RecipientsInput
            value={typingToNumber}
            recipientsClassName={styles.recipients}
            onChange={updateTypingToNumber}
            onClean={this.cleanReceiverValue}
            recipients={toNumbers}
            addToRecipients={this.addToRecipients}
            removeFromRecipients={this.removeFromRecipients}
            searchContact={searchContact}
            searchContactList={searchContactList}
            formatContactPhone={formatContactPhone}
            detectPhoneNumbers={detectPhoneNumbers}
            currentLocale={currentLocale}
            phoneTypeRenderer={phoneTypeRenderer}
            phoneSourceNameRenderer={phoneSourceNameRenderer}
            contactInfoRenderer={recipientsContactInfoRenderer}
            contactPhoneRenderer={recipientsContactPhoneRenderer}
            titleEnabled
            autoFocus={autoFocus}
            multiple
          />
        )}
        <div className={styles.senderField}>
          <FromField
            currentLocale={currentLocale}
            fromNumber={senderNumber}
            fromNumbers={senderNumbers}
            formatPhone={formatPhone}
            onChange={this.onSenderChange}
            hidden={!this.hasSenderNumbers()}
            showAnonymous={false}
          />
        </div>
        <MessageInput
          value={messageText}
          onChange={updateMessageText}
          sendButtonDisabled={sendButtonDisabled}
          currentLocale={currentLocale}
          onSend={send}
          inputExpandable={inputExpandable}
          attachments={attachments}
          supportAttachment={supportAttachment}
          addAttachment={addAttachment}
          removeAttachment={removeAttachment}
        />
      </div>
    );
  }
}

export default ComposeTextPanel;
