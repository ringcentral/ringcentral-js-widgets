"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLastPubnub = getLastPubnub;
exports.MockedPubNub = void 0;

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

var _pubnub = _interopRequireDefault(require("pubnub"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var pubnubs = [];

var MockedPubNub =
/*#__PURE__*/
function () {
  function MockedPubNub(_ref) {
    var subscribeKey = _ref.subscribeKey;

    _classCallCheck(this, MockedPubNub);

    this._subscribeKey = subscribeKey;
    this._realPubnub = new _pubnub["default"]({
      subscribeKey: subscribeKey
    });
    this.encrypt = this._realPubnub.encrypt;
    this.decrypt = this._realPubnub.decrypt;
    this._channels = [];
    this._listeners = [];
    pubnubs.push(this);
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
    key: "destroy",
    value: function destroy() {
      this._realPubnub = null;
    } // Methods to do mocking operations

  }, {
    key: "mockedConnected",
    value: function mockedConnected() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this._listeners[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var listen = _step.value;
          listen.status({
            category: 'PNConnectedCategory',
            operation: 'PNSubscribeOperation'
          });
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
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
  }]);

  return MockedPubNub;
}();

exports.MockedPubNub = MockedPubNub;
MockedPubNub.OPERATIONS = _pubnub["default"].OPERATIONS;
MockedPubNub.CATEGORIES = _pubnub["default"].CATEGORIES;

function getLastPubnub() {
  return pubnubs[pubnubs.length - 1];
}

function mockPubnub() {
  var id = require.resolve('pubnub');

  if (require.cache[id]) {
    require.cache[id].exports = MockedPubNub;
  }
}

mockPubnub();
//# sourceMappingURL=pubnub.js.map
