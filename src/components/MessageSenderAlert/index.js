import React from 'react';
import PropTypes from 'prop-types';
import messageSenderMessages from 'ringcentral-integration/modules/MessageSender/messageSenderMessages';
import FormattedMessage from '../FormattedMessage';
import styles from './styles.scss';
import i18n from './i18n';

export default function MessageSenderAlert({
  currentLocale,
  message: {
    id,
    message,
  },
  onAreaCodeLink,
  brand
}) {
  if (message === messageSenderMessages.noAreaCode) {
    const areaCode = i18n.getString('areaCode', currentLocale);
    const areaCodeLink = onAreaCodeLink ?
      (
        <a
          className={styles.link}
          onClick={(e) => {
            e.preventDefault();
            onAreaCodeLink({ alertId: id });
          }}>
          {areaCode}
        </a>
      ) :
      areaCode;
    return (
      <FormattedMessage
        message={i18n.getString(message, currentLocale)}
        values={{ areaCodeLink }} />
    );
  } else if ([messageSenderMessages.noInternalSMSPermission].indexOf(message) !== -1) {
    return (
      <FormattedMessage
        message={i18n.getString(message, currentLocale)}
        values={{ brand }} />
    );
  }
  return (
    <span>{i18n.getString(message, currentLocale)}</span>
  );
}

MessageSenderAlert.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  brand: PropTypes.string,
  message: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }).isRequired,
  onAreaCodeLink: PropTypes.func,
};
MessageSenderAlert.defaultProps = {
  onAreaCodeLink: undefined,
  brand: 'RingCentral'
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
  (message === messageSenderMessages.internationalSMSNotSupported) ||
  (message === messageSenderMessages.noInternalSMSPermission)
);
