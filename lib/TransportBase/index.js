'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _eventEmitter = require('event-emitter');

var _eventEmitter2 = _interopRequireDefault(_eventEmitter);

var _Enum = require('../Enum');

var _Enum2 = _interopRequireDefault(_Enum);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TransportBase = function () {
  function TransportBase() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        name = _ref.name,
        prefix = _ref.prefix,
        _ref$timeout = _ref.timeout,
        timeout = _ref$timeout === undefined ? 90 * 1000 : _ref$timeout;

    (0, _classCallCheck3.default)(this, TransportBase);

    if (!name) {
      throw new Error(this.constructor.name + ': "name" is required.');
    }
    var prefixString = prefix ? prefix + '-' : '';
    this._events = new _Enum2.default(['request', 'response', 'push', 'timeout'], '' + prefixString + name);

    this._timeout = timeout;
  }

  (0, _createClass3.default)(TransportBase, [{
    key: 'events',
    get: function get() {
      return this._events;
    }
  }]);
  return TransportBase;
}();

exports.default = TransportBase;


(0, _eventEmitter2.default)(TransportBase.prototype);
//# sourceMappingURL=index.js.map
