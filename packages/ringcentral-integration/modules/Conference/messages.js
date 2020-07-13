import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const messages = ObjectMap.prefixKeys(
  ['requireAdditionalNumbers', 'scheduledSuccess'],
  'conference-msg',
);

export default messages;
