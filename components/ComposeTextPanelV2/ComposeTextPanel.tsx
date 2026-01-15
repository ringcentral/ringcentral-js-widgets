import type { FunctionComponent } from 'react';
import React from 'react';

import { CommunicationSetupPanel } from '../CommunicationSetupPanel';
// TODO: Re implement this component by function component
import NoSenderAlert from '../ComposeTextPanel/NoSenderAlert';
import MessageInput from '../MessageInput';
import { SpinnerOverlay } from '../SpinnerOverlay';

import { Root } from './styles';

export interface ComposeTextPanelProps {
  brand: string;
  send: (...args: any[]) => any;
  senderNumbers: {
    phoneNumber: string;
  }[];
  sendButtonDisabled: boolean;
  triggerEventTracking: (eventName: string, contactType: string) => any;
  formatPhone: (...args: any[]) => any;
  detectPhoneNumbers: (...args: any[]) => any;
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
    type?: string;
  }[];
  outboundSMS?: boolean;
  showSpinner?: boolean;
  autoFocus?: boolean;
  inputExpandable?: boolean;
  supportAttachment?: boolean;
  supportEmoji?: boolean;
  attachments?: {
    name: string;
    size: number;
    file: File;
  }[];
  addAttachments?: (...args: any[]) => any;
  removeAttachment?: (...args: any[]) => any;
  hintInfo?: JSX.Element;
  // TODO: fix type
  contactSearch?: any;
}

export const ComposeTextPanel: FunctionComponent<ComposeTextPanelProps> = ({
  showSpinner,
  currentLocale,
  brand,
  outboundSMS,

  messageText,
  updateMessageText,
  sendButtonDisabled,
  send,
  inputExpandable,
  attachments,
  supportAttachment,
  supportEmoji,
  removeAttachment,
  addAttachments,

  typingToNumber,
  updateTypingToNumber,
  addToNumber,
  autoFocus,
  toNumbers,
  senderNumber,
  senderNumbers,
  hintInfo,
  formatPhone,
  updateSenderNumber,
  cleanTypingToNumber,
  removeToNumber,
  detectPhoneNumbers,
  contactSearch,
  triggerEventTracking,
}) => {
  const hasSenderNumbers = senderNumbers.length > 0;
  const hasPersonalRecipient = toNumbers.some((x) => x && x.type !== 'company');
  // TODO:, double check the logic here.
  const showAlert = !!(
    !hasSenderNumbers &&
    outboundSMS &&
    hasPersonalRecipient
  );

  const addToRecipients = async (receiver: any) => {
    const isAdded = await addToNumber(receiver);
    if (isAdded) {
      cleanTypingToNumber();
    }
  };

  return (
    <Root>
      {showSpinner && <SpinnerOverlay />}
      <CommunicationSetupPanel
        triggerEventTracking={triggerEventTracking}
        // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
        toNumber={typingToNumber}
        onToNumberChange={updateTypingToNumber}
        directlyProceedType="message"
        multiple
        autoFocus={autoFocus}
        recipients={toNumbers}
        setRecipient={addToRecipients}
        clearRecipient={removeToNumber}
        currentLocale={currentLocale}
        detectPhoneNumbers={detectPhoneNumbers}
        // from field
        showAnonymous={false}
        fromNumber={senderNumber}
        fromNumbers={senderNumbers}
        formatPhone={formatPhone}
        changeFromNumber={updateSenderNumber}
        showFromField={hasSenderNumbers}
        inputFullWidth={!!hintInfo}
        ContactSearch={contactSearch}
        filterCallQueueExtension
      >
        <NoSenderAlert
          currentLocale={currentLocale}
          showAlert={showAlert}
          brand={brand}
        />
        {hintInfo}
        <MessageInput
          // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
          value={messageText}
          onChange={updateMessageText}
          sendButtonDisabled={sendButtonDisabled}
          currentLocale={currentLocale}
          onSend={send}
          inputExpandable={inputExpandable}
          attachments={attachments}
          supportAttachment={supportAttachment}
          supportEmoji={supportEmoji}
          addAttachments={addAttachments}
          removeAttachment={removeAttachment}
        />
      </CommunicationSetupPanel>
    </Root>
  );
};
