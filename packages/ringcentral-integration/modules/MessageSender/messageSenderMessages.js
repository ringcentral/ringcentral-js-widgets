import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const messageSenderMessages = ObjectMap.prefixKeys(
  [
    'sendSuccess',
    'sendError',
    'numberValidateError',
    'textEmpty',
    'textTooLong',
    'multipartTextTooLong',
    'noPermission',
    'senderEmpty',
    'noToNumber',
    'recipientsEmpty',
    'recipientNumberInvalids',
    'senderNumberInvalid',
    'noAreaCode',
    'specialNumber',
    'internalError',
    'notAnExtension',
    'networkError',
    'notSmsToExtension',
    'internationalSMSNotSupported',
    'noInternalSMSPermission',
    'noSMSPermission',
    'sending',
  ],
  'message-sender-msg',
);

export default messageSenderMessages;
