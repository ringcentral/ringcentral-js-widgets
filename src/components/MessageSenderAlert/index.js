import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import messageSenderMessages from 'ringcentral-integration/modules/MessageSender/messageSenderMessages';
import FormattedMessage from '../FormattedMessage';
import i18n from './i18n';

export default function MessageSenderAlert(props) {
  const message = props.message.message;
  if (message === messageSenderMessages.noAreaCode) {
    const areaCode = i18n.getString('areaCode', props.currentLocale);
    return (
      <FormattedMessage
        message={i18n.getString(message, props.currentLocale)}
        values={{ areaCodeLink: <Link to={props.regionSettingsUrl}>{areaCode}</Link> }} />
    );
  }
  return (
    <span>{i18n.getString(message, props.currentLocale)}</span>
  );
}

MessageSenderAlert.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  message: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }).isRequired,
  regionSettingsUrl: PropTypes.string.isRequired,
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
  (message === messageSenderMessages.senderNumberInvalid) ||
  (message === messageSenderMessages.internationalSMSNotSupported)
);

