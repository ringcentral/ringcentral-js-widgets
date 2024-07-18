import type { HistoryCall } from '../CallHistory';

/**
 * Identity function for calls.
 */
export function callIdentityFunction<T extends { sessionId: string }>(call: T) {
  return call.sessionId;
}

export function hasRecording(call: HistoryCall) {
  return !!(call.recording && call.recording.id);
}

// W6t1Xt8UVDFNQA&recordingId=1455472006&from=+18085820904&to=+18707762775&date=2021-10-09T14:35:32.748Z
export function getRecordingInfo(call: HistoryCall) {
  return hasRecording(call)
    ? // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      `${call.id}&recordingId=${call.recording.id}&from=${encodeURIComponent(
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        call.from.phoneNumber,
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      )}&to=${encodeURIComponent(call.to.phoneNumber)}&date=${new Date(
        // @ts-expect-error TS(2769): No overload matches this call.
        call.startTime,
      ).toISOString()}`
    : '';
}
