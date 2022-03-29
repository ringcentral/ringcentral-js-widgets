import React, { FunctionComponent } from 'react';
import { styled, palette2 } from '@ringcentral/juno';
import MessageInput from '../MessageInput';
import { SpinnerOverlay } from '../SpinnerOverlay';
// todo: Re implement this component by function component
import NoSenderAlert from '../ComposeTextPanel/NoSenderAlert';
import { fullSizeStyle } from '../../lib/commonStyles';
import { CommunicationSetupPanel } from '../CommunicationSetupPanel';

const Root = styled.div`
  ${fullSizeStyle};
  box-sizing: border-box;
  background: ${palette2('neutral', 'b01')};
`;

export interface ComposeTextPanelProps {
  brand: string;
  send: (...args: any[]) => any;
  senderNumbers: {
    phoneNumber: string;
  }[];
  sendButtonDisabled: boolean;
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
  attachments?: {
    name: string;
    size: number;
  }[];
  addAttachment?: (...args: any[]) => any;
  removeAttachment?: (...args: any[]) => any;
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
  removeAttachment,
  addAttachment,

  typingToNumber,
  updateTypingToNumber,
  addToNumber,
  autoFocus,
  toNumbers,
  senderNumber,
  senderNumbers,
  formatPhone,
  updateSenderNumber,
  cleanTypingToNumber,
  removeToNumber,
  detectPhoneNumbers,
}) => {
  const hasSenderNumbers = senderNumbers.length > 0;
  const hasPersonalRecipient = toNumbers.some((x) => x && x.type !== 'company');
  // todo, double check the logic here.
  const showAlert = !hasSenderNumbers && outboundSMS && hasPersonalRecipient;

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
        toNumber={typingToNumber}
        onToNumberChange={updateTypingToNumber}
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
      >
        <NoSenderAlert
          currentLocale={currentLocale}
          showAlert={showAlert}
          brand={brand}
        />
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
      </CommunicationSetupPanel>
    </Root>
  );
};
