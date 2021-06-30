"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getJupiterAppName = getJupiterAppName;
exports.getSoftphoneAppName = getSoftphoneAppName;
exports.getCallingOptionName = getCallingOptionName;
exports.CallingSettingsPanel = void 0;

require("core-js/modules/es6.array.find");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.array.map");

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _formatMessage = _interopRequireDefault(require("format-message"));

var _callingOptions = _interopRequireDefault(require("@ringcentral-integration/commons/modules/CallingSettings/callingOptions"));

var _rcTooltip = _interopRequireDefault(require("rc-tooltip"));

require("rc-tooltip/assets/bootstrap_white.css");

var _Info = _interopRequireDefault(require("../../assets/images/Info.svg"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _SpinnerOverlay = require("../SpinnerOverlay");

var _BackHeader = _interopRequireDefault(require("../BackHeader"));

var _Panel = _interopRequireDefault(require("../Panel"));

var _Switch = _interopRequireDefault(require("../Switch"));

var _IconField = _interopRequireDefault(require("../IconField"));

var _InputField = _interopRequireDefault(require("../InputField"));

var _TextInput = _interopRequireDefault(require("../TextInput"));

var _DropdownSelect = _interopRequireDefault(require("../DropdownSelect"));

var _SaveButton = _interopRequireDefault(require("../SaveButton"));

var _Ringtone = require("../Ringtone");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var TooltipBaseComp = typeof _rcTooltip["default"] === 'function' ? _rcTooltip["default"] : _rcTooltip["default"]["default"];

function getJupiterAppName(_ref) {
  var brandCode = _ref.brandCode,
      brandName = _ref.brandName,
      shortBrandName = _ref.shortBrandName,
      fullBrandName = _ref.fullBrandName;

  switch (brandCode) {
    case 'att':
      return fullBrandName;

    case 'telus':
      return "".concat(shortBrandName, " App");

    default:
      return "".concat(brandName, " App");
  }
}

function getSoftphoneAppName(_ref2) {
  var brandCode = _ref2.brandCode,
      brandName = _ref2.brandName,
      shortBrandName = _ref2.shortBrandName,
      fullBrandName = _ref2.fullBrandName;

  switch (brandCode) {
    case 'att':
      return "".concat(fullBrandName, " Phone");

    case 'telus':
      return "".concat(shortBrandName, " Phone");

    default:
      return "".concat(brandName, " Phone");
  }
}

function getCallingOptionName(_ref3) {
  var callingOption = _ref3.callingOption,
      brandCode = _ref3.brandCode,
      brandName = _ref3.brandName,
      shortBrandName = _ref3.shortBrandName,
      fullBrandName = _ref3.fullBrandName,
      currentLocale = _ref3.currentLocale;

  if (callingOption === _callingOptions["default"].softphone) {
    return getSoftphoneAppName({
      brandCode: brandCode,
      brandName: brandName,
      shortBrandName: shortBrandName,
      fullBrandName: fullBrandName
    });
  }

  if (callingOption === _callingOptions["default"].jupiter) {
    return getJupiterAppName({
      brandCode: brandCode,
      brandName: brandName,
      shortBrandName: shortBrandName,
      fullBrandName: fullBrandName
    });
  }

  if (callingOption === _callingOptions["default"].ringout) {
    // Not to translate
    return 'RingOut';
  }

  return _i18n["default"].getString(callingOption, currentLocale);
}

var Tooltip = function Tooltip(_ref4) {
  var brandCode = _ref4.brandCode,
      brandName = _ref4.brandName,
      callWith = _ref4.callWith,
      currentLocale = _ref4.currentLocale,
      tooltipContainerRef = _ref4.tooltipContainerRef,
      shortBrandName = _ref4.shortBrandName,
      fullBrandName = _ref4.fullBrandName;
  var keys = ["".concat(callWith, "Tooltip")];

  if (callWith !== _callingOptions["default"].browser && callWith !== _callingOptions["default"].softphone && callWith !== _callingOptions["default"].jupiter) {
    keys.push("".concat(callWith, "Tooltip1"));
  }

  var optionName = getCallingOptionName({
    callingOption: callWith,
    brandCode: brandCode,
    brandName: brandName,
    currentLocale: currentLocale,
    shortBrandName: shortBrandName,
    fullBrandName: fullBrandName
  });

  var overlay = /*#__PURE__*/_react["default"].createElement("div", null, keys.map(function (key) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: key
    }, (0, _formatMessage["default"])(_i18n["default"].getString(key, currentLocale), {
      brand: optionName
    }));
  }));

  return /*#__PURE__*/_react["default"].createElement(TooltipBaseComp, {
    placement: "bottom",
    trigger: "click",
    overlay: overlay,
    align: {
      offset: [0, 47]
    },
    arrowContent: /*#__PURE__*/_react["default"].createElement("div", {
      className: "rc-tooltip-arrow-inner"
    }),
    getTooltipContainer: function getTooltipContainer() {
      return tooltipContainerRef.current;
    }
  }, /*#__PURE__*/_react["default"].createElement(_Info["default"], {
    width: 14,
    height: 14,
    className: _styles["default"].infoIcon
  }));
};

