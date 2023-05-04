import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const connectivityTypes = ObjectMap.prefixKeys(
  [
    'networkLoss',
    'offline',
    'serverUnavailable',
    'voipOnly',
    'survival',
    'webphoneUnavailable',
    'connecting',
  ],
  'connectivityTypes',
);
