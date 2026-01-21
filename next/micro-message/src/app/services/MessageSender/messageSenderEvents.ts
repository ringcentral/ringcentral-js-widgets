import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const messageSenderEvents = ObjectMap.prefixKeys(
  [
    'send',
    'sendOver',
    'sendError',
    'validate',
    'validateOver',
    'validateError',
  ],
  'messageSender',
);

export default messageSenderEvents;
