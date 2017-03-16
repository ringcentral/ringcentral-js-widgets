import React, { PropTypes } from 'react';
import messageSenderMessages from 'ringcentral-integration/modules/MessageSender/messageSenderMessages';
import i18n from './i18n';

function MessageSenderAlert(props) {
  const msg = i18n.getString(props.message.message, props.currentLocale);
  return (
    <span>{msg}</span>
  );
}

MessageSenderAlert.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  message: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }).isRequired,
};

MessageSenderAlert.handleMessage = ({ message }) => (
  (message === messageSenderMessages.sendSuccess) ||
  (message === messageSenderMessages.sendError) ||
  (message === messageSenderMessages.numberValidateError) ||
  (message === messageSenderMessages.textEmpty) ||
  (message === messageSenderMessages.noPermission) ||
  (message === messageSenderMessages.senderEmpty) ||
  (message === messageSenderMessages.noToNumber) ||
  (message === messageSenderMessages.recipientsEmpty) ||
  (message === messageSenderMessages.textTooLong) ||
  (message === messageSenderMessages.recipientNumberInvalids) ||
  (message === messageSenderMessages.noAreaCode) ||
  (message === messageSenderMessages.specialNumber) ||
  (message === messageSenderMessages.connectFailed) ||
  (message === messageSenderMessages.internalError) ||
  (message === messageSenderMessages.notAnExtension) ||
  (message === messageSenderMessages.networkError) ||
  (message === messageSenderMessages.notSmsToExtension) ||
  (message === messageSenderMessages.internationalSMSNotSupported)
);

export default MessageSenderAlert;
