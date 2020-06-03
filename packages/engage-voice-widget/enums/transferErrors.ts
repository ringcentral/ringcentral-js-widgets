import { createEnum } from 'ringcentral-integration/lib/Enum';

export const transferErrors = createEnum([
  'TYPE_ERROR',
  'AGENT_ID_ERROR',
  'CONTACT_ID_ERROR',
  'RECIPIENT_NUMBER_ERROR',
  'TRANSFER_ERROR',
  'SEND_VOICEMAIL_ERROR',
]);
