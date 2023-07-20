"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.find");
require("core-js/modules/es.array.includes");
require("core-js/modules/es.array.is-array");
require("core-js/modules/es.array.map");
require("core-js/modules/es.string.includes");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallingSettingsPanel = void 0;
exports.getCallingOptionName = getCallingOptionName;
require("rc-tooltip/assets/bootstrap_white.css");
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _CallingSettings = require("@ringcentral-integration/commons/modules/CallingSettings");
var _utils = require("@ringcentral-integration/utils");
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _BackHeader = _interopRequireDefault(require("../BackHeader"));
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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; } /* eslint-disable react/destructuring-assignment */
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
  var optionRenderer = function optionRenderer(option) {
    var optionName = getCallingOptionName({
      callingOption: option,
      currentLocale: currentLocale,
      jupiterAppName: jupiterAppName,
      softphoneAppName: softphoneAppName
    });
    return optionName;
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
    renderValue: optionRenderer,
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
      className: (0, _classnames["default"])(_styles["default"].select, _styles["default"].locationSelect),
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
    _ref4$showRingToneSet = _ref4.showRingToneSettings,
    showRingToneSettings = _ref4$showRingToneSet === void 0 ? false : _ref4$showRingToneSet,
    incomingAudio = _ref4.incomingAudio,
    incomingAudioFile = _ref4.incomingAudioFile,
    outgoingAudio = _ref4.outgoingAudio,
    outgoingAudioFile = _ref4.outgoingAudioFile,
    defaultIncomingAudio = _ref4.defaultIncomingAudio,
    defaultIncomingAudioFile = _ref4.defaultIncomingAudioFile,
    defaultOutgoingAudio = _ref4.defaultOutgoingAudio,
    defaultOutgoingAudioFile = _ref4.defaultOutgoingAudioFile,
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
    _useState10 = _slicedToArray(_useState9, 2),
    incomingAudioFileState = _useState10[0],
    setIncomingAudioFileState = _useState10[1];
  var _useState11 = (0, _react.useState)(outgoingAudio),
    _useState12 = _slicedToArray(_useState11, 2),
    outgoingAudioState = _useState12[0],
    setOutgoingAudioState = _useState12[1];
  var _useState13 = (0, _react.useState)(outgoingAudioFile),
    _useState14 = _slicedToArray(_useState13, 2),
    outgoingAudioFileState = _useState14[0],
    setOutgoingAudioFileState = _useState14[1];
  (0, _react.useEffect)(function () {
    setCallWithState(callWith);
    setMyLocationState(myLocation);
    setRingoutPromptState(ringoutPrompt);
    setIncomingAudioState(incomingAudio);
    setIncomingAudioFileState(incomingAudioFile);
    setOutgoingAudioState(outgoingAudio);
    setOutgoingAudioFileState(outgoingAudioFile);
  }, [callWith, myLocation, ringoutPrompt, incomingAudio, incomingAudioFile, outgoingAudio, outgoingAudioFile]);
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
    disabled: callWithState === callWith && myLocationState === myLocation && ringoutPromptState === ringoutPrompt && incomingAudioState === incomingAudio && incomingAudioFileState === incomingAudioFile && outgoingAudioState === outgoingAudio && outgoingAudioFileState === outgoingAudioFile || callWithState === _CallingSettings.callingOptions.ringout && !myLocationState
  }));
};
var CallingSettingsPanel = function CallingSettingsPanel(_ref6) {
  var className = _ref6.className,
    onBackButtonClick = _ref6.onBackButtonClick,
    currentLocale = _ref6.currentLocale,
    _ref6$showSpinner = _ref6.showSpinner,
    showSpinner = _ref6$showSpinner === void 0 ? false : _ref6$showSpinner,
    props = _objectWithoutProperties(_ref6, ["className", "onBackButtonClick", "currentLocale", "showSpinner"]);
  var content = showSpinner ? /*#__PURE__*/_react["default"].createElement(_SpinnerOverlay.SpinnerOverlay, null) : /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(CallingSettings, _objectSpread(_objectSpread({}, props), {}, {
    currentLocale: currentLocale
  })));
  return /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "callingSettings",
    className: (0, _classnames["default"])(_styles["default"].root, className)
  }, /*#__PURE__*/_react["default"].createElement(_BackHeader["default"], {
    onBackClick: onBackButtonClick
  }, _i18n["default"].getString('title', currentLocale)), /*#__PURE__*/_react["default"].createElement(_Panel["default"], {
    className: _styles["default"].content
  }, content));
};
exports.CallingSettingsPanel = CallingSettingsPanel;
//# sourceMappingURL=CallingSettingsPanel.js.map
