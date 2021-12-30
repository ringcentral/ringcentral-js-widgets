import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export default ObjectMap.prefixKeys(
  [
    'softphone', // ringcentral phone
    'ringout', // branding rc..
    'webphone', // webrtc
    'jupiter', // ringcentral(jupiter)
  ],
  'callingModes',
);
