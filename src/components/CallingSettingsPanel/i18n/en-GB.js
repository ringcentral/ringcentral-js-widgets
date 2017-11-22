import callingOptions from 'ringcentral-integration/modules/CallingSettings/callingOptions';

export default {
  title: 'Calling',
  [callingOptions.softphone]: '{brand} for Desktop',
  [callingOptions.myphone]: 'My {brand} Phone',
  [callingOptions.otherphone]: 'Other Phone',
  [callingOptions.customphone]: 'Custom Phone',
  makeCallsWith: 'Make my calls using',
  ringoutHint: 'Ring me at my location first, then connect the called party',
  myLocationLabel: 'My Location',
  press1ToStartCallLabel: 'Prompt me to dial 1 before connecting the call',
  [callingOptions.browser]: 'Browser',
  save: 'Save',
  [`${callingOptions.browser}Tooltip`]: 'Use this option to make and receive calls using your computer\'s microphone and speaker.',
  [`${callingOptions.softphone}Tooltip`]: 'Use this option to make and receive calls using your {brand} for Desktop app.',
  [`${callingOptions.myphone}Tooltip`]: 'Use this option to make calls using your {brand} phone.',
  [`${callingOptions.myphone}Tooltip1`]: 'For the call you make, your {brand} phone will ring first then the party that you called.',
  [`${callingOptions.otherphone}Tooltip`]: 'Use this option to make calls using your other phones such as home or mobile phones that you have added in your {brand} Extension.',
  [`${callingOptions.otherphone}Tooltip1`]: 'For the call you make, this phone will ring first then the party that you called.',
  [`${callingOptions.customphone}Tooltip`]: 'Use this option to make calls using any phone of your choice by entering a valid phone number in the field below.',
  [`${callingOptions.customphone}Tooltip1`]: 'For the call you make, this phone will ring first then the party that you called.',
};
