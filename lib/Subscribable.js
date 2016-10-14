'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbolMap = require('data-types/symbol-map');

var _symbolMap2 = _interopRequireDefault(_symbolMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var symbols = new _symbolMap2.default(['handlers']);

var Subscribable = function () {
  function Subscribable() {
    (0, _classCallCheck3.default)(this, Subscribable);

    this[symbols.handlers] = new _set2.default();
  }

  (0, _createClass3.default)(Subscribable, [{
    key: 'subscribe',
    value: function subscribe(handler) {
      var _this = this;

      this[symbols.handlers].add(handler);
      return function () {
        _this.unsubscribe(handler);
      };
    }
  }, {
    key: 'unsubscribe',
    value: function unsubscribe(handler) {
      this[symbols.handlers].delete(handler);
    }
  }, {
    key: 'trigger',
    value: function trigger() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      [].concat((0, _toConsumableArray3.default)(this[symbols.handlers])).forEach(function (handler) {
        try {
          handler.apply(undefined, args);
        } catch (e) {
          /* ignore error */
        }
      });
    }
  }]);
  return Subscribable;
}();

exports.default = Subscribable;
//# sourceMappingURL=Subscribable.js.map
