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
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.assign.js");
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
exports.CallingSettingsPanel = void 0;
exports.getCallingOptionName = getCallingOptionName;
exports.getCallingOptionTooltip = getCallingOptionTooltip;
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.object.to-string.js");
var _components = require("@ringcentral-integration/micro-core/src/app/components");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _callingOptions = require("@ringcentral-integration/micro-phone/src/app/services/CallingSettings/callingOptions");
var _components2 = require("@ringcentral-integration/next-widgets/components");
var _reactHooks = require("@ringcentral-integration/react-hooks");
var _springIcon = require("@ringcentral/spring-icon");
var _springUi = require("@ringcentral/spring-ui");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _i18n = _interopRequireWildcard(require("./i18n"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; } /* eslint-disable react/destructuring-assignment */
function getCallingOptionName(_ref) {
  var callingOption = _ref.callingOption,
    jupiterAppName = _ref.jupiterAppName,
    softphoneAppName = _ref.softphoneAppName;
  if (callingOption === _callingOptions.callingOptions.softphone) {
    return softphoneAppName;
  }
  if (callingOption === _callingOptions.callingOptions.jupiter) {
    return jupiterAppName;
  }
  if (callingOption === _callingOptions.callingOptions.ringout) {
    // Not to translate
    return 'RingOut';
  }
  return (0, _i18n.t)('browser');
}
function getCallingOptionTooltip(_ref2) {
  var callWith = _ref2.callWith,
    softphoneAppName = _ref2.softphoneAppName,
    jupiterAppName = _ref2.jupiterAppName;
  if (callWith === _callingOptions.callingOptions.browser) {
    return (0, _i18n.t)('browserTooltip');
  }
  if (callWith === _callingOptions.callingOptions.softphone) {
    return (0, _i18n.t)('softphoneTooltip', {
      appName: softphoneAppName
    });
  }
  if (callWith === _callingOptions.callingOptions.jupiter) {
    return (0, _i18n.t)('jupiterTooltip', {
      appName: jupiterAppName
    });
  }

  // ringout
  return (0, _i18n.t)('ringoutTooltip');
}
var CallWithSettings = function CallWithSettings(_ref3) {
  var callWith = _ref3.callWith,
    callWithOptions = _ref3.callWithOptions,
    disabled = _ref3.disabled,
    onCallWithChange = _ref3.onCallWithChange,
    softphoneAppName = _ref3.softphoneAppName,
    jupiterAppName = _ref3.jupiterAppName;
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  var valueRenderer = function valueRenderer(option) {
    var optionName = getCallingOptionName({
      callingOption: option,
      jupiterAppName: jupiterAppName,
      softphoneAppName: softphoneAppName
    });
    return /*#__PURE__*/_react["default"].createElement("span", {
      "data-sign": "selected_".concat(optionName)
    }, optionName);
  };
  var optionRenderer = function optionRenderer(option) {
    var optionName = getCallingOptionName({
      callingOption: option,
      jupiterAppName: jupiterAppName,
      softphoneAppName: softphoneAppName
    });
    return /*#__PURE__*/_react["default"].createElement("span", {
      "data-sign": "option_".concat(optionName)
    }, optionName);
  };
  var TooltipContent = getCallingOptionTooltip({
    callWith: callWith,
    softphoneAppName: softphoneAppName,
    jupiterAppName: jupiterAppName
  });
  return /*#__PURE__*/_react["default"].createElement(_springUi.Select, {
    label: /*#__PURE__*/_react["default"].createElement("span", {
      "data-sign": "callSettingInfo",
      className: "flex items-center gap-1 mb-3"
    }, t('makeCallsWith'), /*#__PURE__*/_react["default"].createElement(_springUi.Tooltip, {
      classes: {
        // allow line break with \n
        content: 'whitespace-pre-wrap'
      },
      title: TooltipContent
    }, /*#__PURE__*/_react["default"].createElement(_springUi.Icon, {
      size: "small",
      "data-sign": "callSettingInfoIcon",
      symbol: _springIcon.InfoMd,
      onClick: function onClick(e) {
        e.preventDefault();
      }
    }))),
    "data-sign": "callingSetting",
    value: callWith,
    renderValue: valueRenderer,
    size: "large",
    variant: "outlined",
    disabled: disabled,
    onChange: function onChange(e) {
      return onCallWithChange(e.target.value);
    }
  }, callWithOptions.map(function (option) {
    return /*#__PURE__*/_react["default"].createElement(_springUi.Option, {
      "data-sign": "selectMenuItem",
      key: option,
      value: option
    }, optionRenderer(option));
  }));
};

// TODO: properly type available numbers

var RingoutSettings = function RingoutSettings(_ref4) {
  var availableNumbersWithLabel = _ref4.availableNumbersWithLabel,
    locationSearchable = _ref4.locationSearchable,
    myLocation = _ref4.myLocation,
    onMyLocationChange = _ref4.onMyLocationChange,
    disabled = _ref4.disabled,
    ringoutPrompt = _ref4.ringoutPrompt,
    onRingoutPromptChange = _ref4.onRingoutPromptChange;
  var _useLocale2 = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale2.t;
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "py-4 typography-mainText"
  }, t('ringoutHint')), /*#__PURE__*/_react["default"].createElement(_components2.SelectableTextField, {
    RootProps: {
      'data-sign': 'myLocation'
    },
    classes: {
      label: 'mb-3'
    },
    size: "large",
    "data-sign": "myLocationInput",
    label: t('myLocationLabel'),
    options: availableNumbersWithLabel,
    value: myLocation,
    onChange: onMyLocationChange,
    maxLength: 30,
    "data-sig": "myLocationInput",
    disabled: disabled,
    searchable: locationSearchable,
    freeSoloOptionLabel: t('custom')
  }), /*#__PURE__*/_react["default"].createElement(_springUi.FormLabel, {
    label: /*#__PURE__*/_react["default"].createElement("span", {
      className: "typography-mainText"
    }, t('press1ToStartCallLabel')),
    placement: "start",
    className: "mt-4"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Switch, {
    className: "flex-none",
    "data-sign": "ringoutPromptToggle",
    checked: ringoutPrompt,
    onChange: function onChange(e) {
      return onRingoutPromptChange(e.target.checked);
    }
  })));
};
var CallingSettingsPanel = exports.CallingSettingsPanel = function CallingSettingsPanel(props) {
  var className = props.className,
    onBackButtonClick = props.onBackButtonClick,
    availableNumbersWithLabel = props.availableNumbersWithLabel,
    callWith = props.callWith,
    _props$defaultRingout = props.defaultRingoutPrompt,
    defaultRingoutPrompt = _props$defaultRingout === void 0 ? true : _props$defaultRingout,
    _props$disabled = props.disabled,
    disabled = _props$disabled === void 0 ? false : _props$disabled,
    _props$locationSearch = props.locationSearchable,
    locationSearchable = _props$locationSearch === void 0 ? false : _props$locationSearch,
    myLocation = props.myLocation,
    onSave = props.onSave,
    ringoutPrompt = props.ringoutPrompt;
  var _useAsyncState = (0, _reactHooks.useAsyncState)(callWith, function (val) {
      onSave({
        callWith: val
      });
    }),
    _useAsyncState2 = _slicedToArray(_useAsyncState, 2),
    callWithState = _useAsyncState2[0],
    setCallWithState = _useAsyncState2[1];
  var _useAsyncState3 = (0, _reactHooks.useAsyncState)(ringoutPrompt, function (val) {
      onSave({
        ringoutPrompt: val
      });
    }),
    _useAsyncState4 = _slicedToArray(_useAsyncState3, 2),
    ringoutPromptState = _useAsyncState4[0],
    setRingoutPromptState = _useAsyncState4[1];
  var _useAsyncState5 = (0, _reactHooks.useAsyncState)(myLocation, function (val) {
      onSave({
        myLocation: val
      });
    }),
    _useAsyncState6 = _slicedToArray(_useAsyncState5, 2),
    myLocationState = _useAsyncState6[0],
    setMyLocationState = _useAsyncState6[1];
  var _useLocale3 = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale3.t;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_components.AppHeaderNav, {
    override: true
  }, /*#__PURE__*/_react["default"].createElement(_components2.PageHeader, {
    onBackClick: onBackButtonClick
  }, t('title'))), /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "callingSettings",
    className: (0, _clsx["default"])('flex-auto overflow-y-auto overflow-x-hidden px-4 py-2', className)
  }, /*#__PURE__*/_react["default"].createElement(CallWithSettings, _extends({}, props, {
    callWith: callWithState,
    onCallWithChange: function onCallWithChange(newCallWith) {
      setCallWithState(newCallWith);
      if (newCallWith === callWith) {
        setMyLocationState(myLocation);
        setRingoutPromptState(ringoutPrompt);
      } else {
        var _availableNumbersWith;
        // * when callWith changed, set myLocation to be the first available number
        setMyLocationState((availableNumbersWithLabel === null || availableNumbersWithLabel === void 0 ? void 0 : (_availableNumbersWith = availableNumbersWithLabel[0]) === null || _availableNumbersWith === void 0 ? void 0 : _availableNumbersWith.value) || '');
        setRingoutPromptState(defaultRingoutPrompt);
      }
    }
  })), callWithState === _callingOptions.callingOptions.ringout && /*#__PURE__*/_react["default"].createElement(RingoutSettings, {
    availableNumbersWithLabel: availableNumbersWithLabel,
    locationSearchable: locationSearchable,
    myLocation: myLocationState,
    onMyLocationChange: setMyLocationState,
    ringoutPrompt: ringoutPromptState,
    onRingoutPromptChange: setRingoutPromptState,
    disabled: disabled
  })), /*#__PURE__*/_react["default"].createElement(_components.AppFooterNav, null));
};
//# sourceMappingURL=CallingSettingsPanel.js.map
