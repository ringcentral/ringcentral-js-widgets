"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.date.to-iso-string");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RealPubnub = jest.requireActual('pubnub');

var subscriptionBody = require('./data/subscription.json');

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
      }), subscriptionBody.deliveryMode.encryptionKey, {
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

module.exports = MockedPubNub;
//# sourceMappingURL=pubnub.js.map
