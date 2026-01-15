"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallingSettingsPanel = void 0;
exports.getCallingOptionName = getCallingOptionName;
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.includes.js");
var _CallingSettings = require("@ringcentral-integration/commons/modules/CallingSettings");
var _utils = require("@ringcentral-integration/utils");
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _clsx = _interopRequireDefault(require("clsx"));
require("rc-tooltip/assets/bootstrap_white.css");
var _react = _interopRequireWildcard(require("react"));
var _PageHeader = require("../BackHeader/PageHeader");
var _DropdownSelect = require("../DropdownSelect");
var _IconField = _interopRequireDefault(require("../IconField"));
var _InputField = _interopRequireDefault(require("../InputField"));
var _Panel = _interopRequireDefault(require("../Panel"));
var _Tooltip = require("../Rcui/Tooltip");
var _SaveButton = _interopRequireDefault(require("../SaveButton"));
var _SpinnerOverlay = require("../SpinnerOverlay");
var _Switch = _interopRequireDefault(require("../Switch"));
var _TextInput = _interopRequireDefault(require("../TextInput"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
var _excluded = ["className", "onBackButtonClick", "currentLocale", "showSpinner"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; } /* eslint-disable react/destructuring-assignment */
function getCallingOptionName(_ref) {
  var callingOption = _ref.callingOption,
    currentLocale = _ref.currentLocale,
    jupiterAppName = _ref.jupiterAppName,
    softphoneAppName = _ref.softphoneAppName;
  if (callingOption === _CallingSettings.callingOptions.softphone) {
    return softphoneAppName;
  }
  if (callingOption === _CallingSettings.callingOptions.jupiter) {
    return jupiterAppName;
  }
  if (callingOption === _CallingSettings.callingOptions.ringout) {
    // Not to translate
    return 'RingOut';
  }
  return _i18n["default"].getString(callingOption, currentLocale);
}
var CallWithSettings = function CallWithSettings(_ref2) {
  var callWith = _ref2.callWith,
    callWithOptions = _ref2.callWithOptions,
    currentLocale = _ref2.currentLocale,
    disabled = _ref2.disabled,
    onCallWithChange = _ref2.onCallWithChange,
    jupiterAppName = _ref2.jupiterAppName,
    softphoneAppName = _ref2.softphoneAppName;
  var tooltipContainerRef = (0, _react.useRef)(null);
  var valueRenderer = function valueRenderer(option) {
    var optionName = getCallingOptionName({
      callingOption: option,
      currentLocale: currentLocale,
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
      currentLocale: currentLocale,
      jupiterAppName: jupiterAppName,
      softphoneAppName: softphoneAppName
    });
    return /*#__PURE__*/_react["default"].createElement("span", {
      "data-sign": "option_".concat(optionName)
    }, optionName);
  };
  var keys = ["".concat(callWith, "Tooltip")];
  if (callWith !== _CallingSettings.callingOptions.browser && callWith !== _CallingSettings.callingOptions.softphone && callWith !== _CallingSettings.callingOptions.jupiter) {
    keys.push("".concat(callWith, "Tooltip1"));
  }
  var optionName = getCallingOptionName({
    callingOption: callWith,
    currentLocale: currentLocale,
    jupiterAppName: jupiterAppName,
    softphoneAppName: softphoneAppName
  });
  return /*#__PURE__*/_react["default"].createElement(_InputField["default"], {
    label: /*#__PURE__*/_react["default"].createElement("span", {
      "data-sign": "callSettingInfo"
    }, _i18n["default"].getString('makeCallsWith', currentLocale), /*#__PURE__*/_react["default"].createElement(_Tooltip.Tooltip, {
      title: keys.map(function (key) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          key: key
        }, (0, _utils.format)(_i18n["default"].getString(key, currentLocale), {
          brand: optionName
        }));
      })
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcIcon, {
      size: "small",
      symbol: _junoIcon.InfoBorder,
      className: _styles["default"].tooltipIcon
    })))
  }, /*#__PURE__*/_react["default"].createElement(_DropdownSelect.DropdownSelect, {
    dataSign: "callingSetting",
    dropdownClassName: _styles["default"].overWidth,
    className: _styles["default"].select,
    value: callWith,
    onChange: onCallWithChange,
    options: callWithOptions,
    dropdownAlign: "left",
    renderFunction: optionRenderer,
    renderValue: valueRenderer,
    valueFunction: function valueFunction(option) {
      return option;
    },
    disabled: disabled,
    titleEnabled: true
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].tooltipContainer,
    ref: tooltipContainerRef
  }));
};

// TODO: properly type available numbers

