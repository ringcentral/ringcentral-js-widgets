"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Option = void 0;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Option = function Option(_ref) {
  var _option$data$icon, _option$data;
  var option = _ref.option,
    isOption = _ref.isOption,
    _ref$stylesFromProps = _ref.stylesFromProps,
    stylesFromProps = _ref$stylesFromProps === void 0 ? {} : _ref$stylesFromProps;
  var currentStyles = _objectSpread(_objectSpread({}, _styles["default"]), stylesFromProps);
  var icon = (_option$data$icon = option === null || option === void 0 ? void 0 : (_option$data = option.data) === null || _option$data === void 0 ? void 0 : _option$data.icon) !== null && _option$data$icon !== void 0 ? _option$data$icon : null;
  var _option$disabled = option.disabled,
    disabled = _option$disabled === void 0 ? false : _option$disabled,
    dataSign = option.dataSign;
  return /*#__PURE__*/_react["default"].createElement("div", {
    title: option.text,
    "data-sign": dataSign,
    className: (0, _classnames["default"])(disabled ? currentStyles.disabled : null, isOption && !disabled ? currentStyles.option : currentStyles.value)
  }, icon ? /*#__PURE__*/_react["default"].createElement("i", {
    dangerouslySetInnerHTML: {
      __html: icon
    },
    role: "presentation",
    className: (0, _classnames["default"])([currentStyles.icon, currentStyles.marginRight5])
  }) : null, /*#__PURE__*/_react["default"].createElement("span", null, option.text));
};
exports.Option = Option;
//# sourceMappingURL=DropdownSelectOptions.js.map
