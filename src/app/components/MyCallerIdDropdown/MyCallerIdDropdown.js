"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MyCallerIdDropdown = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.find-index.js");
var _components = require("@ringcentral-integration/micro-auth/src/app/components");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireWildcard(require("react"));
var _i18n = _interopRequireDefault(require("../../hooks/useContactRenderInfo/i18n"));
var _i18n2 = _interopRequireDefault(require("./i18n"));
var _excluded = ["showAnonymous", "value", "options"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var MyCallerIdDropdown = exports.MyCallerIdDropdown = function MyCallerIdDropdown(_ref) {
  var showAnonymous = _ref.showAnonymous,
    fromNumber = _ref.value,
    fromNumbers = _ref.options,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useLocale = (0, _hooks.useLocale)(_i18n2["default"], _i18n["default"]),
    t = _useLocale.t;
  var anonymousCallerLabel = t('Blocked');
  var renderValue = function renderValue(option) {
    var isAnonymousCaller = option.phoneNumber === 'anonymous';
    var primaryText = isAnonymousCaller ? anonymousCallerLabel : option.label || option.usageType && t(option.usageType);
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex flex-col"
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: "typography-subtitle truncate",
      title: primaryText
    }, primaryText), !isAnonymousCaller && /*#__PURE__*/_react["default"].createElement("span", {
      "data-sign": "phoneNumber",
      className: "typography-subtitleMini text-neutral-b2 truncate"
    }, /*#__PURE__*/_react["default"].createElement(_components.FormattedPhoneNumber, {
      phoneNumber: option.phoneNumber
    })));
  };
  var options = (0, _react.useMemo)(function () {
    if (showAnonymous) {
      return [].concat(_toConsumableArray(fromNumbers), [{
        phoneNumber: 'anonymous'
      }]);
    }
    return fromNumbers;
  }, [fromNumbers, showAnonymous]);
  return /*#__PURE__*/_react["default"].createElement(_springUi.Dropdown, _extends({
    rootProps: {
      title: t('myCallerId')
    },
    label: t('myCallerId')
  }, rest, {
    buttonProps: {
      'data-sign': 'callFrom'
    },
    MenuProps: {
      PopperProps: {
        padding: 16
      }
    },
    placeholder: "Select a caller ID",
    getSelectedIndex: function getSelectedIndex(value) {
      var index = options.findIndex(function (v) {
        return v.phoneNumber === value;
      });
      if (process.env.NODE_ENV !== 'production') {
        if (index === -1) {
          console.error("[MyCallerIdDropdown] The fromNumber \"".concat(value, "\" is not in the fromNumbers list should figure out why that happened"), {
            value: value,
            fromNumber: fromNumber,
            fromNumbers: fromNumbers
          });
        }
      }
      return index !== -1 ? index : 0;
    },
    value: fromNumber,
    renderValue: function renderValue(phoneNumber) {
      return phoneNumber === 'anonymous' ? anonymousCallerLabel : /*#__PURE__*/_react["default"].createElement(_components.FormattedPhoneNumber, {
        phoneNumber: phoneNumber
      });
    },
    data: options
  }), function (_, option) {
    return /*#__PURE__*/_react["default"].createElement(_springUi.Option, {
      classes: {
        container: '[&&]:h-12'
      },
      key: option.phoneNumber,
      value: option.phoneNumber
    }, /*#__PURE__*/_react["default"].createElement(_springUi.MenuItemText, null, renderValue(option)));
  });
};
//# sourceMappingURL=MyCallerIdDropdown.js.map
