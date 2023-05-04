import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const ringoutErrors = ObjectMap.prefixKeys(
  ['pollingFailed', 'pollingCancelled', 'firstLegConnectFailed'],
  'ringoutErrors',
);
