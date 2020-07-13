import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export default ObjectMap.prefixKeys(
  [
    'softphone', // RingCentral phone
    'myphone', // ringout branding rc..
    'otherphone', // ringout
    'customphone', // ringout
    'browser', // webphone
    'jupiter', // RingCentral(jupiter)
  ],
  'callingOptions',
);