var RingoutSettings = function RingoutSettings(_ref3) {
  var currentLocale = _ref3.currentLocale,
    callWith = _ref3.callWith,
    availableNumbersWithLabel = _ref3.availableNumbersWithLabel,
    locationSearchable = _ref3.locationSearchable,
    myLocation = _ref3.myLocation,
    onMyLocationChange = _ref3.onMyLocationChange,
    onMyLocationTextChange = _ref3.onMyLocationTextChange,
    disabled = _ref3.disabled,
    ringoutPrompt = _ref3.ringoutPrompt,
    onRingoutPromptChange = _ref3.onRingoutPromptChange;
  if (callWith !== _CallingSettings.callingOptions.softphone && callWith !== _CallingSettings.callingOptions.browser && callWith !== _CallingSettings.callingOptions.jupiter) {
    return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].ringoutHint
    }, _i18n["default"].getString('ringoutHint', currentLocale)), /*#__PURE__*/_react["default"].createElement(_InputField["default"], {
      dataSign: "myLocation",
      label: _i18n["default"].getString('myLocationLabel', currentLocale)
    }, availableNumbersWithLabel ? /*#__PURE__*/_react["default"].createElement(_DropdownSelect.DropdownSelect, {
      className: (0, _clsx["default"])(_styles["default"].select, _styles["default"].locationSelect),
      value: myLocation,
      onChange: onMyLocationChange
      // @ts-expect-error TS(2322): Type '((option: string, text: string) => boolean) ... Remove this comment to see the full error message
      ,
      searchOption: locationSearchable ? function (option, text) {
        return option.includes(text);
      } : null,
      options: availableNumbersWithLabel,
      disabled: disabled,
      dropdownAlign: "left",
      titleEnabled: true,
      customInputEnabled: true,
      optionsWithLabel: true,
      customInputLimit: 30
    }) : /*#__PURE__*/_react["default"].createElement(_TextInput["default"], {
      dataSign: "myLocationInput",
      value: myLocation,
      maxLength: 30,
      onChange: onMyLocationTextChange
    })), /*#__PURE__*/_react["default"].createElement(_IconField["default"], {
      className: _styles["default"].iconField,
      icon: /*#__PURE__*/_react["default"].createElement(_Switch["default"], {
        dataSign: "ringoutPromptToggle",
        checked: ringoutPrompt,
        onChange: onRingoutPromptChange
      })
    }, _i18n["default"].getString('press1ToStartCallLabel', currentLocale)));
  }
  return null;
};
var CallingSettings = function CallingSettings(_ref4) {
  var availableNumbersWithLabel = _ref4.availableNumbersWithLabel,
    callWith = _ref4.callWith,
    callWithOptions = _ref4.callWithOptions,
    currentLocale = _ref4.currentLocale,
    _ref4$defaultRingoutP = _ref4.defaultRingoutPrompt,
    defaultRingoutPrompt = _ref4$defaultRingoutP === void 0 ? true : _ref4$defaultRingoutP,
    _ref4$disabled = _ref4.disabled,
    disabled = _ref4$disabled === void 0 ? false : _ref4$disabled,
    _ref4$locationSearcha = _ref4.locationSearchable,
    locationSearchable = _ref4$locationSearcha === void 0 ? false : _ref4$locationSearcha,
    myLocation = _ref4.myLocation,
    onSave = _ref4.onSave,
    ringoutPrompt = _ref4.ringoutPrompt,
    incomingAudio = _ref4.incomingAudio,
    incomingAudioFile = _ref4.incomingAudioFile,
    outgoingAudio = _ref4.outgoingAudio,
    outgoingAudioFile = _ref4.outgoingAudioFile,
    jupiterAppName = _ref4.jupiterAppName,
    softphoneAppName = _ref4.softphoneAppName;
  var _useState = (0, _react.useState)(callWith),
    _useState2 = _slicedToArray(_useState, 2),
    callWithState = _useState2[0],
    setCallWithState = _useState2[1];
  var _useState3 = (0, _react.useState)(ringoutPrompt),
    _useState4 = _slicedToArray(_useState3, 2),
    ringoutPromptState = _useState4[0],
    setRingoutPromptState = _useState4[1];
  var _useState5 = (0, _react.useState)(myLocation),
    _useState6 = _slicedToArray(_useState5, 2),
    myLocationState = _useState6[0],
    setMyLocationState = _useState6[1];
  var _useState7 = (0, _react.useState)(incomingAudio),
    _useState8 = _slicedToArray(_useState7, 2),
    incomingAudioState = _useState8[0],
    setIncomingAudioState = _useState8[1];
  var _useState9 = (0, _react.useState)(incomingAudioFile),
    _useState0 = _slicedToArray(_useState9, 2),
    incomingAudioFileState = _useState0[0],
    setIncomingAudioFileState = _useState0[1];
  var _useState1 = (0, _react.useState)(outgoingAudio),
    _useState10 = _slicedToArray(_useState1, 2),
    outgoingAudioState = _useState10[0],
    setOutgoingAudioState = _useState10[1];
  var _useState11 = (0, _react.useState)(outgoingAudioFile),
    _useState12 = _slicedToArray(_useState11, 2),
    outgoingAudioFileState = _useState12[0],
    setOutgoingAudioFileState = _useState12[1];
  (0, _react.useEffect)(function () {
    setCallWithState(callWith);
    setMyLocationState(myLocation);
    setRingoutPromptState(ringoutPrompt);
    setIncomingAudioState(incomingAudio);
    setIncomingAudioFileState(incomingAudioFile);
    setOutgoingAudioState(outgoingAudio);
    setOutgoingAudioFileState(outgoingAudioFile);
  }, [callWith, myLocation, ringoutPrompt, incomingAudio, incomingAudioFile, outgoingAudio, outgoingAudioFile]);
  var isSaveButtonDisabled = callWithState === callWith && myLocationState === myLocation && ringoutPromptState === ringoutPrompt && incomingAudioState === incomingAudio && incomingAudioFileState === incomingAudioFile && outgoingAudioState === outgoingAudio && outgoingAudioFileState === outgoingAudioFile || callWithState === _CallingSettings.callingOptions.ringout && !myLocationState;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(CallWithSettings, {
    callWith: callWithState,
    jupiterAppName: jupiterAppName,
    softphoneAppName: softphoneAppName,
    callWithOptions: callWithOptions,
    currentLocale: currentLocale,
    disabled: disabled,
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
  }), /*#__PURE__*/_react["default"].createElement(RingoutSettings, {
    currentLocale: currentLocale,
    callWith: callWithState,
    availableNumbersWithLabel: availableNumbersWithLabel,
    locationSearchable: locationSearchable,
    myLocation: myLocationState,
    onMyLocationChange: setMyLocationState,
    onMyLocationTextChange: function onMyLocationTextChange(_ref5) {
      var value = _ref5.target.value;
      setMyLocationState(value);
    },
    ringoutPrompt: ringoutPromptState,
    onRingoutPromptChange: setRingoutPromptState,
    disabled: disabled
  }), /*#__PURE__*/_react["default"].createElement(_SaveButton["default"], {
    currentLocale: currentLocale,
    onClick: function onClick() {
      onSave({
        callWith: callWithState,
        myLocation: myLocationState,
        ringoutPrompt: ringoutPromptState,
        isCustomLocation: !availableNumbersWithLabel.find(function (item) {
          return item.value === myLocationState;
        }),
        incomingAudio: incomingAudioState,
        incomingAudioFile: incomingAudioFileState,
        outgoingAudio: outgoingAudioState,
        outgoingAudioFile: outgoingAudioFileState
      });
    },
    disabled: isSaveButtonDisabled
  }));
};
var CallingSettingsPanel = exports.CallingSettingsPanel = function CallingSettingsPanel(_ref6) {
  var className = _ref6.className,
    onBackButtonClick = _ref6.onBackButtonClick,
    currentLocale = _ref6.currentLocale,
    _ref6$showSpinner = _ref6.showSpinner,
    showSpinner = _ref6$showSpinner === void 0 ? false : _ref6$showSpinner,
    props = _objectWithoutProperties(_ref6, _excluded);
  var content = showSpinner ? /*#__PURE__*/_react["default"].createElement(_SpinnerOverlay.SpinnerOverlay, null) : /*#__PURE__*/_react["default"].createElement(CallingSettings, _objectSpread(_objectSpread({}, props), {}, {
    currentLocale: currentLocale
  }));
  return /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "callingSettings",
    className: (0, _clsx["default"])(_styles["default"].root, className)
  }, /*#__PURE__*/_react["default"].createElement(_PageHeader.PageHeader, null, /*#__PURE__*/_react["default"].createElement(_PageHeader.PageHeaderBack, {
    onClick: onBackButtonClick
  }), /*#__PURE__*/_react["default"].createElement(_PageHeader.PageHeaderTitle, null, _i18n["default"].getString('title', currentLocale)), /*#__PURE__*/_react["default"].createElement(_PageHeader.PageHeaderRemain, null)), /*#__PURE__*/_react["default"].createElement(_Panel["default"], {
    className: _styles["default"].content
  }, content));
};
//# sourceMappingURL=CallingSettingsPanel.js.map
