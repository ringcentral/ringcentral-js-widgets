import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export default ObjectMap.prefixKeys(
  [
    'softphone', // RingCentral phone
    'ringout', // ringout
    'browser', // webphone
    'jupiter', // RingCentral(jupiter)
  ],
  'callingOptions',
);
