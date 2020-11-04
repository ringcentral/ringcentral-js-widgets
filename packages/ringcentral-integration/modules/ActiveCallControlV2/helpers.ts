import { Session } from 'ringcentral-call/lib/Session';
import { CallRecording, Error } from '@rc-ex/core/definitions';
import {
  SessionData,
  Party,
  PartyStatusCode,
} from 'ringcentral-call-control/lib/Session';
// eslint-disable-next-line import/no-named-as-default
import recordStatus from '../Webphone/recordStatus';
// eslint-disable-next-line import/no-named-as-default
import callResults from '../../enums/callResults';
import callDirections from '../../enums/callDirections';
// eslint-disable-next-line import/no-named-as-default
import activeCallControlStatus from '../../enums/activeCallControlStatus';

export function isHangUp(code: string) {
  return code === callResults.disconnected;
}

export function isRejectCode({
  direction,
  code,
}: {
  direction: string;
  code: string;
}) {
  return (
    direction === callDirections.inbound &&
    (code === activeCallControlStatus.setUp ||
      code === activeCallControlStatus.proceeding)
  );
}

export function isOnRecording(recordings: Array<CallRecording>) {
  if (!recordings || recordings.length === 0) {
    return false;
  }
  const recording = recordings[0];
  return recording.active;
}

export function getSessionsParty(session: SessionData) {
  const extensionId = session.extensionId;
  return session.parties.find((p: Party) => {
    return p.extensionId === extensionId;
  });
}

// TODO: add call type in callMonitor module
export function normalizeSession({
  session,
  call,
}: {
  session: SessionData;
  call: any;
}) {
  const party: Party = getSessionsParty(session);
  const { id: partyId, direction, from, to, status, recordings, muted } = party;

  const { startTime, sessionId } = call;
  const formatValue = {
    telephonySessionId: session.id,
    partyId,
    direction,
    from: from?.phoneNumber,
    fromNumber: from?.phoneNumber,
    fromUserName: from?.name,
    to: to?.phoneNumber,
    toNumber: to?.phoneNumber,
    toUserName: to?.name,
    id: session.id,
    sessionId,
    callStatus: call?.telephonyStatus,
    startTime,
    creationTime: startTime,
    isOnMute: muted,
    isForwarded: false,
    isOnFlip: false,
    isOnHold: status.code === activeCallControlStatus.hold,
    isOnTransfer: false,
    isReplied: false,
    isToVoicemail: false,
    lastHoldingTime: 0,
    minimized: false,
    recordStatus: isOnRecording(recordings)
      ? recordStatus.recording
      : recordStatus.idle,
    removed: false,
    isReject: isRejectCode({ direction, code: status.code }),
  };
  return formatValue;
}

export async function conflictError(error: Error): Promise<boolean> {
  const conflictErrRgx = /409/g;
  const conflictMsgRgx = /Incorrect State/g;
  return !!(
    conflictErrRgx.test(error.message) && conflictMsgRgx.test(error.errorCode)
  );
}

export function isRinging(telephonySession: any) {
  return (
    telephonySession &&
    (telephonySession.status === PartyStatusCode.proceeding ||
      telephonySession.status === PartyStatusCode.setup) &&
    telephonySession.direction === callDirections.inbound
  );
}

export function isHolding(telephonySession: any) {
  return telephonySession.status === PartyStatusCode.hold;
}

export function isRecording(telephonySession: any) {
  const party: Party = getSessionsParty(telephonySession);
  return isOnRecording(party.recordings);
}

export function isForwardedToVoiceMail(session: any) {
  // TODO: fix this for call control js
  // return session.status === PartyStatusCode.voicemail;
  return session.status === 'Voicemail';
}

export function isOnSetupStage(session: any) {
  return session.status === PartyStatusCode.setup;
}
