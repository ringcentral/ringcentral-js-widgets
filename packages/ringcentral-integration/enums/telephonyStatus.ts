export const telephonyStatus = {
  noCall: 'NoCall',
  onHold: 'OnHold',
  ringing: 'Ringing',
  callConnected: 'CallConnected',
  parkedCall: 'ParkedCall',
} as const;

export type TelephonyStatus =
  (typeof telephonyStatus)[keyof typeof telephonyStatus];

export default telephonyStatus;
