"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.date.to-iso-string");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
require("core-js/modules/web.dom-collections.for-each");
require("core-js/modules/web.timers");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _subscription = _interopRequireDefault(require("./data/subscription.json"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var RealPubnub = jest.requireActual('pubnub');
var pubnubCache = [];
var MockedPubNub = /*#__PURE__*/function () {
  function MockedPubNub(_ref) {
    var subscribeKey = _ref.subscribeKey;
    _classCallCheck(this, MockedPubNub);
    this._subscribeKey = subscribeKey;
    this._realPubnub = new RealPubnub({
      subscribeKey: subscribeKey
    });
    this.encrypt = this._realPubnub.encrypt;
    this.decrypt = this._realPubnub.decrypt;
    this._channels = [];
    this._listeners = [];
    pubnubCache.push(this);
  }
  _createClass(MockedPubNub, [{
    key: "subscribe",
    value: function subscribe(_ref2) {
      var channels = _ref2.channels;
      this._channels = channels;
    }
  }, {
    key: "addListener",
    value: function addListener(listener) {
      var _this = this;
      this._listeners.push(listener);
      setTimeout(function () {
        return _this.mockedConnected();
      }, 0);
    }
  }, {
    key: "removeAllListeners",
    value: function removeAllListeners() {
      this._listeners = [];
    }
  }, {
    key: "unsubscribeAll",
    value: function unsubscribeAll() {}
  }, {
    key: "destroy",
    value: function destroy() {
      this._realPubnub = null;
    } // Methods to do mocking operations
  }, {
    key: "mockedConnected",
    value: function mockedConnected() {
      var _iterator = _createForOfIteratorHelper(this._listeners),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var listen = _step.value;
          listen.status({
            category: 'PNConnectedCategory',
            operation: 'PNSubscribeOperation'
          });
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "mockCallMessage",
    value: function mockCallMessage(activeCallsBody) {
      var encrypted = this._realPubnub.encrypt(JSON.stringify({
        uuid: '1088719898803550582-8036702296129764',
        event: '/restapi/v1.0/account/160746006/extension/160751006/presence?detailedTelephonyState=true&sipData=true',
        timestamp: new Date().toISOString(),
        subscriptionId: '24dcfdcf-e7d0-4930-9edb-555ec11843b9',
        body: {
          allowSeeMyPresence: true,
          dndStatus: 'TakeAllCalls',
          extensionId: 160751006,
          meetingsStatus: 'Disconnected',
          pickUpCallsOnHold: false,
          presenceStatus: 'Busy',
          ringOnMonitoredCall: false,
          sequence: 368997,
          telephonyStatus: 'OnHold',
          userStatus: 'Available',
          activeCalls: activeCallsBody,
          totalActiveCalls: activeCallsBody.length
        }
      }), _subscription["default"].deliveryMode.encryptionKey, {
        encryptKey: false,
        keyEncoding: 'base64',
        keyLength: 128,
        mode: 'ecb'
      });
      this.mockMessage(encrypted);
    }
  }, {
    key: "mockMessage",
    value: function mockMessage(msg) {
      var pubnubMsg = {
        channel: this._channels[0],
        subscription: undefined,
        actualChannel: null,
        subscribedChannel: this._channels[0],
        timetoken: '14933652238078468',
        publisher: undefined,
        message: msg
      };
      this._listeners.forEach(function (l) {
        return l.message(pubnubMsg);
      });
    }
  }, {
    key: "mockPresence",
    value: function mockPresence(msg) {
      var pubnubMsg = {
        channel: this._channels[0],
        subscription: undefined,
        actualChannel: null,
        subscribedChannel: this._channels[0],
        timetoken: '14933652238078468',
        publisher: undefined,
        message: msg
      };
      this._listeners.forEach(function (l) {
        return l.message(pubnubMsg);
      });
    }
  }]);
  return MockedPubNub;
}();
MockedPubNub.OPERATIONS = RealPubnub.OPERATIONS;
MockedPubNub.CATEGORIES = RealPubnub.CATEGORIES;
MockedPubNub.getLastPubnub = function getLastPubnub() {
  return pubnubCache[pubnubCache.length - 1];
};
var _default = MockedPubNub;
exports["default"] = _default;
//# sourceMappingURL=pubnub.js.map
