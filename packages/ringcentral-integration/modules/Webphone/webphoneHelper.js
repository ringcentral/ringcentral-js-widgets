import recordStatus from './recordStatus';
import sessionStatus from './sessionStatus';
import { camelize } from '../../lib/di/utils/utils';
import callDirections from '../../enums/callDirections';

export function isBrowserSupport() {
  const isChrome = !!(navigator.userAgent.match(/Chrom(e|ium)/));
  if (!isChrome) {
    return false;
  }
  const chromeVersion =
    parseInt(navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)[2], 10);
  if (chromeVersion >= 51) {
    return true;
  }
  return false;
}

export function extractHeadersData(session, headers) {
  if (
    headers
    && headers['P-Rc-Api-Ids']
    && headers['P-Rc-Api-Ids'][0]
    && headers['P-Rc-Api-Ids'][0].raw
  ) {
    /**
     * interface SessionData{
     *  "partyId": String,
     *  "sessionId": String
     * }
     */
    const data = headers['P-Rc-Api-Ids'][0].raw
      .split(';')
      .map(sub => sub.split('='))
      .reduce((accum, [key, value]) => {
        accum[camelize(key)] = value;
        return accum;
      }, {});

    if (Object.keys(data).length) {
      session.partyData = data;
    }
  }

  if (
    headers
    && headers['Call-ID']
    && headers['Call-ID'][0]
    && headers['Call-ID'][0].raw
  ) {
    session._header_callId = headers['Call-ID'][0].raw;
  }
}

export function normalizeSession(session) {
  return {
    id: session.id,
    callId: session._header_callId,
    direction: session.direction,
    callStatus: session.callStatus,
    to: session.request.to.uri.user,
    toUserName: session.request.to.displayName,
    from: session.request.from.uri.user,
    fromNumber: session.fromNumber,
    fromUserName: session.request.from.displayName,
    startTime: session.startTime && (new Date(session.startTime)).getTime(),
    creationTime: session.creationTime,
    isOnHold: !!session.isOnHold().local,
    isOnMute: !!session.isOnMute,
    isOnFlip: !!session.isOnFlip,
    isOnTransfer: !!session.isOnTransfer,
    isToVoicemail: !!session.isToVoicemail,
    isForwarded: !!session.isForwarded,
    isReplied: !!session.isForwarded,
    recordStatus: session.recordStatus || recordStatus.idle,
    contactMatch: session.contactMatch,
    minimized: !!session.minimized,
    partyData: session.partyData || null,
    lastActiveTime: session.lastActiveTime || +new Date(),
    cached: false,
    removed: false,
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
  return !!(session && session.callStatus === sessionStatus.onHold);
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
  return session && session.to &&
    session.to.indexOf('conf_') === 0;
}

export function isRecording(session) {
  return !!(
    session && session.recordStatus && session.recordStatus !== recordStatus.idle
  );
}
