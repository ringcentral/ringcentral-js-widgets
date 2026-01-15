"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Option = void 0;
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Option = exports.Option = function Option(_ref) {
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
    className: (0, _clsx["default"])(disabled ? currentStyles.disabled : null, isOption && !disabled ? currentStyles.option : currentStyles.value)
  }, icon ? /*#__PURE__*/_react["default"].createElement("i", {
    dangerouslySetInnerHTML: {
      __html: icon
    },
    role: "presentation",
    className: (0, _clsx["default"])([currentStyles.icon, currentStyles.marginRight5])
  }) : null, /*#__PURE__*/_react["default"].createElement("span", null, option.text));
};
//# sourceMappingURL=DropdownSelectOptions.js.map
