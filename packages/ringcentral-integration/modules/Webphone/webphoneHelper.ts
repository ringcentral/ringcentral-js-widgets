import callDirections from '../../enums/callDirections';
import type {
  NormalizedSession,
  PartyData,
  WebphoneSession,
} from '../../interfaces/Webphone.interface';
import { camelize } from '../../lib/di/utils/utils';

import type { WebphoneSessionRequestHeaders } from './Webphone.interface';
import { recordStatus } from './recordStatus';
import { sessionStatus } from './sessionStatus';

let environment: Window & typeof globalThis;
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
    navigator.userAgent.toLowerCase().match(/firefox\/([0-9]+)/)?.[1]!,
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

export function extractHeadersData(
  session: WebphoneSession,
  headers: WebphoneSessionRequestHeaders,
) {
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
      }, {} as { [key: string]: string });

    if (Object.keys(data).length) {
      // TODO: fix type
      session.__rc_partyData = data as any as PartyData;
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

export function getCallQueueName({
  direction,
  headers,
}: {
  direction: 'Inbound' | 'Outbound';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headers: any;
}) {
  if (
    direction === callDirections.outbound ||
    !headers ||
    !headers['P-Rc-Api-Call-Info'] ||
    !headers['P-Rc-Api-Call-Info'][0] ||
    !headers['P-Rc-Api-Call-Info'][0].raw ||
    !headers['P-Asserted-Identity'] ||
    !headers['P-Asserted-Identity'][0] ||
    !headers['P-Asserted-Identity'][0].raw
  ) {
    return null;
  }
  if (headers['P-Rc-Api-Call-Info'][0].raw.indexOf('queue-call') === -1) {
    return null;
  }
  const name = headers['P-Asserted-Identity'][0].raw.split('"')[1];
  return name || null;
}

export function normalizeSession(
  session?: WebphoneSession,
): NormalizedSession | undefined {
  if (!session) {
    return session;
  }
  const toUserName = session.request?.to?.displayName;
  const fromUserName = session.request?.from?.displayName;
  return {
    id: session.id,
    callId: session.__rc_callId,
    direction: session.__rc_direction,
    callStatus: session.__rc_callStatus,
    // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
    to: session.request?.to?.uri?.user,
    toUserName,
    // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
    from: session.request?.from?.uri?.user,
    fromNumber: session.__rc_fromNumber,
    fromUserName,
    fromTag: session.fromTag,
    toTag: session.toTag,
    // @ts-expect-error TS(2322): Type 'number | undefined' is not assignable to typ... Remove this comment to see the full error message
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
    // @ts-expect-error TS(2739): Type '{ id: string; }' is missing the following pr... Remove this comment to see the full error message
    contactMatch: session.__rc_contactMatch,
    minimized: !!session.__rc_minimized,
    partyData: session.__rc_partyData || null,
    lastActiveTime: session.__rc_lastActiveTime,
    cached: false,
    removed: false,
    callQueueName: getCallQueueName({
      direction: session.__rc_direction,
      headers: session.request && session.request.headers,
    }),
    warmTransferSessionId: session.__rc_transferSessionId || '',
  };
}

export function isRing(session: NormalizedSession) {
  return !!(
    session &&
    session.direction === callDirections.inbound &&
    session.callStatus === sessionStatus.connecting
  );
}

export function isOnHold(session: NormalizedSession) {
  return !!(session && session.isOnHold);
}

export function sortByCreationTimeDesc(
  l: NormalizedSession,
  r: NormalizedSession,
) {
  return r.startTime - l.startTime;
}

export function sortByLastActiveTimeDesc(
  l: NormalizedSession,
  r: NormalizedSession,
) {
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
export function isConferenceSession(session?: NormalizedSession) {
  return session?.to?.indexOf('conf_') === 0;
}

export function isRecording(session: NormalizedSession) {
  return !!(
    session &&
    (session.recordStatus === recordStatus.pending ||
      session.recordStatus === recordStatus.recording)
  );
}
