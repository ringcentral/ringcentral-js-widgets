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
    startTime,
    sessionId,
  } = call;
  const {
    muted,
    code,
    isReject,
    isRecorded,
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
    callStatus: result,
    startTime,
    creationTime: startTime,
    isOnMute: muted,
    isForwarded: false,
    isOnFlip: false,
    isOnHold: code === activeCallControlStatus.hold,
    isOnTransfer: false,
    isReplied: false,
    isToVoicemail: false,
    lastHoldingTime: 0,
    minimized: false,
    recordStatus: isRecorded ? recordStatus.recording : recordStatus.idle,
    removed: false,
    isReject,
  };
}
