import { PartyStatusCode } from 'ringcentral-call-control/lib/Session';
import callDirections from '../../enums/callDirections';
import { telephonyStatus } from '../../enums/telephonyStatus';

function getSessionStartTime(session) {
  let webphoneStartTime;
  if (session.direction === callDirections.inbound) {
    webphoneStartTime = session.creationTime;
  } else {
    webphoneStartTime = session.startTime || session.creationTime;
  }
  return webphoneStartTime;
}

export function matchWephoneSessionWithAcitveCall(sessions, callItem) {
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
      return session.id.indexOf(callItem.id) === 0;
    }

    if (!callItem.sipData.remoteUri || callItem.sipData.remoteUri === '') {
      return false;
    }

    if (
      session.direction === callDirections.inbound &&
      callItem.sipData.remoteUri.indexOf(session.from) === -1
    ) {
      return false;
    }

    if (
      session.direction === callDirections.outbound &&
      callItem.sipData.remoteUri.indexOf(session.to) === -1
    ) {
      return false;
    }

    // 16000 is from experience in test.
    // there is delay bettween active call created and webphone session created
    // for example, the time delay is decided by when webphone get invite info
    if (Math.abs(callItem.startTime - getSessionStartTime(session)) > 16000) {
      return false;
    }
    return true;
  });

  if (matches.length > 1) {
    // order by the time gap asc
    matches.sort((x, y) => {
      const gapX = Math.abs(callItem.startTime - getSessionStartTime(x));
      const gapY = Math.abs(callItem.startTime - getSessionStartTime(y));
      return gapX === gapY ? 0 : gapX - gapY;
    });
  }

  return matches[0];
}

export function isCurrentDeviceEndCall(sessions, callItem) {
  return sessions.indexOf(callItem.telephonySessionId) !== -1;
}

// telephony session status match presence telephonyStatus
export function mapTelephonyStatus(telephonySessionStatus) {
  let result = null;
  switch (telephonySessionStatus) {
    case PartyStatusCode.setup:
    case PartyStatusCode.proceeding: {
      result = telephonyStatus.ringing;
      break;
    }
    case PartyStatusCode.hold: {
      result = telephonyStatus.onHold;
      break;
    }
    case PartyStatusCode.answered: {
      result = telephonyStatus.callConnected;
      break;
    }
    case PartyStatusCode.parked: {
      result = telephonyStatus.parkedCall;
      break;
    }
    default: {
      result = telephonyStatus.noCall;
    }
  }
  return result;
}
