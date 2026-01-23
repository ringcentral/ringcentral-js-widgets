"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FromField = void 0;
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.object.to-string.js");
var _components = require("@ringcentral-integration/micro-auth/src/app/components");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireWildcard(require("react"));
var _i18n = require("./i18n");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var PhoneNumber = function PhoneNumber(_ref) {
  var usageType = _ref.usageType,
    label = _ref.label,
    phoneNumber = _ref.phoneNumber;
  var usageTypeDom = label || usageType ? /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].usageType
  }, label || (usageType ? (0, _i18n.t)(usageType) : '')) : null;
  var formatPhone = (0, _components.useFormattedPhoneNumberFn)();
  return /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].phoneNumber
  }, usageTypeDom, /*#__PURE__*/_react["default"].createElement("span", {
    "data-sign": "phoneNumber"
  }, formatPhone(phoneNumber || '')));
};
// phone number formatting becomes expensive when there are lots of numbers
// memo makes this a pure component to reduce rendering cost
var FromField = exports.FromField = /*#__PURE__*/(0, _react.memo)(function FromField(_ref2) {
  var className = _ref2.className,
    _ref2$fromNumber = _ref2.fromNumber,
    fromNumber = _ref2$fromNumber === void 0 ? null : _ref2$fromNumber,
    fromNumbers = _ref2.fromNumbers,
    fromPlaceholder = _ref2.fromPlaceholder,
    _onChange = _ref2.onChange,
    hidden = _ref2.hidden,
    _ref2$disabled = _ref2.disabled,
    disabled = _ref2$disabled === void 0 ? false : _ref2$disabled,
    _ref2$showAnonymous = _ref2.showAnonymous,
    showAnonymous = _ref2$showAnonymous === void 0 ? true : _ref2$showAnonymous,
    showCustomPhoneLabel = _ref2.showCustomPhoneLabel;
  if (hidden) {
    return null;
  }
  var options = _toConsumableArray(fromNumbers);
  if (showAnonymous) {
    options.push({
      phoneNumber: 'anonymous'
    });
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: className
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Select, {
    className: "w-full",
    "data-sign": "dropdownSelect",
    variant: "outlined",
    size: "large",
    label: fromPlaceholder || (0, _i18n.t)('from'),
    value: fromNumber,
    disabled: disabled,
    renderValue: function renderValue(value) {
      if (value === 'anonymous') {
        return /*#__PURE__*/_react["default"].createElement("span", null, (0, _i18n.t)('Blocked'));
      }
      return /*#__PURE__*/_react["default"].createElement(PhoneNumber, {
        phoneNumber: value
      });
    },
    onChange: function onChange(e) {
      return _onChange({
        phoneNumber: e.target.value
      });
    }
  }, options.map(function (_ref3) {
    var phoneNumber = _ref3.phoneNumber,
      label = _ref3.label,
      usageType = _ref3.usageType;
    return /*#__PURE__*/_react["default"].createElement(_springUi.Option, {
      "data-sign": "selectMenuItem",
      key: phoneNumber,
      value: phoneNumber
    }, phoneNumber === 'anonymous' ? /*#__PURE__*/_react["default"].createElement("span", null, (0, _i18n.t)('Blocked')) : /*#__PURE__*/_react["default"].createElement(PhoneNumber, {
      phoneNumber: phoneNumber,
      usageType: usageType,
      label: showCustomPhoneLabel ? label : undefined
    }));
  })));
});
//# sourceMappingURL=FromField.js.map
