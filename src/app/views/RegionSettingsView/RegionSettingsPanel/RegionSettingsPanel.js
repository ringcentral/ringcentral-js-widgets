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
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RegionSettingsPanel = void 0;
exports.formatCountryDisplay = formatCountryDisplay;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
var _components = require("@ringcentral-integration/micro-core/src/app/components");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _components2 = require("@ringcentral-integration/next-widgets/components");
var _reactHooks = require("@ringcentral-integration/react-hooks");
var _countryNames = _interopRequireDefault(require("@ringcentral-integration/widgets/lib/countryNames"));
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireWildcard(require("react"));
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function formatCountryDisplay(callingCode, countryName) {
  return "(+".concat(callingCode, ") ").concat(countryName);
}
var RegionSettingsPanel = exports.RegionSettingsPanel = function RegionSettingsPanel(_ref) {
  var onBackButtonClick = _ref.onBackButtonClick,
    availableCountries = _ref.availableCountries,
    countryCode = _ref.countryCode,
    areaCode = _ref.areaCode,
    onSave = _ref.onSave,
    canAreaCodeShow = _ref.canAreaCodeShow;
  var _useAsyncState = (0, _reactHooks.useAsyncState)(countryCode, function (value) {
      return onSave === null || onSave === void 0 ? void 0 : onSave({
        countryCode: value,
        // when areaCode is change, always reset areaCode to empty
        areaCode: ''
      });
    }),
    _useAsyncState2 = _slicedToArray(_useAsyncState, 2),
    countryCodeValue = _useAsyncState2[0],
    setCountryCodeValue = _useAsyncState2[1];
  var canAreaCodeShowResult = (canAreaCodeShow === null || canAreaCodeShow === void 0 ? void 0 : canAreaCodeShow(countryCodeValue)) || false;
  var _useAsyncState3 = (0, _reactHooks.useAsyncState)(areaCode, function (value) {
      return onSave === null || onSave === void 0 ? void 0 : onSave({
        areaCode: value
      });
    }),
    _useAsyncState4 = _slicedToArray(_useAsyncState3, 2),
    areaCodeValue = _useAsyncState4[0],
    setAreaCodeValue = _useAsyncState4[1];
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"], _countryNames["default"]),
    t = _useLocale.t;
  var onAreaCodeChange = function onAreaCodeChange(e) {
    var value = e.target.value.replace(/[^\d]/g, '');
    setAreaCodeValue(value);
  };
  var renderValue = function renderValue(value) {
    var selectedOption = availableCountries.find(function (country) {
      return country.isoCode === value;
    });
    if (!selectedOption) return '';
    return formatCountryDisplay(selectedOption.callingCode, t(selectedOption.isoCode));
  };
  var hasNA = (0, _react.useMemo)(function () {
    return !!availableCountries.find(function (c) {
      return c.isoCode === 'US';
    }) || !!availableCountries.find(function (c) {
      return c.isoCode === 'CA';
    });
  }, [availableCountries]);
  var message = (0, _react.useMemo)(function () {
    if (availableCountries.length > 1) {
      return t(hasNA ? 'MultiWithNAMessage' : 'MultiWithoutNAMessage');
    }
    if (hasNA) {
      return t('NAOnlyMessage');
    }
    return undefined;
  }, [availableCountries.length, hasNA, t]);
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_components.AppHeaderNav, {
    override: true
  }, /*#__PURE__*/_react["default"].createElement(_components2.PageHeader, {
    onBackClick: onBackButtonClick
  }, t('title'))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-auto overflow-y-auto overflow-x-hidden px-4 py-2"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "countryCodeHint",
    className: "pb-2 typography-subtitle"
  }, message), /*#__PURE__*/_react["default"].createElement(_springUi.Select, {
    label: t('country'),
    value: countryCodeValue,
    renderValue: renderValue,
    size: "large",
    "data-sign": "countryCodeSelect",
    variant: "outlined",
    onChange: function onChange(e) {
      return setCountryCodeValue(e.target.value);
    }
  }, availableCountries.map(function (option) {
    return /*#__PURE__*/_react["default"].createElement(_springUi.Option, {
      "data-sign": "selectMenuItem",
      "data-value": option.isoCode,
      key: option.isoCode,
      value: option.isoCode
    }, formatCountryDisplay(option.callingCode, t(option.isoCode)));
  })), canAreaCodeShowResult && /*#__PURE__*/_react["default"].createElement(_springUi.TextField, {
    label: t('areaCode'),
    fullWidth: true,
    size: "medium",
    variant: "outlined",
    inputProps: {
      'data-sign': 'areaCodeInputField'
    },
    placeholder: t('areaCodePlaceholder'),
    value: areaCodeValue,
    onChange: onAreaCodeChange
  })), /*#__PURE__*/_react["default"].createElement(_components.AppFooterNav, null));
};
//# sourceMappingURL=RegionSettingsPanel.js.map
