import { createEnum } from '../../lib/Enum';

export default createEnum(
  [
    'softphone', // desktop
    'ringout', // branding rc..
    'webphone', // webrtc
  ],
  'callingModes',
);
