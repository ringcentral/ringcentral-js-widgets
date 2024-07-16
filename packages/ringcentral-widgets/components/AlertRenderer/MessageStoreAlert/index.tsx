import { messageStoreErrors } from '@ringcentral-integration/commons/modules/MessageStore';
import React from 'react';

import FormattedMessage from '../../FormattedMessage';

import i18n from './i18n';

type MessageStoreAlertProps = {
  currentLocale: string;
  message: {
    message: string;
  };
};
const MessageStoreAlert: React.FC<MessageStoreAlertProps> = (props) => {
  const { message } = props.message;
  let view = <span>{i18n.getString(message, props.currentLocale)}</span>;
  // Handle call record error
  if (message === messageStoreErrors.deleteFailed) {
    view = (
      <FormattedMessage
        message={i18n.getString(message, props.currentLocale)}
      />
    );
  }
  return view;
};
// @ts-expect-error TS(2339): Property 'handleMessage' does not exist on type 'S... Remove this comment to see the full error message
MessageStoreAlert.handleMessage = ({ message }: any) =>
  message === messageStoreErrors.deleteFailed;
export default MessageStoreAlert;
