import recordStatus from 'ringcentral-integration/modules/Webphone/recordStatus';
import callResults from '../../enums/callResults';
import callDirections from '../../enums/callDirections';
import activeCallControlStatus from '../../enums/activeCallControlStatus';


export function isHangUp(code) {
  return (code === callResults.disconnected);
}
export function isReject({ direction, code }) {
  return (direction === callDirections.inbound) &&
    (code === activeCallControlStatus.setUp || code === activeCallControlStatus.proceeding);
}
export function normalizeSession({
  call,
  activeSessionStatus = {}
}) {
  const {
    telephonySessionId,
    partyId,
    direction,
    from,
    to,
    result,
    telephonyStatus,
    startTime,
    sessionId,
  } = call;
  const {
    isOnMute,
    isOnHold,
    isReject,
    isOnRecording,
  } = activeSessionStatus;
  return {
    telephonySessionId,
    partyId,
    direction,
    from: from && from.phoneNumber,
    fromNumber: from && from.phoneNumber,
    fromUserName: from && from.name,
    to: to && to.phoneNumber,
    toNumber: to && to.phoneNumber,
    toUserName: to && to.name,
    id: sessionId,
    callStatus: telephonyStatus || result,
    startTime,
    creationTime: startTime,
    isOnMute,
    isForwarded: false,
    isOnFlip: false,
    isOnHold,
    isOnTransfer: false,
    isReplied: false,
    isToVoicemail: false,
    lastHoldingTime: 0,
    minimized: false,
    recordStatus: isOnRecording ? recordStatus.recording : recordStatus.idle,
    removed: false,
    isReject,
  };
}
export function requestURI(activeSession) {
  const {
    telephonySessionId,
    partyId,
    recordingId
  } = activeSession;
  const prefix = `/account/~/telephony/sessions/${telephonySessionId}`;
  return {
    hangUp: `${prefix}`,
    reject: `${prefix}/parties/${partyId}/reject`,
    hold: `${prefix}/parties/${partyId}/hold`,
    unHold: `${prefix}/parties/${partyId}/unhold`,
    transfer: `${prefix}/parties/${partyId}/transfer`,
    flip: `${prefix}/parties/${partyId}/flip`,
    getPartyData: `${prefix}/parties/${partyId}`,
    mute: `${prefix}/parties/${partyId}`,
    record: `${prefix}/parties/${partyId}/recordings`,
    stopRecord: `${prefix}/parties/${partyId}/recordings/${recordingId}`
  };
}
export function confictError(error) {
  const conflictErrRgx = /409/g;
  const conflictMsgRgx = /Incorrect State/g;
  return conflictErrRgx.test(error.message) &&
    conflictMsgRgx.test(error.message);
}
