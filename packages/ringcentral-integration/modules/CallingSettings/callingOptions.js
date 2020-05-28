import { createEnum } from '../../lib/Enum';

export default createEnum(
  [
    'softphone', // desktop
    'myphone', // ringout branding rc..
    'otherphone', // ringout
    'customphone', // ringout
    'browser', // webphone
  ],
  'callingOptions',
);