var CallWithSettings = function CallWithSettings(_ref5) {
  var brandCode = _ref5.brandCode,
      brandName = _ref5.brandName,
      shortBrandName = _ref5.shortBrandName,
      fullBrandName = _ref5.fullBrandName,
      callWith = _ref5.callWith,
      callWithOptions = _ref5.callWithOptions,
      currentLocale = _ref5.currentLocale,
      disabled = _ref5.disabled,
      onCallWithChange = _ref5.onCallWithChange;
  var tooltipContainerRef = (0, _react.useRef)(null);

  var optionRenderer = function optionRenderer(option) {
    var optionName = getCallingOptionName({
      callingOption: option,
      brandCode: brandCode,
      brandName: brandName,
      currentLocale: currentLocale,
      shortBrandName: shortBrandName,
      fullBrandName: fullBrandName
    });
    return optionName;
  };

  return /*#__PURE__*/_react["default"].createElement(_InputField["default"], {
    label: /*#__PURE__*/_react["default"].createElement("span", null, _i18n["default"].getString('makeCallsWith', currentLocale), /*#__PURE__*/_react["default"].createElement(Tooltip, {
      brandCode: brandCode,
      brandName: brandName,
      callWith: callWith,
      currentLocale: currentLocale,
      tooltipContainerRef: tooltipContainerRef,
      shortBrandName: shortBrandName,
      fullBrandName: fullBrandName
    }))
  }, /*#__PURE__*/_react["default"].createElement(_DropdownSelect["default"], {
    dataSign: "callingSetting",
    className: _styles["default"].select,
    value: callWith,
    onChange: onCallWithChange,
    options: callWithOptions,
    dropdownAlign: "left",
    renderFunction: optionRenderer,
    renderValue: optionRenderer,
    disabled: disabled,
    titleEnabled: true
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].tooltipContainer,
    ref: tooltipContainerRef
  }));
}; // TODO properly type available numbers


