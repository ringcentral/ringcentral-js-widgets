import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const callingModes = ObjectMap.prefixKeys(
  [
    'softphone', // ringcentral phone
    'ringout', // branding rc..
    'webphone', // webrtc
    'jupiter', // ringcentral (jupiter app)
    'jupiterUniversalLink', // ringcentral (jupiter web)
  ],
  'callingModes',
);
