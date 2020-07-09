import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const telephonyStatus = ObjectMap.fromObject({
  noCall: 'NoCall',
  onHold: 'OnHold',
  ringing: 'Ringing',
  callConnected: 'CallConnected',
  parkedCall: 'ParkedCall',
} as const);

export default telephonyStatus;
