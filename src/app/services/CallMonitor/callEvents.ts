export const callEvents = {
  newCall: 'NewCall',
  callRinging: 'CallRinging',
  callEnded: 'CallEnded',
  callUpdated: 'CallUpdated',
} as const;

export type CallEvent = (typeof callEvents)[keyof typeof callEvents];
