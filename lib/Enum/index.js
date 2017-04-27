'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

exports.prefixEnum = prefixEnum;

var _HashMap2 = require('../HashMap');

var _HashMap3 = _interopRequireDefault(_HashMap2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * @class
 * @description helper class for creating redux action definition maps
 */

var Enum = function (_HashMap) {
  (0, _inherits3.default)(Enum, _HashMap);

  /**
   * @constructor
   * @param {String[]} actions - list of action strings
   * @extends HashMap
   */
  function Enum() {
    var values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    (0, _classCallCheck3.default)(this, Enum);

    var definition = {};
    values.forEach(function (value) {
      definition[value] = prefix !== '' ? prefix + '-' + value : value;
    });
    return (0, _possibleConstructorReturn3.default)(this, (Enum.__proto__ || (0, _getPrototypeOf2.default)(Enum)).call(this, definition));
  }

  return Enum;
}(_HashMap3.default);

exports.default = Enum;

var prefixCache = new _map2.default();

/**
 * @function
 * @description helper function to return a prefixed action definition maps
 */
function prefixEnum(_ref) {
  var enumMap = _ref.enumMap,
      prefix = _ref.prefix,
      _ref$base = _ref.base,
      base = _ref$base === undefined ? enumMap : _ref$base;

  if (!prefix || prefix === '') return base;

  if (!prefixCache.has(prefix)) {
    prefixCache.set(prefix, new _map2.default());
  }

  var cache = prefixCache.get(prefix);

  if (!cache.has(base)) {
    var definition = {};
    for (var type in base) {
      /* istanbul ignore else */
      if (hasOwnProperty.call(base, type)) {
        definition[type] = prefix + '-' + base[type];
      }
    }
    cache.set(base, new _HashMap3.default(definition));
  }
  return cache.get(base);
}
//# sourceMappingURL=index.js.map
