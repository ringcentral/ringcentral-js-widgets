'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MockedPubNub = undefined;

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

exports.getLastPubnub = getLastPubnub;

var _pubnub = require('pubnub');

var _pubnub2 = _interopRequireDefault(_pubnub);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pubnubs = [];

var MockedPubNub = exports.MockedPubNub = function () {
  function MockedPubNub(_ref) {
    var subscribeKey = _ref.subscribeKey;
    (0, _classCallCheck3.default)(this, MockedPubNub);

    this._subscribeKey = subscribeKey;
    this._realPubnub = new _pubnub2.default({ subscribeKey: subscribeKey });
    this.encrypt = this._realPubnub.encrypt;
    this.decrypt = this._realPubnub.decrypt;
    this._channels = [];
    this._listeners = [];
    pubnubs.push(this);
  }

  (0, _createClass3.default)(MockedPubNub, [{
    key: 'subscribe',
    value: function subscribe(_ref2) {
      var channels = _ref2.channels;

      this._channels = channels;
    }
  }, {
    key: 'addListener',
    value: function addListener(listener) {
      var _this = this;

      this._listeners.push(listener);
      setTimeout(function () {
        return _this.mockedConnected();
      }, 0);
    }
  }, {
    key: 'removeAllListeners',
    value: function removeAllListeners() {
      this._listeners = [];
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this._realPubnub = null;
    }

    // Methods to do mocking operations

  }, {
    key: 'mockedConnected',
    value: function mockedConnected() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(this._listeners), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'mockMessage',
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

MockedPubNub.OPERATIONS = _pubnub2.default.OPERATIONS;
MockedPubNub.CATEGORIES = _pubnub2.default.CATEGORIES;

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
