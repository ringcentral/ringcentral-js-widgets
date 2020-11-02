import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const webSocketReadyState = ObjectMap.prefixKeys(
  ['connecting', 'open', 'closing', 'closed'],
  'webSocketReadyState',
);
