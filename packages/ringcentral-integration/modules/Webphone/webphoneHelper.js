import recordStatus from './recordStatus';
import sessionStatus from './sessionStatus';
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

export function normalizeSession(session) {
  return {
    id: session.id,
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
    data: session.data || null,
    lastHoldingTime: session.lastHoldingTime || 0,
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

export function sortByLastHoldingTimeDesc(l, r) {
  if (!l || !r) {
    return 0;
  }
  if (r.lastHoldingTime !== l.lastHoldingTime) {
    return r.lastHoldingTime - l.lastHoldingTime;
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
