import React from 'react';

import messageStoreErrors from '@ringcentral-integration/commons/modules/MessageStore/errors';

import FormattedMessage from '../../FormattedMessage';
import i18n from './i18n';

type MessageStoreAlertProps = {
  currentLocale: string;
  message: {
    message: string;
  };
};
const MessageStoreAlert: React.SFC<MessageStoreAlertProps> = (props) => {
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
MessageStoreAlert.handleMessage = ({ message }) =>
  message === messageStoreErrors.deleteFailed;
export default MessageStoreAlert;
