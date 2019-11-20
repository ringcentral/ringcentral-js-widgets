import recordStatus from '../../modules/Webphone/recordStatus';
import callResults from '../../enums/callResults';
import callDirections from '../../enums/callDirections';
import activeCallControlStatus from '../../enums/activeCallControlStatus';

export function isHangUp(code) {
  return code === callResults.disconnected;
}
export function isRejectCode({ direction, code }) {
  return (
    direction === callDirections.inbound &&
    (code === activeCallControlStatus.setUp ||
      code === activeCallControlStatus.proceeding)
  );
}
export function isOnRecording(recordings) {
  if (!recordings || recordings.length === 0) {
    return false;
  }
  const recording = recordings[0];
  return recording.active;
}

export function getSessionsParty(session) {
  const extensionId = session.extensionId;
  return session.parties.find(p => {
    return p.extensionId === extensionId;
  });
}

export function normalizeSession({ session, call }) {
  const party = getSessionsParty(session);
  const { id: partyId, direction, from, to, status, recordings, muted } = party;

  const { startTime, sessionId } = call;

  const formatValue = {
    telephonySessionId: session.id,
    partyId,
    direction,
    from: from && from.phoneNumber,
    fromNumber: from && from.phoneNumber,
    fromUserName: from && from.name,
    to: to && to.phoneNumber,
    toNumber: to && to.phoneNumber,
    toUserName: to && to.name,
    id: session.id,
    sessionId,
    callStatus: call.telephonyStatus,
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
  return {
    ...formatValue,
  };
}

export function confictError(error) {
  const conflictErrRgx = /409/g;
  const conflictMsgRgx = /Incorrect State/g;
  return (
    conflictErrRgx.test(error.message) &&
    conflictMsgRgx.test(error.apiResponse._text)
  );
}
