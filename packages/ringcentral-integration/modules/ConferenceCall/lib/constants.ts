import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const DEFAULT_TIMEOUT = 30000; // time out for conferencing session being accepted.
export const DEFAULT_TTL = 5000; // timer to update the conference information
export const MAXIMUM_CAPACITY = 10;
export const conferenceRole = ObjectMap.fromKeys(['host', 'participant']);
export const enum conferenceCallStatus {
  idle = 'idle',
  requesting = 'requesting',
}
export const partyStatusCode = ObjectMap.fromKeys(
  [
    'Setup',
    'Proceeding',
    'Answered',
    'Disconnected',
    'Gone',
    'Parked',
    'Hold',
    'VoiceMail',
    'FaxReceive',
    'VoiceMailScreening',
  ].map((i) => i.toLowerCase()),
);

export const mergeEvents = ObjectMap.fromKeys(['mergeSucceeded']);
