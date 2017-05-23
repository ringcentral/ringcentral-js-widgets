import callingOptions from 'ringcentral-integration/modules/CallingSettings/callingOptions';

export default {
  title: 'Calling',
  [callingOptions.softphone]: '{brand} for Desktop',
  [callingOptions.myphone]: 'My {brand} Phone',
  [callingOptions.otherphone]: 'Other Phone',
  [callingOptions.customphone]: 'Custom Phone',
  [callingOptions.browser]: 'Browser',
  makeCallsWith: 'Make my calls with',
  ringoutHint: 'Ring me at my location first, then connect the called party',
  myLocationLabel: 'My Location',
  press1ToStartCallLabel: 'Prompt me to dial 1 before connecting the call',
};
