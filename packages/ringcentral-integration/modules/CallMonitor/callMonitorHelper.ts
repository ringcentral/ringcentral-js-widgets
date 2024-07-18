import callDirections from '../../enums/callDirections';
import type { ActiveCallControlSessionData } from '../../interfaces/ActiveSession.interface';
import type { Call } from '../../interfaces/Call.interface';
import type { ActiveCall } from '../../interfaces/Presence.model';
import type { NormalizedSession } from '../../interfaces/Webphone.interface';

function getSessionStartTime(session: NormalizedSession) {
  let webphoneStartTime;
  if (session.direction === callDirections.inbound) {
    webphoneStartTime = session.creationTime;
  } else {
    webphoneStartTime = session.startTime || session.creationTime;
  }
  return webphoneStartTime;
}

export function matchWebphoneSessionWithActiveCall(
  sessions: NormalizedSession[],
  callItem: ActiveCall | Call,
) {
  if (!sessions || !callItem) {
    return undefined;
  }
  const matches = sessions.filter((session) => {
    // Strategy 1: use `P-Rc-Api-Ids` header of a webRTC session to match with `telephonySessionId`
    // and `partyId` of a call data from presence api.
    // when caller calls him self, the sessionId are the same, so we need the `partyId` to identify the participants.
    if (session.partyData && callItem.telephonySessionId) {
      const { sessionId, partyId } = session.partyData;
      if (sessionId !== callItem.telephonySessionId) {
        return false;
      }
      if (partyId === callItem.partyId) {
        return true;
      }
      // For switched call, partyId is not matched
      if (session.callId === callItem.id) {
        return true;
      }
      return false;
    }

    // Strategy 2: use `call-id` header of a webRTC session to match with
    // `id` of a call data from presence api.
    // This approach is unstable since the `id` of a call data from presence api can change before
    // the call being accepted.
    if (session.callId === callItem.id) {
      return true;
    }

    if (session.direction !== callItem.direction) {
      return false;
    }

    /**
     * Strategy 3:
     * Hack: for conference call, the `to` field is Conference,
     * and the callItem's id won't change. According to `sip.js/src/session.js`
     * the `InviteClientContext`'s id will always begin with callItem's id.
     */
    if (callItem.toName && callItem.toName.toLowerCase() === 'conference') {
      // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
      return session.id.indexOf(callItem.id) === 0;
    }

    if (!(callItem as ActiveCall).sipData?.remoteUri) {
      return false;
    }

    if (
      session.direction === callDirections.inbound &&
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      (callItem as ActiveCall).sipData.remoteUri.indexOf(session.from) === -1
    ) {
      return false;
    }

    if (
      session.direction === callDirections.outbound &&
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      (callItem as ActiveCall).sipData.remoteUri.indexOf(session.to) === -1
    ) {
      return false;
    }

    // 16000 is from experience in test.
    // there is delay bettween active call created and webphone session created
    // for example, the time delay is decided by when webphone get invite info
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    if (Math.abs(callItem.startTime - getSessionStartTime(session)) > 16000) {
      return false;
    }
    return true;
  });

  if (matches.length > 1) {
    // order by the time gap asc
    matches.sort((x, y) => {
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      const gapX = Math.abs(callItem.startTime - getSessionStartTime(x));
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      const gapY = Math.abs(callItem.startTime - getSessionStartTime(y));
      return gapX === gapY ? 0 : gapX - gapY;
    });
  }

  return matches[0];
}

export function isCurrentDeviceEndCall(sessions: string[], callItem: Call) {
  // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
  return sessions.indexOf(callItem.telephonySessionId) !== -1;
}

export function normalizeTelephonySession(
  session: ActiveCallControlSessionData,
) {
  return {
    status: session.status,
    id: session.id,
    direction: session.direction,
    otherParties: session.otherParties,
  };
}
