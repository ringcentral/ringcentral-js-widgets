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
exports.TelephonySessionBuilder = void 0;
exports.createTelephonySession = createTelephonySession;
exports.telephonySessionBuildersCache = void 0;
var _dayjs = _interopRequireDefault(require("dayjs"));
var _Session = require("ringcentral-call-control/lib/Session");
var _uuid = require("uuid");
var _callDirections = _interopRequireDefault(require("../../enums/callDirections"));
var _extensionInfo = _interopRequireDefault(require("./data/extensionInfo.json"));
var _telephonySessions = _interopRequireDefault(require("./data/telephonySessions.json"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * Telephony session message boy //https://developers.ringcentral.com/api-reference/Extension-Telephony-Sessions-Event
 * supports:
 * 1. create different telephony status's session;
 * 2. update telephony status;
 * 3. custom sessionId, from, to, direction attribute;
 *
 * @class TelephonySession
 */

var sequence = 10;
var DEFAULT_DIRECTION = _callDirections["default"].outbound;
var DEFAULT_RECORD_STATUS = false;
var DEFAULT_PHONE_NUMBER = '+16501234567';
exports.DEFAULT_PHONE_NUMBER = DEFAULT_PHONE_NUMBER;
var DEFAULT_EXTENSION_ID = _extensionInfo["default"].id.toString();
var telephonySessionBuildersCache = [];
exports.telephonySessionBuildersCache = telephonySessionBuildersCache;
var TelephonySessionBuilder = /*#__PURE__*/function () {
  function TelephonySessionBuilder() {
    var initParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, TelephonySessionBuilder);
    this._data = void 0;
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
    this.relatedWebphoneSession = void 0;
    this._init(initParams);
    telephonySessionBuildersCache.push(this);
  }
  _createClass(TelephonySessionBuilder, [{
    key: "_init",
    value: function _init(_ref) {
      var _ref$telephonySession = _ref.telephonySessionId,
        telephonySessionId = _ref$telephonySession === void 0 ? (0, _uuid.v4)() : _ref$telephonySession,
        _ref$phoneNumber = _ref.phoneNumber,
        phoneNumber = _ref$phoneNumber === void 0 ? DEFAULT_PHONE_NUMBER : _ref$phoneNumber,
        _ref$direction = _ref.direction,
        direction = _ref$direction === void 0 ? DEFAULT_DIRECTION : _ref$direction,
        sessionId = _ref.sessionId,
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
        queueCall = _ref$queueCall === void 0 ? false : _ref$queueCall;
      this._telephonySessionId = telephonySessionId;
      this._sessionId = sessionId || telephonySessionId;
      this._phoneNumber = phoneNumber;
      this._direction = direction;
      this._partyId = "".concat(telephonySessionId, "-1");
      this._partyStatus = status;
      this._partyReason = reason;
      this._fromNumberData = fromNumberData;
      this._toNumberData = toNumberData;
      this._startTime = startTime;
      this._isRecording = isRecording;
      this._muteStatus = muteStatus;
      this._queueCall = queueCall;
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
    key: "done",
    value: function done() {
      return this.data;
    }
  }, {
    key: "telephoneSessionId",
    get: function get() {
      return this._telephonySessionId;
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
              }
            },
            recordings: this.recordings,
            missedCall: false,
            standAlone: false,
            muted: this._muteStatus,
            queueCall: this._queueCall
          }],
          recordings: this.recordings,
          origin: {
            type: 'Call'
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
