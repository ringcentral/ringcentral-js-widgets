"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.regexp.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_PHONE_NUMBER = void 0;
Object.defineProperty(exports, "PartyStatusCode", {
  enumerable: true,
  get: function get() {
    return _Session.PartyStatusCode;
  }
});
exports.clearTelephonySessionBuilders = exports.TelephonySessionBuilder = void 0;
exports.createTelephonySession = createTelephonySession;
exports.telephonySessionBuildersCache = exports.makeWebphoneSessionId = exports.makeVoiceCallToken = exports.makeTelephonySessionId = exports.makePartyId = void 0;
var _dayjs = _interopRequireDefault(require("dayjs"));
var _Session = require("ringcentral-call-control/lib/Session");
var _uuid = require("uuid");
var _callDirections = require("../../enums/callDirections");
var _extensionInfo = _interopRequireDefault(require("./data/extensionInfo.json"));
var _telephonySessions = _interopRequireDefault(require("./data/telephonySessions.json"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// "s-a4a012b34c545z18b6f423f7fzf4d9960000"
var makeTelephonySessionId = function makeTelephonySessionId() {
  return "s-".concat((0, _uuid.v4)());
};

// "p-a4a012b34c545z18b6f423f7fzf4d9960000-1"
exports.makeTelephonySessionId = makeTelephonySessionId;
var makePartyId = function makePartyId(telephonySessionId) {
  return "p-".concat(telephonySessionId.substring(2), "-1");
};

// "e5c8acd0-dcc2-4767-b445-b0029bd8b85210.74.1.43-5070-b30665b0-599a-49b9-b"
exports.makePartyId = makePartyId;
var makeWebphoneSessionId = function makeWebphoneSessionId() {
  return (0, _uuid.v4)();
};

// "conf_732d613461306438313238356331617a31376662656163336664377a3830633664303030304031302e37342e31332e3132393a35303730"
exports.makeWebphoneSessionId = makeWebphoneSessionId;
var makeVoiceCallToken = function makeVoiceCallToken() {
  return "conf_".concat((0, _uuid.v4)());
};

/**
 * Telephony session message boy //https://developers.ringcentral.com/api-reference/Extension-Telephony-Sessions-Event
 * supports:
 * 1. create different telephony status's session;
 * 2. update telephony status;
 * 3. custom sessionId, from, to, direction attribute;
 *
 * @class TelephonySession
 */
exports.makeVoiceCallToken = makeVoiceCallToken;
var sequence = 10;
var DEFAULT_DIRECTION = _callDirections.callDirection.outbound;
var DEFAULT_RECORD_STATUS = false;
var DEFAULT_PHONE_NUMBER = '+16501234567';
exports.DEFAULT_PHONE_NUMBER = DEFAULT_PHONE_NUMBER;
var DEFAULT_EXTENSION_ID = _extensionInfo["default"].id.toString();
var telephonySessionBuildersCache = [];
exports.telephonySessionBuildersCache = telephonySessionBuildersCache;
var clearTelephonySessionBuilders = function clearTelephonySessionBuilders() {
  telephonySessionBuildersCache.length = 0; // clear
};
exports.clearTelephonySessionBuilders = clearTelephonySessionBuilders;
var TelephonySessionBuilder = /*#__PURE__*/function () {
  function TelephonySessionBuilder() {
    var initParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, TelephonySessionBuilder);
    this._telephonySessionId = void 0;
    this._phoneNumber = void 0;
    this._direction = void 0;
    this._sessionId = void 0;
    this._partyStatus = void 0;
    this._partyReason = void 0;
    this._partyId = void 0;
    this._fromNumberData = void 0;
    this._toNumberData = void 0;
    this._startTime = void 0;
    this._isRecording = void 0;
    this._muteStatus = void 0;
    this._queueCall = void 0;
    this._originType = void 0;
    this._peerId = void 0;
    this._conferenceRole = void 0;
    this.relatedWebphoneSession = void 0;
    this._init(initParams);
    telephonySessionBuildersCache.push(this);
  }
  _createClass(TelephonySessionBuilder, [{
    key: "_init",
    value: function _init(_ref) {
      var _ref$telephonySession = _ref.telephonySessionId,
        telephonySessionId = _ref$telephonySession === void 0 ? makeTelephonySessionId() : _ref$telephonySession,
        _ref$partyId = _ref.partyId,
        partyId = _ref$partyId === void 0 ? makePartyId(telephonySessionId) : _ref$partyId,
        _ref$sessionId = _ref.sessionId,
        sessionId = _ref$sessionId === void 0 ? makeWebphoneSessionId() : _ref$sessionId,
        _ref$phoneNumber = _ref.phoneNumber,
        phoneNumber = _ref$phoneNumber === void 0 ? DEFAULT_PHONE_NUMBER : _ref$phoneNumber,
        _ref$direction = _ref.direction,
        direction = _ref$direction === void 0 ? DEFAULT_DIRECTION : _ref$direction,
        _ref$status = _ref.status,
        status = _ref$status === void 0 ? _Session.PartyStatusCode.proceeding : _ref$status,
        _ref$reason = _ref.reason,
        reason = _ref$reason === void 0 ? 'AttendedTransfer' : _ref$reason,
        fromNumberData = _ref.fromNumberData,
        toNumberData = _ref.toNumberData,
        startTime = _ref.startTime,
        _ref$isRecording = _ref.isRecording,
        isRecording = _ref$isRecording === void 0 ? DEFAULT_RECORD_STATUS : _ref$isRecording,
        _ref$muteStatus = _ref.muteStatus,
        muteStatus = _ref$muteStatus === void 0 ? false : _ref$muteStatus,
        _ref$queueCall = _ref.queueCall,
        queueCall = _ref$queueCall === void 0 ? false : _ref$queueCall,
        _ref$originType = _ref.originType,
        originType = _ref$originType === void 0 ? 'Call' : _ref$originType,
        peerId = _ref.peerId,
        conferenceRole = _ref.conferenceRole;
      this._telephonySessionId = telephonySessionId;
      this._partyId = partyId;
      this._sessionId = sessionId;
      this._phoneNumber = phoneNumber;
      this._direction = direction;
      this._partyStatus = status;
      this._partyReason = reason;
      this._fromNumberData = fromNumberData;
      this._toNumberData = toNumberData;
      this._startTime = startTime;
      this._isRecording = isRecording;
      this._muteStatus = muteStatus;
      this._queueCall = queueCall;
      this._originType = originType;
      this._peerId = peerId;
      this._conferenceRole = conferenceRole;
    }
  }, {
    key: "setRelatedWebphoneSession",
    value: function setRelatedWebphoneSession(webphoneSession) {
      this.relatedWebphoneSession = webphoneSession;
    }
  }, {
    key: "direction",
    value: function direction(_direction) {
      this._direction = _direction;
      return this;
    }
  }, {
    key: "status",
    value: function status(_status) {
      this._partyStatus = _status;
      return this;
    }
  }, {
    key: "reason",
    value: function reason(_reason) {
      this._partyReason = _reason;
      return this;
    }
  }, {
    key: "to",
    value: function to(toNumber) {
      this._phoneNumber = toNumber;
      return this;
    }
  }, {
    key: "from",
    value: function from(fromNumber) {
      this._phoneNumber = fromNumber;
      return this;
    }
  }, {
    key: "sessionId",
    value: function sessionId(_sessionId) {
      this._sessionId = _sessionId;
      return this;
    }
  }, {
    key: "telephonySessionId",
    value: function telephonySessionId(_telephonySessionId) {
      this._telephonySessionId = _telephonySessionId;
      return this;
    }
  }, {
    key: "partyId",
    value: function partyId(_partyId) {
      this._partyId = _partyId;
      return this;
    }
  }, {
    key: "setConnected",
    value: function setConnected() {
      return this.status(_Session.PartyStatusCode.answered);
    }
  }, {
    key: "setDisconnected",
    value: function setDisconnected() {
      return this.status(_Session.PartyStatusCode.disconnected);
    }
  }, {
    key: "setGone",
    value: function setGone() {
      return this.status(_Session.PartyStatusCode.gone);
    }
  }, {
    key: "setReason",
    value: function setReason() {
      return this.reason('AttendedTransfer');
    }
  }, {
    key: "setHoldCall",
    value: function setHoldCall() {
      return this.status(_Session.PartyStatusCode.hold);
    }
  }, {
    key: "setMuteCall",
    value: function setMuteCall() {
      this._muteStatus = true;
      return this;
    }
  }, {
    key: "startRecord",
    value: function startRecord() {
      this._isRecording = true;
      return this;
    }
  }, {
    key: "setInboundCall",
    value: function setInboundCall() {
      return this.direction('Inbound');
    }
  }, {
    key: "setOutboundCall",
    value: function setOutboundCall() {
      return this.direction('Outbound');
    }
  }, {
    key: "setNumber",
    value: function setNumber(phoneNumber) {
      this._phoneNumber = phoneNumber;
      return this;
    }
  }, {
    key: "setPeerId",
    value: function setPeerId(peerId) {
      this._peerId = peerId;
      return this;
    }
  }, {
    key: "setConferenceRole",
    value: function setConferenceRole(role) {
      this._conferenceRole = role;
      return this;
    }
  }, {
    key: "done",
    value: function done() {
      return this.data;
    }
  }, {
    key: "getSessionId",
    value: function getSessionId() {
      return this._sessionId;
    }
  }, {
    key: "getPartyId",
    value: function getPartyId() {
      return this._partyId;
    }
  }, {
    key: "getTelephonySessionId",
    value: function getTelephonySessionId() {
      return this._telephonySessionId;
    }
  }, {
    key: "getStatus",
    value: function getStatus() {
      return this._partyStatus;
    }
  }, {
    key: "numberData",
    get: function get() {
      return {
        phoneNumber: this._phoneNumber,
        name: 'Yoda HubSpot',
        extensionId: DEFAULT_EXTENSION_ID
      };
    }
  }, {
    key: "recordings",
    get: function get() {
      return [{
        id: DEFAULT_EXTENSION_ID,
        active: this._isRecording
      }];
    }
  }, {
    key: "data",
    get: function get() {
      return _objectSpread(_objectSpread({}, _telephonySessions["default"]), {}, {
        uuid: (0, _uuid.v4)(),
        timestamp: (0, _dayjs["default"])().format(),
        subscriptionId: (0, _uuid.v4)(),
        body: _objectSpread(_objectSpread({}, _telephonySessions["default"].body), {}, {
          sequence: sequence++,
          sessionId: this._sessionId,
          telephonySessionId: this._telephonySessionId,
          serverId: '10.62.25.111.TAM',
          eventTime: this._startTime || Date(),
          accountId: '400144452008',
          extensionId: DEFAULT_EXTENSION_ID,
          parties: [{
            extensionId: DEFAULT_EXTENSION_ID,
            id: this._partyId,
            direction: this._direction,
            to: this._toNumberData || this.numberData,
            from: this._fromNumberData || this.numberData,
            status: {
              code: this._partyStatus,
              reason: this._partyReason,
              mobilePickupData: {
                ccMailboxes: ['400144455008'],
                to: '#19008@platform.devtest.ringcentral.com:5060',
                sid: '402936472080',
                srvLvl: '-149699523',
                srvLvlExt: '390'
              },
              peerId: this._peerId
            },
            recordings: this.recordings,
            missedCall: false,
            standAlone: false,
            muted: this._muteStatus,
            queueCall: this._queueCall,
            conferenceRole: this._conferenceRole
          }],
          recordings: this.recordings,
          origin: {
            type: this._originType
          }
        })
      });
    }
  }]);
  return TelephonySessionBuilder;
}();
exports.TelephonySessionBuilder = TelephonySessionBuilder;
function createTelephonySession(initParams) {
  return new TelephonySessionBuilder(initParams);
}
//# sourceMappingURL=telephonySessionBuilder.js.map
