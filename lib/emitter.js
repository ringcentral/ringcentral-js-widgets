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

var _symbolMap = require('data-types/symbol-map');

var _symbolMap2 = _interopRequireDefault(_symbolMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var symbols = new _symbolMap2.default(['emitter']);

var Emitter = function () {
  function Emitter() {
    (0, _classCallCheck3.default)(this, Emitter);

    this[symbols.emitter] = new _eventEmitter2.default();
  }
  /**
   * @function
   * @param {String} event
   * @param {Function} handler
   * @return {Function} Unregister function.
   */


  (0, _createClass3.default)(Emitter, [{
    key: 'on',
    value: function on(event, handler) {
      var _this = this;

      this[symbols.emitter].on(event, handler);
      return function () {
        _this[symbols.emitter].off(event, handler);
      };
    }
    /**
     * @function
     * @param {String} event
     * @param {Function)} handler
     * @return {Function} Unregister function.
     */

  }, {
    key: 'once',
    value: function once(event, handler) {
      var _this2 = this;

      this[symbols.emitter].once(event, handler);
      return function () {
        _this2[symbols.emitter].off(event, handler);
      };
    }
    /**
     * @function
     * @param {String} event
     * @param {...args} args
     */

  }, {
    key: 'emit',
    value: function emit(event) {
      var _symbols$emitter;

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      (_symbols$emitter = this[symbols.emitter]).emit.apply(_symbols$emitter, [event].concat(args));
    }
    /**
     * @function
     * @param {String} event
     * @param {Function} handler
     */

  }, {
    key: 'off',
    value: function off(event, handler) {
      this[symbols.emitter].off(event, handler);
    }
  }]);
  return Emitter;
}();

exports.default = Emitter;
//# sourceMappingURL=emitter.js.map
