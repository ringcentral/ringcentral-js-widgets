import { createHashMap } from '../lib/HashMap';

const telephonyStatus = createHashMap({
  noCall: 'NoCall',
  onHold: 'OnHold',
  ringing: 'Ringing',
  callConnected: 'CallConnected',
  parkedCall: 'ParkedCall',
});

export default telephonyStatus;
