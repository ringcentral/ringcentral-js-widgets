"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prefixEnum = prefixEnum;
exports.createEnum = createEnum;
exports["default"] = void 0;

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.object.keys");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.map");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.for-each");

var _HashMap2 = _interopRequireDefault(require("../HashMap"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * @class
 * @description helper class for creating redux action definition maps
 */

var Enum = /*#__PURE__*/function (_HashMap) {
  _inherits(Enum, _HashMap);

  var _super = _createSuper(Enum);

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
    return _super.call(this, definition);
  }

  return Enum;
}(_HashMap2["default"]);

exports["default"] = Enum;
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

    cache.set(base, new _HashMap2["default"](definition));
  }

  return cache.get(base);
}

function createEnum(values, prefix) {
  var enumMap = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return new Enum([].concat(_toConsumableArray(Object.keys(enumMap)), _toConsumableArray(values)), prefix);
}
//# sourceMappingURL=index.js.map