var RingoutSettings = function RingoutSettings(_ref6) {
  var currentLocale = _ref6.currentLocale,
      callWith = _ref6.callWith,
      availableNumbersWithLabel = _ref6.availableNumbersWithLabel,
      locationSearchable = _ref6.locationSearchable,
      myLocation = _ref6.myLocation,
      onMyLocationChange = _ref6.onMyLocationChange,
      onMyLocationTextChange = _ref6.onMyLocationTextChange,
      disabled = _ref6.disabled,
      ringoutPrompt = _ref6.ringoutPrompt,
      onRingoutPromptChange = _ref6.onRingoutPromptChange;

  if (callWith !== _callingOptions["default"].softphone && callWith !== _callingOptions["default"].browser && callWith !== _callingOptions["default"].jupiter) {
    return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].ringoutHint
    }, _i18n["default"].getString('ringoutHint', currentLocale)), /*#__PURE__*/_react["default"].createElement(_InputField["default"], {
      dataSign: "myLocation",
      label: _i18n["default"].getString('myLocationLabel', currentLocale)
    }, availableNumbersWithLabel ? /*#__PURE__*/_react["default"].createElement(_DropdownSelect["default"], {
      className: (0, _classnames["default"])(_styles["default"].select, _styles["default"].locationSelect),
      value: myLocation,
      onChange: onMyLocationChange,
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

var CallingSettings = function CallingSettings(_ref7) {
  var brandCode = _ref7.brandCode,
      brandName = _ref7.brandName,
      availableNumbersWithLabel = _ref7.availableNumbersWithLabel,
      callWith = _ref7.callWith,
      callWithOptions = _ref7.callWithOptions,
      currentLocale = _ref7.currentLocale,
      _ref7$defaultRingoutP = _ref7.defaultRingoutPrompt,
      defaultRingoutPrompt = _ref7$defaultRingoutP === void 0 ? true : _ref7$defaultRingoutP,
      _ref7$disabled = _ref7.disabled,
      disabled = _ref7$disabled === void 0 ? false : _ref7$disabled,
      _ref7$locationSearcha = _ref7.locationSearchable,
      locationSearchable = _ref7$locationSearcha === void 0 ? false : _ref7$locationSearcha,
      myLocation = _ref7.myLocation,
      onSave = _ref7.onSave,
      ringoutPrompt = _ref7.ringoutPrompt,
      _ref7$showRingToneSet = _ref7.showRingToneSettings,
      showRingToneSettings = _ref7$showRingToneSet === void 0 ? false : _ref7$showRingToneSet,
      incomingAudio = _ref7.incomingAudio,
      incomingAudioFile = _ref7.incomingAudioFile,
      outgoingAudio = _ref7.outgoingAudio,
      outgoingAudioFile = _ref7.outgoingAudioFile,
      defaultIncomingAudio = _ref7.defaultIncomingAudio,
      defaultIncomingAudioFile = _ref7.defaultIncomingAudioFile,
      defaultOutgoingAudio = _ref7.defaultOutgoingAudio,
      defaultOutgoingAudioFile = _ref7.defaultOutgoingAudioFile,
      shortBrandName = _ref7.shortBrandName,
      fullBrandName = _ref7.fullBrandName;

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
    brandCode: brandCode,
    brandName: brandName,
    callWith: callWithState,
    callWithOptions: callWithOptions,
    currentLocale: currentLocale,
    disabled: disabled,
    shortBrandName: shortBrandName,
    fullBrandName: fullBrandName,
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
    onMyLocationTextChange: function onMyLocationTextChange(_ref8) {
      var value = _ref8.target.value;
      setMyLocationState(value);
    },
    ringoutPrompt: ringoutPromptState,
    onRingoutPromptChange: setRingoutPromptState,
    disabled: disabled
  }), /*#__PURE__*/_react["default"].createElement(_Ringtone.RingTone, {
    currentLocale: currentLocale,
    showRingToneSettings: showRingToneSettings && callWithState === _callingOptions["default"].browser,
    incomingAudio: incomingAudioState,
    incomingAudioFile: incomingAudioFileState,
    outgoingAudio: outgoingAudioState,
    outgoingAudioFile: outgoingAudioFileState,
    defaultIncomingAudio: defaultIncomingAudio,
    defaultIncomingAudioFile: defaultIncomingAudioFile,
    defaultOutgoingAudio: defaultOutgoingAudio,
    defaultOutgoingAudioFile: defaultOutgoingAudioFile,
    setIncomingAudio: function setIncomingAudio(_ref9) {
      var fileName = _ref9.fileName,
          dataUrl = _ref9.dataUrl;
      setIncomingAudioState(dataUrl);
      setIncomingAudioFileState(fileName);
    },
    resetIncomingAudio: function resetIncomingAudio() {
      setIncomingAudioState(defaultIncomingAudio);
      setIncomingAudioFileState(defaultIncomingAudioFile);
    },
    setOutgoingAudio: function setOutgoingAudio(_ref10) {
      var fileName = _ref10.fileName,
          dataUrl = _ref10.dataUrl;
      setOutgoingAudioState(dataUrl);
      setOutgoingAudioFileState(fileName);
    },
    resetOutgoingAudio: function resetOutgoingAudio() {
      setOutgoingAudioState(defaultOutgoingAudio);
      setOutgoingAudioFileState(defaultOutgoingAudioFile);
    }
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
    disabled: callWithState === callWith && myLocationState === myLocation && ringoutPromptState === ringoutPrompt && incomingAudioState === incomingAudio && incomingAudioFileState === incomingAudioFile && outgoingAudioState === outgoingAudio && outgoingAudioFileState === outgoingAudioFile || callWithState === _callingOptions["default"].ringout && !myLocationState
  }));
};

var CallingSettingsPanel = function CallingSettingsPanel(_ref11) {
  var className = _ref11.className,
      onBackButtonClick = _ref11.onBackButtonClick,
      currentLocale = _ref11.currentLocale,
      _ref11$showSpinner = _ref11.showSpinner,
      showSpinner = _ref11$showSpinner === void 0 ? false : _ref11$showSpinner,
      props = _objectWithoutProperties(_ref11, ["className", "onBackButtonClick", "currentLocale", "showSpinner"]);

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
