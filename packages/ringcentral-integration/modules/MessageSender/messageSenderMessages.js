import Enum from '../../lib/Enum';

export default new Enum([
  'sendSuccess',
  'sendError',
  'numberValidateError',
  'textEmpty',
  'textTooLong',
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
  'noSMSPermission'
], 'message-sender-msg');
