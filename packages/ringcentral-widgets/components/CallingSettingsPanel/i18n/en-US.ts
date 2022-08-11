import { callingOptions } from '@ringcentral-integration/commons/modules/CallingSettings';

export default {
  title: 'Calling',
  [callingOptions.softphone]: '{brand} for Desktop',
  [callingOptions.browser]: 'Browser',
  [callingOptions.jupiter]: '{brand}',
  makeCallsWith: 'Make my calls with',
  ringoutHint: 'Ring me at my location first, then connect the called party',
  myLocationLabel: 'My Location',
  press1ToStartCallLabel: 'Prompt me to dial 1 before connecting the call',
  [`${callingOptions.browser}Tooltip`]:
    'Use this option to make and receive calls using your computer’s microphone and speaker.',
  [`${callingOptions.softphone}Tooltip`]:
    'Use this option to make and receive calls using your {brand}.',
  [`${callingOptions.ringout}Tooltip`]:
    'Use this option to make calls using your selected or entered phone number.',
  [`${callingOptions.ringout}Tooltip1`]:
    'For the call you make, this phone will ring first then the party you called.',
  [`${callingOptions.jupiter}Tooltip`]:
    'Use this option to make and receive calls using your {brand}.',
};
