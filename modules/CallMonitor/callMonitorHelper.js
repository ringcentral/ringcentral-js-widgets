"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isCurrentDeviceEndCall = isCurrentDeviceEndCall;
exports.matchWebphoneSessionWithActiveCall = matchWebphoneSessionWithActiveCall;
exports.normalizeTelephonySession = normalizeTelephonySession;
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.object.to-string.js");
var _callDirections = _interopRequireDefault(require("../../enums/callDirections"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function getSessionStartTime(session) {
  var webphoneStartTime;
  if (session.direction === _callDirections["default"].inbound) {
    webphoneStartTime = session.creationTime;
  } else {
    webphoneStartTime = session.startTime || session.creationTime;
  }
  return webphoneStartTime;
}
function matchWebphoneSessionWithActiveCall(sessions, callItem) {
  if (!sessions || !callItem) {
    return undefined;
  }
  var matches = sessions.filter(function (session) {
    var _sipData;
    // Strategy 1: use `P-Rc-Api-Ids` header of a webRTC session to match with `telephonySessionId`
    // and `partyId` of a call data from presence api.
    // when caller calls him self, the sessionId are the same, so we need the `partyId` to identify the participants.
    if (session.partyData && callItem.telephonySessionId) {
      var _session$partyData = session.partyData,
        sessionId = _session$partyData.sessionId,
        partyId = _session$partyData.partyId;
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
    if (!((_sipData = callItem.sipData) === null || _sipData === void 0 ? void 0 : _sipData.remoteUri)) {
      return false;
    }
    if (session.direction === _callDirections["default"].inbound &&
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    callItem.sipData.remoteUri.indexOf(session.from) === -1) {
      return false;
    }
    if (session.direction === _callDirections["default"].outbound &&
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    callItem.sipData.remoteUri.indexOf(session.to) === -1) {
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
    matches.sort(function (x, y) {
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      var gapX = Math.abs(callItem.startTime - getSessionStartTime(x));
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      var gapY = Math.abs(callItem.startTime - getSessionStartTime(y));
      return gapX === gapY ? 0 : gapX - gapY;
    });
  }
  return matches[0];
}
function isCurrentDeviceEndCall(sessions, callItem) {
  // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
  return sessions.indexOf(callItem.telephonySessionId) !== -1;
}
function normalizeTelephonySession(session) {
  return {
    status: session.status,
    id: session.id,
    direction: session.direction,
    otherParties: session.otherParties
  };
}
//# sourceMappingURL=callMonitorHelper.js.map
