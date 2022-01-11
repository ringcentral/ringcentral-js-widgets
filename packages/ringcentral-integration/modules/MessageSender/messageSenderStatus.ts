import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const messageSenderStatus = ObjectMap.prefixKeys(
  ['idle', 'sending', 'validating'],
  'messageSender',
);

export default messageSenderStatus;
