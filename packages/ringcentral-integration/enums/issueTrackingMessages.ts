import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const issueTrackingMessages = ObjectMap.prefixKeys(
  ['downloadSuccess', 'downloadFail'],
  'issueTracking',
);
