import { messageSenderMessages } from '@ringcentral-integration/commons/modules/MessageSender';
import React from 'react';

import FormattedMessage from '../../FormattedMessage';

import i18n from './i18n';
import styles from './styles.scss';

type MessageSenderAlertProps = {
  currentLocale: string;
  brand?: string;
  message: {
    message: string;
  };
  onAreaCodeLink?: (...args: any[]) => any;
};
const MessageSenderAlert: React.FC<MessageSenderAlertProps> = ({
  currentLocale,
  // @ts-expect-error TS(2339): Property 'id' does not exist on type '{ message: s... Remove this comment to see the full error message
  message: { id, message },
  onAreaCodeLink,
  brand,
}) => {
  if (message === messageSenderMessages.noAreaCode) {
    const areaCode = i18n.getString('areaCode', currentLocale);
    const areaCodeLink = onAreaCodeLink ? (
      <a
        className={styles.link}
        onClick={(e) => {
          e.preventDefault();
          onAreaCodeLink({ alertId: id });
        }}
      >
        {areaCode}
      </a>
    ) : (
      areaCode
    );
    return (
      <FormattedMessage
        message={i18n.getString(message, currentLocale)}
        values={{ areaCodeLink }}
      />
    );
  }

  if (
    [
      messageSenderMessages.noInternalSMSPermission,
      messageSenderMessages.noSMSPermission,
    ].indexOf(message) !== -1
  ) {
    return (
      <FormattedMessage
        message={i18n.getString(message, currentLocale)}
        values={{ brand }}
      />
    );
  }
  return <span>{i18n.getString(message, currentLocale)}</span>;
};
MessageSenderAlert.defaultProps = {
  onAreaCodeLink: undefined,
  brand: 'RingCentral',
};
// @ts-expect-error TS(2339): Property 'handleMessage' does not exist on type 'F... Remove this comment to see the full error message
MessageSenderAlert.handleMessage = ({ message }: any) =>
  message === messageSenderMessages.sendSuccess ||
  message === messageSenderMessages.sendError ||
  message === messageSenderMessages.numberValidateError ||
  message === messageSenderMessages.textEmpty ||
  message === messageSenderMessages.noPermission ||
  message === messageSenderMessages.senderEmpty ||
  message === messageSenderMessages.noToNumber ||
  message === messageSenderMessages.recipientsEmpty ||
  message === messageSenderMessages.textTooLong ||
  message === messageSenderMessages.multipartTextTooLong ||
  message === messageSenderMessages.recipientNumberInvalids ||
  message === messageSenderMessages.noAreaCode ||
  message === messageSenderMessages.specialNumber ||
  message === messageSenderMessages.connectFailed ||
  message === messageSenderMessages.internalError ||
  message === messageSenderMessages.notAnExtension ||
  message === messageSenderMessages.networkError ||
  message === messageSenderMessages.notSmsToExtension ||
  message === messageSenderMessages.senderNumberInvalid ||
  message === messageSenderMessages.internationalSMSNotSupported ||
  message === messageSenderMessages.noInternalSMSPermission ||
  message === messageSenderMessages.noSMSPermission ||
  message === messageSenderMessages.attachmentCountLimitation ||
  message === messageSenderMessages.attachmentSizeLimitation ||
  message === messageSenderMessages.noAttachmentToExtension ||
  message === messageSenderMessages.sending ||
  message === messageSenderMessages.shortNumbersNotAvailable;
export default MessageSenderAlert;
