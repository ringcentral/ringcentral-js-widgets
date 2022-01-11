"use strict";

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

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

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

var _moment = _interopRequireDefault(require("moment"));

var _Session = require("ringcentral-call-control/lib/Session");

var _uuid = require("uuid");

var _callDirections = _interopRequireDefault(require("../../enums/callDirections"));

var _extensionInfo = _interopRequireDefault(require("./data/extensionInfo.json"));

var _telephonySessions = _interopRequireDefault(require("./data/telephonySessions.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var sequence = 10;
var DEFAULT_DIRECTION = _callDirections["default"].outbound;
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
    this._partyId = void 0;
    this._fromNumberData = void 0;
    this._toNumberData = void 0;
    this._startTime = void 0;
    this._isRecording = void 0;

    this._init(initParams);
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
          fromNumberData = _ref.fromNumberData,
          toNumberData = _ref.toNumberData,
          startTime = _ref.startTime,
          isRecording = _ref.isRecording;
      this._telephonySessionId = telephonySessionId;
      this._sessionId = sessionId || telephonySessionId;
      this._phoneNumber = phoneNumber;
      this._direction = direction;
      this._partyId = "".concat(telephonySessionId, "-1");
      this._partyStatus = status;
      this._fromNumberData = fromNumberData;
      this._toNumberData = toNumberData;
      this._startTime = startTime;
      this._isRecording = isRecording;
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
      this._data.body.telephonySessionId = _telephonySessionId;
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
      telephonySessionBuildersCache.push(this);
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
        timestamp: (0, _moment["default"])().format(),
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
              mobilePickupData: {
                ccMailboxes: ['400144455008'],
                to: '#19008@sip-mesdevams.lab.nordigy.ru:5060',
                sid: '402936472080',
                srvLvl: '-149699523',
                srvLvlExt: '390'
              }
            },
            recordings: this.recordings,
            missedCall: false,
            standAlone: false,
            muted: false
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
