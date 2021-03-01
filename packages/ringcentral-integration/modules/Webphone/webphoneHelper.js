import recordStatus from './recordStatus';
import sessionStatus from './sessionStatus';
import { camelize } from '../../lib/di/utils/utils';
import callDirections from '../../enums/callDirections';

let environment;
if (typeof window !== 'undefined') {
  environment = window;
}
if (typeof global !== 'undefined') {
  environment = global.window || global;
}

export function isChrome() {
  if (!environment.navigator) {
    return false;
  }
  const browserUa = environment.navigator.userAgent.toLowerCase();
  return !!browserUa.match(/chrom(e|ium)/);
}

export function isFirefox() {
  if (!environment.navigator) {
    return false;
  }
  const browserUa = environment.navigator.userAgent.toLowerCase();
  return browserUa.indexOf('firefox') > -1 && !isChrome();
}

export function isEnableMidLinesInSDP() {
  if (!isFirefox()) {
    return false;
  }
  const version = parseInt(
    navigator.userAgent.toLowerCase().match(/firefox\/([0-9]+)/)[1],
    10,
  );
  return version >= 63;
}

export function isWebSocketSupport() {
  return !!(environment && environment.WebSocket);
}

export function isWebRTCSupport() {
  if (!environment.navigator) {
    return false;
  }
  return !!(
    environment.MediaStream &&
    environment.RTCPeerConnection &&
    environment.navigator.mediaDevices.getUserMedia
  );
}

export function isBrowserSupport() {
  return isWebSocketSupport() && isWebRTCSupport();
}

export function extractHeadersData(session, headers) {
  if (
    headers &&
    headers['P-Rc-Api-Ids'] &&
    headers['P-Rc-Api-Ids'][0] &&
    headers['P-Rc-Api-Ids'][0].raw
  ) {
    /**
     * interface PartyData {
     *  "partyId": String,
     *  "sessionId": String
     * }
     *
     * INFO: partyId is ID of the participant in current Session. Mostly it represents User on the call,
     * it could be active participant (talking right now) or already disconnected User,
     * e.g. who made a transfer to another person.
     * To identify the User who owns the party you need to find owner.extensionId within party.
     */
    const data = headers['P-Rc-Api-Ids'][0].raw
      .split(';')
      .map((sub) => sub.split('='))
      .reduce((accum, [key, value]) => {
        accum[camelize(key)] = value;
        return accum;
      }, {});

    if (Object.keys(data).length) {
      session.__rc_partyData = data;
    }
  }

  if (
    headers &&
    headers['Call-ID'] &&
    headers['Call-ID'][0] &&
    headers['Call-ID'][0].raw
  ) {
    session.__rc_callId = headers['Call-ID'][0].raw;
  }
}

export function getCallQueueName({ direction, toUserName, fromUserName }) {
  if (direction === callDirections.outbound) {
    return null;
  }
  let queueName = null;
  if (toUserName && fromUserName === toUserName && toUserName.endsWith(' - ')) {
    queueName = toUserName;
  }
  return queueName;
}

export function normalizeSession(session) {
  return {
    id: session.id,
    callId: session.__rc_callId,
    direction: session.__rc_direction,
    callStatus: session.__rc_callStatus,
    to: session.request.to.uri.user,
    toUserName: session.request.to.displayName,
    from: session.request.from.uri.user,
    fromNumber: session.__rc_fromNumber,
    fromUserName: session.request.from.displayName,
    fromTag: session.fromTag,
    toTag: session.toTag,
    startTime: session.startTime && new Date(session.startTime).getTime(),
    creationTime: session.__rc_creationTime,
    isOnHold: !!session.localHold,
    isOnMute: !!session.__rc_isOnMute,
    isOnFlip: !!session.__rc_isOnFlip,
    isOnTransfer: !!session.__rc_isOnTransfer,
    isToVoicemail: !!session.__rc_isToVoicemail,
    isForwarded: !!session.__rc_isForwarded,
    isReplied: !!session.__rc_isReplied,
    recordStatus: session.__rc_recordStatus || recordStatus.idle,
    contactMatch: session.__rc_contactMatch,
    minimized: !!session.__rc_minimized,
    partyData: session.__rc_partyData || null,
    lastActiveTime: session.__rc_lastActiveTime,
    cached: false,
    removed: false,
    callQueueName: getCallQueueName({
      direction: session.__rc_direction,
      toUserName: session.request.to.displayName,
      fromUserName: session.request.from.displayName,
    }),
    warmTransferSessionId: session.__rc_transferSessionId,
  };
}

export function isRing(session) {
  return !!(
    session &&
    session.direction === callDirections.inbound &&
    session.callStatus === sessionStatus.connecting
  );
}

export function isOnHold(session) {
  return !!(session && session.isOnHold);
}

export function sortByCreationTimeDesc(l, r) {
  return r.startTime - l.startTime;
}

export function sortByLastActiveTimeDesc(l, r) {
  if (!l || !r) {
    return 0;
  }
  if (r.lastActiveTime !== l.lastActiveTime) {
    return r.lastActiveTime - l.lastActiveTime;
  }
  return sortByCreationTimeDesc(l, r);
}

/**
 * HACK: this function is not very reliable, only use it before the merging complete.
 */
export function isConferenceSession(session) {
  return session && session.to && session.to.indexOf('conf_') === 0;
}

export function isRecording(session) {
  return !!(
    session &&
    (session.recordStatus === recordStatus.pending ||
      session.recordStatus === recordStatus.recording)
  );
}
