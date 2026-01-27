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

const trackCallingSetup = {
  [callingModes.softphone]: 'Spartan',
  [callingModes.ringout]: 'RingOut',
  [callingModes.webphone]: 'Browser',
  [callingModes.jupiter]: 'Jupiter',
  [callingModes.jupiterUniversalLink]: 'Jupiter',
} as const;

export const getTrackCallingSetup = (callingMode: string | null) =>
  callingMode ? trackCallingSetup[callingMode] : 'Browser';
