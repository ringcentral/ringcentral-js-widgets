"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prefixEnum = prefixEnum;
exports.default = void 0;

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.map");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.for-each");

var _HashMap2 = _interopRequireDefault(require("../HashMap"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * @class
 * @description helper class for creating redux action definition maps
 */

var Enum =
/*#__PURE__*/
function (_HashMap) {
  _inherits(Enum, _HashMap);

  /**
   * @constructor
   * @param {String[]} actions - list of action strings
   * @extends HashMap
   */
  function Enum() {
    var values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    _classCallCheck(this, Enum);

    var definition = {};
    values.forEach(function (value) {
      definition[value] = prefix !== '' ? "".concat(prefix, "-").concat(value) : value;
    });
    return _possibleConstructorReturn(this, _getPrototypeOf(Enum).call(this, definition));
  }

  return Enum;
}(_HashMap2.default);

exports.default = Enum;
var prefixCache = new Map();
/**
 * @function
 * @description helper function to return a prefixed action definition maps
 */

function prefixEnum(_ref) {
  var enumMap = _ref.enumMap,
      prefix = _ref.prefix,
      _ref$base = _ref.base,
      base = _ref$base === void 0 ? enumMap : _ref$base;
  if (!prefix || prefix === '') return base;

  if (!prefixCache.has(prefix)) {
    prefixCache.set(prefix, new Map());
  }

  var cache = prefixCache.get(prefix);

  if (!cache.has(base)) {
    var definition = {};

    for (var type in base) {
      /* istanbul ignore else */
      if (hasOwnProperty.call(base, type)) {
        definition[type] = "".concat(prefix, "-").concat(base[type]);
      }
    }

    cache.set(base, new _HashMap2.default(definition));
  }

  return cache.get(base);
}
//# sourceMappingURL=index.js.map
