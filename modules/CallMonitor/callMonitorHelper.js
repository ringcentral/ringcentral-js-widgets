"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.matchWephoneSessionWithAcitveCall = matchWephoneSessionWithAcitveCall;
exports.isCurrentDeviceEndCall = isCurrentDeviceEndCall;
exports.mapTelephonyStatus = mapTelephonyStatus;

require("core-js/modules/es6.array.sort");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.array.filter");

var _Session = require("ringcentral-call-control/lib/Session");

var _callDirections = _interopRequireDefault(require("../../enums/callDirections"));

var _telephonyStatus = require("../../enums/telephonyStatus");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getSessionStartTime(session) {
  var webphoneStartTime;

  if (session.direction === _callDirections["default"].inbound) {
    webphoneStartTime = session.creationTime;
  } else {
    webphoneStartTime = session.startTime || session.creationTime;
  }

  return webphoneStartTime;
}

function matchWephoneSessionWithAcitveCall(sessions, callItem) {
  if (!sessions || !callItem) {
    return undefined;
  }

  var matches = sessions.filter(function (session) {
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
      } // For switched call, partyId is not matched


      if (session.callId === callItem.id) {
        return true;
      }

      return false;
    } // Strategy 2: use `call-id` header of a webRTC session to match with
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

    if (session.direction === _callDirections["default"].inbound && callItem.sipData.remoteUri.indexOf(session.from) === -1) {
      return false;
    }

    if (session.direction === _callDirections["default"].outbound && callItem.sipData.remoteUri.indexOf(session.to) === -1) {
      return false;
    } // 16000 is from experience in test.
    // there is delay bettween active call created and webphone session created
    // for example, the time delay is decided by when webphone get invite info


    if (Math.abs(callItem.startTime - getSessionStartTime(session)) > 16000) {
      return false;
    }

    return true;
  });

  if (matches.length > 1) {
    // order by the time gap asc
    matches.sort(function (x, y) {
      var gapX = Math.abs(callItem.startTime - getSessionStartTime(x));
      var gapY = Math.abs(callItem.startTime - getSessionStartTime(y));
      return gapX === gapY ? 0 : gapX - gapY;
    });
  }

  return matches[0];
}

function isCurrentDeviceEndCall(sessions, callItem) {
  return sessions.indexOf(callItem.telephonySessionId) !== -1;
} // telephony session status match presence telephonyStatus


function mapTelephonyStatus(telephonySessionStatus) {
  var result = null;

  switch (telephonySessionStatus) {
    case _Session.PartyStatusCode.setup:
    case _Session.PartyStatusCode.proceeding:
      {
        result = _telephonyStatus.telephonyStatus.ringing;
        break;
      }

    case _Session.PartyStatusCode.hold:
      {
        result = _telephonyStatus.telephonyStatus.onHold;
        break;
      }

    case _Session.PartyStatusCode.answered:
      {
        result = _telephonyStatus.telephonyStatus.callConnected;
        break;
      }

    case _Session.PartyStatusCode.parked:
      {
        result = _telephonyStatus.telephonyStatus.parkedCall;
        break;
      }

    default:
      {
        result = _telephonyStatus.telephonyStatus.noCall;
      }
  }

  return result;
}
//# sourceMappingURL=callMonitorHelper.js.map
