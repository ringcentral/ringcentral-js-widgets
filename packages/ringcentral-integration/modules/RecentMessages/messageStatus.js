import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const messageStatus = ObjectMap.prefixKeys(
  ['loading', 'loaded'],
  'recentMessageStatus',
);

export default messageStatus;
